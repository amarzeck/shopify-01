import "@shopify/ui-extensions/preact";
import { render } from "preact";

export default async () => {
  render(<App />, document.body);
};

function App() {
  const { discounts, applyMetafieldChange } = shopify;

  const discountClasses = discounts?.discountClasses?.value ?? [];
  const productEnabled = discountClasses.includes("product");

  // La funcion mayorista solo aplica descuentos de PRODUCTO. Este control
  // activa esa clase para el descuento. Los tramos (cantidad/%) y los
  // segmentos (tags) se configuran globalmente en el metafield de la tienda
  // inaltum.volume_tiers, no por descuento.
  const toggleProduct = async () => {
    const next = productEnabled ? [] : ["product"];
    await discounts?.updateDiscountClasses?.(next);
  };

  async function onSubmit() {
    // No guardamos configuracion por descuento (es global), pero dejamos una
    // marca para que el guardado del formulario tenga una accion valida.
    await applyMetafieldChange({
      type: "updateMetafield",
      namespace: "$app",
      key: "function-configuration",
      value: JSON.stringify({ managedBy: "shop-metafield:inaltum.volume_tiers" }),
      valueType: "json",
    });
  }

  return (
    <s-function-settings onSubmit={(event) => event.waitUntil?.(onSubmit())}>
      <s-heading>Descuento mayorista por volumen</s-heading>
      <s-section>
        <s-stack gap="base">
          <s-text>
            Los tramos por cantidad y por segmento (tags: Importado, Nacional,
            Maquinaria) se configuran de forma global para toda la tienda. Este
            descuento solo necesita estar activo con la clase de producto.
          </s-text>
          <s-checkbox
            checked={productEnabled}
            label="Descuento de producto (requerido)"
            onChange={toggleProduct}
          />
          {productEnabled ? null : (
            <s-banner tone="warning">
              Marca "Descuento de producto" para que se apliquen los tramos
              mayoristas.
            </s-banner>
          )}
        </s-stack>
      </s-section>
    </s-function-settings>
  );
}
