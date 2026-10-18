# AGENTS.md — GÉNESIS C.A.F landing page

Static one-page site for the gym GÉNESIS (Rauch, Buenos Aires). Spanish copy.
`README.md` is the user-facing doc — keep both in sync when you change structure.

## Stack (no build, no git, no CI, no node/npm on this machine)

- `index.html` → `css/styles.css` + `vendor/` (React 18 UMD, ReactDOM UMD, htm) → `js/app.js`. All classic `<script defer>`, no bundler, no `package.json`.
- JSX is **not** available (no Babel). Markup uses **htm**: `html\`<div className=...>...\``, components as `<${Comp} prop=${v}>`, close components with `<//>`, SVG attrs camelCase (`strokeWidth`), props use `className` (not `class`), CSS custom props pass as `style=${{ '--d': '90ms' }}`.

## Hard constraints

- **Must keep working when opened via `file://` (double click).** So: no ES modules, no `fetch()` of local files, no `<script type="text/babel" src=...>`. Any new dependency must be a UMD build placed in `vendor/` and referenced with a `<script>` tag.
- **Content stays faithful to the gym's real published info.** Don't invent claims (e.g. "grupos reducidos" was removed because the gym's site never states it). All copy came from the gym's Canva site; re-verify before changing prices/horarios.
- Brand palette in `:root` of `css/styles.css`: `--crimson: #dc354f`, `--teal: #0aa28b` (from their logo). The brief is **"poco neón"** — soft low-alpha glows and thin gradient borders; don't ramp up the neon.

## Where things live

- Editable data is in constants at the top of `js/app.js`: `COACHES`, `PLANS`, `RULES`, `IG`, `MAPS`, `NAV`.
- Contact data is duplicated in 3 places — change all of them together: `js/app.js` constants, the `#root`-fallback markup in `index.html`, and the JSON-LD `HealthClub` block in `<head>`.
- WhatsApp links are short `wa.link` URLs that **encode a prefilled message** (Lucas `gwx8o7`, Agus `c5f5il`). Swapping them for `tel:` or plain `api.whatsapp.com` drops the message text.
- Phone mapping (from their site): **2494 - 696017 = Lucas, 2494 - 542472 = Agus** (note: `2494` is the prefix they publish even though the gym is in Rauch — leave as is unless the gym says otherwise).
- Images: fixed filenames in `img/` referenced from `js/app.js` + `index.html` (`hero, duo, lucas, agus, dumbbells, logo-mark, logo-full, favicon`). `logo-mark.png` was cropped from `logo-full.png` (icon only, no "GÉNESIS" wordmark, transparent).
- Two runtime switches must stay wired together: `js/app.js` sets `window.__genesisMounted`, and the 3.5 s timeout in `index.html` adds `html.no-react`, which reveals `.fallback` and hides `#root` (no blank page if React fails).
- Scroll-reveal only works through the React `<Reveal>` component (IntersectionObserver adds `.in`). The hiding rule is gated on `html.js`, set by an inline script in `<head>`; raw hand-written markup outside React would stay invisible.
- Motion code is guarded twice on purpose: JS `prefersReduced()` (parallax, tilt, smooth scroll) and the `prefers-reduced-motion` CSS block. Add both when introducing new motion.

## Verification (there is no test framework)

Syntax check of the only JS file:

```bash
/tmp/opencode/venv/bin/python -c "import esprima; esprima.parseScript(open('js/app.js').read()); print('OK')"
```

If that venv is gone: `python3 -m venv /tmp/opencode/venv && /tmp/opencode/venv/bin/pip install esprima` (it also has pillow/numpy, used to process `img/`).

Visual check with Firefox 147 (snap) headless:

```bash
MOZ_HEADLESS=1 firefox --new-instance --profile ~/.cache/ffprof \
  --screenshot ~/shot.png --window-size=1440,1000 \
  "file:///home/tomasrocha/genesis-landing/index.html"
```

Snap Firefox has a **private `/tmp`**: profile and screenshot paths must live under `$HOME`, or the screenshot is silently not written. Other traps:

- The screenshot fires at load, **before** the hero entry animations finish — hero text looks blank/ghosted in captures. That is a capture artifact, not a bug.
- Hero is `min-height: 100svh`, so a tall capture window (e.g. 8000px) makes the hero swallow the whole image; for full-page checks screenshot a copy with `.hero{min-height:auto!important}` plus `*{animation:none!important;transition:none!important}` and `.reveal{opacity:1!important;transform:none!important;filter:none!important}`.
- To inspect another state (e.g. the "Agus" tab), `sed 's/useState("lucas")/useState("agus")/' js/app.js > js/_t.js` and point a temp HTML copy at it — there is no other hook.
- Slice big captures with the venv's pillow before viewing; full-page PNGs are tens of MB.

## Deploy

Pure static: drop the folder on Netlify/Vercel/GitHub Pages. Nothing to configure (no build step).