
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

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
}

const BasicInfoFields: React.FC<BasicInfoFieldsProps> = ({ formData, onChange }) => {
  const categories = [
    'Beauty & Fashion',
    'Food & Cooking',
    'Travel & Lifestyle',
    'Tech & Gaming',
    'Health & Fitness',
    'Entertainment',
    'Education',
    'Business & Finance',
    'Other'
  ];

  const handleFollowersChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Only allow numbers
    if (value === '' || /^\d+$/.test(value)) {
      onChange('followers', value);
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="channelName">Nama Channel/Akun</Label>
        <Input
          id="channelName"
          placeholder="Nama channel atau akun Anda"
          value={formData.channelName}
          onChange={(e) => onChange('channelName', e.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="whatsappNumber">Nomor WhatsApp</Label>
        <Input
          id="whatsappNumber"
          type="tel"
          placeholder="08xxxxxxxxxx"
          value={formData.whatsappNumber}
          onChange={(e) => onChange('whatsappNumber', e.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <Label>Platform dengan Jumlah Followers Paling Banyak</Label>
        <RadioGroup 
          value={formData.activePlatforms[0] || ''}
          onValueChange={(value) => onChange('activePlatforms', [value])}
          className="grid grid-cols-2 gap-2"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="Instagram" id="instagram" />
            <Label htmlFor="instagram">Instagram</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="TikTok" id="tiktok" />
            <Label htmlFor="tiktok">TikTok</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="YouTube" id="youtube" />
            <Label htmlFor="youtube">YouTube</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="Twitter" id="twitter" />
            <Label htmlFor="twitter">Twitter</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="Facebook" id="facebook" />
            <Label htmlFor="facebook">Facebook</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="LinkedIn" id="linkedin" />
            <Label htmlFor="linkedin">LinkedIn</Label>
          </div>
        </RadioGroup>
      </div>

      <div className="space-y-2">
        <Label htmlFor="channelLink">Link Platform Sosial Media dengan Followers Paling Banyak</Label>
        <Input
          id="channelLink"
          type="url"
          placeholder="https://instagram.com/username atau link platform lainnya"
          value={formData.channelLink}
          onChange={(e) => onChange('channelLink', e.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="followers">Jumlah Followers / Subscriber</Label>
        <Input
          id="followers"
          type="text"
          placeholder="Contoh: 10000"
          value={formData.followers}
          onChange={handleFollowersChange}
          required
        />
      </div>

      <div className="space-y-2">
        <Label>Kategori Konten</Label>
        <RadioGroup 
          value={formData.category}
          onValueChange={(value) => onChange('category', value)}
          className="grid grid-cols-2 gap-2"
        >
          {categories.map((category) => (
            <div key={category} className="flex items-center space-x-2">
              <RadioGroupItem value={category} id={category.toLowerCase().replace(/\s+/g, '-')} />
              <Label htmlFor={category.toLowerCase().replace(/\s+/g, '-')}>{category}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <div className="space-y-2">
        <Label htmlFor="city">Kota Domisili</Label>
        <Input
          id="city"
          placeholder="Jakarta, Bandung, Surabaya, dll"
          value={formData.city}
          onChange={(e) => onChange('city', e.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="occupation">Pekerjaan/Profesi</Label>
        <Input
          id="occupation"
          placeholder="Content Creator, Mahasiswa, Karyawan, dll"
          value={formData.occupation}
          onChange={(e) => onChange('occupation', e.target.value)}
          required
        />
      </div>
    </div>
  );
};

export default BasicInfoFields;
