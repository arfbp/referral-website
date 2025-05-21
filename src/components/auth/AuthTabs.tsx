
import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const AuthTabs = () => {
  const [activeTab, setActiveTab] = useState<"login" | "signup">("login");
  const [authForm, setAuthForm] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });
  const { toast } = useToast();

  const handleAuthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAuthForm(prev => ({ ...prev, [name]: value }));
  };

  const handleAuthSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (activeTab === "signup" && authForm.password !== authForm.confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please make sure your passwords match.",
        variant: "destructive"
      });
      return;
    }

    // Simulate auth
    toast({
      title: activeTab === "login" ? "Login successful" : "Signup successful",
      description: activeTab === "login" 
        ? "You've been logged in successfully." 
        : "Your account has been created successfully.",
    });

    // In a real app, you would handle authentication here
    if (activeTab === "signup") {
      // After signup, automatically log them in
      localStorage.setItem('isLoggedIn', 'true');
    } else {
      localStorage.setItem('isLoggedIn', 'true');
    }
  };

  return (
    <Card className="glass-morphism w-full max-w-md">
      <CardContent className="pt-6">
        <Tabs defaultValue="login" onValueChange={(value) => setActiveTab(value as "login" | "signup")} className="w-full">
          <TabsList className="grid grid-cols-2 mb-6">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>
          
          <TabsContent value="login">
            <form onSubmit={handleAuthSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="login-email">Email</Label>
                <Input 
                  id="login-email"
                  name="email"
                  type="email"
                  placeholder="youremail@example.com"
                  required
                  className="rounded-lg"
                  value={authForm.email}
                  onChange={handleAuthChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="login-password">Password</Label>
                <Input 
                  id="login-password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  required
                  className="rounded-lg"
                  value={authForm.password}
                  onChange={handleAuthChange}
                />
              </div>
              
              <Button type="submit" className="w-full rounded-lg btn-primary mt-4">
                Login
              </Button>
            </form>
          </TabsContent>
          
          <TabsContent value="signup">
            <form onSubmit={handleAuthSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="signup-email">Email</Label>
                <Input 
                  id="signup-email"
                  name="email"
                  type="email"
                  placeholder="youremail@example.com"
                  required
                  className="rounded-lg"
                  value={authForm.email}
                  onChange={handleAuthChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="signup-password">Password</Label>
                <Input 
                  id="signup-password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  required
                  className="rounded-lg"
                  value={authForm.password}
                  onChange={handleAuthChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="signup-confirm-password">Confirm Password</Label>
                <Input 
                  id="signup-confirm-password"
                  name="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  required
                  className="rounded-lg"
                  value={authForm.confirmPassword}
                  onChange={handleAuthChange}
                />
              </div>
              
              <Button type="submit" className="w-full rounded-lg btn-primary mt-4">
                Create Account
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default AuthTabs;
