
import React from 'react';
import { useLocation } from 'react-router-dom';
import CreatorForm from '@/components/creator/CreatorForm';
import NavigationMenu from '@/components/NavigationMenu';
import NotFound from '@/pages/NotFound';

const FormPage = () => {
  const location = useLocation();
  
  // Check for referral code in URL or sessionStorage
  const urlParams = new URLSearchParams(location.search);
  const refFromUrl = urlParams.get('ref');
  const refFromStorage = sessionStorage.getItem('referralCode');
  
  // If no referral code is found in either URL or sessionStorage, show 404
  if (!refFromUrl && !refFromStorage) {
    return <NotFound />;
  }

  return (
    <div className="min-h-screen bg-gradient-purple-blue flex flex-col overflow-y-auto">
      <NavigationMenu />
      <div className="flex flex-col items-center pt-20 py-10 px-4 md:px-8">
        <div className="w-full max-w-2xl">
          <CreatorForm />
        </div>
      </div>
    </div>
  );
};

export default FormPage;
