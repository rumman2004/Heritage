import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const temps = [
  {
    label: 'Optimal Extraction',
    temp: '95°',
    unit: 'C+',
    name: 'The Rolling Boil',
    badge: { text: 'Recommended', color: 'var(--col-sage)' },
    steepTime: '3–5 Min',
    quote: 'The intense heat vigorously agitates the leaves, releasing the bold, brisk malty flavor profile that defines our heritage estate. Dense amber liquor that stands up beautifully to milk.',
    span: 'lg-span-2',
    accent: 'var(--col-sage)',
    accentBg: 'rgba(122,158,56,0.06)',
    textColor: 'var(--col-sage)',
    badgeTextColor: 'var(--col-dew)',
    badgeBg: 'rgba(122,158,56,0.1)',
    badgeBorder: 'rgba(122,158,56,0.25)',
  },
  {
    label: 'Sub-Optimal',
    temp: '85°',
    unit: 'C',
    name: 'Reduced Extraction',
    badge: { text: 'Acceptable', color: '#d4894a' },
    steepTime: '4–6 Min',
    quote: 'Acceptable for delicate teas, but fails to release the heavier, complex malty tannins that define a true Assam character.',
    accent: '#d4894a',
    accentBg: 'rgba(212,137,74,0.05)',
    textColor: '#d4894a',
    badgeTextColor: '#d4894a',
    badgeBg: 'rgba(212,137,74,0.08)',
    badgeBorder: 'rgba(212,137,74,0.2)',
  },
  {
    label: 'Under-Extracted',
    temp: '70°',
    unit: 'C',
    name: 'Cold Steep',
    badge: { text: 'Not Recommended', color: '#6b8fc9' },
    steepTime: 'N/A',
    quote: 'Too cool. Fails to penetrate the cellular structure of the leaf, resulting in a weak, flat cup with a pale, insipid liquor.',
    accent: '#6b8fc9',
    accentBg: 'rgba(107,143,201,0.05)',
    textColor: '#6b8fc9',
    badgeTextColor: '#6b8fc9',
    badgeBg: 'rgba(107,143,201,0.08)',
    badgeBorder: 'rgba(107,143,201,0.2)',
  },
];

function BrewCard({ item, large = false }) {
  const cardRef = useRef(null);

  return (
    <div
      ref={cardRef}
      style={{
        gridColumn: large ? 'span 2' : 'span 1',
        padding: large ? 'clamp(2rem, 3.5vw, 3.5rem)' : 'clamp(1.5rem, 2.5vw, 2.5rem)',
        borderRadius: 'var(--r-xl)',
        background: item.accentBg,
        border: '1px solid var(--col-border)',
        backdropFilter: 'blur(24px)',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        gap: large ? '2rem' : '1.5rem',
        transition: 'border-color 0.4s ease, box-shadow 0.4s ease',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = `${item.accent}40`;
        e.currentTarget.style.boxShadow = `0 0 40px -10px ${item.accent}30`;
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'var(--col-border)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      {/* Top sheen */}
      <div style={{
        position: 'absolute', top: 0, left: '15%', right: '15%', height: '1px',
        background: `linear-gradient(90deg, transparent, ${item.accent}30, transparent)`,
      }} />

      {/* Corner accent */}
      <div style={{
        position: 'absolute', top: 0, left: 0,
        width: '3px', height: '60%',
        background: `linear-gradient(to bottom, ${item.accent}, transparent)`,
        borderRadius: '3px 0 0 0',
      }} />

      {/* Header row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <p style={{
            fontFamily: 'var(--font-ui)',
            fontSize: '0.58rem',
            fontWeight: 400,
            letterSpacing: '0.28em',
            textTransform: 'uppercase',
            color: 'var(--col-stone)',
            marginBottom: '0.6rem',
          }}>
            {item.label}
          </p>
          <h3 style={{
            fontFamily: 'var(--font-display)',
            fontSize: large ? 'clamp(1.5rem, 2.5vw, 2.2rem)' : 'clamp(1.25rem, 2vw, 1.8rem)',
            fontWeight: 300,
            color: 'var(--col-white)',
            lineHeight: 1.1,
          }}>
            {item.name}
          </h3>
        </div>

        {/* Temperature */}
        <div style={{ textAlign: 'right' }}>
          <span style={{
            fontFamily: 'var(--font-display)',
            fontSize: large ? 'clamp(3rem, 6vw, 6rem)' : 'clamp(2rem, 4vw, 3.5rem)',
            fontWeight: 300,
            color: item.textColor,
            lineHeight: 1,
            textShadow: `0 0 30px ${item.accent}50`,
            letterSpacing: '-0.02em',
          }}>
            {item.temp}
          </span>
          <span style={{
            fontFamily: 'var(--font-display)',
            fontSize: large ? '1.8rem' : '1.2rem',
            color: 'var(--col-stone)',
            fontWeight: 300,
          }}>
            {item.unit}
          </span>
        </div>
      </div>

      {/* Quote */}
      <p style={{
        fontFamily: 'var(--font-ui)',
        fontSize: large ? 'clamp(0.95rem, 1.2vw, 1.1rem)' : '0.9rem',
        fontWeight: 300,
        lineHeight: 1.75,
        color: 'var(--col-mist)',
        flex: 1,
      }}>
        {item.quote}
      </p>

      {/* Footer row */}
      <div style={{
        paddingTop: '1.25rem',
        borderTop: '1px solid var(--col-border)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '0.5rem',
      }}>
        <span style={{
          fontFamily: 'var(--font-ui)',
          fontSize: '0.57rem',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: 'var(--col-stone)',
        }}>
          Steep Time
        </span>
        <span style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.65rem',
          color: item.textColor,
          padding: '0.3rem 0.9rem',
          borderRadius: '9999px',
          background: item.badgeBg,
          border: `1px solid ${item.badgeBorder}`,
          letterSpacing: '0.08em',
        }}>
          {item.steepTime}
        </span>
      </div>
    </div>
  );
}

export default function BrewingGuide() {
  const sectionRef = useRef(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1400);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (loading) return;
    const ctx = gsap.context(() => {
      gsap.fromTo('.brew-card',
        { y: 40, opacity: 0, scale: 0.97 },
        {
          y: 0, opacity: 1, scale: 1,
          duration: 1,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.brew-grid',
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef.current);
    return () => ctx.revert();
  }, [loading]);

  return (
    <section
      ref={sectionRef}
      style={{
        position: 'relative',
        width: '100%',
        padding: 'var(--space-section) clamp(1.5rem, 5vw, 4rem)',
        background: 'var(--col-void)',
        overflow: 'hidden',
      }}
    >
      {/* Central glow */}
      <div style={{
        position: 'absolute',
        top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '60vw', height: '60vw',
        maxWidth: '900px', maxHeight: '900px',
        background: 'radial-gradient(circle, rgba(61,80,22,0.12) 0%, transparent 65%)',
        pointerEvents: 'none',
        filter: 'blur(40px)',
      }} />

      <div style={{ maxWidth: '72rem', margin: '0 auto', position: 'relative', zIndex: 1 }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 'clamp(3.5rem, 7vw, 7rem)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
            <div style={{ width: '3rem', height: '1px', background: 'linear-gradient(to right, transparent, var(--col-sage))' }} />
            <span style={{
              fontFamily: 'var(--font-ui)',
              fontSize: '0.6rem',
              fontWeight: 400,
              letterSpacing: '0.32em',
              textTransform: 'uppercase',
              color: 'var(--col-sage)',
            }}>
              Thermal Matrix
            </span>
            <div style={{ width: '3rem', height: '1px', background: 'linear-gradient(to left, transparent, var(--col-sage))' }} />
          </div>

          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2.5rem, 5.5vw, 6rem)',
            fontWeight: 300,
            lineHeight: 0.95,
            letterSpacing: '-0.01em',
            color: 'var(--col-white)',
            marginBottom: '1.5rem',
          }}>
            The Science
            <br />
            <em style={{ color: 'rgba(255,255,255,0.3)', fontStyle: 'italic' }}>of Steep</em>
          </h2>

          <p style={{
            fontFamily: 'var(--font-ui)',
            fontSize: 'clamp(0.9rem, 1.2vw, 1.1rem)',
            fontWeight: 300,
            lineHeight: 1.75,
            color: 'var(--col-mist)',
            maxWidth: '52ch',
            margin: '0 auto',
          }}>
            Water temperature fundamentally alters the chemical extraction process.
            Here is the exact thermal matrix required to unlock a true Assam liquor.
          </p>
        </div>

        {/* Bento grid */}
        <div
          className="brew-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gridTemplateRows: 'auto auto',
            gap: '1rem',
          }}
        >
          {loading ? (
            <>
              <div className="brew-card" style={{ gridColumn: '1 / -1' }}>
                <BrewCardSkeleton large />
              </div>
              <div className="brew-card"><BrewCardSkeleton /></div>
              <div className="brew-card"><BrewCardSkeleton /></div>
            </>
          ) : (
            <>
              {/* Large card (spans 2 cols on first row) */}
              <div className="brew-card" style={{ gridColumn: '1 / -1' }}>
                <BrewCard item={temps[0]} large />
              </div>
              {/* Two smaller cards */}
              {temps.slice(1).map((item) => (
                <div className="brew-card" key={item.label}>
                  <BrewCard item={item} />
                </div>
              ))}
            </>
          )}
        </div>

      </div>

      <style>{`
        @media (max-width: 640px) { .brew-grid { grid-template-columns: 1fr !important; } }
        @keyframes pulse-shimmer { 0% { opacity: 0.2; } 50% { opacity: 0.6; } 100% { opacity: 0.2; } }
        .skeleton-pulse { animation: pulse-shimmer 2s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
      `}</style>
    </section>
  );
}

// Reusable Skeleton Component for the Brew Cards
function BrewCardSkeleton({ large = false }) {
  return (
    <div style={{
      padding: large ? 'clamp(2rem, 3.5vw, 3.5rem)' : 'clamp(1.5rem, 2.5vw, 2.5rem)',
      borderRadius: 'var(--r-xl)',
      background: 'rgba(255,255,255,0.02)',
      border: '1px solid rgba(255,255,255,0.05)',
      backdropFilter: 'blur(24px)',
      display: 'flex', flexDirection: 'column',
      justifyContent: 'space-between',
      gap: large ? '2rem' : '1.5rem',
      minHeight: large ? '340px' : '300px'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ width: '60%' }}>
          <div className="skeleton-pulse" style={{ height: '0.6rem', width: '40%', background: 'rgba(255,255,255,0.08)', borderRadius: '4px', marginBottom: '1rem' }} />
          <div className="skeleton-pulse" style={{ height: '2rem', width: '80%', background: 'rgba(255,255,255,0.08)', borderRadius: '4px' }} />
        </div>
        <div className="skeleton-pulse" style={{ height: '3.5rem', width: '25%', background: 'rgba(255,255,255,0.05)', borderRadius: '8px' }} />
      </div>
      <div className="skeleton-pulse" style={{ height: '4rem', width: '100%', background: 'rgba(255,255,255,0.03)', borderRadius: '4px' }} />
      <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '1.25rem' }}>
         <div className="skeleton-pulse" style={{ height: '1rem', width: '25%', background: 'rgba(255,255,255,0.05)', borderRadius: '4px' }} />
         <div className="skeleton-pulse" style={{ height: '1.5rem', width: '30%', background: 'rgba(255,255,255,0.08)', borderRadius: '9999px' }} />
      </div>
    </div>
  );
}