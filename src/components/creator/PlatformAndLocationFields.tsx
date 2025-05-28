
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { validateNumberInput } from '@/utils/validation';

interface PlatformAndLocationFieldsProps {
  formData: {
    activePlatforms: string[];
    followers: string;
    city: string;
    occupation: string;
    channelLink: string;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPlatformToggle: (platform: string) => void;
}

const PlatformAndLocationFields: React.FC<PlatformAndLocationFieldsProps> = ({ formData, onChange, onPlatformToggle }) => {
  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    if (name === 'followers') {
      if (value === '' || validateNumberInput(value)) {
        onChange(e);
      }
    } else {
      onChange(e);
    }
  };

  const handlePlatformChange = (value: string) => {
    onPlatformToggle(value);
  };

  const selectedPlatform = formData.activePlatforms[0] || '';

  return (
    <>
      <div className="space-y-2">
        <Label className="text-white">Platform dengan Jumlah Followers Paling Banyak</Label>
        <RadioGroup value={selectedPlatform} onValueChange={handlePlatformChange}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="youtube" id="youtube" />
            <Label htmlFor="youtube" className="text-white">Youtube</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="tiktok" id="tiktok" />
            <Label htmlFor="tiktok" className="text-white">TikTok</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="instagram" id="instagram" />
            <Label htmlFor="instagram" className="text-white">Instagram</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="facebook" id="facebook" />
            <Label htmlFor="facebook" className="text-white">Facebook</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="twitter" id="twitter" />
            <Label htmlFor="twitter" className="text-white">X (Twitter)</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="snapchat" id="snapchat" />
            <Label htmlFor="snapchat" className="text-white">Snapchat</Label>
          </div>
        </RadioGroup>
      </div>

      <div className="space-y-2">
        <Label htmlFor="channelLink" className="text-white">Link Platform Sosial Media dengan Jumlah Followers Paling Banyak</Label>
        <Input 
          id="channelLink"
          name="channelLink"
          placeholder="https://..."
          required
          className="rounded-lg"
          value={formData.channelLink}
          onChange={onChange}
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
          onChange={handleNumberChange}
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
          onChange={onChange}
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
          onChange={onChange}
        />
      </div>
    </>
  );
};

export default PlatformAndLocationFields;
