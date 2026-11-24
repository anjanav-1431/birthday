import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause } from 'lucide-react';
import { songs } from '../config/content';

const easeCinematic = [0.16, 1, 0.3, 1];

function formatTime(sec) {
  if (!isFinite(sec)) return '0:00';
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60)
    .toString()
    .padStart(2, '0');
  return `${m}:${s}`;
}

function SongCard({ song, isPlaying, onToggle, registerAudio }) {
  const audioRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    registerAudio(song.id, audioRef.current);
  }, [song.id, registerAudio]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.play().catch(() => {});
    } else {
      audio.pause();
    }
  }, [isPlaying]);

  const onTimeUpdate = () => {
    const audio = audioRef.current;
    if (!audio || !audio.duration) return;
    setCurrent(audio.currentTime);
    setProgress(audio.currentTime / audio.duration);
  };

  const onSeek = (e) => {
    const audio = audioRef.current;
    if (!audio || !audio.duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    audio.currentTime = ratio * audio.duration;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, ease: easeCinematic }}
      className="glass flex flex-col gap-4 rounded-2xl border border-white/10 p-5"
    >
      <audio
        ref={audioRef}
        src={song.src}
        preload="metadata"
        onTimeUpdate={onTimeUpdate}
        onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
        onEnded={() => onToggle(null)}
      />
      <div className="flex items-center gap-4">
        <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl">
          <img src={song.cover} alt="" loading="lazy" className="h-full w-full object-cover" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate font-display text-lg text-[var(--c-cream)]">{song.title}</p>
          <p className="truncate text-xs text-[var(--c-muted)]">{song.artist}</p>
        </div>
        <button
          onClick={() => onToggle(isPlaying ? null : song.id)}
          aria-label={isPlaying ? `Pause ${song.title}` : `Play ${song.title}`}
          className="glow-sunset flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[var(--c-gold)]/40 text-[var(--c-gold)] transition-colors hover:bg-white/10"
        >
          {isPlaying ? <Pause size={16} /> : <Play size={16} className="ml-0.5" />}
        </button>
      </div>

      {/* equalizer */}
      <div className="flex h-4 items-end gap-[3px]" aria-hidden="true">
        {[0, 1, 2, 3, 4].map((bar) => (
          <motion.span
            key={bar}
            className="w-[3px] rounded-full bg-[var(--c-gold)]"
            animate={
              isPlaying
                ? { height: ['20%', '100%', '40%', '80%', '20%'] }
                : { height: '15%' }
            }
            transition={{ duration: 1 + bar * 0.15, repeat: isPlaying ? Infinity : 0, ease: 'easeInOut' }}
          />
        ))}
      </div>

      {/* progress bar */}
      <div className="flex items-center gap-3 text-[10px] text-[var(--c-muted)]">
        <span>{formatTime(current)}</span>
        <div
          className="relative h-1 flex-1 cursor-pointer rounded-full bg-white/10"
          onClick={onSeek}
          role="slider"
          aria-label={`Seek ${song.title}`}
          aria-valuemin={0}
          aria-valuemax={duration}
          aria-valuenow={current}
        >
          <div
            className="absolute left-0 top-0 h-full rounded-full"
            style={{ width: `${progress * 100}%`, background: 'linear-gradient(90deg, #ff7a45, #f2b866)' }}
          />
        </div>
        <span>{formatTime(duration)}</span>
      </div>
    </motion.div>
  );
}

export default function ChapterSongs() {
  const [playingId, setPlayingId] = useState(null);
  const audiosRef = useRef({});

  const registerAudio = (id, el) => {
    audiosRef.current[id] = el;
  };

  const handleToggle = (id) => {
    setPlayingId(id);
  };

  return (
    <section id="chapter-songs" className="relative mx-auto w-full max-w-3xl px-6 py-32">
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.9, ease: easeCinematic }}
        className="mb-2 text-center text-xs uppercase tracking-[0.4em] text-[var(--c-gold-soft)]"
      >
        Chapter Four
      </motion.p>
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.9, ease: easeCinematic, delay: 0.1 }}
        className="mb-16 text-center font-display text-4xl text-[var(--c-cream)] sm:text-5xl"
      >
        Our Songs
      </motion.h2>

      <div className="flex flex-col gap-5">
        {songs.map((song) => (
          <SongCard
            key={song.id}
            song={song}
            isPlaying={playingId === song.id}
            onToggle={handleToggle}
            registerAudio={registerAudio}
          />
        ))}
      </div>
    </section>
  );
}
