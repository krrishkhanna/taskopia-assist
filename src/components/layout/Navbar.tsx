
import React, { useState } from "react";
import { NavLink, Link, useNavigate, useLocation } from "react-router-dom";
import { 
  CheckSquare, 
  LayoutDashboard, 
  Calendar, 
  Settings, 
  Bell, 
  Search, 
  Menu, 
  X,
  LogIn,
  UserPlus,
  ChevronLeft
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { toast } from "@/hooks/use-toast";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [notificationCount, setNotificationCount] = useState(3); // Start with 3 unread notifications
  const navigate = useNavigate();
  const location = useLocation();
  
  // Check if current route is not the dashboard
  const isNotDashboard = location.pathname !== "/";

  const handleNotificationClick = () => {
    if (notificationCount > 0) {
      toast({
        title: "Notifications cleared",
        description: `${notificationCount} notifications have been marked as read.`,
      });
      setNotificationCount(0);
    }
  };

  const dummyNotifications = [
    {
      id: 1,
      title: "Task deadline approaching",
      description: "Marketing plan due in 2 hours",
    },
    {
      id: 2,
      title: "New team message",
      description: "Sarah commented on your task",
    },
    {
      id: 3,
      title: "Weekly summary",
      description: "You completed 8 tasks this week",
    }
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo and Brand */}
        <div className="flex items-center gap-3">
          {isNotDashboard && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => navigate('/')}
              className="mr-1 text-gray-600 hover:text-gray-900"
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Back to Dashboard
            </Button>
          )}
          <NavLink to="/" className="flex items-center gap-2">
            <CheckSquare className="h-6 w-6 text-primary" />
            <span className="text-xl font-medium tracking-tight">Taskopia</span>
          </NavLink>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          <NavLink 
            to="/" 
            className={({ isActive }) => 
              `px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive 
                  ? "text-primary bg-secondary" 
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              }`
            }
          >
            <div className="flex items-center gap-2">
              <LayoutDashboard className="h-4 w-4" />
              <span>Dashboard</span>
            </div>
          </NavLink>
          
          <NavLink 
            to="/tasks" 
            className={({ isActive }) => 
              `px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive 
                  ? "text-primary bg-secondary" 
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              }`
            }
          >
            <div className="flex items-center gap-2">
              <CheckSquare className="h-4 w-4" />
              <span>Tasks</span>
            </div>
          </NavLink>
          
          <NavLink 
            to="/calendar" 
            className={({ isActive }) => 
              `px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive 
                  ? "text-primary bg-secondary" 
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              }`
            }
          >
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>Calendar</span>
            </div>
          </NavLink>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="text-gray-600 hover:text-gray-900">
            <Search className="h-5 w-5" />
          </Button>
          
          {/* Notification Bell with Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative text-gray-600 hover:text-gray-900">
                <Bell className="h-5 w-5" />
                {notificationCount > 0 && (
                  <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    {notificationCount}
                  </span>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <div className="p-2 font-medium border-b flex justify-between items-center">
                <span>Notifications</span>
                {notificationCount > 0 && (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={handleNotificationClick}
                    className="h-7 text-xs"
                  >
                    Mark all as read
                  </Button>
                )}
              </div>
              {dummyNotifications.map(notification => (
                <DropdownMenuItem key={notification.id} className="p-3 cursor-pointer">
                  <div>
                    <p className="font-medium">{notification.title}</p>
                    <p className="text-sm text-gray-500">{notification.description}</p>
                  </div>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          
          {/* Sign In and Sign Up Buttons - Desktop */}
          <div className="hidden md:flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-gray-600 hover:text-gray-900"
              onClick={() => navigate('/signin')}
            >
              <LogIn className="h-4 w-4 mr-1" />
              Sign In
            </Button>
            <Button 
              variant="default" 
              size="sm"
              onClick={() => navigate('/signup')}
            >
              <UserPlus className="h-4 w-4 mr-1" />
              Sign Up
            </Button>
          </div>
          
          <Button variant="ghost" size="icon" className="text-gray-600 hover:text-gray-900 md:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-200 animate-slide-down">
          <nav className="container mx-auto py-3 px-4 flex flex-col space-y-1">
            <NavLink 
              to="/" 
              className={({ isActive }) => 
                `px-3 py-3 rounded-lg text-sm font-medium transition-colors ${
                  isActive 
                    ? "text-primary bg-secondary" 
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                }`
              }
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <div className="flex items-center gap-2">
                <LayoutDashboard className="h-4 w-4" />
                <span>Dashboard</span>
              </div>
            </NavLink>
            
            <NavLink 
              to="/tasks" 
              className={({ isActive }) => 
                `px-3 py-3 rounded-lg text-sm font-medium transition-colors ${
                  isActive 
                    ? "text-primary bg-secondary" 
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                }`
              }
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <div className="flex items-center gap-2">
                <CheckSquare className="h-4 w-4" />
                <span>Tasks</span>
              </div>
            </NavLink>
            
            <NavLink 
              to="/calendar" 
              className={({ isActive }) => 
                `px-3 py-3 rounded-lg text-sm font-medium transition-colors ${
                  isActive 
                    ? "text-primary bg-secondary" 
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                }`
              }
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>Calendar</span>
              </div>
            </NavLink>
            
            <NavLink 
              to="/settings" 
              className={({ isActive }) => 
                `px-3 py-3 rounded-lg text-sm font-medium transition-colors ${
                  isActive 
                    ? "text-primary bg-secondary" 
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                }`
              }
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <div className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                <span>Settings</span>
              </div>
            </NavLink>
            
            {/* Sign In and Sign Up - Mobile */}
            <div className="flex flex-col space-y-2 pt-2 border-t border-gray-100 mt-2">
              <Button 
                variant="ghost" 
                size="sm" 
                className="justify-start px-3 py-3"
                onClick={() => {
                  navigate('/signin');
                  setIsMobileMenuOpen(false);
                }}
              >
                <LogIn className="h-4 w-4 mr-2" />
                Sign In
              </Button>
              <Button 
                variant="default" 
                size="sm"
                className="justify-start px-3 py-3"
                onClick={() => {
                  navigate('/signup');
                  setIsMobileMenuOpen(false);
                }}
              >
                <UserPlus className="h-4 w-4 mr-2" />
                Sign Up
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
