
import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent } from '@/components/ui/card';
import { useReferralCode } from '@/hooks/useReferralCode';
import FormHeader from './FormHeader';
import BasicInfoFields from './BasicInfoFields';
import PlatformAndLocationFields from './PlatformAndLocationFields';
import PaymentFields from './PaymentFields';
import FormSubmitButton from './FormSubmitButton';

// Hardcoded Google Sheets Web App URL
const GOOGLE_SHEETS_URL = "https://script.google.com/macros/s/AKfycbwDv-_C2CMCwDnDiPJkrPn1f5zaIDyk_aPV4c5CNpxfWDSfesbZHbXh_dKy35xhLnVV/exec";

const CreatorForm = () => {
  const referralCode = useReferralCode();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    channelName: '',
    whatsappNumber: '',
    category: 'anime',
    userId: '',
    activationCode: '',
    channelLink: '',
    activePlatforms: [] as string[],
    followers: '',
    city: '',
    occupation: '',
    paymentMethod: '',
    paymentAccount: '',
    otherPayment: '',
    referralCode: referralCode || '', // Store the referral code in a dedicated field
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCategoryChange = (value: string) => {
    setFormData(prev => ({ ...prev, category: value }));
  };

  const handlePaymentMethodChange = (value: string) => {
    setFormData(prev => ({ ...prev, paymentMethod: value }));
  };

  const handlePlatformToggle = (platform: string) => {
    setFormData(prev => {
      const platforms = [...prev.activePlatforms];
      
      if (platforms.includes(platform)) {
        return { ...prev, activePlatforms: platforms.filter(p => p !== platform) };
      } else {
        return { ...prev, activePlatforms: [...platforms, platform] };
      }
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Validate form
    if (formData.activePlatforms.length === 0) {
      toast({
        title: "Platform selection required",
        description: "Please select at least one active platform.",
        variant: "destructive"
      });
      return;
    }

    if (formData.paymentMethod === "Other" && !formData.otherPayment) {
      toast({
        title: "Payment information missing",
        description: "Please specify your other payment method.",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);

    try {
      // Format data for Google Sheets
      const formattedData = {
        ...formData,
        activePlatforms: formData.activePlatforms.join(", "),
        timestamp: new Date().toISOString(),
        // Make sure referralCode is sent as a separate field
      };
      
      // Send data to Google Sheets using the hardcoded URL
      const response = await fetch(GOOGLE_SHEETS_URL, {
        method: "POST",
        mode: "no-cors", // This is needed for Google Sheets Web App
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formattedData),
      });
      
      // Since no-cors doesn't return status, we'll just assume it worked
      toast({
        title: "Form submitted successfully!",
        description: "Your application has been submitted to our database.",
      });
      
      console.log("Form Data:", formData);

      // Reset form after submission
      setFormData({
        channelName: '',
        whatsappNumber: '',
        category: 'anime',
        userId: '',
        activationCode: '',
        channelLink: '',
        activePlatforms: [],
        followers: '',
        city: '',
        occupation: '',
        paymentMethod: '',
        paymentAccount: '',
        otherPayment: '',
        referralCode: referralCode || '', // Maintain the referral code
      });
      
    } catch (error) {
      console.error("Submission error:", error);
      toast({
        title: "Submission failed",
        description: "There was a problem submitting your form. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Display the referral code if present
  React.useEffect(() => {
    if (referralCode) {
      setFormData(prev => ({ ...prev, referralCode }));
      toast({
        title: "Referral Detected",
        description: `You were referred by code: ${referralCode}`,
      });
    }
  }, [referralCode, toast]);

  return (
    <Card className="glass-morphism w-full max-w-2xl mt-8">
      <CardContent className="pt-6">
        <FormHeader referralCode={referralCode} />
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <BasicInfoFields 
            formData={formData} 
            onChange={handleInputChange}
            onCategoryChange={handleCategoryChange}
          />
          
          <PlatformAndLocationFields 
            formData={formData}
            onChange={handleInputChange}
            onPlatformToggle={handlePlatformToggle}
          />
          
          <PaymentFields 
            formData={formData}
            onChange={handleInputChange}
            onMethodChange={handlePaymentMethodChange}
          />

          <FormSubmitButton isSubmitting={isSubmitting} />
        </form>
      </CardContent>
    </Card>
  );
};

export default CreatorForm;
