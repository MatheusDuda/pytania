import { useCallback, useEffect, useRef, useState } from "react";
import type { Subject } from "../api/studyPlan";

export function useStudySession() {
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [timeBySubjectId, setTimeBySubjectId] = useState<Record<number, number>>({});
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (!isRunning || !selectedSubject) return;

    const subjectId = selectedSubject.id;
    intervalRef.current = window.setInterval(() => {
      setTimeBySubjectId((prev) => ({
        ...prev,
        [subjectId]: (prev[subjectId] ?? 0) + 1,
      }));
    }, 1000);

    return () => {
      if (intervalRef.current !== null) {
        window.clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isRunning, selectedSubject]);

  const selectSubject = useCallback(
    (subject: Subject) => {
      if (isRunning) return;
      setSelectedSubject(subject);
    },
    [isRunning],
  );

  const toggleRunning = useCallback(() => {
    setIsRunning((prev) => {
      if (!prev && !selectedSubject) return prev;
      return !prev;
    });
  }, [selectedSubject]);

  const resetCurrent = useCallback(() => {
    if (!selectedSubject) return;
    const subjectId = selectedSubject.id;
    setIsRunning(false);
    setTimeBySubjectId((prev) => ({ ...prev, [subjectId]: 0 }));
  }, [selectedSubject]);

  const totalSeconds = Object.values(timeBySubjectId).reduce((sum, s) => sum + s, 0);
  const currentSeconds = selectedSubject ? timeBySubjectId[selectedSubject.id] ?? 0 : 0;

  return {
    selectedSubject,
    isRunning,
    currentSeconds,
    totalSeconds,
    timeBySubjectId,
    selectSubject,
    toggleRunning,
    resetCurrent,
  };
}
