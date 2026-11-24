import { useCallback, useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { photos } from '../config/content';
import ParticleField from './ParticleField';

const easeCinematic = [0.16, 1, 0.3, 1];

export default function ChapterGallery({ reducedMotion }) {
  const [activeIndex, setActiveIndex] = useState(null);
  const touchStartX = useRef(null);

  const open = (i) => setActiveIndex(i);
  const close = useCallback(() => setActiveIndex(null), []);
  const prev = useCallback(
    () => setActiveIndex((i) => (i === null ? i : (i - 1 + photos.length) % photos.length)),
    []
  );
  const next = useCallback(
    () => setActiveIndex((i) => (i === null ? i : (i + 1) % photos.length)),
    []
  );

  useEffect(() => {
    if (activeIndex === null) return;
    const onKey = (e) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [activeIndex, close, prev, next]);

  const onTouchStart = (e) => (touchStartX.current = e.touches[0].clientX);
  const onTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (delta > 50) prev();
    if (delta < -50) next();
    touchStartX.current = null;
  };

  return (
    <section id="chapter-gallery" className="relative mx-auto w-full max-w-6xl px-6 py-32">
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.9, ease: easeCinematic }}
        className="mb-2 text-center text-xs uppercase tracking-[0.4em] text-[var(--c-gold-soft)]"
      >
        Chapter Two
      </motion.p>
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.9, ease: easeCinematic, delay: 0.1 }}
        className="mb-16 text-center font-display text-4xl text-[var(--c-cream)] sm:text-5xl"
      >
        Our Memories
      </motion.h2>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6">
        {photos.map((photo, i) => (
          <motion.button
            key={photo.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: easeCinematic, delay: (i % 3) * 0.08 }}
            whileHover={{ y: -6 }}
            onClick={() => open(i)}
            className="glass group relative aspect-square overflow-hidden rounded-2xl border border-white/10"
            aria-label={`Open memory: ${photo.caption}`}
          >
            <img
              src={photo.src}
              alt={photo.caption}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            <p className="absolute bottom-3 left-3 right-3 translate-y-2 text-left text-xs text-[var(--c-cream)] opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
              {photo.caption}
            </p>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {activeIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[80] flex items-center justify-center bg-black/85 backdrop-blur-2xl"
            onClick={close}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
            role="dialog"
            aria-modal="true"
          >
            <ParticleField type="sparkle" count={10} color="text-[var(--c-gold)]/40" reducedMotion={reducedMotion} />

            <button
              onClick={close}
              className="absolute right-6 top-6 rounded-full p-2 text-[var(--c-cream)] hover:bg-white/10"
              aria-label="Close"
            >
              <X size={26} />
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); prev(); }}
              className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full p-2 text-[var(--c-cream)] hover:bg-white/10 sm:left-8"
              aria-label="Previous photo"
            >
              <ChevronLeft size={32} />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); next(); }}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-2 text-[var(--c-cream)] hover:bg-white/10 sm:right-8"
              aria-label="Next photo"
            >
              <ChevronRight size={32} />
            </button>

            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.45, ease: easeCinematic }}
              onClick={(e) => e.stopPropagation()}
              className="mx-6 flex max-w-2xl flex-col items-center"
            >
              <img
                src={photos[activeIndex].src}
                alt={photos[activeIndex].caption}
                className="max-h-[70vh] rounded-xl object-contain shadow-2xl"
              />
              <p className="mt-6 text-center font-display text-lg italic text-[var(--c-cream-dim)]">
                {photos[activeIndex].caption}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
