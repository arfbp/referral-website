
import React, { useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Logo from '@/components/Logo';

const Index = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  useEffect(() => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    
    if (isLoggedIn) {
      navigate('/profile');
      return;
    }
    
    // Check for referral code
    const queryParams = new URLSearchParams(location.search);
    const referralCode = queryParams.get('ref');
    
    if (referralCode) {
      // Store referral code in localStorage
      localStorage.setItem('referredBy', referralCode);
      console.log(`User referred by code: ${referralCode}`);
      
      // In a real app, you'd track this referral in your backend
    }
  }, [navigate, location]);
  
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b bg-white shadow-sm">
        <div className="container max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <Logo />
          
          <div className="flex gap-2">
            <Button variant="ghost" asChild>
              <Link to="/login">Login</Link>
            </Button>
            <Button className="bg-gradient-hero hover:opacity-90" asChild>
              <Link to="/signup">Sign Up</Link>
            </Button>
          </div>
        </div>
      </header>
      
      {/* Hero section */}
      <section className="bg-gradient-to-br from-brand-light to-white py-20">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-hero">
              Grow Your Network with Referrals
            </h1>
            <p className="text-lg mb-8 text-gray-700">
              Join our referral program and earn rewards by inviting your friends and colleagues.
              The more you share, the more you earn!
            </p>
            <Button size="lg" className="bg-gradient-hero hover:opacity-90" asChild>
              <Link to="/signup" className="flex items-center gap-2">
                Get Started <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Features */}
      <section className="py-20">
        <div className="container max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 border rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-brand-light rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-brand-purple font-bold">1</span>
              </div>
              <h3 className="font-bold text-xl mb-2">Create Account</h3>
              <p className="text-gray-600">Sign up for free and get your unique referral link</p>
            </div>
            
            <div className="text-center p-6 border rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-brand-light rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-brand-purple font-bold">2</span>
              </div>
              <h3 className="font-bold text-xl mb-2">Share Link</h3>
              <p className="text-gray-600">Share your referral link with friends and network</p>
            </div>
            
            <div className="text-center p-6 border rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-brand-light rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-brand-purple font-bold">3</span>
              </div>
              <h3 className="font-bold text-xl mb-2">Earn Rewards</h3>
              <p className="text-gray-600">Get rewarded when your referrals join the platform</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="border-t py-8">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <Logo />
            <p className="text-sm text-gray-500 mt-4 md:mt-0">
              © 2025 ReferralApp. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
