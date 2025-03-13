
import React from "react";
import { TaskStatus, TaskPriority, TaskCategory } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, SlidersHorizontal, X } from "lucide-react";

interface TaskFilterProps {
  statusFilter: TaskStatus | "all";
  priorityFilter: TaskPriority | "all";
  categoryFilter: TaskCategory | "all"; 
  sortBy: string;
  searchQuery: string;
  onStatusFilterChange: (status: TaskStatus | "all") => void;
  onPriorityFilterChange: (priority: TaskPriority | "all") => void;
  onCategoryFilterChange: (category: TaskCategory | "all") => void;
  onSortByChange: (sortBy: string) => void;
  onSearchQueryChange: (query: string) => void;
  onClearFilters: () => void;
}

const TaskFilter: React.FC<TaskFilterProps> = ({
  statusFilter,
  priorityFilter,
  categoryFilter,
  sortBy,
  searchQuery,
  onStatusFilterChange,
  onPriorityFilterChange,
  onCategoryFilterChange,
  onSortByChange,
  onSearchQueryChange,
  onClearFilters,
}) => {
  const hasActiveFilters = 
    statusFilter !== "all" || 
    priorityFilter !== "all" || 
    categoryFilter !== "all" || 
    searchQuery !== "";

  return (
    <div className="space-y-4 animate-fade-in">
      <div className="flex flex-col md:flex-row gap-3">
        <div className="flex-1 relative">
          <Input
            value={searchQuery}
            onChange={(e) => onSearchQueryChange(e.target.value)}
            placeholder="Search tasks..."
            className="w-full pl-10"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          {searchQuery && (
            <button
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              onClick={() => onSearchQueryChange("")}
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        <div className="flex items-center gap-2 md:gap-3">
          <p className="text-sm font-medium text-gray-500 hidden md:block">Sort by:</p>
          <Select
            value={sortBy}
            onValueChange={onSortByChange}
          >
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="dueDate">Due Date</SelectItem>
              <SelectItem value="priority">Priority</SelectItem>
              <SelectItem value="status">Status</SelectItem>
              <SelectItem value="title">Title</SelectItem>
              <SelectItem value="created">Created</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-3 items-center">
        <div className="flex items-center w-full md:w-auto">
          <SlidersHorizontal className="h-4 w-4 text-gray-500 mr-2" />
          <span className="text-sm font-medium text-gray-500">Filters:</span>
        </div>
        
        <div className="flex flex-wrap gap-3 w-full">
          <Select
            value={statusFilter}
            onValueChange={(value) => onStatusFilterChange(value as TaskStatus | "all")}
          >
            <SelectTrigger className="w-[110px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="todo">To Do</SelectItem>
              <SelectItem value="in-progress">In Progress</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={priorityFilter}
            onValueChange={(value) => onPriorityFilterChange(value as TaskPriority | "all")}
          >
            <SelectTrigger className="w-[110px]">
              <SelectValue placeholder="Priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Priority</SelectItem>
              <SelectItem value="low">Low</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="high">High</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={categoryFilter}
            onValueChange={(value) => onCategoryFilterChange(value as TaskCategory | "all")}
          >
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="work">Work</SelectItem>
              <SelectItem value="personal">Personal</SelectItem>
              <SelectItem value="health">Health</SelectItem>
              <SelectItem value="finance">Finance</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>

          {hasActiveFilters && (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={onClearFilters}
              className="text-sm gap-1.5"
            >
              <X className="h-3.5 w-3.5" />
              Clear Filters
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskFilter;
