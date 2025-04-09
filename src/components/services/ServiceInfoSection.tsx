
import React from 'react';
import { MapPin, Calendar, Phone, Mail } from 'lucide-react';

interface ServiceInfoSectionProps {
  title: string;
  description: string;
  price: string;
  category: string;
  location?: string;
  availability: string;
  phone: string;
  email: string;
}

const ServiceInfoSection: React.FC<ServiceInfoSectionProps> = ({
  title,
  description,
  price,
  category,
  location,
  availability,
  phone,
  email
}) => {
  return (
    <div className="p-4 space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-2">{title}</h1>
        <p className="text-xl font-semibold text-green-600">{price} FCFA</p>
      </div>
      
      <div>
        <h2 className="text-lg font-semibold mb-2">Description</h2>
        <p className="text-gray-700 whitespace-pre-line">{description}</p>
      </div>
      
      <div className="space-y-3">
        <h2 className="text-lg font-semibold">Informations</h2>
        
        {location && (
          <div className="flex items-start">
            <MapPin className="h-5 w-5 text-gray-500 mr-3 mt-0.5" />
            <div>
              <p className="font-medium">Localisation</p>
              <p className="text-gray-600">{location}</p>
            </div>
          </div>
        )}
        
        <div className="flex items-start">
          <Calendar className="h-5 w-5 text-gray-500 mr-3 mt-0.5" />
          <div>
            <p className="font-medium">Disponibilité</p>
            <p className="text-gray-600">{availability}</p>
          </div>
        </div>
        
        <div className="flex items-start">
          <Phone className="h-5 w-5 text-gray-500 mr-3 mt-0.5" />
          <div>
            <p className="font-medium">Téléphone</p>
            <p className="text-gray-600">{phone}</p>
          </div>
        </div>
        
        <div className="flex items-start">
          <Mail className="h-5 w-5 text-gray-500 mr-3 mt-0.5" />
          <div>
            <p className="font-medium">Email</p>
            <p className="text-gray-600">{email}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceInfoSection;
