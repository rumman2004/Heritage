import { useState, useEffect, useRef } from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import Home       from './Pages/Home';
import About      from './Pages/About';
import Collection from './Pages/Collection';
import Contact    from './Pages/Contact';
import Loader     from './components/ui/Loader';

export default function App() {
  const [progress, setProgress] = useState(0);
  const [loaded, setLoaded]     = useState(false);
  const rafRef                  = useRef(null);
  const startRef                = useRef(null);

  useEffect(() => {
    // Phase 1 — rapid ramp to ~72% while the page resources load
    // Phase 2 — hold near 72–88% until window.onload fires
    // Phase 3 — sprint to 100% immediately after load, then unmount

    let currentProgress = 0;
    let loadFired       = false;

    const RAMP_SPEED   = 0.045; // progress units per ms during phase 1
    const HOLD_SPEED   = 0.004; // slow crawl speed during phase 2
    const PHASE1_CAP   = 72;    // ceiling before load fires
    const PHASE2_CAP   = 88;    // ceiling while waiting for load event
    const SPRINT_SPEED = 0.18;  // speed of final sprint to 100

    startRef.current = performance.now();

    const tick = (now) => {
      const elapsed = now - startRef.current;

      if (!loadFired) {
        // Phase 1: fast ramp
        if (currentProgress < PHASE1_CAP) {
          currentProgress = Math.min(
            PHASE1_CAP,
            currentProgress + RAMP_SPEED * (elapsed / 16)
          );
        } else {
          // Phase 2: slow crawl to PHASE2_CAP
          currentProgress = Math.min(
            PHASE2_CAP,
            currentProgress + HOLD_SPEED * (elapsed / 16)
          );
        }
        // Reset elapsed reference each frame for incremental calc
        startRef.current = now;
        setProgress(Math.round(currentProgress));
        rafRef.current = requestAnimationFrame(tick);
      } else {
        // Phase 3: sprint to 100
        currentProgress = Math.min(100, currentProgress + SPRINT_SPEED * (elapsed / 16));
        startRef.current = now;
        setProgress(Math.round(currentProgress));

        if (currentProgress < 100) {
          rafRef.current = requestAnimationFrame(tick);
        } else {
          setProgress(100);
          // Give the fade-out transition (0.8s) time to complete before unmounting
          setTimeout(() => setLoaded(true), 900);
        }
      }
    };

    rafRef.current = requestAnimationFrame(tick);

    const onLoad = () => {
      loadFired = true;
    };

    if (document.readyState === 'complete') {
      // Already loaded (e.g. HMR / dev refresh)
      loadFired = true;
    } else {
      window.addEventListener('load', onLoad);
    }

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('load', onLoad);
    };
  }, []);

  return (
    <>
      {/* Loader sits above everything and self-fades when progress hits 100 */}
      {!loaded && <Loader progress={progress} />}

      {/* App shell renders immediately beneath — no layout shift on reveal */}
      <MainLayout>
        <Routes>
          <Route path="/"           element={<Home />}       />
          <Route path="/about"      element={<About />}      />
          <Route path="/collection" element={<Collection />} />
          <Route path="/contact"    element={<Contact />}    />
        </Routes>
      </MainLayout>
    </>
  );
}