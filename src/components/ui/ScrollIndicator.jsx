export default function ScrollIndicator() {
  return (
    <div
      style={{
        position: 'absolute',
        bottom: '2.5rem',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0.75rem',
        opacity: 0.5,
      }}
    >
      <p
        style={{
          fontFamily: 'var(--font-ui)',
          fontSize: '0.55rem',
          fontWeight: 400,
          letterSpacing: '0.35em',
          textTransform: 'uppercase',
          color: 'var(--col-white)',
        }}
      >
        Scroll
      </p>

      {/* Pill track */}
      <div
        style={{
          width: '1.25rem',
          height: '2.25rem',
          borderRadius: '9999px',
          border: '1px solid rgba(255,255,255,0.25)',
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'center',
          padding: '4px',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            width: '3px',
            height: '6px',
            borderRadius: '9999px',
            background: 'var(--col-sage)',
            animation: 'scroll-pulse 2s ease-in-out infinite',
          }}
        />
      </div>
    </div>
  );
}