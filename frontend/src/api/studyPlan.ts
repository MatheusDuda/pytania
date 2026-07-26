export interface Cycle {
  id: number;
  weekly_hours: number;
  daily_hours: number;
  total_exam_questions: number;
}

export interface Subject {
  id: number;
  name: string;
  is_active: boolean;
  question_count: number;
  study_cycle_id: number;
}

const BASE_URL = import.meta.env.VITE_API_URL ?? "http://127.0.0.1:8000";

export class ApiError extends Error {
  status?: number;

  constructor(message: string, status?: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

async function request<T>(path: string): Promise<T> {
  let response: Response;

  try {
    response = await fetch(`${BASE_URL}${path}`);
  } catch {
    throw new ApiError(
      "Não foi possível conectar à API. Verifique se o backend está rodando em " + BASE_URL + "."
    );
  }

  if (!response.ok) {
    throw new ApiError(`Erro ${response.status} ao consultar ${path}.`, response.status);
  }

  return response.json() as Promise<T>;
}

export function getCycles(): Promise<Cycle[]> {
  return request<Cycle[]>("/study_plan/cycles");
}

export function getSubjects(cycleId?: number): Promise<Subject[]> {
  const query = cycleId !== undefined ? `?study_cycle_id=${cycleId}` : "";
  return request<Subject[]>(`/study_plan/subjects${query}`);
}
