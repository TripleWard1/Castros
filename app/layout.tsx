const GLOBAL_CSS = `
:root{
  /* Stone / Sand / Bronze / Slate */
  --bg0: #fbfaf7;
  --bg1: #f2efe8;

  --ink: #0f172a;         /* slate-900 */
  --muted: #5b6472;       /* slate-ish */
  --muted2:#7a8596;

  --stroke: rgba(15,23,42,.10);
  --stroke2: rgba(15,23,42,.14);

  --card: rgba(255,255,255,.78);
  --glass: rgba(255,255,255,.68);

  --bronze: #b08d57;
  --bronze2:#c7a26a;
  --bronzeSoft: rgba(176,141,87,.18);

  --shadow: 0 18px 52px rgba(15,23,42,.14);
  --shadow2: 0 10px 28px rgba(15,23,42,.10);

  --r: 22px;
}

*{ box-sizing:border-box; }
html,body{ height:100%; overflow-x:hidden; }
body{
  margin:0;
  color: var(--ink);
  background: linear-gradient(180deg, var(--bg0), var(--bg1));
  font-family: Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial;
  -webkit-font-smoothing: antialiased;
  text-rendering: geometricPrecision;
}

img{ max-width:100%; height:auto; display:block; }
button{ font-family: inherit; }
a{ color: inherit; }

.container{
  width: min(1160px, calc(100% - 40px));
  margin: 0 auto;
}

/* Ambient background */
.bg-ambient{
  position: fixed;
  inset: 0;
  z-index: -2;
  overflow:hidden;
  background:
    radial-gradient(1200px 900px at 12% 8%, rgba(176,141,87,.18), transparent 60%),
    radial-gradient(900px 700px at 86% 14%, rgba(56,189,248,.10), transparent 62%),
    radial-gradient(900px 700px at 62% 92%, rgba(16,185,129,.08), transparent 65%),
    linear-gradient(180deg, var(--bg0), var(--bg1));
}

/* Subtle "stone grain" - no hydration issues */
.grain{
  position:absolute;
  inset:0;
  opacity:.10;
  pointer-events:none;
  background:
    repeating-radial-gradient(circle at 18% 28%, rgba(15,23,42,.10) 0 1px, transparent 1px 7px),
    repeating-radial-gradient(circle at 72% 44%, rgba(15,23,42,.06) 0 1px, transparent 1px 9px);
  mix-blend-mode: multiply;
}

.orb{
  position:absolute;
  width: 560px;
  height: 560px;
  filter: blur(38px);
  opacity: .52;
  border-radius: 999px;
}
.orb-a{ left:-210px; top: -250px; background: radial-gradient(circle at 30% 30%, rgba(176,141,87,.58), rgba(176,141,87,0) 62%); }
.orb-b{ right:-260px; top: -260px; background: radial-gradient(circle at 40% 40%, rgba(59,130,246,.25), rgba(59,130,246,0) 60%); }

/* Topbar */
.topbar{
  position: sticky;
  top: 0;
  z-index: 40;
  backdrop-filter: blur(18px);
  background: rgba(251,250,247,.72);
  border-bottom: 1px solid rgba(176,141,87,.14);
}
.topbar-inner{
  display:flex;
  align-items:center;
  justify-content:space-between;
  gap:14px;
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
  border-radius: 16px;
  transition: background .18s ease;
}
.brand:hover{ background: rgba(255,255,255,.55); }
.brand-logo{
  width: 44px; height: 44px;
  border-radius: 14px;
  box-shadow: 0 14px 26px rgba(15,23,42,.12);
}
.brand-text{ display:flex; flex-direction:column; gap:2px; }
.brand-title{
  font-family: Fraunces, ui-serif, Georgia, serif;
  font-weight: 700;
  font-size: 14px;
  letter-spacing: -0.01em;
  line-height: 1.1;
  max-width: 420px;
}
.brand-sub{
  font-size: 12px;
  color: var(--muted);
  display:flex;
  align-items:center;
  gap:8px;
}

/* Desktop nav */
.nav{
  display:none;
  gap:6px;
  padding: 6px;
  border-radius: 999px;
  border: 1px solid rgba(176,141,87,.18);
  background: rgba(255,255,255,.52);
}
.nav-item{
  border:0;
  background:transparent;
  cursor:pointer;
  padding: 9px 11px;
  border-radius: 999px;
  font-size: 12px;
  color: #111827;
  transition: background .18s ease, box-shadow .18s ease;
}
.nav-item:hover{ background: rgba(15,23,42,.06); }
.nav-item.active{
  background: rgba(176,141,87,.16);
  box-shadow: inset 0 0 0 1px rgba(176,141,87,.18);
}

.actions{ display:flex; align-items:center; gap:10px; }

/* Buttons */
.icon-btn{
  display:flex;
  align-items:center;
  gap:8px;
  border: 1px solid rgba(176,141,87,.18);
  background: rgba(255,255,255,.60);
  cursor:pointer;
  padding: 10px 12px;
  border-radius: 999px;
  box-shadow: 0 10px 22px rgba(15,23,42,.06);
  transition: transform .18s ease, box-shadow .18s ease, background .18s ease, border-color .18s ease;
}
.icon-btn:hover{
  background: rgba(255,255,255,.86);
  border-color: rgba(176,141,87,.34);
  transform: translateY(-1px);
  box-shadow: 0 16px 34px rgba(15,23,42,.10);
}
.icon{ font-size: 16px; }
.icon-btn-label{ font-size: 12px; color: #111827; }

.segmented{
  display:flex;
  border: 1px solid rgba(176,141,87,.18);
  border-radius: 999px;
  overflow:hidden;
  background: rgba(255,255,255,.60);
  box-shadow: 0 10px 22px rgba(15,23,42,.06);
}
.seg{
  border:0;
  background:transparent;
  cursor:pointer;
  padding: 10px 12px;
  font-size: 12px;
  color:#111827;
  transition: background .18s ease, color .18s ease;
}
.seg:hover{ background: rgba(15,23,42,.06); }
.seg.on{
  background: rgba(17,24,39,.92);
  color: white;
}

/* Hamburger: only mobile */
.hamburger{
  display:inline-flex;
  align-items:center;
  justify-content:center;
  width: 42px;
  height: 42px;
  border-radius: 999px;
  border: 1px solid rgba(176,141,87,.18);
  background: rgba(255,255,255,.60);
  box-shadow: 0 10px 22px rgba(15,23,42,.06);
  cursor:pointer;
  transition: background .18s ease, transform .18s ease;
}
.hamburger:hover{ background: rgba(255,255,255,.86); transform: translateY(-1px); }

/* Main spacing */
.main{ padding: 26px 0 92px; }

/* HERO: editorial */
.hero{
  display:grid;
  grid-template-columns: 1.05fr .95fr;
  gap: 18px;
  align-items: stretch;
  margin-top: 14px;
}
@media (max-width: 980px){
  .hero{ grid-template-columns:1fr; }
}
@media (min-width: 1040px){
  .nav{ display:flex; }
}
@media (min-width: 1040px){
  .hamburger{ display:none; }
}

.pill{
  display:inline-flex;
  align-items:center;
  gap:10px;
  padding: 10px 12px;
  border-radius: 999px;
  border: 1px solid rgba(176,141,87,.22);
  background: rgba(255,255,255,.72);
  box-shadow: 0 10px 22px rgba(15,23,42,.05);
  font-size: 12px;
  color:#111827;
}
.dot{
  width:8px; height:8px; border-radius:999px;
  background: radial-gradient(circle at 30% 30%, var(--bronze2), var(--bronze));
  box-shadow: 0 0 0 6px rgba(176,141,87,.16);
}

.h1{
  font-family: Fraunces, ui-serif, Georgia, serif;
  font-size: clamp(36px, 4.8vw, 62px);
  margin: 14px 0 0;
  letter-spacing: -0.04em;
  line-height: 1.01;
}
.lead{
  margin: 14px 0 0;
  color: var(--muted);
  font-size: 16px;
  line-height: 1.72;
  max-width: 62ch;
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
  transition: transform .18s ease, box-shadow .18s ease, background .18s ease, border-color .18s ease;
}
.btn:hover{ transform: translateY(-1px); box-shadow: 0 16px 34px rgba(15,23,42,.10); }
.btn:active{ transform: translateY(0px); }
.btn.primary{
  background: rgba(17,24,39,.94);
  color:white;
  border-color: rgba(17,24,39,.55);
}
.btn.primary:hover{ border-color: rgba(176,141,87,.45); }
.btn.ghost{
  background: rgba(255,255,255,.70);
  color:#111827;
  border-color: rgba(176,141,87,.22);
}
.btn.ghost:hover{ border-color: rgba(176,141,87,.42); }
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
  border: 1px solid rgba(176,141,87,.18);
  background: rgba(255,255,255,.72);
  border-radius: 18px;
  padding: 12px 12px;
}
.stat-k{ font-size: 11px; color: var(--muted); }
.stat-v{ margin-top: 4px; font-size: 13px; font-weight: 650; color:#0f172a; }

/* Hero "Cinematic" card */
.hero-card{
  border-radius: 28px;
  overflow:hidden;
  border: 1px solid rgba(176,141,87,.18);
  background: rgba(255,255,255,.72);
  box-shadow: var(--shadow);
}

.hero-media{
  position:relative;
  height: 320px;
  overflow:hidden;
}
@media (max-width: 980px){
  .hero-media{ height: 260px; }
}
.hero-img{
  width:100%;
  height:100%;
  object-fit:cover;
  display:block;
  transform: scale(1.02);
}
.hero-overlay{
  position:absolute; inset:0;
  background:
    linear-gradient(to bottom, rgba(0,0,0,.10), rgba(0,0,0,.52)),
    radial-gradient(900px 500px at 20% 20%, rgba(176,141,87,.28), transparent 58%);
}
.hero-frame{
  position:absolute;
  inset: 14px;
  border-radius: 22px;
  border: 1px solid rgba(255,255,255,.22);
  box-shadow: inset 0 0 0 1px rgba(176,141,87,.18);
  pointer-events:none;
}
.hero-caption{
  position:absolute;
  left: 18px;
  right: 18px;
  bottom: 14px;
  display:flex;
  justify-content:space-between;
  gap: 12px;
  align-items:flex-end;
}
.hero-cap-left{
  display:flex;
  flex-direction:column;
  gap: 4px;
}
.hero-cap-title{
  color: white;
  font-weight: 850;
  letter-spacing: -.01em;
  font-size: 13px;
}
.hero-cap-sub{
  color: rgba(255,255,255,.82);
  font-size: 12px;
}
.hero-cap-chip{
  display:inline-flex;
  align-items:center;
  gap: 8px;
  padding: 8px 10px;
  border-radius: 999px;
  border: 1px solid rgba(255,255,255,.18);
  background: rgba(17,24,39,.35);
  color: white;
  font-size: 12px;
  backdrop-filter: blur(10px);
}

.hero-card-body{ padding: 14px; }

.hero-mini{ display:flex; flex-direction:column; gap:4px; }
.mini-title{
  font-size: 12px;
  font-weight: 760;
  color:#111827;
}
.mini-sub{
  font-size: 12px;
  color: var(--muted);
}

.quick-grid{
  margin-top: 12px;
  display:grid;
  grid-template-columns: repeat(2, minmax(0,1fr));
  gap: 10px;
}
.quick{
  border: 1px solid rgba(176,141,87,.16);
  background: rgba(255,255,255,.80);
  border-radius: 18px;
  padding: 10px;
  cursor:pointer;
  display:flex;
  gap:10px;
  align-items:center;
  transition: transform .18s ease, box-shadow .18s ease, border-color .18s ease;
}
.quick:hover{
  transform: translateY(-1px);
  box-shadow: var(--shadow2);
  border-color: rgba(176,141,87,.35);
}
.quick-ic{
  width: 36px; height: 36px;
  border-radius: 14px;
  display:flex; align-items:center; justify-content:center;
  background: rgba(17,24,39,.92);
  color:white;
}
.quick-t{ font-size: 12px; font-weight: 820; letter-spacing:-.01em; }
.quick-d{ font-size: 12px; color: var(--muted); margin-top: 2px; }

/* Sections */
.section{ margin-top: 34px; }
.section-head{
  margin-bottom: 14px;
  display:flex;
  align-items:flex-end;
  justify-content:space-between;
  gap: 12px;
}
.section-head-left{ max-width: 70ch; }
.h2{
  margin:0;
  font-family: Fraunces, ui-serif, Georgia, serif;
  font-size: 22px;
  letter-spacing: -0.02em;
}
.muted{ margin: 8px 0 0; color: var(--muted); line-height: 1.6; }

.section-tools{
  display:flex;
  gap: 10px;
  align-items:center;
  flex-wrap:wrap;
}
.search{
  display:flex;
  align-items:center;
  gap: 10px;
  padding: 10px 12px;
  border-radius: 999px;
  border: 1px solid rgba(176,141,87,.18);
  background: rgba(255,255,255,.62);
  box-shadow: 0 10px 22px rgba(15,23,42,.06);
}
.search input{
  border:0;
  outline:0;
  background:transparent;
  font-size: 12px;
  width: min(320px, 42vw);
  color:#111827;
}
.search .k{
  font-size: 11px;
  color: var(--muted2);
  border: 1px solid rgba(176,141,87,.18);
  border-bottom-color: rgba(176,141,87,.28);
  background: rgba(255,255,255,.70);
  border-radius: 8px;
  padding: 2px 6px;
}

/* Filter chips */
.filters{
  display:flex;
  flex-wrap:wrap;
  gap: 8px;
}
.filter{
  border: 1px solid rgba(176,141,87,.18);
  background: rgba(255,255,255,.70);
  border-radius: 999px;
  padding: 9px 11px;
  cursor:pointer;
  font-size: 12px;
  transition: background .18s ease, border-color .18s ease, transform .18s ease;
}
.filter:hover{ border-color: rgba(176,141,87,.38); transform: translateY(-1px); }
.filter.on{
  background: rgba(17,24,39,.92);
  color:white;
  border-color: rgba(17,24,39,.55);
}

/* Grids */
.grid{
  display:grid;
  grid-template-columns: repeat(12, minmax(0,1fr));
  gap: 12px;
}

.menu-card{
  grid-column: span 6;
  border-radius: 22px;
  border: 1px solid rgba(176,141,87,.18);
  background: rgba(255,255,255,.78);
  padding: 14px;
  cursor:pointer;
  display:flex;
  align-items:center;
  justify-content:space-between;
  gap: 12px;
  box-shadow: 0 16px 34px rgba(15,23,42,.08);
  transition: transform .18s ease, box-shadow .18s ease, background .18s ease, border-color .18s ease;
}
.menu-card:hover{
  transform: translateY(-2px);
  background: rgba(255,255,255,.92);
  border-color: rgba(176,141,87,.35);
  box-shadow: 0 22px 52px rgba(15,23,42,.12);
}
.menu-ic{
  width: 46px; height: 46px;
  border-radius: 18px;
  display:flex; align-items:center; justify-content:center;
  background: rgba(17,24,39,.92);
  color:white;
  flex: 0 0 auto;
}
.menu-body{ text-align:left; flex: 1; }
.menu-title{ font-size: 13px; font-weight: 860; letter-spacing: -.01em; }
.menu-desc{ margin-top: 4px; font-size: 12px; color: var(--muted); line-height: 1.55; }
.menu-go{ font-size: 18px; color: rgba(17,24,39,.75); }

/* ✅ cards in lists */
.grid.cards > *{ grid-column: span 6; }
@media (max-width: 860px){
  .menu-card{ grid-column: span 12; }
  .grid.cards > *{ grid-column: span 12; }
}

/* Featured */
.grid-2{
  display:grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}
@media (max-width: 920px){
  .grid-2{ grid-template-columns:1fr; }
}

.feature{
  border-radius: 26px;
  overflow:hidden;
  border: 1px solid rgba(176,141,87,.18);
  background: rgba(255,255,255,.82);
  box-shadow: 0 22px 62px rgba(15,23,42,.12);
  position:relative;
}
.feature-media{ height: 230px; position:relative; }
@media (max-width: 820px){
  .feature-media{ height: 190px; }
}
.feature-img{ width:100%; height:100%; object-fit:cover; display:block; }
.feature-grad{
  position:absolute; inset:0;
  background: linear-gradient(to bottom, rgba(0,0,0,.05), rgba(0,0,0,.45));
}
.feature-body{ padding: 14px; }
.feature-top{
  display:flex; align-items:center; justify-content:space-between; gap:10px;
}
.feature-title{
  font-weight: 900;
  font-size: 14px;
  letter-spacing: -.01em;
}
.badge{
  font-size: 11px;
  padding: 6px 10px;
  border-radius: 999px;
  background: rgba(17,24,39,.92);
  color:white;
}
.badge.alt{
  background: rgba(176,141,87,.18);
  color: #111827;
  border: 1px solid rgba(176,141,87,.22);
}
.feature-text{ margin-top: 8px; color: #111827; font-size: 13px; line-height: 1.65; }
.feature-sub{ margin-top: 8px; font-size: 12px; color: #111827; }

.mapbox{
  margin-top: 12px;
  border-radius: 18px;
  overflow:hidden;
  border: 1px solid rgba(176,141,87,.16);
  background: rgba(255,255,255,.9);
}
.map{ width:100%; height: 220px; border:0; display:block; }

/* Generic card */
.card{
  border-radius: 24px;
  border: 1px solid rgba(176,141,87,.16);
  background: rgba(255,255,255,.82);
  padding: 14px;
  box-shadow: 0 16px 36px rgba(15,23,42,.08);
}
.card-title-row{
  display:flex; align-items:center; justify-content:space-between; gap:10px;
}
.card-title{ font-weight: 900; font-size: 14px; letter-spacing: -.01em; }
.card-sub{ margin-top: 6px; color: var(--muted); font-size: 12px; }
.card-text{ margin-top: 10px; color:#111827; font-size: 13px; line-height: 1.75; }

.meta{
  margin-top: 10px;
  display:flex;
  flex-wrap:wrap;
  gap: 8px;
}
.pill2{
  display:inline-flex;
  align-items:center;
  gap: 8px;
  padding: 7px 10px;
  border-radius: 999px;
  border: 1px solid rgba(176,141,87,.18);
  background: rgba(255,255,255,.72);
  font-size: 12px;
  color:#111827;
}

.note{
  margin-top: 12px;
  border-radius: 16px;
  padding: 10px;
  background: rgba(176,141,87,.10);
  border: 1px solid rgba(176,141,87,.18);
  color: var(--muted);
  font-size: 12px;
  line-height: 1.65;
}
.list{
  margin: 10px 0 0;
  padding-left: 18px;
  color:#111827;
  font-size: 13px;
  line-height: 1.8;
}

/* Footer */
.footer{
  margin-top: 56px;
  padding-top: 22px;
  border-top: 1px solid rgba(176,141,87,.14);
}
.footer-inner{
  display:flex;
  align-items:center;
  justify-content:space-between;
  gap: 14px;
  padding: 18px 0;
}
.footer-left{ display:flex; align-items:center; gap: 12px; }
.footer-logo{ width: 36px; height: 36px; border-radius: 12px; box-shadow: 0 10px 22px rgba(15,23,42,.08); }
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
  text-decoration-color: rgba(176,141,87,.35);
}
.link:hover{ text-decoration-color: rgba(176,141,87,.75); }

/* Modal + Drawer */
.backdrop{
  position: fixed;
  inset: 0;
  background: rgba(15,23,42,.50);
  display:flex;
  align-items:center;
  justify-content:center;
  padding: 18px;
  z-index: 60;
}
.modal{
  width: min(780px, 100%);
  border-radius: 28px;
  border: 1px solid rgba(255,255,255,.18);
  background: rgba(255,255,255,.92);
  box-shadow: 0 36px 100px rgba(15,23,42,.32);
  overflow:hidden;
}
.modal-head{
  display:flex;
  align-items:flex-start;
  justify-content:space-between;
  gap: 12px;
  padding: 16px 16px 10px;
  border-bottom: 1px solid rgba(176,141,87,.14);
}
.modal-title{
  font-family: Fraunces, ui-serif, Georgia, serif;
  font-weight: 700;
  letter-spacing: -.02em;
}
.modal-sub{ margin-top: 4px; font-size: 12px; color: var(--muted); }
.icon-close{
  border: 1px solid rgba(176,141,87,.18);
  background: rgba(255,255,255,.85);
  border-radius: 14px;
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
  border: 1px solid rgba(176,141,87,.18);
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

.modal-body{ padding: 12px 16px 6px; }
.modal-events{ display:grid; gap: 10px; }
.event{
  border-radius: 20px;
  border: 1px solid rgba(176,141,87,.16);
  background: rgba(255,255,255,.88);
  padding: 12px;
}
.event-title{ font-weight: 900; font-size: 13px; }
.event-loc{ margin-top: 4px; color: var(--muted); font-size: 12px; }
.event-desc{ margin-top: 8px; font-size: 13px; line-height: 1.75; color:#111827; }
.empty{ color: var(--muted); font-size: 13px; padding: 14px 0; }

.modal-foot{
  display:flex;
  justify-content:flex-end;
  gap: 10px;
  padding: 12px 16px 16px;
  border-top: 1px solid rgba(176,141,87,.14);
}

/* Drawer */
.drawer{
  width: min(440px, 100%);
  margin-left: auto;
  height: 100%;
  border-left: 1px solid rgba(255,255,255,.14);
  background: rgba(251,250,247,.94);
  backdrop-filter: blur(18px);
  padding: 14px;
  box-shadow: -26px 0 80px rgba(15,23,42,.34);
}
.drawer-head{
  display:flex;
  align-items:center;
  justify-content:space-between;
  gap: 10px;
}
.drawer-title{
  font-family: Fraunces, ui-serif, Georgia, serif;
  font-weight: 700;
  letter-spacing: -.02em;
}
.drawer-list{
  margin-top: 12px;
  display:grid;
  gap: 8px;
}
.drawer-item{
  width: 100%;
  text-align:left;
  border: 1px solid rgba(176,141,87,.16);
  background: rgba(255,255,255,.72);
  border-radius: 18px;
  padding: 12px;
  cursor:pointer;
  display:flex;
  justify-content:space-between;
  gap: 10px;
}
.drawer-item:hover{ background: rgba(255,255,255,.92); border-color: rgba(176,141,87,.30); }
.drawer-item .small{ font-size: 12px; color: var(--muted); margin-top: 2px; }
.drawer-actions{
  margin-top: 12px;
  display:flex;
  gap: 10px;
  flex-wrap:wrap;
}
`;

export const metadata = {
  title: "Rota dos Castros do Noroeste de Portugal",
  description: "Companheiro de viagem digital da Rota dos Castros",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,600;9..144,700&family=Inter:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <style dangerouslySetInnerHTML={{ __html: GLOBAL_CSS }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
