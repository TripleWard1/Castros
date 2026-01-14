const GLOBAL_CSS = `
:root{
  /* Palette: stone/sand + bronze + slate */
  --bg0: #fbfaf7;
  --bg1: #f4f2ec;
  --ink: #0f172a;      /* slate-900 */
  --muted: #5b6472;    /* slate-ish */
  --stroke: rgba(15,23,42,.10);
  --stroke2: rgba(15,23,42,.14);

  --card: rgba(255,255,255,.78);
  --glass: rgba(255,255,255,.70);

  --bronze: #b08d57;
  --bronze2: #c7a26a;
  --bronzeSoft: rgba(176,141,87,.18);

  --shadow: 0 18px 50px rgba(15,23,42,.14);
  --shadow2: 0 10px 28px rgba(15,23,42,.10);

  --r: 20px;
}

*{ box-sizing:border-box; }
html,body{ height:100%; overflow-x:hidden; }
body{
  margin:0;
  color: var(--ink);
  background: linear-gradient(180deg, var(--bg0), var(--bg1));
  font-family: Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial;
}

img{ max-width:100%; height:auto; display:block; }

.container{
  width: min(1120px, calc(100% - 40px));
  margin: 0 auto;
}

/* Ambient */
.bg-ambient{
  position: fixed;
  inset: 0;
  z-index: -1;
  overflow:hidden;
  background:
    radial-gradient(1200px 900px at 14% 8%, rgba(176,141,87,.18), transparent 60%),
    radial-gradient(900px 700px at 85% 16%, rgba(56,189,248,.10), transparent 62%),
    radial-gradient(900px 700px at 62% 90%, rgba(16,185,129,.08), transparent 65%),
    linear-gradient(180deg, var(--bg0), var(--bg1));
}

/* Elegant "stone grain" (no data-URI → no hydration mismatch) */
.grain{
  position:absolute;
  inset:0;
  opacity:.10;
  pointer-events:none;
  background:
    repeating-radial-gradient(circle at 20% 30%, rgba(15,23,42,.09) 0 1px, transparent 1px 7px),
    repeating-radial-gradient(circle at 70% 40%, rgba(15,23,42,.06) 0 1px, transparent 1px 9px);
  mix-blend-mode: multiply;
}

.orb{
  position:absolute;
  width: 520px;
  height: 520px;
  filter: blur(34px);
  opacity: .55;
  border-radius: 999px;
}
.orb-a{ left:-180px; top: -220px; background: radial-gradient(circle at 30% 30%, rgba(176,141,87,.55), rgba(176,141,87,0) 62%); }
.orb-b{ right:-220px; top: -220px; background: radial-gradient(circle at 40% 40%, rgba(59,130,246,.25), rgba(59,130,246,0) 60%); }

/* Topbar glass */
.topbar{
  position: sticky;
  top: 0;
  z-index: 30;
  backdrop-filter: blur(16px);
  background: rgba(251,250,247,.72);
  border-bottom: 1px solid var(--stroke);
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
  max-width: 360px;
}
.brand-sub{ font-size: 12px; color: var(--muted); }

/* Desktop nav */
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
  background: rgba(176,141,87,.16);
  box-shadow: inset 0 0 0 1px rgba(176,141,87,.18);
}

/* Actions */
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
  box-shadow: 0 10px 22px rgba(15,23,42,.06);
}
.icon-btn:hover{ background: rgba(255,255,255,.86); }
.icon{ font-size: 16px; }
.icon-btn-label{ font-size: 12px; color: #111827; }

.segmented{
  display:flex;
  border: 1px solid var(--stroke);
  border-radius: 999px;
  overflow:hidden;
  background: rgba(255,255,255,.62);
  box-shadow: 0 10px 22px rgba(15,23,42,.06);
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

.hamburger{
  display:inline-flex;
  align-items:center;
  justify-content:center;
  width: 42px;
  height: 42px;
  border-radius: 999px;
  border: 1px solid var(--stroke);
  background: rgba(255,255,255,.62);
  box-shadow: 0 10px 22px rgba(15,23,42,.06);
  cursor:pointer;
}
.hamburger:hover{ background: rgba(255,255,255,.86); }

/* Main */
.main{ padding: 26px 0 86px; }

/* Hero */
.hero{
  display:grid;
  grid-template-columns: 1.15fr .85fr;
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

/* Pill */
.pill{
  display:inline-flex;
  align-items:center;
  gap:10px;
  padding: 10px 12px;
  border-radius: 999px;
  border: 1px solid rgba(176,141,87,.20);
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
  font-size: clamp(34px, 4.6vw, 58px);
  margin: 14px 0 0;
  letter-spacing: -0.03em;
  line-height: 1.02;
}
.lead{
  margin: 14px 0 0;
  color: var(--muted);
  font-size: 16px;
  line-height: 1.65;
  max-width: 60ch;
}

/* Buttons */
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
  border-color: rgba(176,141,87,.20);
}
.btn.ghost:hover{ border-color: rgba(176,141,87,.40); }
.btn-arrow{ opacity:.9; }

/* Stats */
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

/* Hero card */
.hero-card{
  border-radius: 26px;
  overflow:hidden;
  border: 1px solid rgba(176,141,87,.18);
  background: rgba(255,255,255,.72);
  box-shadow: var(--shadow);
}
.hero-media{ position:relative; height: 250px; }
@media (max-width: 820px){
  .hero-media{ height: 220px; }
}
.hero-img{ width:100%; height:100%; object-fit:cover; display:block; }
.hero-overlay{
  position:absolute; inset:0;
  background:
    linear-gradient(to bottom, rgba(0,0,0,.08), rgba(0,0,0,.42)),
    radial-gradient(800px 400px at 20% 20%, rgba(176,141,87,.25), transparent 55%);
}
.hero-card-body{ padding: 14px; }

.hero-mini{ display:flex; flex-direction:column; gap:4px; }
.mini-title{ font-size: 12px; font-weight: 760; color:white; margin-top: -72px; position:relative; }
.mini-sub{ font-size: 12px; color: rgba(255,255,255,.80); position:relative; }

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
.quick-t{ font-size: 12px; font-weight: 760; }
.quick-d{ font-size: 12px; color: var(--muted); margin-top: 2px; }

/* Sections */
.section{ margin-top: 34px; }
.section-head{ margin-bottom: 14px; }
.h2{
  margin:0;
  font-family: Fraunces, ui-serif, Georgia, serif;
  font-size: 22px;
  letter-spacing: -0.02em;
}
.muted{ margin: 8px 0 0; color: var(--muted); line-height: 1.6; }

/* Grid + cards (fix mobile overlap!) */
.grid{
  display:grid;
  grid-template-columns: repeat(12, minmax(0,1fr));
  gap: 12px;
}

/* menu cards */
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
  box-shadow: 0 20px 44px rgba(15,23,42,.12);
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
.menu-title{ font-size: 13px; font-weight: 820; letter-spacing: -.01em; }
.menu-desc{ margin-top: 4px; font-size: 12px; color: var(--muted); line-height: 1.55; }
.menu-go{ font-size: 18px; color: rgba(17,24,39,.75); }

/* ✅ cards in lists */
.grid.cards > *{ grid-column: span 6; }
@media (max-width: 820px){
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
  border-radius: 24px;
  overflow:hidden;
  border: 1px solid rgba(176,141,87,.18);
  background: rgba(255,255,255,.82);
  box-shadow: 0 20px 52px rgba(15,23,42,.12);
}
.feature-media{ height: 210px; }
@media (max-width: 820px){
  .feature-media{ height: 170px; }
}
.feature-img{ width:100%; height:100%; object-fit:cover; display:block; }
.feature-body{ padding: 14px; }
.feature-top{
  display:flex; align-items:center; justify-content:space-between; gap:10px;
}
.feature-title{
  font-weight: 860;
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
.feature-text{ margin-top: 8px; color: #111827; font-size: 13px; line-height: 1.6; }
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
  border-radius: 22px;
  border: 1px solid rgba(176,141,87,.16);
  background: rgba(255,255,255,.80);
  padding: 14px;
  box-shadow: 0 16px 34px rgba(15,23,42,.08);
}
.card-title-row{
  display:flex; align-items:center; justify-content:space-between; gap:10px;
}
.card-title{ font-weight: 860; font-size: 14px; letter-spacing: -.01em; }
.card-sub{ margin-top: 6px; color: var(--muted); font-size: 12px; }
.card-text{ margin-top: 10px; color:#111827; font-size: 13px; line-height: 1.7; }

.note{
  margin-top: 12px;
  border-radius: 16px;
  padding: 10px;
  background: rgba(176,141,87,.10);
  border: 1px solid rgba(176,141,87,.18);
  color: var(--muted);
  font-size: 12px;
  line-height: 1.6;
}

.list{
  margin: 10px 0 0;
  padding-left: 18px;
  color:#111827;
  font-size: 13px;
  line-height: 1.75;
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

/* Modal + Drawer shared */
.backdrop{
  position: fixed;
  inset: 0;
  background: rgba(15,23,42,.44);
  display:flex;
  align-items:center;
  justify-content:center;
  padding: 18px;
  z-index: 60;
}

.modal{
  width: min(740px, 100%);
  border-radius: 26px;
  border: 1px solid rgba(255,255,255,.22);
  background: rgba(255,255,255,.92);
  box-shadow: 0 34px 90px rgba(15,23,42,.30);
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
.modal-title{ font-family: Fraunces, ui-serif, Georgia, serif; font-weight: 700; letter-spacing: -.02em; }
.modal-sub{ margin-top: 4px; font-size: 12px; color: var(--muted); }

.icon-close{
  border: 1px solid var(--stroke);
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
  border-radius: 18px;
  border: 1px solid rgba(176,141,87,.16);
  background: rgba(255,255,255,.85);
  padding: 12px;
}
.event-title{ font-weight: 860; font-size: 13px; }
.event-loc{ margin-top: 4px; color: var(--muted); font-size: 12px; }
.event-desc{ margin-top: 8px; font-size: 13px; line-height: 1.7; color:#111827; }
.empty{ color: var(--muted); font-size: 13px; padding: 14px 0; }

.modal-foot{
  display:flex;
  justify-content:flex-end;
  gap: 10px;
  padding: 12px 16px 16px;
  border-top: 1px solid var(--stroke);
}

/* Mobile drawer */
.drawer{
  width: min(420px, 100%);
  margin-left: auto;
  height: 100%;
  border-left: 1px solid rgba(255,255,255,.18);
  background: rgba(251,250,247,.92);
  backdrop-filter: blur(18px);
  padding: 14px;
  box-shadow: -24px 0 70px rgba(15,23,42,.28);
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
          href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,600;9..144,700&family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <style dangerouslySetInnerHTML={{ __html: GLOBAL_CSS }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
