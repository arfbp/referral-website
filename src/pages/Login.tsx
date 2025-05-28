
import React from 'react';
import AuthLayout from '@/components/AuthLayout';
import NavigationMenu from '@/components/NavigationMenu';

const Login = () => {
  return (
    <div className="min-h-screen bg-gradient-purple-blue">
      <NavigationMenu />
      <AuthLayout />
    </div>
  );
};

export default Login;
