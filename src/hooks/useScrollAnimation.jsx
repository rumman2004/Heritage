import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * useScrollAnimation — attaches a GSAP scroll-triggered stagger reveal
 * to the direct children of the referenced element.
 *
 * @param {React.RefObject} ref          — The container element ref
 * @param {Object}          options      — Optional overrides
 * @param {number}          options.y    — Initial vertical offset (default 36)
 * @param {number}          options.duration   — Tween duration in seconds (default 1)
 * @param {number}          options.stagger    — Stagger delay between children (default 0.18)
 * @param {string}          options.start      — ScrollTrigger start (default "top 78%")
 * @param {string}          options.ease       — GSAP ease string (default "power3.out")
 */
export default function useScrollAnimation(ref, options = {}) {
  const {
    y        = 36,
    duration = 1,
    stagger  = 0.18,
    start    = 'top 78%',
    ease     = 'power3.out',
  } = options;

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        Array.from(element.children),
        { y, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration,
          stagger,
          ease,
          scrollTrigger: {
            trigger: element,
            start,
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, element);

    return () => ctx.revert();
  }, [ref, y, duration, stagger, start, ease]);
}