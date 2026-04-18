import { useRef } from 'react';

const styles = {
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    fontFamily: 'var(--font-ui)',
    fontSize: '0.68rem',
    fontWeight: 400,
    letterSpacing: '0.2em',
    textTransform: 'uppercase',
    padding: '0.85rem 2.2rem',
    borderRadius: '9999px',
    border: 'none',
    outline: 'none',
    transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
    position: 'relative',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
  },
  primary: {
    background: 'linear-gradient(135deg, var(--col-fern) 0%, var(--col-sage) 100%)',
    color: 'var(--col-white)',
    boxShadow: '0 2px 20px rgba(79,104,32,0.35)',
  },
  primaryHover: {
    background: 'linear-gradient(135deg, var(--col-sage) 0%, var(--col-dew) 100%)',
    boxShadow: '0 4px 30px rgba(122,158,56,0.45)',
    transform: 'translateY(-1px)',
  },
  glass: {
    background: 'rgba(255,255,255,0.04)',
    color: 'var(--col-mist)',
    border: '1px solid rgba(255,255,255,0.12)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.06)',
  },
  glassHover: {
    background: 'rgba(255,255,255,0.08)',
    color: 'var(--col-white)',
    borderColor: 'rgba(255,255,255,0.22)',
    transform: 'translateY(-1px)',
    boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.1), 0 4px 20px rgba(0,0,0,0.3)',
  },
  ghost: {
    background: 'transparent',
    color: 'var(--col-stone)',
    border: '1px solid rgba(255,255,255,0.06)',
  },
  ghostHover: {
    color: 'var(--col-mist)',
    borderColor: 'rgba(255,255,255,0.14)',
  },
};

export default function Button({
  children,
  variant = 'glass',
  onClick,
  icon,
  className = '',
  style: extraStyle = {},
}) {
  const ref = useRef(null);
  const [hovered, setHovered] = React.useState(false);

  // Ripple on click
  const handleClick = (e) => {
    const btn = ref.current;
    const ripple = document.createElement('span');
    const rect = btn.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    ripple.style.cssText = `
      position:absolute; border-radius:50%; pointer-events:none;
      width:${size * 2}px; height:${size * 2}px;
      left:${e.clientX - rect.left - size}px;
      top:${e.clientY - rect.top - size}px;
      background:rgba(255,255,255,0.08);
      transform:scale(0); animation:ripple 0.5s ease forwards;
    `;
    btn.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
    onClick && onClick(e);
  };

  const base = { ...styles.base, ...(styles[variant] || styles.glass) };
  const hover = styles[`${variant}Hover`] || {};
  const combined = hovered ? { ...base, ...hover, ...extraStyle } : { ...base, ...extraStyle };

  return (
    <>
      <style>{`@keyframes ripple { to { transform: scale(1); opacity: 0; } }`}</style>
      <button
        ref={ref}
        onClick={handleClick}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={combined}
        className={className}
      >
        {icon && <span style={{ display: 'flex', alignItems: 'center', opacity: 0.7 }}>{icon}</span>}
        {children}
      </button>
    </>
  );
}

// Need React import
import React from 'react';