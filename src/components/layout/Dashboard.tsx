
import React from "react";
import { Task, TaskStats } from "@/types";
import { formatDate, isOverdue } from "@/utils/taskUtils";
import {
  CheckCircle2,
  Clock,
  AlertTriangle,
  TrendingUp,
  ArrowUpRight,
  FlameIcon
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

interface DashboardProps {
  stats: TaskStats;
  recentTasks: Task[];
  overdueCount: number;
  onCreateTask: () => void;
  onViewTask: (task: Task) => void;
  onViewAllTasks: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({
  stats,
  recentTasks,
  overdueCount,
  onCreateTask,
  onViewTask,
  onViewAllTasks,
}) => {
  const completionRate = stats.total > 0 
    ? Math.round((stats.completed / stats.total) * 100) 
    : 0;

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-gray-500 mt-1">
            Overview of your tasks and progress
          </p>
        </div>
        <Button onClick={onCreateTask} className="flex-shrink-0">
          Create New Task
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-white shadow-subtle animate-fade-in">
          <CardHeader className="pb-2">
            <CardDescription>Total Tasks</CardDescription>
            <CardTitle className="text-3xl">{stats.total}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center text-sm text-muted-foreground">
              <span>Task completion rate</span>
              <span className="font-medium">{completionRate}%</span>
            </div>
            <Progress className="h-2 mt-2" value={completionRate} />
          </CardContent>
        </Card>
        
        <Card className="bg-white shadow-subtle animate-fade-in [animation-delay:100ms]">
          <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
            <div>
              <CardDescription>Completed</CardDescription>
              <CardTitle className="text-3xl">{stats.completed}</CardTitle>
            </div>
            <CheckCircle2 className="h-6 w-6 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-sm text-green-600">
              <div className="flex items-center gap-1">
                <TrendingUp className="h-4 w-4" />
                <span>
                  {completionRate}% completion rate
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white shadow-subtle animate-fade-in [animation-delay:200ms]">
          <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
            <div>
              <CardDescription>Overdue</CardDescription>
              <CardTitle className="text-3xl">{stats.overdue}</CardTitle>
            </div>
            <AlertTriangle className={`h-6 w-6 ${stats.overdue > 0 ? 'text-red-500' : 'text-gray-400'}`} />
          </CardHeader>
          <CardContent>
            <div className={`text-sm ${stats.overdue > 0 ? 'text-red-600' : 'text-gray-500'}`}>
              {stats.overdue > 0 
                ? `${stats.overdue} task${stats.overdue > 1 ? 's' : ''} past due date`
                : 'No overdue tasks'}
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white shadow-subtle animate-fade-in [animation-delay:300ms]">
          <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
            <div>
              <CardDescription>High Priority</CardDescription>
              <CardTitle className="text-3xl">{stats.highPriority}</CardTitle>
            </div>
            <FlameIcon className={`h-6 w-6 ${stats.highPriority > 0 ? 'text-orange-500' : 'text-gray-400'}`} />
          </CardHeader>
          <CardContent>
            <div className="text-sm text-orange-600">
              {stats.highPriority > 0 
                ? `${stats.highPriority} high priority task${stats.highPriority > 1 ? 's' : ''}`
                : 'No high priority tasks'}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Tasks */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Recent Tasks</h2>
          <Button variant="ghost" size="sm" onClick={onViewAllTasks} className="gap-1">
            View All
            <ArrowUpRight className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="space-y-3">
          {recentTasks.length > 0 ? (
            recentTasks.map((task) => (
              <Card 
                key={task.id} 
                className="animate-fade-in card-hover" 
                onClick={() => onViewTask(task)}
              >
                <CardContent className="p-4 flex items-center justify-between cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-full ${task.completed ? 'bg-green-100' : 'bg-blue-100'}`}>
                      {task.completed ? (
                        <CheckCircle2 className="h-5 w-5 text-green-600" />
                      ) : (
                        <Clock className="h-5 w-5 text-blue-600" />
                      )}
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{task.title}</h3>
                      <div className="flex items-center gap-4 mt-1">
                        <span className="text-sm text-gray-500">
                          {task.category}
                        </span>
                        <span className={`text-sm ${isOverdue(task) ? 'text-red-500 font-medium' : 'text-gray-500'}`}>
                          {task.dueDate ? `Due ${formatDate(task.dueDate)}` : 'No due date'}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                      task.priority === 'high' 
                        ? 'bg-red-50 text-red-600' 
                        : task.priority === 'medium' 
                          ? 'bg-orange-50 text-orange-600' 
                          : 'bg-green-50 text-green-600'
                    }`}>
                      {task.priority}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">No recent tasks found.</p>
              <Button onClick={onCreateTask} className="mt-4">
                Create Your First Task
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
