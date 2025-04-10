
import React from 'react';
import { Grid3X3, CheckCircle2 } from 'lucide-react';

interface PropertyEquipmentProps {
  equipments?: string[];
}

const PropertyEquipment: React.FC<PropertyEquipmentProps> = ({ equipments = [] }) => {
  return (
    <div className="mt-4">
      <h3 className="text-lg font-medium mb-4">Équipements disponibles</h3>
      {equipments.length === 0 ? (
        <p className="text-gray-500 italic">Aucun équipement spécifié pour cette propriété.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {equipments.map((equipment, index) => (
            <div key={index} className="flex items-center gap-2 p-3 rounded-md border border-gray-100 bg-gray-50">
              <Grid3X3 size={18} className="text-primary" />
              <span>{equipment}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PropertyEquipment;
