import { useCallback, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useMemoryUnlocks } from '../hooks/useMemoryUnlocks';
import MemoryJarSection from './MemoryJarSection';
import LoveReasonsSection from './LoveReasonsSection';
import MilestoneToast from './MilestoneToast';
import ReasonsFinalLetter from './ReasonsFinalLetter';

export default function MemoryExperience({ reducedMotion }) {
  const { readCount, totalCount, allRead, toast, dismissToast, markRead, unlockedGoldenNotes } =
    useMemoryUnlocks();
  const [finalLetterOpen, setFinalLetterOpen] = useState(false);

  const handleRead = useCallback((index) => markRead(index), [markRead]);

  return (
    <>
      <MilestoneToast milestone={toast} onDismiss={dismissToast} />

      <MemoryJarSection
        unlockedGoldenNotes={unlockedGoldenNotes}
        allRead={allRead}
        onOpenFinalLetter={() => setFinalLetterOpen(true)}
        reducedMotion={reducedMotion}
      />

      <LoveReasonsSection onRead={handleRead} readCount={readCount} totalCount={totalCount} />

      <AnimatePresence>
        {finalLetterOpen && (
          <ReasonsFinalLetter onClose={() => setFinalLetterOpen(false)} reducedMotion={reducedMotion} />
        )}
      </AnimatePresence>
    </>
  );
}
