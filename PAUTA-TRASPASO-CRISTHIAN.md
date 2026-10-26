# Pauta de traspaso — Proyecto Mayorista Inaltum

**Para:** Cristhian
**Tienda:** Inaltum Fitness — `www.inaltum.cl` (`boxinaltum.myshopify.com`) · Plan Shopify **Grow**
**Repo:** https://github.com/amarzeck/shopify-01 · Rama: `claude/inaltum-quantity-discounts-e84ifd`

> Carga este documento como contexto inicial de tu sesión. Al final hay una
> sección donde **tú entregas la nueva directriz de etiquetas** para continuar.

---

## 1. Partir: descargar el proyecto desde GitHub

```bash
git clone https://github.com/amarzeck/shopify-01.git
cd shopify-01
git checkout claude/inaltum-quantity-discounts-e84ifd
git pull
```

Carpetas relevantes:
- `theme-customizations/snippets/` → personalizaciones del tema (globito, auto-filtro stock).
- `wholesale-volume-discounts/` → app custom de Shopify Functions (ver punto 4: **descartada**, requiere Plus).
- `config/tiers.json` (dentro de la app) → tabla de tramos de referencia.

---

## 2. Objetivo del proyecto

Venta **mayorista**: a mayor cantidad comprada, menor precio unitario, **diferenciado por segmento de producto** (márgenes distintos). Además: mostrar un distintivo visual mayorista y mantener los listados limpios (sin agotados).

---

## 3. Qué está IMPLEMENTADO y cómo funciona HOY

### a) Descuentos por volumen → **plugin Dealeasy** (de Logbase)
- Es el que aplica los **tramos por cantidad** y muestra la **tabla de descuentos** en la ficha de producto (bloque `dealeasy_vd_cards`).
- Se eligió Dealeasy (app del App Store) porque **funciona en el plan Grow** sin Shopify Plus.
- La segmentación se maneja por **tags** del producto.

### b) Segmentación por **tags**
Tres segmentos (un tag por producto, idealmente uno solo):
- `Importado`
- `Nacional`
- `Maquinaria`

Tabla de tramos de **referencia** (la vigente real está en Dealeasy; confirmar ahí):
| Segmento | Tramos de referencia |
|---|---|
| Importado | 3u −5% · 6u −10% · 12u −18% · 20u −25% |
| Nacional | 5u −3% · 10u −6% · 20u −10% |
| Maquinaria | 2u −3% · 3u −6% · 5u −10% |

### c) Globito "Especial Mayorista" en las tarjetas de producto
- Snippet: `theme-customizations/snippets/inaltum-mayorista-badge.liquid`
- Se instala con una línea en `snippets/card-product.liquid`, justo después de `<div class="card__media ...">`:
  ```liquid
  {% render 'inaltum-mayorista-badge', card_product: card_product %}
  ```
- Color naranja corporativo **#FF9000**. Textos por tag:
  - Importado → "Especial Mayorista 30%"
  - Nacional → "Especial Mayorista 15%"
  - Maquinaria → "Especial Mayorista 10%"
- Prioridad si hay más de un tag: **Maquinaria > Importado > Nacional**.

### d) Ocultar productos sin stock de los listados
- Snippet: `theme-customizations/snippets/inaltum-default-instock.liquid`
- Se instala con una línea en `layout/theme.liquid` antes de `</body>`:
  ```liquid
  {% render 'inaltum-default-instock' %}
  ```
- Aplica por defecto el filtro nativo "En existencia" (`filter.v.availability=1`) en **colecciones y búsqueda**, sin afectar la ficha (sigue accesible por link). Respeta si el visitante elige otro filtro.
- (Existe además un script antiguo en `main-collection-product-grid.liquid` que solo cubría `/collections/`; el snippet nuevo lo reemplaza/cubre de forma global.)

### e) Metafield de tienda `inaltum.volume_tiers`
- JSON con la tabla de tramos + acceso Storefront. Se creó para la app custom (ver punto 4). Dealeasy NO lo usa. Es inofensivo; se puede dejar o limpiar.

---

## 4. App custom "Mayoristas-Inaltum" → DESCARTADA (no usar)
- Construimos una Shopify Function (descuento por volumen) + UI extension + bloque de tema `quantity-table`.
- **Bloqueo de plataforma:** las Functions de **apps personalizadas requieren Shopify Plus**. Inaltum está en **Grow** → no se puede activar. Por eso se migró a **Dealeasy**.
- La app quedó **instalada pero inactiva**. Se puede **desinstalar** sin afectar nada (su código vive en `wholesale-volume-discounts/` solo como registro).

---

## 5. ⚠️ IMPORTANTE sobre los TEMAS (lección aprendida)
Hubo un incidente: al **publicar un tema nuevo/duplicado**, la tabla de Dealeasy dejó de verse aunque el bloque seguía puesto, porque **Dealeasy no se re-inicializa solo** al cambiar de tema.

Reglas para no romperlo:
1. **Nunca editar el tema EN VIVO directo.** Trabajar en una **copia (sin publicar)**, previsualizar, y recién publicar.
2. **Al publicar un tema nuevo:** entrar a *Personalizar → App embeds* y **apagar/encender Dealeasy** (y verificar en la app Dealeasy que la oferta esté activa y apuntando al tema correcto). Así vuelve a inyectar la tabla.
3. Mantener **orden de temas**: hay varias copias dando vueltas (una marcada `_MALO`). Conviene dejar **un solo** tema bueno publicado y archivar el resto.
4. Las personalizaciones (globito + filtro stock) viven en los snippets del repo; si se publica un tema que no los tiene, **re-aplicarlos** (puntos 3c y 3d).

Estado de temas al momento del traspaso:
- EN VIVO: `Copia de 202610231535_Copia de Trade`
- Copia con nuestras personalizaciones: `202610041909_Copia de Trade`
- Original renombrado: `202610042105_Trade`
- Marcado malo: `202610261611_Copia de Trade_MALO`

---

## 6. Estado actual de las ETIQUETAS (dato duro, al traspaso)
- **870 productos** en total, **100% ya segmentados** (todos tienen al menos un tag):
  - Nacional: **664** · Importado: **165** · Maquinaria: **45**
  - **Sin segmento: 0**
- **4 productos con DOBLE segmento** (a resolver — dejar uno solo):

| Producto | Conflicto |
|---|---|
| Maquina de Abdominales Shaper con tablero | Importado + Maquinaria |
| Par Mancuerna Hexagonal PVC Cementada | Importado + Nacional |
| Peto deportivo Cerrado Malla - Adulto | Importado + Nacional |
| Petos de fútbol para entrenamiento | Importado + Nacional |

---

## 7. 📝 DIRECTRIZ NUEVA DE ETIQUETAS — **completar, Cristhian**

> Están reestructurando las etiquetas. Define aquí la nueva estructura para que
> la IA continúe (etiquetado masivo por el conector, ajuste de tramos en
> Dealeasy, textos del globito, etc.). Responde estos puntos:

1. **¿Cuáles son los segmentos nuevos?** (lista de tags) y ¿reemplazan o se suman a Importado/Nacional/Maquinaria?
2. **Mapeo:** ¿cómo se traducen los tags actuales a los nuevos? (ej. "Importado" → "X", etc.)
3. **Tramos por segmento nuevo:** cantidades y % de descuento de cada uno.
4. **Texto del globito** por segmento nuevo (y si cambia el color/posición).
5. **Criterio de asignación** para re-etiquetar en masa (por tipo de producto, proveedor, nombre, colección, CSV, etc.).
6. **Los 4 conflictos:** ¿qué segmento dejar en cada uno?

---

## 8. Cómo continuar con la IA
1. Carga esta pauta.
2. Entrega la **directriz nueva** (punto 7).
3. Pide avanzar con, por ejemplo:
   - **Re-etiquetado masivo** por el conector de Shopify (Admin API).
   - Ajuste de **tramos en Dealeasy** y **textos del globito**.
   - **Limpieza de temas** (dejar uno publicado) y re-aplicar snippets si hace falta.
   - Resolver los **4 conflictos** de doble tag.

Herramientas disponibles: conector **Shopify** (leer/escribir productos, tags, metafields, temas sin publicar), **GitHub** (este repo), y edición de tema vía copia + previsualización.
