import { useCallback, useRef, useState } from 'react';

/**
 * A tiny background-music controller built around a single <audio> element.
 * Provides smooth fade in / fade out / duck (lower volume) so that the
 * piano bgm can gracefully step aside for the letter, songs, or voice message.
 * Mute is handled natively via `audio.muted` so it never fights the fades.
 */
export function useAudioManager() {
  const audioRef = useRef(null);
  const fadeRaf = useRef(null);
  const [muted, setMuted] = useState(false);

  const clearFade = () => {
    if (fadeRaf.current) cancelAnimationFrame(fadeRaf.current);
  };

  const fadeTo = useCallback((target, duration = 900) => {
    const audio = audioRef.current;
    if (!audio) return;
    clearFade();
    const start = audio.volume;
    const startTime = performance.now();
    const step = (now) => {
      const t = Math.min(1, (now - startTime) / duration);
      audio.volume = start + (target - start) * t;
      if (t < 1) {
        fadeRaf.current = requestAnimationFrame(step);
      }
    };
    fadeRaf.current = requestAnimationFrame(step);
  }, []);

  const play = useCallback((src, { volume = 0.5, loop = true } = {}) => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.src.indexOf(src) === -1) {
      audio.src = src;
    }
    audio.loop = loop;
    audio.volume = 0;
    audio.play().catch(() => {
      /* Autoplay may be blocked until first user interaction; safe to ignore */
    });
    fadeTo(volume);
  }, [fadeTo]);

  const duck = useCallback((level = 0.12) => fadeTo(level, 700), [fadeTo]);
  const restore = useCallback((level = 0.5) => fadeTo(level, 900), [fadeTo]);
  const stop = useCallback((duration = 1200) => {
    fadeTo(0, duration);
    setTimeout(() => audioRef.current?.pause(), duration + 50);
  }, [fadeTo]);

  const toggleMute = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const next = !audio.muted;
    audio.muted = next;
    setMuted(next);
  }, []);

  return { audioRef, play, duck, restore, stop, muted, toggleMute };
}
