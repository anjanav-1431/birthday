import { useCallback, useRef, useState } from 'react';

import { usePrefersReducedMotion } from './hooks/usePrefersReducedMotion';
import { useAudioManager } from './hooks/useAudioManager';

import LoadingScreen from './components/LoadingScreen';
import ScrollProgress from './components/ScrollProgress';
import CursorGlow from './components/CursorGlow';
import DynamicSky from './components/DynamicSky';
import ParticleField from './components/ParticleField';
import Hero from './components/Hero';
import ChapterStory from './components/ChapterStory';
import ChapterGallery from './components/ChapterGallery';
import ChapterVideos from './components/ChapterVideos';
import MemoryExperience from './components/MemoryExperience';
import ChapterLetter from './components/ChapterLetter';
import ChapterSongs from './components/ChapterSongs';
import ChapterSurprise from './components/ChapterSurprise';
import FinaleSequence from './components/FinaleSequence';
import ClickHearts from './components/ClickHearts';
import MusicToggle from './components/MusicToggle';

import { backgroundMusic } from './config/content';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [entered, setEntered] = useState(false);
  const [reading, setReading] = useState(false); // true while the love letter is open
  const reducedMotion = usePrefersReducedMotion();

  const { audioRef, play, duck, restore, stop, muted, toggleMute } = useAudioManager();

  const heroRef = useRef(null);

  const handleLoadingComplete = useCallback(() => {
    setLoading(false);
  }, []);

  const handleBegin = useCallback(() => {
    setEntered(true);
    play(backgroundMusic.src, { volume: backgroundMusic.volume, loop: true });
    document.getElementById('chapter-story')?.scrollIntoView({ behavior: 'smooth' });
  }, [play]);

  const handleReadingChange = useCallback(
    (isReading) => {
      setReading(isReading);
      if (isReading) duck(0.08);
      else restore(backgroundMusic.volume);
    },
    [duck, restore]
  );

  const handleEnterSurprise = useCallback(() => {
    // mood softens as we move past the celebration into the quiet finale
    setTimeout(() => duck(0.15), 3500);
  }, [duck]);

  const handleStopMusic = useCallback(() => {
    stop(1500);
  }, [stop]);

  return (
    <div className={reducedMotion ? 'reduced-motion' : ''}>
      {loading && <LoadingScreen onComplete={handleLoadingComplete} />}

      {!loading && (
        <>
          <audio ref={audioRef} />
          <ScrollProgress />
          <CursorGlow reducedMotion={reducedMotion} />
          <ClickHearts reducedMotion={reducedMotion} />
          <DynamicSky reducedMotion={reducedMotion} />

          {/* ambient fireflies + hearts, dimmed while reading the letter */}
          <div
            className="pointer-events-none fixed inset-0 -z-[5] transition-opacity duration-700"
            style={{ opacity: reading ? 0.15 : 1 }}
          >
            <ParticleField type="firefly" count={22} color="text-[var(--c-gold)]" reducedMotion={reducedMotion} />
            <ParticleField type="heart" count={6} color="text-[var(--c-ember)]/50" reducedMotion={reducedMotion} />
          </div>

          <main className="relative z-10">
            <div ref={heroRef}>
              <Hero onBegin={handleBegin} reducedMotion={reducedMotion} />
            </div>
            <ChapterStory />
            <ChapterGallery reducedMotion={reducedMotion} />
            <ChapterVideos />
            <MemoryExperience reducedMotion={reducedMotion} />
            <ChapterLetter onReadingChange={handleReadingChange} />
            <ChapterSongs />
            <ChapterSurprise reducedMotion={reducedMotion} onEnterSurprise={handleEnterSurprise} />
            <FinaleSequence reducedMotion={reducedMotion} onStopMusic={handleStopMusic} />
          </main>

          <MusicToggle visible={entered} muted={muted} onToggle={toggleMute} />
        </>
      )}
    </div>
  );
}
