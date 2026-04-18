import { useState } from 'react';

export default function Input({ label, name, type = 'text', value, onChange, required }) {
  const [focused, setFocused] = useState(false);
  const hasVal = value.length > 0;

  return (
    <div style={{ position: 'relative', paddingTop: '1.25rem' }}>
      <label style={{
        position:      'absolute',
        top:           focused || hasVal ? '0' : '1.7rem',
        left:          0,
        fontFamily:    'var(--font-ui)',
        fontSize:      focused || hasVal ? '0.55rem' : '0.65rem',
        fontWeight:    400,
        letterSpacing: '0.22em',
        textTransform: 'uppercase',
        color:         focused ? 'var(--col-sage)' : 'var(--col-stone)',
        transition:    'all 0.25s ease',
        pointerEvents: 'none',
      }}>
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        required={required}
        style={{
          width: '100%',
          background: 'transparent',
          border: 'none',
          borderBottom: `1px solid ${focused ? 'var(--col-sage)' : 'rgba(255,255,255,0.1)'}`,
          color: 'var(--col-white)',
          fontFamily: 'var(--font-ui)',
          fontSize: '0.85rem',
          padding: '0.5rem 0',
          outline: 'none',
          transition: 'border-color 0.3s ease',
          boxShadow: 'none',
        }}
      />
    </div>
  );
}