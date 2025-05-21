
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/components/AuthLayout';

const SignUp = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    // Validate password match
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please ensure both passwords are identical.",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    // Simulate API call
    setTimeout(() => {
      // Store user data in localStorage (this would be a real API call in production)
      const userData = {
        id: `user_${Date.now()}`,
        name: formData.name,
        email: formData.email,
        referralCode: Math.random().toString(36).substring(2, 8).toUpperCase(),
        referrals: []
      };

      localStorage.setItem('userData', JSON.stringify(userData));
      localStorage.setItem('isLoggedIn', 'true');
      
      toast({
        title: "Account created",
        description: "You've been successfully registered.",
      });
      
      setIsLoading(false);
      navigate('/profile');
    }, 1000);
  };

  const footer = (
    <div className="text-center w-full">
      Already have an account? <Link to="/login" className="text-brand-purple font-medium hover:underline">Login</Link>
    </div>
  );

  return (
    <AuthLayout 
      title="Create an Account" 
      description="Get started with your referral journey"
      footer={footer}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <Input 
            id="name"
            name="name" 
            placeholder="Your name"
            required
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        
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
            placeholder="Create a password"
            required
            minLength={6}
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input 
            id="confirmPassword"
            name="confirmPassword" 
            type="password" 
            placeholder="Confirm your password"
            required
            minLength={6}
            value={formData.confirmPassword}
            onChange={handleChange}
          />
        </div>
        
        <Button 
          type="submit" 
          className="w-full bg-gradient-hero hover:opacity-90"
          disabled={isLoading}
        >
          {isLoading ? "Creating account..." : "Create Account"}
        </Button>
      </form>
    </AuthLayout>
  );
};

export default SignUp;
