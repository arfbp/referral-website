
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/components/AuthLayout';

const SignUp = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  
  // Form state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Generate user data
      const userData = {
        id: `user_${Date.now()}`,
        name: name,
        email: email,
        referralCode: Math.random().toString(36).substring(2, 8).toUpperCase(),
        referrals: [],
        timestamp: new Date().toISOString(),
      };

      // Store in localStorage
      localStorage.setItem('userData', JSON.stringify(userData));
      localStorage.setItem('isLoggedIn', 'true');
      
      toast({
        title: "Account created",
        description: "You've been successfully registered.",
      });
      
      setIsLoading(false);
      navigate('/profile');
      
    } catch (error) {
      console.error("Registration error:", error);
      toast({
        title: "Registration failed",
        description: "There was a problem creating your account. Please try again.",
        variant: "destructive"
      });
      setIsLoading(false);
    }
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
            type="text"
            placeholder="Your full name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <Input 
            id="email"
            type="email" 
            placeholder="you@example.com"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input 
            id="password"
            type="password" 
            placeholder="Create a password"
            required
            minLength={6}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
