import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, X } from 'lucide-react';
import { memoryJar } from '../config/content';
import { shuffle } from '../utils/shuffle';
import ParticleField from './ParticleField';

const easeCinematic = [0.16, 1, 0.3, 1];

export default function MemoryJarSection({ unlockedGoldenNotes, allRead, onOpenFinalLetter, reducedMotion }) {
  const [jarState, setJarState] = useState('idle'); // idle | shaking | open
  const [note, setNote] = useState(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hovering, setHovering] = useState(false);
  const jarRef = useRef(null);
  const bagRef = useRef(null);
  const prevPoolLenRef = useRef(0);

  const pool = useMemo(() => {
    const base = memoryJar.notes.map((text) => ({ type: 'note', text }));
    const golden = unlockedGoldenNotes.map((m) => ({
      type: 'golden',
      title: m.title,
      intro: m.intro,
      text: m.memory,
    }));
    return [...base, ...golden];
  }, [unlockedGoldenNotes]);

  useEffect(() => {
    if (!bagRef.current) {
      bagRef.current = shuffle(pool.map((_, i) => i));
      prevPoolLenRef.current = pool.length;
      return;
    }
    if (pool.length > prevPoolLenRef.current) {
      for (let i = prevPoolLenRef.current; i < pool.length; i++) {
        const pos = Math.floor(Math.random() * (bagRef.current.length + 1));
        bagRef.current.splice(pos, 0, i);
      }
      prevPoolLenRef.current = pool.length;
    }
  }, [pool]);

  const drawNote = useCallback(() => {
    if (!bagRef.current || bagRef.current.length === 0) {
      bagRef.current = shuffle(pool.map((_, i) => i));
    }
    const idx = bagRef.current.shift();
    return pool[idx];
  }, [pool]);

  const handleJarClick = () => {
    if (jarState !== 'idle') return;
    if (allRead) {
      onOpenFinalLetter?.();
      return;
    }
    setJarState('shaking');
    setTimeout(() => {
      setNote(drawNote());
      setJarState('open');
    }, 550);
  };

  const openAnother = () => {
    setNote(null);
    setTimeout(() => setNote(drawNote()), 450);
  };

  const closeJar = () => {
    setNote(null);
    setJarState('idle');
  };

  const onPointerMove = (e) => {
    if (reducedMotion || !jarRef.current) return;
    const rect = jarRef.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: py * -14, y: px * 14 });
  };

  return (
    <section
      id="memory-jar"
      className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden px-6 py-32"
    >
      {/* cozy bokeh backdrop */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div
          className="absolute inset-0"
          style={{ background: 'radial-gradient(ellipse 70% 55% at 50% 40%, rgba(255,157,92,0.10), transparent 65%)' }}
        />
        <ParticleField type="firefly" count={16} color="text-[var(--c-gold)]" reducedMotion={reducedMotion} />
        <ParticleField type="heart" count={5} color="text-[var(--c-ember)]/40" reducedMotion={reducedMotion} />
      </div>

      <motion.p
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.9, ease: easeCinematic }}
        className="relative z-10 mb-2 text-center text-xs uppercase tracking-[0.4em] text-[var(--c-gold-soft)]"
      >
        {memoryJar.eyebrow}
      </motion.p>
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.9, ease: easeCinematic, delay: 0.1 }}
        className="relative z-10 mb-4 text-center font-display text-4xl text-[var(--c-cream)] sm:text-5xl"
      >
        {memoryJar.title}
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.9, delay: 0.2 }}
        className="relative z-10 mb-16 max-w-md text-center font-display text-lg italic text-[var(--c-cream-dim)]"
      >
        {memoryJar.subtitle}
      </motion.p>

      {/* the jar */}
      <motion.div
        ref={jarRef}
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => {
          setHovering(false);
          setTilt({ x: 0, y: 0 });
        }}
        onMouseMove={onPointerMove}
        onClick={handleJarClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handleJarClick()}
        aria-label={allRead ? 'Open the golden envelope inside the jar' : memoryJar.hint}
        className="relative z-10 cursor-pointer select-none"
        style={{ perspective: 800 }}
        animate={
          jarState === 'shaking'
            ? { x: [0, -8, 8, -6, 6, -3, 3, 0], rotate: [0, -3, 3, -2, 2, 0] }
            : { y: reducedMotion ? 0 : [0, -8, 0] }
        }
        transition={
          jarState === 'shaking'
            ? { duration: 0.55, ease: 'easeInOut' }
            : { duration: 4.5, repeat: Infinity, ease: 'easeInOut' }
        }
      >
        <motion.div
          animate={{ rotateX: tilt.x, rotateY: tilt.y }}
          transition={{ type: 'spring', stiffness: 120, damping: 12 }}
          style={{ transformStyle: 'preserve-3d' }}
        >
          <JarSvg glowing={hovering || allRead} allRead={allRead} lidOpen={jarState === 'open'} />
        </motion.div>

        {/* hovering hearts */}
        {hovering && !reducedMotion && (
          <div className="pointer-events-none absolute -top-4 left-1/2 -translate-x-1/2">
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                className="absolute text-[var(--c-ember)]"
                style={{ left: (i - 1) * 22 }}
                initial={{ opacity: 0, y: 0, scale: 0.6 }}
                animate={{ opacity: [0, 1, 0], y: -60, scale: 1 }}
                transition={{ duration: 1.6, repeat: Infinity, delay: i * 0.4, ease: 'easeOut' }}
              >
                <svg width="14" height="13" viewBox="0 0 32 29" fill="currentColor">
                  <path d="M16 27C16 27 2 18 2 9.3C2 4.7 5.8 1 10.3 1C13 1 15 2.5 16 5.2C17 2.5 19 1 21.7 1C26.2 1 30 4.7 30 9.3C30 18 16 27 16 27Z" />
                </svg>
              </motion.span>
            ))}
          </div>
        )}

        {allRead && (
          <motion.div
            className="pointer-events-none absolute -right-2 -top-2 text-[var(--c-gold)]"
            animate={reducedMotion ? {} : { scale: [1, 1.15, 1], rotate: [0, 8, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <Sparkles size={26} />
          </motion.div>
        )}

        {jarState === 'idle' && (
          <p className="mt-6 text-center text-[10px] uppercase tracking-[0.3em] text-[var(--c-muted)]">
            {allRead ? 'A golden envelope waits inside' : memoryJar.hint}
          </p>
        )}
      </motion.div>

      {/* progress hint */}
      {unlockedGoldenNotes.length > 0 && !allRead && (
        <p className="relative z-10 mt-6 text-xs uppercase tracking-[0.25em] text-[var(--c-gold-soft)]">
          {unlockedGoldenNotes.length} golden {unlockedGoldenNotes.length === 1 ? 'memory' : 'memories'} unlocked
        </p>
      )}

      {/* the revealed note */}
      <AnimatePresence>
        {note && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-[80] flex items-center justify-center bg-black/80 px-6 backdrop-blur-xl"
            onClick={closeJar}
          >
            <ParticleField type="sparkle" count={10} color="text-[var(--c-gold)]/50" reducedMotion={reducedMotion} />
            <button
              onClick={closeJar}
              className="absolute right-6 top-6 rounded-full p-2 text-[var(--c-cream)] hover:bg-white/10"
              aria-label="Close the jar"
            >
              <X size={24} />
            </button>

            <motion.div
              key={note.text}
              initial={{ opacity: 0, y: 50, rotateX: -30, scale: 0.85 }}
              animate={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.9 }}
              transition={{ duration: 0.7, ease: easeCinematic }}
              onClick={(e) => e.stopPropagation()}
              className={`paper-texture relative max-w-md rounded-lg px-8 py-10 text-center ${
                note.type === 'golden' ? 'ring-2 ring-[var(--c-gold)]' : ''
              }`}
            >
              {note.type === 'golden' && (
                <p className="mb-3 font-display text-sm uppercase tracking-[0.2em] text-[#8a5a22]">{note.title}</p>
              )}
              {note.intro && (
                <p className="font-hand mb-4 text-xl leading-snug text-[#5a3a1a]">{note.intro}</p>
              )}
              <p className="font-hand text-2xl leading-snug text-[#3a2510] sm:text-3xl">{note.text}</p>
              <p className="mt-6 text-[10px] uppercase tracking-[0.2em] text-[#8a6a3a]">
                {note.type === 'golden' ? 'a special memory' : 'from the jar'}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {note && (
        <div className="fixed inset-x-0 bottom-10 z-[85] flex justify-center px-6">
          <button
            onClick={openAnother}
            className="glass glow-sunset rounded-full border border-[var(--c-gold)]/40 px-7 py-3 text-xs uppercase tracking-[0.25em] text-[var(--c-cream)] transition-colors hover:bg-white/10"
          >
            ❤️ {memoryJar.openAnotherLabel}
          </button>
        </div>
      )}
    </section>
  );
}

function JarSvg({ glowing, allRead, lidOpen }) {
  return (
    <svg width="200" height="240" viewBox="0 0 200 240" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id="glassBody" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(248,236,217,0.22)" />
          <stop offset="100%" stopColor="rgba(248,236,217,0.06)" />
        </linearGradient>
        <radialGradient id="jarGlow" cx="50%" cy="50%" r="60%">
          <stop offset="0%" stopColor={allRead ? '#f2b866' : '#ff9d5c'} stopOpacity={glowing ? 0.45 : 0.15} />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
      </defs>

      <circle cx="100" cy="140" r="95" fill="url(#jarGlow)" />

      {/* jar body */}
      <path
        d="M55 90 L50 205 Q50 225 70 225 L130 225 Q150 225 150 205 L145 90 Z"
        fill="url(#glassBody)"
        stroke="rgba(248,236,217,0.35)"
        strokeWidth="2"
      />
      {/* neck */}
      <rect x="72" y="68" width="56" height="26" rx="6" fill="url(#glassBody)" stroke="rgba(248,236,217,0.35)" strokeWidth="2" />

      {/* folded papers inside */}
      {[
        { x: 70, y: 150, r: -8, c: '#f2b866' },
        { x: 95, y: 175, r: 6, c: '#ff9d5c' },
        { x: 118, y: 155, r: -4, c: '#f6d9a0' },
        { x: 85, y: 195, r: 10, c: '#e0774f' },
        { x: 108, y: 190, r: -10, c: '#f2b866' },
      ].map((p, i) => (
        <rect
          key={i}
          x={p.x}
          y={p.y}
          width="18"
          height="13"
          rx="2"
          fill={p.c}
          opacity="0.85"
          transform={`rotate(${p.r} ${p.x + 9} ${p.y + 6.5})`}
        />
      ))}

      {/* glass shine */}
      <path d="M62 100 L58 195" stroke="rgba(255,255,255,0.3)" strokeWidth="4" strokeLinecap="round" />

      {/* lid */}
      <motion.g
        animate={lidOpen ? { y: -30, rotate: -18 } : { y: 0, rotate: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        style={{ transformOrigin: '128px 62px' }}
      >
        <rect x="65" y="55" width="70" height="16" rx="8" fill="#c48a4a" />
        <rect x="90" y="42" width="20" height="16" rx="6" fill="#a8703a" />
      </motion.g>
    </svg>
  );
}
