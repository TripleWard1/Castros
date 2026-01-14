"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type Lang = "pt" | "en";
type SectionKey = "home" | "castros" | "itinerarios" | "agenda" | "parceiros" | "experiencias";

type EventItem = {
  id: string;
  dateISO: string;
  title: Record<Lang, string>;
  location: Record<Lang, string>;
  description: Record<Lang, string>;
  imageUrl?: string;
  tags?: string[];
};

type Castro = {
  id: string;
  name: string;
  place: string;
  minutes: number;
  snippet: Record<Lang, string>;
  near: Record<Lang, string>;
  coords: { lat: number; lng: number };
  imageUrl: string;
  tags: Array<"panoramico" | "citânia" | "familias" | "caminhada" | "festival">;
};

type Itinerary = {
  id: string;
  title: Record<Lang, string>;
  days: number;
  vibe: Record<Lang, string>;
  stops: string[];
  tags: Array<"familias" | "caminhada" | "fimdesemana" | "multidias">;
};

const LOGO_URL = "https://i.imgur.com/0XqsDrg.png";

/** ✅ Fotos reais fornecidas por ti */
const CASTROS: Castro[] = [
  {
    id: "outeiro-lesenho",
    name: "Outeiro Lesenho",
    place: "Boticas",
    minutes: 75,
    snippet: {
      pt: "Um dos pontos mais marcantes do Alto Tâmega. A implantação no relevo cria uma leitura poderosa da paisagem.",
      en: "One of the most striking points in Alto Tâmega. Its hillside setting offers a powerful landscape reading.",
    },
    near: { pt: "Miradouros naturais e trilhos curtos.", en: "Natural viewpoints and short trails." },
    coords: { lat: 41.62, lng: -7.74 }, // approx (pode ajustar depois)
    imageUrl: "https://i.imgur.com/xkz1Ihq.jpeg",
    tags: ["panoramico", "caminhada"],
  },
  {
    id: "s-lourenco",
    name: "Castro de S. Lourenço",
    place: "Esposende",
    minutes: 60,
    snippet: {
      pt: "Vista ampla sobre a costa e o estuário. Um lugar ideal para perceber a relação entre povoamento e território.",
      en: "Wide views over the coast and estuary. A great place to understand settlement–territory relationships.",
    },
    near: { pt: "Costa atlântica e percursos pedestres.", en: "Atlantic coast and walking routes." },
    coords: { lat: 41.53, lng: -8.78 }, // approx
    imageUrl: "https://i.imgur.com/LQ7BxgK.jpeg",
    tags: ["panoramico", "familias"],
  },
  {
    id: "briteiros",
    name: "Citânia de Briteiros",
    place: "Guimarães",
    minutes: 120,
    snippet: {
      pt: "Referência maior da cultura castreja. Estruturas e percursos que tornam a visita quase inevitável.",
      en: "A major reference of hillfort culture. Structures and routes that make the visit almost unavoidable.",
    },
    near: { pt: "Centro interpretativo e património de Guimarães.", en: "Interpretive center and Guimarães heritage." },
    coords: { lat: 41.52, lng: -8.30 }, // approx
    imageUrl: "https://i.imgur.com/Rb7ZCnJ.jpeg",
    tags: ["citânia", "familias"],
  },
  {
    id: "s-caetano",
    name: "Castro de S. Caetano",
    place: "Monção",
    minutes: 80,
    snippet: {
      pt: "Um lugar de fronteira e de leitura histórica do Minho. Paisagem, memória e caminhada suave.",
      en: "A frontier place for historical reading of Minho. Landscape, memory and a gentle walk.",
    },
    near: { pt: "Rio Minho, miradouros e enoturismo.", en: "Minho river, viewpoints and wine tourism." },
    coords: { lat: 42.08, lng: -8.48 }, // approx
    imageUrl: "https://i.imgur.com/o5ZJHg6.jpeg",
    tags: ["panoramico", "caminhada"],
  },
  {
    id: "sanfins",
    name: "Citânia de Sanfins",
    place: "Paços de Ferreira",
    minutes: 110,
    snippet: {
      pt: "Grande escala e excelente perceção do traçado do povoado. Uma visita muito completa para especialistas e público geral.",
      en: "Large scale and clear perception of the settlement layout. A complete visit for experts and the public alike.",
    },
    near: { pt: "Musealização e percursos de visita.", en: "Museum elements and visitor trails." },
    coords: { lat: 41.28, lng: -8.36 }, // approx
    imageUrl: "https://i.imgur.com/fXGeTMP.jpeg",
    tags: ["citânia", "familias"],
  },
  {
    id: "s-paio",
    name: "Castro de São Paio",
    place: "Vila do Conde",
    minutes: 65,
    snippet: {
      pt: "Entre o interior e a influência atlântica, um ponto excelente para integrar na rota costeira.",
      en: "Between inland and Atlantic influence, a strong point to integrate into a coastal route.",
    },
    near: { pt: "Património local e gastronomia.", en: "Local heritage and gastronomy." },
    coords: { lat: 41.37, lng: -8.74 }, // approx
    imageUrl: "https://i.imgur.com/Z9PK4AL.jpeg",
    tags: ["familias"],
  },
];

const EVENTS: EventItem[] = [
  {
    id: "ev-galaicofolia",
    dateISO: "2026-08-01",
    title: { pt: "Galaicofolia", en: "Galaicofolia" },
    location: { pt: "Esposende", en: "Esposende" },
    description: {
      pt: "Festival com recriações, gastronomia e cultura castreja em ambiente imersivo.",
      en: "A festival with reenactments, gastronomy and hillfort culture in an immersive atmosphere.",
    },
    imageUrl: "https://i.imgur.com/GGZBYum.jpeg",
    tags: ["festival", "recriacao"],
  },
  {
    id: "ev-visita",
    dateISO: "2026-03-21",
    title: { pt: "Visita interpretativa", en: "Interpretive visit" },
    location: { pt: "Citânia (programa)", en: "Citânia (program)" },
    description: {
      pt: "Percurso com leitura de paisagem, técnicas construtivas e quotidiano castrejo.",
      en: "A route focusing on landscape reading, building techniques and daily life.",
    },
    tags: ["visita", "interpretacao"],
  },
];

const ITINERARIES: Itinerary[] = [
  {
    id: "weekend-essencial",
    title: { pt: "Fim de semana essencial", en: "Essential weekend" },
    days: 2,
    vibe: { pt: "Uma síntese elegante: citânias + miradouros + gastronomia.", en: "An elegant synthesis: citânias + viewpoints + gastronomy." },
    stops: ["Citânia de Briteiros", "Citânia de Sanfins", "Castro de S. Lourenço", "Momento gastronómico local"],
    tags: ["fimdesemana", "familias"],
  },
  {
    id: "costa-e-territorio",
    title: { pt: "Costa & território", en: "Coast & territory" },
    days: 1,
    vibe: { pt: "Leve e panorâmico. Ótimo para famílias.", en: "Light and panoramic. Great for families." },
    stops: ["Castro de S. Lourenço", "Castro de São Paio", "Passeio costeiro"],
    tags: ["familias"],
  },
  {
    id: "caminhante-minho",
    title: { pt: "Caminhante do Minho", en: "Minho hiker" },
    days: 2,
    vibe: { pt: "Ritmo de caminhada e paisagem com leitura arqueológica.", en: "Walking rhythm and landscape with archaeological reading." },
    stops: ["Castro de S. Caetano", "Outeiro Lesenho", "Miradouros e trilhos"],
    tags: ["caminhada", "fimdesemana"],
  },
];

function formatDateISO(iso: string, lang: Lang) {
  const locale = lang === "pt" ? "pt-PT" : "en-GB";
  const [y, m, d] = iso.split("-").map((n) => Number(n));
  const dt = new Date(Date.UTC(y, m - 1, d));
  return new Intl.DateTimeFormat(locale, { day: "2-digit", month: "long", year: "numeric" }).format(dt);
}

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

export default function Page() {
  const [lang, setLang] = useState<Lang>("pt");
  const [active, setActive] = useState<SectionKey>("home");

  const [calendarOpen, setCalendarOpen] = useState(false);
  const [calendarDate, setCalendarDate] = useState<string | null>(null);

  const [drawerOpen, setDrawerOpen] = useState(false);

  // Premium: search + filters
  const [search, setSearch] = useState("");
  const [castroFilter, setCastroFilter] = useState<"todos" | "citânia" | "panoramico" | "familias" | "caminhada">("todos");

  // Hero carousel (cinematic)
  const heroSlides = useMemo(() => {
    // usa fotos reais (e também a Galaicofolia como “cultura viva”)
    return [
      { key: "briteiros", title: "Citânia de Briteiros", sub: "Guimarães", img: "https://i.imgur.com/Rb7ZCnJ.jpeg", chip: lang === "pt" ? "Referência maior" : "Key reference" },
      { key: "lourenco", title: "Castro de S. Lourenço", sub: "Esposende", img: "https://i.imgur.com/LQ7BxgK.jpeg", chip: lang === "pt" ? "Costa & estuário" : "Coast & estuary" },
      { key: "sanfins", title: "Citânia de Sanfins", sub: "Paços de Ferreira", img: "https://i.imgur.com/fXGeTMP.jpeg", chip: lang === "pt" ? "Leitura do traçado" : "Clear layout" },
      { key: "galaico", title: "Galaicofolia", sub: "Esposende", img: "https://i.imgur.com/GGZBYum.jpeg", chip: lang === "pt" ? "Cultura viva" : "Living culture" },
    ];
  }, [lang]);

  const [heroIndex, setHeroIndex] = useState(0);
  const heroTimer = useRef<number | null>(null);

  useEffect(() => {
    // autoplay suave, mas sem “stress”
    if (heroTimer.current) window.clearInterval(heroTimer.current);
    heroTimer.current = window.setInterval(() => {
      setHeroIndex((i) => (i + 1) % heroSlides.length);
    }, 5500);
    return () => {
      if (heroTimer.current) window.clearInterval(heroTimer.current);
    };
  }, [heroSlides.length]);

  const copy = useMemo(() => {
    return {
      title: {
        pt: "Rota dos Castros do Noroeste de Portugal",
        en: "Hillfort Route of Northwest Portugal",
      },
      subtitle: {
        pt: "Uma webapp editorial e imersiva para explorar a cultura castreja — com rigor, beleza e utilidade em viagem.",
        en: "An editorial, immersive webapp to explore hillfort culture — with rigor, beauty and travel utility.",
      },
      menu: {
        pt: {
          home: "Início",
          castros: "Castros a visitar",
          itinerarios: "Itinerários sugeridos",
          agenda: "O que está a acontecer",
          parceiros: "Onde ficar e o que provar",
          experiencias: "Experiências imersivas",
        },
        en: {
          home: "Home",
          castros: "Hillforts",
          itinerarios: "Suggested itineraries",
          agenda: "What’s on",
          parceiros: "Stay & Taste",
          experiencias: "Immersive experiences",
        },
      },
      cards: {
        castros: {
          pt: "Fotografias reais, leitura de paisagem, tempos de visita e mapa. Conteúdo pronto para crescer.",
          en: "Real photos, landscape reading, visit times and map. Ready to scale.",
        },
        itinerarios: {
          pt: "Percursos prontos para famílias, caminhada e fim de semana — com equilíbrio entre cultura e descanso.",
          en: "Routes for families, hiking and weekends — balancing culture and rest.",
        },
        agenda: {
          pt: "Eventos e festivais para planear a visita e sentir a cultura viva.",
          en: "Events and festivals to plan your visit and feel living culture.",
        },
        parceiros: {
          pt: "A oferta local ao longo da rota: dormir, comer, museus e serviços.",
          en: "Local offer along the route: sleep, eat, museums and services.",
        },
        experiencias: {
          pt: "Uma base sólida para AR/3D e histórias por camadas (MVP com visão).",
          en: "A solid base for AR/3D and layered storytelling (MVP with vision).",
        },
      },
      ctaPrimary: { pt: "Explorar castros", en: "Explore hillforts" },
      ctaSecondary: { pt: "Ver itinerários", en: "See itineraries" },
    };
  }, []);

  const menuLabel = lang === "pt" ? copy.menu.pt : copy.menu.en;

  const navItems: Array<{ key: SectionKey; label: string; hint: string }> = [
    { key: "home", label: menuLabel.home, hint: lang === "pt" ? "Visão geral" : "Overview" },
    { key: "castros", label: menuLabel.castros, hint: lang === "pt" ? "Locais e mapas" : "Places & maps" },
    { key: "itinerarios", label: menuLabel.itinerarios, hint: lang === "pt" ? "Percursos prontos" : "Ready routes" },
    { key: "agenda", label: menuLabel.agenda, hint: lang === "pt" ? "Eventos e datas" : "Events & dates" },
    { key: "parceiros", label: menuLabel.parceiros, hint: lang === "pt" ? "Dormir e provar" : "Stay & taste" },
    { key: "experiencias", label: menuLabel.experiencias, hint: lang === "pt" ? "AR / histórias" : "AR / stories" },
  ];

  const eventDates = useMemo(() => Array.from(new Set(EVENTS.map((e) => e.dateISO))).sort(), []);
  const selectedEvents = useMemo(() => (calendarDate ? EVENTS.filter((e) => e.dateISO === calendarDate) : []), [calendarDate]);

  function go(to: SectionKey) {
    setActive(to);
    setDrawerOpen(false);
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const filteredCastros = useMemo(() => {
    const q = search.trim().toLowerCase();
    return CASTROS.filter((c) => {
      const matchText =
        !q ||
        c.name.toLowerCase().includes(q) ||
        c.place.toLowerCase().includes(q) ||
        c.snippet.pt.toLowerCase().includes(q) ||
        c.snippet.en.toLowerCase().includes(q);

      const matchTag = castroFilter === "todos" ? true : c.tags.includes(castroFilter);
      return matchText && matchTag;
    });
  }, [search, castroFilter]);

  function tagLabel(t: Castro["tags"][number]) {
    const map: Record<string, Record<Lang, string>> = {
      "citânia": { pt: "Citânia", en: "Citânia" },
      "panoramico": { pt: "Panorâmico", en: "Panoramic" },
      "familias": { pt: "Famílias", en: "Families" },
      "caminhada": { pt: "Caminhada", en: "Hiking" },
      "festival": { pt: "Festival", en: "Festival" },
    };
    return map[t]?.[lang] ?? t;
  }

  return (
    <>
      <div className="bg-ambient" aria-hidden="true">
        <div className="orb orb-a" />
        <div className="orb orb-b" />
        <div className="grain" />
      </div>

      {/* HEADER */}
      <header className="topbar">
        <div className="container topbar-inner">
          <button className="brand" onClick={() => go("home")} aria-label="Ir para início">
            <img src={LOGO_URL} alt="Logo" className="brand-logo" />
            <div className="brand-text">
              <div className="brand-title">{copy.title[lang]}</div>
              <div className="brand-sub">
                <span>⟡</span>
                {lang === "pt" ? "Arqueologia elegante • webapp contemporânea" : "Elegant archaeology • contemporary webapp"}
              </div>
            </div>
          </button>

          <nav className="nav" aria-label="Navegação">
            {navItems.map((it) => (
              <button
                key={it.key}
                className={`nav-item ${active === it.key ? "active" : ""}`}
                onClick={() => go(it.key)}
              >
                {it.label}
              </button>
            ))}
          </nav>

          <div className="actions">
            <button className="icon-btn" onClick={() => setCalendarOpen(true)} title={lang === "pt" ? "Calendário" : "Calendar"}>
              <span className="icon">📅</span>
              <span className="icon-btn-label">{lang === "pt" ? "Calendário" : "Calendar"}</span>
            </button>

            <div className="segmented" role="group" aria-label="Idioma">
              <button className={`seg ${lang === "pt" ? "on" : ""}`} onClick={() => setLang("pt")}>
                PT
              </button>
              <button className={`seg ${lang === "en" ? "on" : ""}`} onClick={() => setLang("en")}>
                EN
              </button>
            </div>

            <button className="hamburger" onClick={() => setDrawerOpen(true)} aria-label="Abrir menu">
              ☰
            </button>
          </div>
        </div>
      </header>

      {/* PAGE */}
      <main className="main">
        <div className="container">
          {/* HOME */}
          {active === "home" && (
            <>
              <section className="hero">
                <div>
                  <div className="pill">
                    <span className="dot" />
                    {lang === "pt" ? "Património • Paisagem • Identidade" : "Heritage • Landscape • Identity"}
                  </div>

                  <h1 className="h1">{copy.title[lang]}</h1>
                  <p className="lead">{copy.subtitle[lang]}</p>

                  <div className="cta-row">
                    <button className="btn primary" onClick={() => go("castros")}>
                      {copy.ctaPrimary[lang]} <span className="btn-arrow">→</span>
                    </button>
                    <button className="btn ghost" onClick={() => go("itinerarios")}>
                      {copy.ctaSecondary[lang]}
                    </button>
                  </div>

                  <div className="stats">
                    <div className="stat">
                      <div className="stat-k">{lang === "pt" ? "Rigor" : "Rigor"}</div>
                      <div className="stat-v">{lang === "pt" ? "Leitura Arqueológica" : "Archaeological Reading"}</div>
                    </div>
                    <div className="stat">
                      <div className="stat-k">{lang === "pt" ? "Planeamento" : "Planning"}</div>
                      <div className="stat-v">{lang === "pt" ? "Itinerários + Agenda" : "Itineraries + Events"}</div>
                    </div>
                    <div className="stat">
                      <div className="stat-k">{lang === "pt" ? "Imersão" : "Immersion"}</div>
                      <div className="stat-v">{lang === "pt" ? "AR/3D (roadmap)" : "AR/3D (roadmap)"}</div>
                    </div>
                  </div>
                </div>

                {/* Cinematic card with slides */}
                <div className="hero-card">
                  <div className="hero-media">
                    <img
                      className="hero-img"
                      alt={lang === "pt" ? "Imagem de capa" : "Cover image"}
                      src={heroSlides[heroIndex].img}
                    />
                    <div className="hero-overlay" />
                    <div className="hero-frame" />

                    <div className="hero-caption">
                      <div className="hero-cap-left">
                        <div className="hero-cap-title">{heroSlides[heroIndex].title}</div>
                        <div className="hero-cap-sub">{heroSlides[heroIndex].sub}</div>
                      </div>
                      <div className="hero-cap-chip">✦ {heroSlides[heroIndex].chip}</div>
                    </div>
                  </div>

                  <div className="hero-card-body">
                    <div className="hero-mini">
                      <div className="mini-title">{lang === "pt" ? "Começa por aqui" : "Start here"}</div>
                      <div className="mini-sub">
                        {lang === "pt"
                          ? "Explora castros reais com fotografia e contexto. Depois planeia com itinerários."
                          : "Explore real hillforts with photo and context. Then plan with itineraries."}
                      </div>
                    </div>

                    <div className="quick-grid">
                      <QuickCard icon="🏺" title={lang === "pt" ? "Castros" : "Hillforts"} desc={lang === "pt" ? "Fotografia e mapa" : "Photo & map"} onClick={() => go("castros")} />
                      <QuickCard icon="🧭" title={lang === "pt" ? "Itinerários" : "Itineraries"} desc={lang === "pt" ? "Percursos prontos" : "Ready routes"} onClick={() => go("itinerarios")} />
                      <QuickCard icon="🎭" title={lang === "pt" ? "Agenda" : "What’s on"} desc={lang === "pt" ? "Eventos e datas" : "Events & dates"} onClick={() => go("agenda")} />
                      <QuickCard icon="✨" title={lang === "pt" ? "Imersivo" : "Immersive"} desc={lang === "pt" ? "AR/3D roadmap" : "AR/3D roadmap"} onClick={() => go("experiencias")} />
                    </div>

                    {/* Slide dots */}
                    <div style={{ marginTop: 12, display: "flex", gap: 8 }}>
                      {heroSlides.map((s, idx) => (
                        <button
                          key={s.key}
                          onClick={() => setHeroIndex(idx)}
                          aria-label={`Slide ${idx + 1}`}
                          style={{
                            width: 10,
                            height: 10,
                            borderRadius: 999,
                            border: "1px solid rgba(176,141,87,.25)",
                            background: idx === heroIndex ? "rgba(17,24,39,.92)" : "rgba(255,255,255,.75)",
                            cursor: "pointer",
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </section>

              <section className="section">
                <div className="section-head">
                  <div className="section-head-left">
                    <h2 className="h2">{lang === "pt" ? "Menu principal" : "Main menu"}</h2>
                    <p className="muted">{lang === "pt" ? "Uma experiência moderna com alma arqueológica." : "A modern experience with an archaeological soul."}</p>
                  </div>
                </div>

                <div className="grid">
                  <MenuCard icon="🏺" title={menuLabel.castros} desc={copy.cards.castros[lang]} onClick={() => go("castros")} />
                  <MenuCard icon="🧭" title={menuLabel.itinerarios} desc={copy.cards.itinerarios[lang]} onClick={() => go("itinerarios")} />
                  <MenuCard icon="🎭" title={menuLabel.agenda} desc={copy.cards.agenda[lang]} onClick={() => go("agenda")} />
                  <MenuCard icon="🍷" title={menuLabel.parceiros} desc={copy.cards.parceiros[lang]} onClick={() => go("parceiros")} />
                  <MenuCard icon="✨" title={menuLabel.experiencias} desc={copy.cards.experiencias[lang]} onClick={() => go("experiencias")} />
                </div>
              </section>

              <section className="section">
                <div className="section-head">
                  <div className="section-head-left">
                    <h2 className="h2">{lang === "pt" ? "Em destaque" : "Featured"}</h2>
                    <p className="muted">
                      {lang === "pt"
                        ? "Seleção inicial com fotografia real. Pronto para crescer com conteúdos científicos e camadas interpretativas."
                        : "Initial selection with real photography. Ready to grow with scientific content and interpretive layers."}
                    </p>
                  </div>
                </div>

                <div className="grid-2">
                  {CASTROS.slice(0, 4).map((c) => (
                    <FeatureCastro key={c.id} castro={c} lang={lang} onOpen={() => { setActive("castros"); window.scrollTo({ top: 0, behavior: "smooth" }); }} />
                  ))}
                </div>
              </section>
            </>
          )}

          {/* CASTROS */}
          {active === "castros" && (
            <Section
              title={menuLabel.castros}
              subtitle={
                lang === "pt"
                  ? "Pesquisa e filtra para planear a visita. Este é um MVP com fotografia real e estrutura pronta para dados científicos."
                  : "Search and filter to plan your visit. This is an MVP with real photography and a structure ready for scientific data."
              }
              tools={
                <div className="section-tools">
                  <div className="search" role="search">
                    <span style={{ fontSize: 14 }}>⌕</span>
                    <input
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      placeholder={lang === "pt" ? "Procurar castro, localidade…" : "Search hillfort, place…"}
                      aria-label={lang === "pt" ? "Pesquisar" : "Search"}
                    />
                    <span className="k">⌘ K</span>
                  </div>
                </div>
              }
            >
              <div className="filters" style={{ marginBottom: 12 }}>
                <Filter label={lang === "pt" ? "Todos" : "All"} on={castroFilter === "todos"} onClick={() => setCastroFilter("todos")} />
                <Filter label={lang === "pt" ? "Citânias" : "Citânias"} on={castroFilter === "citânia"} onClick={() => setCastroFilter("citânia")} />
                <Filter label={lang === "pt" ? "Panorâmicos" : "Panoramic"} on={castroFilter === "panoramico"} onClick={() => setCastroFilter("panoramico")} />
                <Filter label={lang === "pt" ? "Famílias" : "Families"} on={castroFilter === "familias"} onClick={() => setCastroFilter("familias")} />
                <Filter label={lang === "pt" ? "Caminhada" : "Hiking"} on={castroFilter === "caminhada"} onClick={() => setCastroFilter("caminhada")} />
              </div>

              <div className="grid cards">
                {filteredCastros.map((c) => (
                  <div key={c.id} className="feature">
                    <div className="feature-media">
                      <img className="feature-img" src={c.imageUrl} alt={`${c.name} — ${c.place}`} />
                      <div className="feature-grad" />
                    </div>
                    <div className="feature-body">
                      <div className="feature-top">
                        <div className="feature-title">{c.name}</div>
                        <span className="badge">{c.minutes} min</span>
                      </div>
                      <div className="card-sub">{c.place}</div>

                      <div className="feature-text">{c.snippet[lang]}</div>

                      <div className="meta">
                        {c.tags.slice(0, 3).map((t) => (
                          <span key={t} className="pill2">✦ {tagLabel(t)}</span>
                        ))}
                        <span className="pill2">🗺️ {lang === "pt" ? "Mapa" : "Map"}</span>
                      </div>

                      <div className="feature-sub">
                        <span style={{ color: "var(--muted)" }}>{lang === "pt" ? "Nas proximidades: " : "Nearby: "}</span>
                        {c.near[lang]}
                      </div>

                      <div className="mapbox">
                        <iframe
                          title={`map-${c.id}`}
                          className="map"
                          loading="lazy"
                          referrerPolicy="no-referrer-when-downgrade"
                          src={`https://www.openstreetmap.org/export/embed.html?bbox=${c.coords.lng - 0.06}%2C${c.coords.lat - 0.035}%2C${c.coords.lng + 0.06}%2C${c.coords.lat + 0.035}&layer=mapnik&marker=${c.coords.lat}%2C${c.coords.lng}`}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Section>
          )}

          {/* ITINERARIOS */}
          {active === "itinerarios" && (
            <Section
              title={menuLabel.itinerarios}
              subtitle={
                lang === "pt"
                  ? "Percursos prontos, com critérios claros. (MVP) — a seguir: distância, tempo total e acessibilidade."
                  : "Ready routes with clear criteria. (MVP) — next: distance, total time and accessibility."
              }
            >
              <div className="grid cards">
                {ITINERARIES.map((it) => (
                  <div className="card" key={it.id}>
                    <div className="card-title-row">
                      <div className="card-title">{it.title[lang]}</div>
                      <span className="badge">{it.days} {lang === "pt" ? "dia(s)" : "day(s)"}</span>
                    </div>
                    <div className="card-text">{it.vibe[lang]}</div>
                    <div className="meta">
                      {it.tags.map((t) => (
                        <span key={t} className="pill2">
                          {t === "familias" ? "👨‍👩‍👧‍👦" : t === "caminhada" ? "🥾" : t === "fimdesemana" ? "🗓️" : "🧳"}{" "}
                          {lang === "pt"
                            ? t === "familias"
                              ? "Famílias"
                              : t === "caminhada"
                              ? "Caminhada"
                              : t === "fimdesemana"
                              ? "Fim de semana"
                              : "Vários dias"
                            : t === "familias"
                            ? "Families"
                            : t === "caminhada"
                            ? "Hiking"
                            : t === "fimdesemana"
                            ? "Weekend"
                            : "Multi-day"}
                        </span>
                      ))}
                    </div>
                    <ul className="list">
                      {it.stops.map((s) => (
                        <li key={s}>{s}</li>
                      ))}
                    </ul>
                    <div className="note">
                      {lang === "pt"
                        ? "Próximo passo: gerar este percurso no mapa e exportar para partilha."
                        : "Next: generate this route on the map and export for sharing."}
                    </div>
                  </div>
                ))}
              </div>
            </Section>
          )}

          {/* AGENDA */}
          {active === "agenda" && (
            <Section
              title={menuLabel.agenda}
              subtitle={
                lang === "pt"
                  ? "Uma agenda que cruza arqueologia e cultura viva. Usa o calendário no topo para selecionar datas."
                  : "An agenda that crosses archaeology and living culture. Use the top calendar to select dates."
              }
            >
              <div className="grid cards">
                {EVENTS.sort((a, b) => (a.dateISO < b.dateISO ? -1 : 1)).map((e) => (
                  <div className="card" key={e.id}>
                    <div className="card-title-row">
                      <div className="card-title">{e.title[lang]}</div>
                      <span className="badge">{formatDateISO(e.dateISO, lang)}</span>
                    </div>
                    <div className="card-sub">{e.location[lang]}</div>

                    {e.imageUrl && (
                      <div style={{ marginTop: 12, borderRadius: 18, overflow: "hidden", border: "1px solid rgba(176,141,87,.16)" }}>
                        <img src={e.imageUrl} alt={e.title[lang]} style={{ width: "100%", height: 210, objectFit: "cover" }} />
                      </div>
                    )}

                    <div className="card-text">{e.description[lang]}</div>
                    {e.tags?.length ? (
                      <div className="meta">
                        {e.tags.slice(0, 4).map((t) => (
                          <span key={t} className="pill2">✦ {t}</span>
                        ))}
                      </div>
                    ) : null}
                  </div>
                ))}
              </div>
            </Section>
          )}

          {/* PARCEIROS */}
          {active === "parceiros" && (
            <Section
              title={menuLabel.parceiros}
              subtitle={
                lang === "pt"
                  ? "Curadoria de parceiros ao longo da rota. (MVP) — a seguir: mapa por proximidade e reservas."
                  : "Curated partners along the route. (MVP) — next: proximity map and bookings."
              }
            >
              <div className="grid cards">
                <PartnerCard
                  title={lang === "pt" ? "Alojamento de referência" : "Signature lodging"}
                  badge={lang === "pt" ? "Dormir" : "Stay"}
                  text={
                    lang === "pt"
                      ? "Uma base confortável e serena para explorar o território. Integrações futuras: disponibilidade e reservas."
                      : "A comfortable, serene base to explore. Future: availability and booking integrations."
                  }
                />
                <PartnerCard
                  title={lang === "pt" ? "Gastronomia do território" : "Territory cuisine"}
                  badge={lang === "pt" ? "Provar" : "Taste"}
                  text={
                    lang === "pt"
                      ? "Produtos locais, sazonalidade e identidade. Próximo passo: roteiros gastronómicos por itinerário."
                      : "Local produce, seasonality and identity. Next: gastronomy routes per itinerary."
                  }
                />
                <PartnerCard
                  title={lang === "pt" ? "Museus e interpretação" : "Museums & interpretation"}
                  badge={lang === "pt" ? "Cultura" : "Culture"}
                  text={
                    lang === "pt"
                      ? "Contexto científico e leitura do património. Próximo passo: conteúdos por camadas e bibliografia."
                      : "Scientific context and heritage reading. Next: layered content and bibliography."
                  }
                />
              </div>
            </Section>
          )}

          {/* EXPERIENCIAS */}
          {active === "experiencias" && (
            <Section
              title={menuLabel.experiencias}
              subtitle={
                lang === "pt"
                  ? "Uma visão credível para AR/3D: rigor, contexto e emoção — sem infantilizar a ciência."
                  : "A credible AR/3D vision: rigor, context and emotion — without trivializing science."
              }
            >
              <div className="grid cards">
                <div className="card">
                  <div className="card-title-row">
                    <div className="card-title">{lang === "pt" ? "Camadas de tempo" : "Layers of time"}</div>
                    <span className="badge">Roadmap</span>
                  </div>
                  <div className="card-text">
                    {lang === "pt"
                      ? "Desliza entre presente e passado: traçado, muralhas, unidades domésticas e pontos de atividade."
                      : "Slide between present and past: layout, walls, domestic units and activity points."}
                  </div>
                  <div className="meta">
                    <span className="pill2">🧱 {lang === "pt" ? "Técnicas" : "Techniques"}</span>
                    <span className="pill2">📚 {lang === "pt" ? "Fontes" : "Sources"}</span>
                    <span className="pill2">🎧 {lang === "pt" ? "Áudio" : "Audio"}</span>
                  </div>
                  <div className="note">
                    {lang === "pt"
                      ? "MVP realista: começar com hotspots, texto curto e visualizações 2D. Depois: 3D glTF."
                      : "Realistic MVP: start with hotspots, short text and 2D visualizations. Then: 3D glTF."}
                  </div>
                </div>

                <div className="card">
                  <div className="card-title-row">
                    <div className="card-title">{lang === "pt" ? "AR no local (QR)" : "On-site AR (QR)"}</div>
                    <span className="badge">MVP</span>
                  </div>
                  <div className="card-text">
                    {lang === "pt"
                      ? "Pontos de interesse ativados por QR: reconstituição de muralha, habitação, objetos e rituais."
                      : "QR-triggered POIs: wall reconstruction, housing, objects and rituals."}
                  </div>
                  <div className="note">
                    {lang === "pt"
                      ? "Estratégia: WebXR onde suportado, fallback para viewer 3D e storytelling."
                      : "Strategy: WebXR where supported, fallback to 3D viewer and storytelling."}
                  </div>
                </div>

                <div className="card">
                  <div className="card-title-row">
                    <div className="card-title">{lang === "pt" ? "Guia científico (micro)" : "Scientific guide (micro)"}</div>
                    <span className="badge alt">{lang === "pt" ? "Rigor" : "Rigor"}</span>
                  </div>
                  <div className="card-text">
                    {lang === "pt"
                      ? "Fichas curtas e bibliografia essencial por castro: cronologia, materiais, escavações e leituras."
                      : "Short sheets and essential bibliography per hillfort: chronology, materials, excavations and readings."}
                  </div>
                  <div className="note">
                    {lang === "pt"
                      ? "Próximo passo: modelos de dados + fontes (autores, anos, links) e revisão por equipa científica."
                      : "Next: data models + sources (authors, years, links) and review by a scientific team."}
                  </div>
                </div>
              </div>
            </Section>
          )}

          <footer className="footer">
            <div className="container footer-inner">
              <div className="footer-left">
                <img className="footer-logo" src={LOGO_URL} alt="Logo" />
                <div>
                  <div className="footer-title">{copy.title[lang]}</div>
                  <div className="footer-sub">© {new Date().getFullYear()} • MVP editorial</div>
                </div>
              </div>

              <div className="footer-right">
                <button className="link" onClick={() => go("home")}>
                  {lang === "pt" ? "Voltar ao início" : "Back to home"}
                </button>
              </div>
            </div>
          </footer>
        </div>
      </main>

      {/* CALENDAR MODAL */}
      {calendarOpen && (
        <div className="backdrop" role="dialog" aria-modal="true" aria-label="Calendário">
          <div className="modal">
            <div className="modal-head">
              <div>
                <div className="modal-title">{lang === "pt" ? "Calendário" : "Calendar"}</div>
                <div className="modal-sub">{lang === "pt" ? "Escolhe uma data para ver eventos." : "Pick a date to see events."}</div>
              </div>
              <button className="icon-close" onClick={() => setCalendarOpen(false)} aria-label="Fechar">
                ✕
              </button>
            </div>

            <div className="chips">
              {eventDates.map((d) => (
                <button key={d} className={`chip ${calendarDate === d ? "on" : ""}`} onClick={() => setCalendarDate(d)}>
                  {formatDateISO(d, lang)}
                </button>
              ))}
            </div>

            <div className="modal-body">
              {calendarDate ? (
                selectedEvents.length ? (
                  <div className="modal-events">
                    {selectedEvents.map((e) => (
                      <div key={e.id} className="event">
                        <div className="event-title">{e.title[lang]}</div>
                        <div className="event-loc">{e.location[lang]}</div>
                        <div className="event-desc">{e.description[lang]}</div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="empty">{lang === "pt" ? "Sem eventos para este dia." : "No events on this date."}</div>
                )
              ) : (
                <div className="empty">{lang === "pt" ? "Seleciona uma data acima." : "Select a date above."}</div>
              )}
            </div>

            <div className="modal-foot">
              <button className="btn ghost" onClick={() => { setCalendarOpen(false); go("agenda"); }}>
                {lang === "pt" ? "Abrir agenda" : "Open agenda"}
              </button>
              <button className="btn primary" onClick={() => setCalendarOpen(false)}>
                {lang === "pt" ? "Fechar" : "Close"} <span className="btn-arrow">→</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MOBILE DRAWER */}
      {drawerOpen && (
        <div className="backdrop" role="dialog" aria-modal="true" aria-label="Menu">
          <div className="drawer">
            <div className="drawer-head">
              <div className="drawer-title">{lang === "pt" ? "Menu" : "Menu"}</div>
              <button className="icon-close" onClick={() => setDrawerOpen(false)} aria-label="Fechar">
                ✕
              </button>
            </div>

            <div className="drawer-list">
              {navItems.map((it) => (
                <button key={it.key} className="drawer-item" onClick={() => go(it.key)}>
                  <div>
                    <div style={{ fontWeight: 900, letterSpacing: "-.01em" }}>{it.label}</div>
                    <div className="small">{it.hint}</div>
                  </div>
                  <div style={{ opacity: 0.8 }}>→</div>
                </button>
              ))}
            </div>

            <div className="drawer-actions">
              <button className="icon-btn" onClick={() => { setDrawerOpen(false); setCalendarOpen(true); }}>
                <span className="icon">📅</span>
                <span className="icon-btn-label">{lang === "pt" ? "Calendário" : "Calendar"}</span>
              </button>

              <div className="segmented" role="group" aria-label="Idioma">
                <button className={`seg ${lang === "pt" ? "on" : ""}`} onClick={() => setLang("pt")}>
                  PT
                </button>
                <button className={`seg ${lang === "en" ? "on" : ""}`} onClick={() => setLang("en")}>
                  EN
                </button>
              </div>
            </div>

            <div style={{ marginTop: 12, color: "var(--muted)", fontSize: 12, lineHeight: 1.6 }}>
              {lang === "pt"
                ? "Nota: MVP editorial. Próximo passo: fichas científicas por castro, fontes e revisão por equipa."
                : "Note: editorial MVP. Next: scientific sheets per hillfort, sources and expert review."}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

/* ---------- UI blocks ---------- */

function Section({
  title,
  subtitle,
  tools,
  children,
}: {
  title: string;
  subtitle?: string;
  tools?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section className="section">
      <div className="section-head">
        <div className="section-head-left">
          <h2 className="h2">{title}</h2>
          {subtitle && <p className="muted">{subtitle}</p>}
        </div>
        {tools}
      </div>
      {children}
    </section>
  );
}

function MenuCard({ icon, title, desc, onClick }: { icon: string; title: string; desc: string; onClick: () => void }) {
  return (
    <button className="menu-card" onClick={onClick}>
      <div className="menu-ic">{icon}</div>
      <div className="menu-body">
        <div className="menu-title">{title}</div>
        <div className="menu-desc">{desc}</div>
      </div>
      <div className="menu-go">→</div>
    </button>
  );
}

function QuickCard({ icon, title, desc, onClick }: { icon: string; title: string; desc: string; onClick: () => void }) {
  return (
    <button className="quick" onClick={onClick}>
      <div className="quick-ic">{icon}</div>
      <div>
        <div className="quick-t">{title}</div>
        <div className="quick-d">{desc}</div>
      </div>
    </button>
  );
}

function Filter({ label, on, onClick }: { label: string; on: boolean; onClick: () => void }) {
  return (
    <button className={`filter ${on ? "on" : ""}`} onClick={onClick}>
      {label}
    </button>
  );
}

function PartnerCard({ title, badge, text }: { title: string; badge: string; text: string }) {
  return (
    <div className="card">
      <div className="card-title-row">
        <div className="card-title">{title}</div>
        <span className="badge">{badge}</span>
      </div>
      <div className="card-text">{text}</div>
      <div className="note">
        {badge === "Dormir" || badge === "Stay"
          ? "Integração futura: reservas • proximidade • disponibilidade"
          : badge === "Provar" || badge === "Taste"
          ? "Integração futura: roteiros • recomendações • sazonalidade"
          : "Integração futura: fichas • fontes • revisão científica"}
      </div>
    </div>
  );
}

function FeatureCastro({ castro, lang, onOpen }: { castro: Castro; lang: Lang; onOpen: () => void }) {
  return (
    <div className="feature" role="article">
      <div className="feature-media">
        <img className="feature-img" src={castro.imageUrl} alt={`${castro.name} — ${castro.place}`} />
        <div className="feature-grad" />
      </div>
      <div className="feature-body">
        <div className="feature-top">
          <div className="feature-title">{castro.name}</div>
          <span className="badge">{castro.minutes} min</span>
        </div>
        <div className="card-sub">{castro.place}</div>
        <div className="feature-text">{castro.snippet[lang]}</div>
        <div className="meta">
          <span className="pill2">📍 {castro.place}</span>
          <span className="pill2">🧭 {lang === "pt" ? "Rota" : "Route"}</span>
          <button className="pill2" onClick={onOpen} style={{ cursor: "pointer" }}>
            🗺️ {lang === "pt" ? "Ver mais" : "See more"}
          </button>
        </div>
      </div>
    </div>
  );
}
