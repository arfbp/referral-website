
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useToast } from '@/hooks/use-toast';

// Google Sheets Web App URL
const GOOGLE_SHEETS_URL = "https://script.google.com/macros/s/AKfycbyCOvqcTULiqLUe5Cs-ZhHFchuWRrVDsw_SJwbdzKYElNhYupWfBMz5LM7KkY70j2e2/exec";

interface ProfileCompletionFormProps {
  userEmail: string;
  referralCode: string;
}

const ProfileCompletionForm: React.FC<ProfileCompletionFormProps> = ({ userEmail, referralCode }) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [paymentAccount, setPaymentAccount] = useState('');
  const [otherPayment, setOtherPayment] = useState('');

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
        timestamp: new Date().toISOString(),
      };

      // Send data to Google Sheets
      await fetch(GOOGLE_SHEETS_URL, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(profileData),
      });
      
      toast({
        title: "Profile updated",
        description: "Your profile has been successfully updated.",
      });
      
      setIsLoading(false);
      
    } catch (error) {
      console.error("Update error:", error);
      toast({
        title: "Update failed",
        description: "There was a problem updating your profile. Please try again.",
        variant: "destructive"
      });
      setIsLoading(false);
    }
  };

  return (
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
              onChange={(e) => setWhatsappNumber(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label>Rekening/Ewallet</Label>
            <RadioGroup 
              value={paymentMethod}
              onValueChange={setPaymentMethod}
              className="grid grid-cols-3 gap-2"
            >
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
              <Input 
                placeholder="Specify payment method"
                value={otherPayment}
                onChange={(e) => setOtherPayment(e.target.value)}
                required
              />
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="paymentAccount">Rekening/Ewallet dan atas nama (xxx-a/n)</Label>
            <Input 
              id="paymentAccount"
              placeholder="e.g. 1234567890 a/n John Doe"
              required
              value={paymentAccount}
              onChange={(e) => setPaymentAccount(e.target.value)}
            />
          </div>
          
          <Button 
            type="submit" 
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? "Updating..." : "Update Profile"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ProfileCompletionForm;
