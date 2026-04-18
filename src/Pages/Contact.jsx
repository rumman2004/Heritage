import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import toast, { Toaster } from 'react-hot-toast';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import TextArea from '../components/ui/TextArea';
import FloatingLeaf from '../components/3d/FloatingLeaf';

const CONTACT_ITEMS = [
  { label: 'Address',   value: 'NorthEast Assam, India' },
  { label: 'Email',     value: 'hello@heritage-estate.com'                  },
  { label: 'Enquiries', value: 'Wholesale · Private Tasting · Press'       },
];

export default function Contact() {
  const pageRef = useRef(null);
  const [fields, setFields] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | sending | sent

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.contact-left > *',
        { y: 36, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.1, stagger: 0.12, ease: 'power3.out', delay: 0.1 }
      );
      gsap.fromTo('.contact-form-wrap',
        { y: 36, opacity: 0, scale: 0.98 },
        { y: 0, opacity: 1, scale: 1, duration: 1.1, ease: 'power3.out', delay: 0.3 }
      );
    }, pageRef.current);
    return () => ctx.revert();
  }, []);

  const handleChange = (e) => setFields(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('sending');

    // Create a promise to simulate the network request
    const sendPromise = new Promise((resolve) => setTimeout(resolve, 1600));

    // Use toast.promise for automatic loading, success, and error states
    toast.promise(
      sendPromise,
      {
        loading: 'Sending message...',
        success: 'Message sent successfully!',
        error: 'Failed to send message.'
      },
      {
        style: {
          minWidth: '250px',
          background: 'rgba(20, 20, 20, 0.9)',
          backdropFilter: 'blur(10px)',
          color: '#fff',
          border: '1px solid rgba(255,255,255,0.1)',
          fontFamily: 'var(--font-ui)',
          fontSize: '0.85rem',
          letterSpacing: '0.05em'
        },
        success: {
          iconTheme: {
            primary: 'var(--col-sage)', // Your tea green color
            secondary: '#000',
          },
        },
      }
    ).then(() => {
      // After the toast finishes, update the UI to show the "Sent" screen
      setStatus('sent');
    });
  };

  return (
    <div
      ref={pageRef}
      className="page-enter"
      style={{ background: 'var(--col-void)', color: 'var(--col-white)', minHeight: '100vh' }}
    >
      {/* ── Add the Toaster component so the toasts actually render ── */}
      <Toaster position="bottom-right" />

      <section style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex', alignItems: 'center',
        padding: 'clamp(7rem, 12vw, 10rem) clamp(1.5rem, 5vw, 4rem)',
        overflow: 'hidden',
      }}>
        <FloatingLeaf count={9} opacity={0.08} />

        {/* Background glow */}
        <div style={{
          position: 'absolute', top: '40%', left: '30%',
          transform: 'translate(-50%,-50%)',
          width: '50vw', height: '50vw', maxWidth: '700px',
          background: 'radial-gradient(circle, rgba(61,80,22,0.12) 0%, transparent 65%)',
          filter: 'blur(80px)', pointerEvents: 'none',
        }} />

        <div style={{
          maxWidth: '80rem', margin: '0 auto', width: '100%',
          display: 'grid', gridTemplateColumns: '1fr', gap: 'clamp(3rem, 6vw, 6rem)', alignItems: 'start',
          position: 'relative', zIndex: 1,
        }} className="contact-grid">

          {/* ── Left column ── */}
          <div className="contact-left" style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>

            {/* Tag */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ width: '2rem', height: '1px', background: 'var(--col-sage)' }} />
              <span style={{ fontFamily: 'var(--font-ui)', fontSize: '0.6rem', fontWeight: 400, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--col-sage)' }}>
                Get in Touch
              </span>
            </div>

            {/* Headline */}
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 6vw, 6rem)', fontWeight: 300, lineHeight: 0.95, letterSpacing: '-0.01em', color: 'var(--col-white)' }}>
              Connect
              <br />
              <em style={{ color: 'rgba(255,255,255,0.3)', fontStyle: 'italic' }}>With the Estate</em>
            </h1>

            {/* Intro */}
            <p style={{ fontFamily: 'var(--font-ui)', fontSize: 'clamp(0.9rem, 1.1vw, 1.05rem)', fontWeight: 300, lineHeight: 1.8, color: 'var(--col-mist)', maxWidth: '38ch' }}>
              We welcome wholesale enquiries, private tasting appointments at our Sivasagar estate, and press collaborations.
            </p>

            {/* Contact items */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
              {CONTACT_ITEMS.map(({ label, value }, i) => (
                <div
                  key={label}
                  style={{
                    display: 'flex', flexDirection: 'column', gap: '0.35rem',
                    padding: '1.25rem 0',
                    borderTop: i === 0 ? '1px solid var(--col-border)' : 'none',
                    borderBottom: '1px solid var(--col-border)',
                  }}
                >
                  <span style={{ fontFamily: 'var(--font-ui)', fontSize: '0.57rem', fontWeight: 400, letterSpacing: '0.28em', textTransform: 'uppercase', color: 'var(--col-stone)' }}>
                    {label}
                  </span>
                  <span style={{ fontFamily: 'var(--font-ui)', fontSize: '0.88rem', fontWeight: 300, color: 'var(--col-mist)', lineHeight: 1.5 }}>
                    {value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* ── Right column — form ── */}
          <div
            className="contact-form-wrap"
            style={{
              padding:       'clamp(2rem, 3.5vw, 3.5rem)',
              borderRadius:  'var(--r-xl)',
              border:        '1px solid var(--col-border)',
              background:    'rgba(255,255,255,0.025)',
              backdropFilter: 'blur(28px)',
              position:      'relative',
              overflow:      'hidden',
            }}
          >
            {/* Top sheen */}
            <div style={{ position: 'absolute', top: 0, left: '10%', right: '10%', height: '1px', background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)' }} />
            {/* Left accent */}
            <div style={{ position: 'absolute', top: 0, left: 0, width: '2px', height: '60%', background: 'linear-gradient(to bottom, var(--col-sage), transparent)', borderRadius: '2px 0 0 0' }} />

            {status === 'sent' ? (
              /* ── Sent state ── */
              <div style={{ textAlign: 'center', padding: '4rem 0', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}>
                <div style={{ width: '56px', height: '56px', borderRadius: '50%', border: '1.5px solid var(--col-sage)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ color: 'var(--col-sage)', fontSize: '1.2rem' }}>✓</span>
                </div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 300, color: 'var(--col-white)' }}>
                  Message Received
                </h3>
                <p style={{ fontFamily: 'var(--font-ui)', fontSize: '0.88rem', fontWeight: 300, color: 'var(--col-mist)', maxWidth: '30ch', lineHeight: 1.7 }}>
                  We will respond from our estate within 2 business days.
                </p>
              </div>
            ) : (
              /* ── Form ── */
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.5rem, 2.5vw, 2.2rem)', fontWeight: 300, color: 'var(--col-white)', marginBottom: '2.5rem' }}>
                  Send a Message
                </h2>

                {/* Name + Email row */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }} className="form-row">
                  <Input label="Your Name" name="name" type="text" value={fields.name} onChange={handleChange} required />
                  <Input label="Email Address" name="email" type="email" value={fields.email} onChange={handleChange} required />
                </div>

                {/* Subject */}
                <div style={{ marginBottom: '1.5rem' }}>
                  <Input label="Subject" name="subject" type="text" value={fields.subject} onChange={handleChange} />
                </div>

                {/* Message */}
                <div style={{ marginBottom: '2.5rem' }}>
                  <TextArea label="Message" name="message" value={fields.message} onChange={handleChange} required />
                </div>

                {/* Submit */}
                <Button
                  variant="primary"
                  style={{ width: '100%', justifyContent: 'center', opacity: status === 'sending' ? 0.6 : 1, pointerEvents: status === 'sending' ? 'none' : 'auto' }}
                >
                  {status === 'sending' ? 'Sending…' : 'Send Message'}
                </Button>
              </form>
            )}
          </div>

        </div>
      </section>

      <style>{`
        @media (min-width: 768px) {
          .contact-grid { grid-template-columns: 1fr 1.1fr !important; }
        }
        @media (max-width: 500px) {
          .form-row { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}