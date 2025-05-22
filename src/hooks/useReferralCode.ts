
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export const useReferralCode = () => {
  const [referralCode, setReferralCode] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const refCode = params.get('ref');
    
    if (refCode) {
      setReferralCode(refCode);
      // Store in session storage in case we need it later
      sessionStorage.setItem('referralCode', refCode);
    }
  }, [location.search]);

  return referralCode;
};
