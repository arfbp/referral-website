
import React from 'react';
import CreatorForm from '@/components/creator/CreatorForm';

const FormPage = () => {
  return (
    <div className="min-h-screen bg-gradient-purple-blue flex flex-col items-center py-10 px-4 md:px-8 overflow-y-auto">
      <div className="w-full max-w-2xl">
        <h2 className="text-3xl font-bold text-white mb-8 text-center">Creator Application</h2>
        <CreatorForm />
      </div>
    </div>
  );
};

export default FormPage;
