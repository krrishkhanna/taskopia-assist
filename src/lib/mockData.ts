
import { Task, AIAssistantSuggestion } from "@/types";

// Helper function to generate random IDs
const generateId = () => Math.random().toString(36).substring(2, 10);

// Current date
const now = new Date();

// Create some mock tasks
export const mockTasks: Task[] = [
  {
    id: generateId(),
    title: "Complete project proposal",
    description: "Finalize and submit the Q3 project proposal with budget estimates",
    priority: "high",
    status: "in-progress",
    category: "work",
    dueDate: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 2),
    createdAt: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 5),
    updatedAt: now,
    completed: false,
    tags: ["project", "quarterly", "deadline"]
  },
  {
    id: generateId(),
    title: "Weekly team meeting",
    description: "Prepare agenda and discussion points for weekly team sync",
    priority: "medium",
    status: "todo",
    category: "work",
    dueDate: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1),
    createdAt: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 2),
    updatedAt: now,
    completed: false,
    tags: ["meeting", "weekly", "team"]
  },
  {
    id: generateId(),
    title: "Gym session",
    description: "One-hour workout focusing on cardio and upper body",
    priority: "medium",
    status: "todo",
    category: "health",
    dueDate: new Date(now.getFullYear(), now.getMonth(), now.getDate()),
    createdAt: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1),
    updatedAt: now,
    completed: false,
    tags: ["health", "fitness", "routine"]
  },
  {
    id: generateId(),
    title: "Pay utility bills",
    description: "Pay electricity, water, and internet bills",
    priority: "high",
    status: "todo",
    category: "finance",
    dueDate: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 3),
    createdAt: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 3),
    updatedAt: now,
    completed: false,
    tags: ["bills", "monthly", "finance"]
  },
  {
    id: generateId(),
    title: "Read current book chapter",
    description: "Continue reading 'Atomic Habits' chapters 7-8",
    priority: "low",
    status: "todo",
    category: "personal",
    dueDate: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 5),
    createdAt: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 6),
    updatedAt: now,
    completed: false,
    tags: ["reading", "personal-development", "habit"]
  },
  {
    id: generateId(),
    title: "Order groceries",
    description: "Restock essentials and prepare for weekend meal prep",
    priority: "medium",
    status: "completed",
    category: "personal",
    dueDate: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1),
    createdAt: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 4),
    updatedAt: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1),
    completed: true,
    tags: ["shopping", "food", "weekly"]
  },
  {
    id: generateId(),
    title: "Update portfolio website",
    description: "Add recent projects and update skills section",
    priority: "low",
    status: "in-progress",
    category: "work",
    dueDate: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 10),
    createdAt: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 10),
    updatedAt: now,
    completed: false,
    tags: ["career", "development", "portfolio"]
  }
];

// Create some mock AI suggestions
export const mockSuggestions: AIAssistantSuggestion[] = [
  {
    id: generateId(),
    type: "deadline",
    message: "Your 'Complete project proposal' task has a deadline in 2 days. Consider prioritizing this.",
    relatedTaskId: mockTasks[0].id,
    actionLabel: "Focus Now",
  },
  {
    id: generateId(),
    type: "productivity",
    message: "Based on your habits, you're most productive in the morning. Schedule high-priority tasks then.",
    actionLabel: "View Schedule",
  },
  {
    id: generateId(),
    type: "reminder",
    message: "Don't forget your gym session today.",
    relatedTaskId: mockTasks[2].id,
    actionLabel: "Mark Complete",
  },
  {
    id: generateId(),
    type: "recommendation",
    message: "You have several unrelated tasks due this week. Consider grouping similar activities for better efficiency.",
    actionLabel: "Group Tasks",
  }
];

// Generate task statistics
export const mockTaskStats = {
  total: mockTasks.length,
  completed: mockTasks.filter(task => task.completed).length,
  overdue: mockTasks.filter(task => task.dueDate && task.dueDate < now && !task.completed).length,
  highPriority: mockTasks.filter(task => task.priority === "high").length
};
