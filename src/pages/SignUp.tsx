
import React from 'react';
import AuthLayout from '@/components/AuthLayout';
import NavigationMenu from '@/components/NavigationMenu';
import AuthForm from '@/components/AuthForm';

const SignUp = () => {
  return (
    <div className="min-h-screen bg-gradient-purple-blue">
      <NavigationMenu />
      <AuthLayout 
        title="Create an Account" 
        description="Get started with your referral journey"
      >
        <AuthForm isLogin={false} />
      </AuthLayout>
    </div>
  );
};

export default SignUp;
