import { useEffect, useState } from "react";
import { getCycles, getSubjects, ApiError, type Cycle, type Subject } from "./api/studyPlan";
import { Timer } from "./components/Timer";
import { SubjectList } from "./components/SubjectList";
import { ThemeToggle } from "./components/ThemeToggle";
import { useStudySession } from "./hooks/useStudySession";
import { formatTime } from "./lib/formatTime";

type LoadState = "loading" | "success" | "error";

function App() {
  const [cycles, setCycles] = useState<Cycle[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [cyclesState, setCyclesState] = useState<LoadState>("loading");
  const [subjectsState, setSubjectsState] = useState<LoadState>("loading");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    selectedSubject,
    isRunning,
    currentSeconds,
    totalSeconds,
    timeBySubjectId,
    selectSubject,
    toggleRunning,
    resetCurrent,
  } = useStudySession();

  useEffect(() => {
    let cancelled = false;

    async function loadCycles() {
      setCyclesState("loading");
      try {
        const data = await getCycles();
        if (cancelled) return;
        setCycles(data);
        setCyclesState("success");
      } catch (err) {
        if (cancelled) return;
        setErrorMessage(err instanceof ApiError ? err.message : "Erro inesperado ao carregar ciclos.");
        setCyclesState("error");
      }
    }

    loadCycles();
    return () => {
      cancelled = true;
    };
  }, []);

  const activeCycle = cycles[0] ?? null;

  useEffect(() => {
    if (cyclesState !== "success") return;

    if (!activeCycle) {
      setSubjects([]);
      setSubjectsState("success");
      return;
    }

    let cancelled = false;

    async function loadSubjects() {
      setSubjectsState("loading");
      try {
        const data = await getSubjects(activeCycle!.id);
        if (cancelled) return;
        setSubjects(data.filter((subject) => subject.is_active));
        setSubjectsState("success");
      } catch (err) {
        if (cancelled) return;
        setErrorMessage(err instanceof ApiError ? err.message : "Erro inesperado ao carregar matérias.");
        setSubjectsState("error");
      }
    }

    loadSubjects();
    return () => {
      cancelled = true;
    };
  }, [activeCycle, cyclesState]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="flex items-center justify-between border-b border-brown/20 px-6 py-4">
        <div>
          <h1 className="text-xl font-bold">Sessão de Estudo</h1>
          <p className="text-sm text-foreground/70">Total estudado: {formatTime(totalSeconds)}</p>
        </div>
        <ThemeToggle />
      </header>

      <main className="mx-auto flex max-w-5xl flex-col gap-8 p-6 md:flex-row md:items-start">
        <aside className="w-full md:w-80 md:shrink-0">
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-foreground/70">
            Matérias ativas
          </h2>

          {cyclesState === "loading" && <p className="text-foreground/70">Carregando ciclos...</p>}
          {cyclesState === "error" && <p className="text-danger">{errorMessage}</p>}
          {cyclesState === "success" && !activeCycle && (
            <p className="text-foreground/70">Nenhum ciclo cadastrado ainda.</p>
          )}

          {activeCycle && subjectsState === "loading" && (
            <p className="text-foreground/70">Carregando matérias...</p>
          )}
          {activeCycle && subjectsState === "error" && <p className="text-danger">{errorMessage}</p>}
          {activeCycle && subjectsState === "success" && (
            <SubjectList
              subjects={subjects}
              selectedSubjectId={selectedSubject?.id ?? null}
              disabled={isRunning}
              timeBySubjectId={timeBySubjectId}
              onSelect={selectSubject}
            />
          )}
        </aside>

        <div className="flex flex-1 justify-center">
          <Timer
            subjectName={selectedSubject?.name ?? null}
            elapsedSeconds={currentSeconds}
            isRunning={isRunning}
            hasSubject={!!selectedSubject}
            onToggle={toggleRunning}
            onReset={resetCurrent}
          />
        </div>
      </main>
    </div>
  );
}

export default App;
