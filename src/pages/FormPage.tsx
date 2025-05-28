
import React from 'react';
import CreatorForm from '@/components/creator/CreatorForm';
import NavigationMenu from '@/components/NavigationMenu';

const FormPage = () => {
  return (
    <div className="min-h-screen bg-gradient-purple-blue flex flex-col py-10 px-4 md:px-8 overflow-y-auto">
      <NavigationMenu />
      <div className="flex flex-col items-center">
        <div className="w-full max-w-2xl">
          <CreatorForm />
        </div>
      </div>
    </div>
  );
};

export default FormPage;
