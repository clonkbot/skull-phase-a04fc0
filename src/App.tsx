import { useEffect, useState } from 'react';
import './styles.css';

interface SkullConfig {
  id: number;
  animationClass: string;
  style: React.CSSProperties;
}

const animationClasses = [
  'fade-pulse',
  'glitch-phase',
  'scale-breath',
  'rotate-fade',
  'flicker-chaos',
  'slide-ghost',
  'blur-materialize',
  'chromatic-shift',
  'wave-distort',
  'strobe-flash',
];

function App() {
  const [skulls, setSkulls] = useState<SkullConfig[]>([]);

  useEffect(() => {
    const generateSkulls = () => {
      const newSkulls: SkullConfig[] = [];
      const count = window.innerWidth < 640 ? 6 : 12;

      for (let i = 0; i < count; i++) {
        newSkulls.push({
          id: i,
          animationClass: animationClasses[i % animationClasses.length],
          style: {
            left: `${Math.random() * 80 + 10}%`,
            top: `${Math.random() * 70 + 10}%`,
            fontSize: `${Math.random() * 3 + 2}rem`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${Math.random() * 3 + 2}s`,
          },
        });
      }
      setSkulls(newSkulls);
    };

    generateSkulls();

    const handleResize = () => {
      generateSkulls();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="app-container">
      {/* Noise overlay */}
      <div className="noise-overlay" />

      {/* Gradient orbs for atmosphere */}
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />

      {/* Main centered skull */}
      <div className="main-skull-container">
        <span className="main-skull skull-glow">💀</span>
        <span className="main-skull skull-chromatic">💀</span>
        <span className="main-skull skull-base">💀</span>
      </div>

      {/* Scattered animated skulls */}
      {skulls.map((skull) => (
        <span
          key={skull.id}
          className={`floating-skull ${skull.animationClass}`}
          style={skull.style}
        >
          💀
        </span>
      ))}

      {/* Footer */}
      <footer className="footer">
        <span className="footer-text">
          Requested by <span className="footer-handle">@s1s21s21</span> · Built by <span className="footer-handle">@clonkbot</span>
        </span>
      </footer>
    </div>
  );
}

export default App;
