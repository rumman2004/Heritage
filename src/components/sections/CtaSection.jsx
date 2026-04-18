import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useNavigate } from 'react-router-dom'; // <-- Imported React Router hook
import Button from '../ui/Button';
import FloatingLeaf from '../3d/FloatingLeaf';

gsap.registerPlugin(ScrollTrigger);

export default function CtaSection() {
  const sectionRef = useRef(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1300);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (loading) return;
    const ctx = gsap.context(() => {
      gsap.fromTo('.cta-content > *',
        { y: 35, opacity: 0 },
        {
          y: 0, opacity: 1,
          duration: 1.1,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 72%',
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
        background: 'var(--col-obsidian)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        borderTop: '1px solid var(--col-border)',
      }}
    >
      {/* Ambient leaves */}
      <FloatingLeaf count={14} opacity={0.1} />

      {/* Central radial glow */}
      <div style={{
        position: 'absolute',
        top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '70vw', height: '70vw',
        maxWidth: '800px', maxHeight: '800px',
        background: 'radial-gradient(circle, rgba(79,104,32,0.12) 0%, transparent 65%)',
        pointerEvents: 'none',
        filter: 'blur(60px)',
      }} />

      {/* Decorative rings */}
      <div style={{
        position: 'absolute',
        top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '40vw', height: '40vw',
        maxWidth: '500px', maxHeight: '500px',
        borderRadius: '50%',
        border: '1px solid rgba(122,158,56,0.06)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute',
        top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '55vw', height: '55vw',
        maxWidth: '700px', maxHeight: '700px',
        borderRadius: '50%',
        border: '1px solid rgba(122,158,56,0.04)',
        pointerEvents: 'none',
      }} />

      <div
        className="cta-content"
        style={{
          position: 'relative',
          zIndex: 10,
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '2.5rem',
          maxWidth: '42rem',
        }}
      >
        {loading ? (
          <CtaSkeleton />
        ) : (
          <>
            {/* Eyebrow */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ width: '3rem', height: '1px', background: 'linear-gradient(to right, transparent, var(--col-sage))' }} />
              <span style={{
                fontFamily: 'var(--font-ui)',
                fontSize: '0.6rem',
                fontWeight: 400,
                letterSpacing: '0.35em',
                textTransform: 'uppercase',
                color: 'var(--col-sage)',
              }}>
                Heritage Estate
              </span>
              <div style={{ width: '3rem', height: '1px', background: 'linear-gradient(to left, transparent, var(--col-sage))' }} />
            </div>

            {/* Headline */}
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.2rem, 5vw, 5rem)',
              fontWeight: 300,
              lineHeight: 1,
              letterSpacing: '-0.01em',
              color: 'var(--col-white)',
            }}>
              Experience the Estate
            </h2>

            {/* Sub */}
            <p style={{
              fontFamily: 'var(--font-ui)',
              fontSize: 'clamp(0.9rem, 1.2vw, 1.1rem)',
              fontWeight: 300,
              lineHeight: 1.75,
              color: 'var(--col-mist)',
            }}>
              From the alluvial soils of Brahmaputra to your cup.
              A heritage of single-estate excellence, now available worldwide.
            </p>

            {/* CTA buttons */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
              <Button onClick={() => navigate('/collection')} variant="primary">Shop Collection</Button>
              <Button onClick={() => navigate('/contact')} variant="glass">Contact the Farm</Button>
            </div>

            {/* Trust marks */}
            <div
              style={{
                display: 'flex',
                gap: '2.5rem',
                flexWrap: 'wrap',
                justifyContent: 'center',
                paddingTop: '1rem',
                borderTop: '1px solid var(--col-border)',
                width: '100%',
              }}
            >
              {['Est. 1892', 'Single Estate', 'TGFOP1 Grade', 'Direct Trade'].map((mark) => (
                <span
                  key={mark}
                  style={{
                    fontFamily: 'var(--font-ui)',
                    fontSize: '0.58rem',
                    fontWeight: 400,
                    letterSpacing: '0.22em',
                    textTransform: 'uppercase',
                    color: 'var(--col-shadow)',
                  }}
                >
                  {mark}
                </span>
              ))}
            </div>
          </>
        )}
      </div>

      <style>{`
        @keyframes pulse-shimmer {
          0%   { opacity: 0.2; }
          50%  { opacity: 0.6; }
          100% { opacity: 0.2; }
        }
        .skeleton-pulse { animation: pulse-shimmer 2s cubic-bezier(0.4,0,0.6,1) infinite; }
      `}</style>
    </section>
  );
}

/* ─── CTA Skeleton ──────────────────────────────────────────────────────────── */
function CtaSkeleton() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2.5rem', width: '100%' }}>
      {/* Eyebrow */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <div className="skeleton-pulse" style={{ width: '3rem', height: '1px', background: 'rgba(122,158,56,0.25)' }} />
        <div className="skeleton-pulse" style={{ width: '8rem', height: '0.7rem', borderRadius: '4px', background: 'rgba(255,255,255,0.07)' }} />
        <div className="skeleton-pulse" style={{ width: '3rem', height: '1px', background: 'rgba(122,158,56,0.25)' }} />
      </div>
      {/* Headline */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem', width: '100%' }}>
        <div className="skeleton-pulse" style={{ width: '70%', height: '3.5rem', borderRadius: '6px', background: 'rgba(255,255,255,0.08)' }} />
        <div className="skeleton-pulse" style={{ width: '50%', height: '3.5rem', borderRadius: '6px', background: 'rgba(255,255,255,0.05)' }} />
      </div>
      {/* Body text */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', width: '100%' }}>
        <div className="skeleton-pulse" style={{ width: '80%', height: '1rem', borderRadius: '4px', background: 'rgba(255,255,255,0.05)' }} />
        <div className="skeleton-pulse" style={{ width: '65%', height: '1rem', borderRadius: '4px', background: 'rgba(255,255,255,0.04)' }} />
      </div>
      {/* Buttons */}
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
        <div className="skeleton-pulse" style={{ width: '140px', height: '2.75rem', borderRadius: '9999px', background: 'rgba(122,158,56,0.15)' }} />
        <div className="skeleton-pulse" style={{ width: '140px', height: '2.75rem', borderRadius: '9999px', background: 'rgba(255,255,255,0.05)' }} />
      </div>
      {/* Trust marks */}
      <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', justifyContent: 'center', paddingTop: '1rem', borderTop: '1px solid var(--col-border)', width: '100%' }}>
        {[80, 90, 100, 75].map((w, i) => (
          <div key={i} className="skeleton-pulse" style={{ width: `${w}px`, height: '0.6rem', borderRadius: '4px', background: 'rgba(255,255,255,0.04)' }} />
        ))}
      </div>
    </div>
  );
}