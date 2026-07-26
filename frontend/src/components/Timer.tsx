import { useEffect, useRef, useState } from "react";

interface TimerProps {
  subjectName: string | null;
}

function formatTime(totalSeconds: number): string {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const pad = (value: number) => value.toString().padStart(2, "0");
  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

export function Timer({ subjectName }: TimerProps) {
  const [secondsElapsed, setSecondsElapsed] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (!isRunning) return;

    intervalRef.current = window.setInterval(() => {
      setSecondsElapsed((prev) => prev + 1);
    }, 1000);

    return () => {
      if (intervalRef.current !== null) {
        window.clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isRunning]);

  const handleStartPause = () => setIsRunning((prev) => !prev);
  const handleReset = () => {
    setIsRunning(false);
    setSecondsElapsed(0);
  };

  return (
    <section className="flex w-full max-w-md flex-col items-center justify-center gap-6 rounded-2xl border border-brown/30 bg-background p-10 text-center">
      <p className="text-lg font-medium text-foreground/80">
        {subjectName ?? "Selecione uma matéria"}
      </p>
      <p
        className="font-mono text-6xl font-bold tabular-nums text-foreground"
        role="timer"
        aria-live="polite"
      >
        {formatTime(secondsElapsed)}
      </p>
      <div className="flex gap-3">
        <button
          type="button"
          onClick={handleStartPause}
          className="rounded-lg bg-brown px-6 py-2 font-semibold text-brown-foreground transition-opacity hover:opacity-90"
        >
          {isRunning ? "Pausar" : "Iniciar"}
        </button>
        <button
          type="button"
          onClick={handleReset}
          className="rounded-lg border border-brown/50 px-6 py-2 font-semibold text-foreground transition-colors hover:bg-brown/10"
        >
          Reiniciar
        </button>
      </div>
    </section>
  );
}
