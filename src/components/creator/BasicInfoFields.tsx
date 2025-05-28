
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface BasicInfoFieldsProps {
  formData: {
    channelName: string;
    whatsappNumber: string;
    category: string;
    uid: string;
    channelLink: string;
    activePlatforms: string[];
    followers: string;
    city: string;
    occupation: string;
    paymentMethod: string;
    paymentAccount: string;
    accountName: string;
    otherPayment: string;
    referralCode: string;
  };
  onChange: (field: string, value: string | string[]) => void;
  onCategoryChange: (value: string) => void;
}

const BasicInfoFields: React.FC<BasicInfoFieldsProps> = ({ formData, onChange, onCategoryChange }) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="channelName" className="text-white">Nama Channel/Akun</Label>
        <Input
          id="channelName"
          placeholder="Nama channel atau akun Anda"
          value={formData.channelName}
          onChange={(e) => onChange('channelName', e.target.value)}
          required
          className="rounded-lg"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="whatsappNumber" className="text-white">Nomor WhatsApp</Label>
        <Input
          id="whatsappNumber"
          type="tel"
          placeholder="08xxxxxxxxxx"
          value={formData.whatsappNumber}
          onChange={(e) => onChange('whatsappNumber', e.target.value)}
          required
          className="rounded-lg"
        />
      </div>
    </div>
  );
};

export default BasicInfoFields;
