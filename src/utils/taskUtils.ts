
import { Task, TaskStatus, TaskPriority, TaskStats } from "@/types";

// Sort tasks by various criteria
export const sortTasks = (tasks: Task[], sortBy: string): Task[] => {
  switch (sortBy) {
    case "dueDate":
      return [...tasks].sort((a, b) => {
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;
        return a.dueDate.getTime() - b.dueDate.getTime();
      });
    case "priority":
      const priorityOrder: Record<TaskPriority, number> = {
        high: 0,
        medium: 1,
        low: 2
      };
      return [...tasks].sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
    case "title":
      return [...tasks].sort((a, b) => a.title.localeCompare(b.title));
    case "status":
      const statusOrder: Record<TaskStatus, number> = {
        "todo": 0,
        "in-progress": 1,
        "completed": 2
      };
      return [...tasks].sort((a, b) => statusOrder[a.status] - statusOrder[b.status]);
    case "created":
      return [...tasks].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    default:
      return tasks;
  }
};

// Filter tasks by various criteria
export const filterTasks = (
  tasks: Task[],
  status?: TaskStatus | "all",
  priority?: TaskPriority | "all",
  category?: string | "all",
  searchQuery?: string
): Task[] => {
  return tasks.filter(task => {
    // Status filter
    if (status && status !== "all" && task.status !== status) {
      return false;
    }
    
    // Priority filter
    if (priority && priority !== "all" && task.priority !== priority) {
      return false;
    }
    
    // Category filter
    if (category && category !== "all" && task.category !== category) {
      return false;
    }
    
    // Search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        task.title.toLowerCase().includes(query) ||
        task.description.toLowerCase().includes(query) ||
        task.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }
    
    return true;
  });
};

// Get stats from tasks
export const getTaskStats = (tasks: Task[]): TaskStats => {
  const now = new Date();
  
  return {
    total: tasks.length,
    completed: tasks.filter(task => task.completed).length,
    overdue: tasks.filter(task => task.dueDate && task.dueDate < now && !task.completed).length,
    highPriority: tasks.filter(task => task.priority === "high").length
  };
};

// Format date for display
export const formatDate = (date: Date | null): string => {
  if (!date) return "No date";
  
  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  
  const isToday = 
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear();
    
  const isTomorrow = 
    date.getDate() === tomorrow.getDate() &&
    date.getMonth() === tomorrow.getMonth() &&
    date.getFullYear() === tomorrow.getFullYear();
    
  if (isToday) {
    return "Today";
  } else if (isTomorrow) {
    return "Tomorrow";
  } else {
    return date.toLocaleDateString("en-US", { 
      month: "short", 
      day: "numeric", 
      year: date.getFullYear() !== today.getFullYear() ? "numeric" : undefined 
    });
  }
};

// Get color class based on priority
export const getPriorityColorClass = (priority: TaskPriority): string => {
  switch (priority) {
    case "high":
      return "bg-red-50 text-red-600 border-red-200";
    case "medium":
      return "bg-orange-50 text-orange-600 border-orange-200";
    case "low":
      return "bg-green-50 text-green-600 border-green-200";
    default:
      return "bg-gray-50 text-gray-600 border-gray-200";
  }
};

// Get color class based on status
export const getStatusColorClass = (status: TaskStatus): string => {
  switch (status) {
    case "todo":
      return "bg-blue-50 text-blue-600 border-blue-200";
    case "in-progress":
      return "bg-purple-50 text-purple-600 border-purple-200";
    case "completed":
      return "bg-green-50 text-green-600 border-green-200";
    default:
      return "bg-gray-50 text-gray-600 border-gray-200";
  }
};

// Format status for display
export const formatStatus = (status: TaskStatus): string => {
  switch (status) {
    case "todo":
      return "To Do";
    case "in-progress":
      return "In Progress";
    case "completed":
      return "Completed";
    default:
      return status;
  }
};

// Generate a random ID
export const generateId = (): string => Math.random().toString(36).substring(2, 10);

// Check if a task is overdue
export const isOverdue = (task: Task): boolean => {
  return !task.completed && task.dueDate !== null && task.dueDate < new Date();
};
