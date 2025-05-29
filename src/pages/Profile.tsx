
import React from 'react';
import ProfileCompletionForm from '@/components/ProfileCompletionForm';
import NavigationMenu from '@/components/NavigationMenu';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Profile = () => {
  const { user, loading, signOut } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-purple-blue flex items-center justify-center">
        <NavigationMenu />
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-purple-blue flex flex-col overflow-y-auto">
        <NavigationMenu />
        <div className="flex flex-col items-center justify-center flex-1 pt-20 px-4 md:px-8">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle className="text-center">Please Sign In</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="mb-4">You need to be signed in to access your profile.</p>
              <Button asChild>
                <a href="/login">Go to Login</a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const userEmail = user.email || '';
  const referralCode = user.id?.slice(-8).toUpperCase() || 'DEFAULT';

  return (
    <div className="min-h-screen bg-gradient-purple-blue flex flex-col overflow-y-auto">
      <NavigationMenu />
      <div className="flex flex-col items-center pt-20 py-10 px-4 md:px-8">
        <div className="w-full max-w-2xl">
          <div className="mb-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-white">Welcome, {user.user_metadata?.name || user.email}</h1>
            <Button variant="outline" onClick={signOut}>
              Sign Out
            </Button>
          </div>
          <ProfileCompletionForm userEmail={userEmail} referralCode={referralCode} />
        </div>
      </div>
    </div>
  );
};

export default Profile;
