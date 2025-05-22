import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import CategorySelector from './CategorySelector';
import SocialPlatforms from './SocialPlatforms';
import PaymentMethodSelector from './PaymentMethodSelector';

// Hardcoded Google Sheets Web App URL
const GOOGLE_SHEETS_URL = "https://script.google.com/macros/s/AKfycbwDv-_C2CMCwDnDiPJkrPn1f5zaIDyk_aPV4c5CNpxfWDSfesbZHbXh_dKy35xhLnVV/exec";

const CreatorForm = () => {
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
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

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

  return (
    <Card className="glass-morphism w-full max-w-2xl mt-8">
      <CardContent className="pt-6">
        <h2 className="text-2xl font-semibold mb-6 text-center text-white">Creator Application Form</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="channelName" className="text-white">Nama Channel (Bstation)</Label>
            <Input 
              id="channelName"
              name="channelName"
              placeholder="Your channel name"
              required
              className="rounded-lg"
              value={formData.channelName}
              onChange={handleInputChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="whatsappNumber" className="text-white">Nomor Whatsapp</Label>
            <Input 
              id="whatsappNumber"
              name="whatsappNumber"
              placeholder="628xxxxxxxxxx"
              required
              className="rounded-lg"
              value={formData.whatsappNumber}
              onChange={handleInputChange}
            />
          </div>

          <div className="space-y-2">
            <Label className="text-white">Kategori</Label>
            <CategorySelector 
              selectedCategory={formData.category} 
              onChange={handleCategoryChange} 
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="userId" className="text-white">UID (User ID, bisa cek di profile)</Label>
            <Input 
              id="userId"
              name="userId"
              placeholder="Your User ID"
              required
              className="rounded-lg"
              value={formData.userId}
              onChange={handleInputChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="activationCode" className="text-white">Kode Aktivasi</Label>
            <Input 
              id="activationCode"
              name="activationCode"
              placeholder="Enter activation code"
              required
              className="rounded-lg"
              value={formData.activationCode}
              onChange={handleInputChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="channelLink" className="text-white">Link Channel kamu (YT / Tiktok / Platform Lain)</Label>
            <Input 
              id="channelLink"
              name="channelLink"
              placeholder="https://"
              required
              className="rounded-lg"
              value={formData.channelLink}
              onChange={handleInputChange}
            />
          </div>

          <div className="space-y-2">
            <Label className="text-white">Di Platform apa paling aktif (pilih minimal satu)</Label>
            <SocialPlatforms 
              activePlatforms={formData.activePlatforms} 
              onPlatformToggle={handlePlatformToggle} 
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="followers" className="text-white">Jumlah Follower / Subscriber</Label>
            <Input 
              id="followers"
              name="followers"
              placeholder="e.g. 5000"
              required
              className="rounded-lg"
              value={formData.followers}
              onChange={handleInputChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="city" className="text-white">Dikota mana kamu tinggal</Label>
            <Input 
              id="city"
              name="city"
              placeholder="Nama kota"
              required
              className="rounded-lg"
              value={formData.city}
              onChange={handleInputChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="occupation" className="text-white">Pekerjaan sehari-hari</Label>
            <Input 
              id="occupation"
              name="occupation"
              placeholder="Pekerjaan kamu"
              required
              className="rounded-lg"
              value={formData.occupation}
              onChange={handleInputChange}
            />
          </div>

          <div className="space-y-2">
            <Label className="text-white">Rekening/Ewallet</Label>
            <PaymentMethodSelector
              selectedMethod={formData.paymentMethod}
              otherPayment={formData.otherPayment}
              onMethodChange={handlePaymentMethodChange}
              onOtherPaymentChange={handleInputChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="paymentAccount" className="text-white">Rekening/Ewallet dan atas nama (xxx-a/n)</Label>
            <Input 
              id="paymentAccount"
              name="paymentAccount"
              placeholder="e.g. 1234567890 a/n John Doe"
              required
              className="rounded-lg"
              value={formData.paymentAccount}
              onChange={handleInputChange}
            />
          </div>

          <Button 
            type="submit" 
            className="w-full rounded-lg btn-primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Application'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default CreatorForm;
