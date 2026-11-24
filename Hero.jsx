import { motion } from 'framer-motion';
import ParticleField from './ParticleField';
import { opening } from '../config/content';

const easeCinematic = [0.16, 1, 0.3, 1];

export default function Hero({ onBegin, reducedMotion }) {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden px-6 text-center"
    >
      {/* warm sun rays */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 60% 45% at 78% 18%, rgba(255,178,107,0.18) 0%, transparent 60%)',
        }}
      />

      <ParticleField type="heart" count={10} color="text-[var(--c-ember)]/70" reducedMotion={reducedMotion} />
      <ParticleField type="sparkle" count={14} color="text-[var(--c-gold)]/50" reducedMotion={reducedMotion} />

      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 1, ease: easeCinematic }}
        className="relative z-10 mb-5 text-xs uppercase tracking-[0.45em] text-[var(--c-gold-soft)]"
      >
        {opening.eyebrow}
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.55, duration: 1.2, ease: easeCinematic }}
        className="glow-gold relative z-10 font-display text-5xl leading-tight text-[var(--c-cream)] sm:text-6xl md:text-7xl"
      >
        {opening.title}
        <br />
        <span className="italic text-[var(--c-sunset)]">{opening.subtitle}</span>
      </motion.h1>

      <motion.button
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1, duration: 1, ease: easeCinematic }}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.97 }}
        onClick={onBegin}
        className="glow-sunset glass relative z-10 mt-14 rounded-full border border-[var(--c-gold)]/40 px-10 py-4 font-body text-sm uppercase tracking-[0.25em] text-[var(--c-cream)] transition-colors hover:bg-white/10"
      >
        {opening.cta}
      </motion.button>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{ opacity: { delay: 1.6, duration: 1 }, y: { duration: 2.2, repeat: Infinity, ease: 'easeInOut' } }}
        className="absolute bottom-10 z-10 flex flex-col items-center gap-2 text-[var(--c-muted)]"
      >
        <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
        <div className="h-8 w-[1px] bg-gradient-to-b from-[var(--c-gold)] to-transparent" />
      </motion.div>
    </section>
  );
}
