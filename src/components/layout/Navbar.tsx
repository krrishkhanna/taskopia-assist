
import React, { useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
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
  UserPlus
} from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo and Brand */}
        <div className="flex items-center">
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
          <Button variant="ghost" size="icon" className="text-gray-600 hover:text-gray-900">
            <Bell className="h-5 w-5" />
          </Button>
          
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
