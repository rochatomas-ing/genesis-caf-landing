# GÉNESIS — Centro de Actividad Física · Landing page

Landing page moderna (dark, con acentos sutiles rojo/verde del logo) para **GÉNESIS C.A.F**,
el gimnasio de **Lucas y Agustina** en **Av. Matheu 268, Rauch, Buenos Aires**.

Toda la información (horarios, precios, normas, contactos) fue tomada del sitio original del gimnasio
(`politica-nulma.my.canva.site/genesis-caf-gym`).

> 📚 **¿Primera vez con HTML / CSS / JavaScript?** Mirá [LEARNING.md](LEARNING.md): tiene la ruta de
> aprendizaje en 4 sesiones y recetas paso a paso para cambiar precios, horarios, colores y fotos sin
> romper nada. Y podés volver atrás cualquier cambio con `git restore <archivo>` (guía, sección 1).

---

## ▶️ Cómo verla

**Opción 1 (la más simple):** abrí `index.html` con doble clic. Funciona sin servidor y sin internet
(React y las fuentes base están incluidos localmente; las tipografías de Google se cargan si hay conexión y si no, usa fuentes del sistema).

**Opción 2 (servidor local):**

```bash
cd genesis-landing
python3 -m http.server 8000
# abrir http://localhost:8000
```

---

## 📁 Estructura

```
genesis-landing/
├── index.html          # Estructura, SEO, Open Graph y respaldo sin React
├── css/
│   └── styles.css      # Todo el diseño (variables de color arriba de todo)
├── js/
│   └── app.js          # Toda la lógica y los componentes de React
├── img/                # Logo, favicon y fotos del gimnasio
├── vendor/             # React 18 + htm (incluidos, no requiere CDN)
└── README.md
```

---

## ✏️ Cómo actualizar contenido

Casi todo lo editable está en **constantes al inicio de `js/app.js`**:

| Constante | Qué contiene |
|---|---|
| `COACHES` | Profes Lucas y Agus: foto, teléfono, link de WhatsApp y **horarios** |
| `PLANS` | **Precios** (clase particular y planes por semana) |
| `RULES` | Normas y condiciones |
| `IG`, `MAPS` | Instagram y dirección (link a Google Maps) |
| `NAV` | Secciones del menú |

Los **colores** se cambian en `css/styles.css`, bloque `:root`
(`--crimson` / `--teal` son los del logo; `--bg` el fondo).

Las **fotos** se reemplazan en `img/` manteniendo los mismos nombres
(`hero.jpg`, `duo.jpg`, `lucas.jpg`, `agus.jpg`, `dumbbells.jpg`, `logo-mark.png`, `favicon.png`).

---

## ⚙️ Tecnología

- **React 18 + [htm](https://github.com/developit/htm)** — sin build step ni dependencias que instalar.
  Las librerías están en `vendor/` (funciona offline).
- **CSS moderno**: variables, `clamp()`, glassmorphism, glows sutiles ("poco neón"),
  `@property` para el borde animado de la tarjeta destacada.
- **Interacciones**: scroll reveal con IntersectionObserver, parallax del hero y de la banda CTA,
  barra de progreso de scroll, navbar con sección activa, tabs animadas de horarios,
  botones con brillo y elevación, copiar teléfono al portapapeles, botón "volver arriba".
- **Accesibilidad**: navegación por teclado en las tabs, `aria-*`, foco visible y soporte de
  `prefers-reduced-motion` (desactiva animaciones).
- **Respaldo**: si React no llega a cargar, se muestra una versión mínima con los contactos
  (no queda nunca una página en blanco).

---

## 🚀 Publicarla

Es 100% estática: podés subir la carpeta completa a
[Netlify Drop](https://app.netlify.com/drop), Vercel, GitHub Pages o cualquier hosting.
No hace falta configurar nada (no hay build).

---

## 📌 Notas

- Precios y horarios corresponden a los publicados por el gimnasio al momento de armar esta página;
  si cambian, actualizá las constantes de `js/app.js`.
- El logo y las fotos son del gimnasio (extraídos de su sitio). Si preferís otras imágenes,
  reemplazalas en `img/`.
- El formulario no existe: todos los CTA abren **WhatsApp** con el mensaje ya escrito para cada profe
  (Lucas: 2494 - 696017 · Agus: 2494 - 542472).
