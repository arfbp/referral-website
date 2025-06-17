
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
      // Store in session storage immediately when found
      sessionStorage.setItem('referralCode', refCode);
    } else {
      // Check if there's a stored referral code from previous visit
      const storedRefCode = sessionStorage.getItem('referralCode');
      if (storedRefCode) {
        setReferralCode(storedRefCode);
      }
    }
  }, [location.search]);

  return referralCode;
};
