import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const processes = [
  {
    id: '01',
    title: 'Plucking',
    subtitle: 'Dawn Harvest',
    desc: 'Strict adherence to the two-leaves-and-a-bud standard. Hand-harvested before 8:00 AM to preserve essential volatile oils before the sun reaches its zenith.',
    detail: '4–6 AM · Daily',
    video: 'https://res.cloudinary.com/dtbytfxzs/video/upload/v1776461852/tea_farming_3_hr6nti.mp4',
  },
  {
    id: '02',
    title: 'Withering',
    subtitle: 'Moisture Reduction',
    desc: 'Spread evenly on specialized troughs for 14–16 hours. Moisture content is carefully reduced by 60%, rendering the cellular structure pliable for rolling.',
    detail: '14–16 Hours',
    video: 'https://res.cloudinary.com/dtbytfxzs/video/upload/v1776461846/tea_farming_2_gdyzzv.mp4',
  },
  {
    id: '03',
    title: 'Oxidation',
    subtitle: 'The Critical Phase',
    desc: 'Leaves rest in precisely humidified rooms for 2–4 hours, transforming from chlorophyll-rich green to a rich, copper-brown through enzymatic action.',
    detail: '2–4 Hours · 28°C',
    video: 'https://res.cloudinary.com/dtbytfxzs/video/upload/v1776461859/tea_farming_1_glhwzg.mp4',
  },
  {
    id: '04',
    title: 'Firing',
    subtitle: 'Flavor Lock',
    desc: 'Flash-dried in automated kilns at precisely 110°C to arrest oxidation at peak flavor complexity, locking in the dense, malty character unique to our estate.',
    detail: '110°C · 20 Min',
    video: null,
  },
];

export default function FarmingProcess() {
  const sectionRef = useRef(null);
  const lineRef    = useRef(null);
  const stepsRef   = useRef([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (loading) return;
    const ctx = gsap.context(() => {
      // Animated timeline line
      gsap.fromTo(lineRef.current,
        { scaleY: 0, transformOrigin: 'top' },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top center',
            end: 'bottom center',
            scrub: true,
          },
        }
      );

      stepsRef.current.forEach((step, i) => {
        if (!step) return;
        const isEven = i % 2 === 0;
        const blocks = step.querySelectorAll('.animate-block');

        gsap.fromTo(blocks,
          { opacity: 0, x: (idx) => idx === 0 ? (isEven ? 50 : -50) : (isEven ? -50 : 50) },
          {
            opacity: 1, x: 0,
            duration: 1.1,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: step,
              start: 'top 75%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
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
        overflow: 'hidden',
      }}
    >
      {/* Background texture */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.025,
        backgroundImage: `repeating-linear-gradient(0deg, var(--col-border) 0px, transparent 1px, transparent 80px)`,
      }} />

      <div style={{ maxWidth: '72rem', margin: '0 auto', position: 'relative', zIndex: 1 }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 'clamp(4rem, 8vw, 8rem)' }}>
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
              From Field to Cup
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
          }}>
            Precision in
            <br />
            <em style={{ color: 'rgba(255,255,255,0.3)', fontStyle: 'italic' }}>Every Leaf</em>
          </h2>
        </div>

        {/* Timeline */}
        <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

          {/* Track */}
          <div style={{
            position: 'absolute',
            top: 0, bottom: 0,
            left: '2rem',
            width: '1px',
            background: 'rgba(255,255,255,0.04)',
          }} />
          <div style={{ display: 'none' }} className="md-center-track" />

          {/* Animated glow line */}
          <div
            ref={lineRef}
            style={{
              position: 'absolute',
              top: 0, bottom: 0,
              left: '2rem',
              width: '1px',
              background: 'linear-gradient(to bottom, var(--col-moss), var(--col-sage) 60%, transparent)',
              boxShadow: '0 0 12px rgba(122,158,56,0.5)',
            }}
          />

          {loading
            ? Array.from({ length: 4 }).map((_, i) => (
                <ProcessStepSkeleton key={i} isLast={i === 3} />
              ))
            : processes.map((item, index) => {
            const isEven = index % 2 === 0;
            return (
              <div
                key={item.id}
                ref={el => stepsRef.current[index] = el}
                style={{
                  position: 'relative',
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  marginBottom: index < processes.length - 1 ? 'clamp(4rem, 8vw, 8rem)' : 0,
                  paddingLeft: '4.5rem',
                }}
                className="process-step"
              >
                {/* Timeline dot */}
                <div style={{
                  position: 'absolute',
                  left: '2rem',
                  top: '2.5rem',
                  transform: 'translateX(-50%)',
                  width: '14px',
                  height: '14px',
                  borderRadius: '50%',
                  background: 'var(--col-obsidian)',
                  border: '2px solid var(--col-sage)',
                  boxShadow: '0 0 12px rgba(122,158,56,0.5)',
                  zIndex: 5,
                }} />

                {/* Content row — alternates on md+ */}
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1.25rem',
                    width: '100%',
                  }}
                  className={`step-row step-row-${isEven ? 'even' : 'odd'}`}
                >
                  {/* Video */}
                  {item.video && (
                    <div
                      className="animate-block"
                      style={{
                        width: '100%',
                        maxWidth: '520px',
                        height: 'clamp(200px, 28vw, 300px)',
                        borderRadius: 'var(--r-lg)',
                        overflow: 'hidden',
                        border: '1px solid var(--col-border)',
                        position: 'relative',
                        background: 'rgba(0,0,0,0.5)',
                      }}
                    >
                      <video
                        src={item.video}
                        autoPlay loop muted playsInline
                        style={{
                          width: '100%', height: '100%',
                          objectFit: 'cover',
                          opacity: 0.7,
                          transition: 'opacity 0.5s ease',
                        }}
                        onMouseEnter={e => e.target.style.opacity = 1}
                        onMouseLeave={e => e.target.style.opacity = 0.7}
                      />
                      {/* Inner shadow vignette */}
                      <div style={{
                        position: 'absolute', inset: 0,
                        boxShadow: 'inset 0 0 50px rgba(10,10,10,0.7)',
                        pointerEvents: 'none',
                      }} />
                    </div>
                  )}

                  {/* Text card */}
                  <div
                    className="animate-block"
                    style={{
                      maxWidth: '460px',
                      padding: 'clamp(1.5rem, 2.5vw, 2.5rem)',
                      borderRadius: 'var(--r-lg)',
                      background: 'rgba(255,255,255,0.025)',
                      border: '1px solid var(--col-border)',
                      backdropFilter: 'blur(20px)',
                    }}
                  >
                    {/* Step number + title */}
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '1rem', marginBottom: '1rem' }}>
                      <span style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.65rem',
                        color: 'var(--col-shadow)',
                        letterSpacing: '0.12em',
                      }}>
                        {item.id}
                      </span>
                      <div style={{ height: '1px', width: '1.5rem', background: 'var(--col-border-hi)' }} />
                      <h4 style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: 'clamp(1.5rem, 2.5vw, 2.2rem)',
                        fontWeight: 400,
                        color: 'var(--col-white)',
                        letterSpacing: '0.02em',
                      }}>
                        {item.title}
                      </h4>
                    </div>

                    {/* Subtitle */}
                    <p style={{
                      fontFamily: 'var(--font-ui)',
                      fontSize: '0.6rem',
                      fontWeight: 400,
                      letterSpacing: '0.25em',
                      textTransform: 'uppercase',
                      color: 'var(--col-sage)',
                      marginBottom: '1rem',
                    }}>
                      {item.subtitle}
                    </p>

                    {/* Description */}
                    <p style={{
                      fontFamily: 'var(--font-ui)',
                      fontSize: 'clamp(0.9rem, 1.1vw, 1.05rem)',
                      fontWeight: 300,
                      lineHeight: 1.75,
                      color: 'var(--col-mist)',
                      marginBottom: '1.5rem',
                    }}>
                      {item.desc}
                    </p>

                    {/* Detail badge */}
                    <div style={{
                      paddingTop: '1.25rem',
                      borderTop: '1px solid var(--col-border)',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}>
                      <span style={{
                        fontFamily: 'var(--font-ui)',
                        fontSize: '0.57rem',
                        letterSpacing: '0.2em',
                        textTransform: 'uppercase',
                        color: 'var(--col-stone)',
                      }}>
                        Duration
                      </span>
                      <span style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.65rem',
                        color: 'var(--col-sage)',
                        letterSpacing: '0.1em',
                      }}>
                        {item.detail}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        @media (min-width: 768px) {
          .process-step {
            flex-direction: row !important;
            padding-left: 0 !important;
          }
          .process-step .step-row {
            flex-direction: row;
            align-items: center;
            gap: 3rem;
            padding-left: 4rem;
          }
          .process-step:nth-child(odd) .step-row {
            flex-direction: row-reverse;
            padding-left: 0;
            padding-right: 4rem;
          }
          .process-step .animate-block { width: 45% !important; max-width: 100% !important; }
          [ref="lineRef"] { left: 50% !important; transform: translateX(-50%); }
          .process-step > div[style*="left: 2rem"] { left: 50% !important; }
        }
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

/* ─── Process Step Skeleton ──────────────────────────────────────────────────── */
function ProcessStepSkeleton({ isLast = false }) {
  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        marginBottom: isLast ? 0 : 'clamp(4rem, 8vw, 8rem)',
        paddingLeft: '4.5rem',
        gap: '1.25rem',
      }}
    >
      {/* Timeline dot skeleton */}
      <div style={{
        position: 'absolute',
        left: '2rem',
        top: '2.5rem',
        transform: 'translateX(-50%)',
        width: '14px',
        height: '14px',
        borderRadius: '50%',
        background: 'rgba(122,158,56,0.12)',
        border: '2px solid rgba(122,158,56,0.18)',
      }} />

      {/* Video placeholder */}
      <div
        className="skeleton-pulse"
        style={{
          width: '100%',
          maxWidth: '520px',
          height: 'clamp(200px, 28vw, 300px)',
          borderRadius: 'var(--r-lg)',
          background: 'rgba(255,255,255,0.06)',
          border: '1px solid var(--col-border)',
        }}
      />

      {/* Text card placeholder */}
      <div style={{
        maxWidth: '460px',
        padding: 'clamp(1.5rem, 2.5vw, 2.5rem)',
        borderRadius: 'var(--r-lg)',
        background: 'rgba(255,255,255,0.02)',
        border: '1px solid var(--col-border)',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        width: '100%',
      }}>
        {/* Step number + title row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div className="skeleton-pulse" style={{ width: '1.5rem', height: '0.65rem', borderRadius: '3px', background: 'rgba(255,255,255,0.06)' }} />
          <div className="skeleton-pulse" style={{ width: '1.5rem', height: '1px', background: 'rgba(255,255,255,0.06)' }} />
          <div className="skeleton-pulse" style={{ width: '50%', height: '2rem', borderRadius: '4px', background: 'rgba(255,255,255,0.08)' }} />
        </div>
        {/* Subtitle */}
        <div className="skeleton-pulse" style={{ width: '35%', height: '0.65rem', borderRadius: '3px', background: 'rgba(122,158,56,0.12)' }} />
        {/* Description lines */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <div className="skeleton-pulse" style={{ width: '100%', height: '0.9rem', borderRadius: '3px', background: 'rgba(255,255,255,0.04)' }} />
          <div className="skeleton-pulse" style={{ width: '95%',  height: '0.9rem', borderRadius: '3px', background: 'rgba(255,255,255,0.04)' }} />
          <div className="skeleton-pulse" style={{ width: '80%',  height: '0.9rem', borderRadius: '3px', background: 'rgba(255,255,255,0.04)' }} />
        </div>
        {/* Duration footer */}
        <div style={{ paddingTop: '1.25rem', borderTop: '1px solid var(--col-border)', display: 'flex', justifyContent: 'space-between' }}>
          <div className="skeleton-pulse" style={{ width: '25%', height: '0.65rem', borderRadius: '3px', background: 'rgba(255,255,255,0.04)' }} />
          <div className="skeleton-pulse" style={{ width: '30%', height: '0.65rem', borderRadius: '3px', background: 'rgba(122,158,56,0.1)' }} />
        </div>
      </div>
    </div>
  );
}