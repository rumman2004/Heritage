import Navbar from './Navbar';
import Footer from './Footer';
import CustomCursor from '../ui/CustomCursor';

export default function MainLayout({ children }) {
  return (
    <div
      style={{
        position: 'relative',
        minHeight: '100vh',
        width: '100%',
        overflowX: 'hidden',
        background: 'var(--col-void)',
      }}
    >
      {/* Smooth custom cursor — desktop only */}
      <CustomCursor />

      {/* Persistent top navigation */}
      <Navbar />

      {/* Page content */}
      <main style={{ position: 'relative', zIndex: 10, width: '100%' }}>
        {children}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}