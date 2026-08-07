# Nota de entrega / etiqueta de despacho — Shopify (INALTUM)

Plantilla Liquid para la nota de entrega de Shopify (Order Printer / packing slip),
optimizada para usarse como **etiqueta de identificación de bultos** en despachos,
principalmente a **clientes empresa**. Formato **hoja carta/A4**.

Archivo: [`nota_de_entrega_shopify.liquid`](./nota_de_entrega_shopify.liquid)

## Cómo usarla
Copia el contenido del `.liquid` y pégalo en Shopify:
**Configuración → Notas de entrega** (o la plantilla de packing slip de tu app de
impresión), reemplazando la plantilla actual.

## ⚠️ Único punto a verificar: nombres de los campos B2B
El RUT y la Orden de Compra se leen desde los **atributos del pedido**
(`order.attributes`), es decir, lo que el cliente completa en el checkout.
En el `.liquid` están así:

```liquid
{% assign rut = order.attributes["RUT"] | default: order.attributes["Rut"] %}
{% assign oc  = order.attributes["Orden de Compra"] | default: order.attributes["OC"] %}
```

Ajusta los textos entre comillas para que coincidan **exacto** (mayúsculas,
tildes y espacios incluidos) con el nombre de tus campos en Shopify. Si un
pedido no trae el dato, la línea simplemente no se muestra.

> La **Razón Social** usa `order.attributes["Razon Social"]` y, si no existe,
> cae automáticamente a `shipping_address.company`.

## Cambios respecto a la versión anterior
- **Bloque de despacho destacado** (recuadro): destinatario, RUT y dirección en
  tamaño grande para leer rápido al identificar el bulto.
- **N° de Orden más grande** en el encabezado; **logo más pequeño**.
- Agregado **RUT** y **Orden de Compra** automáticos desde el pedido.
- **Comuna** y **Región** separadas (antes iban juntas en `city_province_zip`,
  con formato poco claro para Chile).
- Recuadro **"N° de Bulto ___ de ___"** para completar a mano (Shopify no conoce
  la cantidad física de bultos).
- Corrección: texto que estaba en inglés ("There are other items...") traducido.
- Corrección: condicional redundante que mostraba "Destinatario" en ambas ramas.
- Corrección ortográfica: "nuetras" → "nuestras".
- SKU etiquetado como `SKU:` para claridad en bodega.
- Se mantienen los correos incrustados manualmente: `b2b@inaltum.cl` y
  `mercadopublico@inaltum.cl`.
