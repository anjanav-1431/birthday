import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { typingScript } from '../config/content';

const CHAR_DELAY = 45;
const LINE_PAUSE = 1000;
const HOLD_LAST_MS = 3000;

export default function TypingScene({ onComplete, reducedMotion }) {
  const [lineIndex, setLineIndex] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (lineIndex >= typingScript.length) {
      const t = setTimeout(() => {
        setDone(true);
        setTimeout(onComplete, HOLD_LAST_MS);
      }, 200);
      return () => clearTimeout(t);
    }

    const line = typingScript[lineIndex];

    if (reducedMotion) {
      setDisplayed(line);
      const t = setTimeout(() => setLineIndex((i) => i + 1), LINE_PAUSE);
      return () => clearTimeout(t);
    }

    let charIndex = 0;
    setDisplayed('');
    const interval = setInterval(() => {
      charIndex += 1;
      setDisplayed(line.slice(0, charIndex));
      if (charIndex >= line.length) {
        clearInterval(interval);
        setTimeout(() => setLineIndex((i) => i + 1), LINE_PAUSE);
      }
    }, CHAR_DELAY);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lineIndex, reducedMotion]);

  const isLastLine = lineIndex === typingScript.length - 1;

  return (
    <div className="fixed inset-0 z-[95] flex items-center justify-center bg-[var(--c-void)] px-6">
      <motion.p
        key={lineIndex}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className={`blink-cursor max-w-xl text-center font-display italic text-[var(--c-cream)] ${
          isLastLine && done ? 'glow-gold text-6xl sm:text-7xl' : 'text-2xl sm:text-3xl'
        }`}
      >
        {displayed}
      </motion.p>
    </div>
  );
}
