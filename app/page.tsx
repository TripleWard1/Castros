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
      <style>{styles}</style>

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

                <div className="grid">
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

const styles = `
:root{
  --bg: #0b0c10;
  --card: rgba(255,255,255,.78);
  --card2: rgba(255,255,255,.9);
  --stroke: rgba(15,23,42,.10);
  --stroke2: rgba(15,23,42,.14);
  --text: #0b1020;
  --muted:#4b5563;
  --shadow: 0 18px 50px rgba(0,0,0,.18);
  --shadow2: 0 10px 28px rgba(0,0,0,.12);
  --r: 18px;
}

*{ box-sizing:border-box; }
html,body{ height:100%; }
body{ margin:0; color:var(--text); background:#f6f7fb; }

.container{
  width: min(1100px, calc(100% - 40px));
  margin: 0 auto;
}

.bg-ambient{
  position: fixed;
  inset: 0;
  z-index: -1;
  background: radial-gradient(1200px 900px at 18% 10%, rgba(120,119,198,.18), transparent 60%),
              radial-gradient(900px 700px at 85% 20%, rgba(56,189,248,.14), transparent 60%),
              radial-gradient(900px 700px at 60% 90%, rgba(16,185,129,.12), transparent 65%),
              linear-gradient(#f7f8fb, #f3f5fb);
}

.orb{
  position:absolute;
  width: 460px;
  height: 460px;
  filter: blur(30px);
  opacity: .65;
  border-radius: 999px;
  transform: translate3d(0,0,0);
}
.orb-a{ left:-120px; top: -160px; background: radial-gradient(circle at 30% 30%, rgba(99,102,241,.55), rgba(99,102,241,0) 62%); }
.orb-b{ right:-140px; top: -120px; background: radial-gradient(circle at 40% 40%, rgba(56,189,248,.55), rgba(56,189,248,0) 60%); }

.grain{
  position:absolute; inset:0;
  opacity:.10;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='220' height='220'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='220' height='220' filter='url(%23n)' opacity='.35'/%3E%3C/svg%3E");
  mix-blend-mode: multiply;
}

/* Topbar */
.topbar{
  position: sticky;
  top: 0;
  z-index: 20;
  backdrop-filter: blur(14px);
  background: rgba(255,255,255,.72);
  border-bottom: 1px solid var(--stroke);
}
.topbar-inner{
  display:flex;
  align-items:center;
  justify-content:space-between;
  gap:16px;
  padding: 12px 0;
}
.brand{
  display:flex;
  align-items:center;
  gap:12px;
  border:0;
  background:transparent;
  cursor:pointer;
  padding: 6px 8px;
  border-radius: 14px;
}
.brand:hover{ background: rgba(255,255,255,.55); }
.brand-logo{
  width: 44px;
  height: 44px;
  border-radius: 14px;
  box-shadow: 0 12px 24px rgba(0,0,0,.10);
}
.brand-text{ display:flex; flex-direction:column; gap:2px; }
.brand-title{
  font-weight: 760;
  font-size: 13px;
  letter-spacing: -.01em;
  max-width: 340px;
  line-height: 1.1;
}
.brand-sub{ font-size: 12px; color: var(--muted); }

.nav{
  display:none;
  gap:6px;
  padding: 6px;
  border-radius: 999px;
  border: 1px solid var(--stroke);
  background: rgba(255,255,255,.55);
}
.nav-item{
  border:0;
  background:transparent;
  cursor:pointer;
  padding: 8px 10px;
  border-radius: 999px;
  font-size: 12px;
  color: #111827;
}
.nav-item:hover{ background: rgba(15,23,42,.06); }
.nav-item.active{
  background: rgba(15,23,42,.10);
  box-shadow: inset 0 0 0 1px rgba(15,23,42,.10);
}

.actions{ display:flex; align-items:center; gap:10px; }

.icon-btn{
  display:flex;
  align-items:center;
  gap:8px;
  border: 1px solid var(--stroke);
  background: rgba(255,255,255,.62);
  cursor:pointer;
  padding: 10px 12px;
  border-radius: 999px;
  box-shadow: 0 10px 22px rgba(0,0,0,.06);
}
.icon-btn:hover{ background: rgba(255,255,255,.82); }
.icon{ font-size: 16px; }
.icon-btn-label{ font-size: 12px; color: #111827; }

.segmented{
  display:flex;
  border: 1px solid var(--stroke);
  border-radius: 999px;
  overflow:hidden;
  background: rgba(255,255,255,.62);
  box-shadow: 0 10px 22px rgba(0,0,0,.06);
}
.seg{
  border:0;
  background:transparent;
  cursor:pointer;
  padding: 10px 12px;
  font-size: 12px;
  color:#111827;
}
.seg:hover{ background: rgba(15,23,42,.06); }
.seg.on{
  background: rgba(17,24,39,.92);
  color: white;
}

/* Main */
.main{ padding: 26px 0 80px; }

/* Hero */
.hero{
  display:grid;
  grid-template-columns: 1.15fr .85fr;
  gap: 22px;
  align-items: stretch;
  margin-top: 14px;
}
@media (max-width: 980px){
  .hero{ grid-template-columns:1fr; }
  .nav{ display:none; }
}
@media (min-width: 1040px){
  .nav{ display:flex; }
}

.pill{
  display:inline-flex;
  align-items:center;
  gap:10px;
  padding: 10px 12px;
  border-radius: 999px;
  border: 1px solid var(--stroke);
  background: rgba(255,255,255,.75);
  box-shadow: 0 10px 22px rgba(0,0,0,.05);
  font-size: 12px;
  color:#111827;
}
.dot{
  width:8px; height:8px; border-radius:999px;
  background: radial-gradient(circle at 30% 30%, #22c55e, #16a34a);
  box-shadow: 0 0 0 6px rgba(34,197,94,.12);
}
.h1{
  font-size: clamp(32px, 4.4vw, 54px);
  margin: 14px 0 0;
  letter-spacing: -0.03em;
  line-height: 1.02;
}
.lead{
  margin: 14px 0 0;
  color: var(--muted);
  font-size: 16px;
  line-height: 1.6;
  max-width: 56ch;
}

.cta-row{
  display:flex;
  flex-wrap:wrap;
  gap: 10px;
  margin-top: 18px;
}
.btn{
  border: 1px solid var(--stroke2);
  cursor: pointer;
  padding: 12px 14px;
  border-radius: 999px;
  font-size: 13px;
  font-weight: 650;
  display:inline-flex;
  align-items:center;
  gap:10px;
  transition: transform .18s ease, box-shadow .18s ease, background .18s ease;
}
.btn:hover{ transform: translateY(-1px); box-shadow: 0 14px 30px rgba(0,0,0,.10); }
.btn:active{ transform: translateY(0px); }
.btn.primary{
  background: rgba(17,24,39,.94);
  color:white;
  border-color: rgba(17,24,39,.60);
}
.btn.ghost{
  background: rgba(255,255,255,.72);
  color:#111827;
}
.btn-arrow{ opacity:.9; }

.stats{
  margin-top: 18px;
  display:grid;
  grid-template-columns: repeat(3, minmax(0,1fr));
  gap: 10px;
}
@media (max-width: 720px){
  .stats{ grid-template-columns:1fr; }
}
.stat{
  border: 1px solid var(--stroke);
  background: rgba(255,255,255,.70);
  border-radius: 16px;
  padding: 12px 12px;
}
.stat-k{ font-size: 11px; color: var(--muted); }
.stat-v{ margin-top: 4px; font-size: 13px; font-weight: 650; color:#0f172a; }

.hero-card{
  border-radius: 24px;
  overflow:hidden;
  border: 1px solid var(--stroke);
  background: rgba(255,255,255,.70);
  box-shadow: var(--shadow);
}
.hero-media{ position:relative; height: 260px; }
.hero-img{ width:100%; height:100%; object-fit:cover; display:block; }
.hero-overlay{
  position:absolute; inset:0;
  background: linear-gradient(to bottom, rgba(0,0,0,.05), rgba(0,0,0,.40));
}
.hero-card-body{ padding: 14px; }
.hero-mini{ display:flex; flex-direction:column; gap:4px; }
.mini-title{ font-size: 12px; font-weight: 760; color:white; margin-top: -72px; position:relative; }
.mini-sub{ font-size: 12px; color: rgba(255,255,255,.78); position:relative; }

.quick-grid{
  margin-top: 12px;
  display:grid;
  grid-template-columns: repeat(2, minmax(0,1fr));
  gap: 10px;
}
.quick{
  border: 1px solid rgba(255,255,255,.14);
  background: rgba(255,255,255,.78);
  border-radius: 16px;
  padding: 10px;
  cursor:pointer;
  display:flex;
  gap:10px;
  align-items:center;
  transition: transform .18s ease, box-shadow .18s ease;
}
.quick:hover{ transform: translateY(-1px); box-shadow: var(--shadow2); }
.quick-ic{
  width: 36px; height: 36px;
  border-radius: 12px;
  display:flex; align-items:center; justify-content:center;
  background: rgba(17,24,39,.92);
  color:white;
}
.quick-t{ font-size: 12px; font-weight: 760; }
.quick-d{ font-size: 12px; color: var(--muted); margin-top: 2px; }

/* Sections */
.section{ margin-top: 34px; }
.section-head{ margin-bottom: 14px; }
.h2{ margin:0; font-size: 20px; letter-spacing: -0.02em; }
.muted{ margin: 8px 0 0; color: var(--muted); line-height: 1.6; }

.grid{
  display:grid;
  grid-template-columns: repeat(12, minmax(0,1fr));
  gap: 12px;
}
.menu-card{
  grid-column: span 6;
  border-radius: 20px;
  border: 1px solid var(--stroke);
  background: rgba(255,255,255,.78);
  padding: 14px;
  cursor:pointer;
  display:flex;
  align-items:center;
  justify-content:space-between;
  gap: 12px;
  box-shadow: 0 14px 28px rgba(0,0,0,.06);
  transition: transform .18s ease, box-shadow .18s ease, background .18s ease;
}
.menu-card:hover{
  transform: translateY(-2px);
  background: rgba(255,255,255,.92);
  box-shadow: 0 18px 40px rgba(0,0,0,.10);
}
.menu-ic{
  width: 44px; height: 44px;
  border-radius: 16px;
  display:flex; align-items:center; justify-content:center;
  background: rgba(17,24,39,.92);
  color:white;
  flex: 0 0 auto;
}
.menu-body{ text-align:left; flex: 1; }
.menu-title{ font-size: 13px; font-weight: 760; }
.menu-desc{ margin-top: 4px; font-size: 12px; color: var(--muted); line-height: 1.5; }
.menu-go{ font-size: 18px; color: rgba(17,24,39,.75); }

@media (max-width: 820px){
  .menu-card{ grid-column: span 12; }
}

.grid-2{
  display:grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}
@media (max-width: 920px){
  .grid-2{ grid-template-columns:1fr; }
}

/* Featured cards */
.feature{
  border-radius: 22px;
  overflow:hidden;
  border: 1px solid var(--stroke);
  background: rgba(255,255,255,.80);
  box-shadow: 0 18px 44px rgba(0,0,0,.10);
}
.feature-media{ height: 220px; }
.feature-img{ width:100%; height:100%; object-fit:cover; display:block; }
.feature-body{ padding: 14px; }
.feature-top{
  display:flex; align-items:center; justify-content:space-between; gap:10px;
}
.feature-title{ font-weight: 820; font-size: 14px; letter-spacing: -.01em; }
.badge{
  font-size: 11px;
  padding: 6px 10px;
  border-radius: 999px;
  background: rgba(17,24,39,.92);
  color:white;
}
.feature-text{ margin-top: 8px; color: #111827; font-size: 13px; line-height: 1.55; }
.feature-sub{ margin-top: 8px; font-size: 12px; color: #111827; }

.mapbox{
  margin-top: 12px;
  border-radius: 16px;
  overflow:hidden;
  border: 1px solid var(--stroke);
  background: rgba(255,255,255,.9);
}
.map{ width:100%; height: 220px; border:0; display:block; }

/* Generic cards */
.card{
  border-radius: 20px;
  border: 1px solid var(--stroke);
  background: rgba(255,255,255,.78);
  padding: 14px;
  box-shadow: 0 14px 28px rgba(0,0,0,.06);
}
.card-title-row{
  display:flex; align-items:center; justify-content:space-between; gap:10px;
}
.card-title{ font-weight: 820; font-size: 14px; letter-spacing: -.01em; }
.card-sub{ margin-top: 6px; color: var(--muted); font-size: 12px; }
.card-text{ margin-top: 10px; color:#111827; font-size: 13px; line-height: 1.6; }
.note{
  margin-top: 12px;
  border-radius: 14px;
  padding: 10px;
  background: rgba(15,23,42,.05);
  border: 1px solid rgba(15,23,42,.08);
  color: var(--muted);
  font-size: 12px;
  line-height: 1.55;
}
.list{
  margin: 10px 0 0;
  padding-left: 18px;
  color:#111827;
  font-size: 13px;
  line-height: 1.7;
}

/* Footer */
.footer{
  margin-top: 52px;
  padding-top: 22px;
  border-top: 1px solid var(--stroke);
}
.footer-inner{
  display:flex;
  align-items:center;
  justify-content:space-between;
  gap: 14px;
  padding: 18px 0;
}
.footer-left{ display:flex; align-items:center; gap: 12px; }
.footer-logo{ width: 36px; height: 36px; border-radius: 12px; box-shadow: 0 10px 22px rgba(0,0,0,.08); }
.footer-title{ font-weight: 760; font-size: 13px; }
.footer-sub{ margin-top: 2px; font-size: 12px; color: var(--muted); }
.link{
  border:0;
  background: transparent;
  cursor:pointer;
  color:#111827;
  font-weight: 650;
  font-size: 12px;
  text-decoration: underline;
  text-decoration-color: rgba(17,24,39,.25);
}
.link:hover{ text-decoration-color: rgba(17,24,39,.70); }

/* Modal */
.modal-backdrop{
  position: fixed;
  inset: 0;
  background: rgba(15,23,42,.42);
  display:flex;
  align-items:center;
  justify-content:center;
  padding: 18px;
  z-index: 50;
}
.modal{
  width: min(720px, 100%);
  border-radius: 24px;
  border: 1px solid rgba(255,255,255,.25);
  background: rgba(255,255,255,.92);
  box-shadow: 0 30px 80px rgba(0,0,0,.28);
  overflow:hidden;
}
.modal-head{
  display:flex;
  align-items:flex-start;
  justify-content:space-between;
  gap: 12px;
  padding: 16px 16px 10px;
  border-bottom: 1px solid var(--stroke);
}
.modal-title{ font-weight: 860; letter-spacing: -.02em; }
.modal-sub{ margin-top: 4px; font-size: 12px; color: var(--muted); }
.icon-close{
  border: 1px solid var(--stroke);
  background: rgba(255,255,255,.8);
  border-radius: 12px;
  padding: 8px 10px;
  cursor:pointer;
}
.icon-close:hover{ background: white; }

.chips{
  padding: 12px 16px 0;
  display:flex;
  flex-wrap:wrap;
  gap: 8px;
}
.chip{
  border: 1px solid var(--stroke);
  background: rgba(255,255,255,.75);
  border-radius: 999px;
  padding: 8px 10px;
  cursor:pointer;
  font-size: 12px;
}
.chip:hover{ background: rgba(255,255,255,.92); }
.chip.on{
  background: rgba(17,24,39,.92);
  color:white;
  border-color: rgba(17,24,39,.55);
}

.modal-body{
  padding: 12px 16px 6px;
}
.modal-events{ display:grid; gap: 10px; }
.event{
  border-radius: 16px;
  border: 1px solid var(--stroke);
  background: rgba(255,255,255,.85);
  padding: 12px;
}
.event-title{ font-weight: 820; font-size: 13px; }
.event-loc{ margin-top: 4px; color: var(--muted); font-size: 12px; }
.event-desc{ margin-top: 8px; font-size: 13px; line-height: 1.6; color:#111827; }
.empty{ color: var(--muted); font-size: 13px; padding: 14px 0; }

.modal-foot{
  display:flex;
  justify-content:flex-end;
  gap: 10px;
  padding: 12px 16px 16px;
  border-top: 1px solid var(--stroke);
}
`;

