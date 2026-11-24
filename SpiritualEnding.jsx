import { useState } from 'react';
import { motion } from 'framer-motion';
import { spiritualEnding } from '../config/content';
import PeacockFeather from './PeacockFeather';

export default function SpiritualEnding({ reducedMotion }) {
  const [showReturn, setShowReturn] = useState(false);

  const reliveStory = () => {
    document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.6 }}
      onAnimationComplete={() => setTimeout(() => setShowReturn(true), 3500)}
      className="relative flex min-h-screen w-full flex-col items-center justify-center bg-black px-6 py-24"
    >
      <div className="mb-4">
        <PeacockFeather reducedMotion={reducedMotion} />
      </div>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4, duration: 1.4 }}
        className="max-w-sm text-center font-display text-lg italic text-[var(--c-cream-dim)]"
      >
        {spiritualEnding.line}
      </motion.p>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.4, duration: 1.4 }}
        className="glow-gold mt-4 text-center font-display text-2xl text-[var(--c-gold)]"
      >
        {spiritualEnding.dedication}
      </motion.p>

      {showReturn && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.6 }}
          onClick={reliveStory}
          className="mt-16 rounded-full border border-white/10 px-6 py-2 text-[10px] uppercase tracking-[0.3em] text-[var(--c-muted)] transition-colors hover:border-[var(--c-gold)]/40 hover:text-[var(--c-gold-soft)]"
        >
          Relive the story
        </motion.button>
      )}
    </motion.div>
  );
}
