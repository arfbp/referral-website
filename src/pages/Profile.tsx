
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { LogOut, User } from 'lucide-react';
import CopyButton from '@/components/CopyButton';
import Logo from '@/components/Logo';
import ProfileCompletionForm from '@/components/ProfileCompletionForm';

interface UserData {
  id: string;
  name: string;
  email: string;
  referralCode: string;
  referrals: string[];
}

const Profile = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState<UserData | null>(null);
  const referralLink = `${window.location.origin}/form?ref=${userData?.referralCode || ''}`;
  
  useEffect(() => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }
    
    // Get user data
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }
  }, [navigate]);
  
  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    navigate('/login');
  };
  
  if (!userData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading profile...</p>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-light/50 to-white">
      {/* Header */}
      <header className="border-b bg-white shadow-sm">
        <div className="container max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <Logo />
          
          <Button variant="ghost" size="sm" onClick={handleLogout} className="gap-2">
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </Button>
        </div>
      </header>
      
      {/* Main content */}
      <main className="container max-w-6xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-3 gap-6">
          {/* Profile details */}
          <Card className="md:col-span-1">
            <CardHeader>
              <div className="mx-auto bg-brand-light rounded-full p-4 mb-4">
                <User className="w-16 h-16 text-brand-purple" />
              </div>
              <CardTitle className="text-center">{userData.name}</CardTitle>
              <CardDescription className="text-center">{userData.email}</CardDescription>
            </CardHeader>
            
            <CardContent>
              <h3 className="font-medium mb-2">User Information:</h3>
              <ul className="space-y-2">
                <li>
                  <span className="text-sm text-muted-foreground">Member ID:</span>
                  <p>{userData.id}</p>
                </li>
                <li>
                  <span className="text-sm text-muted-foreground">Total Referrals:</span>
                  <p>{userData.referrals.length}</p>
                </li>
              </ul>
            </CardContent>
          </Card>
          
          {/* Referral section */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Your Referral Program</CardTitle>
              <CardDescription>
                Share your referral link with friends and earn rewards
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <h3 className="font-medium">Your Referral Code</h3>
                <div className="flex items-center gap-2">
                  <div className="bg-muted p-2 rounded flex-1 font-mono">
                    {userData.referralCode}
                  </div>
                  <CopyButton text={userData.referralCode} />
                </div>
              </div>
              
              <div className="space-y-2">
                <h3 className="font-medium">Your Referral Link</h3>
                <div className="flex items-center gap-2">
                  <div className="bg-muted p-2 rounded flex-1 text-sm overflow-hidden text-ellipsis whitespace-nowrap">
                    {referralLink}
                  </div>
                  <CopyButton text={referralLink} />
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  This link directs friends to our creator application form with your referral code.
                </p>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="font-medium mb-3">Share with Friends</h3>
                <div className="flex flex-wrap gap-2">
                  <Button variant="outline" className="gap-2">
                    <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                      <path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z"/>
                    </svg>
                    Twitter
                  </Button>
                  <Button variant="outline" className="gap-2">
                    <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                      <path d="M512 256C512 114.6 397.4 0 256 0S0 114.6 0 256C0 376 82.7 476.8 194.2 504.5V334.2H141.4V256h52.8V222.3c0-87.1 39.4-127.5 125-127.5c16.2 0 44.2 3.2 55.7 6.4V172c-6-.6-16.5-1-29.6-1c-42 0-58.2 15.9-58.2 57.2V256h83.6l-14.4 78.2H287V510.1C413.8 494.8 512 386.9 512 256h0z"/>
                    </svg>
                    Facebook
                  </Button>
                  <Button variant="outline" className="gap-2">
                    <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                      <path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z"/>
                    </svg>
                    WhatsApp
                  </Button>
                  <Button variant="outline" className="gap-2">
                    <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                      <path d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z"/>
                    </svg>
                    Email
                  </Button>
                </div>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="font-medium mb-3">Your Referrals</h3>
                {userData.referrals.length > 0 ? (
                  <ul className="space-y-2">
                    {userData.referrals.map((referral, index) => (
                      <li key={index} className="p-3 border rounded-md flex justify-between items-center">
                        <span>{referral}</span>
                        <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded-full">
                          Successful
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="text-center py-8 border rounded-md bg-muted/30">
                    <p className="text-muted-foreground">No referrals yet. Share your code to get started!</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Profile Completion Form */}
        <div className="mt-8">
          <ProfileCompletionForm 
            userEmail={userData.email} 
            referralCode={userData.referralCode} 
          />
        </div>
      </main>
    </div>
  );
};

export default Profile;
