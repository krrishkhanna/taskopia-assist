
import React from "react";
import { Task } from "@/types";
import { 
  Calendar, 
  Clock, 
  CheckCircle2, 
  Edit2, 
  Trash2, 
  AlertCircle 
} from "lucide-react";
import { 
  formatDate, 
  getPriorityColorClass, 
  getStatusColorClass, 
  formatStatus,
  isOverdue
} from "@/utils/taskUtils";
import { 
  Card, 
  CardContent, 
  CardFooter, 
  CardHeader 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
  onStatusChange: (taskId: string, status: Task["status"]) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ 
  task, 
  onEdit, 
  onDelete, 
  onStatusChange 
}) => {
  const isTaskOverdue = isOverdue(task);
  
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-glass border animate-scale-in card-hover">
      <CardHeader className="p-4 pb-2 flex flex-row justify-between items-start space-y-0">
        <div className="w-full">
          <div className="flex justify-between items-start gap-4">
            <div className="flex-1">
              <h3 className="text-lg font-medium text-gray-900 line-clamp-1">
                {task.title}
              </h3>
            </div>
            <div>
              <Badge 
                variant="outline" 
                className={`${getPriorityColorClass(task.priority)} px-2 py-1 text-xs font-medium`}
              >
                {task.priority}
              </Badge>
            </div>
          </div>
          
          <div className="flex items-center gap-2 mt-1.5 text-sm text-gray-500">
            <Badge 
              variant="outline" 
              className={`${getStatusColorClass(task.status)} px-2 py-0.5 text-xs font-medium`}
            >
              {formatStatus(task.status)}
            </Badge>
            
            <Badge 
              variant="outline" 
              className="bg-gray-50 text-gray-600 border-gray-200 px-2 py-0.5 text-xs"
            >
              {task.category}
            </Badge>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-4 pt-2">
        <p className="text-sm text-gray-600 line-clamp-2 min-h-[2.5rem]">
          {task.description}
        </p>
        
        {task.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-3">
            {task.tags.map(tag => (
              <span 
                key={tag} 
                className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </CardContent>
      
      <CardFooter className="p-4 pt-2 flex justify-between items-center border-t border-gray-100">
        <div className="flex items-center gap-4">
          <div className="flex items-center text-sm text-gray-500">
            <Calendar className="h-3.5 w-3.5 mr-1 text-gray-400" />
            <span className={isTaskOverdue ? "text-red-500 font-medium" : ""}>
              {formatDate(task.dueDate)}
              {isTaskOverdue && (
                <span className="ml-1 inline-flex">
                  <AlertCircle className="h-3.5 w-3.5 text-red-500" />
                </span>
              )}
            </span>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8 text-gray-500 hover:text-blue-600 hover:bg-blue-50"
            onClick={() => onEdit(task)}
          >
            <Edit2 className="h-4 w-4" />
          </Button>
          
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8 text-gray-500 hover:text-green-600 hover:bg-green-50"
            onClick={() => onStatusChange(task.id, task.status === "completed" ? "todo" : "completed")}
          >
            <CheckCircle2 className={`h-4 w-4 ${task.status === "completed" ? "text-green-500" : ""}`} />
          </Button>
          
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8 text-gray-500 hover:text-red-600 hover:bg-red-50"
            onClick={() => onDelete(task.id)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default TaskCard;
