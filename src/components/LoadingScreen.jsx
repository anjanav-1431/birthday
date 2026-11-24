import { useEffect, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);

  const stars = useMemo(
    () =>
      Array.from({ length: 60 }, (_, i) => ({
        id: i,
        top: Math.random() * 100,
        left: Math.random() * 100,
        size: Math.random() * 2 + 0.5,
        delay: Math.random() * 4,
      })),
    []
  );

  useEffect(() => {
    let raf;
    const start = performance.now();
    const durationMs = 2400;
    const tick = (now) => {
      const t = Math.min(1, (now - start) / durationMs);
      setProgress(Math.floor(t * 100));
      if (t < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setTimeout(() => {
          setVisible(false);
          setTimeout(onComplete, 900);
        }, 350);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center"
          style={{
            background: 'radial-gradient(ellipse at 50% 40%, #1a0e2e 0%, #0a0714 70%)',
          }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* stars */}
          <div className="absolute inset-0 overflow-hidden">
            {stars.map((s) => (
              <motion.div
                key={s.id}
                className="absolute rounded-full bg-[var(--c-gold-soft)]"
                style={{ top: `${s.top}%`, left: `${s.left}%`, width: s.size, height: s.size }}
                animate={{ opacity: [0.15, 0.9, 0.15] }}
                transition={{ duration: 3 + s.delay, repeat: Infinity, ease: 'easeInOut', delay: s.delay }}
              />
            ))}
          </div>

          {/* glowing heart */}
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: [0.95, 1.08, 0.95], opacity: 1 }}
            transition={{ scale: { duration: 2.6, repeat: Infinity, ease: 'easeInOut' }, opacity: { duration: 1 } }}
            className="relative z-10 mb-8"
          >
            <svg width="64" height="58" viewBox="0 0 64 58" fill="none">
              <defs>
                <filter id="heartGlow" x="-60%" y="-60%" width="220%" height="220%">
                  <feGaussianBlur stdDeviation="6" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
              <path
                filter="url(#heartGlow)"
                d="M32 54C32 54 4 36.5 4 18.5C4 9.4 11.2 3 19.5 3C25 3 29.5 6 32 11C34.5 6 39 3 44.5 3C52.8 3 60 9.4 60 18.5C60 36.5 32 54 32 54Z"
                fill="#f2b866"
              />
            </svg>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="relative z-10 font-display italic text-lg tracking-wide text-[var(--c-cream-dim)]"
          >
            Preparing your surprise...
          </motion.p>

          {/* progress bar */}
          <div className="relative z-10 mt-6 h-[2px] w-48 overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full"
              style={{
                width: `${progress}%`,
                background: 'linear-gradient(90deg, #ff7a45, #f2b866)',
                transition: 'width 0.1s linear',
              }}
            />
          </div>
          <span className="relative z-10 mt-3 text-xs tracking-[0.3em] text-[var(--c-muted)]">
            {progress}%
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
