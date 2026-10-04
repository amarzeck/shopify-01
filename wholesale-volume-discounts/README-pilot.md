# Descuentos mayoristas por volumen — Inaltum Fitness

App de Shopify que aplica **descuentos por cantidad, por línea y por segmento**
(usando *tags*), y muestra la **tabla de precios por cantidad en la ficha del
producto** para dar certeza al cliente mayorista.

- **Function** (`extensions/volume-discount`): baja el precio real en carrito/checkout.
- **Bloque de tema** (`extensions/quantity-table`): dibuja la tabla en la ficha.
- **`config/tiers.json`**: única fuente de verdad de los tramos.

Tienda objetivo: `www.inaltum.cl` · Plan Shopify · Tema publicado: **Trade** (OS 2.0).

---

## Cómo funciona (resumen)

```
Tú etiquetas el producto      La Function lee el tag          El bloque lee el tag
  tag: "Importado"      →     y aplica el % del tramo    +    y muestra la tabla
                              según cantidad en carrito        en la ficha
```

- Segmentos por **tag**: `Importado`, `Nacional`, `Maquinaria`.
- Cada producto debe llevar **un solo** tag de segmento. Si llevara más de uno,
  manda la `priority` definida en `config/tiers.json`
  (por defecto `Maquinaria > Importado > Nacional`).
- Descuento **por línea**: 10 cuerdas descuentan solo esas 10; no se suman con
  otras líneas del carrito.
- Tramos actuales (editables en `config/tiers.json`):

  | Segmento | Tramos |
  |---|---|
  | Importado | 3u −5% · 6u −10% · 12u −18% · 20u −25% |
  | Nacional | 5u −3% · 10u −6% · 20u −10% |
  | Maquinaria | 2u −3% · 3u −6% · 5u −10% |

---

## Requisitos previos

1. **Cuenta Partner de Shopify (gratis):** https://partners.shopify.com
   Es obligatoria porque las Shopify Functions solo se despliegan desde un app
   creado en una organización Partner (las "apps personalizadas" del admin NO
   soportan funciones). Crear la cuenta es gratis y sirve para tu propia tienda.
2. **Shopify CLI** instalado: `npm install -g @shopify/cli@latest`
3. **Node.js 18+**.
4. Tu acceso de **admin** a `inaltum.cl` (lo tienes) para instalar el app y
   aprobar el descuento.

---

## Despliegue (lo haces tú, una vez)

Desde la carpeta `wholesale-volume-discounts/`:

```bash
# 1. Vincular/crear el app en tu organización Partner (escribe client_id en shopify.app.toml)
shopify app config link

# 2. (opcional) Generar tipos para la Function
shopify app function typegen --path extensions/volume-discount

# 3. Desplegar Function + bloque de tema al app
shopify app deploy

# 4. Instalar el app en la tienda inaltum.cl cuando el CLI te dé el link de instalación
```

> `shopify app dev` levanta un entorno de prueba contra una tienda de desarrollo
> si quieres probar antes de instalar en producción.

---

## Activación (después del deploy)

Las operaciones Admin API están en `scripts/admin-setup.graphql`. Puedes correrlas
tú en la app **Shopify GraphiQL**, o **pedirme que las ejecute por el conector**
(yo completo los IDs).

1. **Obtener el `functionId`** → Paso A del script (`shopifyFunctions`).
2. **Crear el descuento automático** que corre la Function y carga la tabla en su
   metafield → Paso B (`discountAutomaticAppCreate`). El `value` del metafield es
   el contenido de `config/tiers.json` como string JSON.
3. **Escribir el metafield de la tienda** para el bloque de tema → Paso C
   (`metafieldsSet`, `shop.metafields.inaltum.volume_tiers`).
4. **Agregar el bloque en la ficha:** Admin → *Online Store → Themes → Trade →
   Customize* → plantilla *Product* → en la sección principal, **Add block →
   Apps → "Precios por cantidad"** → colócalo **bajo el precio** → *Save*.
5. **Etiquetar productos:** agrega el tag de segmento (`Importado` / `Nacional` /
   `Maquinaria`) a cada producto. Se puede en masa con edición múltiple o por CSV.

---

## Probar que quedó bien

- En una ficha **con tag de segmento**: debe verse la tabla con cantidades, %
  y precio unitario; al cambiar de variante, el precio unitario se recalcula.
- En el **carrito**: agrega la cantidad del primer tramo → debe aparecer el
  descuento "Mayorista -X%" en esa línea, y no en productos de otra línea.
- En una ficha **sin tag**: no debe mostrarse nada (retail intacto).

---

## Mantenimiento

- **Cambiar tramos o %:** edita `config/tiers.json` y vuelve a aplicar los Pasos B
  y C (actualizan los dos metafields). No requiere redeploy de la Function.
- **Nuevo segmento (ej. `Importado-Premium`):** agrégalo en `config/tiers.json`
  (en `segments` y en `priority`), re-aplica B y C, y etiqueta los productos.
- Function y bloque leen de JSON, así que **nunca se desincronizan** si re-aplicas
  ambos metafields desde el mismo `tiers.json`.

---

## Límites conocidos / notas

- El bloque usa un formato CLP simple (miles con punto, sin decimales). Si tu
  `money_format` ya trae ese formato, se respeta.
- El recálculo por variante escucha los cambios del formulario `/cart/add`. En
  "Trade" funciona; si algún día cambias de tema muy personalizado, puede
  necesitar un ajuste menor del selector.
- Para el cliente mayorista "formal" (registro B2B, precios netos sin IVA,
  catálogos por cliente) Shopify tiene B2B nativo, pero **solo en Shopify Plus**.
  Esta solución cubre el caso de precios por volumen visibles sin pasar a Plus.
```
