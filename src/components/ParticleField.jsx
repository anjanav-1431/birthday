import { useMemo } from 'react';
import { motion } from 'framer-motion';

const VARIANTS = {
  heart: () => (
    <svg viewBox="0 0 32 29" width="100%" height="100%">
      <path
        d="M16 27C16 27 2 18 2 9.3C2 4.7 5.8 1 10.3 1C13 1 15 2.5 16 5.2C17 2.5 19 1 21.7 1C26.2 1 30 4.7 30 9.3C30 18 16 27 16 27Z"
        fill="currentColor"
      />
    </svg>
  ),
  firefly: () => <div className="h-full w-full rounded-full bg-current" />,
  sparkle: () => (
    <svg viewBox="0 0 24 24" width="100%" height="100%">
      <path d="M12 0L14 10L24 12L14 14L12 24L10 14L0 12L10 10Z" fill="currentColor" />
    </svg>
  ),
};

/**
 * type: 'heart' | 'firefly' | 'sparkle'
 * count: number of particles
 * color: tailwind text-color class controlling `currentColor`
 */
export default function ParticleField({ type = 'firefly', count = 18, color = 'text-[var(--c-gold)]', reducedMotion }) {
  const particles = useMemo(
    () =>
      Array.from({ length: reducedMotion ? Math.min(6, count) : count }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        size: type === 'firefly' ? Math.random() * 3 + 2 : Math.random() * 14 + 8,
        duration: Math.random() * 10 + 12,
        delay: Math.random() * 10,
        drift: (Math.random() - 0.5) * 120,
        opacity: Math.random() * 0.4 + 0.35,
      })),
    [type, count, reducedMotion]
  );

  const Shape = VARIANTS[type] || VARIANTS.firefly;

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${color}`} aria-hidden="true">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute bottom-0"
          style={{ left: `${p.left}%`, width: p.size, height: p.size, opacity: p.opacity }}
          animate={
            reducedMotion
              ? { opacity: [p.opacity, p.opacity] }
              : {
                  y: ['0%', '-120vh'],
                  x: [0, p.drift],
                  opacity: [0, p.opacity, p.opacity, 0],
                }
          }
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          <Shape />
        </motion.div>
      ))}
    </div>
  );
}
