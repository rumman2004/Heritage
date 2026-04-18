import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';

/* ── Inline SVG social icons — no lucide dependency needed ── */
function IconInstagram({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

function IconLinkedin({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function IconX({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" stroke="none">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z" />
    </svg>
  );
}

function IconGithub({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
    </svg>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();

  const links = [
    { label: 'Our Story',  to: '/about'      },
    { label: 'Collection', to: '/collection' },
    { label: 'Contact',    to: '/contact'    },
  ];

  const socials = [
    { label: 'Instagram', url: 'https://www.instagram.com/rumman.ig',        Icon: IconInstagram },
    { label: 'LinkedIn',  url: 'https://www.linkedin.com/in/rummanahmed04/', Icon: IconLinkedin  },
    { label: 'X',         url: 'https://x.com/rumman_tw11',                  Icon: IconX         },
    { label: 'GitHub',    url: 'https://github.com/rumman2004',              Icon: IconGithub    },
  ];

  return (
    <footer
      style={{
        position: 'relative',
        background: 'var(--col-void)',
        borderTop: '1px solid var(--col-border)',
        padding: '4rem clamp(1.5rem, 5vw, 4rem)',
        zIndex: 10,
      }}
    >
      <div
        style={{
          maxWidth: '80rem',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '3rem',
        }}
        className="footer-inner"
      >
        
        {/* Left Column: Brand & Copyright */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', alignItems: 'flex-start' }}>
          
          {/* Logo & Wordmark Group (Side-by-side) */}
          <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '1.2rem' }}>
            <img
              src={logo}
              alt="Heritage Estate Logo"
              style={{ height: '44px', width: 'auto', objectFit: 'contain' }}
            />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
              <span style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.6rem',
                fontWeight: 400,
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                color: 'var(--col-white)',
                lineHeight: 1
              }}>
                Heritage
              </span>
              <span style={{
                fontFamily: 'var(--font-ui)',
                fontSize: '0.6rem',
                fontWeight: 400,
                letterSpacing: '0.35em',
                textTransform: 'uppercase',
                color: 'var(--col-sage)',
                marginLeft: '0.1rem',
              }}>
                Estate · NorthEast Assam
              </span>
            </div>
          </Link>

          {/* Copyright Paragraph placed directly under the brand */}
          <p style={{
            fontFamily: 'var(--font-ui)',
            fontSize: '0.65rem',
            fontWeight: 400,
            lineHeight: 1.6,
            letterSpacing: '0.1em',
            color: 'var(--col-shadow)',
            maxWidth: '30ch',
            marginTop: '0.5rem',
          }}>
            © {year} Heritage Tea Co. All rights reserved.
          </p>
        </div>

        {/* Right Column Container: Nav & Socials */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem', justifyContent: 'center' }}>
          
          {/* Nav links */}
          <nav className="footer-nav" style={{ display: 'flex', flexWrap: 'wrap', gap: '2.5rem' }}>
            {links.map(({ label, to }) => (
              <Link
                key={to}
                to={to}
                style={{
                  fontFamily: 'var(--font-ui)',
                  fontSize: '0.65rem',
                  fontWeight: 400,
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: 'var(--col-stone)',
                  textDecoration: 'none',
                  transition: 'color 0.3s ease',
                }}
                onMouseEnter={e => e.target.style.color = 'var(--col-mist)'}
                onMouseLeave={e => e.target.style.color = 'var(--col-stone)'}
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Hairline Divider (Only shows on mobile, hidden on desktop by CSS below) */}
          <div className="mobile-divider" style={{
            height: '1px',
            width: '100%',
            background: 'linear-gradient(90deg, transparent, var(--col-border-hi), transparent)',
          }} />

          {/* Bottom row: Socials & Credit */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1.5rem',
          }}>
            
            {/* Social Links */}
            <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
              {socials.map(({ label, url, Icon }) => (
                <a
                  key={label}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  style={{
                    color: 'var(--col-stone)',
                    transition: 'color 0.3s ease, transform 0.3s ease',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.color = 'var(--col-white)';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.color = 'var(--col-stone)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>

            <p style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.55rem',
              letterSpacing: '0.12em',
              color: 'var(--col-shadow)',
            }}>
              Engineered by 
              <a href="https://rumman-portfolio-ryuu.vercel.app/" target="_blank" rel="noopener noreferrer" 
                style={{ color: 'var(--col-shadow)', textDecoration: 'none', transition: 'color 0.3s ease' }} 
                onMouseEnter={e => e.currentTarget.style.color = 'var(--col-mist)'} 
                onMouseLeave={e => e.currentTarget.style.color = 'var(--col-shadow)'}>
                <b> Rumman Ahmed </b>
              </a>
            </p>
          </div>
        </div>

      </div>

      <style>{`
        @media (min-width: 768px) {
          .footer-inner { 
            grid-template-columns: 1fr 1fr !important; 
            align-items: center;
          }
          .footer-inner > *:last-child {
            align-items: flex-end;
          }
          .footer-nav {
            justify-content: flex-end;
          }
          .mobile-divider {
            display: none;
          }
        }
      `}</style>
    </footer>
  );
}