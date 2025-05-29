import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { formatNumberInput } from '@/utils/validation';

// Google Sheets Web App URL
const GOOGLE_SHEETS_URL = "https://script.google.com/macros/s/AKfycbyCOvqcTULiqLUe5Cs-ZhHFchuWRrVDsw_SJwbdzKYElNhYupWfBMz5LM7KkY70j2e2/exec";
interface ProfileCompletionFormProps {
  userEmail: string;
  referralCode: string;
}
const ProfileCompletionForm: React.FC<ProfileCompletionFormProps> = ({
  userEmail,
  referralCode
}) => {
  const {
    toast
  } = useToast();
  const {
    user
  } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [paymentAccount, setPaymentAccount] = useState('');
  const [accountName, setAccountName] = useState('');
  const [otherPayment, setOtherPayment] = useState('');
  const isEwallet = ['Gopay', 'Ovo', 'DANA', 'ShopeePay'].includes(paymentMethod);

  // Load saved profile data on component mount
  useEffect(() => {
    const profileData = localStorage.getItem(`profile_${userEmail}`);
    if (profileData) {
      const parsed = JSON.parse(profileData);
      setWhatsappNumber(parsed.whatsappNumber || '');
      setPaymentMethod(parsed.paymentMethod || '');
      setPaymentAccount(parsed.paymentAccount || '');
      setAccountName(parsed.accountName || '');
      setOtherPayment(parsed.otherPayment || '');
    }
  }, [userEmail]);

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
    setIsLoading(true);
    try {
      const profileData = {
        email: userEmail,
        referralCode: referralCode,
        whatsappNumber: whatsappNumber,
        paymentMethod: paymentMethod === 'Other' ? otherPayment : paymentMethod,
        paymentAccount: paymentAccount,
        accountName: isEwallet ? '' : accountName,
        timestamp: new Date().toISOString()
      };

      // Send data to Google Sheets
      await fetch(GOOGLE_SHEETS_URL, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(profileData)
      });

      // Save to localStorage to remember profile data
      localStorage.setItem(`profile_${userEmail}`, JSON.stringify(profileData));
      toast({
        title: "Profile updated",
        description: "Your profile has been successfully updated."
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
  return <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Complete Your Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="whatsapp">WhatsApp Number</Label>
              <Input id="whatsapp" type="tel" placeholder="Your WhatsApp number" required value={whatsappNumber} onChange={handleWhatsAppChange} />
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

              {paymentMethod === "Other" && <Input placeholder="Specify payment method" value={otherPayment} onChange={e => setOtherPayment(e.target.value)} required />}
            </div>

            <div className="space-y-2">
              <Label htmlFor="paymentAccount">
                Nomor Rekening / Ewallet
              </Label>
              <Input id="paymentAccount" placeholder={isEwallet ? "e.g. 081234567890" : "e.g. 1234567890"} required value={paymentAccount} onChange={handlePaymentAccountChange} />
            </div>

            {!isEwallet && paymentMethod && paymentMethod !== 'Other' && <div className="space-y-2">
                <Label htmlFor="accountName">Atas Nama Rekening</Label>
                <Input id="accountName" placeholder="e.g. John Doe" required value={accountName} onChange={e => setAccountName(e.target.value)} />
              </div>}
            
            <Button type="submit" className="w-full" disabled={isLoading}>
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
    </div>;
};
export default ProfileCompletionForm;