
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

interface ServiceBasicInfoFormProps {
  title: string;
  setTitle: (value: string) => void;
  description: string;
  setDescription: (value: string) => void;
  price: string;
  setPrice: (value: string) => void;
}

const ServiceBasicInfoForm: React.FC<ServiceBasicInfoFormProps> = ({
  title,
  setTitle,
  description,
  setDescription,
  price,
  setPrice
}) => {
  return (
    <div className="space-y-6 p-4">
      <div className="space-y-2">
        <Label htmlFor="service-title">Titre du service</Label>
        <Input
          id="service-title"
          placeholder="Ex: Service de nettoyage professionnel"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="service-description">Description du service</Label>
        <Textarea
          id="service-description"
          placeholder="Décrivez votre service en détail..."
          className="min-h-[150px]"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="service-price">Prix (FCFA)</Label>
        <Input
          id="service-price"
          type="number"
          placeholder="Prix de votre service"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </div>
    </div>
  );
};

export default ServiceBasicInfoForm;
