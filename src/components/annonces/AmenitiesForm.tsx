
import React from 'react';
import { Car, Wifi, Tv, Thermometer, Refrigerator, Bath } from 'lucide-react';
import { Switch } from '@/components/ui/switch';

interface AmenitiesFormProps {
  amenities: {
    garage: boolean;
    wifi: boolean;
    smartTv: boolean;
    airConditioning: boolean;
    refrigerator: boolean;
    pool: boolean;
    equippedKitchen: boolean;
    coffeeMachine: boolean;
  };
  onAmenityChange: (amenity: string, value: boolean) => void;
}

const AmenitiesForm: React.FC<AmenitiesFormProps> = ({
  amenities,
  onAmenityChange
}) => {
  return (
    <section className="mb-8">
      <h2 className="text-xl font-semibold mb-4">Équipements</h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="border rounded-lg p-3 flex items-center justify-between">
          <div className="flex items-center">
            <Car className="text-green-500 mr-2" size={20} />
            <span>Voiture Garage</span>
          </div>
          <Switch
            checked={amenities.garage}
            onCheckedChange={(checked) => onAmenityChange('garage', checked)}
          />
        </div>
        <div className="border rounded-lg p-3 flex items-center justify-between">
          <div className="flex items-center">
            <Wifi className="text-green-500 mr-2" size={20} />
            <span>Wi-Fi</span>
          </div>
          <Switch
            checked={amenities.wifi}
            onCheckedChange={(checked) => onAmenityChange('wifi', checked)}
          />
        </div>
        <div className="border rounded-lg p-3 flex items-center justify-between">
          <div className="flex items-center">
            <Tv className="text-green-500 mr-2" size={20} />
            <span>TV Smart</span>
          </div>
          <Switch
            checked={amenities.smartTv}
            onCheckedChange={(checked) => onAmenityChange('smartTv', checked)}
          />
        </div>
        <div className="border rounded-lg p-3 flex items-center justify-between">
          <div className="flex items-center">
            <Thermometer className="text-green-500 mr-2" size={20} />
            <span>Climatisation</span>
          </div>
          <Switch
            checked={amenities.airConditioning}
            onCheckedChange={(checked) => onAmenityChange('airConditioning', checked)}
          />
        </div>
        <div className="border rounded-lg p-3 flex items-center justify-between">
          <div className="flex items-center">
            <Refrigerator className="text-green-500 mr-2" size={20} />
            <span>Réfrigérateur</span>
          </div>
          <Switch
            checked={amenities.refrigerator}
            onCheckedChange={(checked) => onAmenityChange('refrigerator', checked)}
          />
        </div>
        <div className="border rounded-lg p-3 flex items-center justify-between">
          <div className="flex items-center">
            <Bath className="text-green-500 mr-2" size={20} />
            <span>Piscine</span>
          </div>
          <Switch
            checked={amenities.pool}
            onCheckedChange={(checked) => onAmenityChange('pool', checked)}
          />
        </div>
        <div className="border rounded-lg p-3 flex items-center justify-between">
          <div className="flex items-center">
            <Tv className="text-green-500 mr-2" size={20} />
            <span>Cuisine équipée</span>
          </div>
          <Switch
            checked={amenities.equippedKitchen}
            onCheckedChange={(checked) => onAmenityChange('equippedKitchen', checked)}
          />
        </div>
        <div className="border rounded-lg p-3 flex items-center justify-between">
          <div className="flex items-center">
            <Tv className="text-green-500 mr-2" size={20} />
            <span>Machine à café</span>
          </div>
          <Switch
            checked={amenities.coffeeMachine}
            onCheckedChange={(checked) => onAmenityChange('coffeeMachine', checked)}
          />
        </div>
      </div>
    </section>
  );
};

export default AmenitiesForm;
