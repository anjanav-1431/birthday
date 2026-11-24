import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles } from 'lucide-react';

export default function MilestoneToast({ milestone, onDismiss }) {
  return (
    <AnimatePresence>
      {milestone && (
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.97 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="glass glow-sunset fixed left-1/2 top-6 z-[90] flex w-[92%] max-w-sm -translate-x-1/2 items-start gap-3 rounded-2xl border border-[var(--c-gold)]/40 px-5 py-4"
          role="status"
        >
          <Sparkles size={18} className="mt-0.5 shrink-0 text-[var(--c-gold)]" />
          <div className="min-w-0">
            <p className="mb-1 font-display text-sm text-[var(--c-gold-soft)]">
              A golden memory unlocked in the jar
            </p>
            <p className="text-xs leading-relaxed text-[var(--c-cream-dim)]">{milestone.intro}</p>
          </div>
          <button
            onClick={onDismiss}
            aria-label="Dismiss"
            className="ml-auto shrink-0 text-[var(--c-muted)] hover:text-[var(--c-cream)]"
          >
            ×
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
