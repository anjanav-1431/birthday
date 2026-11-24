import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { BookOpen, Users, Heart } from 'lucide-react';
import { timeline } from '../config/content';

const ICONS = { BookOpen, Users, Heart };
const easeCinematic = [0.16, 1, 0.3, 1];

export default function ChapterStory() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 75%', 'end 40%'],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <section
      id="chapter-story"
      ref={containerRef}
      className="relative mx-auto flex min-h-screen w-full max-w-3xl flex-col items-center px-6 py-32"
    >
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.9, ease: easeCinematic }}
        className="mb-2 text-xs uppercase tracking-[0.4em] text-[var(--c-gold-soft)]"
      >
        Chapter One
      </motion.p>
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.9, ease: easeCinematic, delay: 0.1 }}
        className="mb-20 font-display text-4xl text-[var(--c-cream)] sm:text-5xl"
      >
        Our Story
      </motion.h2>

      <div className="relative w-full">
        {/* base line */}
        <div className="absolute left-6 top-2 h-full w-px bg-white/10 sm:left-1/2" />
        {/* animated glowing progress line */}
        <motion.div
          className="absolute left-6 top-2 w-px bg-gradient-to-b from-[var(--c-sunset)] via-[var(--c-gold)] to-[var(--c-ember)] sm:left-1/2"
          style={{ height: lineHeight, boxShadow: '0 0 12px rgba(242,184,102,0.6)' }}
        />

        <ul className="flex flex-col gap-28">
          {timeline.map((item, i) => {
            const Icon = ICONS[item.icon] || Heart;
            const alignRight = i % 2 === 1;
            return (
              <motion.li
                key={item.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.9, ease: easeCinematic }}
                className={`relative flex items-start gap-6 pl-16 sm:w-1/2 sm:pl-0 ${
                  alignRight ? 'sm:ml-auto sm:pl-16 sm:text-left' : 'sm:pr-16 sm:text-right sm:flex-row-reverse'
                }`}
              >
                <span
                  className="glass glow-sunset absolute left-0 top-0 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[var(--c-gold)]/40 text-[var(--c-gold)] sm:static"
                  aria-hidden="true"
                >
                  <Icon size={20} />
                </span>
                <div className="glass rounded-2xl px-6 py-5">
                  <p className="mb-1 text-[11px] uppercase tracking-[0.3em] text-[var(--c-muted)]">{item.year}</p>
                  <h3 className="mb-2 font-display text-2xl text-[var(--c-cream)]">{item.label}</h3>
                  <p className="text-sm font-light leading-relaxed text-[var(--c-cream-dim)]">{item.description}</p>
                </div>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
