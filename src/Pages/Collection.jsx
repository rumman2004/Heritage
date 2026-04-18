import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import toast, { Toaster } from 'react-hot-toast';
import FloatingLeaf from '../components/3d/FloatingLeaf';
import TeaCard from '../components/ui/TeaCard';
import { teas, comingSoonTeas } from '../data/teaCatalogue';

gsap.registerPlugin(ScrollTrigger);

/* ─── Filter config ────────────────────────────────────────────────────────── */
const FILTERS = [
  { key: 'all',       label: 'All Teas'    },
  { key: 'available', label: 'Available'   },
  { key: 'soon',      label: 'Coming Soon' },
];

/* ─── Custom toast styles ──────────────────────────────────────────────────── */
const toastStyle = {
  background:    '#111111',
  color:         '#f8f8f6',
  border:        '1px solid rgba(122,158,56,0.35)',
  borderRadius:  '12px',
  fontFamily:    'var(--font-ui)',
  fontSize:      '0.78rem',
  fontWeight:    300,
  letterSpacing: '0.05em',
  padding:       '0.85rem 1.25rem',
  boxShadow:     '0 8px 40px rgba(0,0,0,0.5)',
  backdropFilter: 'blur(20px)',
  maxWidth:      '340px',
};

/* ─── Stats data ───────────────────────────────────────────────────────────── */
const STATS = [
  { n: '6',    label: 'Expressions'      },
  { n: '3',    label: 'Available Now'    },
  { n: '130+', label: 'Years of Heritage'},
];

/* ════════════════════════════════════════════════════════════════════════════ */
export default function Collection() {
  const pageRef     = useRef(null);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  const visible = filter === 'all'
    ? teas
    : teas.filter(t => t.status === filter);

  /* ── Simulate loading on mount and filter change ── */
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, [filter]);

  /* ── GSAP entrance animations ── */
  useEffect(() => {
    const ctx = gsap.context(() => {

      gsap.fromTo('.col-hero > *',
        { y: 44, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.13, ease: 'power3.out', delay: 0.1 }
      );

      gsap.fromTo('.col-stats > *',
        { y: 20, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: '.col-stats', start: 'top 88%', toggleActions: 'play none none reverse' },
        }
      );

      gsap.fromTo('.col-banner > *',
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1, stagger: 0.12, ease: 'power3.out',
          scrollTrigger: { trigger: '.col-banner', start: 'top 84%', toggleActions: 'play none none reverse' },
        }
      );

    }, pageRef.current);
    return () => ctx.revert();
  }, []);

  /* ── GSAP re-animate grid whenever loading state changes ── */
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.tea-card-anim',
        { y: 48, opacity: 0, scale: 0.97 },
        {
          y: 0, opacity: 1, scale: 1, duration: 0.85, stagger: 0.08, ease: 'power3.out',
          scrollTrigger: { trigger: '.col-grid', start: 'top 82%', toggleActions: 'play none none reverse' },
        }
      );
    }, pageRef.current);
    return () => ctx.revert();
  }, [loading]);

  return (
    <>
      {/* ── Toast portal ── */}
      <Toaster
        position="bottom-center"
        gutter={12}
        containerStyle={{ bottom: '2rem' }}
        toastOptions={{ style: toastStyle, duration: 4000 }}
      />

      <div
        ref={pageRef}
        className="page-enter"
        style={{ background: 'var(--col-void)', color: 'var(--col-white)', minHeight: '100vh' }}
      >

        {/* ══ HERO ══════════════════════════════════════════════════════ */}
        <section style={{
          position: 'relative',
          minHeight: 'clamp(50vh, 60vh, 70vh)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: 'clamp(7rem, 14vw, 11rem) clamp(1.25rem, 5vw, 4rem) clamp(3rem, 6vw, 5rem)',
          overflow: 'hidden',
        }}>
          <FloatingLeaf count={9} opacity={0.09} />

          {/* Ambient glow */}
          <div style={{
            position: 'absolute', top: '50%', left: '50%',
            transform: 'translate(-50%,-50%)',
            width: 'clamp(300px, 55vw, 700px)',
            height: 'clamp(300px, 55vw, 700px)',
            background: 'radial-gradient(circle, rgba(61,80,22,0.15) 0%, transparent 65%)',
            filter: 'blur(70px)', pointerEvents: 'none',
          }} />

          <div
            className="col-hero"
            style={{ textAlign: 'center', maxWidth: '50rem', position: 'relative', zIndex: 1, width: '100%' }}
          >
            {/* Eyebrow */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', marginBottom: '1.75rem' }}>
              <div style={{ width: '2rem', height: '1px', background: 'linear-gradient(to right, transparent, var(--col-sage))' }} />
              <span style={{ fontFamily: 'var(--font-ui)', fontSize: '0.58rem', fontWeight: 400, letterSpacing: '0.32em', textTransform: 'uppercase', color: 'var(--col-sage)' }}>
                Seasonal Harvests · Sivasagar Estate
              </span>
              <div style={{ width: '2rem', height: '1px', background: 'linear-gradient(to left, transparent, var(--col-sage))' }} />
            </div>

            {/* Headline */}
            <h1 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.8rem, 7.5vw, 7.5rem)',
              fontWeight: 300, lineHeight: 0.9,
              letterSpacing: '-0.02em',
              color: 'var(--col-white)',
              marginBottom: '1.75rem',
            }}>
              The Collection
            </h1>

            {/* Body */}
            <p style={{
              fontFamily: 'var(--font-ui)',
              fontSize: 'clamp(0.9rem, 1.2vw, 1.1rem)',
              fontWeight: 300, lineHeight: 1.8,
              color: 'var(--col-mist)',
              maxWidth: '42ch', margin: '0 auto',
            }}>
              Six distinct expressions of a single estate. Each harvest a conversation
              between weather, soil, and the human hand.
            </p>

            {/* Stats strip */}
            <div
              className="col-stats"
              style={{
                display: 'flex', justifyContent: 'center',
                gap: 'clamp(1.5rem, 5vw, 4rem)',
                marginTop: '3rem', flexWrap: 'wrap',
              }}
            >
              {STATS.map(({ n, label }) => (
                <div key={label} style={{ textAlign: 'center' }}>
                  <p style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(1.4rem, 3vw, 2.5rem)',
                    fontWeight: 300, color: 'var(--col-sage)',
                    lineHeight: 1, letterSpacing: '-0.01em',
                  }}>
                    {n}
                  </p>
                  <p style={{
                    fontFamily: 'var(--font-ui)', fontSize: '0.54rem',
                    fontWeight: 400, letterSpacing: '0.24em',
                    textTransform: 'uppercase', color: 'var(--col-stone)',
                    marginTop: '0.4rem',
                  }}>
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ GRID SECTION ══════════════════════════════════════════════ */}
        <section style={{ padding: '0 clamp(1.25rem, 5vw, 4rem)', background: 'var(--col-void)' }}>
          <div style={{ maxWidth: '84rem', margin: '0 auto' }}>

            {/* Filter bar */}
            <div style={{
              display: 'flex', alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap', gap: '0.75rem',
              padding: '1.25rem 0',
              borderTop:    '1px solid var(--col-border)',
              borderBottom: '1px solid var(--col-border)',
              marginBottom: 'clamp(1.5rem, 3vw, 2rem)',
            }}>
              {/* Count */}
              <span style={{
                fontFamily: 'var(--font-ui)', fontSize: '0.56rem',
                letterSpacing: '0.2em', textTransform: 'uppercase',
                color: 'var(--col-stone)',
              }}>
                {visible.length} {visible.length === 1 ? 'Tea' : 'Teas'}
              </span>

              {/* Pills */}
              <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
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

            {/* Cards grid */}
            <div
              className="col-grid"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 270px), 1fr))',
                gap: 'clamp(0.75rem, 1.5vw, 1rem)',
                paddingBottom: 'var(--space-section)',
                minHeight: '400px',
              }}
            >
              {loading
                ? Array.from({ length: 3 }).map((_, i) => (
                    <TeaCardSkeleton key={`skeleton-${i}`} />
                  ))
                : visible.map(tea => (
                    <div key={tea.id} className="tea-card-anim">
                      <TeaCard tea={tea} />
                    </div>
                  ))
              }
            </div>
          </div>
        </section>

        {/* ══ COMING SOON BANNER ════════════════════════════════════════ */}
        {(filter === 'all' || filter === 'soon') && (
          <section style={{
            padding: '0 clamp(1.25rem, 5vw, 4rem) var(--space-section)',
            background: 'var(--col-void)',
          }}>
            <div style={{ maxWidth: '84rem', margin: '0 auto' }}>
              <div
                className="col-banner"
                style={{
                  position: 'relative',
                  borderRadius: 'var(--r-xl)',
                  border: '1px solid var(--col-border)',
                  background: 'rgba(255,255,255,0.018)',
                  backdropFilter: 'blur(24px)',
                  padding: 'clamp(2rem, 4vw, 4rem) clamp(1.5rem, 4vw, 4rem)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  gap: 'clamp(1.25rem, 2.5vw, 1.75rem)',
                  overflow: 'hidden',
                }}
              >
                {/* Decorations */}
                <div style={{ position: 'absolute', top: 0, left: '15%', right: '15%', height: '1px', background: 'linear-gradient(90deg, transparent, rgba(122,158,56,0.3), transparent)' }} />
                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '60%', height: '130%', background: 'radial-gradient(ellipse, rgba(61,80,22,0.1) 0%, transparent 65%)', pointerEvents: 'none' }} />

                {/* Tea chips */}
                <div style={{ display: 'flex', gap: '0.45rem', flexWrap: 'wrap', justifyContent: 'center', position: 'relative', zIndex: 1 }}>
                  {comingSoonTeas.map(t => (
                    <span key={t.id} style={{
                      fontFamily: 'var(--font-ui)', fontSize: '0.54rem',
                      letterSpacing: '0.18em', textTransform: 'uppercase',
                      color: t.hue, padding: '0.26rem 0.75rem',
                      borderRadius: '9999px',
                      border: `1px solid ${t.hue}30`,
                      background: `${t.hue}0a`,
                    }}>
                      {t.name}
                    </span>
                  ))}
                </div>

                {/* Headline */}
                <div style={{ position: 'relative', zIndex: 1 }}>
                  <p style={{
                    fontFamily: 'var(--font-ui)', fontSize: '0.58rem',
                    letterSpacing: '0.3em', textTransform: 'uppercase',
                    color: 'var(--col-sage)', marginBottom: '1rem',
                  }}>
                    Launching This Season
                  </p>
                  <h2 style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(1.6rem, 4vw, 3.5rem)',
                    fontWeight: 300, lineHeight: 1.02,
                    letterSpacing: '-0.01em', color: 'var(--col-white)',
                  }}>
                    Three New Expressions
                    <br />
                    <em style={{ color: 'rgba(255,255,255,0.3)', fontStyle: 'italic' }}>
                      Are On Their Way
                    </em>
                  </h2>
                </div>

                {/* Body */}
                <p style={{
                  fontFamily: 'var(--font-ui)',
                  fontSize: 'clamp(0.86rem, 1.1vw, 1rem)',
                  fontWeight: 300, lineHeight: 1.78,
                  color: 'var(--col-mist)', maxWidth: '46ch',
                  position: 'relative', zIndex: 1,
                }}>
                  Bamboo Tea, Dark Tea, and our Herbal Valley Blend are in their final
                  curing and quality-control phase. Join the list and be the first to
                  know when they ship.
                </p>

                {/* Email capture with toast */}
                <EmailCapture />

                <p style={{
                  fontFamily: 'var(--font-ui)', fontSize: '0.52rem',
                  letterSpacing: '0.16em', color: 'var(--col-shadow)',
                  position: 'relative', zIndex: 1,
                }}>
                  No spam · One email when they launch · Unsubscribe anytime
                </p>
              </div>
            </div>
          </section>
        )}

      </div>

      {/* ── Responsive overrides ── */}
      <style>{`
        @media (max-width: 480px) {
          .col-grid {
            grid-template-columns: 1fr !important;
          }
        }
        @keyframes pulse-shimmer {
          0%   { opacity: 0.2; }
          50%  { opacity: 0.6; }
          100% { opacity: 0.2; }
        }
        .skeleton-pulse {
          animation: pulse-shimmer 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        @keyframes col-spin { to { transform: rotate(360deg); } }
      `}</style>
    </>
  );
}

/* ════ SUB-COMPONENTS ════════════════════════════════════════════════════════ */

/* ─── Tea card skeleton ─────────────────────────────────────────────────────── */
function TeaCardSkeleton() {
  return (
    <div
      className="tea-card-anim"
      style={{
        borderRadius:   'var(--r-lg)',
        border:         '1px solid rgba(255,255,255,0.05)',
        background:     'rgba(255,255,255,0.02)',
        backdropFilter: 'blur(10px)',
        padding:        '1.5rem',
        display:        'flex',
        flexDirection:  'column',
        gap:            '1rem',
        height:         '420px',
      }}
    >
      {/* Image placeholder */}
      <div className="skeleton-pulse" style={{ height: '55%', width: '100%', borderRadius: '8px', background: 'rgba(255,255,255,0.08)' }} />
      {/* Title */}
      <div className="skeleton-pulse" style={{ height: '1.75rem', width: '65%', borderRadius: '4px', background: 'rgba(255,255,255,0.08)', marginTop: '0.5rem' }} />
      {/* Subtitle */}
      <div className="skeleton-pulse" style={{ height: '1rem', width: '40%', borderRadius: '4px', background: 'rgba(255,255,255,0.05)' }} />
      {/* Footer */}
      <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div className="skeleton-pulse" style={{ height: '1rem', width: '30%', borderRadius: '4px', background: 'rgba(255,255,255,0.05)' }} />
        <div className="skeleton-pulse" style={{ height: '2rem', width: '2rem', borderRadius: '50%', background: 'rgba(255,255,255,0.08)' }} />
      </div>
    </div>
  );
}

/* ─── Filter pill ───────────────────────────────────────────────────────────── */
function FilterPill({ label, active, onClick }) {
  const [hov, setHov] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        fontFamily: 'var(--font-ui)', fontSize: '0.56rem', fontWeight: 400,
        letterSpacing: '0.2em', textTransform: 'uppercase',
        padding: '0.4rem 0.9rem', borderRadius: '9999px',
        border: active || hov
          ? '1px solid rgba(122,158,56,0.4)'
          : '1px solid rgba(255,255,255,0.08)',
        background: active
          ? 'rgba(122,158,56,0.12)'
          : hov ? 'rgba(122,158,56,0.06)' : 'transparent',
        color: active || hov ? 'var(--col-sage)' : 'var(--col-stone)',
        transition: 'all 0.3s ease',
        cursor: 'pointer',
        whiteSpace: 'nowrap',
      }}
    >
      {label}
    </button>
  );
}

/* ─── Email capture with react-hot-toast ──────────────────────────────────── */
function EmailCapture() {
  const [email,   setEmail]   = useState('');
  const [focused, setFocused] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    const trimmed = email.trim();

    // Basic email validation
    if (!trimmed) {
      toast.error('Please enter your email address.', {
        icon: '✉️',
      });
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      toast.error('That doesn\'t look like a valid email.', {
        icon: '⚠️',
      });
      return;
    }

    setLoading(true);

    // Simulate async (replace with your actual API call)
    setTimeout(() => {
      setLoading(false);
      setEmail('');
      toast.success(
        `You're on the list! We'll email ${trimmed} the moment they launch.`,
        {
          icon: '🍃',
          duration: 5000,
          style: {
            ...toastStyle,
            border: '1px solid rgba(122,158,56,0.5)',
          },
        }
      );
    }, 900);
  };

  const handleKey = (e) => {
    if (e.key === 'Enter') handleSubmit();
  };

  return (
    <div
      style={{
        display:      'flex',
        width:        '100%',
        maxWidth:     '420px',
        borderRadius: '9999px',
        border:       `1px solid ${focused ? 'rgba(122,158,56,0.45)' : 'rgba(255,255,255,0.12)'}`,
        background:   'rgba(255,255,255,0.03)',
        backdropFilter: 'blur(20px)',
        overflow:     'hidden',
        transition:   'border-color 0.3s ease, box-shadow 0.3s ease',
        boxShadow:    focused ? '0 0 0 3px rgba(122,158,56,0.08)' : 'none',
        position:     'relative', zIndex: 1,
      }}
    >
      <input
        type="email"
        value={email}
        placeholder="your@email.com"
        onChange={e => setEmail(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onKeyDown={handleKey}
        disabled={loading}
        style={{
          flex:       1,
          background: 'transparent',
          border:     'none',
          outline:    'none',
          padding:    '0.85rem 0 0.85rem 1.4rem',
          fontFamily: 'var(--font-ui)',
          fontSize:   '0.8rem',
          fontWeight: 300,
          color:      'var(--col-white)',
          letterSpacing: '0.04em',
          opacity:    loading ? 0.5 : 1,
          minWidth:   0, // prevents overflow on mobile
        }}
      />
      <button
        onClick={handleSubmit}
        disabled={loading}
        style={{
          fontFamily:    'var(--font-ui)',
          fontSize:      '0.58rem',
          fontWeight:    400,
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color:         'var(--col-white)',
          background:    loading
            ? 'rgba(122,158,56,0.5)'
            : 'linear-gradient(135deg, var(--col-fern), var(--col-sage))',
          border:        'none',
          padding:       '0.85rem clamp(1rem, 2.5vw, 1.5rem)',
          cursor:        loading ? 'not-allowed' : 'pointer',
          flexShrink:    0,
          borderRadius:  '0 9999px 9999px 0',
          transition:    'opacity 0.3s ease, background 0.3s ease',
          display:       'flex',
          alignItems:    'center',
          gap:           '0.4rem',
          whiteSpace:    'nowrap',
        }}
        onMouseEnter={e => { if (!loading) e.currentTarget.style.opacity = '0.82'; }}
        onMouseLeave={e => { e.currentTarget.style.opacity = '1'; }}
      >
        {loading ? (
          <>
            <LoadingSpinner />
            Joining…
          </>
        ) : (
          'Notify Me'
        )}
      </button>
    </div>
  );
}

/* ─── Tiny inline spinner ───────────────────────────────────────────────────── */
function LoadingSpinner() {
  return (
    <>
      <span style={{
        width:        '10px',
        height:       '10px',
        borderRadius: '50%',
        border:       '1.5px solid rgba(255,255,255,0.3)',
        borderTopColor: 'white',
        display:      'inline-block',
        animation:    'col-spin 0.7s linear infinite',
        flexShrink:   0,
      }} />
    </>
  );
}