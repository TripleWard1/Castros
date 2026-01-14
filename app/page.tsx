"use client";

import { useMemo, useState } from "react";

type Lang = "pt" | "en";

type EventItem = {
  id: string;
  dateISO: string; // YYYY-MM-DD
  title: Record<Lang, string>;
  location: Record<Lang, string>;
  description: Record<Lang, string>;
};

type Castro = {
  id: string;
  name: string;
  minutes: number;
  snippet: Record<Lang, string>;
  near: Record<Lang, string>;
  coords: { lat: number; lng: number };
  imageUrl: string;
};

const LOGO_URL = "https://i.imgur.com/0XqsDrg.png";

const EVENTS: EventItem[] = [
  {
    id: "ev1",
    dateISO: "2026-02-07",
    title: { pt: "Visita guiada ao castro", en: "Guided visit to the hillfort" },
    location: { pt: "Área interpretativa", en: "Interpretive area" },
    description: {
      pt: "Percurso com leitura de paisagem e contexto histórico.",
      en: "A walk with landscape reading and historical context.",
    },
  },
  {
    id: "ev2",
    dateISO: "2026-03-21",
    title: { pt: "Recriação histórica", en: "Historical reenactment" },
    location: { pt: "Centro cultural local", en: "Local cultural center" },
    description: {
      pt: "Ofícios, alimentação e vida quotidiana em ambiente castrejo.",
      en: "Crafts, food, and daily life in a hillfort atmosphere.",
    },
  },
];

const CASTROS: Castro[] = [
  {
    id: "c1",
    name: "Castro (exemplo) — Monte do Outeiro",
    minutes: 60,
    snippet: {
      pt: "Povoado fortificado com leitura clara da implantação na paisagem.",
      en: "Fortified settlement with a clear reading of its landscape setting.",
    },
    near: { pt: "Trilho panorâmico e miradouro.", en: "Scenic trail and viewpoint." },
    coords: { lat: 41.55, lng: -8.42 },
    imageUrl:
      "https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&w=1600&q=60",
  },
  {
    id: "c2",
    name: "Castro (exemplo) — Cividade do Vale",
    minutes: 90,
    snippet: {
      pt: "Percurso de visita com pontos de interpretação e áreas de observação.",
      en: "Visitor route with interpretation points and observation areas.",
    },
    near: { pt: "Museu local e gastronomia.", en: "Local museum and gastronomy." },
    coords: { lat: 41.62, lng: -8.30 },
    imageUrl:
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1600&q=60",
  },
];

function formatDateISO(iso: string, lang: Lang) {
  const locale = lang === "pt" ? "pt-PT" : "en-GB";
  const [y, m, d] = iso.split("-").map((n) => Number(n));
  const dt = new Date(Date.UTC(y, m - 1, d));
  return new Intl.DateTimeFormat(locale, { day: "2-digit", month: "long", year: "numeric" }).format(dt);
}

export default function Page() {
  const [lang, setLang] = useState<Lang>("pt");
  const [activeSection, setActiveSection] = useState<
    "home" | "castros" | "itinerarios" | "agenda" | "parceiros" | "experiencias"
  >("home");

  const [calendarOpen, setCalendarOpen] = useState(false);
  const [calendarDate, setCalendarDate] = useState<string | null>(null);

  const copy = useMemo(() => {
    const c = {
      title: {
        pt: "Rota dos Castros do Noroeste de Portugal",
        en: "Hillfort Route of Northwest Portugal",
      },
      subtitle: {
        pt: "Património, paisagem e identidade — num companheiro digital elegante para planear e descobrir.",
        en: "Heritage, landscape and identity — a refined digital companion to plan and discover.",
      },
      ctaPrimary: { pt: "Explorar castros", en: "Explore hillforts" },
      ctaSecondary: { pt: "Ver itinerários", en: "See itineraries" },
      quick: { pt: "Acesso rápido", en: "Quick access" },
      menu: {
        pt: {
          home: "Início",
          castros: "Castros a Visitar",
          itinerarios: "Itinerários",
          agenda: "O que está a acontecer",
          parceiros: "Onde ficar e o que provar",
          experiencias: "Experiências imersivas",
        },
        en: {
          home: "Home",
          castros: "Hillforts",
          itinerarios: "Itineraries",
          agenda: "What’s on",
          parceiros: "Stay & Taste",
          experiencias: "Immersive",
        },
      },
      cards: {
        castros: {
          pt: "Descrições, fotos, mapas, tempos de visita e o que ver nas proximidades.",
          en: "Descriptions, photos, maps, visit times and nearby highlights.",
        },
        itinerarios: {
          pt: "Percursos prontos para famílias, caminhantes, fins de semana e viagens longas.",
          en: "Ready routes for families, hikers, weekend and multi-day trips.",
        },
        agenda: {
          pt: "Agenda de eventos, recriações, festivais e visitas encenadas.",
          en: "Events calendar, reenactments, festivals and guided experiences.",
        },
        parceiros: {
          pt: "Alojamento, restauração, museus e serviços — a oferta local em destaque.",
          en: "Lodging, food, museums and services — local offer curated.",
        },
        experiencias: {
          pt: "AR/3D para “viajar no tempo” e ver os castros como eram.",
          en: "AR/3D to “travel in time” and see hillforts as they were.",
        },
      },
    };
    return c;
  }, []);

  const menuLabel =
    lang === "pt"
      ? copy.menu.pt
      : copy.menu.en;

  const navItems: Array<{ key: typeof activeSection; label: string }> = [
    { key: "home", label: menuLabel.home },
    { key: "castros", label: menuLabel.castros },
    { key: "itinerarios", label: menuLabel.itinerarios },
    { key: "agenda", label: menuLabel.agenda },
    { key: "parceiros", label: menuLabel.parceiros },
    { key: "experiencias", label: menuLabel.experiencias },
  ];

  const eventDates = useMemo(() => {
    const uniq = Array.from(new Set(EVENTS.map((e) => e.dateISO))).sort();
    return uniq;
  }, []);

  const selectedEvents = useMemo(() => {
    if (!calendarDate) return [];
    return EVENTS.filter((e) => e.dateISO === calendarDate);
  }, [calendarDate]);

  return (
    <>
            {/* Ambient background */}
      <div className="bg-ambient" aria-hidden="true">
        <div className="orb orb-a" />
        <div className="orb orb-b" />
        <div className="grain" />
      </div>

      {/* HEADER */}
      <header className="topbar">
        <div className="container topbar-inner">
          <button className="brand" onClick={() => setActiveSection("home")} aria-label="Ir para início">
            <img src={LOGO_URL} alt="Logo" className="brand-logo" />
            <div className="brand-text">
              <div className="brand-title">{copy.title[lang]}</div>
              <div className="brand-sub">{lang === "pt" ? "Companheiro de viagem" : "Travel companion"}</div>
            </div>
          </button>

          <nav className="nav">
            {navItems.map((it) => (
              <button
                key={it.key}
                className={`nav-item ${activeSection === it.key ? "active" : ""}`}
                onClick={() => setActiveSection(it.key)}
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
          </div>
        </div>
      </header>

      {/* PAGE */}
      <main className="main">
        <div className="container">

          {/* HERO */}
          {activeSection === "home" && (
            <>
              <section className="hero">
                <div className="hero-left">
                  <div className="pill">
                    <span className="dot" />
                    {lang === "pt" ? "Descoberta • Património • Paisagem" : "Discovery • Heritage • Landscape"}
                  </div>

                  <h1 className="h1">{copy.title[lang]}</h1>
                  <p className="lead">{copy.subtitle[lang]}</p>

                  <div className="cta-row">
                    <button className="btn primary" onClick={() => setActiveSection("castros")}>
                      {copy.ctaPrimary[lang]}
                      <span className="btn-arrow">→</span>
                    </button>
                    <button className="btn ghost" onClick={() => setActiveSection("itinerarios")}>
                      {copy.ctaSecondary[lang]}
                    </button>
                  </div>

                  <div className="stats">
                    <div className="stat">
                      <div className="stat-k">{lang === "pt" ? "Ritmo" : "Pace"}</div>
                      <div className="stat-v">{lang === "pt" ? "simples e memorável" : "simple & memorable"}</div>
                    </div>
                    <div className="stat">
                      <div className="stat-k">{lang === "pt" ? "Planeamento" : "Planning"}</div>
                      <div className="stat-v">{lang === "pt" ? "itinerários e eventos" : "itineraries & events"}</div>
                    </div>
                    <div className="stat">
                      <div className="stat-k">{lang === "pt" ? "Imersão" : "Immersion"}</div>
                      <div className="stat-v">{lang === "pt" ? "AR/3D (MVP)" : "AR/3D (MVP)"}</div>
                    </div>
                  </div>
                </div>

                <div className="hero-right">
                  <div className="hero-card">
                    <div className="hero-media">
                      <img
                        className="hero-img"
                        alt={lang === "pt" ? "Paisagem do Noroeste (imagem ilustrativa)" : "Northwest landscape (illustrative)"}
                        src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1800&q=60"
                      />
                      <div className="hero-overlay" />
                    </div>

                    <div className="hero-card-body">
                      <div className="hero-mini">
                        <div className="mini-title">{lang === "pt" ? "Acesso rápido" : "Quick access"}</div>
                        <div className="mini-sub">
                          {lang === "pt"
                            ? "Escolhe um caminho para começar."
                            : "Pick a path to begin."}
                        </div>
                      </div>

                      <div className="quick-grid">
                        <QuickCard
                          icon="🏺"
                          title={lang === "pt" ? "Castros" : "Hillforts"}
                          desc={lang === "pt" ? "Ver locais e mapas" : "Places & maps"}
                          onClick={() => setActiveSection("castros")}
                        />
                        <QuickCard
                          icon="🧭"
                          title={lang === "pt" ? "Itinerários" : "Itineraries"}
                          desc={lang === "pt" ? "Percursos prontos" : "Ready routes"}
                          onClick={() => setActiveSection("itinerarios")}
                        />
                        <QuickCard
                          icon="🎭"
                          title={lang === "pt" ? "Agenda" : "What’s on"}
                          desc={lang === "pt" ? "Eventos e recriações" : "Events & shows"}
                          onClick={() => setActiveSection("agenda")}
                        />
                        <QuickCard
                          icon="✨"
                          title={lang === "pt" ? "Imersivo" : "Immersive"}
                          desc={lang === "pt" ? "AR/3D (MVP)" : "AR/3D (MVP)"}
                          onClick={() => setActiveSection("experiencias")}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* MENU CARDS */}
              <section className="section">
                <div className="section-head">
                  <h2 className="h2">{lang === "pt" ? "Menu principal" : "Main menu"}</h2>
                  <p className="muted">
                    {lang === "pt"
                      ? "Um ponto de partida elegante para planear e descobrir."
                      : "A refined starting point to plan and explore."}
                  </p>
                </div>

                <div className="grid cards">

                  <MenuCard
                    icon="🏺"
                    title={menuLabel.castros}
                    desc={copy.cards.castros[lang]}
                    onClick={() => setActiveSection("castros")}
                  />
                  <MenuCard
                    icon="🧭"
                    title={menuLabel.itinerarios}
                    desc={copy.cards.itinerarios[lang]}
                    onClick={() => setActiveSection("itinerarios")}
                  />
                  <MenuCard
                    icon="🎭"
                    title={menuLabel.agenda}
                    desc={copy.cards.agenda[lang]}
                    onClick={() => setActiveSection("agenda")}
                  />
                  <MenuCard
                    icon="🍷"
                    title={menuLabel.parceiros}
                    desc={copy.cards.parceiros[lang]}
                    onClick={() => setActiveSection("parceiros")}
                  />
                  <MenuCard
                    icon="✨"
                    title={menuLabel.experiencias}
                    desc={copy.cards.experiencias[lang]}
                    onClick={() => setActiveSection("experiencias")}
                  />
                </div>
              </section>

              {/* FEATURED */}
              <section className="section">
                <div className="section-head">
                  <h2 className="h2">{lang === "pt" ? "Em destaque" : "Featured"}</h2>
                  <p className="muted">
                    {lang === "pt"
                      ? "Dois exemplos para validar estilo e estrutura."
                      : "Two samples to validate style and structure."}
                  </p>
                </div>

                <div className="grid-2">
                  {CASTROS.map((c) => (
                    <div key={c.id} className="feature">
                      <div className="feature-media">
                        <img className="feature-img" src={c.imageUrl} alt={c.name} />
                      </div>
                      <div className="feature-body">
                        <div className="feature-top">
                          <div className="feature-title">{c.name}</div>
                          <span className="badge">{c.minutes} min</span>
                        </div>
                        <div className="feature-text">{c.snippet[lang]}</div>
                        <div className="feature-sub">
                          <span className="muted">
                            {lang === "pt" ? "Nas proximidades: " : "Nearby: "}
                          </span>
                          {c.near[lang]}
                        </div>

                        <div className="mapbox">
                          <iframe
                            title={`map-${c.id}`}
                            className="map"
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            src={`https://www.openstreetmap.org/export/embed.html?bbox=${c.coords.lng - 0.05}%2C${
                              c.coords.lat - 0.03
                            }%2C${c.coords.lng + 0.05}%2C${c.coords.lat + 0.03}&layer=mapnik&marker=${
                              c.coords.lat
                            }%2C${c.coords.lng}`}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </>
          )}

          {/* CASTROS */}
          {activeSection === "castros" && (
            <Section
              title={menuLabel.castros}
              subtitle={
                lang === "pt"
                  ? "Conteúdo de exemplo. Quando tiveres a lista real, eu ajusto textos, mapas e fotografias."
                  : "Sample content. When you have the real list, I’ll adapt texts, maps and photos."
              }
            >
              <div className="grid-2">
                {CASTROS.map((c) => (
                  <div key={c.id} className="card">
                    <div className="card-title-row">
                      <div className="card-title">{c.name}</div>
                      <span className="badge">{c.minutes} min</span>
                    </div>
                    <div className="card-text">{c.snippet[lang]}</div>

                    <div className="card-sub">
                      <span className="muted">{lang === "pt" ? "Nas proximidades: " : "Nearby: "}</span>
                      {c.near[lang]}
                    </div>

                    <div className="mapbox">
                      <iframe
                        title={`map2-${c.id}`}
                        className="map"
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        src={`https://www.openstreetmap.org/export/embed.html?bbox=${c.coords.lng - 0.05}%2C${
                          c.coords.lat - 0.03
                        }%2C${c.coords.lng + 0.05}%2C${c.coords.lat + 0.03}&layer=mapnik&marker=${
                          c.coords.lat
                        }%2C${c.coords.lng}`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Section>
          )}

          {/* ITINERARIOS */}
          {activeSection === "itinerarios" && (
            <Section
              title={menuLabel.itinerarios}
              subtitle={
                lang === "pt"
                  ? "Percursos prontos a usar (MVP). Posso adicionar filtros por tipo de viajante."
                  : "Ready-to-use routes (MVP). I can add filters by traveler type."
              }
            >
              <div className="grid">
                <div className="card">
                  <div className="card-title-row">
                    <div className="card-title">{lang === "pt" ? "Fim de semana essencial" : "Essential weekend"}</div>
                    <span className="badge">{lang === "pt" ? "2 dias" : "2 days"}</span>
                  </div>
                  <div className="card-text">
                    {lang === "pt"
                      ? "Combina castros, paisagem e um momento de gastronomia local."
                      : "Combines hillforts, landscape and a local food moment."}
                  </div>
                  <ul className="list">
                    <li>Castro (exemplo) — Monte do Outeiro</li>
                    <li>Cividade do Vale</li>
                    <li>{lang === "pt" ? "Museu + prova gastronómica" : "Museum + tasting"}</li>
                  </ul>
                </div>

                <div className="card">
                  <div className="card-title-row">
                    <div className="card-title">{lang === "pt" ? "Famílias e descoberta" : "Families & discovery"}</div>
                    <span className="badge">{lang === "pt" ? "1 dia" : "1 day"}</span>
                  </div>
                  <div className="card-text">
                    {lang === "pt"
                      ? "Ritmo leve com conteúdos para crianças e paragens confortáveis."
                      : "Easy pace with kid-friendly content and comfortable stops."}
                  </div>
                  <ul className="list">
                    <li>{lang === "pt" ? "Visita curta a um castro" : "Short hillfort visit"}</li>
                    <li>{lang === "pt" ? "Centro interpretativo" : "Interpretive center"}</li>
                    <li>{lang === "pt" ? "Atividade lúdica" : "Hands-on activity"}</li>
                  </ul>
                </div>
              </div>
            </Section>
          )}

          {/* AGENDA */}
          {activeSection === "agenda" && (
            <Section
              title={menuLabel.agenda}
              subtitle={
                lang === "pt"
                  ? "Eventos de exemplo. O calendário no topo abre um modal para escolher datas."
                  : "Sample events. The top calendar opens a modal to pick dates."
              }
            >
              <div className="grid">
                {EVENTS.sort((a, b) => (a.dateISO < b.dateISO ? -1 : 1)).map((e) => (
                  <div className="card" key={e.id}>
                    <div className="card-title-row">
                      <div className="card-title">{e.title[lang]}</div>
                      <span className="badge">{formatDateISO(e.dateISO, lang)}</span>
                    </div>
                    <div className="card-sub">{e.location[lang]}</div>
                    <div className="card-text">{e.description[lang]}</div>
                  </div>
                ))}
              </div>
            </Section>
          )}

          {/* PARCEIROS */}
          {activeSection === "parceiros" && (
            <Section
              title={menuLabel.parceiros}
              subtitle={
                lang === "pt"
                  ? "MVP para parceiros (alojamento, restauração, museus). Depois ligamos a uma base de dados."
                  : "MVP for partners (lodging, food, museums). Later we’ll connect to a database."
              }
            >
              <div className="grid">
                <div className="card">
                  <div className="card-title-row">
                    <div className="card-title">{lang === "pt" ? "Casa da Serra" : "Casa da Serra"}</div>
                    <span className="badge">{lang === "pt" ? "Alojamento" : "Lodging"}</span>
                  </div>
                  <div className="card-text">
                    {lang === "pt"
                      ? "Base confortável para explorar a rota com tranquilidade."
                      : "A comfortable base to explore the route with ease."}
                  </div>
                </div>

                <div className="card">
                  <div className="card-title-row">
                    <div className="card-title">{lang === "pt" ? "Sabores do Castro" : "Hillfort Flavors"}</div>
                    <span className="badge">{lang === "pt" ? "Restauração" : "Restaurant"}</span>
                  </div>
                  <div className="card-text">
                    {lang === "pt"
                      ? "Cozinha local inspirada no território e nos produtos sazonais."
                      : "Local cuisine inspired by the territory and seasonal produce."}
                  </div>
                </div>

                <div className="card">
                  <div className="card-title-row">
                    <div className="card-title">{lang === "pt" ? "Museu (exemplo)" : "Museum (sample)"}</div>
                    <span className="badge">{lang === "pt" ? "Cultura" : "Culture"}</span>
                  </div>
                  <div className="card-text">
                    {lang === "pt"
                      ? "Contexto arqueológico e narrativas para enriquecer a visita."
                      : "Archaeological context and narratives to enrich the visit."}
                  </div>
                </div>
              </div>
            </Section>
          )}

          {/* EXPERIENCIAS */}
          {activeSection === "experiencias" && (
            <Section
              title={menuLabel.experiencias}
              subtitle={
                lang === "pt"
                  ? "MVP com blocos prontos para evoluir para AR/3D (three.js / glTF / WebXR)."
                  : "MVP blocks ready to evolve into AR/3D (three.js / glTF / WebXR)."
              }
            >
              <div className="grid">
                <div className="card">
                  <div className="card-title-row">
                    <div className="card-title">{lang === "pt" ? "Reconstrução 3D" : "3D Reconstruction"}</div>
                    <span className="badge">MVP</span>
                  </div>
                  <div className="card-text">
                    {lang === "pt"
                      ? "Visualiza o castro “como era” com modelos 3D por local."
                      : "See the hillfort “as it was” with per-location 3D models."}
                  </div>
                  <div className="note">
                    {lang === "pt"
                      ? "Próximo passo: carregar ficheiros glTF e renderizar em three.js."
                      : "Next: load glTF files and render with three.js."}
                  </div>
                </div>

                <div className="card">
                  <div className="card-title-row">
                    <div className="card-title">{lang === "pt" ? "AR no local" : "On-site AR"}</div>
                    <span className="badge">MVP</span>
                  </div>
                  <div className="card-text">
                    {lang === "pt"
                      ? "Ativa experiências por QR code e pontos de interesse."
                      : "Trigger experiences by QR code and points of interest."}
                  </div>
                  <div className="note">
                    {lang === "pt"
                      ? "Próximo passo: WebXR (onde suportado) + fallback 2D."
                      : "Next: WebXR (where supported) + 2D fallback."}
                  </div>
                </div>

                <div className="card">
                  <div className="card-title-row">
                    <div className="card-title">{lang === "pt" ? "Histórias e objetos" : "Stories & objects"}</div>
                    <span className="badge">MVP</span>
                  </div>
                  <div className="card-text">
                    {lang === "pt"
                      ? "Hotspots com áudio, texto curto e mini-narrativas."
                      : "Hotspots with audio, short text and mini narratives."}
                  </div>
                  <div className="note">
                    {lang === "pt"
                      ? "Próximo passo: biblioteca de conteúdos multi-idioma."
                      : "Next: multilingual content library."}
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
                  <div className="footer-sub">© {new Date().getFullYear()} • MVP</div>
                </div>
              </div>

              <div className="footer-right">
                <button className="link" onClick={() => setActiveSection("home")}>
                  {lang === "pt" ? "Voltar ao início" : "Back to home"}
                </button>
              </div>
            </div>
          </footer>
        </div>
      </main>

      {/* CALENDAR MODAL */}
      {calendarOpen && (
        <div className="modal-backdrop" role="dialog" aria-modal="true" aria-label="Calendário">
          <div className="modal">
            <div className="modal-head">
              <div>
                <div className="modal-title">{lang === "pt" ? "Calendário" : "Calendar"}</div>
                <div className="modal-sub">
                  {lang === "pt"
                    ? "Escolhe uma data para ver eventos."
                    : "Pick a date to see events."}
                </div>
              </div>
              <button className="icon-close" onClick={() => setCalendarOpen(false)} aria-label="Fechar">
                ✕
              </button>
            </div>

            <div className="chips">
              {eventDates.map((d) => (
                <button
                  key={d}
                  className={`chip ${calendarDate === d ? "on" : ""}`}
                  onClick={() => setCalendarDate(d)}
                >
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
                  <div className="empty">
                    {lang === "pt" ? "Sem eventos para este dia." : "No events on this date."}
                  </div>
                )
              ) : (
                <div className="empty">
                  {lang === "pt" ? "Seleciona uma data acima." : "Select a date above."}
                </div>
              )}
            </div>

            <div className="modal-foot">
              <button
                className="btn ghost"
                onClick={() => {
                  setCalendarOpen(false);
                  setActiveSection("agenda");
                }}
              >
                {lang === "pt" ? "Abrir agenda" : "Open agenda"}
              </button>
              <button className="btn primary" onClick={() => setCalendarOpen(false)}>
                {lang === "pt" ? "Fechar" : "Close"} <span className="btn-arrow">→</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function Section({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="section">
      <div className="section-head">
        <h2 className="h2">{title}</h2>
        {subtitle && <p className="muted">{subtitle}</p>}
      </div>
      {children}
    </section>
  );
}

function MenuCard({
  icon,
  title,
  desc,
  onClick,
}: {
  icon: string;
  title: string;
  desc: string;
  onClick: () => void;
}) {
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

function QuickCard({
  icon,
  title,
  desc,
  onClick,
}: {
  icon: string;
  title: string;
  desc: string;
  onClick: () => void;
}) {
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

