import { useCallback, useEffect, useMemo, useState } from 'react';
import { loveReasons, jarMilestoneNotes } from '../config/content';

const STORAGE_KEY = 'birthday-site:reasons-read';

function loadReadIds() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return new Set();
    return new Set(JSON.parse(raw));
  } catch {
    return new Set();
  }
}

/**
 * Connects the "100 Reasons" deck to the Memory Jar: as reasons are read,
 * this tracks progress (persisted to localStorage), fires a one-time toast
 * whenever a milestone (10 / 25 / 50 / 75) is crossed, and exposes which
 * golden notes should now be available inside the jar. At 100/100 the jar
 * is flagged to transform into its final, envelope-holding state.
 */
export function useMemoryUnlocks() {
  const [readIds, setReadIds] = useState(loadReadIds);
  const [toast, setToast] = useState(null);
  const totalCount = loveReasons.reasons.length;

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify([...readIds]));
    } catch {
      /* private browsing / storage disabled — safe to ignore */
    }
  }, [readIds]);

  const markRead = useCallback((index) => {
    setReadIds((prev) => {
      if (prev.has(index)) return prev;
      const next = new Set(prev);
      next.add(index);
      const milestone = jarMilestoneNotes.find((m) => m.milestone === next.size);
      if (milestone) setToast(milestone);
      return next;
    });
  }, []);

  const dismissToast = useCallback(() => setToast(null), []);

  const readCount = readIds.size;
  const allRead = totalCount > 0 && readCount >= totalCount;

  const unlockedGoldenNotes = useMemo(
    () => jarMilestoneNotes.filter((m) => readCount >= m.milestone),
    [readCount]
  );

  return { readIds, readCount, totalCount, allRead, toast, dismissToast, markRead, unlockedGoldenNotes };
}
