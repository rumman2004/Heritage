import { useState } from 'react';

/* ─── Status badge ─────────────────────────────────────────────────────────── */
export function StatusBadge({ status }) {
  const isAvail = status === 'available';
  return (
    <div style={{
      display:    'inline-flex',
      alignItems: 'center',
      gap:        '0.4rem',
      padding:    '0.28rem 0.7rem',
      borderRadius: '9999px',
      border:     `1px solid ${isAvail ? 'rgba(122,158,56,0.35)' : 'rgba(255,255,255,0.1)'}`,
      background: isAvail ? 'rgba(122,158,56,0.1)' : 'rgba(255,255,255,0.04)',
    }}>
      <span style={{
        width: '5px', height: '5px',
        borderRadius: '50%',
        background:   isAvail ? 'var(--col-sage)' : 'var(--col-stone)',
        display:      'inline-block',
        flexShrink:   0,
        boxShadow:    isAvail ? '0 0 6px rgba(122,158,56,0.7)' : 'none',
        animation:    isAvail ? 'badge-pulse 2.2s ease infinite' : 'none',
      }} />
      <span style={{
        fontFamily: 'var(--font-ui)',
        fontSize:   '0.52rem', fontWeight: 400,
        letterSpacing: '0.2em', textTransform: 'uppercase',
        color: isAvail ? 'var(--col-sage)' : 'var(--col-stone)',
      }}>
        {isAvail ? 'Available' : 'Coming Soon'}
      </span>
      <style>{`
        @keyframes badge-pulse {
          0%,100% { opacity:1; transform:scale(1); }
          50%      { opacity:0.45; transform:scale(0.8); }
        }
      `}</style>
    </div>
  );
}

/* ─── Artwork panel (image or abstract rings fallback) ─────────────────────── */
function ArtworkPanel({ tea, hov }) {
  const [imgError, setImgError] = useState(false);
  const showImage = tea.image && !imgError;

  return (
    <div style={{
      height:       'clamp(170px, 20vw, 230px)',
      borderBottom: `1px solid ${hov ? `${tea.hue}25` : 'var(--col-border)'}`,
      position:     'relative',
      overflow:     'hidden',
      background:   showImage
        ? 'var(--col-obsidian)'
        : `radial-gradient(ellipse at 50% 100%, ${tea.glow} 0%, transparent 68%)`,
      transition:   'border-color 0.4s ease',
    }}>

      {/* ── Image (when provided) ── */}
      {showImage && (
        <>
          <img
            src={tea.image}
            alt={tea.name}
            onError={() => setImgError(true)}
            style={{
              width: '100%', height: '100%',
              objectFit: 'cover',
              opacity: hov ? 0.9 : 0.7,
              transition: 'opacity 0.5s ease, transform 0.6s cubic-bezier(0.16,1,0.3,1)',
              transform: hov ? 'scale(1.04)' : 'scale(1)',
            }}
          />
          {/* Gradient overlay so badge is always readable */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to top, rgba(10,10,10,0.6) 0%, transparent 50%)',
            pointerEvents: 'none',
          }} />
          {/* Subtle hue tint on hover */}
          {hov && (
            <div style={{
              position: 'absolute', inset: 0,
              background: `${tea.hue}18`,
              pointerEvents: 'none',
              transition: 'opacity 0.4s ease',
            }} />
          )}
        </>
      )}

      {/* ── Abstract rings fallback (no image / error) ── */}
      {!showImage && (
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          {[48, 76, 110].map((size, ri) => (
            <div key={ri} style={{
              position: 'absolute',
              width: size, height: size,
              borderRadius: '50%',
              border: `1px solid ${tea.hue}${['38', '24', '14'][ri]}`,
              transition: `transform 0.7s cubic-bezier(0.16,1,0.3,1) ${ri * 0.06}s`,
              transform: hov ? `scale(${1.14 + ri * 0.12})` : 'scale(1)',
            }} />
          ))}
          <span style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '1.5rem',
            color: tea.hue,
            opacity: hov ? 1 : 0.55,
            position: 'relative', zIndex: 1,
            transition: 'opacity 0.4s ease, transform 0.4s ease',
            transform: hov ? 'scale(1.15)' : 'scale(1)',
            filter: `drop-shadow(0 0 10px ${tea.hue}60)`,
          }}>
            {tea.icon}
          </span>
        </div>
      )}

      {/* Status badge — always top right */}
      <div style={{ position: 'absolute', top: '0.85rem', right: '0.85rem', zIndex: 10 }}>
        <StatusBadge status={tea.status} />
      </div>

      {/* Tag badge — top left */}
      <span style={{
        position: 'absolute', top: '0.85rem', left: '0.85rem', zIndex: 10,
        fontFamily: 'var(--font-ui)',
        fontSize: '0.52rem', fontWeight: 400,
        letterSpacing: '0.18em', textTransform: 'uppercase',
        color: tea.hue,
        padding: '0.28rem 0.7rem',
        borderRadius: '9999px',
        border: `1px solid ${tea.hue}40`,
        background: 'rgba(5,5,5,0.6)',
        backdropFilter: 'blur(8px)',
      }}>
        {tea.tag}
      </span>
    </div>
  );
}

/* ─── Full Tea Card ────────────────────────────────────────────────────────── */
export default function TeaCard({ tea, compact = false }) {
  const [hov, setHov] = useState(false);
  const isSoon = tea.status === 'soon';

  return (
    <div
      className="tea-card"
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        position:      'relative',
        borderRadius:  'var(--r-xl)',
        border:        `1px solid ${hov ? `${tea.hue}38` : 'var(--col-border)'}`,
        background:    hov ? 'rgba(255,255,255,0.042)' : 'rgba(255,255,255,0.018)',
        backdropFilter: 'blur(24px)',
        overflow:      'hidden',
        display:       'flex',
        flexDirection: 'column',
        transition:    'all 0.5s cubic-bezier(0.16,1,0.3,1)',
        transform:     hov ? 'translateY(-6px)' : 'translateY(0)',
        boxShadow:     hov
          ? `0 24px 60px rgba(0,0,0,0.5), 0 0 0 1px ${tea.hue}18`
          : '0 2px 20px rgba(0,0,0,0.28)',
        opacity:       isSoon ? 0.78 : 1,
      }}
    >
      {/* Top sheen line */}
      <div style={{
        position: 'absolute', top: 0, left: '8%', right: '8%', height: '1px',
        background: `linear-gradient(90deg, transparent, ${tea.hue}${hov ? '50' : '28'}, transparent)`,
        transition: 'opacity 0.4s ease',
        zIndex: 2,
      }} />

      {/* Left accent bar */}
      <div style={{
        position: 'absolute', top: 0, left: 0,
        width: '2.5px',
        height: hov ? '100%' : '35%',
        background: `linear-gradient(to bottom, ${tea.hue}, transparent)`,
        borderRadius: '2px 0 0 0',
        transition: 'height 0.6s cubic-bezier(0.16,1,0.3,1)',
        zIndex: 2,
      }} />

      {/* Artwork */}
      <ArtworkPanel tea={tea} hov={hov} />

      {/* Body */}
      <div style={{
        padding: compact
          ? 'clamp(1rem, 1.5vw, 1.5rem)'
          : 'clamp(1.25rem, 2vw, 1.75rem)',
        display: 'flex', flexDirection: 'column',
        gap: compact ? '0.65rem' : '0.85rem',
        flex: 1,
      }}>

        {/* Grade + flush */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.58rem', color: 'var(--col-stone)', letterSpacing: '0.1em' }}>
            {tea.grade}
          </span>
          <span style={{ fontFamily: 'var(--font-ui)', fontSize: '0.54rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--col-shadow)' }}>
            {tea.flush}
          </span>
        </div>

        {/* Name */}
        <div>
          <h3 style={{
            fontFamily: 'var(--font-display)',
            fontSize: compact ? 'clamp(1.15rem,1.8vw,1.45rem)' : 'clamp(1.3rem,2vw,1.65rem)',
            fontWeight: 400, color: 'var(--col-white)',
            lineHeight: 1.1, letterSpacing: '0.01em',
            marginBottom: '0.2rem',
          }}>
            {tea.name}
          </h3>
          <p style={{ fontFamily: 'var(--font-ui)', fontSize: '0.58rem', fontWeight: 400, letterSpacing: '0.2em', textTransform: 'uppercase', color: tea.hue, opacity: 0.85 }}>
            {tea.subName}
          </p>
        </div>

        {/* Season */}
        <p style={{ fontFamily: 'var(--font-ui)', fontSize: '0.6rem', fontWeight: 400, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--col-shadow)' }}>
          {tea.season}
        </p>

        {/* Description */}
        {!compact && (
          <p style={{ fontFamily: 'var(--font-ui)', fontSize: '0.86rem', fontWeight: 300, lineHeight: 1.75, color: 'var(--col-mist)', flex: 1 }}>
            {tea.desc}
          </p>
        )}

        {/* Tasting note pill */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '0.38rem',
          padding: '0.28rem 0.75rem', borderRadius: '9999px',
          border: `1px solid ${tea.hue}22`, background: `${tea.hue}08`,
          alignSelf: 'flex-start',
        }}>
          <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: tea.hue, flexShrink: 0, display: 'inline-block' }} />
          <span style={{ fontFamily: 'var(--font-ui)', fontSize: '0.55rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--col-stone)' }}>
            {tea.note}
          </span>
        </div>

        {/* Footer */}
        <div style={{
          paddingTop:     '0.9rem',
          borderTop:      `1px solid ${hov ? `${tea.hue}18` : 'var(--col-border)'}`,
          display:        'flex',
          justifyContent: 'space-between',
          alignItems:     'center',
          transition:     'border-color 0.4s ease',
          flexWrap:       'wrap',
          gap:            '0.5rem',
        }}>
          <div>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.54rem', color: 'var(--col-stone)', letterSpacing: '0.08em' }}>
              Steep · </span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.56rem', color: tea.hue, letterSpacing: '0.08em' }}>
              {tea.steep}
            </span>
          </div>

          {isSoon ? (
            <span style={{
              fontFamily: 'var(--font-ui)', fontSize: '0.54rem', fontWeight: 400,
              letterSpacing: '0.16em', textTransform: 'uppercase',
              color: 'var(--col-shadow)', padding: '0.32rem 0.8rem',
              borderRadius: '9999px', border: '1px solid rgba(255,255,255,0.06)',
            }}>
              Notify Me
            </span>
          ) : (
            <span style={{
              fontFamily: 'var(--font-ui)', fontSize: '0.54rem', fontWeight: 400,
              letterSpacing: '0.16em', textTransform: 'uppercase',
              color: hov ? tea.hue : 'var(--col-stone)',
              padding: '0.32rem 0.8rem', borderRadius: '9999px',
              border: `1px solid ${hov ? `${tea.hue}45` : 'rgba(255,255,255,0.08)'}`,
              transition: 'all 0.3s ease',
            }}>
              Enquire →
            </span>
          )}
        </div>
      </div>
    </div>
  );
}