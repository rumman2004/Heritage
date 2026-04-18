export default function NeumorphicSlider({ value, onChange, min = 0, max = 100, label }) {
  const pct = ((value - min) / (max - min)) * 100;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem', width: '100%', maxWidth: '400px' }}>

      {/* Label row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <span
          style={{
            fontFamily: 'var(--font-ui)',
            fontSize: '0.62rem',
            fontWeight: 400,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: 'var(--col-stone)',
          }}
        >
          {label}
        </span>
        <span
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.5rem',
            fontWeight: 300,
            color: 'var(--col-sage)',
            letterSpacing: '-0.01em',
          }}
        >
          {value}°<span style={{ fontSize: '0.9rem', color: 'var(--col-stone)' }}>C</span>
        </span>
      </div>

      {/* Track */}
      <div
        style={{
          position: 'relative',
          height: '6px',
          borderRadius: '9999px',
          background: 'var(--col-surface)',
          boxShadow: 'inset 2px 2px 6px rgba(0,0,0,0.6), inset -1px -1px 4px rgba(255,255,255,0.02)',
          overflow: 'visible',
        }}
      >
        {/* Fill */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            height: '100%',
            width: `${pct}%`,
            background: 'linear-gradient(90deg, var(--col-moss), var(--col-dew))',
            borderRadius: '9999px',
            boxShadow: '0 0 10px rgba(122,158,56,0.4)',
            transition: 'width 0.12s ease',
          }}
        />

        {/* Thumb indicator (visual only — native input handles interaction) */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: `${pct}%`,
            transform: 'translate(-50%, -50%)',
            width: '18px',
            height: '18px',
            borderRadius: '50%',
            background: 'var(--col-surface)',
            border: '1.5px solid var(--col-sage)',
            boxShadow: '0 0 0 3px rgba(122,158,56,0.15), 0 2px 8px rgba(0,0,0,0.5)',
            pointerEvents: 'none',
            transition: 'left 0.12s ease',
          }}
        />

        {/* Invisible native input */}
        <input
          type="range"
          min={min}
          max={max}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            opacity: 0,
            zIndex: 2,
          }}
        />
      </div>

      {/* Min / Max labels */}
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        {[min, max].map((v) => (
          <span
            key={v}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.58rem',
              color: 'var(--col-shadow)',
              letterSpacing: '0.1em',
            }}
          >
            {v}°
          </span>
        ))}
      </div>

    </div>
  );
}