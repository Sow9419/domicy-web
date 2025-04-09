
import React from 'react';
import { Bed, Bath, Droplets, Zap } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';

interface MainCharacteristicsFormProps {
  bedrooms: string;
  bathrooms: string;
  hasWater: boolean;
  hasElectricity: boolean;
  onInputChange: (field: string, value: string | boolean) => void;
}

const MainCharacteristicsForm: React.FC<MainCharacteristicsFormProps> = ({
  bedrooms,
  bathrooms,
  hasWater,
  hasElectricity,
  onInputChange
}) => {
  return (
    <section className="mb-8">
      <h2 className="text-xl font-semibold mb-4">Caractéristiques principales</h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="border rounded-lg p-3 flex items-center">
          <Bed className="text-green-500 mr-2" size={20} />
          <Input
            placeholder="Nombre de chambres"
            value={bedrooms}
            onChange={(e) => onInputChange('bedrooms', e.target.value)}
            type="number"
            className="border-0 p-0 h-auto focus-visible:ring-0 focus-visible:ring-offset-0"
          />
        </div>
        <div className="border rounded-lg p-3 flex items-center">
          <Bath className="text-green-500 mr-2" size={20} />
          <Input
            placeholder="Nombre de salles de bain"
            value={bathrooms}
            onChange={(e) => onInputChange('bathrooms', e.target.value)}
            type="number"
            className="border-0 p-0 h-auto focus-visible:ring-0 focus-visible:ring-offset-0"
          />
        </div>
        <div className="border rounded-lg p-3 flex items-center justify-between">
          <div className="flex items-center">
            <Droplets className="text-green-500 mr-2" size={20} />
            <span>Robinet</span>
          </div>
          <Switch
            checked={hasWater}
            onCheckedChange={(checked) => onInputChange('hasWater', checked)}
          />
        </div>
        <div className="border rounded-lg p-3 flex items-center justify-between">
          <div className="flex items-center">
            <Zap className="text-green-500 mr-2" size={20} />
            <span>Courant</span>
          </div>
          <Switch
            checked={hasElectricity}
            onCheckedChange={(checked) => onInputChange('hasElectricity', checked)}
          />
        </div>
      </div>
    </section>
  );
};

export default MainCharacteristicsForm;
