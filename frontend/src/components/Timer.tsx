import { formatTime } from "../lib/formatTime";

interface TimerProps {
  subjectName: string | null;
  elapsedSeconds: number;
  isRunning: boolean;
  hasSubject: boolean;
  onToggle: () => void;
  onReset: () => void;
}

export function Timer({ subjectName, elapsedSeconds, isRunning, hasSubject, onToggle, onReset }: TimerProps) {
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
        {formatTime(elapsedSeconds)}
      </p>
      <div className="flex gap-3">
        <button
          type="button"
          onClick={onToggle}
          disabled={!hasSubject}
          className="rounded-lg bg-brown px-6 py-2 font-semibold text-brown-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {isRunning ? "Pausar" : "Iniciar"}
        </button>
        <button
          type="button"
          onClick={onReset}
          disabled={!hasSubject}
          className="rounded-lg border border-brown/50 px-6 py-2 font-semibold text-foreground transition-colors hover:bg-brown/10 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Reiniciar
        </button>
      </div>
    </section>
  );
}
