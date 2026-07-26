import type { Subject } from "../api/studyPlan";

interface SubjectListProps {
  subjects: Subject[];
  selectedSubjectId: number | null;
  onSelect: (subject: Subject) => void;
}

export function SubjectList({ subjects, selectedSubjectId, onSelect }: SubjectListProps) {
  if (subjects.length === 0) {
    return <p className="text-foreground/70">Nenhuma matéria ativa neste ciclo.</p>;
  }

  return (
    <ul className="flex flex-col gap-2">
      {subjects.map((subject) => {
        const isSelected = subject.id === selectedSubjectId;
        return (
          <li key={subject.id}>
            <button
              type="button"
              onClick={() => onSelect(subject)}
              aria-pressed={isSelected}
              className={
                "flex w-full items-center justify-between rounded-lg border px-4 py-3 text-left transition-colors " +
                (isSelected
                  ? "border-brown bg-brown text-brown-foreground"
                  : "border-brown/30 bg-background text-foreground hover:bg-brown/10")
              }
            >
              <span className="font-medium">{subject.name}</span>
              <span className="text-sm opacity-80">{subject.question_count} questões</span>
            </button>
          </li>
        );
      })}
    </ul>
  );
}
