import { useEffect, useRef } from 'react';

// The exact math configurations from the Rose Three algorithm
const CONFIG = {
  particleCount: 67,
  trailSpan: 0.22,
  durationMs: 4400,
  rotationDurationMs: 39500,
  pulseDurationMs: 6200,
  strokeWidth: 4.2, 
  roseA: 9.2,
  roseABoost: 1.25,
  roseBreathBase: 0.72,
  roseBreathBoost: 0.34,
  roseScale: 3.95,
};

export default function Loader({ progress = 0 }) {
  const done = progress >= 100;

  // Refs for direct DOM manipulation to maintain 60fps
  const groupRef = useRef(null);
  const pathRef = useRef(null);
  const circlesRef = useRef([]);
  const requestRef = useRef();

  useEffect(() => {
    // Math functions
    const point = (prog, detailScale) => {
      const t = prog * Math.PI * 2;
      const a = CONFIG.roseA + detailScale * CONFIG.roseABoost;
      const r = a * (CONFIG.roseBreathBase + detailScale * CONFIG.roseBreathBoost) * Math.cos(3 * t);
      return {
        x: 50 + Math.cos(t) * r * CONFIG.roseScale,
        y: 50 + Math.sin(t) * r * CONFIG.roseScale,
      };
    };

    const normalizeProgress = (p) => ((p % 1) + 1) % 1;

    const getDetailScale = (time) => {
      const pulseProgress = (time % CONFIG.pulseDurationMs) / CONFIG.pulseDurationMs;
      const pulseAngle = pulseProgress * Math.PI * 2;
      return 0.52 + ((Math.sin(pulseAngle + 0.55) + 1) / 2) * 0.48;
    };

    const getRotation = (time) => -((time % CONFIG.rotationDurationMs) / CONFIG.rotationDurationMs) * 360;

    const buildPath = (detailScale, steps = 480) => {
      return Array.from({ length: steps + 1 }, (_, index) => {
        const p = point(index / steps, detailScale);
        return `${index === 0 ? 'M' : 'L'} ${p.x.toFixed(2)} ${p.y.toFixed(2)}`;
      }).join(' ');
    };

    const getParticle = (index, prog, detailScale) => {
      const tailOffset = index / (CONFIG.particleCount - 1);
      const p = point(normalizeProgress(prog - tailOffset * CONFIG.trailSpan), detailScale);
      const fade = Math.pow(1 - tailOffset, 0.56);
      return {
        x: p.x,
        y: p.y,
        radius: 0.9 + fade * 2.7,
        opacity: 0.04 + fade * 0.96,
      };
    };

    const startedAt = performance.now();

    // The Render Loop
    const render = (now) => {
      const time = now - startedAt;
      const prog = (time % CONFIG.durationMs) / CONFIG.durationMs;
      const detailScale = getDetailScale(time);

      if (groupRef.current) {
        groupRef.current.setAttribute('transform', `rotate(${getRotation(time)} 50 50)`);
      }

      if (pathRef.current) {
        pathRef.current.setAttribute('d', buildPath(detailScale));
      }

      // Update all 67 particles instantly without triggering React re-renders
      circlesRef.current.forEach((circle, index) => {
        if (!circle) return;
        const particle = getParticle(index, prog, detailScale);
        circle.setAttribute('cx', particle.x.toFixed(2));
        circle.setAttribute('cy', particle.y.toFixed(2));
        circle.setAttribute('r', particle.radius.toFixed(2));
        circle.setAttribute('opacity', particle.opacity.toFixed(3));
      });

      requestRef.current = requestAnimationFrame(render);
    };

    // Start loop
    requestRef.current = requestAnimationFrame(render);

    // Cleanup on unmount
    return () => cancelAnimationFrame(requestRef.current);
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 200,
        background: 'var(--col-void)', // Deep black background
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '3rem',
        transition: 'opacity 0.8s ease, visibility 0.8s ease',
        opacity: done ? 0 : 1,
        visibility: done ? 'hidden' : 'visible',
      }}
    >
      {/* The Rose Curve Canvas */}
      <div style={{ width: 'min(50vmin, 260px)', aspectRatio: '1', color: 'var(--col-sage)' }}>
        <svg viewBox="0 0 100 100" fill="none" aria-hidden="true" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
          <g ref={groupRef}>
            <path 
              ref={pathRef} 
              stroke="currentColor" 
              strokeWidth={CONFIG.strokeWidth} 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              opacity="0.1" 
            />
            {/* Create the 67 circles and assign them to our ref array */}
            {Array.from({ length: CONFIG.particleCount }).map((_, i) => (
              <circle
                key={i}
                ref={(el) => (circlesRef.current[i] = el)}
                fill="currentColor"
              />
            ))}
          </g>
        </svg>
      </div>

      {/* Typography & Progress indicator */}
      <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
        <div style={{ textAlign: 'center' }}>
          <p
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2rem, 4vw, 3.5rem)',
              fontWeight: 300,
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: 'var(--col-white)',
              lineHeight: 1,
            }}
          >
            Heritage
          </p>
          <p
            style={{
              fontFamily: 'var(--font-ui)',
              fontSize: '0.6rem',
              fontWeight: 400,
              letterSpacing: '0.35em',
              textTransform: 'uppercase',
              color: 'var(--col-sage)',
              marginTop: '0.6rem',
            }}
          >
            Estate Collection
          </p>
        </div>

        {/* Minimal numeric progress counter */}
        <p
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.6rem',
            letterSpacing: '0.15em',
            color: 'var(--col-stone)',
          }}
        >
          {String(Math.round(progress)).padStart(3, '0')} / 100
        </p>
      </div>
    </div>
  );
}