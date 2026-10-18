/* ============================================================
   GÉNESIS · Centro de Actividad Física — Landing page
   React 18 (UMD) + htm — sin build step.
   Toda la info del gimnasio está en las constantes de datos.
   ============================================================ */
(function () {
  "use strict";

  var rootEl = document.getElementById("root");
  if (!rootEl || !window.React || !window.ReactDOM || !window.htm) return;

  var html = window.htm.bind(window.React.createElement);
  var React = window.React;
  var useState = React.useState;
  var useEffect = React.useEffect;
  var useRef = React.useRef;

  /* ----------------------------------------------------------
     DATOS DEL GIMNASIO — editar acá para actualizar la página
     ---------------------------------------------------------- */
  var WA_MSG = "Hola %s ✨🖤 Te mando para consultarte sobre GÉNESIS 💪🏻🏋🏼";

  var COACHES = {
    lucas: {
      id: "lucas",
      name: "Profe Lucas",
      short: "Lucas",
      photo: "img/lucas.jpg",
      phone: "2494 - 696017",
      wa: "https://wa.link/gwx8o7",
      hours: "Turnos de 08 a 16 hs",
      days: [
        { day: "Lunes y miércoles", times: ["08:00 – 09:00", "09:00 – 10:00", "14:00 – 15:00", "15:00 – 16:00"] },
        { day: "Martes", times: ["08:00 – 09:30", "14:00 – 15:00", "15:00 – 16:00"] },
        { day: "Jueves", times: ["14:00 – 15:00", "15:00 – 16:00"] },
        { day: "Viernes", times: ["14:00 – 15:00", "15:00 – 16:00"] }
      ]
    },
    agus: {
      id: "agus",
      name: "Profe Agus",
      short: "Agus",
      photo: "img/agus.jpg",
      phone: "2494 - 542472",
      wa: "https://wa.link/c5f5il",
      hours: "Turnos de 18 a 21 hs",
      days: [
        { day: "Lunes a jueves", times: ["18:00 – 19:00", "19:00 – 20:00", "20:00 – 21:00"] },
        { day: "Viernes", times: ["18:00 – 19:00", "19:00 – 20:00"] }
      ]
    }
  };

  var PLANS = [
    { name: "Clase particular", price: "$6.000", per: "por clase", eq: null, featured: false },
    { name: "1 vez por semana", price: "$24.000", per: "por mes", eq: "$6.000 por clase", featured: false },
    { name: "2 veces por semana", price: "$32.000", per: "por mes", eq: "$4.000 por clase", featured: false },
    { name: "3 veces por semana", price: "$35.000", per: "por mes", eq: "$2.917 por clase", featured: false },
    { name: "4 veces por semana", price: "$38.000", per: "por mes", eq: "$2.375 por clase", featured: true }
  ];

  var RULES = [
    "El gimnasio trabaja con horarios fijos.",
    "En caso de llegar 15 minutos más tarde, la rutina se acortará respetando el horario de finalización del turno.",
    "En caso de inasistencias por 3 clases consecutivas, el gimnasio se comunicará para confirmar la continuidad.",
    "Los pagos deberán realizarse antes del día 10 de cada mes para mantener el valor vigente.",
    "Cada profesor se maneja con sus propios alumnos y horarios dentro del gimnasio.",
    "Cada alumno abona la cuota directamente a su profesor correspondiente.",
    "No se realizan reintegros ni compensaciones por inasistencias.",
    "Los días feriados el gimnasio permanecerá cerrado."
  ];

  var IG = { url: "https://www.instagram.com/genesis.caf.gym", label: "@genesis.caf.gym" };
  var MAPS = { url: "https://maps.app.goo.gl/CNsfCRra7sFCTpgY7", label: "Av. Matheu 268 — Rauch, Buenos Aires" };

  var NAV = [
    { id: "inicio", label: "Inicio" },
    { id: "nosotros", label: "Nosotros" },
    { id: "horarios", label: "Horarios" },
    { id: "precios", label: "Precios" },
    { id: "normas", label: "Normas" },
    { id: "contacto", label: "Contacto" }
  ];

  /* ----------------------------------------------------------
     Íconos SVG
     ---------------------------------------------------------- */
  function Svg(props) {
    return html`<svg
      xmlns="http://www.w3.org/2000/svg"
      width=${props.s || 18}
      height=${props.s || 18}
      viewBox="0 0 24 24"
      fill=${props.fill || "none"}
      stroke=${props.fill ? "none" : "currentColor"}
      strokeWidth=${props.w || 2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >${props.children}</svg>`;
  }

  var IconWa = (p) => html`<svg width=${p.s || 18} height=${p.s || 18} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg>`;

  var IconIg = (p) => html`<${Svg} s=${p.s}><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/><//>`;

  var IconPin = (p) => html`<${Svg} s=${p.s}><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="3"/><//>`;

  var IconClock = (p) => html`<${Svg} s=${p.s || 15}><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/><//>`;

  var IconBolt = (p) => html`<${Svg} s=${p.s}><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/><//>`;

  var IconHeart = (p) => html`<${Svg} s=${p.s}><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/><//>`;

  var IconSpark = (p) => html`<${Svg} s=${p.s}><path d="M12 2l2.4 7.6H22l-6.2 4.5 2.4 7.6L12 17.2 5.8 21.7l2.4-7.6L2 9.6h7.6z"/><//>`;

  var IconTrend = (p) => html`<${Svg} s=${p.s}><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/><//>`;

  var IconCheck = (p) => html`<${Svg} s=${p.s}><polyline points="20 6 9 17 4 12"/><//>`;

  var IconArrowR = (p) => html`<${Svg} s=${p.s || 17} className="arrow"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/><//>`;

  var IconArrowU = (p) => html`<${Svg} s=${p.s || 19}><line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/><//>`;

  var IconCopy = (p) => html`<${Svg} s=${p.s || 16}><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/><//>`;

  var IconInfo = (p) => html`<${Svg} s=${p.s || 17}><circle cx="12" cy="12" r="9"/><line x1="12" y1="11" x2="12" y2="16"/><line x1="12" y1="8" x2="12.01" y2="8"/><//>`;

  var IconAlert = (p) => html`<${Svg} s=${p.s || 17}><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/><//>`;

  var IconTag = (p) => html`<${Svg} s=${p.s || 17}><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/><//>`;

  var IconDumbbell = (p) => html`<${Svg} s=${p.s || 20}><path d="M6.5 6.5v11"/><path d="M17.5 6.5v11"/><path d="M3 9v6"/><path d="M21 9v6"/><path d="M6.5 12h11"/><//>`;

  var IconCoin = (p) => html`<${Svg} s=${p.s || 15}><circle cx="12" cy="12" r="9"/><path d="M14.8 9.2A3 3 0 0 0 12 8c-1.7 0-3 1-3 2.2s1.3 2.1 3 2.1 3 .9 3 2.1-1.3 2.1-3 2.1a3 3 0 0 1-2.8-1.2"/><path d="M12 6.4v1.4M12 16.2v1.4"/><//>`;

  /* ----------------------------------------------------------
     Hooks utilitarios
     ---------------------------------------------------------- */
  function prefersReduced() {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }

  function useScrollY() {
    var pair = useState(0);
    var y = pair[0];
    var setY = pair[1];
    useEffect(function () {
      var raf = 0;
      var onScroll = function () {
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(function () { setY(window.scrollY); });
      };
      onScroll();
      window.addEventListener("scroll", onScroll, { passive: true });
      return function () {
        window.removeEventListener("scroll", onScroll);
        cancelAnimationFrame(raf);
      };
    }, []);
    return y;
  }

  function useActiveSection(ids) {
    var pair = useState(ids[0]);
    var active = pair[0];
    var setActive = pair[1];
    useEffect(function () {
      var raf = 0;
      var onScroll = function () {
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(function () {
          var probe = window.scrollY + window.innerHeight * 0.34;
          var current = ids[0];
          for (var i = 0; i < ids.length; i++) {
            var el = document.getElementById(ids[i]);
            if (el && el.getBoundingClientRect().top + window.scrollY <= probe) current = ids[i];
          }
          if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) {
            current = ids[ids.length - 1];
          }
          setActive(current);
        });
      };
      onScroll();
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onScroll);
      return function () {
        window.removeEventListener("scroll", onScroll);
        window.removeEventListener("resize", onScroll);
        cancelAnimationFrame(raf);
      };
    }, [ids.join("|")]);
    return active;
  }

  function useInView(options) {
    var ref = useRef(null);
    var pair = useState(false);
    var inView = pair[0];
    var setInView = pair[1];
    useEffect(function () {
      var el = ref.current;
      if (!el) return;
      if (!("IntersectionObserver" in window)) {
        setInView(true);
        return;
      }
      var io = new IntersectionObserver(function (entries) {
        if (entries[0].isIntersecting) {
          setInView(true);
          io.unobserve(el);
        }
      }, options || { threshold: 0.16, rootMargin: "0px 0px -8% 0px" });
      io.observe(el);
      return function () { io.disconnect(); };
    }, []);
    return [ref, inView];
  }

  function useTilt(max) {
    var ref = useRef(null);
    useEffect(function () {
      var el = ref.current;
      if (!el || prefersReduced()) return;
      if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
      var move = function (e) {
        var r = el.getBoundingClientRect();
        var px = (e.clientX - r.left) / r.width - 0.5;
        var py = (e.clientY - r.top) / r.height - 0.5;
        el.style.transform =
          "perspective(900px) rotateY(" + (px * max * 2).toFixed(2) + "deg) rotateX(" +
          (-py * max * 2).toFixed(2) + "deg) translateY(-6px)";
      };
      var leave = function () { el.style.transform = ""; };
      el.addEventListener("mousemove", move);
      el.addEventListener("mouseleave", leave);
      return function () {
        el.removeEventListener("mousemove", move);
        el.removeEventListener("mouseleave", leave);
      };
    }, [max]);
    return ref;
  }

  function scrollToId(id) {
    var el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: prefersReduced() ? "auto" : "smooth", block: "start" });
    if (history.replaceState) history.replaceState(null, "", "#" + id);
  }

  function copyText(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(text).then(function () { return true; }, function () { return fallbackCopy(text); });
    }
    return Promise.resolve(fallbackCopy(text));
  }
  function fallbackCopy(text) {
    var ta = document.createElement("textarea");
    ta.value = text;
    ta.setAttribute("readonly", "");
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    var ok = false;
    try { ok = document.execCommand("copy"); } catch (e) { ok = false; }
    document.body.removeChild(ta);
    return ok;
  }

  /* ----------------------------------------------------------
     Componentes base
     ---------------------------------------------------------- */
  function Reveal(props) {
    var pair = useInView();
    var ref = pair[0];
    var inView = pair[1];
    var Tag = props.as || "div";
    var cls = "reveal" + (props.blur ? " reveal-blur" : "") + (inView ? " in" : "") + (props.className ? " " + props.className : "");
    return html`<${Tag}
      ref=${ref}
      className=${cls}
      style=${{ "--d": (props.delay || 0) * 90 + "ms" }}
    >${props.children}<//>`;
  }

  function NavLink(props) {
    var onClick = function (e) {
      e.preventDefault();
      if (props.onNavigate) props.onNavigate();
      scrollToId(props.id);
    };
    return html`<a
      href=${"#" + props.id}
      className=${"nav-link" + (props.active ? " active" : "")}
      aria-current=${props.active ? "true" : undefined}
      onClick=${onClick}
      style=${props.style}
    >${props.label}</a>`;
  }

  /* ----------------------------------------------------------
     Navbar + menú móvil
     ---------------------------------------------------------- */
  function Navbar(props) {
    var active = props.active;
    var y = props.scrollY;
    var pair = useState(false);
    var open = pair[0];
    var setOpen = pair[1];

    useEffect(function () {
      document.body.style.overflow = open ? "hidden" : "";
      var onKey = function (e) { if (e.key === "Escape") setOpen(false); };
      window.addEventListener("keydown", onKey);
      return function () {
        document.body.style.overflow = "";
        window.removeEventListener("keydown", onKey);
      };
    }, [open]);

    var close = function () { setOpen(false); };

    return html`<${React.Fragment}>
      <header className=${"nav" + (y > 24 ? " scrolled" : "")}>
        <div className="nav-inner">
          <a className="brand" href="#inicio" onClick=${function (e) { e.preventDefault(); close(); scrollToId("inicio"); }} aria-label="GÉNESIS — ir al inicio">
            <span className="brand-badge"><img src="img/logo-mark.png" alt="Logo de GÉNESIS" /></span>
            <span>
              <span className="brand-name">Génesis</span>
              <span className="brand-sub">Centro de Actividad Física</span>
            </span>
          </a>

          <nav className="nav-links" aria-label="Navegación principal">
            ${NAV.map(function (l) {
              return html`<${NavLink} key=${l.id} id=${l.id} label=${l.label} active=${active === l.id} />`;
            })}
          </nav>

          <a
            className="btn btn-primary btn-sm nav-cta"
            href="#contacto"
            onClick=${function (e) { e.preventDefault(); scrollToId("contacto"); }}
          ><${IconWa} s=${16} /> Reservar</a>

          <button
            className=${"burger" + (open ? " open" : "")}
            aria-label=${open ? "Cerrar menú" : "Abrir menú"}
            aria-expanded=${open}
            onClick=${function () { setOpen(!open); }}
          ><span></span></button>
        </div>
      </header>

      <div className=${"drawer" + (open ? " open" : "")} aria-hidden=${!open}>
        <nav aria-label="Menú móvil">
          ${NAV.map(function (l, i) {
            return html`<${NavLink}
              key=${l.id}
              id=${l.id}
              label=${l.label}
              active=${active === l.id}
              onNavigate=${close}
              style=${{ "--i": i }}
            />`;
          })}
        </nav>
        <div className="drawer-foot">
          <${WaButton} coach=${COACHES.lucas} label="WhatsApp Lucas" />
          <${WaButton} coach=${COACHES.agus} label="WhatsApp Agus" ghost=${true} />
        </div>
        <div className="drawer-soc">
          <a href=${IG.url} target="_blank" rel="noopener">${IG.label}</a>
          <a href=${MAPS.url} target="_blank" rel="noopener">Av. Matheu 268, Rauch</a>
        </div>
      </div>
    <//>`;
  }

  function WaButton(props) {
    var cls = "btn " + (props.ghost ? "btn-ghost" : "btn-teal") + (props.small ? " btn-sm" : "");
    return html`<a
      className=${cls}
      href=${props.coach.wa}
      target="_blank"
      rel="noopener"
      aria-label=${"Enviar mensaje de WhatsApp a " + props.coach.name}
    ><${IconWa} s=${props.small ? 16 : 18} /> ${props.label}<//>`;
  }

  /* ----------------------------------------------------------
     Hero
     ---------------------------------------------------------- */
  function Hero() {
    var bgRef = useRef(null);
    var visRef = useRef(null);

    useEffect(function () {
      if (prefersReduced()) return;
      var raf = 0;
      var onScroll = function () {
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(function () {
          var y = window.scrollY;
          if (y > window.innerHeight * 1.2) return;
          if (bgRef.current) bgRef.current.style.transform = "translateY(" + (y * 0.22).toFixed(1) + "px)";
          if (visRef.current) visRef.current.style.transform = "translateY(" + (-y * 0.05).toFixed(1) + "px)";
        });
      };
      onScroll();
      window.addEventListener("scroll", onScroll, { passive: true });
      return function () {
        window.removeEventListener("scroll", onScroll);
        cancelAnimationFrame(raf);
      };
    }, []);

    var d = function (i) { return { "--d": i * 110 + "ms" }; };

    return html`<section className="hero" id="inicio">
      <div className="hero-bg" ref=${bgRef} aria-hidden="true"><img src="img/hero.jpg" alt="" /></div>
      <div className="hero-shade" aria-hidden="true"></div>
      <div className="glow b1" aria-hidden="true"></div>
      <div className="glow b2" aria-hidden="true"></div>

      <div className="container hero-grid">
        <div>
          <span className="hero-badge h-in" style=${d(0)}>
            <span className="pulse" aria-hidden="true"></span>
            Centro de Actividad Física
          </span>

          <h1 className="h-in" style=${d(1)}><span className="split">Génesis</span></h1>

          <p className="hero-tagline h-in" style=${d(2)}>
            Entrenamiento personalizado en <b>Rauch, Buenos Aires</b>.
          </p>
          <p className="hero-copy h-in" style=${d(3)}>
            Lucas y Agustina, profesores recibidos del Profesorado de Educación Física.
            Trabajamos de manera personalizada, acompañándote a cumplir tus objetivos, sea cual sea tu punto de partida.
          </p>

          <div className="hero-actions h-in" style=${d(4)}>
            <a className="btn btn-primary" href="#contacto" onClick=${function (e) { e.preventDefault(); scrollToId("contacto"); }}>
              <${IconWa} s=${18} /> Reservá tu turno <${IconArrowR} />
            </a>
            <a className="btn btn-ghost" href="#horarios" onClick=${function (e) { e.preventDefault(); scrollToId("horarios"); }}>
              Ver horarios <${IconClock} s=${17} />
            </a>
          </div>

          <div className="hero-chips h-in" style=${d(5)}>
            <span className="chip"><span className="dot dot-crimson"></span>Rendimiento deportivo</span>
            <span className="chip"><span className="dot dot-teal"></span>Readaptación de lesiones</span>
            <span className="chip"><span className="dot dot-white"></span>Calidad de vida</span>
          </div>

          <div className="hero-facts h-in" style=${d(6)}>
            <span><b>Turnos de 08 a 21 hs</b></span>
            <span className="sep" aria-hidden="true"></span>
            <span>Profes recibidos: <b>Lucas y Agustina</b></span>
            <span className="sep" aria-hidden="true"></span>
            <span><b>Horarios fijos</b> de lunes a viernes</span>
          </div>
        </div>

        <div className="hero-visual h-in" style=${d(3)} ref=${visRef}>
          <div className="hero-photo-frame" aria-hidden="true"></div>
          <figure className="hero-photo">
            <img src="img/duo.jpg" alt="Lucas y Agustina, profesores de GÉNESIS" />
          </figure>

          <div className="float-card one" aria-hidden="true">
            <span className="float-icon teal"><${IconCheck} s=${18} /></span>
            <span>
              <span className="t">Profes titulados</span>
              <span className="s">Profesorado de Educación Física</span>
            </span>
          </div>

          <div className="float-card two" aria-hidden="true">
            <span className="avatars">
              <img src="img/lucas.jpg" alt="" />
              <img src="img/agus.jpg" alt="" />
            </span>
            <span>
              <span className="t">Lucas y Agustina</span>
              <span className="s">Te acompañan en cada turno</span>
            </span>
          </div>
        </div>
      </div>

      <div className="scroll-cue" aria-hidden="true">
        <span>Scroll</span>
        <span className="line"></span>
      </div>
    </section>`;
  }

  /* ----------------------------------------------------------
     Marquesina
     ---------------------------------------------------------- */
  function Marquee() {
    var items = [
      "Centro de Actividad Física",
      "Entrenamiento personalizado",
      "Rendimiento deportivo",
      "Readaptación de lesiones",
      "Calidad de vida",
      "Lucas y Agustina · Profes de Ed. Física"
    ];
    var seq = function (key) {
      return html`<div className="marquee-seq" key=${key} aria-hidden=${key === "b"}>
        ${items.map(function (t, i) {
          return html`<span key=${i}><i>✦</i> ${t}</span>`;
        })}
      </div>`;
    };
    return html`<div className="marquee" role="presentation">
      <div className="marquee-track">${seq("a")}${seq("b")}</div>
    </div>`;
  }

  /* ----------------------------------------------------------
     Nosotros
     ---------------------------------------------------------- */
  function About() {
    var objectives = [
      { t: "Mejorar el rendimiento deportivo", s: "Para deportistas y entrenamientos exigentes", icon: IconBolt, tone: "crimson" },
      { t: "Readaptarte luego de una lesión", s: "Volvé a moverte con seguridad y confianza", icon: IconHeart, tone: "teal" },
      { t: "Sentirte mejor y ganar calidad de vida", s: "El mejor plan es el que sostenés en el tiempo", icon: IconSpark, tone: "crimson" }
    ];

    return html`<section className="section" id="nosotros" aria-labelledby="t-nosotros">
      <div className="container about-grid">
        <${Reveal} className="collage">
          <div className="collage-main">
            <img src="img/duo.jpg" alt="Lucas y Agustina en el gimnasio GÉNESIS" />
          </div>
          <span className="collage-tag"><span className="dot dot-teal" aria-hidden="true"></span> Lucas y Agustina</span>
          <div className="collage-mini m1"><img src="img/lucas.jpg" alt="Profesor Lucas entrenando" /></div>
          <div className="collage-mini m2"><img src="img/agus.jpg" alt="Profesora Agustina entrenando" /></div>
        <//>

        <div className="about-copy">
          <${Reveal}><span className="kicker">Nosotros</span><//>
          <${Reveal} delay=${1}>
            <h2 className="sec-title" id="t-nosotros">Entrenamiento <em>hecho a medida</em></h2>
          <//>
          <${Reveal} delay=${2}>
            <p className="lead" style=${{ marginTop: "18px" }}>
              Somos <b>profesores recibidos del Profesorado de Educación Física</b>.
              En GÉNESIS trabajamos de manera personalizada, acompañando a cada persona a cumplir sus objetivos:
            </p>
          <//>

          <div className="obj-list">
            ${objectives.map(function (o, i) {
              var Icon = o.icon;
              return html`<${Reveal} key=${i} delay=${3 + i}>
                <div className=${"obj t-" + o.tone}>
                  <span className=${"ico " + o.tone}><${Icon} s=${22} /></span>
                  <span>
                    <span className="t">${o.t}</span>
                    <span className="s">${o.s}</span>
                  </span>
                </div>
              <//>`;
            })}
          </div>

          <${Reveal} delay=${6}>
            <p className="signature">Lucas y Agustina<small>Profes · GÉNESIS C.A.F.</small></p>
          <//>
        </div>
      </div>
    </section>`;
  }

  /* ----------------------------------------------------------
     Horarios (tabs con React)
     ---------------------------------------------------------- */
  function Schedule() {
    var keys = ["lucas", "agus"];
    var pair = useState("lucas");
    var active = pair[0];
    var setActive = pair[1];
    var coach = COACHES[active];

    var onTabKey = function (e) {
      var idx = keys.indexOf(active);
      if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
        e.preventDefault();
        var next = keys[(idx + (e.key === "ArrowRight" ? 1 : keys.length - 1)) % keys.length];
        setActive(next);
        var el = document.getElementById("tab-" + next);
        if (el) el.focus();
      }
    };

    return html`<section className="section" id="horarios" aria-labelledby="t-horarios">
      <div className="container">
        <div className="sec-head">
          <${Reveal}><span className="kicker">Horarios</span><//>
          <${Reveal} delay=${1}><h2 className="sec-title" id="t-horarios">Elegí tu profe <em>y tu turno</em></h2><//>
          <${Reveal} delay=${2}>
            <p className="sec-sub">
              Cada profe maneja sus propios alumnos y horarios: elegí el turno que mejor te quede.
              El gimnasio trabaja con horarios fijos.
            </p>
          <//>
        </div>

        <${Reveal}>
          <div className="tabs" role="tablist" aria-label="Horarios por profesor" data-active=${keys.indexOf(active)}>
            <span className="tabs-thumb" aria-hidden="true"></span>
            ${keys.map(function (k, i) {
              var c = COACHES[k];
              var count = c.days.reduce(function (acc, d) { return acc + d.times.length; }, 0);
              return html`<button
                key=${k}
                id=${"tab-" + k}
                className=${"tab" + (active === k ? " active" : "")}
                role="tab"
                aria-selected=${active === k}
                aria-controls=${"panel-" + k}
                tabIndex=${active === k ? 0 : -1}
                onClick=${function () { setActive(k); }}
                onKeyDown=${onTabKey}
              >${c.name}<span className="cnt">${count}</span></button>`;
            })}
          </div>

          <div
            className="panel swap"
            key=${active}
            id=${"panel-" + active}
            role="tabpanel"
            aria-labelledby=${"tab-" + active}
          >
            <figure className="coach-card">
              <img src=${coach.photo} alt=${coach.name + " en el gimnasio"} />
              <figcaption className="coach-meta">
                <div className="who">${coach.name}</div>
                <span className="role">${coach.hours}</span>
              </figcaption>
            </figure>

            <div>
              <div className="days-grid">
                ${coach.days.map(function (d, i) {
                  return html`<article className="day" key=${active + i} style=${{ "--i": i }}>
                    <header className="day-head">
                      <span className="d">${d.day}</span>
                      <span className="n">${d.times.length} ${d.times.length === 1 ? "turno" : "turnos"}</span>
                    </header>
                    <ul className="times">
                      ${d.times.map(function (t, j) {
                        return html`<li className="time" key=${j}><${IconClock} s=${15} /> ${t}</li>`;
                      })}
                    </ul>
                  </article>`;
                })}
              </div>

              <div className="schedule-note">
                <${IconInfo} />
                <span><b>Horarios fijos.</b> Si llegás 15 minutos tarde, la rutina se acorta respetando el fin del turno.</span>
                <a className="link-wa" href=${coach.wa} target="_blank" rel="noopener">
                  Consultar con ${coach.short} <${IconArrowR} s=${16} />
                </a>
              </div>
            </div>
          </div>
        <//>
      </div>
    </section>`;
  }

  /* ----------------------------------------------------------
     Precios
     ---------------------------------------------------------- */
  function PlanCard(props) {
    var p = props.plan;
    var ref = useTilt(3.2);
    return html`<article className=${"plan" + (p.featured ? " featured" : "")} ref=${ref}>
      ${p.featured ? html`<span className="plan-badge">Mejor valor por clase</span>` : null}
      <h3 className="plan-name">${p.name}</h3>
      <div className="plan-price">${p.price}</div>
      <div className="plan-per">${p.per}</div>
      <div className="plan-div" aria-hidden="true"></div>
      ${p.eq
        ? html`<p className="plan-eq"><${IconCoin} /> ≈ ${p.eq}</p>`
        : html`<p className="plan-eq"><${IconSpark} /> Sin plan mensual, cuando quieras</p>`}
      <a
        className=${"btn " + (p.featured ? "btn-teal" : "btn-ghost") + " btn-sm"}
        href="#contacto"
        onClick=${function (e) { e.preventDefault(); scrollToId("contacto"); }}
      >Consultar <${IconArrowR} s=${15} /></a>
    </article>`;
  }

  function Pricing() {
    return html`<section className="section" id="precios" aria-labelledby="t-precios">
      <div className="glow" style=${{ width: "480px", height: "480px", top: "6%", right: "-10%", background: "rgba(10,162,139,.10)" }} aria-hidden="true"></div>
      <div className="container">
        <div className="sec-head">
          <${Reveal}><span className="kicker">Precios</span><//>
          <${Reveal} delay=${1}><h2 className="sec-title" id="t-precios">Cuotas claras, <em>sin sorpresas</em></h2><//>
          <${Reveal} delay=${2}>
            <p className="sec-sub">Elegí cuántas veces por semana querés entrenar. Cada alumno abona la cuota directamente a su profesor.</p>
          <//>
        </div>

        <${Reveal}>
          <div className="glass feature-card">
            <span className="fc-ico"><${IconDumbbell} s=${26} /></span>
            <div>
              <div className="fc-name">Clase particular</div>
              <div className="fc-desc">Ideal para arrancar, probar o entrenamientos puntuales.</div>
            </div>
            <div className="fc-price">
              <span className="p">$6.000</span>
              <span className="u">por clase</span>
            </div>
          </div>
        <//>

        <div className="plans">
          ${PLANS.slice(1).map(function (p, i) {
            return html`<${Reveal} key=${p.name} delay=${i + 1}><${PlanCard} plan=${p} /><//>`;
          })}
        </div>

        <div className="notes">
          <${Reveal} delay=${1}>
            <div className="note warn"><${IconAlert} /> <span><b>Fuera de término:</b> toda cuota abonada fuera de fecha tiene un <b>10% de recargo</b> (abonando en fecha y forma).</span></div>
          <//>
          <${Reveal} delay=${2}>
            <div className="note ok"><${IconTag} /> <span><b>Combo familiar:</b> entrenando en familia tenés un <b>10% OFF</b>.</span></div>
          <//>
          <${Reveal} delay=${3}>
            <div className="note info"><${IconInfo} /> <span><b>Antes del día 10:</b> los pagos deben hacerse antes del día 10 de cada mes para mantener el valor vigente.</span></div>
          <//>
        </div>
      </div>
    </section>`;
  }

  /* ----------------------------------------------------------
     Normas y condiciones
     ---------------------------------------------------------- */
  function Rules() {
    return html`<section className="section" id="normas" aria-labelledby="t-normas">
      <div className="container">
        <div className="sec-head">
          <${Reveal}><span className="kicker">Normas y condiciones</span><//>
          <${Reveal} delay=${1}><h2 className="sec-title" id="t-normas">Para entrenar <em>ordenados</em></h2><//>
          <${Reveal} delay=${2}>
            <p className="sec-sub">Unas pautas simples para que todos disfrutemos de los turnos y los espacios en común.</p>
          <//>
        </div>

        <div className="rules">
          ${RULES.map(function (r, i) {
            return html`<${Reveal} key=${i} delay=${Math.min(i, 5)}>
              <div className="rule">
                <span className="num">${("0" + (i + 1)).slice(-2)}</span>
                <p className="txt">${r}</p>
              </div>
            <//>`;
          })}
        </div>
      </div>
    </section>`;
  }

  /* ----------------------------------------------------------
     Banda CTA
     ---------------------------------------------------------- */
  function CtaBand() {
    var bgRef = useRef(null);
    useEffect(function () {
      if (prefersReduced()) return;
      var raf = 0;
      var onScroll = function () {
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(function () {
          var el = bgRef.current;
          if (!el) return;
          var r = el.parentElement.getBoundingClientRect();
          if (r.bottom < 0 || r.top > window.innerHeight) return;
          var off = r.top + r.height / 2 - window.innerHeight / 2;
          el.style.transform = "translateY(" + (off * -0.08).toFixed(1) + "px)";
        });
      };
      onScroll();
      window.addEventListener("scroll", onScroll, { passive: true });
      return function () {
        window.removeEventListener("scroll", onScroll);
        cancelAnimationFrame(raf);
      };
    }, []);

    return html`<section className="cta-band" aria-labelledby="t-cta">
      <div className="cta-bg" ref=${bgRef} aria-hidden="true"><img src="img/dumbbells.jpg" alt="" /></div>
      <div className="container cta-inner">
        <${Reveal}><span className="cta-script">¡Gracias por comunicarte con nosotros!</span><//>
        <${Reveal} delay=${1}><h2 className="cta-title" id="t-cta">Te esperamos para arrancar tu próximo entrenamiento</h2><//>
        <${Reveal} delay=${2}>
          <p className="cta-sub">
            Escribinos por WhatsApp y coordinamos tu primer turno según la disponibilidad de cada profe.
          </p>
        <//>
        <${Reveal} delay=${3}>
          <div className="cta-actions">
            <a className="btn btn-primary" href="#contacto" onClick=${function (e) { e.preventDefault(); scrollToId("contacto"); }}>
              <${IconWa} s=${18} /> Escribinos por WhatsApp
            </a>
            <a className="btn btn-ghost" href="#horarios" onClick=${function (e) { e.preventDefault(); scrollToId("horarios"); }}>
              <${IconClock} s=${17} /> Ver horarios
            </a>
          </div>
        <//>
        <${Reveal} delay=${4}>
          <a className="cta-addr" href=${MAPS.url} target="_blank" rel="noopener">
            <${IconPin} s=${16} /> ${MAPS.label}
          </a>
        <//>
      </div>
    </section>`;
  }

  /* ----------------------------------------------------------
     Contacto
     ---------------------------------------------------------- */
  function CopyButton(props) {
    var pair = useState(false);
    var copied = pair[0];
    var setCopied = pair[1];
    var onClick = function () {
      copyText(props.text).then(function (ok) {
        if (!ok) return;
        setCopied(true);
        setTimeout(function () { setCopied(false); }, 1600);
      });
    };
    return html`<button
      className=${"copy" + (copied ? " copied" : "")}
      onClick=${onClick}
      aria-label=${"Copiar teléfono " + props.text}
      title="Copiar teléfono"
    >${copied ? html`<${IconCheck} s=${16} />` : html`<${IconCopy} />`}</button>`;
  }

  function ContactCard(props) {
    var c = props.coach;
    return html`<div className=${"glass contact-card " + (props.tone || "teal")}>
      <span className="halo" aria-hidden="true"></span>
      <div className="cc-top">
        <img className="cc-avatar" src=${c.photo} alt=${c.name} />
        <div>
          <div className="cc-name">${c.name}</div>
          <div className="cc-role">${c.hours}</div>
        </div>
      </div>
      <div className="cc-phone">
        ${c.phone}
        <${CopyButton} text=${c.phone.replace(/\s/g, "")} />
      </div>
      <p className="cc-note">Hacé clic en el número o en el botón y enviános un mensaje.</p>
      <div className="cc-actions">
        <${WaButton} coach=${c} label=${"WhatsApp " + c.short} />
        <a className="btn btn-ghost btn-sm" href="#horarios" onClick=${function (e) { e.preventDefault(); scrollToId("horarios"); }}>
          <${IconClock} s=${15} /> Ver sus turnos
        </a>
      </div>
    </div>`;
  }

  function Contact() {
    return html`<section className="section" id="contacto" aria-labelledby="t-contacto">
      <div className="glow" style=${{ width: "520px", height: "520px", bottom: "0%", left: "-14%", background: "rgba(220,53,79,.09)" }} aria-hidden="true"></div>
      <div className="container">
        <div className="sec-head">
          <${Reveal}><span className="kicker">Contacto</span><//>
          <${Reveal} delay=${1}><h2 className="sec-title" id="t-contacto">¿Arrancamos? <em>Escribinos</em></h2><//>
          <${Reveal} delay=${2}>
            <p className="sec-sub">Consultá por cupos, horarios y valores con tu profe. También podés visitarnos en el gimnasio.</p>
          <//>
        </div>

        <div className="contact-grid">
          <${Reveal} delay=${1}><${ContactCard} coach=${COACHES.lucas} tone="crimson" /><//>
          <${Reveal} delay=${2}><${ContactCard} coach=${COACHES.agus} tone="teal" /><//>
        </div>

        <div className="mini-grid">
          <${Reveal} delay=${2}>
            <a className="glass mini-card gi" href=${IG.url} target="_blank" rel="noopener">
              <span className="mi"><${IconIg} s=${24} /></span>
              <span>
                <span className="mt">${IG.label}</span>
                <span className="ms">Seguinos en Instagram</span>
              </span>
              <span className="arrow"><${IconArrowR} s=${18} /></span>
            </a>
          <//>
          <${Reveal} delay=${3}>
            <a className="glass mini-card gm" href=${MAPS.url} target="_blank" rel="noopener">
              <span className="mi"><${IconPin} s=${24} /></span>
              <span>
                <span className="mt">Av. Matheu 268</span>
                <span className="ms">Rauch, Buenos Aires · Ver en Google Maps</span>
              </span>
              <span className="arrow"><${IconArrowR} s=${18} /></span>
            </a>
          <//>
        </div>

        <${Reveal} delay=${4}>
          <p className="hint">Cada alumno abona la cuota <b>directamente a su profesor correspondiente</b>. Los feriados el gimnasio permanece cerrado.</p>
        <//>
      </div>
    </section>`;
  }

  /* ----------------------------------------------------------
     Footer
     ---------------------------------------------------------- */
  function Footer() {
    var year = new Date().getFullYear();
    return html`<footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <a className="brand" href="#inicio" onClick=${function (e) { e.preventDefault(); scrollToId("inicio"); }}>
              <span className="brand-badge"><img src="img/logo-mark.png" alt="" /></span>
              <span>
                <span className="brand-name">Génesis</span>
                <span className="brand-sub">Centro de Actividad Física</span>
              </span>
            </a>
            <p className="footer-about">
              Entrenamiento personalizado en Rauch, Buenos Aires.
              Rendimiento deportivo, readaptación de lesiones y calidad de vida, con Lucas y Agustina.
            </p>
          </div>

          <nav aria-label="Secciones">
            <h4>Secciones</h4>
            <div className="footer-links">
              ${NAV.map(function (l) {
                return html`<a key=${l.id} href=${"#" + l.id} onClick=${function (e) { e.preventDefault(); scrollToId(l.id); }}>${l.label}</a>`;
              })}
            </div>
          </nav>

          <div>
            <h4>Contacto</h4>
            <div className="footer-links">
              <a href=${COACHES.lucas.wa} target="_blank" rel="noopener">WhatsApp ${COACHES.lucas.name} · ${COACHES.lucas.phone}</a>
              <a href=${COACHES.agus.wa} target="_blank" rel="noopener">WhatsApp ${COACHES.agus.name} · ${COACHES.agus.phone}</a>
              <a href=${IG.url} target="_blank" rel="noopener">${IG.label}</a>
              <a href=${MAPS.url} target="_blank" rel="noopener">Av. Matheu 268 — Rauch</a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© ${year} GÉNESIS · Centro de Actividad Física — Rauch, Buenos Aires</span>
          <span className="hecho">Hecho con <i>♥</i> y mucho entrenamiento</span>
        </div>
      </div>
    </footer>`;
  }

  /* ----------------------------------------------------------
     Barra de progreso + volver arriba
     ---------------------------------------------------------- */
  function ProgressBar() {
    var pair = useState(0);
    var progress = pair[0];
    var setProgress = pair[1];
    useEffect(function () {
      var raf = 0;
      var onScroll = function () {
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(function () {
          var h = document.documentElement.scrollHeight - window.innerHeight;
          setProgress(h > 0 ? Math.min(100, (window.scrollY / h) * 100) : 0);
        });
      };
      onScroll();
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onScroll);
      return function () {
        window.removeEventListener("scroll", onScroll);
        window.removeEventListener("resize", onScroll);
        cancelAnimationFrame(raf);
      };
    }, []);
    return html`<div className="progress" aria-hidden="true"><div className="progress-bar" style=${{ width: progress + "%" }}></div></div>`;
  }

  function ToTop() {
    var pair = useState(false);
    var show = pair[0];
    var setShow = pair[1];
    useEffect(function () {
      var onScroll = function () { setShow(window.scrollY > 720); };
      onScroll();
      window.addEventListener("scroll", onScroll, { passive: true });
      return function () { window.removeEventListener("scroll", onScroll); };
    }, []);
    var onClick = function () {
      window.scrollTo({ top: 0, behavior: prefersReduced() ? "auto" : "smooth" });
    };
    return html`<button
      className=${"to-top" + (show ? " show" : "")}
      onClick=${onClick}
      aria-label="Volver arriba"
      title="Volver arriba"
    ><${IconArrowU} /><//>`;
  }

  /* ----------------------------------------------------------
     App
     ---------------------------------------------------------- */
  function App() {
    var scrollY = useScrollY();
    var active = useActiveSection(NAV.map(function (l) { return l.id; }));

    // Si se entra con un hash (#precios, #horarios, …), ir a esa sección
    useEffect(function () {
      var hash = window.location.hash;
      if (!hash || hash.length < 2) return;
      var id = hash.slice(1);
      var t = setTimeout(function () { scrollToId(id); }, 120);
      return function () { clearTimeout(t); };
    }, []);

    return html`<${React.Fragment}>
      <${ProgressBar} />
      <${Navbar} active=${active} scrollY=${scrollY} />
      <main>
        <${Hero} />
        <${Marquee} />
        <${About} />
        <${Schedule} />
        <${Pricing} />
        <${Rules} />
        <${CtaBand} />
        <${Contact} />
      </main>
      <${Footer} />
      <${ToTop} />
      <div className="grain" aria-hidden="true"></div>
    <//>`;
  }

  var root = ReactDOM.createRoot(rootEl);
  root.render(html`<${App} />`);
  window.__genesisMounted = true;
})();
