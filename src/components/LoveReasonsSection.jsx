import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Heart } from 'lucide-react';
import { loveReasons } from '../config/content';

const easeCinematic = [0.16, 1, 0.3, 1];
const { reasons } = loveReasons;

export default function LoveReasonsSection({ onRead, readCount, totalCount }) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [ribbonUntied, setRibbonUntied] = useState(false);
  const [showBurst, setShowBurst] = useState(false);
  const touchStartX = useRef(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    onRead(0);
  }, [onRead]);

  const goTo = (newIndex) => {
    if (newIndex < 0 || newIndex >= reasons.length) return;
    setDirection(newIndex > index ? 1 : -1);
    setIndex(newIndex);
    onRead(newIndex);
    setShowBurst(true);
    setTimeout(() => setShowBurst(false), 700);
  };

  const next = () => goTo(index + 1);
  const prev = () => goTo(index - 1);

  useEffect(() => {
    const onKey = (e) => {
      const rect = sectionRef.current?.getBoundingClientRect();
      if (!rect || rect.top > window.innerHeight * 0.6 || rect.bottom < window.innerHeight * 0.4) return;
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);

  const onTouchStart = (e) => (touchStartX.current = e.touches[0].clientX);
  const onTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (delta < -50) next();
    if (delta > 50) prev();
    touchStartX.current = null;
  };

  return (
    <section
      id="love-reasons"
      ref={sectionRef}
      className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden px-6 py-32"
    >
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.9, ease: easeCinematic }}
        className="mb-2 text-center text-xs uppercase tracking-[0.4em] text-[var(--c-gold-soft)]"
      >
        {loveReasons.eyebrow}
      </motion.p>
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.9, ease: easeCinematic, delay: 0.1 }}
        className="mb-3 text-center font-display text-4xl text-[var(--c-cream)] sm:text-5xl"
      >
        {loveReasons.title}
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.9, delay: 0.2 }}
        onViewportEnter={() => setTimeout(() => setRibbonUntied(true), 500)}
        className="mb-12 max-w-md text-center font-display text-lg italic text-[var(--c-cream-dim)]"
      >
        {loveReasons.subtitle}
      </motion.p>

      {/* ribbon intro */}
      <AnimatePresence>
        {!ribbonUntied && (
          <motion.div
            exit={{ opacity: 0, scaleX: 0, transition: { duration: 0.7, ease: easeCinematic } }}
            className="mb-[-1px] h-1 w-40 rounded-full"
            style={{ background: 'linear-gradient(90deg, #ff7a45, #f2b866)' }}
          />
        )}
      </AnimatePresence>

      {/* card stack */}
      <div
        className="relative flex h-80 w-full max-w-sm items-center justify-center sm:h-72"
        style={{ perspective: 1200 }}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {/* stacked cards peeking behind, for depth */}
        <div className="paper-texture absolute h-64 w-full max-w-xs rounded-2xl opacity-40" style={{ transform: 'translateY(10px) rotate(-4deg)' }} />
        <div className="paper-texture absolute h-64 w-full max-w-xs rounded-2xl opacity-60" style={{ transform: 'translateY(5px) rotate(3deg)' }} />

        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={index}
            custom={direction}
            initial={{ opacity: 0, rotateY: direction * 90, scale: 0.9 }}
            animate={{ opacity: 1, rotateY: 0, scale: 1 }}
            exit={{ opacity: 0, rotateY: -direction * 90, scale: 0.9 }}
            transition={{ duration: 0.55, ease: easeCinematic }}
            className="paper-texture relative flex h-64 w-full max-w-xs flex-col items-center justify-center rounded-2xl px-7 py-8 text-center"
            style={{ transformStyle: 'preserve-3d' }}
          >
            <Heart size={14} className="absolute left-4 top-4 text-[#c48a4a]/60" fill="currentColor" />
            <Heart size={14} className="absolute bottom-4 right-4 text-[#c48a4a]/60" fill="currentColor" />
            <p className="mb-3 font-display text-xs uppercase tracking-[0.25em] text-[#8a5a22]">
              Reason #{index + 1}
            </p>
            <p className="font-hand text-2xl leading-snug text-[#3a2510] sm:text-3xl">{reasons[index]}</p>
          </motion.div>
        </AnimatePresence>

        {/* floating hearts burst after each flip */}
        <AnimatePresence>
          {showBurst && (
            <>
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  className="pointer-events-none absolute text-[var(--c-ember)]"
                  style={{ left: `${40 + i * 10}%`, bottom: '20%' }}
                  initial={{ opacity: 0.9, y: 0, scale: 0.6 }}
                  animate={{ opacity: 0, y: -70 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.9, delay: i * 0.08, ease: 'easeOut' }}
                >
                  <svg width="14" height="13" viewBox="0 0 32 29" fill="currentColor">
                    <path d="M16 27C16 27 2 18 2 9.3C2 4.7 5.8 1 10.3 1C13 1 15 2.5 16 5.2C17 2.5 19 1 21.7 1C26.2 1 30 4.7 30 9.3C30 18 16 27 16 27Z" />
                  </svg>
                </motion.span>
              ))}
            </>
          )}
        </AnimatePresence>
      </div>

      {/* controls */}
      <div className="mt-10 flex items-center gap-6">
        <button
          onClick={prev}
          disabled={index === 0}
          aria-label="Previous reason"
          className="glass flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-[var(--c-cream-dim)] transition-colors hover:bg-white/10 disabled:opacity-30"
        >
          <ChevronLeft size={20} />
        </button>
        <p className="min-w-[110px] text-center text-xs uppercase tracking-[0.2em] text-[var(--c-muted)]">
          Reason {index + 1} / {reasons.length}
        </p>
        <button
          onClick={next}
          disabled={index === reasons.length - 1}
          aria-label="Next reason"
          className="glass glow-sunset flex h-11 w-11 items-center justify-center rounded-full border border-[var(--c-gold)]/40 text-[var(--c-gold)] transition-colors hover:bg-white/10 disabled:opacity-30"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {readCount < totalCount && (
        <p className="mt-6 text-[11px] uppercase tracking-[0.25em] text-[var(--c-muted)]">
          {readCount} / {totalCount} reasons discovered
        </p>
      )}
    </section>
  );
}
