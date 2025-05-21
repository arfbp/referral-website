
import React from 'react';
import { Link } from 'react-router-dom';

const Logo = () => {
  return (
    <Link to="/" className="flex items-center gap-2">
      <div className="w-8 h-8 bg-gradient-hero rounded-md flex items-center justify-center">
        <span className="font-bold text-white">R</span>
      </div>
      <span className="font-bold text-lg bg-clip-text text-transparent bg-gradient-hero">ReferralApp</span>
    </Link>
  );
};

export default Logo;
