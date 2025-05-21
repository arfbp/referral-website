
import React from 'react';
import AuthTabs from '@/components/auth/AuthTabs';
import CreatorForm from '@/components/creator/CreatorForm';

const FormPage = () => {
  return (
    <div className="min-h-screen bg-gradient-purple-blue flex flex-col items-center justify-center p-4 py-10">
      <AuthTabs />
      <CreatorForm />
    </div>
  );
};

export default FormPage;
