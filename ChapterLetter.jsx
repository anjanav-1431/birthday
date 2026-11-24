import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { loveLetter } from '../config/content';

const easeCinematic = [0.16, 1, 0.3, 1];

export default function ChapterLetter({ onReadingChange }) {
  const [stage, setStage] = useState('closed'); // closed → lifting → open → reading

  const openEnvelope = () => {
    if (stage !== 'closed') return;
    setStage('lifting');
    onReadingChange?.(true);
    setTimeout(() => setStage('open'), 1400);
  };

  const closeLetter = () => {
    setStage('closed');
    onReadingChange?.(false);
  };

  return (
    <section
      id="chapter-letter"
      className="relative flex min-h-screen w-full flex-col items-center justify-center px-6 py-32"
    >
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.9, ease: easeCinematic }}
        className="mb-2 text-xs uppercase tracking-[0.4em] text-[var(--c-gold-soft)]"
      >
        Chapter Three
      </motion.p>
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.9, ease: easeCinematic, delay: 0.1 }}
        className="mb-16 font-display text-4xl text-[var(--c-cream)] sm:text-5xl"
      >
        A Letter For You
      </motion.h2>

      {/* Envelope */}
      <AnimatePresence>
        {stage !== 'open' && (
          <motion.button
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.6 }}
            onClick={openEnvelope}
            aria-label="Open the letter"
            className="relative"
          >
            <motion.div
              animate={stage === 'lifting' ? { y: -24, rotate: -1 } : { y: [0, -6, 0] }}
              transition={
                stage === 'lifting'
                  ? { duration: 0.7, ease: easeCinematic }
                  : { duration: 4, repeat: Infinity, ease: 'easeInOut' }
              }
              className="glass glow-sunset relative flex h-48 w-72 items-center justify-center rounded-lg border border-[var(--c-gold)]/30 sm:h-56 sm:w-80"
              style={{
                background: 'linear-gradient(160deg, rgba(74,31,77,0.5), rgba(20,11,40,0.6))',
              }}
            >
              {/* envelope flap */}
              <div
                className="absolute left-0 top-0 h-0 w-0"
                style={{
                  borderLeft: '144px solid transparent',
                  borderRight: '144px solid transparent',
                  borderTop: '80px solid rgba(255,122,69,0.16)',
                }}
              />
              {/* wax seal */}
              <motion.div
                animate={stage === 'lifting' ? { scale: [1, 1.2, 0], rotate: 25 } : { scale: 1 }}
                transition={{ duration: 0.8, ease: easeCinematic }}
                className="glow-sunset relative z-10 flex h-14 w-14 items-center justify-center rounded-full text-[var(--c-cream)]"
                style={{ background: 'radial-gradient(circle at 35% 30%, #ff8f5c, #b8342f)' }}
              >
                <span className="font-display text-lg italic">A</span>
              </motion.div>
              <p className="absolute bottom-5 text-xs uppercase tracking-[0.3em] text-[var(--c-cream-dim)]">
                Tap to open
              </p>
            </motion.div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Letter, unfolded */}
      <AnimatePresence>
        {stage === 'open' && (
          <motion.div
            initial={{ opacity: 0, y: 60, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 1, ease: easeCinematic }}
            className="glass relative w-full max-w-xl rounded-2xl border border-[var(--c-gold)]/25 px-8 py-12 sm:px-12"
            style={{ background: 'rgba(20,11,40,0.55)' }}
          >
            <p className="mb-6 font-display text-xl italic text-[var(--c-gold-soft)]">{loveLetter.salutation}</p>
            <div className="flex flex-col gap-5">
              {loveLetter.paragraphs.map((p, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.35, duration: 0.8, ease: easeCinematic }}
                  className="font-display text-lg font-light leading-relaxed text-[var(--c-cream)]"
                >
                  {p}
                </motion.p>
              ))}
            </div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 + loveLetter.paragraphs.length * 0.35 + 0.3, duration: 0.8 }}
              className="blink-cursor mt-10 font-display text-lg italic text-[var(--c-cream-dim)]"
            >
              {loveLetter.signOff} {loveLetter.signature}
            </motion.p>

            <button
              onClick={closeLetter}
              className="mt-10 rounded-full border border-white/15 px-6 py-2 text-xs uppercase tracking-[0.25em] text-[var(--c-cream-dim)] transition-colors hover:bg-white/10"
            >
              Close letter
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
