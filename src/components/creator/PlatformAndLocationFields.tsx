
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import SocialPlatforms from './SocialPlatforms';

interface PlatformAndLocationFieldsProps {
  formData: {
    activePlatforms: string[];
    followers: string;
    city: string;
    occupation: string;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPlatformToggle: (platform: string) => void;
}

const PlatformAndLocationFields: React.FC<PlatformAndLocationFieldsProps> = ({ formData, onChange, onPlatformToggle }) => {
  return (
    <>
      <div className="space-y-2">
        <Label className="text-white">Di Platform apa paling aktif (pilih minimal satu)</Label>
        <SocialPlatforms 
          activePlatforms={formData.activePlatforms} 
          onPlatformToggle={onPlatformToggle} 
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
          onChange={onChange}
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
