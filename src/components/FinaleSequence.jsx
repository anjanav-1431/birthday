import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { finalSurprise, finalVideo } from '../config/content';
import TypingScene from './TypingScene';
import VoiceMessage from './VoiceMessage';
import FinalVideoScene from './FinalVideoScene';
import EndingScene from './EndingScene';
import SpiritualEnding from './SpiritualEnding';

const easeCinematic = [0.16, 1, 0.3, 1];

// stage flow: prompt -> typing -> voice(+video) -> ending -> spiritual
export default function FinaleSequence({ reducedMotion, onStopMusic }) {
  const [stage, setStage] = useState('prompt');
  const [videoVisible, setVideoVisible] = useState(false);
  const videoTimer = useRef(null);

  const beginFinale = () => {
    setStage('typing');
    onStopMusic?.();
  };

  const onTypingComplete = () => setStage('voice');

  const onVoiceStarted = () => {
    videoTimer.current = setTimeout(() => setVideoVisible(true), finalVideo.delayMs);
  };

  useEffect(() => () => clearTimeout(videoTimer.current), []);

  // Lock scroll only during the transient cinematic takeover (typing / voice / ending).
  // The final spiritual scene is deliberately NOT locked, so the page is always
  // scrollable again once the story has finished settling.
  useEffect(() => {
    const lockedStages = ['typing', 'voice', 'ending'];
    if (!lockedStages.includes(stage)) {
      document.body.style.overflow = '';
      return undefined;
    }
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, [stage]);

  return (
    <section
      id="finale"
      className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden px-6 text-center"
      style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(10,7,20,0.4), #05040a 80%)' }}
    >
      {stage === 'prompt' && (
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 1.6, ease: easeCinematic }}
        >
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 1 }}
            className="mb-10 text-sm uppercase tracking-[0.4em] text-[var(--c-muted)]"
          >
            {finalSurprise.buttonLabel}
          </motion.p>
          <motion.button
            onClick={beginFinale}
            animate={reducedMotion ? {} : { boxShadow: ['0 0 20px rgba(242,184,102,0.25)', '0 0 55px rgba(242,184,102,0.55)', '0 0 20px rgba(242,184,102,0.25)'] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            className="glass flex h-28 w-28 items-center justify-center rounded-full border border-[var(--c-gold)]/50 text-[var(--c-gold)] sm:h-32 sm:w-32"
            aria-label="Reveal one last memory"
          >
            <svg width="30" height="27" viewBox="0 0 32 29" fill="currentColor">
              <path d="M16 27C16 27 2 18 2 9.3C2 4.7 5.8 1 10.3 1C13 1 15 2.5 16 5.2C17 2.5 19 1 21.7 1C26.2 1 30 4.7 30 9.3C30 18 16 27 16 27Z" />
            </svg>
          </motion.button>
        </motion.div>
      )}

      {stage === 'typing' && <TypingScene onComplete={onTypingComplete} reducedMotion={reducedMotion} />}

      {stage === 'voice' && (
        <>
          <VoiceMessage onStarted={onVoiceStarted} reducedMotion={reducedMotion} />
          {videoVisible && <FinalVideoScene />}
          {/* advance to ending after video has had time to play */}
          <AdvanceAfter delayMs={videoVisible ? 9000 : 0} active={videoVisible} onDone={() => setStage('ending')} />
        </>
      )}

      {stage === 'ending' && <EndingScene onComplete={() => setStage('spiritual')} />}

      {stage === 'spiritual' && <SpiritualEnding reducedMotion={reducedMotion} />}
    </section>
  );
}

function AdvanceAfter({ delayMs, active, onDone }) {
  useEffect(() => {
    if (!active) return;
    const t = setTimeout(onDone, delayMs);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);
  return null;
}
