# Nota de entrega / etiqueta de despacho — Shopify (INALTUM)

Plantilla Liquid para la nota de entrega de Shopify (Order Printer / packing slip),
optimizada para usarse como **etiqueta de identificación de bultos** en despachos,
principalmente a **clientes empresa**. Formato **hoja carta/A4**.

> **🟢 Versión en producción (Shopify):** commit `5c2a9df` — al 2026-08-07.
> Es la copia pegada y en uso dentro de Shopify. Cualquier cambio nuevo parte
> desde aquí. (Historial de versiones productivas más abajo.)

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
- Los **canales de contacto de Inaltum** (Web, Empresas y sitio web) van dentro
  del bloque **Remitente**.
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

---

## Instructivo: ajustes rápidos

Todos estos cambios se hacen en el mismo archivo `nota_de_entrega_shopify.liquid`,
dentro del bloque `<style>` (al final del archivo). Después de editar, **copia y
pega de nuevo** el archivo completo en Shopify.

### 1. Mover el recuadro "N° DE BULTO" y los "___ de ___" por separado

En el CSS busca `.dispatch-bultos` (están marcadas como **PERILLA A / B / C**):

- **Centrar todo el grupo** (rótulo + líneas juntos): en `.dispatch-bultos`,
  cambia **PERILLA A**
  `justify-content: flex-start;` → `justify-content: center;`
  (`flex-start` = arriba, `center` = al centro, `flex-end` = abajo).

- **Subir o bajar SOLO el rótulo "N° de Bulto"**: en `.dispatch-bultos`,
  **PERILLA B**, ajusta el primer número del `padding` (hoy `2.2em`).
  Más grande baja el rótulo; más chico lo sube.

- **Bajar SOLO los "___ de ___"** (para dejar más espacio y escribir con plumón):
  en `.dispatch-bultos-value`, **PERILLA C**, sube el valor de `margin-top`
  (ej. `margin-top: 1.5em;`). Esto no mueve el rótulo.

> Regla simple: **PERILLA B** mueve el rótulo, **PERILLA C** mueve las líneas.
> Así los ajustas de forma independiente.

### 2. Poner en negrita `www.inaltum.cl`

Ya quedó en negrita. En el bloque **Remitente** (parte de arriba del archivo,
en el HTML) la línea es:

```liquid
<strong>{{ shop.domain }}</strong>
```

Para quitarle la negrita, borra `<strong>` y `</strong>`; para ponérsela a otra
línea, envuélvela igual entre `<strong>...</strong>`.

---

## Historial de versiones en producción

Cada vez que pegues una versión en Shopify y la des por buena, anótala aquí con
su commit y fecha. Así siempre sabemos qué copia está viva.

| Fecha       | Commit    | Notas                                             |
|-------------|-----------|---------------------------------------------------|
| 2026-08-07  | `5c2a9df` | Ajuste de interlineado del "___ de ___" (bultos). |
