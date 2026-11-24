import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';

// Gradient stops representing the journey: sunset → golden hour → evening → night → starry → almost black
const SKY_STOPS = [
  { t: 0.0, colors: ['#ff9d6c', '#ff7a45', '#4a1f4d', '#140b28'] },
  { t: 0.22, colors: ['#ffb26b', '#f2814f', '#3d1a48', '#140b28'] },
  { t: 0.45, colors: ['#e6774f', '#7a2f5a', '#2a1240', '#100a20'] },
  { t: 0.68, colors: ['#5a2a5e', '#3a1a4a', '#180e2c', '#0c0818'] },
  { t: 0.86, colors: ['#241234', '#180e28', '#0e081c', '#0a0714'] },
  { t: 1.0, colors: ['#0d0818', '#0a0714', '#08050f', '#06040c'] },
];

function lerpColor(a, b, t) {
  const pa = parseInt(a.slice(1), 16);
  const pb = parseInt(b.slice(1), 16);
  const ar = (pa >> 16) & 255, ag = (pa >> 8) & 255, ab = pa & 255;
  const br = (pb >> 16) & 255, bg = (pb >> 8) & 255, bb = pb & 255;
  const r = Math.round(ar + (br - ar) * t);
  const g = Math.round(ag + (bg - ag) * t);
  const bch = Math.round(ab + (bb - ab) * t);
  return `rgb(${r},${g},${bch})`;
}

function getSkyColors(progress) {
  for (let i = 0; i < SKY_STOPS.length - 1; i++) {
    const cur = SKY_STOPS[i];
    const next = SKY_STOPS[i + 1];
    if (progress >= cur.t && progress <= next.t) {
      const localT = (progress - cur.t) / (next.t - cur.t || 1);
      return cur.colors.map((c, idx) => lerpColor(c, next.colors[idx], localT));
    }
  }
  return SKY_STOPS[SKY_STOPS.length - 1].colors;
}

export default function DynamicSky({ reducedMotion }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? Math.min(1, scrollTop / docHeight) : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const colors = useMemo(() => getSkyColors(progress), [progress]);
  const starOpacity = Math.min(1, Math.max(0, (progress - 0.35) / 0.4));
  const sunMoonY = 10 + progress * 55; // travels down slowly
  const sunOpacity = Math.max(0, 1 - progress * 2.2);
  const moonOpacity = Math.min(1, Math.max(0, (progress - 0.55) / 0.35));

  const stars = useMemo(
    () =>
      Array.from({ length: 90 }, () => ({
        top: Math.random() * 70,
        left: Math.random() * 100,
        size: Math.random() * 1.8 + 0.4,
        delay: Math.random() * 5,
      })),
    []
  );

  return (
    <div className="fixed inset-0 -z-10" aria-hidden="true">
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(180deg, ${colors[0]} 0%, ${colors[1]} 32%, ${colors[2]} 66%, ${colors[3]} 100%)`,
          transition: 'background 0.2s linear',
        }}
      />

      {/* warm candlelit vignette — draws the eye inward, keeps edges cozy and dim */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 75% 65% at 50% 45%, transparent 45%, rgba(5,3,10,0.55) 100%)',
        }}
      />

      {/* subtle film grain for a premium cinematic texture */}
      <div
        className="absolute inset-0 opacity-[0.05] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      {/* stars, fade in as night falls */}
      <div className="absolute inset-0" style={{ opacity: starOpacity }}>
        {stars.map((s, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-[var(--c-gold-soft)]"
            style={{ top: `${s.top}%`, left: `${s.left}%`, width: s.size, height: s.size }}
            animate={reducedMotion ? {} : { opacity: [0.2, 1, 0.2] }}
            transition={{ duration: 3 + s.delay, repeat: Infinity, ease: 'easeInOut', delay: s.delay }}
          />
        ))}
      </div>

      {/* sun */}
      <div
        className="absolute right-[12%] h-24 w-24 rounded-full blur-[2px]"
        style={{
          top: `${sunMoonY}%`,
          opacity: sunOpacity,
          background: 'radial-gradient(circle, #ffe3ab 0%, #ff9d5c 55%, transparent 75%)',
          boxShadow: '0 0 90px 30px rgba(255,157,92,0.35)',
        }}
      />
      {/* moon */}
      <div
        className="absolute right-[16%] h-14 w-14 rounded-full"
        style={{
          top: `${sunMoonY - 4}%`,
          opacity: moonOpacity,
          background: 'radial-gradient(circle at 35% 35%, #fff8e8, #f2b866 70%)',
          boxShadow: '0 0 60px 18px rgba(242,184,102,0.25)',
        }}
      />

      {/* drifting clouds */}
      {!reducedMotion && (
        <>
          <motion.div
            className="absolute top-[14%] h-10 w-40 rounded-full bg-white/5 blur-xl"
            animate={{ x: ['-10vw', '110vw'] }}
            transition={{ duration: 90, repeat: Infinity, ease: 'linear' }}
          />
          <motion.div
            className="absolute top-[22%] h-8 w-56 rounded-full bg-white/5 blur-xl"
            animate={{ x: ['120vw', '-20vw'] }}
            transition={{ duration: 130, repeat: Infinity, ease: 'linear' }}
          />
        </>
      )}

      {/* birds — small V shapes drifting, only visible early (daylight) */}
      {!reducedMotion && progress < 0.4 && (
        <motion.div
          className="absolute top-[18%] text-[var(--c-cream-dim)]"
          style={{ opacity: Math.max(0, 0.5 - progress) }}
          animate={{ x: ['-5vw', '105vw'] }}
          transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
        >
          <svg width="60" height="16" viewBox="0 0 60 16" fill="none">
            <path d="M0 8 Q7 0 14 8 Q21 0 28 8" stroke="currentColor" strokeWidth="1.2" fill="none" />
            <path d="M32 8 Q39 0 46 8 Q53 0 60 8" stroke="currentColor" strokeWidth="1.2" fill="none" />
          </svg>
        </motion.div>
      )}
    </div>
  );
}
