
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { validateNumberInput } from '@/utils/validation';

interface BasicInfoFieldsProps {
  formData: {
    name: string;
    whatsappNumber: string;
    uid: string;
    followers: string;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const BasicInfoFields: React.FC<BasicInfoFieldsProps> = ({ formData, onChange }) => {
  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    // Allow empty value or only numbers for specific fields
    if (['whatsappNumber', 'uid', 'followers'].includes(name)) {
      if (value === '' || validateNumberInput(value)) {
        onChange(e);
      }
    } else {
      onChange(e);
    }
  };

  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="name" className="text-white">Nama Lengkap</Label>
        <Input 
          id="name"
          name="name"
          placeholder="Masukkan nama lengkap Anda"
          required
          className="rounded-lg"
          value={formData.name}
          onChange={onChange}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="whatsappNumber" className="text-white">Nomor WhatsApp</Label>
        <Input 
          id="whatsappNumber"
          name="whatsappNumber"
          placeholder="Contoh: 628123456789"
          required
          className="rounded-lg"
          value={formData.whatsappNumber}
          onChange={handleNumberChange}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="uid" className="text-white">UID</Label>
        <Input 
          id="uid"
          name="uid"
          placeholder="Masukkan UID Anda"
          required
          className="rounded-lg"
          value={formData.uid}
          onChange={handleNumberChange}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="followers" className="text-white">Jumlah Followers</Label>
        <Input 
          id="followers"
          name="followers"
          placeholder="Contoh: 1000"
          required
          className="rounded-lg"
          value={formData.followers}
          onChange={handleNumberChange}
        />
      </div>
    </>
  );
};

export default BasicInfoFields;
