import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

let uid = 0;

export default function ClickHearts({ reducedMotion }) {
  const [hearts, setHearts] = useState([]);
  const lastSpawn = useRef(0);

  useEffect(() => {
    if (reducedMotion) return undefined;

    const onPointerDown = (e) => {
      // Ignore interactive elements so it never fights the real UI
      if (e.target.closest?.('button, a, input, [role="slider"], [role="dialog"]')) return;

      const now = Date.now();
      if (now - lastSpawn.current < 140) return; // gentle throttle
      lastSpawn.current = now;

      const id = uid++;
      const drift = (Math.random() - 0.5) * 40;
      setHearts((prev) => [...prev.slice(-14), { id, x: e.clientX, y: e.clientY, drift }]);
      setTimeout(() => {
        setHearts((prev) => prev.filter((h) => h.id !== id));
      }, 1400);
    };

    window.addEventListener('pointerdown', onPointerDown);
    return () => window.removeEventListener('pointerdown', onPointerDown);
  }, [reducedMotion]);

  if (reducedMotion) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[55]" aria-hidden="true">
      <AnimatePresence>
        {hearts.map((h) => (
          <motion.div
            key={h.id}
            className="absolute text-[var(--c-ember)]"
            style={{ left: h.x - 8, top: h.y - 8, width: 16, height: 16 }}
            initial={{ opacity: 0.9, y: 0, scale: 0.6 }}
            animate={{ opacity: 0, y: -70, scale: 1.1, x: h.drift }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <svg viewBox="0 0 32 29" width="100%" height="100%">
              <path
                d="M16 27C16 27 2 18 2 9.3C2 4.7 5.8 1 10.3 1C13 1 15 2.5 16 5.2C17 2.5 19 1 21.7 1C26.2 1 30 4.7 30 9.3C30 18 16 27 16 27Z"
                fill="currentColor"
              />
            </svg>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
