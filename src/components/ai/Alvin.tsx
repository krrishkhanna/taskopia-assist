
import React, { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send, BotIcon, User, X, Minimize, Maximize, Sparkles, ThumbsUp, ThumbsDown } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface Message {
  id: string;
  content: string;
  sender: "user" | "ai";
  timestamp: Date;
}

// Predefined task-related responses for the AI
const taskResponses = [
  "I'd recommend breaking down your project into smaller, manageable tasks.",
  "Setting deadlines for your tasks can help with time management.",
  "Try using the Pomodoro technique - 25 minutes of focus, then a 5-minute break.",
  "For complex projects, consider creating a mind map to organize your thoughts.",
  "Remember to prioritize tasks based on urgency and importance.",
  "Taking regular breaks can actually improve your productivity.",
  "Consider delegating some tasks if you're feeling overwhelmed.",
  "Don't forget to celebrate your achievements, even the small ones!",
  "Try starting your day with the most challenging task when your energy is highest.",
  "Creating a dedicated workspace can help minimize distractions."
];

// Predefined productivity tips
const productivityTips = [
  "Use the 2-minute rule: If a task takes less than 2 minutes, do it immediately.",
  "Block out specific times for checking emails rather than constantly responding.",
  "Try time-blocking your calendar to allocate specific times for different tasks.",
  "Consider using the Eisenhower Matrix to prioritize tasks.",
  "Limit multitasking as it can reduce productivity by up to 40%.",
  "Take short walks when you feel your focus waning.",
  "Stay hydrated! Dehydration can lead to decreased cognitive performance.",
  "Try using focus apps that block distracting websites during work periods.",
  "Set SMART goals: Specific, Measurable, Achievable, Relevant, and Time-bound.",
  "End each day by planning your tasks for tomorrow."
];

const Alvin = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      content: "Hi, I'm Alvin! How can I help you manage your tasks today?",
      sender: "ai",
      timestamp: new Date(),
    },
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // Focus input when chat is opened
  useEffect(() => {
    if (isOpen && !isMinimized && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen, isMinimized]);

  const generateResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    // Specific responses based on user input
    if (input.includes("hello") || input.includes("hi")) {
      return "Hello! How can I assist you with your tasks today?";
    } else if (input.includes("task") && (input.includes("create") || input.includes("add"))) {
      return "To create a new task, click the 'New Task' button on the dashboard or tasks page. Would you like me to help you organize your priorities?";
    } else if (input.includes("deadline") || input.includes("due date")) {
      return "I can help you manage deadlines. Consider setting due dates for all important tasks and I'll send you reminders as they approach.";
    } else if (input.includes("priority") || input.includes("important")) {
      return "For better productivity, try focusing on high-priority tasks first. Would you like me to suggest a task organization system?";
    } else if (input.includes("help") || input.includes("features")) {
      return "Taskopia helps you manage tasks, track deadlines, and collaborate with teams. You can create tasks, set priorities, add due dates, and monitor progress. What specific feature would you like to learn more about?";
    } else if (input.includes("analyze") || input.includes("productivity")) {
      return "I can analyze your task completion patterns and suggest productivity improvements. Would you like me to review your recent task history?";
    } else if (input.includes("tip") || input.includes("advice")) {
      return productivityTips[Math.floor(Math.random() * productivityTips.length)];
    } else if (input.includes("overwhelmed") || input.includes("stressed")) {
      return "I understand how overwhelming task management can get. Try breaking down your projects into smaller tasks and focus on one at a time. Would you like some stress management techniques?";
    } else if (input.includes("thank")) {
      return "You're welcome! I'm here anytime you need assistance with your tasks. Is there anything else I can help you with?";
    } else {
      // Default to a random task-related response
      return taskResponses[Math.floor(Math.random() * taskResponses.length)];
    }
  };

  const handleSendMessage = () => {
    if (!input.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: "user",
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate AI response with typing effect
    setTimeout(() => {
      const response = generateResponse(input);

      const aiMessage: Message = {
        id: Date.now().toString(),
        content: response,
        sender: "ai",
        timestamp: new Date(),
      };
      
      setIsTyping(false);
      setMessages(prev => [...prev, aiMessage]);
    }, Math.floor(Math.random() * 1000) + 500); // Random delay between 500-1500ms for more realistic typing
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  const handleFeedback = (isPositive: boolean) => {
    toast({
      title: isPositive ? "Thank you for your feedback!" : "We'll improve our responses",
      description: isPositive 
        ? "We're glad Alvin was helpful." 
        : "Your feedback helps us make Alvin better.",
    });
  };

  if (!isOpen) {
    return (
      <Button
        className="fixed bottom-6 right-6 rounded-full h-14 w-14 shadow-lg flex items-center justify-center group hover:scale-105 transition-transform"
        onClick={() => setIsOpen(true)}
      >
        <Sparkles className="h-5 w-5 absolute opacity-0 group-hover:opacity-100 transition-opacity animate-pulse" />
        <BotIcon className="h-6 w-6 group-hover:scale-90 transition-transform" />
      </Button>
    );
  }

  return (
    <Card className={`
      fixed bottom-6 right-6 
      ${isMinimized ? 'w-64 h-12' : 'w-80 sm:w-96 h-[450px]'}
      shadow-xl transition-all duration-200 overflow-hidden
      border-primary/20
    `}>
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-primary/90 text-white p-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <BotIcon className="h-5 w-5" />
          <span className="font-medium">Alvin</span>
        </div>
        <div className="flex items-center gap-1">
          {isMinimized ? (
            <Button variant="ghost" size="icon" onClick={() => setIsMinimized(false)} className="h-6 w-6 text-white hover:bg-primary-foreground/20">
              <Maximize className="h-4 w-4" />
            </Button>
          ) : (
            <Button variant="ghost" size="icon" onClick={() => setIsMinimized(true)} className="h-6 w-6 text-white hover:bg-primary-foreground/20">
              <Minimize className="h-4 w-4" />
            </Button>
          )}
          <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="h-6 w-6 text-white hover:bg-primary-foreground/20">
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      {!isMinimized && (
        <>
          {/* Messages */}
          <CardContent className="p-3 flex-1 overflow-auto h-[350px]">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`
                      flex gap-2 max-w-[80%] 
                      ${message.sender === "user" 
                        ? 'flex-row-reverse' 
                        : 'flex-row'
                      }
                    `}
                  >
                    <div className={`
                      h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0
                      ${message.sender === "user" 
                        ? 'bg-primary text-white' 
                        : 'bg-secondary text-primary'
                      }
                    `}>
                      {message.sender === "user" 
                        ? <User className="h-4 w-4" /> 
                        : <BotIcon className="h-4 w-4" />
                      }
                    </div>
                    <div
                      className={`
                        p-3 rounded-lg 
                        ${message.sender === "user" 
                          ? 'bg-primary text-white rounded-tr-none' 
                          : 'bg-gray-100 text-gray-800 rounded-tl-none'
                        }
                      `}
                    >
                      {message.content}
                      {message.sender === "ai" && (
                        <div className="flex items-center justify-end gap-1 mt-2">
                          <button 
                            onClick={() => handleFeedback(true)}
                            className="text-gray-400 hover:text-green-500 transition-colors"
                          >
                            <ThumbsUp className="h-3 w-3" />
                          </button>
                          <button 
                            onClick={() => handleFeedback(false)}
                            className="text-gray-400 hover:text-red-500 transition-colors"
                          >
                            <ThumbsDown className="h-3 w-3" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex gap-2 max-w-[80%]">
                    <div className="h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0 bg-secondary text-primary">
                      <BotIcon className="h-4 w-4" />
                    </div>
                    <div className="p-3 rounded-lg bg-gray-100 text-gray-800 rounded-tl-none">
                      <div className="flex space-x-1">
                        <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
          </CardContent>
          
          {/* Input */}
          <CardFooter className="p-3 border-t">
            <div className="flex w-full gap-2">
              <Input
                ref={inputRef}
                placeholder="Ask Alvin about your tasks..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1"
              />
              <Button 
                size="icon" 
                onClick={handleSendMessage}
                disabled={!input.trim() || isTyping}
                className="bg-primary hover:bg-primary/90"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </CardFooter>
        </>
      )}
    </Card>
  );
};

export default Alvin;
