
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import CategorySelector from './CategorySelector';

interface BasicInfoFieldsProps {
  formData: {
    channelName: string;
    whatsappNumber: string;
    category: string;
    userId: string;
    channelLink: string;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onCategoryChange: (value: string) => void;
}

const BasicInfoFields: React.FC<BasicInfoFieldsProps> = ({ formData, onChange, onCategoryChange }) => {
  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="channelName" className="text-white">Nama Channel (Bstation)</Label>
        <Input 
          id="channelName"
          name="channelName"
          placeholder="Your channel name"
          required
          className="rounded-lg"
          value={formData.channelName}
          onChange={onChange}
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
          onChange={onChange}
        />
      </div>

      <div className="space-y-2">
        <Label className="text-white">Kategori</Label>
        <CategorySelector 
          selectedCategory={formData.category} 
          onChange={onCategoryChange} 
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
          onChange={onChange}
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
          onChange={onChange}
        />
      </div>
    </>
  );
};

export default BasicInfoFields;
