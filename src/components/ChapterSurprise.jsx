import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { birthdaySurprise } from '../config/content';

const easeCinematic = [0.16, 1, 0.3, 1];

const CONFETTI_COLORS = ['#ff7a45', '#f2b866', '#ff5a5f', '#f6d9a0', '#c48fd8'];

function Confetti({ reducedMotion }) {
  const pieces = Array.from({ length: reducedMotion ? 20 : 60 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
    delay: Math.random() * 1.2,
    duration: Math.random() * 2 + 2.6,
    rotate: Math.random() * 360,
    size: Math.random() * 6 + 5,
  }));
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {pieces.map((p) => (
        <motion.span
          key={p.id}
          className="absolute top-[-5%] rounded-sm"
          style={{ left: `${p.left}%`, width: p.size, height: p.size * 0.4, background: p.color }}
          initial={{ y: 0, opacity: 1, rotate: 0 }}
          animate={{ y: '110vh', opacity: [1, 1, 0], rotate: p.rotate }}
          transition={{ duration: p.duration, delay: p.delay, ease: 'easeIn' }}
        />
      ))}
    </div>
  );
}

function Fireworks({ reducedMotion }) {
  const bursts = Array.from({ length: reducedMotion ? 2 : 5 }, (_, i) => ({
    id: i,
    top: Math.random() * 40 + 10,
    left: Math.random() * 80 + 10,
    delay: i * 0.6 + Math.random() * 0.4,
    color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
  }));
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {bursts.map((b) => (
        <motion.div
          key={b.id}
          className="absolute"
          style={{ top: `${b.top}%`, left: `${b.left}%` }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: [0, 1, 0], scale: [0, 1.3, 1.6] }}
          transition={{ duration: 1.6, delay: b.delay, repeat: Infinity, repeatDelay: 3.5, ease: 'easeOut' }}
        >
          {Array.from({ length: 12 }).map((_, j) => (
            <span
              key={j}
              className="absolute h-8 w-[2px] origin-bottom rounded-full"
              style={{
                background: b.color,
                transform: `rotate(${(360 / 12) * j}deg)`,
                boxShadow: `0 0 6px ${b.color}`,
              }}
            />
          ))}
        </motion.div>
      ))}
    </div>
  );
}

function Balloons({ reducedMotion }) {
  const balloons = Array.from({ length: reducedMotion ? 3 : 7 }, (_, i) => ({
    id: i,
    left: 8 + i * 12 + Math.random() * 5,
    color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
    delay: Math.random() * 2,
    duration: Math.random() * 4 + 10,
  }));
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {balloons.map((b) => (
        <motion.div
          key={b.id}
          className="absolute bottom-[-20%]"
          style={{ left: `${b.left}%` }}
          animate={{ y: ['0%', '-140vh'], x: [0, 20, -10, 0] }}
          transition={{ duration: b.duration, delay: b.delay, repeat: Infinity, ease: 'linear' }}
        >
          <svg width="34" height="44" viewBox="0 0 34 44" fill="none">
            <ellipse cx="17" cy="17" rx="17" ry="19" fill={b.color} opacity="0.85" />
            <line x1="17" y1="36" x2="17" y2="44" stroke={b.color} strokeWidth="1" />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}

export default function ChapterSurprise({ reducedMotion, onEnterSurprise }) {
  const ref = useRef(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !active) {
          setActive(true);
          onEnterSurprise?.();
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [active, onEnterSurprise]);

  return (
    <section
      id="chapter-surprise"
      ref={ref}
      className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden px-6 text-center"
    >
      {active && (
        <>
          <Confetti reducedMotion={reducedMotion} />
          <Fireworks reducedMotion={reducedMotion} />
          <Balloons reducedMotion={reducedMotion} />
        </>
      )}

      <motion.h2
        initial={{ opacity: 0, scale: 0.9 }}
        animate={active ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 1, ease: easeCinematic }}
        className="glow-gold relative z-10 font-display text-5xl text-[var(--c-cream)] sm:text-6xl"
      >
        {birthdaySurprise.title}
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={active ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1, delay: 0.4, ease: easeCinematic }}
        className="relative z-10 mt-6 max-w-lg font-display text-xl italic text-[var(--c-cream-dim)]"
      >
        {birthdaySurprise.message}
      </motion.p>
    </section>
  );
}
