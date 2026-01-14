'use client';

import { useState } from 'react';

export default function Home() {
  const [lang, setLang] = useState<'pt' | 'en'>('pt');

  const t = {
    title: {
      pt: 'Rota dos Castros do Noroeste de Portugal',
      en: 'Hillfort Route of Northwest Portugal',
    },
    tagline: {
      pt: 'Um companheiro de viagem para planear, explorar e viver o território castrejo.',
      en: 'A digital travel companion to plan, explore and experience hillfort culture.',
    },
  };

  const menu = [
    {
      id: 'castros',
      title: { pt: 'Castros a Visitar', en: 'Hillforts to Visit' },
      desc: {
        pt: 'Descrições, mapas, fotografias, tempos de visita e o que ver nas proximidades.',
        en: 'Descriptions, maps, photos, visit times and what to see nearby.',
      },
    },
    {
      id: 'itinerarios',
      title: { pt: 'Itinerários Sugeridos', en: 'Suggested Itineraries' },
      desc: {
        pt: 'Percursos para famílias, caminhantes, fins de semana e viagens longas.',
        en: 'Routes for families, hikers, weekend and multi-day trips.',
      },
    },
    {
      id: 'agenda',
      title: { pt: 'O Que Está a Acontecer', en: 'What’s On' },
      desc: {
        pt: 'Eventos, recriações históricas, festivais e atividades culturais.',
        en: 'Events, reenactments, festivals and cultural activities.',
      },
    },
    {
      id: 'parceiros',
      title: { pt: 'Onde Ficar e O Que Provar', en: 'Stay & Taste' },
      desc: {
        pt: 'Alojamentos, restauração, museus e agentes turísticos locais.',
        en: 'Accommodation, food, museums and local tourism partners.',
      },
    },
    {
      id: 'experiencias',
      title: { pt: 'Experiências Imersivas', en: 'Immersive Experiences' },
      desc: {
        pt: 'Realidade aumentada e conteúdos interativos para viajar no tempo.',
        en: 'Augmented reality and interactive content to travel in time.',
      },
    },
  ];

  return (
    <main>
      {/* HEADER */}
      <header
        style={{
          position: 'sticky',
          top: 0,
          background: 'white',
          borderBottom: '1px solid #ddd',
          padding: '12px 20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          zIndex: 10,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <img
            src="https://i.imgur.com/0XqsDrg.png"
            alt="Logo"
            style={{ width: 42, height: 42, borderRadius: 10 }}
          />
          <strong style={{ fontSize: 14, maxWidth: 260 }}>
            {t.title[lang]}
          </strong>
        </div>

        <div style={{ display: 'flex', gap: 10 }}>
          <button
            onClick={() => alert('Calendário interativo (MVP)')}
            style={btn}
          >
            📅
          </button>
          <button onClick={() => setLang('pt')} style={langBtn(lang === 'pt')}>
            PT
          </button>
          <button onClick={() => setLang('en')} style={langBtn(lang === 'en')}>
            EN
          </button>
        </div>
      </header>

      {/* HERO */}
      <section style={{ padding: '60px 20px', maxWidth: 1100, margin: 'auto' }}>
        <h1 style={{ fontSize: 42, marginBottom: 10 }}>{t.title[lang]}</h1>
        <p style={{ color: '#555', fontSize: 18, maxWidth: 700 }}>
          {t.tagline[lang]}
        </p>

        <img
          src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1400&q=60"
          style={{
            width: '100%',
            marginTop: 30,
            borderRadius: 20,
            maxHeight: 420,
            objectFit: 'cover',
          }}
        />
      </section>

      {/* MENU */}
      <section
        style={{
          padding: '20px',
          maxWidth: 1100,
          margin: 'auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))',
          gap: 20,
        }}
      >
        {menu.map((m) => (
          <div
            key={m.id}
            style={{
              background: 'white',
              borderRadius: 18,
              padding: 20,
              boxShadow: '0 5px 15px rgba(0,0,0,.06)',
              cursor: 'pointer',
            }}
            onClick={() => alert(`Abrir secção: ${m.title[lang]}`)}
          >
            <h3 style={{ marginBottom: 6 }}>{m.title[lang]}</h3>
            <p style={{ color: '#666', fontSize: 14 }}>{m.desc[lang]}</p>
          </div>
        ))}
      </section>

      {/* FOOTER */}
      <footer
        style={{
          marginTop: 80,
          padding: 30,
          textAlign: 'center',
          color: '#777',
        }}
      >
        © {new Date().getFullYear()} Rota dos Castros do Noroeste de Portugal
      </footer>
    </main>
  );
}

const btn: React.CSSProperties = {
  padding: '8px 10px',
  borderRadius: 10,
  border: '1px solid #ddd',
  background: '#fff',
  cursor: 'pointer',
};

const langBtn = (active: boolean): React.CSSProperties => ({
  ...btn,
  background: active ? '#111' : '#fff',
  color: active ? '#fff' : '#111',
});
