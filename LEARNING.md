# Guía de aprendizaje — Landing de GÉNESIS

**Objetivo de esta guía:** que puedas cambiar textos, precios, horarios, colores y fotos de la página
**sin romper nada**. No hace falta que sepas JavaScript ni React: el 90% de lo que vas a tocar está
en un solo archivo, en bloques de datos easy de leer.

Cómo usarla: leé la sección 1, después hacé el ejercicio de la sección 2, y seguí en orden.
Cada receta dice exactamente qué archivo abrir y qué línea cambiar.

---

## 1. Tu red de seguridad (leela antes de editar nada)

Esta carpeta tiene **git** instalado: registra cada cambio y te deja volver atrás con un comando.
Por eso podés empezar a tocar sin miedo.

```bash
cd genesis-landing
git status                 # ¿hay cambios sin guardar en el historial?
git diff                   # ¿qué cambié exactamente?
git restore js/app.js      # ¡deshace TODO lo que cambié en ese archivo!
git log --oneline          # historial de versiones
```

**Regla de oro:** antes de un cambio importante, si `git status` dice que el árbol está limpio,
podés molarte freely. Si algo sale mal: `git restore <archivo>` y volvés al estado anterior al instante.

---

## 2. Mapa: ¿qué querés cambiar? → dónde

| Quiero cambiar… | Archivo | Dónde exacto |
|---|---|---|
| Precios (todos) | `js/app.js` | `var PLANS = [...]` |
| Horarios de Lucas o Agus | `js/app.js` | `var COACHES = {...}` → `days:` |
| Teléfonos y WhatsApp | `js/app.js` **+** `index.html` (2 lugares más) | ver receta 4 |
| Instagram / dirección | `js/app.js` | `var IG` y `var MAPS` |
| Normas y condiciones | `js/app.js` | `var RULES = [...]` |
| Colores | `css/styles.css` | bloque `:root { ... }` (arriba) |
| Textos de las secciones | `js/app.js` | dentro de cada componente (`Hero`, `Pricing`, …) |
| Fotos y logo | `img/` | reemplazá los archivos **con el mismo nombre** |
| Secciones del menú | `js/app.js` | `var NAV = [...]` |

> Ojo: casi todo el texto visible de la página está en **`js/app.js`**, no en `index.html`.
> Eso es porque React genera la página; `index.html` es solo el contenedor.

---

## 3. Los 5 archivos (qué hace cada uno)

Imaginá que la página es una casa:

| Archivo | Rol | Analogía |
|---|---|---|
| `index.html` | El esqueleto: abre la página y carga todo lo demás | El terreno y el plano |
| `css/styles.css` | Todos los colores, tamaños, tipografías, animaciones | La pintura y la decoración |
| `js/app.js` | Los textos, los horarios, los precios y la lógica | El cerebro y los muebles |
| `img/` | Fotos y logo | Las fotos de la casa |
| `vendor/` | React y la librería `htm` (herramientas) | La caja de herramientas |

Los archivos de `vendor/` no se tocan nunca: son código de otras personas que ya viene listo.

---

## 4. Ruta de aprendizaje (4 sesiones de 30-45 min)

### Sesión 1 — Ver la página por dentro (HTML)
- Abrí `index.html` con doble clic.
- En Firefox, presioná `F12` → abajo aparece el panel del desarrollador. En la pestaña **Inspector**
  ves el HTML; hacé clic en cualquier texto de la página y te muestra de dónde sale.
- Objetivo: reconocer `index.html` como un archivo corto con 3 cosas: estilos, scripts y un `<div id="root">`
  (el `div` donde React dibuja la página).

### Sesión 2 — Cambiar colores y espacios (CSS)
- Abrí `css/styles.css` y buscá el bloque `:root` (primeras líneas). Ahí están los colores:
  `--crimson: #dc354f` (rojo) y `--teal: #0aa28b` (verde), más el fondo `--bg`.
- Cambiá `--bg` a `#141018` (por ejemplo), guardá, recargá la página: el fondo cambia.
- Volvé a poner `#0a0b0d`. Y así con todo lo demás: entendés el color como una "variable con nombre".

### Sesión 3 — Los datos (esto es lo que más vas a usar)
- Abrí `js/app.js` y andá directo a las primeras 60 líneas: están los datos de todo el gimnasio
  (precios, horarios, teléfonos, Instagram, dirección, normas).
- Ejercicio: cambiá el precio de "2 veces por semana" de `$32.000` a `$34.000`, recargá, y fijate
  que cambió en la web. Después probá cambiar un horario y una norma.

### Sesión 4 — Qué es React (para entender, no para tocar)
- React es una librería que, en vez de escribir el HTML a mano, lo generás con código:
  acá con `html\`<div>...\`` (se llama **htm**, y es casi idéntico a JSX pero sin build).
- Por ejemplo, los 5 horarios del profe Lucas son 5 objetos en una lista (`days`), y React dibuja
  una tarjeta por cada uno. Si agregás un día a la lista, aparece una tarjeta nueva solita.
- En esta sesión solo mirá: `function Hero()`, `function Schedule()`, `function App()`.
  Y no toques los `useState`, `useEffect` ni el `<${Reveal}` si no es necesario: son la parte frágil.

---

## 5. Recetas paso a paso (las más comunes)

### 1) Cambiar un precio
`js/app.js`, en `var PLANS`. La primera línea es la clase particular (tarjeta ancha);
las otras 4 son los planes (las tarjetas). Solo cambiá el texto entre comillas:

```js
{ name: "2 veces por semana", price: "$32.000", per: "por mes", eq: "$4.000 por clase", featured: false },
```

- `price`: el precio grande de la tarjeta.
- `eq`: el texto "≈ $X por clase" (es un cálculo tuyo; actualizalo si cambia el precio).
- `featured: true`: la pone con borde animado y la etiqueta "Mejor valor" (hoy la de "4 veces").

### 2) Cambiar o agregar un horario
`js/app.js`, en `var COACHES`. Cada día es una línea con los horarios del día:

```js
days: [
  { day: "Lunes y miércoles", times: ["08:00 – 09:00", "09:00 – 10:00", "14:00 – 15:00", "15:00 – 16:00"] },
  { day: "Martes", times: ["08:00 – 09:30", "14:00 – 15:00", "15:00 – 16:00"] },
],
```

- Para cambiar un horario: editá el texto del horario. Formato: `"08:00 – 09:00"` (con guion largo `–`).
- Para agregar un día: duplicá una línea completa y cambiá `day` y `times`. **No te olvides de la coma.**
- Si cambiás mucho la grilla, actualizá también `hours:` (el cartelito "Turnos de 08 a 16 hs").

### 3) Cambiar textos de cualquier parte
`js/app.js`, dentro del componente correspondiente (buscá por la sección en pantalla):
`Hero` (portada), `About` (nosotros), `Schedule` (horarios), `Pricing` (precios),
`Rules` (normas), `CtaBand` (banda de "¿te esperamos?"), `Contact` (contacto), `Footer` (pie).

Buscá el texto exacto con `Ctrl+F` (o `Ctrl+Shift+F` para buscar en toda la carpeta) y cambialo entre comillas.
Dato útil: `Pricing` también tiene dentro los textos sueltos del recargo 10%, el combo familiar y el día 10.

### 4) Cambiar teléfono / WhatsApp (¡importante: son 3 lugares!)
El teléfono y los links de WhatsApp están repetidos en 3 archivos. Si los cambiás en uno solo, la web queda
"a medias". Cambialos en los tres:

1. `js/app.js` → dentro de `var COACHES`: `phone:` y `wa:` de Lucas y de Agus.
2. `index.html` → abajo, en el bloque `<div class="fallback">` (el respaldo si falla React).
3. `index.html` → en el `<head>`, el bloque `application/ld+json` (el `telephone` y el link, para Google).

Ojo con los links de WhatsApp: los que usa la web son cortos (`https://wa.link/gwx8o7` para Lucas,
`https://wa.link/c5f5il` para Agus) y **llevan adentro el mensaje ya escrito** que recibe el profe.
Si necesitás un link nuevo, generá uno así (reemplazá el número y el texto):

```
https://api.whatsapp.com/send?phone=542494696017&text=Hola%20Lucas%20%E2%9C%A8%0A%0AMe%20interesa%20G%C3%89NESIS
```

### 5) Cambiar los colores
`css/styles.css`, bloque `:root`:

```css
--crimson: #dc354f;   /* rojo del logo */
--teal:    #0aa28b;   /* verde del logo */
--bg:      #0a0b0d;   /* fondo casi negro */
--text:    #f2f4f6;   /* color del texto */
```

Cambiá el valor que quieras y recargá. El estilo usa "poco neón": si tocás esto, mantené los brillos
suaves (son sombras con poca opacidad). No hay que tocar nada más: **todos** los colores salen de estas variables.

### 6) Cambiar una foto
- Reemplazá el archivo en `img/` **conservando el nombre**: `hero.jpg` (fondo de la portada),
  `duo.jpg` (Lucas y Agustina juntos), `lucas.jpg` y `agus.jpg` (fotos verticales de cada profe),
  `dumbbells.jpg` (banda del medio), `logo-mark.png` (ícono del menú y footer), `favicon.png` (ícono del navegador).
- Recomendado: JPG para fotos (PNG solo para el logo, que necesita transparencia).
- Tamaños que funcionan bien: `hero.jpg` y `duo.jpg` anchas (~1600px), `lucas.jpg`/`agus.jpg` verticales (~1100px).
- El logo "grande con la palabra GÉNESIS" está en `img/logo-full.png` (no se usa en la página, queda de referencia).

### 7) Agregar o cambiar una norma
`js/app.js`, en `var RULES`: es una lista de frases. Agregá una línea nueva (con coma al final)
y aparece sola en la sección "Normas y condiciones":

```js
var RULES = [
  "El gimnasio trabaja con horarios fijos.",
  "Los días feriados el gimnasio permanecerá cerrado.",
  "Traer toalla y botellita de agua.",     // ← tu norma nueva
];
```

### 8) Cambiar Instagram o la dirección
`js/app.js`, arriba: `var IG = { url: "...", label: "@genesis.caf.gym" }` y
`var MAPS = { url: "...", label: "Av. Matheu 268 — Rauch, Buenos Aires" }`.

---

## 6. Cómo verificar que no rompiste nada (checklist)

1. Guardá el archivo (`Ctrl+S`).
2. Abrí `index.html` con doble clic.
3. Recargá sin caché: `Ctrl+Shift+R` (si no, a veces seguís viendo la versión vieja).
4. Mirá la página completa: ¿se ve todo? ¿los textos están bien escritos?
5. Abrí `F12` → pestaña **Consola**: no debería aparecer nada rojo tipo "Uncaught" o "SyntaxError".
   (Si abrís la página con doble clic es normal que aparezcan avisos de red/fuentes; lo que importa
   es que no haya errores de JavaScript.)
6. Chequeo automático de sintaxis (opcional, detecta comas o comillas mal puestas):

```bash
/tmp/opencode/venv/bin/python -c "import esprima; esprima.parseScript(open('js/app.js').read()); print('OK')"
```

Si imprime `OK`, el archivo de JavaScript está bien formado.
(Si el comando falla porque no existe la carpeta venv, recreala con
`python3 -m venv /tmp/opencode/venv && /tmp/opencode/venv/bin/pip install esprima`.)

---

## 7. Errores comunes y cómo solucionarlos

| Qué pasa | Causa probable | Solución |
|---|---|---|
| La página se ve toda vacía | Rompiste `index.html` o `app.js` | `git restore js/app.js` (o `index.html`) |
| Texto que no cambia al recargar | Caché del navegador | `Ctrl+Shift+R` |
| Texto raro con `,` o `$` pegados | Comilla o coma mal puesta en `app.js` | Revisá esa línea; el chequeo de esprima te dice el error |
| Se ve todo pegado / sin colores | Te faltó una llave `}` en el CSS | Buscá el último cambio en `styles.css` y corrijalo |
| Faltó un precio o un horario | Se te olvidó la coma entre elementos | Agregá la `,` al final del elemento anterior |
| No carga una foto | Nombre del archivo distinto | Volvé a ponerle el nombre original en `img/` |
| Desapareció el menú en el celular | Metiste un `</div>` de más | Revertí el archivo: `git restore index.html` |

Ojo con dos detalles de JavaScript que confunden al principio:

- Los textos van **entre comillas**: `name: "Clase particular"`. Si el texto ya tiene comillas o
  apóstrofes, usá comillas dobles afuera y simples adentro (o al revés), no iguales.
- Cada elemento de una lista termina en **coma**, salvo el último.

---

## 8. Mini glosario

| Término | Qué significa acá |
|---|---|
| HTML | La estructura de la página (lo que el navegador "arma") |
| CSS | Cómo se ve: colores, tamaños, espacios, animaciones |
| JavaScript (JS) | La lógica: qué pasa y con qué datos |
| React | Librería que dibuja la página con código en vez de HTML escrito a mano |
| Componente | Una parte reutilizable de la página (en este archivo: `Hero`, `Pricing`…) |
| Variable | Un dato con nombre, como `PLANS` o `COACHES` |
| Lista (`[ ]`) / Objeto (`{ }`) | Las dos formas de agrupar datos en JS |
| Selector de CSS | `.btn-primary` es "todos los botones primarios"; `#inicio` es "el elemento con id inicio" |
| Media query | Reglas de CSS que se aplican según la pantalla (celu / compu) |
| UMD | Formato de librerías que funciona sin instalar nada (lo de `vendor/`) |

---

## 9. GitHub: guardar y compartir tus cambios (ciclo completo)

**Comandos:**

```bash
git status                  # 1. ¿qué cambié?
git add .                   # 2. preparar todos los cambios
git commit -m "Cambié los precios"   # 3. guardar el estado con un mensaje
git push                    # 4. subirlo a GitHub
```

**Ejemplo real:** cambiás un precio → `git status` → `git add .` → `git commit -m "Actualicé precios"`
→ `git push`. Con eso tu cambio queda guardado en el historial **y** subido a GitHub: si mañana se rompe
la página en otro dispositivo, recuperás la versión anterior desde la web.

- `git log --oneline` te muestra el historial (una línea por versión guardada).
- `git diff` te muestra, línea por línea, qué modificaste antes de guardar.
- **Deshacer sin guardar todavía:** `git restore js/app.js` (borra los cambios de ese archivo).
- Si ya habías hecho commit y te arrepentiste: no se borra el historial, se corrige y se sube otra
  versión (`git add . && git commit -m "Corrijo..." && git push`). Eso es normal y está bien.

**Sobre este repositorio:**

- Está en <https://github.com/rochatomas-ing/genesis-caf-landing> (público: cualquiera puede ver el código y las fotos).
- Si algún día querés que sea privado: en GitHub, **Settings → Danger Zone → Change visibility**.
- Opcional: se puede publicar la página como sitio web con **Settings → Pages** (source: `main`, carpeta `/`).
  Eso genera una dirección pública tipo `https://rochatomas-ing.github.io/genesis-caf-landing/`.

---

## 10. Reglas de oro para editar sin romper

1. **Un cambio a la vez**: guardá, probá, y recién ahí hacés el siguiente.
2. **Siempre probá en el navegador** con `Ctrl+Shift+R`.
3. **Si algo se rompió, `git restore <archivo>`**: no busques el error durante horas, volvé atrás y reintentá más simple.
4. **No toques `vendor/`** ni los bloques `useState`/`useEffect` salvo que tengas que hacerlo.
5. **No inventes información**: los datos son reales (precios, horarios, teléfonos). Si no estás seguro,
  confirmalo con el gimnasio antes de cambiarlo.
6. Cuando aprendas a escribir un poco más de JavaScript, ahí sí conviene migrar esta página a React
   "de verdad" (JSX + npm). Por ahora esta versión sin build es ideal para aprender y para tocar sin riesgo.