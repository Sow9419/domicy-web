
import React from 'react';
import { 
  CheckCircle2, 
  Tv, 
  Car, 
  Sofa, 
  Fridge, 
  Coffee, 
  UtensilsCrossed, 
  AirVent,
  Bed,
  Bath,
  Wifi,
  Lock,
  X
} from 'lucide-react';

interface PropertyEquipmentProps {
  equipments?: string[];
  unavailableEquipments?: string[];
}

// Map of equipment names to their corresponding icons
const equipmentIconMap: Record<string, React.ReactNode> = {
  "TV Smart 4K": <Tv size={20} />,
  "Voiture Garage": <Car size={20} />,
  "Meuble Déco": <Sofa size={20} />,
  "Réfrigérateur": <Fridge size={20} />,
  "Machine à Café": <Coffee size={20} />,
  "Cuisine Équipée": <UtensilsCrossed size={20} />,
  "Climatisation": <AirVent size={20} />,
  "Chambre": <Bed size={20} />,
  "Salle de bain": <Bath size={20} />,
  "Internet Fibre": <Wifi size={20} />,
  "Sécurité": <Lock size={20} />,
};

const PropertyEquipment: React.FC<PropertyEquipmentProps> = ({ 
  equipments = [], 
  unavailableEquipments = [] 
}) => {
  // Function to get the icon for a specific equipment
  const getEquipmentIcon = (equipment: string) => {
    return equipmentIconMap[equipment] || <CheckCircle2 size={20} />;
  };

  return (
    <div className="mt-4">
      <h3 className="text-lg font-medium mb-4">Équipements disponibles</h3>
      {equipments.length === 0 ? (
        <p className="text-gray-500 italic">Aucun équipement spécifié pour cette propriété.</p>
      ) : (
        <div className="equipment-grid grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {equipments.map((equipment, index) => (
            <div key={index} className="flex items-center gap-2 p-3 rounded-md border border-gray-100 bg-gray-50">
              <span className="text-primary">{getEquipmentIcon(equipment)}</span>
              <span>{equipment}</span>
            </div>
          ))}
        </div>
      )}
      
      {unavailableEquipments && unavailableEquipments.length > 0 && (
        <>
          <h3 className="text-lg font-medium mt-6 mb-4">Équipements non disponibles</h3>
          <div className="equipment-grid grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {unavailableEquipments.map((equipment, index) => (
              <div key={index} className="flex items-center gap-2 p-3 rounded-md border border-gray-100 bg-gray-50 text-gray-500">
                <span className="text-gray-400"><X size={20} /></span>
                <span>{equipment}</span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default PropertyEquipment;
