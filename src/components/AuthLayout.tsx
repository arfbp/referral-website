
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  description?: string;
  footer?: React.ReactNode;
}

const AuthLayout = ({ children, title, description, footer }: AuthLayoutProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-brand-light to-white p-4">
      <div className="absolute top-0 left-0 w-full h-64 bg-gradient-hero opacity-20" />
      
      <Card className="w-full max-w-md shadow-lg animate-fade-in">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">{title}</CardTitle>
          {description && <CardDescription className="text-center">{description}</CardDescription>}
        </CardHeader>
        
        <CardContent>{children}</CardContent>
        
        {footer && <CardFooter>{footer}</CardFooter>}
      </Card>
    </div>
  );
};

export default AuthLayout;
