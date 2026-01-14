const GLOBAL_CSS = `
:root{
  --card: rgba(255,255,255,.78);
  --stroke: rgba(15,23,42,.10);
  --stroke2: rgba(15,23,42,.14);
  --text: #0b1020;
  --muted:#4b5563;
  --shadow: 0 18px 50px rgba(0,0,0,.18);
  --shadow2: 0 10px 28px rgba(0,0,0,.12);
}

*{ box-sizing:border-box; }
html,body{ height:100%; }
body{ margin:0; color:var(--text); background:#f6f7fb; font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial; }

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
}
.orb-a{ left:-120px; top: -160px; background: radial-gradient(circle at 30% 30%, rgba(99,102,241,.55), rgba(99,102,241,0) 62%); }
.orb-b{ right:-140px; top: -120px; background: radial-gradient(circle at 40% 40%, rgba(56,189,248,.55), rgba(56,189,248,0) 60%); }

/* Grain sem data-uri (evita mismatch) */
.grain{
  position:absolute;
  inset:0;
  opacity:.10;
  pointer-events:none;
  background:
    repeating-radial-gradient(circle at 20% 30%, rgba(0,0,0,.08) 0 1px, transparent 1px 6px),
    repeating-radial-gradient(circle at 70% 40%, rgba(0,0,0,.06) 0 1px, transparent 1px 7px);
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

.badge{
  font-size: 11px;
  padding: 6px 10px;
  border-radius: 999px;
  background: rgba(17,24,39,.92);
  color:white;
}

.list{
  margin: 10px 0 0;
  padding-left: 18px;
  color:#111827;
  font-size: 13px;
  line-height: 1.7;
}

.mapbox{
  margin-top: 12px;
  border-radius: 16px;
  overflow:hidden;
  border: 1px solid var(--stroke);
  background: rgba(255,255,255,.9);
}
.map{ width:100%; height: 220px; border:0; display:block; }

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

export const metadata = {
  title: "Rota dos Castros do Noroeste de Portugal",
  description: "Companheiro de viagem digital da Rota dos Castros",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt">
      <head>
        <style dangerouslySetInnerHTML={{ __html: GLOBAL_CSS }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
