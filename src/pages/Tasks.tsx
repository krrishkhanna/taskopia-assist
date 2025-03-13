
import React, { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import TaskCard from "@/components/tasks/TaskCard";
import TaskForm from "@/components/tasks/TaskForm";
import TaskFilter from "@/components/ui/TaskFilter";
import AIAssistant from "@/components/ai/AIAssistant";
import { Task, TaskPriority, TaskStatus, TaskCategory } from "@/types";
import { sortTasks, filterTasks } from "@/utils/taskUtils";
import { mockTasks, mockSuggestions } from "@/lib/mockData";
import { Button } from "@/components/ui/button";
import { PlusCircle, ListFilter } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const Tasks = () => {
  const [tasks, setTasks] = useState<Task[]>(mockTasks);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>(mockTasks);
  const [isTaskFormOpen, setIsTaskFormOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState<Task | undefined>(undefined);
  const [statusFilter, setStatusFilter] = useState<TaskStatus | "all">("all");
  const [priorityFilter, setPriorityFilter] = useState<TaskPriority | "all">("all");
  const [categoryFilter, setCategoryFilter] = useState<TaskCategory | "all">("all");
  const [sortBy, setSortBy] = useState<string>("dueDate");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isMobileFilterVisible, setIsMobileFilterVisible] = useState(false);

  // Apply filters and sorting
  useEffect(() => {
    let result = filterTasks(
      tasks,
      statusFilter,
      priorityFilter,
      categoryFilter,
      searchQuery
    );
    
    result = sortTasks(result, sortBy);
    
    setFilteredTasks(result);
  }, [tasks, statusFilter, priorityFilter, categoryFilter, sortBy, searchQuery]);

  const handleCreateTask = () => {
    setCurrentTask(undefined);
    setIsTaskFormOpen(true);
  };

  const handleEditTask = (task: Task) => {
    setCurrentTask(task);
    setIsTaskFormOpen(true);
  };

  const handleDeleteTask = (taskId: string) => {
    setTasks(tasks.filter(task => task.id !== taskId));
    toast({
      title: "Task deleted",
      description: "Your task has been deleted successfully",
    });
  };

  const handleStatusChange = (taskId: string, status: Task["status"]) => {
    setTasks(tasks.map(task => {
      if (task.id === taskId) {
        const updatedTask = { 
          ...task, 
          status,
          completed: status === "completed"
        };
        return updatedTask;
      }
      return task;
    }));

    toast({
      title: status === "completed" ? "Task completed" : "Task status updated",
      description: status === "completed" 
        ? "Your task has been marked as completed" 
        : "Your task status has been updated",
    });
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

  const handleClearFilters = () => {
    setStatusFilter("all");
    setPriorityFilter("all");
    setCategoryFilter("all");
    setSearchQuery("");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Tasks</h1>
              <p className="text-gray-500 mt-1">
                Manage and organize all your tasks
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                className="sm:hidden"
                onClick={() => setIsMobileFilterVisible(!isMobileFilterVisible)}
              >
                <ListFilter className="h-4 w-4 mr-2" />
                Filters
              </Button>
              <Button onClick={handleCreateTask}>
                <PlusCircle className="h-4 w-4 mr-2" />
                New Task
              </Button>
            </div>
          </div>
          
          <div className={`${isMobileFilterVisible || !isMobileFilterVisible ? 'block' : 'hidden'} sm:block`}>
            <TaskFilter
              statusFilter={statusFilter}
              priorityFilter={priorityFilter}
              categoryFilter={categoryFilter}
              sortBy={sortBy}
              searchQuery={searchQuery}
              onStatusFilterChange={setStatusFilter}
              onPriorityFilterChange={setPriorityFilter}
              onCategoryFilterChange={setCategoryFilter}
              onSortByChange={setSortBy}
              onSearchQueryChange={setSearchQuery}
              onClearFilters={handleClearFilters}
            />
          </div>
        </div>
        
        {filteredTasks.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onEdit={handleEditTask}
                onDelete={handleDeleteTask}
                onStatusChange={handleStatusChange}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <h3 className="text-lg font-medium text-gray-900 mb-2">No tasks found</h3>
            <p className="text-gray-500 mb-6">
              {tasks.length > 0 
                ? "Try changing your filters or search query"
                : "Start by creating your first task"}
            </p>
            <Button onClick={handleCreateTask}>
              <PlusCircle className="h-4 w-4 mr-2" />
              Create New Task
            </Button>
          </div>
        )}
      </main>
      
      <TaskForm 
        task={currentTask}
        isOpen={isTaskFormOpen}
        onClose={() => setIsTaskFormOpen(false)}
        onSave={handleSaveTask}
      />
      
      <AIAssistant suggestions={mockSuggestions} />
    </div>
  );
};

export default Tasks;
