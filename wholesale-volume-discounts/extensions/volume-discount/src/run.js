// @ts-check

/**
 * Descuento mayorista por volumen, por LINEA de carrito y por SEGMENTO (tag).
 *
 * Flujo:
 *  1. Lee la configuracion de tramos desde el metafield del descuento
 *     (namespace "volume_discount", key "tiers") -> JSON de config/tiers.json.
 *  2. Para cada linea del carrito, detecta el segmento del producto a partir
 *     de sus tags (Importado / Nacional / Maquinaria), respetando `priority`.
 *  3. Busca el tramo aplicable segun la cantidad de ESA linea y aplica el % mayor.
 *
 * El descuento es por linea: 10 cuerdas descuentan solo esas 10; no se suma
 * con otras lineas del carrito.
 */

/**
 * @typedef {{ minQty: number, percentage: number }} Tier
 * @typedef {{ priority?: string[], segments?: Record<string, Tier[]> }} Config
 */

const EMPTY_RESULT = {
  discounts: [],
  discountApplicationStrategy: "FIRST",
};

/**
 * @param {any} input
 */
export function run(input) {
  const raw = input?.discountNode?.metafield?.value;
  if (!raw) return EMPTY_RESULT;

  /** @type {Config} */
  let config;
  try {
    config = JSON.parse(raw);
  } catch (_error) {
    return EMPTY_RESULT;
  }

  const priority = Array.isArray(config.priority) ? config.priority : [];
  const segments = config.segments ?? {};

  const discounts = [];

  for (const line of input?.cart?.lines ?? []) {
    const merch = line?.merchandise;
    if (!merch || merch.__typename !== "ProductVariant") continue;

    // Mapa tag -> presente?
    /** @type {Record<string, boolean>} */
    const flags = {};
    for (const entry of merch.product?.hasTags ?? []) {
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
      if (!Number.isFinite(minQty) || !Number.isFinite(percentage)) continue;
      if (line.quantity >= minQty && percentage > pct) pct = percentage;
    }
    if (pct <= 0) continue;

    discounts.push({
      targets: [{ cartLine: { id: line.id } }],
      value: { percentage: { value: String(pct) } },
      message: `Mayorista -${pct}%`,
    });
  }

  if (discounts.length === 0) return EMPTY_RESULT;

  return {
    discounts,
    discountApplicationStrategy: "FIRST",
  };
}
