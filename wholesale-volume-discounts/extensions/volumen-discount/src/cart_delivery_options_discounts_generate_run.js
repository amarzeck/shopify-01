/**
 * El programa mayorista NO aplica descuentos de envio.
 * Dejamos este target como no-op para que la funcion compile con ambos
 * targets, pero nunca genera descuentos de delivery.
 *
 * @typedef {import("../generated/api").DeliveryInput} RunInput
 * @typedef {import("../generated/api").CartDeliveryOptionsDiscountsGenerateRunResult} CartDeliveryOptionsDiscountsGenerateRunResult
 */

/**
 * @param {RunInput} _input
 * @returns {CartDeliveryOptionsDiscountsGenerateRunResult}
 */
export function cartDeliveryOptionsDiscountsGenerateRun(_input) {
  return { operations: [] };
}
