
import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Youtube, Twitter, Instagram, Facebook, MessageSquare } from 'lucide-react';

interface SocialPlatformsProps {
  activePlatforms: string[];
  onPlatformToggle: (platform: string) => void;
}

const SocialPlatforms: React.FC<SocialPlatformsProps> = ({ activePlatforms, onPlatformToggle }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
      <div className="flex items-center space-x-2">
        <Checkbox 
          id="youtube" 
          checked={activePlatforms.includes('youtube')}
          onCheckedChange={() => onPlatformToggle('youtube')}
        />
        <Label htmlFor="youtube" className="flex items-center space-x-1 text-white">
          <Youtube className="h-4 w-4" />
          <span>Youtube</span>
        </Label>
      </div>
      
      <div className="flex items-center space-x-2">
        <Checkbox 
          id="tiktok" 
          checked={activePlatforms.includes('tiktok')}
          onCheckedChange={() => onPlatformToggle('tiktok')}
        />
        <Label htmlFor="tiktok" className="flex items-center space-x-1 text-white">
          <Twitter className="h-4 w-4" /> {/* Using Twitter icon for TikTok temporarily */}
          <span>Tiktok</span>
        </Label>
      </div>
      
      <div className="flex items-center space-x-2">
        <Checkbox 
          id="instagram" 
          checked={activePlatforms.includes('instagram')}
          onCheckedChange={() => onPlatformToggle('instagram')}
        />
        <Label htmlFor="instagram" className="flex items-center space-x-1 text-white">
          <Instagram className="h-4 w-4" />
          <span>Instagram</span>
        </Label>
      </div>
      
      <div className="flex items-center space-x-2">
        <Checkbox 
          id="snapchat" 
          checked={activePlatforms.includes('snapchat')}
          onCheckedChange={() => onPlatformToggle('snapchat')}
        />
        <Label htmlFor="snapchat" className="flex items-center space-x-1 text-white">
          <MessageSquare className="h-4 w-4" />
          <span>Snapchat</span>
        </Label>
      </div>
      
      <div className="flex items-center space-x-2">
        <Checkbox 
          id="facebook" 
          checked={activePlatforms.includes('facebook')}
          onCheckedChange={() => onPlatformToggle('facebook')}
        />
        <Label htmlFor="facebook" className="flex items-center space-x-1 text-white">
          <Facebook className="h-4 w-4" />
          <span>Facebook</span>
        </Label>
      </div>
      
      <div className="flex items-center space-x-2">
        <Checkbox 
          id="twitter" 
          checked={activePlatforms.includes('twitter')}
          onCheckedChange={() => onPlatformToggle('twitter')}
        />
        <Label htmlFor="twitter" className="text-white">X (Twitter)</Label>
      </div>
    </div>
  );
};

export default SocialPlatforms;
