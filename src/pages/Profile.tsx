
import React from 'react';
import ProfileCompletionForm from '@/components/ProfileCompletionForm';
import NavigationMenu from '@/components/NavigationMenu';

const Profile = () => {
  return (
    <div className="min-h-screen bg-gradient-purple-blue flex flex-col py-10 px-4 md:px-8 overflow-y-auto">
      <NavigationMenu />
      <div className="flex flex-col items-center">
        <div className="w-full max-w-2xl">
          <ProfileCompletionForm />
        </div>
      </div>
    </div>
  );
};

export default Profile;
