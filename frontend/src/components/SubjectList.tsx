import type { Subject } from "../api/studyPlan";
import { formatTime } from "../lib/formatTime";

interface SubjectListProps {
  subjects: Subject[];
  selectedSubjectId: number | null;
  disabled: boolean;
  timeBySubjectId: Record<number, number>;
  onSelect: (subject: Subject) => void;
}

export function SubjectList({ subjects, selectedSubjectId, disabled, timeBySubjectId, onSelect }: SubjectListProps) {
  if (subjects.length === 0) {
    return <p className="text-foreground/70">Nenhuma matéria ativa neste ciclo.</p>;
  }

  return (
    <ul className="flex flex-col gap-2">
      {subjects.map((subject) => {
        const isSelected = subject.id === selectedSubjectId;
        const seconds = timeBySubjectId[subject.id] ?? 0;
        return (
          <li key={subject.id}>
            <button
              type="button"
              onClick={() => onSelect(subject)}
              disabled={disabled}
              aria-pressed={isSelected}
              title={disabled ? "Pause o cronômetro para trocar de matéria" : undefined}
              className={
                "flex w-full items-center justify-between rounded-lg border px-4 py-3 text-left transition-colors disabled:cursor-not-allowed disabled:opacity-60 " +
                (isSelected
                  ? "border-brown bg-brown text-brown-foreground"
                  : "border-brown/30 bg-background text-foreground hover:bg-brown/10")
              }
            >
              <span className="font-medium">{subject.name}</span>
              <span className="text-sm opacity-80">
                {subject.question_count} questões · {formatTime(seconds)}
              </span>
            </button>
          </li>
        );
      })}
    </ul>
  );
}
