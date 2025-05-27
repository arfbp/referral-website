
import React from 'react';
import { Link } from 'react-router-dom';

const Logo = () => {
  return (
    <Link to="/" className="flex items-center gap-2">
      <div className="w-8 h-8 bg-gradient-hero rounded-md flex items-center justify-center">
        <span className="font-bold text-white text-xs">BS</span>
      </div>
      <span className="font-bold text-lg bg-clip-text text-transparent bg-gradient-hero">ReferralForm</span>
    </Link>
  );
};

export default Logo;
