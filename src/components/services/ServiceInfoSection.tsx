
import React from 'react';
import { MapPin, Calendar, Phone, Mail, Tag } from 'lucide-react';

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
    <div className="bg-white p-5 mt-4 rounded-lg shadow-sm">
      <h3 className="text-xl font-semibold mb-6">Contactez-nous</h3>
      
      <div className="space-y-5">
        <div className="flex items-start space-x-4 bg-gray-50 p-4 rounded-lg">
          <div className="bg-purple-100 p-2 rounded-full">
            <Phone className="h-5 w-5 text-purple-600" />
          </div>
          <div>
            <p className="font-medium">Téléphone</p>
            <p className="text-gray-600">{phone}</p>
          </div>
        </div>
        
        <div className="flex items-start space-x-4 bg-gray-50 p-4 rounded-lg">
          <div className="bg-blue-100 p-2 rounded-full">
            <Mail className="h-5 w-5 text-blue-600" />
          </div>
          <div>
            <p className="font-medium">Email</p>
            <p className="text-gray-600">{email}</p>
          </div>
        </div>
        
        {location && (
          <div className="flex items-start space-x-4 bg-gray-50 p-4 rounded-lg">
            <div className="bg-green-100 p-2 rounded-full">
              <MapPin className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="font-medium">Localisation</p>
              <p className="text-gray-600">{location}</p>
            </div>
          </div>
        )}
        
        <div className="flex items-start space-x-4 bg-gray-50 p-4 rounded-lg">
          <div className="bg-amber-100 p-2 rounded-full">
            <Calendar className="h-5 w-5 text-amber-600" />
          </div>
          <div>
            <p className="font-medium">Disponibilité</p>
            <p className="text-gray-600">{availability}</p>
          </div>
        </div>
        
        <div className="flex items-start space-x-4 bg-gray-50 p-4 rounded-lg">
          <div className="bg-red-100 p-2 rounded-full">
            <Tag className="h-5 w-5 text-red-600" />
          </div>
          <div>
            <p className="font-medium">Prix</p>
            <p className="text-gray-600 font-semibold text-lg">
              {price} {isNaN(Number(price)) ? '' : 'FCFA'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceInfoSection;
