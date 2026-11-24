import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { voiceMessage } from '../config/content';

export default function VoiceMessage({ onStarted, reducedMotion }) {
  const audioRef = useRef(null);
  const [bars] = useState(() => Array.from({ length: 28 }, () => Math.random() * 0.7 + 0.3));

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio
      .play()
      .then(() => onStarted?.())
      .catch(() => {
        // Autoplay blocked — still notify so the sequence can proceed on a delay
        onStarted?.();
      });
  }, [onStarted]);

  return (
    <div className="fixed inset-0 z-[95] flex flex-col items-center justify-center bg-[var(--c-void)] px-6">
      <audio ref={audioRef} src={voiceMessage.audioSrc} />

      <div className="flex h-16 items-end gap-[3px]" aria-hidden="true">
        {bars.map((b, i) => (
          <motion.span
            key={i}
            className="w-[3px] rounded-full bg-gradient-to-t from-[var(--c-sunset)] to-[var(--c-gold)]"
            style={{ height: `${b * 100}%` }}
            animate={reducedMotion ? {} : { scaleY: [0.3, 1, 0.5, 0.9, 0.3] }}
            transition={{ duration: 1.2 + i * 0.03, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 1 }}
        className="mt-8 font-display text-lg italic text-[var(--c-cream-dim)]"
      >
        {voiceMessage.caption}
      </motion.p>
    </div>
  );
}
