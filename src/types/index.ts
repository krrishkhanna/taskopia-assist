
export type TaskPriority = "low" | "medium" | "high";
export type TaskStatus = "todo" | "in-progress" | "completed";
export type TaskCategory = "work" | "personal" | "health" | "finance" | "other";

export interface Task {
  id: string;
  title: string;
  description: string;
  priority: TaskPriority;
  status: TaskStatus;
  category: TaskCategory;
  dueDate: Date | null;
  createdAt: Date;
  updatedAt: Date;
  completed: boolean;
  tags: string[];
}

export interface TaskStats {
  total: number;
  completed: number;
  overdue: number;
  highPriority: number;
}

export interface AIAssistantSuggestion {
  id: string;
  type: "reminder" | "productivity" | "deadline" | "recommendation";
  message: string;
  relatedTaskId?: string;
  actionLabel?: string;
  actionFn?: () => void;
}
