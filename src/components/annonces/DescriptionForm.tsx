
import React from 'react';
import { Textarea } from '@/components/ui/textarea';

interface DescriptionFormProps {
  description: string;
  onInputChange: (field: string, value: string | boolean) => void;
}

const DescriptionForm: React.FC<DescriptionFormProps> = ({
  description,
  onInputChange
}) => {
  return (
    <section className="mb-8">
      <h2 className="text-xl font-semibold mb-4">Description</h2>
      <Textarea
        placeholder="Décrivez votre bien..."
        value={description}
        onChange={(e) => onInputChange('description', e.target.value)}
        className="min-h-[150px]"
      />
    </section>
  );
};

export default DescriptionForm;
