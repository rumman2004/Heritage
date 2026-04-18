import { useEffect, useRef, useMemo } from 'react';

/**
 * FloatingLeaf — ambient SVG leaf particles that drift upward.
 * ✅ React StrictMode safe  (single cleanup, no duplicate keyframes)
 * ✅ Hot-reload safe        (style tag is owned by the component instance)
 * ✅ No document.head leaks (all styles removed on unmount)
 *
 * Props:
 *   count   — number of leaves (default 12)
 *   opacity — base opacity     (default 0.18)
 */

// Two leaf path variants for variety
const LEAF_PATHS = [
  'M12 2C6 2 2 8 2 14c0 4 2.5 7 6 8 1-3 1-6 4-8-2 3-2 6-1 8 1 0 2 0 3-.5C17.5 20 22 17 22 12 22 6.5 18 2 12 2z',
  'M12 3C8 3 4 7 4 12c0 3 1.5 5.5 4 7 .5-2 .5-4.5 3-6-1.5 2.5-1.5 5 -.5 6.5.5.1 1 .1 1.5 0C15.5 18.5 20 15 20 11 20 6.5 16.5 3 12 3z',
];

export default function FloatingLeaf({ count = 12, opacity = 0.18 }) {
  const containerRef = useRef(null);

  // Generate stable leaf configs once per mount (not on every render)
  const leafConfigs = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      size:   10 + Math.random() * 14,
      startX: Math.random() * 100,
      delay:  Math.random() * 12,
      dur:    14 + Math.random() * 10,
      drift:  (Math.random() - 0.5) * 120,
      rot:    (Math.random() - 0.5) * 720,
      leafOp: opacity * (0.5 + Math.random() * 0.5),
      startScale: 0.6 + Math.random() * 0.4,
      endScale:   0.4 + Math.random() * 0.3,
      endY:   400 + Math.random() * 200,
      pathIdx: i % LEAF_PATHS.length,
    }));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count, opacity]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // ── 1. Build one consolidated <style> tag for ALL keyframes ──────────
    const styleTag = document.createElement('style');
    styleTag.setAttribute('data-floating-leaf', 'true');

    const keyframes = leafConfigs.map((c, i) => `
      @keyframes fl-rise-${i} {
        0%   { transform: translate(0, 0) rotate(0deg) scale(${c.startScale}); opacity: 0; }
        10%  { opacity: ${c.leafOp}; }
        80%  { opacity: ${c.leafOp * 0.4}; }
        100% { transform: translate(${c.drift}px, -${c.endY}px) rotate(${c.rot}deg) scale(${c.endScale}); opacity: 0; }
      }
    `).join('\n');

    styleTag.textContent = keyframes;
    document.head.appendChild(styleTag);

    // ── 2. Create SVG leaf elements ───────────────────────────────────────
    const leafEls = leafConfigs.map((c, i) => {
      const svg  = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svg.setAttribute('viewBox', '0 0 24 24');
      svg.setAttribute('fill', 'none');
      svg.setAttribute('aria-hidden', 'true');

      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.setAttribute('d', LEAF_PATHS[c.pathIdx]);
      path.setAttribute('fill', 'var(--col-sage)');
      path.setAttribute('opacity', '0.65');
      svg.appendChild(path);

      Object.assign(svg.style, {
        position:      'absolute',
        bottom:        `-${c.size}px`,
        left:          `${c.startX}%`,
        width:         `${c.size}px`,
        height:        `${c.size}px`,
        opacity:       `${c.leafOp}`,
        pointerEvents: 'none',
        animation:     `fl-rise-${i} ${c.dur}s ${c.delay}s ease-in-out infinite`,
        willChange:    'transform, opacity',
      });

      container.appendChild(svg);
      return svg;
    });

    // ── 3. Cleanup — removes EVERYTHING this instance created ─────────────
    return () => {
      leafEls.forEach(el => el.remove());
      styleTag.remove();
    };

  }, [leafConfigs]); // leafConfigs is stable (useMemo) so this runs once

  return (
    <div
      ref={containerRef}
      style={{
        position:      'absolute',
        inset:         0,
        overflow:      'hidden',
        pointerEvents: 'none',
        zIndex:        1,
      }}
    />
  );
}