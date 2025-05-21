
import React from 'react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

interface CategorySelectorProps {
  selectedCategory: string;
  onChange: (value: string) => void;
}

const CategorySelector: React.FC<CategorySelectorProps> = ({ selectedCategory, onChange }) => {
  return (
    <RadioGroup 
      defaultValue="anime" 
      value={selectedCategory}
      onValueChange={onChange}
      className="flex space-x-4"
    >
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="anime" id="anime" />
        <Label htmlFor="anime" className="text-white">Anime</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="game" id="game" />
        <Label htmlFor="game" className="text-white">Game</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="other" id="other" />
        <Label htmlFor="other" className="text-white">Lainnya</Label>
      </div>
    </RadioGroup>
  );
};

export default CategorySelector;
