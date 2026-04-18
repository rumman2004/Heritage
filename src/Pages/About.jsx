import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import FloatingLeaf from '../components/3d/FloatingLeaf';

gsap.registerPlugin(ScrollTrigger);

const milestones = [
  { year: '1892', label: 'Estate Founded', desc: 'Our first tea bushes were planted in the rich alluvial plains of Sivasagar by the Barua family.' },
  { year: '1923', label: 'First Export',    desc: 'Heritage Estate teas crossed the Indian Ocean for the first time, arriving in London\'s finest tea houses.' },
  { year: '1967', label: 'TGFOP Recognition', desc: 'The estate\'s second-flush harvest received the prestigious TGFOP1 grade for the first time.' },
  { year: '2004', label: 'Modern Precision', desc: 'Introduction of precision climate controls in our oxidation chambers, perfecting the 2–4 hour window.' },
  { year: '2024', label: 'Direct Trade',   desc: 'We cut out every intermediary. Every tin now ships directly from our estate to your door.' },
];

const values = [
  { icon: '◈', title: 'Single Origin',    body: 'Every batch is traceable to a single plot on our estate. No blending. No compromise.' },
  { icon: '◇', title: 'Hand Plucked',     body: 'Two leaves and a bud, selected before 8 AM. The human hand remains irreplaceable in quality.' },
  { icon: '○', title: 'Direct Trade',     body: 'We have no distributors. The price you pay goes to the people who grow your tea.' },
  { icon: '△', title: 'Living Soil',      body: 'Zero synthetic inputs. Our bushes thrive in the same alluvial soil they have known for 130 years.' },
];

export default function About() {
  const pageRef     = useRef(null);
  const timelineRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {

      // Hero stagger
      gsap.fromTo('.about-hero > *',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.1, stagger: 0.14, ease: 'power3.out', delay: 0.1 }
      );

      // Values cards
      gsap.fromTo('.value-card',
        { y: 50, opacity: 0, scale: 0.97 },
        {
          y: 0, opacity: 1, scale: 1, duration: 1, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: '.values-grid', start: 'top 78%', toggleActions: 'play none none reverse' },
        }
      );

      // Timeline items
      gsap.fromTo('.timeline-item',
        { x: -30, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 0.9, stagger: 0.12, ease: 'power3.out',
          scrollTrigger: { trigger: '.timeline-wrap', start: 'top 78%', toggleActions: 'play none none reverse' },
        }
      );

    }, pageRef.current);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={pageRef} className="page-enter" style={{ background: 'var(--col-void)', color: 'var(--col-white)', minHeight: '100vh' }}>

      {/* ─── Hero ───────────────────────────────────────────────────────── */}
      <section style={{
        position: 'relative',
        minHeight: '70vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '10rem clamp(1.5rem, 5vw, 4rem) 6rem',
        overflow: 'hidden',
      }}>
        <FloatingLeaf count={10} opacity={0.1} />

        {/* Radial glow */}
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '60vw', height: '60vw', maxWidth: '800px',
          background: 'radial-gradient(circle, rgba(61,80,22,0.15) 0%, transparent 65%)',
          filter: 'blur(60px)', pointerEvents: 'none',
        }} />

        <div className="about-hero" style={{ textAlign: 'center', maxWidth: '52rem', position: 'relative', zIndex: 1 }}>

          {/* Eyebrow */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', marginBottom: '2rem' }}>
            <div style={{ width: '2.5rem', height: '1px', background: 'linear-gradient(to right, transparent, var(--col-sage))' }} />
            <span style={{ fontFamily: 'var(--font-ui)', fontSize: '0.6rem', fontWeight: 400, letterSpacing: '0.32em', textTransform: 'uppercase', color: 'var(--col-sage)' }}>
              Est. Sivasagar, 1892
            </span>
            <div style={{ width: '2.5rem', height: '1px', background: 'linear-gradient(to left, transparent, var(--col-sage))' }} />
          </div>

          {/* Headline */}
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(3rem, 7vw, 7rem)',
            fontWeight: 300,
            lineHeight: 0.92,
            letterSpacing: '-0.01em',
            color: 'var(--col-white)',
            marginBottom: '2rem',
          }}>
            Our Roots
            <br />
            <em style={{ color: 'rgba(255,255,255,0.3)', fontStyle: 'italic' }}>Run Deep</em>
          </h1>

          {/* Body */}
          <p style={{
            fontFamily: 'var(--font-ui)',
            fontSize: 'clamp(1rem, 1.3vw, 1.15rem)',
            fontWeight: 300,
            lineHeight: 1.8,
            color: 'var(--col-mist)',
          }}>
            A story four generations in the making. The raw natural beauty of the Brahmaputra
            valley meets uncompromising modern precision — yielding teas that taste of their
            exact origin and nowhere else.
          </p>
        </div>
      </section>

      {/* ─── Values ─────────────────────────────────────────────────────── */}
      <section style={{ padding: 'var(--space-section) clamp(1.5rem, 5vw, 4rem)', background: 'var(--col-obsidian)' }}>
        <div style={{ maxWidth: '72rem', margin: '0 auto' }}>

          <SectionTag label="What We Stand For" />
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 4rem)', fontWeight: 300, lineHeight: 1, color: 'var(--col-white)', marginBottom: 'clamp(3rem, 6vw, 5rem)', marginTop: '1.5rem', letterSpacing: '-0.01em' }}>
            The Four Pillars
          </h2>

          <div
            className="values-grid"
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}
          >
            {values.map(({ icon, title, body }) => (
              <div
                key={title}
                className="value-card"
                style={{
                  padding: 'clamp(1.75rem, 2.5vw, 2.5rem)',
                  borderRadius: 'var(--r-lg)',
                  border: '1px solid var(--col-border)',
                  background: 'rgba(255,255,255,0.02)',
                  backdropFilter: 'blur(20px)',
                  transition: 'border-color 0.4s ease, background 0.4s ease, transform 0.4s cubic-bezier(0.16,1,0.3,1)',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'rgba(122,158,56,0.25)';
                  e.currentTarget.style.background = 'rgba(122,158,56,0.04)';
                  e.currentTarget.style.transform = 'translateY(-4px)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'var(--col-border)';
                  e.currentTarget.style.background = 'rgba(255,255,255,0.02)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '1.1rem', color: 'var(--col-sage)', display: 'block', marginBottom: '1.25rem', opacity: 0.7 }}>
                  {icon}
                </span>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 400, color: 'var(--col-white)', marginBottom: '0.75rem', letterSpacing: '0.02em' }}>
                  {title}
                </h3>
                <p style={{ fontFamily: 'var(--font-ui)', fontSize: '0.9rem', fontWeight: 300, lineHeight: 1.75, color: 'var(--col-mist)' }}>
                  {body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Timeline ───────────────────────────────────────────────────── */}
      <section style={{ padding: 'var(--space-section) clamp(1.5rem, 5vw, 4rem)', background: 'var(--col-void)' }}>
        <div style={{ maxWidth: '56rem', margin: '0 auto' }}>

          <SectionTag label="130 Years of Heritage" />
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 4rem)', fontWeight: 300, lineHeight: 1, color: 'var(--col-white)', marginBottom: 'clamp(3rem, 6vw, 5rem)', marginTop: '1.5rem', letterSpacing: '-0.01em' }}>
            Key Moments
          </h2>

          <div ref={timelineRef} className="timeline-wrap" style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {milestones.map(({ year, label, desc }, i) => (
              <div
                key={year}
                className="timeline-item"
                style={{
                  display: 'grid',
                  gridTemplateColumns: '5rem 1px 1fr',
                  gap: '0 2rem',
                  paddingBottom: i < milestones.length - 1 ? '3rem' : 0,
                }}
              >
                {/* Year */}
                <div style={{ textAlign: 'right', paddingTop: '0.15rem' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--col-sage)', letterSpacing: '0.08em' }}>
                    {year}
                  </span>
                </div>

                {/* Line + dot */}
                <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--col-obsidian)', border: '1.5px solid var(--col-sage)', boxShadow: '0 0 8px rgba(122,158,56,0.4)', flexShrink: 0, marginTop: '3px' }} />
                  {i < milestones.length - 1 && (
                    <div style={{ flex: 1, width: '1px', background: 'linear-gradient(to bottom, rgba(122,158,56,0.3), rgba(122,158,56,0.05))', marginTop: '0.5rem' }} />
                  )}
                </div>

                {/* Content */}
                <div style={{ paddingBottom: i < milestones.length - 1 ? '0.5rem' : 0 }}>
                  <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 400, color: 'var(--col-white)', marginBottom: '0.5rem' }}>
                    {label}
                  </h4>
                  <p style={{ fontFamily: 'var(--font-ui)', fontSize: '0.88rem', fontWeight: 300, lineHeight: 1.75, color: 'var(--col-mist)' }}>
                    {desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Closing quote ──────────────────────────────────────────────── */}
      <section style={{
        padding: 'var(--space-section) clamp(1.5rem, 5vw, 4rem)',
        background: 'var(--col-obsidian)',
        borderTop: '1px solid var(--col-border)',
        textAlign: 'center',
      }}>
        <blockquote style={{ maxWidth: '42rem', margin: '0 auto' }}>
          <p style={{
            fontFamily: 'var(--font-display)',
            fontStyle: 'italic',
            fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
            fontWeight: 300,
            lineHeight: 1.4,
            color: 'rgba(255,255,255,0.55)',
            marginBottom: '2rem',
          }}>
            "We do not grow tea for the market. We grow tea for the cup."
          </p>
          <cite style={{ fontFamily: 'var(--font-ui)', fontSize: '0.6rem', letterSpacing: '0.28em', textTransform: 'uppercase', color: 'var(--col-stone)', fontStyle: 'normal' }}>
            — The Barua Family, Est. 1892
          </cite>
        </blockquote>
      </section>

    </div>
  );
}

function SectionTag({ label }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
      <div style={{ width: '2rem', height: '1px', background: 'var(--col-sage)' }} />
      <span style={{ fontFamily: 'var(--font-ui)', fontSize: '0.6rem', fontWeight: 400, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--col-sage)' }}>
        {label}
      </span>
    </div>
  );
}