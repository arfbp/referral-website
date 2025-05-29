
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { User, FileText, LogIn, Home } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

const NavigationMenu = () => {
  const location = useLocation();
  const { user, loading } = useAuth();

  const isActive = (path: string) => location.pathname === path;

  // Don't render navigation while loading
  if (loading) {
    return (
      <div className="fixed top-0 left-0 right-0 z-50 w-full bg-white/10 backdrop-blur-md border-b border-white/20">
        <div className="max-w-4xl mx-auto px-4 py-3">
          <div className="flex items-center justify-center gap-4">
            <div className="animate-pulse bg-white/20 h-8 w-16 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed top-0 left-0 right-0 z-50 w-full bg-white/10 backdrop-blur-md border-b border-white/20">
      <div className="max-w-4xl mx-auto px-4 py-3">
        <div className="flex items-center justify-center gap-4">
          <Link to="/home">
            <Button 
              variant={isActive('/home') ? "default" : "ghost"} 
              size="sm"
              className="text-white hover:bg-white/20"
            >
              <Home className="h-4 w-4 mr-2" />
              Home
            </Button>
          </Link>

          {!user && (
            <Link to="/login">
              <Button 
                variant={isActive('/login') || isActive('/signup') ? "default" : "ghost"} 
                size="sm"
                className="text-white hover:bg-white/20"
              >
                <LogIn className="h-4 w-4 mr-2" />
                Login/Sign Up
              </Button>
            </Link>
          )}
          
          <Link to="/form">
            <Button 
              variant={isActive('/form') || isActive('/') ? "default" : "ghost"} 
              size="sm"
              className="text-white hover:bg-white/20"
            >
              <FileText className="h-4 w-4 mr-2" />
              Form
            </Button>
          </Link>
          
          {user && (
            <Link to="/profile">
              <Button 
                variant={isActive('/profile') ? "default" : "ghost"} 
                size="sm"
                className="text-white hover:bg-white/20"
              >
                <User className="h-4 w-4 mr-2" />
                Profile
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavigationMenu;
