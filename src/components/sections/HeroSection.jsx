import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ScrollIndicator from '../ui/ScrollIndicator';
import FloatingLeaf from '../3d/FloatingLeaf';

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const canvasRef  = useRef(null);
  const sectionRef = useRef(null);
  const overlayRef = useRef(null);
  const frameCount = 240;

  useEffect(() => {
    const canvas  = canvasRef.current;
    const ctx     = canvas.getContext('2d');
    const section = sectionRef.current;

    const images = [];
    const target = { frame: 1 };

    function render() {
      const img = images[target.frame - 1];
      if (!img?.complete) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const hr = canvas.width  / img.naturalWidth;
      const vr = canvas.height / img.naturalHeight;
      const r  = Math.max(hr, vr);
      const cx = (canvas.width  - img.naturalWidth  * r) / 2;
      const cy = (canvas.height - img.naturalHeight * r) / 2;
      ctx.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight, cx, cy, img.naturalWidth * r, img.naturalHeight * r);
    }

    const setSize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
      render();
    };

    window.addEventListener('resize', setSize, { passive: true });
    setSize();

    for (let i = 1; i <= frameCount; i++) {
      const img = new Image();
      img.src   = `/frames/ezgif-frame-${String(i).padStart(3, '0')}.png`;
      images.push(img);
    }
    images[0].onload = render;

    const gsapCtx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: `+=${frameCount * 25}`,
          scrub: 0.6,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
        },
      });

      // Frame scrub
      tl.to(target, { frame: frameCount, snap: 'frame', ease: 'none', onUpdate: render }, 0);

      // Hero text fades out in first 15% of scroll
      tl.to('.hero-text', { opacity: 0, y: -80, ease: 'power2.out', duration: 0.15 }, 0);

      // Subtle vignette intensifies
      tl.to(overlayRef.current, { opacity: 0.6, duration: 0.5 }, 0);

    }, section);

    return () => {
      window.removeEventListener('resize', setSize);
      gsapCtx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        background: 'var(--col-void)',
        overflow: 'hidden',
      }}
    >
      {/* Ambient leaf particles */}
      <FloatingLeaf count={10} opacity={0.12} />

      {/* Scroll-scrubbed canvas */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          opacity: 0.85,
          zIndex: 0,
        }}
      />

      {/* Radial vignette - UPDATED to provide better contrast behind text */}
      <div
        ref={overlayRef}
        style={{
          position: 'absolute',
          inset: 0,
          /* Added a subtle dark tint (rgba 0,0,0,0.2) to the center instead of transparent */
          background: 'radial-gradient(ellipse 80% 80% at 50% 50%, rgba(0,0,0,0.2) 30%, rgba(5,5,5,0.8) 100%)',
          pointerEvents: 'none',
          opacity: 0.6, /* Slightly increased base opacity */
          zIndex: 1,
          transition: 'opacity 0.3s ease',
        }}
      />

      {/* Bottom gradient for seamless section bleed */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '35%',
          background: 'linear-gradient(to top, var(--col-void), transparent)',
          pointerEvents: 'none',
          zIndex: 2,
        }}
      />

      {/* Hero text block */}
      <div
        className="hero-text"
        style={{
          position: 'relative',
          zIndex: 10,
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '1.25rem',
          pointerEvents: 'none',
        }}
      >
        {/* Eyebrow */}
        <p
          style={{
            fontFamily: 'var(--font-ui)',
            fontSize: '0.62rem',
            fontWeight: 500, /* Slightly bolder */
            letterSpacing: '0.38em',
            textTransform: 'uppercase',
            color: 'var(--col-white)',
            opacity: 1, /* Full opacity */
            textShadow: '0 2px 10px rgba(0,0,0,0.8)', /* Added shadow for contrast */
          }}
        >
          NorthEast Assam · India
        </p>

        {/* Primary headline - UPDATED with layered shadows */}
        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(4rem, 10vw, 10rem)',
            fontWeight: 300,
            lineHeight: 0.9,
            letterSpacing: '-0.02em',
            textAlign: 'center',
            color: 'var(--col-white)',
            /* Layered shadow: tight black shadow for legibility + wide shadow for depth */
            textShadow: '0 4px 40px rgba(0,0,0,0.8), 0 2px 10px rgba(0,0,0,0.6)', 
          }}
        >
          Heritage
        </h1>

        {/* Sub-headline - UPDATED opacity and shadow */}
        <p
          style={{
            fontFamily: 'var(--font-display)',
            fontStyle: 'italic',
            fontSize: 'clamp(1.1rem, 2.5vw, 2rem)',
            fontWeight: 300,
            letterSpacing: '0.06em',
            color: 'rgba(255,255,255,0.9)', /* Increased opacity significantly */
            marginTop: '0.25rem',
            textShadow: '0 2px 15px rgba(0,0,0,0.8)', /* Added shadow */
          }}
        >
          The Art of Single-Estate Cultivation
        </p>

        {/* Hairline rule */}
        <div
          style={{
            width: '1px',
            height: '3rem',
            background: 'linear-gradient(to bottom, rgba(255,255,255,0.5), transparent)', /* Made line slightly more visible */
            marginTop: '1rem',
          }}
        />
      </div>

      {/* Scroll indicator */}
      <div className="hero-text" style={{ position: 'absolute', bottom: 0, width: '100%', zIndex: 20, pointerEvents: 'none' }}>
        <ScrollIndicator />
      </div>
    </section>
  );
}