import { useMemo } from 'react';
import { motion } from 'framer-motion';

/**
 * An original, hand-built SVG peacock feather illustration.
 * The "eye" is built from concentric iridescent rings; the barbs (the fine
 * strands along the stem) are generated programmatically for a natural,
 * slightly irregular taper — thin near the tip and base, fuller in the middle.
 */
export default function PeacockFeather({ reducedMotion, width = 130, height = 360 }) {
  // stem runs from the base of the eye down to the bottom of the feather
  const stemTop = 172;
  const stemBottom = 352;
  const stemX = 65;

  const barbs = useMemo(() => {
    const count = 34;
    const items = [];
    for (let i = 0; i < count; i++) {
      const t = i / (count - 1); // 0 = top (near eye), 1 = bottom tip
      const y = stemTop + t * (stemBottom - stemTop);

      // natural taper: barbs are short near the eye, longest in the middle,
      // tapering again toward the tip — modeled with a sine curve
      const lengthProfile = Math.sin(Math.PI * (1 - t) * 0.92) * 46 + 6;
      const jitter = (i % 3) * 1.6;
      const length = lengthProfile + jitter;

      const side = i % 2 === 0 ? 1 : -1;
      const droop = 8 + t * 14; // barbs droop downward more toward the tip
      const endX = stemX + side * length;
      const endY = y + droop;
      const ctrlX = stemX + side * length * 0.55;
      const ctrlY = y + droop * 0.3;

      // color drifts from teal near the eye to warm gold near the tip
      const hue = t < 0.5 ? 'url(#barbTeal)' : 'url(#barbGold)';

      items.push({ id: i, y, endX, endY, ctrlX, ctrlY, hue, opacity: 0.35 + (1 - Math.abs(t - 0.5)) * 0.4 });
    }
    return items;
  }, []);

  return (
    <motion.svg
      width={width}
      height={height}
      viewBox="0 0 130 360"
      fill="none"
      aria-hidden="true"
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 2.4, ease: [0.16, 1, 0.3, 1] }}
    >
      <defs>
        <radialGradient id="eyeHalo" cx="50%" cy="42%" r="60%">
          <stop offset="0%" stopColor="#f6d9a0" />
          <stop offset="45%" stopColor="#d98f3f" />
          <stop offset="100%" stopColor="#5a3a1a" />
        </radialGradient>
        <radialGradient id="eyeGreen" cx="50%" cy="42%" r="60%">
          <stop offset="0%" stopColor="#8fe3c0" />
          <stop offset="55%" stopColor="#1f8f6b" />
          <stop offset="100%" stopColor="#0d4f3d" />
        </radialGradient>
        <radialGradient id="eyeBlue" cx="45%" cy="38%" r="65%">
          <stop offset="0%" stopColor="#7fd9ff" />
          <stop offset="45%" stopColor="#2a6fb0" />
          <stop offset="100%" stopColor="#12294f" />
        </radialGradient>
        <radialGradient id="eyeCore" cx="42%" cy="35%" r="70%">
          <stop offset="0%" stopColor="#3d2560" />
          <stop offset="60%" stopColor="#1a0e30" />
          <stop offset="100%" stopColor="#0a0714" />
        </radialGradient>
        <linearGradient id="stemGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#e0b667" />
          <stop offset="100%" stopColor="#6b4a22" />
        </linearGradient>
        <linearGradient id="barbTeal" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#3fd6a8" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#1c5f4a" stopOpacity="0.15" />
        </linearGradient>
        <linearGradient id="barbGold" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#f2c168" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#8a5a22" stopOpacity="0.15" />
        </linearGradient>
      </defs>

      {/* stem / rachis, gently curved */}
      <path
        d={`M${stemX} ${stemTop} C ${stemX - 4} ${stemTop + 60}, ${stemX + 6} ${stemTop + 130}, ${stemX} ${stemBottom}`}
        stroke="url(#stemGrad)"
        strokeWidth="2.4"
        strokeLinecap="round"
      />

      {/* barbs, rendered back-to-front for gentle overlap */}
      {barbs.map((b) => (
        <path
          key={b.id}
          d={`M${stemX} ${b.y} Q ${b.ctrlX} ${b.ctrlY} ${b.endX} ${b.endY}`}
          stroke={b.hue}
          strokeWidth="1.1"
          strokeLinecap="round"
          opacity={b.opacity}
        />
      ))}

      {/* the eye of the feather */}
      <g>
        <ellipse cx="65" cy="92" rx="58" ry="82" fill="url(#eyeHalo)" opacity="0.92" />
        <ellipse cx="65" cy="96" rx="44" ry="64" fill="url(#eyeGreen)" />
        <ellipse cx="65" cy="100" rx="30" ry="46" fill="url(#eyeBlue)" />
        <ellipse cx="63" cy="104" rx="16" ry="26" fill="url(#eyeCore)" />
        {/* soft highlight for a touch of realism */}
        <ellipse cx="57" cy="88" rx="5" ry="9" fill="#fdf3df" opacity="0.55" />
      </g>

      {/* slow shimmer sweeping across the eye */}
      {!reducedMotion && (
        <motion.ellipse
          cx="65"
          cy="96"
          rx="44"
          ry="64"
          fill="url(#eyeHalo)"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.18, 0] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', repeatDelay: 1.5 }}
        />
      )}
    </motion.svg>
  );
}
