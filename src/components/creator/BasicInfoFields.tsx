
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import CategorySelector from './CategorySelector';
import { formatNumberInput } from '@/utils/validation';

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

const BasicInfoFields: React.FC<BasicInfoFieldsProps> = ({
  formData,
  onChange,
  onCategoryChange
}) => {
  const handleWhatsAppChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatNumberInput(e.target.value);
    onChange('whatsappNumber', formattedValue);
  };

  const handleUidChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatNumberInput(e.target.value);
    onChange('uid', formattedValue);
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="channelName" className="text-white">Nama Channel/Akun</Label>
        <Input 
          id="channelName" 
          placeholder="Nama channel atau akun Anda" 
          value={formData.channelName} 
          onChange={e => onChange('channelName', e.target.value)} 
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
          onChange={handleWhatsAppChange}
          required 
          className="rounded-lg" 
        />
      </div>

      <div className="space-y-2">
        <Label className="text-white">Kategori</Label>
        <CategorySelector selectedCategory={formData.category} onChange={onCategoryChange} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="uid" className="text-white">UID (Bisa ditemukan di sunting profil)</Label>
        <Input 
          id="uid" 
          placeholder="UID Anda" 
          value={formData.uid} 
          onChange={handleUidChange}
          required 
          className="rounded-lg" 
        />
      </div>
    </div>
  );
};

export default BasicInfoFields;
