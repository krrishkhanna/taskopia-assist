
import React, { useState } from "react";
import { AIAssistantSuggestion } from "@/types";
import {
  BrainCircuit,
  X,
  Clock,
  AlertCircle,
  PlusCircle,
  Lightbulb,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface AIAssistantProps {
  suggestions: AIAssistantSuggestion[];
}

const AIAssistant: React.FC<AIAssistantProps> = ({ suggestions }) => {
  const [isMinimized, setIsMinimized] = useState(false);
  const [currentSuggestionIndex, setCurrentSuggestionIndex] = useState(0);

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  const handleNext = () => {
    setCurrentSuggestionIndex((prev) => 
      prev === suggestions.length - 1 ? 0 : prev + 1
    );
  };

  const handlePrevious = () => {
    setCurrentSuggestionIndex((prev) => 
      prev === 0 ? suggestions.length - 1 : prev - 1
    );
  };

  const getSuggestionIcon = (type: AIAssistantSuggestion["type"]) => {
    switch (type) {
      case "deadline":
        return <Clock className="h-5 w-5 text-orange-500" />;
      case "reminder":
        return <AlertCircle className="h-5 w-5 text-blue-500" />;
      case "productivity":
        return <PlusCircle className="h-5 w-5 text-green-500" />;
      case "recommendation":
        return <Lightbulb className="h-5 w-5 text-purple-500" />;
      default:
        return <Lightbulb className="h-5 w-5 text-primary" />;
    }
  };

  const currentSuggestion = suggestions[currentSuggestionIndex];

  return (
    <div
      className={cn(
        "fixed bottom-6 right-6 z-50 transition-all duration-300 ease-in-out",
        isMinimized ? "w-16 h-16" : "w-80"
      )}
    >
      {isMinimized ? (
        <Button
          onClick={toggleMinimize}
          className="w-16 h-16 rounded-full shadow-lg bg-primary hover:bg-primary/90"
        >
          <BrainCircuit className="h-7 w-7 text-white" />
        </Button>
      ) : (
        <Card className="shadow-glass border overflow-hidden animate-scale-in">
          <div className="bg-primary text-white p-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BrainCircuit className="h-5 w-5" />
              <h3 className="font-medium">AI Assistant</h3>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 text-white hover:bg-primary-foreground/10"
              onClick={toggleMinimize}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          <CardContent className="p-4">
            {suggestions.length > 0 ? (
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-secondary rounded-full flex-shrink-0 mt-0.5">
                    {getSuggestionIcon(currentSuggestion.type)}
                  </div>
                  <div className="space-y-2 flex-1">
                    <p className="text-sm text-gray-700">{currentSuggestion.message}</p>
                    
                    {currentSuggestion.actionLabel && (
                      <Button 
                        size="sm" 
                        className="mt-2 text-xs font-medium"
                      >
                        {currentSuggestion.actionLabel}
                      </Button>
                    )}
                  </div>
                </div>

                {suggestions.length > 1 && (
                  <div className="flex items-center justify-between pt-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7"
                      onClick={handlePrevious}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    
                    <div className="text-xs text-gray-500">
                      {currentSuggestionIndex + 1} of {suggestions.length}
                    </div>
                    
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7"
                      onClick={handleNext}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-4">
                <Lightbulb className="h-8 w-8 text-gray-300 mb-2" />
                <p className="text-sm text-gray-500 text-center">
                  No suggestions right now. I'll analyze your tasks and provide insights soon.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AIAssistant;
