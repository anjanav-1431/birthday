import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ending } from '../config/content';

const LINE_HOLD_MS = 2200;

export default function EndingScene({ onComplete }) {
  const [index, setIndex] = useState(0);
  const [showSignature, setShowSignature] = useState(false);

  useEffect(() => {
    if (index >= ending.lines.length) {
      const t = setTimeout(() => setShowSignature(true), 400);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setIndex((i) => i + 1), LINE_HOLD_MS);
    return () => clearTimeout(t);
  }, [index]);

  useEffect(() => {
    if (!showSignature) return;
    const t = setTimeout(onComplete, 3200);
    return () => clearTimeout(t);
  }, [showSignature, onComplete]);

  return (
    <div className="fixed inset-0 z-[97] flex flex-col items-center justify-center bg-black px-6">
      <AnimatePresence mode="wait">
        {!showSignature && (
          <motion.p
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="glow-gold text-center font-display text-3xl italic text-[var(--c-cream)] sm:text-4xl"
          >
            {ending.lines[index]}
          </motion.p>
        )}
      </AnimatePresence>

      {showSignature && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.4 }}
          className="text-center"
        >
          <p className="mb-2 font-display text-lg italic text-[var(--c-cream-dim)]">{ending.foreverLabel}</p>
          <p className="glow-gold font-display text-3xl text-[var(--c-gold)]">{ending.signature}</p>
        </motion.div>
      )}
    </div>
  );
}
