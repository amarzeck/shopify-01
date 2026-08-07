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
- **Bloque de despacho grande** (~40% de la hoja): a la izquierda el destinatario,
  RUT y dirección en tamaño grande; a la derecha un recuadro **enorme de "N° de
  Bulto"** para anotar con plumón en bodega y que el reparto lo lea sin confusión.
- **Remitente (Inaltum Fitness)** justo debajo del destinatario: al doblar la hoja
  por esa zona quedan destinatario + remitente a la vista y el detalle de productos
  oculto al reparto. No se fuerza salto de página (el sistema pagina solo si hace falta).
- **N° de Orden más grande** en el encabezado; **logo más pequeño**.
- Agregado **RUT** y **Orden de Compra** automáticos desde el pedido.
- **Comuna** y **Región** separadas (antes iban juntas en `city_province_zip`,
  con formato poco claro para Chile).
- **Se eliminó el footer** que iba después de los artículos.
- El bloque **destinatario** incluye los canales de contacto de Inaltum
  (Web, Empresas y sitio web) para que queden visibles al doblar la hoja.
- El bloque **"Gracias por tu compra"** (con el enlace al portal de boleta/factura)
  va ahora **enseguida después del Remitente**.
- Los **artículos quedan al final**, de modo que doblando la hoja se ocultan del
  reparto/picking según el tipo de transporte. Sin salto de página forzado.
- Corrección: texto que estaba en inglés ("There are other items...") traducido.
- Corrección: condicional redundante que mostraba "Destinatario" en ambas ramas.
- Corrección ortográfica: "nuetras" → "nuestras".
- SKU etiquetado como `SKU:` para claridad en bodega.
- Se mantienen los correos incrustados manualmente: `b2b@inaltum.cl` y
  `mercadopublico@inaltum.cl`.
