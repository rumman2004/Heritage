import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import logo from '../../assets/logo.png';

const NAV_LINKS = [
  { label: 'Home',        to: '/'           },
  { label: 'Our Story',   to: '/about'      },
  { label: 'Collection',  to: '/collection' },
  { label: 'Contact',     to: '/contact'    },
];

function DesktopCTA() {
  const [hov, setHov] = useState(false);
  return (
    <Link
      to="/collection"
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      className="desktop-only"
      style={{
        fontSize:      '0.62rem',
        fontWeight:    500,
        letterSpacing: '0.2em',
        textTransform: 'uppercase',
        color:         '#ffffff',
        textDecoration: 'none',
        padding:       '0.6rem 1.5rem',
        borderRadius:  '9999px',
        border:        hov
          ? '1px solid rgba(139,168,74,0.5)' // Tea Green border on hover
          : '1px solid rgba(255,255,255,0.2)', // Soft white border default
        background:    hov
          ? 'rgba(139,168,74,0.15)' // Slight green tint on hover
          : 'rgba(255,255,255,0.05)',
        transition:    'all 0.35s cubic-bezier(0.16,1,0.3,1)',
        backdropFilter: 'blur(10px)',
      }}
    >
      Shop Now
    </Link>
  );
}

export default function Navbar() {
  const [scrolled,   setScrolled]   = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const isActive = (to) => location.pathname === to;

  return (
    <>
      <style>{`
        .desktop-only    { display: inline-flex; }
        .desktop-nav     { display: flex; }
        .hamburger-btn   { display: none; }
        @media (max-width: 768px) {
          .desktop-only  { display: none !important; }
          .desktop-nav   { display: none !important; }
          .hamburger-btn { display: flex !important; }
        }
      `}</style>

      {/* ─── Top nav bar with Permanent Glassmorphism ───────────────────── */}
      <nav
        style={{
          position:   'fixed',
          top: 0, left: 0, right: 0,
          zIndex:     100,
          padding:    scrolled ? '0.85rem 2.5rem' : '1.5rem 2.5rem',
          // Permanent glass effect, gets slightly darker on scroll
          background: scrolled
            ? 'rgba(10, 10, 10, 0.8)'
            : 'rgba(10, 10, 10, 0.15)',
          backdropFilter:       scrolled ? 'blur(20px) saturate(180%)' : 'blur(12px) saturate(120%)',
          WebkitBackdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'blur(12px) saturate(120%)',
          borderBottom: `1px solid ${scrolled ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.05)'}`,
          transition:   'padding 0.5s cubic-bezier(0.16,1,0.3,1), background 0.5s ease, border-color 0.4s ease',
        }}
      >
        <div style={{
          maxWidth:        '88rem',
          margin:          '0 auto',
          display:         'flex',
          alignItems:      'center',
          justifyContent:  'space-between',
        }}>

          {/* Brand Logo & Wordmark */}
          <Link 
            to="/" 
            style={{ 
              textDecoration: 'none', 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.85rem' 
            }}
          >
            <img 
              src={logo} 
              alt="Heritage Estate Logo" 
              style={{ 
                height: scrolled ? '34px' : '42px', 
                width: 'auto', 
                transition: 'height 0.5s cubic-bezier(0.16,1,0.3,1)',
                filter: 'brightness(0) invert(1)', // Ensures logo is white/visible on dark background
              }} 
            />
            <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
              <span style={{
                fontSize:      '1.3rem',
                fontWeight:    300,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color:         '#ffffff',
              }}>
                Heritage
              </span>
              <span style={{
                fontSize:      '0.52rem',
                fontWeight:    500,
                letterSpacing: '0.34em',
                textTransform: 'uppercase',
                color:         '#8ba84a',
                marginTop:     '0.25rem',
              }}>
                Estate · Est. 1892
              </span>
            </div>
          </Link>

          {/* Desktop nav links */}
          <div
            className="desktop-nav"
            style={{ alignItems: 'center', gap: '2.5rem' }}
          >
            {NAV_LINKS.map(({ label, to }) => (
              <NavLink key={to} to={to} active={isActive(to)}>
                {label}
              </NavLink>
            ))}
          </div>

          {/* Desktop CTA + hamburger */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <DesktopCTA />

            {/* Hamburger */}
            <button
              onClick={() => setMobileOpen(o => !o)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              className="hamburger-btn"
              style={{
                background:     'none',
                border:         'none',
                padding:        '0.4rem',
                display:        'flex',
                flexDirection:  'column',
                gap:            '5px',
                alignItems:     'flex-end',
                cursor:         'pointer',
              }}
            >
              {[0, 1, 2].map(i => (
                <span key={i} style={{
                  display:      'block',
                  height:       '1.5px',
                  background:   '#ffffff', // Guaranteed White
                  borderRadius: '2px',
                  transition:   'all 0.4s cubic-bezier(0.16,1,0.3,1)',
                  width: mobileOpen
                    ? '1.5rem'
                    : i === 1 ? '1rem' : '1.5rem',
                  transform: mobileOpen
                    ? i === 0 ? 'translateY(6.5px) rotate(45deg)'
                    : i === 2 ? 'translateY(-6.5px) rotate(-45deg)'
                    : 'scaleX(0)'
                    : 'none',
                  opacity: (mobileOpen && i === 1) ? 0 : 1,
                }} />
              ))}
            </button>
          </div>
        </div>
      </nav>

      {/* ─── Mobile full-screen menu ──────────────────────────────────────── */}
      <div
        style={{
          position:       'fixed',
          inset:          0,
          zIndex:         95,
          background:     'rgba(10,10,10,0.95)',
          backdropFilter:       'blur(40px) saturate(150%)',
          WebkitBackdropFilter: 'blur(40px) saturate(150%)',
          display:        'flex',
          flexDirection:  'column',
          alignItems:     'center',
          justifyContent: 'center',
          gap:            '0.5rem',
          opacity:        mobileOpen ? 1 : 0,
          visibility:     mobileOpen ? 'visible' : 'hidden',
          transition:     'opacity 0.45s ease, visibility 0.45s ease',
          pointerEvents:  mobileOpen ? 'all' : 'none',
        }}
      >
        {/* Top accent line */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
          background: 'linear-gradient(90deg, transparent, #8ba84a, transparent)',
        }} />

        {/* Nav items */}
        {NAV_LINKS.map(({ label, to }, i) => (
          <Link
            key={to}
            to={to}
            style={{
              fontSize:      'clamp(2.2rem, 9vw, 4rem)',
              fontWeight:    300,
              letterSpacing: '0.04em',
              color:         isActive(to) ? '#8ba84a' : '#ffffff',
              textDecoration: 'none',
              opacity:       mobileOpen ? 1 : 0,
              transform:     mobileOpen ? 'translateY(0)' : 'translateY(24px)',
              transition:    `opacity 0.55s ease ${i * 0.08 + 0.15}s, transform 0.55s cubic-bezier(0.16,1,0.3,1) ${i * 0.08 + 0.15}s`,
              padding:       '0.5rem 0',
            }}
            onMouseEnter={e => { if (!isActive(to)) e.currentTarget.style.color = '#8ba84a'; }}
            onMouseLeave={e => { if (!isActive(to)) e.currentTarget.style.color = '#ffffff'; }}
          >
            {label}
          </Link>
        ))}

        {/* Footer note */}
        <p style={{
          position:      'absolute',
          bottom:        '2.5rem',
          fontSize:      '0.6rem',
          letterSpacing: '0.3em',
          textTransform: 'uppercase',
          color:         'rgba(255,255,255,0.4)',
          opacity:       mobileOpen ? 1 : 0,
          transition:    'opacity 0.5s ease 0.4s',
        }}>
          NorthEast Assam · India
        </p>
      </div>
    </>
  );
}

/* ─── Extracted link component to keep hover state clean ─── */
function NavLink({ to, active, children }) {
  const [hov, setHov] = useState(false);
  return (
    <Link
      to={to}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        fontSize:      '0.7rem',
        fontWeight:    400,
        letterSpacing: '0.2em',
        textTransform: 'uppercase',
        // Active = Green | Hover = Solid White | Default = Semi-transparent white
        color:         active ? '#8ba84a' : hov ? '#ffffff' : 'rgba(255,255,255,0.6)',
        textDecoration: 'none',
        transition:    'color 0.3s ease',
        position:      'relative',
        paddingBottom: '4px',
      }}
    >
      {children}
      {/* Active underline */}
      <span style={{
        position:   'absolute',
        bottom: 0, left: 0,
        width:      active ? '100%' : hov ? '100%' : '0%',
        height:     '1.5px',
        background: '#8ba84a',
        transition: 'width 0.3s ease',
        borderRadius: '2px',
      }} />
    </Link>
  );
}