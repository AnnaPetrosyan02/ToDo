
export type Priority = "low" | "medium" | "high";

export interface ITodo {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  priority: Priority;
}