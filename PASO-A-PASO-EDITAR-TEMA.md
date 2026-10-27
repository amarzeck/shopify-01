# Paso a paso — Modificar un archivo del tema (para Cristhian)

> Procedimiento **seguro y reutilizable** para editar archivos del tema en
> Shopify. Úsalo para esta tarea (actualizar el globito) y para las próximas.

Tienda: Inaltum Fitness · Tema en vivo (MAIN): **"Copia de 202610231535_Copia de Trade"**

---

## 🔑 Reglas de oro
1. **Nunca edites el tema en vivo sin un respaldo.**
2. **Previsualiza en una copia** antes de tocar el vivo.
3. **No cambies el tema publicado** (no "publiques" otra copia) salvo que sea necesario. Si algún día lo haces, acuérdate de **apagar/encender el app embed de Dealeasy** (si no, la tabla de descuentos deja de verse).
4. Edita **un archivo a la vez** y copia/pega el contenido **completo** que te entreguen.

---

## 🧭 Procedimiento general (sirve para cualquier edición)

**1) Respaldo (copia de seguridad)**
- Admin → **Tienda online → Temas**.
- En el tema en vivo → botón **⋯** → **Duplicar**. Queda "Copia de..." (sin publicar). Es tu red de seguridad.

**2) Probar en la copia**
- En esa copia → **⋯ → Editar código**.
- Abre el archivo a modificar (ej. `snippets/inaltum-mayorista-badge.liquid`).
- **Selecciona todo** el contenido y **reemplázalo** por el nuevo. **Guardar**.

**3) Previsualizar**
- En la copia → **⋯ → Vista previa**.
- Revisa que el cambio se vea bien (ver "Cómo verificar" abajo).

**4) Aplicar al tema en vivo**
- Si en la vista previa quedó bien: ve al **tema en vivo** → **⋯ → Editar código** → abre el **mismo archivo** → pega **el mismo contenido** → **Guardar**.
- (Como ya lo probaste idéntico en la copia, el riesgo es mínimo.)

**5) Verificar en vivo** y, si todo OK, **borra la copia de prueba** (⋯ → Eliminar) para no acumular temas.

---

## ✅ Tarea de HOY: actualizar el globito a los tags nuevos

**Archivo:** `snippets/inaltum-mayorista-badge.liquid`

**Reemplaza TODO el contenido por esto** (ya incluye el comentario corregido):

```liquid
{%- comment -%}
  Globito "Especial Mayorista" para las tarjetas de producto (listados/colecciones).
  Aparece arriba a la derecha de la tarjeta segun el tag de segmento del producto.
  Prioridad: M-70 > M-45 > M-35 > M-NAC.
{%- endcomment -%}
{%- liquid
  assign inaltum_badge = ''
  if card_product.tags contains 'M-70'
    assign inaltum_badge = 'Mayorista hasta 30%'
  elsif card_product.tags contains 'M-45'
    assign inaltum_badge = 'Mayorista hasta 15%'
  elsif card_product.tags contains 'M-35'
    assign inaltum_badge = 'Mayorista hasta 10%'
  elsif card_product.tags contains 'M-NAC'
    assign inaltum_badge = 'Mayorista hasta 5%'
  endif
-%}
{%- if inaltum_badge != blank -%}
  <span
    class="inaltum-mayorista-badge"
    style="position:absolute;top:8px;right:8px;z-index:3;max-width:85%;background:#FF9000;color:#ffffff;font-size:0.95rem;font-weight:700;line-height:1.2;text-align:center;padding:6px 12px;border-radius:999px;box-shadow:0 2px 6px rgba(0,0,0,0.2);pointer-events:none;"
  >{{ inaltum_badge }}</span>
{%- endif -%}
```

### Cómo verificar (en la vista previa y en vivo)
Abre un **listado/colección** y confirma los textos según el tag del producto:
| Tag del producto | Debe decir |
|---|---|
| M-70 | Mayorista hasta 30% |
| M-45 | Mayorista hasta 15% |
| M-35 | Mayorista hasta 10% |
| M-NAC | Mayorista hasta 5% |

- Un producto de prueba M-70: debería mostrar el globito naranja "Mayorista hasta 30%".
- Un producto "pack" (sin tag M-): **no** debe mostrar globito (correcto).
- Si **ningún** producto muestra globito, avisar: puede faltar la línea
  `{% render 'inaltum-mayorista-badge', card_product: card_product %}` en
  `snippets/card-product.liquid` (justo después de `<div class="card__media ...">`).

---

## 📌 Notas
- Este cambio **no toca Dealeasy** ni el tema publicado, así que **no** hay que togglear Dealeasy (solo editas un archivo del mismo tema en vivo).
- El contenido de arriba también está en el repo:
  `theme-customizations/snippets/inaltum-mayorista-badge.liquid` (mantener sincronizado).
- Si el cambio llegó por un PR a GitHub, igual **hay que copiarlo al tema** a mano
  (GitHub y el tema de Shopify no están conectados automáticamente).
