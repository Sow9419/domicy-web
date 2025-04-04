
import React from 'react';
import { 
  Tv, Car, Home, Snowflake, 
  Coffee, Wind, Utensils, Waves,
} from 'lucide-react';

interface EquipmentProps {
  type: string;
  label: string;
}

const Equipment = ({ type, label }: EquipmentProps) => {
  const getIcon = () => {
    switch (type) {
      case 'tv':
        return <Tv size={20} className="text-amber-500" />;
      case 'garage':
        return <Car size={20} className="text-amber-500" />;
      case 'meuble':
        return <Home size={20} className="text-green-500" />;
      case 'clim':
        return <Wind size={20} className="text-amber-500" />;
      case 'frigo':
        return <Snowflake size={20} className="text-green-500" />;
      case 'piscine':
        return <Waves size={20} className="text-amber-500" />;
      case 'cafe':
        return <Coffee size={20} className="text-amber-500" />;
      case 'cuisine':
        return <Utensils size={20} className="text-amber-500" />;
      default:
        return <Home size={20} className="text-gray-500" />;
    }
  };

  const getIconBackground = () => {
    switch (type) {
      case 'tv':
        return "bg-amber-100";
      case 'garage':
        return "bg-amber-100";
      case 'meuble':
        return "bg-green-100";
      case 'clim':
        return "bg-amber-100";
      case 'frigo':
        return "bg-green-100";
      case 'piscine':
        return "bg-amber-100";
      case 'cafe':
        return "bg-amber-100";
      case 'cuisine':
        return "bg-amber-100";
      default:
        return "bg-gray-100";
    }
  };

  return (
    <div className="flex items-center p-4 bg-white rounded-full shadow-md">
      <div className={`${getIconBackground()} rounded-full p-2 mr-3 flex items-center justify-center`}>
        {getIcon()}
      </div>
      <span className="text-sm font-medium">{label}</span>
    </div>
  );
};

const PropertyEquipment = () => {
  const equipments = [
    { type: 'garage', label: 'Voiture Garage' },
    { type: 'meuble', label: 'Meuble Déco' },
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
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {equipments.map((equipment, index) => (
          <Equipment key={index} type={equipment.type} label={equipment.label} />
        ))}
      </div>
    </div>
  );

};

export default PropertyEquipment;
