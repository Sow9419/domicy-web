
import React from 'react';
import { 
  Tv, Car, Home, Snowflake, 
  Coffee, Wind, Utensils, Waves,
  Wifi, 
} from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface EquipmentProps {
  type: string;
  label: string;
}

const Equipment = ({ type, label }: EquipmentProps) => {
  const getIcon = () => {
    switch (type) {
      case 'tv':
        return <Tv size={20} className="text-primary" />;
      case 'garage':
        return <Car size={20} className="text-primary" />;
      case 'meuble':
        return <Home size={20} className="text-primary" />;
      case 'clim':
        return <Wind size={20} className="text-primary" />;
      case 'frigo':
        return <Snowflake size={20} className="text-primary" />;
      case 'piscine':
        return <Waves size={20} className="text-primary" />;
      case 'cafe':
        return <Coffee size={20} className="text-primary" />;
      case 'cuisine':
        return <Utensils size={20} className="text-primary" />;
      case 'wifi':
        return <Wifi size={20} className="text-primary" />;
      default:
        return <Home size={20} className="text-gray-500" />;
    }
  };

  return (
    <div className="flex items-center p-3 bg-white rounded-xl shadow-sm border border-gray-100">
      <div className="bg-primary/10 rounded-full p-2 mr-3 flex items-center justify-center">
        {getIcon()}
      </div>
      <span className="text-sm font-medium text-gray-700">{label}</span>
    </div>
  );
};

const PropertyEquipment = () => {
  const equipments = [
    { type: 'garage', label: 'Voiture Garage' },
    { type: 'wifi', label: 'Wi-Fi Haut Débit' },
    { type: 'tv', label: 'TV Smart 4K' },
    { type: 'clim', label: 'Climatisation' },
    { type: 'frigo', label: 'Réfrigérateur' },
    { type: 'piscine', label: 'Piscine' },
    { type: 'cafe', label: 'Machine à Café' },
    { type: 'cuisine', label: 'Cuisine Équipée' },
  ];

  return (
    <div className="my-6">
      <h2 className="text-xl font-semibold mb-4">Équipements</h2>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
        {equipments.map((equipment, index) => (
          <Equipment key={index} type={equipment.type} label={equipment.label} />
        ))}
      </div>
    </div>
  );
};

export default PropertyEquipment;
