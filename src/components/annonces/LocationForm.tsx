
import React from 'react';
import { MapPin } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface LocationFormProps {
  address: string;
  onInputChange: (field: string, value: string | boolean) => void;
}

const LocationForm: React.FC<LocationFormProps> = ({
  address,
  onInputChange
}) => {
  return (
    <section className="mb-8">
      <h2 className="text-xl font-semibold mb-4">Localisation</h2>
      <div className="space-y-2">
        <Label htmlFor="address">Adresse</Label>
        <Input
          id="address"
          placeholder="Saisissez une adresse"
          value={address}
          onChange={(e) => onInputChange('address', e.target.value)}
        />
        
        <div className="h-48 bg-gray-200 rounded-lg mt-4 flex items-center justify-center">
          <MapPin className="text-gray-400 mr-2" />
          <span className="text-gray-500">Carte indisponible</span>
        </div>
      </div>
    </section>
  );
};

export default LocationForm;
