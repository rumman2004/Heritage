import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import FloatingLeaf from '../3d/FloatingLeaf';
import TeaCard from '../ui/TeaCard';
import { teas, comingSoonTeas } from '../../data/teaCatalogue';

gsap.registerPlugin(ScrollTrigger);

const FILTERS = [
  { key: 'all',       label: 'All Teas'     },
  { key: 'available', label: 'Available'    },
  { key: 'soon',      label: 'Coming Soon'  },
];

export default function ProductReveal() {
  const sectionRef = useRef(null);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true); // Added loading state

  const visible = filter === 'all'
    ? teas
    : teas.filter(t => t.status === filter);

  // Simulate network request: Trigger loading on mount AND on filter change
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1200); // Skeletons will show for 1.2 seconds
    return () => clearTimeout(timer);
  }, [filter]);

  // GSAP: Static Elements (Headers & Banners)
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.pr-header > *',
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1.2, stagger: 0.12, ease: 'power3.out',
          scrollTrigger: { trigger: '.pr-header', start: 'top 78%', toggleActions: 'play none none reverse' },
        }
      );

      gsap.fromTo('.pr-banner > *',
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1, stagger: 0.13, ease: 'power3.out',
          scrollTrigger: { trigger: '.pr-banner', start: 'top 82%', toggleActions: 'play none none reverse' },
        }
      );
    }, sectionRef.current);
    return () => ctx.revert();
  }, []);

  // GSAP: Dynamic Grid Elements (Skeletons & Real Cards)
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.tea-card-anim',
        { y: 30, opacity: 0, scale: 0.98 },
        {
          y: 0, opacity: 1, scale: 1, duration: 0.8, stagger: 0.08, ease: 'power3.out',
          scrollTrigger: { trigger: '.pr-grid', start: 'top 85%', toggleActions: 'play none none reverse' },
        }
      );
    }, sectionRef.current);
    return () => ctx.revert();
  }, [loading]); // Re-runs animation whenever loading state switches

  return (
    <section
      ref={sectionRef}
      style={{
        position:   'relative',
        width:      '100%',
        background: 'var(--col-obsidian)',
        padding:    'var(--space-section) clamp(1.5rem, 5vw, 4rem)',
        overflow:   'hidden',
      }}
    >
      <FloatingLeaf count={10} opacity={0.08} />

      {/* Ambient glow */}
      <div style={{
        position: 'absolute', top: '25%', left: '50%',
        transform: 'translate(-50%,-50%)',
        width: '80vw', height: '55vw', maxWidth: '1000px',
        background: 'radial-gradient(ellipse, rgba(61,80,22,0.1) 0%, transparent 65%)',
        filter: 'blur(70px)', pointerEvents: 'none', zIndex: 0,
      }} />

      <div style={{ maxWidth: '84rem', margin: '0 auto', position: 'relative', zIndex: 1 }}>

        {/* ─── Header ──────────────────────────────────────────────────── */}
        <div className="pr-header" style={{ marginBottom: 'clamp(3rem, 6vw, 5.5rem)' }}>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.75rem' }}>
            <div style={{ width: '2.5rem', height: '1px', background: 'linear-gradient(to right, transparent, var(--col-sage))' }} />
            <span style={{ fontFamily: 'var(--font-ui)', fontSize: '0.6rem', fontWeight: 400, letterSpacing: '0.32em', textTransform: 'uppercase', color: 'var(--col-sage)' }}>
              The Estate Collection
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '2rem' }}>
            <h2 style={{
              fontFamily:    'var(--font-display)',
              fontSize:      'clamp(2.5rem, 6vw, 6.5rem)',
              fontWeight:    300,
              lineHeight:    0.92,
              letterSpacing: '-0.02em',
              color:         'var(--col-white)',
            }}>
              Six Expressions
              <br />
              <em style={{ color: 'rgba(255,255,255,0.28)', fontStyle: 'italic' }}>One Estate</em>
            </h2>

            {/* Filter pills */}
            <div style={{ display: 'flex', gap: '0.5rem', flexShrink: 0, flexWrap: 'wrap' }}>
              {FILTERS.map(f => (
                <FilterPill
                  key={f.key}
                  label={f.label}
                  active={filter === f.key}
                  onClick={() => setFilter(f.key)}
                />
              ))}
            </div>
          </div>

          <div style={{ height: '1px', background: 'linear-gradient(90deg, var(--col-border-hi), transparent)', marginTop: '2.5rem' }} />
        </div>

        {/* ─── Grid (Skeleton vs Actual Data) ──────────────────────────── */}
        <div
          className="pr-grid"
          style={{
            display:             'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
            gap:                 '1rem',
            marginBottom:        'clamp(4rem, 8vw, 7rem)',
            minHeight:           '400px', // Prevents layout jump when empty
          }}
        >
          {loading ? (
            // Render 3 skeleton cards while loading
            Array.from({ length: 3 }).map((_, i) => (
              <TeaCardSkeleton key={`skeleton-${i}`} />
            ))
          ) : (
            // Render actual tea cards once loaded
            visible.map(tea => (
              <div key={tea.id} className="tea-card-anim">
                <TeaCard tea={tea} />
              </div>
            ))
          )}
        </div>

        {/* ─── Launching Soon Banner ────────────────────────────────────── */}
        <div
          className="pr-banner"
          style={{
            position:      'relative',
            borderRadius:  'var(--r-xl)',
            border:        '1px solid var(--col-border)',
            background:    'rgba(255,255,255,0.02)',
            backdropFilter: 'blur(24px)',
            padding:       'clamp(2.5rem, 4vw, 4rem) clamp(2rem, 4vw, 4rem)',
            display:       'flex',
            flexDirection: 'column',
            alignItems:    'center',
            textAlign:     'center',
            gap:           '1.75rem',
            overflow:      'hidden',
          }}
        >
          <div style={{
            position: 'absolute', top: '50%', left: '50%',
            transform: 'translate(-50%,-50%)',
            width: '60%', height: '120%',
            background: 'radial-gradient(ellipse, rgba(61,80,22,0.1) 0%, transparent 65%)',
            pointerEvents: 'none',
          }} />
          <div style={{ position: 'absolute', top: 0, left: '15%', right: '15%', height: '1px', background: 'linear-gradient(90deg, transparent, rgba(122,158,56,0.3), transparent)' }} />

          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'center', position: 'relative', zIndex: 1 }}>
            {comingSoonTeas.map(t => (
              <span key={t.id} style={{
                fontFamily: 'var(--font-ui)', fontSize: '0.55rem', fontWeight: 400,
                letterSpacing: '0.18em', textTransform: 'uppercase',
                color: t.hue, padding: '0.28rem 0.8rem', borderRadius: '9999px',
                border: `1px solid ${t.hue}30`, background: `${t.hue}0a`,
              }}>
                {t.name}
              </span>
            ))}
          </div>

          <div style={{ position: 'relative', zIndex: 1 }}>
            <p style={{ fontFamily: 'var(--font-ui)', fontSize: '0.6rem', fontWeight: 400, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--col-sage)', marginBottom: '1rem' }}>
              Launching This Season
            </p>
            <h3 style={{
              fontFamily: 'var(--font-display)',
              fontSize:   'clamp(1.8rem, 4vw, 3.5rem)',
              fontWeight: 300, lineHeight: 1,
              letterSpacing: '-0.01em', color: 'var(--col-white)',
            }}>
              Three New Expressions
              <br />
              <em style={{ color: 'rgba(255,255,255,0.3)', fontStyle: 'italic' }}>Are On Their Way</em>
            </h3>
          </div>

          <p style={{
            fontFamily: 'var(--font-ui)', fontSize: 'clamp(0.88rem,1.1vw,1rem)',
            fontWeight: 300, lineHeight: 1.75,
            color: 'var(--col-mist)', maxWidth: '46ch',
            position: 'relative', zIndex: 1,
          }}>
            Bamboo Tea, Dark Tea, and our Herbal Valley Blend are in their final
            curing and quality-control phase. Join the early-access list and be
            the first to know when they are ready to ship.
          </p>

          <EmailCapture />

          <p style={{ fontFamily: 'var(--font-ui)', fontSize: '0.54rem', letterSpacing: '0.16em', color: 'var(--col-shadow)', position: 'relative', zIndex: 1 }}>
            No spam. One email when they launch. Unsubscribe anytime.
          </p>
        </div>

      </div>

      {/* Global styles for the skeleton pulse animation */}
      <style>{`
        @keyframes pulse-shimmer {
          0%   { opacity: 0.2; }
          50%  { opacity: 0.6; }
          100% { opacity: 0.2; }
        }
        .skeleton-pulse {
          animation: pulse-shimmer 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>

    </section>
  );
}

/* ─── Skeleton Component ────────────────────────────────────────────────────── */
function TeaCardSkeleton() {
  return (
    <div className="tea-card-anim" style={{
      borderRadius:   'var(--r-lg)',
      border:         '1px solid rgba(255,255,255,0.05)',
      background:     'rgba(255,255,255,0.02)',
      backdropFilter: 'blur(10px)',
      padding:        '1.5rem',
      display:        'flex',
      flexDirection:  'column',
      gap:            '1rem',
      height:         '420px', 
    }}>
      {/* Image Placeholder */}
      <div className="skeleton-pulse" style={{ height: '55%', width: '100%', borderRadius: '8px', background: 'rgba(255,255,255,0.08)' }} />
      
      {/* Title & Subtitle Placeholders */}
      <div className="skeleton-pulse" style={{ height: '1.75rem', width: '65%', borderRadius: '4px', background: 'rgba(255,255,255,0.08)', marginTop: '0.5rem' }} />
      <div className="skeleton-pulse" style={{ height: '1rem', width: '40%', borderRadius: '4px', background: 'rgba(255,255,255,0.05)' }} />
      
      {/* Footer Tags Placeholders */}
      <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div className="skeleton-pulse" style={{ height: '1rem', width: '30%', borderRadius: '4px', background: 'rgba(255,255,255,0.05)' }} />
        <div className="skeleton-pulse" style={{ height: '2rem', width: '2rem', borderRadius: '50%', background: 'rgba(255,255,255,0.08)' }} />
      </div>
    </div>
  );
}

/* ─── Existing Sub-components ───────────────────────────────────────────────── */
function FilterPill({ label, active, onClick }) {
  const [hov, setHov] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        fontFamily:    'var(--font-ui)',
        fontSize:      '0.58rem', fontWeight: 400,
        letterSpacing: '0.2em', textTransform: 'uppercase',
        padding:       '0.45rem 1rem', borderRadius: '9999px',
        border:        active || hov ? '1px solid rgba(122,158,56,0.4)' : '1px solid rgba(255,255,255,0.08)',
        background:    active ? 'rgba(122,158,56,0.12)' : hov ? 'rgba(122,158,56,0.06)' : 'transparent',
        color:         active ? 'var(--col-sage)' : hov ? 'var(--col-sage)' : 'var(--col-stone)',
        transition:    'all 0.3s ease',
        cursor:        'pointer',
      }}
    >
      {label}
    </button>
  );
}

function EmailCapture() {
  const [focused, setFocused] = useState(false);
  const [sent, setSent] = useState(false);

  if (sent) return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', position: 'relative', zIndex: 1 }}>
      <span style={{ width: '20px', height: '20px', borderRadius: '50%', border: '1px solid var(--col-sage)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.65rem', color: 'var(--col-sage)' }}>✓</span>
      <span style={{ fontFamily: 'var(--font-ui)', fontSize: '0.7rem', color: 'var(--col-mist)', letterSpacing: '0.1em' }}>You're on the list.</span>
    </div>
  );

  return (
    <div style={{
      display: 'flex', gap: 0,
      width: '100%', maxWidth: '420px',
      borderRadius: '9999px',
      border: `1px solid ${focused ? 'rgba(122,158,56,0.4)' : 'var(--col-border-hi)'}`,
      background: 'rgba(255,255,255,0.03)',
      backdropFilter: 'blur(16px)',
      overflow: 'hidden',
      transition: 'border-color 0.3s ease',
      position: 'relative', zIndex: 1,
    }}>
      <input
        type="email"
        placeholder="your@email.com"
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          flex: 1, background: 'transparent', border: 'none', outline: 'none',
          padding: '0.85rem 1.4rem',
          fontFamily: 'var(--font-ui)', fontSize: '0.8rem', fontWeight: 300,
          color: 'var(--col-white)', letterSpacing: '0.04em',
        }}
      />
      <button
        onClick={() => setSent(true)}
        style={{
          fontFamily: 'var(--font-ui)', fontSize: '0.6rem', fontWeight: 400,
          letterSpacing: '0.2em', textTransform: 'uppercase',
          color: 'var(--col-white)',
          background: 'linear-gradient(135deg, var(--col-fern), var(--col-sage))',
          border: 'none', padding: '0.85rem 1.5rem',
          cursor: 'pointer', flexShrink: 0,
          borderRadius: '0 9999px 9999px 0',
          transition: 'opacity 0.3s ease',
        }}
        onMouseEnter={e => e.target.style.opacity = '0.85'}
        onMouseLeave={e => e.target.style.opacity = '1'}
      >
        Notify Me
      </button>
    </div>
  );
}