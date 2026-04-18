import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import GlassCard from '../ui/GlassCard';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { label: 'Elevation',        value: '95m',      unit: 'Above Sea Level',    offset: false },
  { label: 'Annual Rainfall',  value: '3,000',     unit: 'mm · Monsoon Cycle', offset: true  },
  { label: 'Soil Profile',     value: 'Alluvial',  unit: 'Rich Loam Deposit',  offset: false },
  { label: 'Signature Flush',  value: '2nd Flush', unit: 'Peak Summer Pluck',  offset: true  },
];

export default function OriginStory() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {

      gsap.fromTo('.origin-text > *',
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1,
          duration: 1.1,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.origin-text',
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo('.origin-card',
        { y: 50, opacity: 0, scale: 0.97 },
        {
          y: 0, opacity: 1, scale: 1,
          duration: 1,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.origin-grid',
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );

    }, sectionRef.current);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '100vh',
        padding: 'var(--space-section) clamp(1.5rem, 6vw, 5rem)',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Background image + layered overlays */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <img
          src="/tea-garden-sun.jpg"
          alt="Sunlit Sivasagar Tea Estate"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        {/* Gradient: strong left, fading right */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(100deg, rgba(5,5,5,0.97) 0%, rgba(5,5,5,0.82) 45%, rgba(5,5,5,0.35) 100%)',
        }} />
        {/* Noise grain overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          opacity: 0.03,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '128px',
        }} />
      </div>

      <div
        style={{
          position: 'relative',
          zIndex: 10,
          maxWidth: '80rem',
          margin: '0 auto',
          width: '100%',
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '4rem',
          alignItems: 'center',
        }}
        className="lg:grid-cols-2-custom"
      >
        {/* Narrative column */}
        <div
          className="origin-text"
          style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}
        >
          {/* Section tag */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ width: '2rem', height: '1px', background: 'var(--col-sage)' }} />
            <span
              style={{
                fontFamily: 'var(--font-ui)',
                fontSize: '0.6rem',
                fontWeight: 400,
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
                color: 'var(--col-sage)',
              }}
            >
              The Terroir
            </span>
          </div>

          {/* Headline */}
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.5rem, 5vw, 5.5rem)',
              fontWeight: 300,
              lineHeight: 0.95,
              letterSpacing: '-0.01em',
              color: 'var(--col-white)',
            }}
          >
            The Brahmaputra
            <br />
            <em style={{ color: 'rgba(255,255,255,0.4)', fontStyle: 'italic', fontWeight: 300 }}>
              Microclimate
            </em>
          </h2>

          {/* Body */}
          <p
            style={{
              fontFamily: 'var(--font-ui)',
              fontSize: 'clamp(0.95rem, 1.2vw, 1.15rem)',
              fontWeight: 300,
              lineHeight: 1.8,
              color: 'var(--col-mist)',
              maxWidth: '42ch',
            }}
          >
            Our estates thrive in an environment of extreme humidity and heavy monsoons.
            This natural greenhouse effect forces the tea bushes to produce leaves with
            exceptionally dense, malty flavor compounds — cultivated in the rich alluvial
            soils deposited by the Brahmaputra River, yielding a profoundly bold character
            that cannot be replicated anywhere else on earth.
          </p>

          {/* Coordinates pill */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.6rem',
              padding: '0.5rem 1rem',
              borderRadius: '9999px',
              border: '1px solid rgba(255,255,255,0.08)',
              background: 'rgba(255,255,255,0.03)',
              backdropFilter: 'blur(16px)',
              alignSelf: 'flex-start',
            }}
          >
            <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: 'var(--col-sage)', display: 'inline-block' }} />
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.6rem',
                color: 'var(--col-stone)',
                letterSpacing: '0.12em',
              }}
            >
              26.9914° N, 94.7378° E
            </span>
          </div>
        </div>

        {/* Stats grid */}
        <div
          className="origin-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '1rem',
            alignItems: 'start',
          }}
        >
          {stats.map(({ label, value, unit, offset }) => (
            <GlassCard
              key={label}
              title={label}
              accent
              className="origin-card"
              style={{ marginTop: offset ? '2rem' : 0 }}
            >
              <p
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(1.8rem, 3vw, 2.8rem)',
                  fontWeight: 300,
                  color: 'var(--col-sage)',
                  lineHeight: 1,
                  letterSpacing: '-0.01em',
                }}
              >
                {value}
              </p>
              <p
                style={{
                  fontFamily: 'var(--font-ui)',
                  fontSize: '0.6rem',
                  fontWeight: 400,
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: 'var(--col-stone)',
                  marginTop: '0.75rem',
                }}
              >
                {unit}
              </p>
            </GlassCard>
          ))}
        </div>
      </div>

      <style>{`
        @media (min-width: 1024px) { .lg\\:grid-cols-2-custom { grid-template-columns: 1fr 1fr; } }
        @keyframes pulse-shimmer { 0% { opacity: 0.2; } 50% { opacity: 0.6; } 100% { opacity: 0.2; } }
        .skeleton-pulse { animation: pulse-shimmer 2s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
      `}</style>
    </section>
  );
}

function OriginCardSkeleton() {
  return (
    <GlassCard>
       <div className="skeleton-pulse" style={{ height: '2.5rem', width: '60%', background: 'rgba(255,255,255,0.08)', borderRadius: '4px', marginBottom: '0.75rem' }} />
       <div className="skeleton-pulse" style={{ height: '0.6rem', width: '40%', background: 'rgba(255,255,255,0.05)', borderRadius: '2px' }} />
    </GlassCard>
  );
}