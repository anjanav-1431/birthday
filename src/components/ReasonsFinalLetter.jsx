import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { reasonsFinalLetter } from '../config/content';
import ParticleField from './ParticleField';

const easeCinematic = [0.16, 1, 0.3, 1];

export default function ReasonsFinalLetter({ onClose, reducedMotion }) {
  const [opened, setOpened] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-[90] flex items-center justify-center bg-black/90 px-6 backdrop-blur-2xl"
    >
      <ParticleField type="sparkle" count={14} color="text-[var(--c-gold)]/50" reducedMotion={reducedMotion} />

      <button
        onClick={onClose}
        className="absolute right-6 top-6 rounded-full p-2 text-[var(--c-cream)] hover:bg-white/10"
        aria-label="Close letter"
      >
        <X size={26} />
      </button>

      <AnimatePresence mode="wait">
        {!opened ? (
          <motion.button
            key="envelope"
            exit={{ opacity: 0, scale: 0.9 }}
            onClick={() => setOpened(true)}
            className="relative"
            aria-label="Open the final letter"
          >
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="glass glow-sunset relative flex h-48 w-72 items-center justify-center rounded-lg border border-[var(--c-gold)]/50 sm:h-56 sm:w-80"
              style={{ background: 'linear-gradient(160deg, rgba(74,31,77,0.5), rgba(20,11,40,0.6))' }}
            >
              <div
                className="absolute left-0 top-0 h-0 w-0"
                style={{
                  borderLeft: '144px solid transparent',
                  borderRight: '144px solid transparent',
                  borderTop: '80px solid rgba(242,184,102,0.2)',
                }}
              />
              <div
                className="glow-sunset relative z-10 flex h-14 w-14 items-center justify-center rounded-full text-[var(--c-cream)]"
                style={{ background: 'radial-gradient(circle at 35% 30%, #ffe3ab, #d98f3f)' }}
              >
                <span className="font-display text-lg italic">A</span>
              </div>
              <p className="absolute bottom-5 text-xs uppercase tracking-[0.3em] text-[var(--c-gold-soft)]">
                All 100 reasons · tap to open
              </p>
            </motion.div>
          </motion.button>
        ) : (
          <motion.div
            key="letter"
            initial={{ opacity: 0, y: 50, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1, ease: easeCinematic }}
            className="glass max-h-[80vh] w-full max-w-xl overflow-y-auto rounded-2xl border border-[var(--c-gold)]/30 px-8 py-12 sm:px-12"
            style={{ background: 'rgba(20,11,40,0.6)' }}
          >
            <p className="mb-6 font-display text-xl italic text-[var(--c-gold-soft)]">
              {reasonsFinalLetter.salutation}
            </p>
            <div className="flex flex-col gap-5">
              {reasonsFinalLetter.paragraphs.map((p, i) => (
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
              transition={{ delay: 0.3 + reasonsFinalLetter.paragraphs.length * 0.35 + 0.2, duration: 0.8 }}
              className="mt-8 font-display text-lg italic text-[var(--c-gold-soft)]"
            >
              {reasonsFinalLetter.closing}
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 + reasonsFinalLetter.paragraphs.length * 0.35 + 0.6, duration: 0.8 }}
              className="blink-cursor mt-6 font-display text-lg text-[var(--c-cream-dim)]"
            >
              {reasonsFinalLetter.signature}
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
