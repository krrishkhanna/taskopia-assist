
import React, { useState } from "react";
import { format } from "date-fns";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import Navbar from "@/components/layout/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckSquare, ChevronLeft, ChevronRight, Calendar as CalendarIcon, Clock } from "lucide-react";
import { mockTasks } from "@/lib/mockData";
import { Task } from "@/types";

const Calendar = () => {
  const [date, setDate] = useState<Date>(new Date());
  const [view, setView] = useState<"day" | "week" | "month">("month");
  
  // Filter tasks for the selected date
  const tasksForSelectedDate = mockTasks.filter(task => {
    if (!task.dueDate) return false;
    
    const taskDate = new Date(task.dueDate);
    return (
      taskDate.getDate() === date.getDate() &&
      taskDate.getMonth() === date.getMonth() &&
      taskDate.getFullYear() === date.getFullYear()
    );
  });

  const handlePreviousMonth = () => {
    const previousMonth = new Date(date);
    previousMonth.setMonth(previousMonth.getMonth() - 1);
    setDate(previousMonth);
  };

  const handleNextMonth = () => {
    const nextMonth = new Date(date);
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    setDate(nextMonth);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <Card className="shadow-sm h-full">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle>Calendar</CardTitle>
                  <div className="flex items-center gap-1">
                    <Button variant="ghost" size="icon" onClick={handlePreviousMonth}>
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={handleNextMonth}>
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <CalendarComponent
                  mode="single"
                  selected={date}
                  onSelect={(date) => date && setDate(date)}
                  className="rounded-md border"
                />
                
                <div className="mt-6">
                  <Tabs defaultValue="month" className="w-full">
                    <TabsList className="grid grid-cols-3">
                      <TabsTrigger value="day" onClick={() => setView("day")}>Day</TabsTrigger>
                      <TabsTrigger value="week" onClick={() => setView("week")}>Week</TabsTrigger>
                      <TabsTrigger value="month" onClick={() => setView("month")}>Month</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="lg:col-span-2">
            <Card className="shadow-sm h-full">
              <CardHeader className="pb-4">
                <CardTitle>
                  <span className="flex items-center gap-2">
                    <CalendarIcon className="h-5 w-5 text-primary" />
                    {format(date, "MMMM d, yyyy")}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {tasksForSelectedDate.length > 0 ? (
                  <div className="space-y-4">
                    {tasksForSelectedDate.map((task: Task) => (
                      <div key={task.id} className="flex items-start gap-3 p-3 rounded-lg border border-gray-200 hover:border-primary transition-colors">
                        <div className={`p-2 rounded-md ${task.priority === 'high' ? 'bg-red-100' : task.priority === 'medium' ? 'bg-yellow-100' : 'bg-green-100'}`}>
                          <CheckSquare className="h-4 w-4 text-gray-700" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium mb-1">{task.title}</h3>
                          <p className="text-sm text-gray-500 line-clamp-2 mb-2">
                            {task.description}
                          </p>
                          {task.dueDate && (
                            <div className="flex items-center gap-1 text-xs text-gray-500">
                              <Clock className="h-3 w-3" />
                              <span>{format(new Date(task.dueDate), "h:mm a")}</span>
                            </div>
                          )}
                        </div>
                        <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                          task.status === 'completed' 
                            ? 'bg-green-100 text-green-800' 
                            : task.status === 'in-progress' 
                            ? 'bg-blue-100 text-blue-800' 
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {task.status}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <CalendarIcon className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                    <h3 className="text-lg font-medium text-gray-700 mb-2">No tasks scheduled</h3>
                    <p className="text-gray-500 mb-4">There are no tasks scheduled for this date.</p>
                    <Button>Create Task</Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Calendar;
