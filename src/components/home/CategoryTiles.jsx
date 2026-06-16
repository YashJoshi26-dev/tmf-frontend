import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

import BanarsiImg   from '@/assets/Banarasi.png';
import RajputaniImg from '@/assets/Rajputani.png';
import PatolaImg    from '@/assets/Patola.png';
import LehengaImg   from '@/assets/lehnga.png';
import BridalImg    from '@/assets/Bridal_saree.png';
import PashminaImg  from '@/assets/Pashmina_saree.png';

const TILES = [
  { label: 'Banarasi',     image: BanarsiImg,   to: '/category/Sarees/banarasi' },
  { label: 'Rajputani',    image: RajputaniImg, to: '/category/rajputani' },
  { label: 'Patola',       image: PatolaImg,    to: '/category/Sarees/patola' },
 { label: 'Lehenga', image: LehengaImg, to: '/category/Lehengas' },
  { label: 'Bridal Saree', image: BridalImg,    to: '/bridal' },
  { label: 'Pashmina',     image: PashminaImg,  to: '/category/Sarees/pashmina' },
];

const CARD_W = 300;
const CARD_H = 400;

const ThreeDotLoader = ({ size = 10 }) => {
  const colors = ['#4285F4', '#EA4335', '#FBBC05', '#34A853', '#4285F4'];
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', marginBottom: '24px' }}>
      {colors.map((color, idx) => (
        <span
          key={idx}
          style={{
            width: size,
            height: size,
            borderRadius: '50%',
            backgroundColor: color,
            display: 'inline-block',
            animation: 'three-dot-bounce 1.4s infinite ease-in-out both',
            animationDelay: `${idx * 0.16}s`,
          }}
        />
      ))}
      <style>{`
        @keyframes three-dot-bounce {
          0%, 80%, 100% { transform: scale(0); opacity: 0.4; }
          40% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export const CategoryTiles = () => (
  <section style={{ padding: '64px 0 96px' }}>
    <ThreeDotLoader />

    <div style={{ textAlign: 'center', marginBottom: '48px' }}>
      <p className="eyebrow">Browse by Style</p>
      <h2 className="heading-display" style={{ marginTop: '12px' }}>Shop by Category</h2>
    </div>

    {/* Row 1 */}
    <div style={{ display: 'flex', justifyContent: 'center', gap: '38px', flexWrap: 'wrap', padding: '0 16px', marginBottom: '38px' }}>
      {TILES.slice(0, 3).map((t, i) => <Card key={t.label} t={t} i={i} />)}
    </div>

    {/* Row 2 */}
    <div style={{ display: 'flex', justifyContent: 'center', gap: '38px', flexWrap: 'wrap', padding: '0 16px' }}>
      {TILES.slice(3).map((t, i) => <Card key={t.label} t={t} i={i + 3} />)}
    </div>
  </section>
);

const Card = ({ t, i }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.55, delay: i * 0.08 }}
    style={{ flexShrink: 0, width: `${CARD_W}px` }}
  >
    <Link to={t.to} className="group" style={{ display: 'block' }}>
      <div style={{
        width: `${CARD_W}px`,
        height: `${CARD_H}px`,
        borderRadius: '150px 150px 18px 18px',
        border: '2px solid #E5C46B',
        overflow: 'hidden',
        position: 'relative',
        cursor: 'pointer',
      }}>
        <img
          src={t.image}
          alt={t.label}
          loading="lazy"
          style={{
            width: '100%', height: '100%',
            objectFit: 'cover', objectPosition: 'top center',
            display: 'block',
            transition: 'transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          }}
          className="group-hover:scale-[1.04]"
        />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to top, rgba(0,0,0,0.58) 0%, rgba(0,0,0,0.18) 40%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', bottom: '32px',
          left: 0, right: 0, textAlign: 'center', pointerEvents: 'none',
        }}>
          <span style={{
            display: 'block', color: '#ffffff',
            fontFamily: "'Cormorant Garamond', 'Playfair Display', Georgia, serif",
            fontSize: '28px', fontWeight: '500', fontStyle: 'italic',
            letterSpacing: '0.03em', lineHeight: '1.25',
            textShadow: '0 2px 8px rgba(0,0,0,0.35)',
          }}>
            {t.label}
          </span>
        </div>
      </div>
    </Link>
  </motion.div>
);