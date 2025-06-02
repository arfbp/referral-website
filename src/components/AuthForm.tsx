
import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { supabase } from '@/integrations/supabase/client';
import { Turnstile } from '@marsidev/react-turnstile';

interface AuthFormProps {
  isLogin: boolean;
}

const AuthForm: React.FC<AuthFormProps> = ({ isLogin }) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [captchaToken, setCaptchaToken] = useState<string>('');
  const turnstileRef = useRef<any>(null);
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Use your actual site key
  const TURNSTILE_SITE_KEY = '0x4AAAAAABe-s1YQOylP3vqy';

  const handleCaptchaSuccess = (token: string) => {
    setCaptchaToken(token);
  };

  const handleCaptchaError = () => {
    setCaptchaToken('');
    toast({
      title: "Captcha failed",
      description: "Please try the captcha again.",
      variant: "destructive"
    });
  };

  const resetCaptcha = () => {
    if (turnstileRef.current) {
      turnstileRef.current.reset();
    }
    setCaptchaToken('');
  };

  const handleGoogleSignIn = async () => {
    try {
      setIsLoading(true);
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/profile`
        }
      });
      
      if (error) {
        toast({
          title: "Authentication failed",
          description: error.message,
          variant: "destructive"
        });
        resetCaptcha();
      }
    } catch (error) {
      console.error("Google sign-in error:", error);
      toast({
        title: "Authentication failed",
        description: "There was a problem signing in with Google.",
        variant: "destructive"
      });
      resetCaptcha();
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!captchaToken) {
      toast({
        title: "Captcha required",
        description: "Please complete the captcha verification.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
          options: {
            captchaToken
          }
        });
        
        if (error) {
          toast({
            title: "Login failed",
            description: error.message,
            variant: "destructive"
          });
          resetCaptcha();
          return;
        }
        
        toast({
          title: "Welcome back!",
          description: "You've been successfully logged in.",
        });
        
        navigate('/profile');
      } else {
        // Check if user already exists by attempting to sign in first
        const { data: existingSignIn, error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password: 'dummy_password_check',
        });

        // If sign in doesn't fail with "Invalid login credentials", user exists
        if (signInError && !signInError.message.includes('Invalid login credentials')) {
          if (signInError.message.includes('Email not confirmed') || signInError.message.includes('already registered')) {
            toast({
              title: "Account already exists",
              description: "An account with this email already exists. Please try logging in instead.",
              variant: "destructive"
            });
            resetCaptcha();
            return;
          }
        }

        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              name: name,
            },
            emailRedirectTo: `${window.location.origin}/profile`,
            captchaToken
          }
        });
        
        if (error) {
          if (error.message.includes('already registered') || error.message.includes('User already registered')) {
            toast({
              title: "Account already exists",
              description: "An account with this email already exists. Please try logging in instead.",
              variant: "destructive"
            });
            resetCaptcha();
            return;
          }
          toast({
            title: "Registration failed",
            description: error.message,
            variant: "destructive"
          });
          resetCaptcha();
          return;
        }

        // Always redirect to profile after successful signup
        toast({
          title: "Account created successfully!",
          description: "Welcome! Redirecting to your profile.",
        });
        navigate('/profile');
      }
    } catch (error) {
      console.error("Authentication error:", error);
      toast({
        title: "Authentication failed",
        description: "There was a problem with your request. Please try again.",
        variant: "destructive"
      });
      resetCaptcha();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <Button 
        type="button" 
        variant="outline" 
        className="w-full"
        onClick={handleGoogleSignIn}
        disabled={isLoading || !captchaToken}
      >
        Continue with Google
      </Button>
      
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {!isLogin && (
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
        )}
        
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
            placeholder={isLogin ? "Enter your password" : "Create a password"}
            required
            minLength={6}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* Turnstile Captcha */}
        <div className="space-y-2">
          <Label>Security Verification</Label>
          <div className="flex justify-center">
            <Turnstile
              ref={turnstileRef}
              siteKey={TURNSTILE_SITE_KEY}
              onSuccess={handleCaptchaSuccess}
              onError={handleCaptchaError}
              onExpire={() => setCaptchaToken('')}
              options={{
                theme: 'light',
                size: 'normal',
              }}
            />
          </div>
        </div>
        
        <Button 
          type="submit" 
          className="w-full bg-gradient-hero hover:opacity-90"
          disabled={isLoading || !captchaToken}
        >
          {isLoading ? (isLogin ? "Signing in..." : "Creating account...") : (isLogin ? "Sign In" : "Create Account")}
        </Button>
      </form>

      <div className="text-center text-sm">
        {isLogin ? (
          <>
            Don't have an account?{' '}
            <Link to="/signup" className="text-brand-purple font-medium hover:underline">
              Sign up
            </Link>
          </>
        ) : (
          <>
            Already have an account?{' '}
            <Link to="/login" className="text-brand-purple font-medium hover:underline">
              Sign in
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default AuthForm;
