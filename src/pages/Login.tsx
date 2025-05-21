
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/components/AuthLayout';

const Login = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      // In a real app, we would validate against a backend
      const userData = localStorage.getItem('userData');
      
      if (!userData) {
        toast({
          title: "Login failed",
          description: "No account found with these credentials.",
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }
      
      const user = JSON.parse(userData);
      
      // Very simple validation - in a real app, this would be handled by your authentication system
      if (user.email === formData.email) {
        localStorage.setItem('isLoggedIn', 'true');
        
        toast({
          title: "Welcome back!",
          description: `Good to see you again, ${user.name}.`,
        });
        
        navigate('/profile');
      } else {
        toast({
          title: "Login failed",
          description: "Invalid email or password.",
          variant: "destructive",
        });
      }
      
      setIsLoading(false);
    }, 1000);
  };

  const footer = (
    <div className="text-center w-full">
      Don't have an account? <Link to="/signup" className="text-brand-purple font-medium hover:underline">Sign up</Link>
    </div>
  );

  return (
    <AuthLayout 
      title="Welcome Back" 
      description="Login to your account"
      footer={footer}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <Input 
            id="email"
            name="email" 
            type="email" 
            placeholder="you@example.com"
            required
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input 
            id="password"
            name="password" 
            type="password" 
            placeholder="Your password"
            required
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        
        <div className="text-right">
          <Link to="#" className="text-sm text-brand-purple hover:underline">
            Forgot password?
          </Link>
        </div>
        
        <Button 
          type="submit" 
          className="w-full bg-gradient-hero hover:opacity-90"
          disabled={isLoading}
        >
          {isLoading ? "Logging in..." : "Login"}
        </Button>
      </form>
    </AuthLayout>
  );
};

export default Login;
