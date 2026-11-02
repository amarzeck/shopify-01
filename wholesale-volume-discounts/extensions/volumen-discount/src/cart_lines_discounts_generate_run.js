import {
  DiscountClass,
  ProductDiscountSelectionStrategy,
} from "../generated/api";

/**
 * Descuento mayorista por volumen, por LINEA de carrito y por SEGMENTO (tag).
 *
 * Fuente de los tramos (en este orden):
 *   1. Metafield de la tienda  shop.metafields.inaltum.volume_tiers  (editable
 *      en caliente, compartido con el bloque de tema).
 *   2. DEFAULT_TIERS (respaldo quemado) si el metafield no esta o no se puede leer.
 *
 * Reglas: detecta el segmento por los tags del producto (respetando `priority`)
 * y aplica el % del tramo segun la cantidad de ESA linea (no suma otras lineas).
 *
 * @typedef {import("../generated/api").CartInput} RunInput
 * @typedef {import("../generated/api").CartLinesDiscountsGenerateRunResult} CartLinesDiscountsGenerateRunResult
 */

/** Respaldo: debe coincidir con config/tiers.json. */
const DEFAULT_TIERS = {
  priority: ["Maquinaria", "Importado", "Nacional"],
  segments: {
    Importado: [
      { minQty: 3, percentage: 5 },
      { minQty: 6, percentage: 10 },
      { minQty: 12, percentage: 18 },
      { minQty: 20, percentage: 25 },
    ],
    Nacional: [
      { minQty: 5, percentage: 3 },
      { minQty: 10, percentage: 6 },
      { minQty: 20, percentage: 10 },
    ],
    Maquinaria: [
      { minQty: 2, percentage: 3 },
      { minQty: 3, percentage: 6 },
      { minQty: 5, percentage: 10 },
    ],
  },
};

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

  // Tabla de tramos: metafield de la tienda, con respaldo quemado.
  const fromShop =
    input.shop && input.shop.metafield ? input.shop.metafield.jsonValue : null;
  const config = fromShop || DEFAULT_TIERS;

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

    // Resolver segmento: primero por prioridad, luego cualquiera presente.
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
