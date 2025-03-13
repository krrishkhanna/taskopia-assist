
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Dashboard from "@/components/layout/Dashboard";
import TaskForm from "@/components/tasks/TaskForm";
import AIAssistant from "@/components/ai/AIAssistant";
import { Task } from "@/types";
import { getTaskStats } from "@/utils/taskUtils";
import { mockTasks, mockSuggestions } from "@/lib/mockData";
import { toast } from "@/hooks/use-toast";

const Index = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState<Task[]>(mockTasks);
  const [isTaskFormOpen, setIsTaskFormOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState<Task | undefined>(undefined);

  // Get most recent tasks (limited to 5)
  const recentTasks = [...tasks]
    .sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime())
    .slice(0, 5);
  
  // Calculate stats
  const stats = getTaskStats(tasks);
  
  // Calculate overdue tasks
  const now = new Date();
  const overdueCount = tasks.filter(
    task => !task.completed && task.dueDate && task.dueDate < now
  ).length;

  const handleCreateTask = () => {
    setCurrentTask(undefined);
    setIsTaskFormOpen(true);
  };

  const handleEditTask = (task: Task) => {
    setCurrentTask(task);
    setIsTaskFormOpen(true);
  };

  const handleSaveTask = (task: Task) => {
    if (currentTask) {
      // Update existing task
      setTasks(tasks.map(t => t.id === task.id ? task : t));
      toast({
        title: "Task updated",
        description: "Your task has been updated successfully",
      });
    } else {
      // Add new task
      setTasks([...tasks, task]);
      toast({
        title: "Task created",
        description: "Your new task has been created successfully",
      });
    }
  };

  const handleViewAllTasks = () => {
    navigate("/tasks");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <Dashboard 
          stats={stats}
          recentTasks={recentTasks}
          overdueCount={overdueCount}
          onCreateTask={handleCreateTask}
          onViewTask={handleEditTask}
          onViewAllTasks={handleViewAllTasks}
        />
      </main>
      
      <TaskForm 
        task={currentTask}
        isOpen={isTaskFormOpen}
        onClose={() => setIsTaskFormOpen(false)}
        onSave={handleSaveTask}
      />
      
      {/* AI Assistants */}
      <AIAssistant suggestions={mockSuggestions} />
    </div>
  );
};

export default Index;
