# Instrucciones Web — Mejoras Home & Posicionamiento (para Cristhian)

**Tienda:** Inaltum Fitness · **Tema en vivo (MAIN):** la copia de Trade publicada
(hoy "202610271138_Copia de Trade"; verificar cuál es la MAIN antes de editar).

> **Flujo seguro (SIEMPRE):** duplicar el tema en vivo → editar/probar en la copia
> → previsualizar → aplicar al vivo. No publicar copias nuevas sin re-togglear el
> App embed de **Dealeasy** (si no, se cae la tabla de descuentos).
> Avances se marcan en `seguimiento-web/SEGUIMIENTO-WEB.md`.

Casi todo es en **Editor de temas / Admin (sin código)**. Donde haya código, usar
`PASO-A-PASO-EDITAR-TEMA.md`.

---

## 1) Ocultar colecciones inteligentes del home y manejar las estacionales

**Objetivo:** que el cliente no vea colecciones internas/irrelevantes ni
estacionales fuera de temporada.

**1a. Ocultar "Colección Inteligente mayores a 21Kg"** (handle `coleccion-inteligente-mayores-a-21kg`)
- En el **home**: Editor de temas → sección **Featured collection** que la muestra
  → cambiarla por otra colección (ver punto 1c) o **eliminar esa sección**.
- Para que NO sea visible ni por link: Admin → **Productos → Colecciones** →
  abrir esa colección → en **Canales de venta/Publicación** → **quitar "Tienda online"**
  (queda en el admin, invisible para el cliente). Es una colección interna (regla:
  peso > 23kg), no debe verse.

**1b. Mantener "OFERTAS"** (handle `ofertas`) → **no tocar**, se queda visible.

**1c. Reemplazo en el home:** donde estaba "mayores a 21Kg", poner una colección
útil (ej. **"Más vendidos"** o **"Ofertas"**).

**1d. Colecciones ESTACIONALES (Fiestas Patrias, Navidad, Colegios-Marzo):**
Estrategia de **temas por temporada** (un tema por campaña, se publica solo en sus meses):
- **Tema evergreen** (resto del año, el que está casi todo el año): **sin** banners
  ni colecciones estacionales en el home.
- **Tema "Fiestas Patrias"** → se publica **Agosto–Septiembre**; ahí sí va el banner
  y la colección Fiestas Patrias en el home.
- **Tema "Navidad"** → se publica **Noviembre–Diciembre**.
- **Tema "Especial Colegios"** → se publica **Marzo**.
- Las colecciones estacionales: mantenerlas **despublicadas de Tienda online**
  fuera de temporada (o simplemente **no** mostrarlas en el home del evergreen) y
  **publicarlas/mostrarlas** solo cuando corresponda.
- Nomenclatura de temas sugerida: `EVERGREEN_Trade`, `CAMPAÑA_FiestasPatrias`,
  `CAMPAÑA_Navidad`, `CAMPAÑA_Colegios`. **Archivar** las copias viejas/duplicadas
  y la marcada "_MALO".

**Verificación:** en el home del tema en vivo no debe aparecer "mayores a 21Kg" ni
nada estacional fuera de mes; "Ofertas" sí.

---

## 2) Prueba social / confianza B2B

**Objetivo:** transmitir que somos proveedor serio para instituciones.

**Pasos (Editor de temas → agregar sección, ej. "Multicolumn" o "Rich text" + iconos):**
- Bloque **"¿Por qué comprarnos?"** con 3–4 ítems:
  - **"Vendemos con factura"** (boleta/factura electrónica).
  - **Medios de pago** (tarjetas, transferencia, OneClick, etc. — iconos).
  - **"Despacho a todo Chile"** (La Serena a Temuco + Bluexpress).
  - **"Atención empresas dedicada"** (ejecutiva + WhatsApp).
- Bloque **"Confían en nosotros"**: 4–8 logos de **clientes institucionales**
  (colegios, universidades, municipalidades, clubes) — pedir autorización de uso.
- (Opcional) 2–3 **testimonios** cortos de compradores institucionales.

**Ubicación:** idealmente después de la fila de beneficios mayoristas (punto 6).

---

## 3) Menú superior "Especial Mayorista" por segmento (5 / 10 / 15 / 30%)

**Objetivo:** que el mayorista encuentre rápido por nivel de descuento.

**3a. Crear 4 colecciones inteligentes (una por tag de segmento):**
| Colección (título) | Regla (condición) | Tag |
|---|---|---|
| Mayorista hasta 30% | Etiqueta del producto **es igual a** `M-70` | M-70 |
| Mayorista hasta 15% | Etiqueta **es igual a** `M-45` | M-45 |
| Mayorista hasta 10% | Etiqueta **es igual a** `M-35` | M-35 |
| Mayorista hasta 5% | Etiqueta **es igual a** `M-NAC` | M-NAC |

> Admin → Productos → Colecciones → **Crear colección** → tipo **Automatizada** →
> condición "Etiqueta del producto · es igual a · M-70" (y así cada una).
> *(Claude puede crear estas 4 por el conector si lo prefieres — avisar.)*

**3b. Armar el menú:** Admin → **Tienda online → Navegación → Menú principal** →
agregar ítem de primer nivel **"Especial Mayorista"** con subítems:
- Mayorista hasta 30% → `/collections/mayorista-hasta-30` (o la que se cree)
- Mayorista hasta 15% → `/collections/mayorista-hasta-15`
- Mayorista hasta 10% → `/collections/mayorista-hasta-10`
- Mayorista hasta 5% → `/collections/mayorista-hasta-5`

**Verificación:** el menú muestra "Especial Mayorista" y cada subítem abre la
colección correcta con sus productos.

---

## 4) Activar y redactar el HERO (en español)

**Objetivo:** que en 3 segundos se entienda "multimarca + mayorista + colegios/univ./rehab".

**Pasos:** Editor de temas → sección **Image banner** (la primera del home):
- **Activar** los bloques **Texto**, **Título** y **Botones** (hoy están desactivados).
- Redactar:
  - **Título (H1):** `Especialistas deportivos multimarca`
  - **Texto/Subtítulo:** `Accesorios e implementos para colegios, universidades y rehabilitación — con precios mayoristas y despacho a todo Chile.`
  - **Botón 1 (primario):** `Cotiza como empresa` → enlazar a **Canal Empresas**.
  - **Botón 2 (secundario):** `Ver catálogo` → `/collections`.
- Revisar que el texto se lea bien sobre la imagen (ajustar opacidad de overlay si hace falta).

**Verificación:** el hero muestra H1 + subtítulo + 2 botones en español.

---

## 5) Corregir "PRUEBA TITULAR / PRUEBA DESCRIPCION" y la dirección del footer

**Objetivo:** quitar textos de prueba y la contradicción de dirección.

**Pasos:** Editor de temas → **Configuración del tema → Marca** (o la sección del
footer que muestra el bloque de marca):
- Reemplazar **"PRUEBA TITULAR. Miguel Claro 109, Providencia"** por el texto real
  (o dejar solo el nombre/eslogan). Como **no hay tienda a calle** (lo dice el popup),
  **no** poner dirección física de atención, o aclarar "solo oficina/bodega, sin atención a público".
- Reemplazar **"PRUEBA DESCRIPCION."** por una descripción real corta
  (ej: *"Especialistas deportivos multimarca. Venta mayorista para colegios,
  universidades, clubes e instituciones."*).

**Verificación:** no aparece la palabra "PRUEBA" en ninguna parte; la dirección es
coherente con "no tenemos tienda a calle".

---

## 6) Reordenar: subir la fila de beneficios mayoristas bajo el hero

**Objetivo:** que el valor B2B (despacho, atención empresa, "nos especializamos en
colegios/clubes/municipalidades…") se vea arriba, no enterrado.

**Pasos:** Editor de temas → tomar la sección **Multicolumn** de beneficios
(la que tiene "Cargas grandes…", "Bluexpress", "Atención Empresa", "Nos
especializamos en Soluciones Fitness a Colegios…") y **arrastrarla** justo
**debajo del hero** (antes o después del muro de marcas, a criterio).

**Verificación:** los beneficios mayoristas aparecen en la primera pantalla / cerca del hero.

---

## 7) Quitar o traducir los bloques en inglés ocultos

**Objetivo:** que no quede contenido de plantilla en inglés.

**Pasos:** Editor de temas, revisar y **eliminar** (o traducir y activar) los bloques:
- Hero: textos por defecto `Welcome industry insiders` / `Grow your business with us`
  (al redactar el punto 4 quedan reemplazados).
- Sección "You're set up for success" con `Add educational content` ×4 → **eliminar**.
- Featured collection `New arrivals` (desactivada) → eliminar o renombrar en español.

**Verificación:** no queda texto en inglés visible ni en bloques ocultos de plantilla.

---

## 8) 🔴 Revisar y corregir las TARIFAS DE ENVÍO del checkout (prioritario)

**Objetivo:** el cliente está viendo tarifas de envío incorrectas/absurdas en el pago.

**Evidencia (carrito con subtotal $170.000):**
- **BlueExpress Express: $1.003.848** 🔴 (totalmente desproporcionado = error de configuración)
- Starken a Domicilio: $87.417 (alto, revisar)
- Otros envíos (Sendu): $110.459 (alto, revisar)
- Envío gratuito / "Buscamos el más económico, te contactamos" / Retirar en local: Santa Elena 1867

**Qué revisar:**
- Admin → **Configuración → Envíos y entrega**: zonas, tarifas, y **tarifas calculadas por transportista** (carrier-calculated).
- **Apps de courier** (BlueExpress, Starken, Sendu): credenciales/convenio, reglas de precio, recargos. **BlueExpress** parece devolver un valor erróneo → revisar cuenta/convenio y dimensiones.
- **Peso / volumen de los productos:** pesos mal cargados o productos muy pesados (>23kg) inflan la tarifa calculada. Revisar pesos reales (relacionado con la colección "mayores a 21Kg").
- Opción "Buscamos el envío más económico. Te contactamos para pago previo." → confirmar que opera como se espera.
- **Dirección de retiro:** el checkout dice **"Santa Elena 1867"**, el footer decía **"Miguel Claro 109"** y el popup dice **"no tenemos tienda a calle"** → **UNIFICAR** dirección/mensaje de retiro en toda la web y el checkout (va de la mano con la tarea 5).

**Verificación:** en un checkout de prueba (varios destinos/pesos), las tarifas son
coherentes y **no** aparecen montos absurdos; la dirección de retiro es única y correcta.

---

### Notas finales
- Mantener **un solo** tema evergreen publicado; archivar duplicados y el "_MALO".
- Cada cambio: **copia → previsualizar → aplicar al vivo**.
- Marcar avance en `SEGUIMIENTO-WEB.md` y hacer `commit`/`push` para dejar traza.
