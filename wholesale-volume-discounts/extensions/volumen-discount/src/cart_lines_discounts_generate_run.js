import {
  DiscountClass,
  ProductDiscountSelectionStrategy,
} from "../generated/api";

/**
 * Descuento mayorista por volumen, por LINEA de carrito y por SEGMENTO (tag).
 *
 * - Lee la tabla de tramos (JSON) desde el metafield del descuento.
 * - Detecta el segmento de cada producto por sus tags
 *   (Importado / Nacional / Maquinaria), respetando `priority`.
 * - Aplica el % del tramo segun la cantidad de ESA linea (no suma otras lineas).
 *
 * @typedef {import("../generated/api").CartInput} RunInput
 * @typedef {import("../generated/api").CartLinesDiscountsGenerateRunResult} CartLinesDiscountsGenerateRunResult
 */

/** @type {CartLinesDiscountsGenerateRunResult} */
const EMPTY = { operations: [] };

/**
 * @param {RunInput} input
 * @returns {CartLinesDiscountsGenerateRunResult}
 */
export function cartLinesDiscountsGenerateRun(input) {
  const lines = input.cart.lines;
  if (!lines || lines.length === 0) return EMPTY;

  // Solo si el descuento tiene habilitada la clase "Product".
  if (!input.discount.discountClasses.includes(DiscountClass.Product)) {
    return EMPTY;
  }

  // Configuracion de tramos (objeto JSON ya parseado).
  const config = input.discount.metafield && input.discount.metafield.jsonValue;
  if (!config) return EMPTY;

  const priority = Array.isArray(config.priority) ? config.priority : [];
  const segments = config.segments || {};

  const candidates = [];

  for (const line of lines) {
    const merch = line.merchandise;
    if (!merch || merch.__typename !== "ProductVariant") continue;

    // Mapa { tag: boolean } a partir de hasTags.
    const flags = {};
    const tagList = (merch.product && merch.product.hasTags) || [];
    for (const entry of tagList) {
      flags[entry.tag] = entry.hasTag;
    }

    // Resolver el segmento: primero por prioridad, luego cualquiera presente.
    let segment = null;
    for (const s of priority) {
      if (flags[s]) {
        segment = s;
        break;
      }
    }
    if (!segment) {
      for (const s of Object.keys(segments)) {
        if (flags[s]) {
          segment = s;
          break;
        }
      }
    }
    if (!segment) continue;

    const tiers = segments[segment];
    if (!Array.isArray(tiers) || tiers.length === 0) continue;

    // Mejor % aplicable segun la cantidad de la linea.
    let pct = 0;
    for (const tier of tiers) {
      const minQty = Number(tier.minQty);
      const percentage = Number(tier.percentage);
      if (!isFinite(minQty) || !isFinite(percentage)) continue;
      if (line.quantity >= minQty && percentage > pct) pct = percentage;
    }
    if (pct <= 0) continue;

    candidates.push({
      message: "Mayorista -" + pct + "%",
      targets: [{ cartLine: { id: line.id } }],
      value: { percentage: { value: pct } },
    });
  }

  if (candidates.length === 0) return EMPTY;

  return {
    operations: [
      {
        productDiscountsAdd: {
          candidates: candidates,
          selectionStrategy: ProductDiscountSelectionStrategy.First,
        },
      },
    ],
  };
}
