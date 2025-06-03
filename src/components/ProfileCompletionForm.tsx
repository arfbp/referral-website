import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { formatNumberInput } from '@/utils/validation';
import { supabase } from '@/integrations/supabase/client';

// Google Sheets Web App URL (keeping as backup)
const GOOGLE_SHEETS_URL = "https://script.google.com/macros/s/AKfycbyCOvqcTULiqLUe5Cs-ZhHFchuWRrVDsw_SJwbdzKYElNhYupWfBMz5LM7KkY70j2e2/exec";

interface ProfileCompletionFormProps {
  userEmail: string;
  referralCode: string;
}

const ProfileCompletionForm: React.FC<ProfileCompletionFormProps> = ({
  userEmail,
  referralCode
}) => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [paymentAccount, setPaymentAccount] = useState('');
  const [accountName, setAccountName] = useState('');
  const [otherPayment, setOtherPayment] = useState('');
  const [otherAccountName, setOtherAccountName] = useState('');
  
  // Original values to track changes
  const [originalValues, setOriginalValues] = useState({
    whatsappNumber: '',
    paymentMethod: '',
    paymentAccount: '',
    accountName: '',
    otherPayment: '',
    otherAccountName: ''
  });

  const isEwallet = ['Gopay', 'Ovo', 'DANA', 'ShopeePay'].includes(paymentMethod);

  // Load profile data from Supabase on component mount
  useEffect(() => {
    const loadProfileData = async () => {
      if (!user?.id) return;

      try {
        const { data, error } = await supabase
          .from('user_profiles')
          .select('*')
          .eq('user_id', user.id)
          .maybeSingle();

        if (error) {
          console.error('Error loading profile data:', error);
          return;
        }

        if (data) {
          const values = {
            whatsappNumber: data.whatsapp_number || '',
            paymentMethod: data.payment_method || '',
            paymentAccount: data.payment_account || '',
            accountName: data.account_name || '',
            otherPayment: data.payment_method === 'Other' ? data.payment_method : '',
            otherAccountName: data.payment_method === 'Other' ? data.account_name || '' : ''
          };
          
          setWhatsappNumber(values.whatsappNumber);
          setPaymentMethod(values.paymentMethod);
          setPaymentAccount(values.paymentAccount);
          setAccountName(values.accountName);
          setOtherPayment(values.otherPayment);
          setOtherAccountName(values.otherAccountName);
          setOriginalValues(values);
        }
      } catch (error) {
        console.error('Error loading profile data:', error);
      }
    };

    loadProfileData();
  }, [user?.id]);

  // Check if any values have changed
  const hasChanges = () => {
    return (
      whatsappNumber !== originalValues.whatsappNumber ||
      paymentMethod !== originalValues.paymentMethod ||
      paymentAccount !== originalValues.paymentAccount ||
      accountName !== originalValues.accountName ||
      otherPayment !== originalValues.otherPayment ||
      otherAccountName !== originalValues.otherAccountName
    );
  };

  // Social sharing functionality
  const currentUrl = window.location.origin;
  const shareText = `Join me on this amazing platform! Use my referral code: ${referralCode}`;
  const referralLink = `${currentUrl}?ref=${referralCode}`;

  const handleShareWhatsApp = () => {
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(`${shareText} ${referralLink}`)}`;
    window.open(whatsappUrl, '_blank');
  };
  const handleShareTwitter = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(referralLink)}`;
    window.open(twitterUrl, '_blank');
  };
  const handleShareFacebook = () => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(referralLink)}&quote=${encodeURIComponent(shareText)}`;
    window.open(facebookUrl, '_blank');
  };
  const handleCopyLink = () => {
    navigator.clipboard.writeText(referralLink).then(() => {
      toast({
        title: "Link copied!",
        description: "Referral link has been copied to clipboard."
      });
    });
  };
  const handleWhatsAppChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatNumberInput(e.target.value);
    setWhatsappNumber(formattedValue);
  };
  const handlePaymentAccountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatNumberInput(e.target.value);
    setPaymentAccount(formattedValue);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Check if there are any changes
    if (!hasChanges()) {
      toast({
        title: "No changes detected",
        description: "Please make changes to your profile before updating.",
        variant: "destructive"
      });
      return;
    }

    if (!user?.id) {
      toast({
        title: "Authentication error",
        description: "Please sign in to update your profile.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    
    try {
      // Format timestamp as yyyy-mm-dd
      const now = new Date();
      const formattedTimestamp = now.getFullYear() + '-' + 
        String(now.getMonth() + 1).padStart(2, '0') + '-' + 
        String(now.getDate()).padStart(2, '0');

      const finalPaymentMethod = paymentMethod === 'Other' ? otherPayment : paymentMethod;
      const finalAccountName = paymentMethod === 'Other' ? otherAccountName : (isEwallet ? '' : accountName);

      const profileData = {
        user_id: user.id,
        email: userEmail,
        referral_code: referralCode,
        whatsapp_number: whatsappNumber,
        payment_method: finalPaymentMethod,
        payment_account: paymentAccount,
        account_name: finalAccountName
      };

      // Save to Supabase database
      const { error } = await supabase
        .from('user_profiles')
        .upsert(profileData, { 
          onConflict: 'user_id',
          ignoreDuplicates: false 
        });

      if (error) {
        throw error;
      }

      // Also send to Google Sheets as backup
      try {
        await fetch(GOOGLE_SHEETS_URL, {
          method: "POST",
          mode: "no-cors",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            ...profileData,
            timestamp: formattedTimestamp
          })
        });
      } catch (sheetsError) {
        console.warn("Google Sheets backup failed:", sheetsError);
      }
      
      // Update original values to current values
      setOriginalValues({
        whatsappNumber,
        paymentMethod,
        paymentAccount,
        accountName,
        otherPayment,
        otherAccountName
      });

      toast({
        title: "Profile updated",
        description: "Your profile has been successfully saved to the database."
      });
    } catch (error) {
      console.error("Update error:", error);
      toast({
        title: "Update failed",
        description: "There was a problem updating your profile. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Complete Your Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="whatsapp">WhatsApp Number</Label>
              <Input 
                id="whatsapp" 
                type="tel" 
                placeholder="Your WhatsApp number" 
                required 
                value={whatsappNumber} 
                onChange={handleWhatsAppChange} 
              />
            </div>
            
            <div className="space-y-2">
              <Label>Rekening / Ewallet</Label>
              <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="grid grid-cols-3 gap-2">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Gopay" id="gopay" />
                  <Label htmlFor="gopay">Gopay</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Ovo" id="ovo" />
                  <Label htmlFor="ovo">Ovo</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="DANA" id="dana" />
                  <Label htmlFor="dana">DANA</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="ShopeePay" id="shopeepay" />
                  <Label htmlFor="shopeepay">ShopeePay</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="BRI" id="bri" />
                  <Label htmlFor="bri">BRI</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="BCA" id="bca" />
                  <Label htmlFor="bca">BCA</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="BNI" id="bni" />
                  <Label htmlFor="bni">BNI</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Mandiri" id="mandiri" />
                  <Label htmlFor="mandiri">Mandiri</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Other" id="other_payment" />
                  <Label htmlFor="other_payment">Other</Label>
                </div>
              </RadioGroup>

              {paymentMethod === "Other" && (
                <div className="space-y-2">
                  <Input 
                    placeholder="Specify payment method" 
                    value={otherPayment} 
                    onChange={e => setOtherPayment(e.target.value)} 
                    required 
                  />
                  <Input 
                    placeholder="Nama Atas Nama Rekening" 
                    value={otherAccountName} 
                    onChange={e => setOtherAccountName(e.target.value)} 
                    required 
                  />
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="paymentAccount">
                Nomor Rekening / Ewallet
              </Label>
              <Input 
                id="paymentAccount" 
                placeholder={isEwallet ? "e.g. 081234567890" : "e.g. 1234567890"} 
                required 
                value={paymentAccount} 
                onChange={handlePaymentAccountChange} 
              />
            </div>

            {!isEwallet && paymentMethod && paymentMethod !== 'Other' && (
              <div className="space-y-2">
                <Label htmlFor="accountName">Atas Nama Rekening</Label>
                <Input 
                  id="accountName" 
                  placeholder="e.g. John Doe" 
                  required 
                  value={accountName} 
                  onChange={e => setAccountName(e.target.value)} 
                />
              </div>
            )}
            
            <Button 
              type="submit" 
              className="w-full" 
              disabled={isLoading || !hasChanges()}
            >
              {isLoading ? "Updating..." : "Update Profile"}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Share Your Referral Link</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-3 bg-gray-100 rounded-lg">
              <p className="text-sm text-gray-600">Your referral code:</p>
              <p className="font-mono font-bold text-lg">{referralCode}</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="referralLink">Referral Link:</Label>
              <div className="flex gap-2">
                <Input id="referralLink" value={referralLink} readOnly className="bg-gray-50" />
                <Button type="button" variant="outline" onClick={handleCopyLink} className="whitespace-nowrap">
                  Copy
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="referralLinkClickable">Visit Referral Link:</Label>
              <div className="p-3 bg-blue-50 rounded-lg">
                <a 
                  href={referralLink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 underline break-all"
                >
                  {referralLink}
                </a>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <Button onClick={handleShareWhatsApp} variant="outline" className="w-full">
                Share on WhatsApp
              </Button>
              <Button onClick={handleShareTwitter} variant="outline" className="w-full">
                Share on Twitter
              </Button>
              <Button onClick={handleShareFacebook} variant="outline" className="w-full">
                Share on Facebook
              </Button>
              <Button onClick={handleCopyLink} variant="outline" className="w-full">
                Copy Link
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileCompletionForm;
