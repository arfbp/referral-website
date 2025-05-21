
import React from 'react';
import AuthTabs from '@/components/auth/AuthTabs';
import CreatorForm from '@/components/creator/CreatorForm';

const FormPage = () => {
  return (
    <div className="min-h-screen bg-gradient-purple-blue flex flex-col items-center py-10 px-4 md:px-8 overflow-y-auto">
      <div className="w-full max-w-7xl flex flex-col lg:flex-row justify-between gap-8">
        <div className="w-full lg:w-2/5">
          <div className="sticky top-10">
            <h2 className="text-2xl font-bold text-white mb-6 text-center lg:text-left">Account Access</h2>
            <AuthTabs />
          </div>
        </div>
        
        <div className="w-full lg:w-3/5">
          <h2 className="text-2xl font-bold text-white mb-6 text-center lg:text-left">Creator Application</h2>
          <CreatorForm />
        </div>
      </div>
    </div>
  );
};

export default FormPage;
