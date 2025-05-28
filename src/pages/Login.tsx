
import React from 'react';
import AuthLayout from '@/components/AuthLayout';
import NavigationMenu from '@/components/NavigationMenu';
import AuthForm from '@/components/AuthForm';

const Login = () => {
  return (
    <div className="min-h-screen bg-gradient-purple-blue">
      <NavigationMenu />
      <AuthLayout 
        title="Welcome Back" 
        description="Sign in to your account"
      >
        <AuthForm isLogin={true} />
      </AuthLayout>
    </div>
  );
};

export default Login;
