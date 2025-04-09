
import React from 'react';
import { Switch } from '@/components/ui/switch';

interface AvailabilityFormProps {
  availableImmediately: boolean;
  onInputChange: (field: string, value: string | boolean) => void;
}

const AvailabilityForm: React.FC<AvailabilityFormProps> = ({
  availableImmediately,
  onInputChange
}) => {
  return (
    <section className="mb-10">
      <h2 className="text-xl font-semibold mb-4">Disponibilité</h2>
      <div className="flex items-center justify-between">
        <span>Disponible immédiatement</span>
        <Switch
          checked={availableImmediately}
          onCheckedChange={(checked) => onInputChange('availableImmediately', checked)}
        />
      </div>
    </section>
  );
};

export default AvailabilityForm;
