import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';

export default function MusicToggle({ visible, muted, onToggle }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.5 }}
          onClick={onToggle}
          aria-label={muted ? 'Unmute background music' : 'Mute background music'}
          className="glass fixed bottom-6 left-6 z-50 flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-[var(--c-cream-dim)] transition-colors hover:bg-white/10"
        >
          {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
        </motion.button>
      )}
    </AnimatePresence>
  );
}
