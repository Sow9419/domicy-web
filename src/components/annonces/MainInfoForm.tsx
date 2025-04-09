
import React from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface MainInfoFormProps {
  title: string;
  propertyType: string;
  price: string;
  pricePeriod: string;
  propertyTypes: string[];
  onInputChange: (field: string, value: string | boolean) => void;
}

const MainInfoForm: React.FC<MainInfoFormProps> = ({
  title,
  propertyType,
  price,
  pricePeriod,
  propertyTypes,
  onInputChange
}) => {
  return (
    <section className="mb-8">
      <h2 className="text-xl font-semibold mb-4">Informations principales</h2>
      <div className="space-y-4">
        <div>
          <Input
            placeholder="Titre de l'annonce"
            value={title}
            onChange={(e) => onInputChange('title', e.target.value)}
            className="w-full"
          />
        </div>
        
        <div>
          <Select 
            value={propertyType}
            onValueChange={(value) => onInputChange('propertyType', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Type de propriété" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {propertyTypes.map((type) => (
                  <SelectItem key={type} value={type}>{type}</SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          <Input
            placeholder="Prix FCFA"
            value={price}
            onChange={(e) => onInputChange('price', e.target.value)}
            type="number"
          />
          <Select 
            value={pricePeriod}
            onValueChange={(value) => onInputChange('pricePeriod', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Par Mois" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="month">Par Mois</SelectItem>
                <SelectItem value="day">Par Jour</SelectItem>
                <SelectItem value="year">Par An</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
    </section>
  );
};

export default MainInfoForm;
