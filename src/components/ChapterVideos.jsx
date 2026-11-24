import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, X } from 'lucide-react';
import { memoryVideos } from '../config/content';

const easeCinematic = [0.16, 1, 0.3, 1];

function VideoThumb({ clip, onOpen }) {
  const videoRef = useRef(null);

  return (
    <motion.button
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, ease: easeCinematic }}
      whileHover={{ y: -6 }}
      onClick={() => onOpen(clip)}
      onMouseEnter={() => videoRef.current?.play().catch(() => {})}
      onMouseLeave={() => videoRef.current?.pause()}
      className="glass group relative aspect-video overflow-hidden rounded-2xl border border-white/10"
      aria-label={`Play video: ${clip.caption}`}
    >
      <video
        ref={videoRef}
        src={clip.src}
        muted
        loop
        playsInline
        preload="metadata"
        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
      <span className="glass glow-sunset absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-[var(--c-gold)]/50 text-[var(--c-gold)] transition-transform group-hover:scale-110">
        <Play size={18} className="ml-0.5" />
      </span>
      <p className="absolute bottom-3 left-3 right-3 text-left text-xs text-[var(--c-cream-dim)]">
        {clip.caption}
      </p>
    </motion.button>
  );
}

export default function ChapterVideos() {
  const [active, setActive] = useState(null);

  useEffect(() => {
    if (!active) return undefined;
    const onKey = (e) => e.key === 'Escape' && setActive(null);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [active]);

  if (!memoryVideos?.length) return null;

  return (
    <section id="chapter-videos" className="relative mx-auto w-full max-w-6xl px-6 py-32">
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.9, ease: easeCinematic }}
        className="mb-2 text-center text-xs uppercase tracking-[0.4em] text-[var(--c-gold-soft)]"
      >
        A Few Unedited Moments
      </motion.p>
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.9, ease: easeCinematic, delay: 0.1 }}
        className="mb-6 text-center font-display text-4xl text-[var(--c-cream)] sm:text-5xl"
      >
        Just Us, Unfiltered
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.9, delay: 0.2 }}
        className="mx-auto mb-16 max-w-xl text-center font-display text-lg italic text-[var(--c-cream-dim)]"
      >
        No editing, no filters — just the real, small moments worth keeping.
      </motion.p>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {memoryVideos.map((clip) => (
          <VideoThumb key={clip.id} clip={clip} onOpen={setActive} />
        ))}
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[80] flex items-center justify-center bg-black/90 px-6 backdrop-blur-2xl"
            onClick={() => setActive(null)}
            role="dialog"
            aria-modal="true"
          >
            <button
              onClick={() => setActive(null)}
              className="absolute right-6 top-6 rounded-full p-2 text-[var(--c-cream)] hover:bg-white/10"
              aria-label="Close video"
            >
              <X size={26} />
            </button>
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.45, ease: easeCinematic }}
              onClick={(e) => e.stopPropagation()}
              className="flex w-full max-w-3xl flex-col items-center"
            >
              <video
                src={active.src}
                controls
                autoPlay
                playsInline
                className="max-h-[75vh] w-full rounded-xl object-contain shadow-2xl"
              />
              <p className="mt-6 text-center font-display text-lg italic text-[var(--c-cream-dim)]">
                {active.caption}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
