
import React from 'react';
import { Edit, Trash, Check, RefreshCcw, Eye, MapPin, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface AnnonceProps {
  annonce: {
    id: string;
    title: string;
    address: string;
    price: string;
    period: string;
    publishedDate: string;
    views: string;
    status: string;
    imageUrl: string;
  }
}

const AnnonceCard = ({ annonce }: AnnonceProps) => {
  // Status badge styling
  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100 border-green-200 px-3 py-1">Active</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100 border-yellow-200 px-3 py-1">En attente</Badge>;
      case 'rented':
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100 border-blue-200 px-3 py-1">Louée</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="border rounded-lg overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow">
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img 
          src={annonce.imageUrl} 
          alt={annonce.title}
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Prix et badge de statut */}
      <div className="p-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-amber-500 font-bold text-lg">
            {annonce.price}{annonce.period}
          </span>
          <div>
            {getStatusBadge(annonce.status)}
          </div>
        </div>
        
        {/* Titre et adresse */}
        <h3 className="font-semibold text-lg mb-1">{annonce.title}</h3>
        <div className="flex items-center text-gray-600 mb-3">
          <MapPin size={16} className="mr-1" />
          <span className="text-sm">{annonce.address}</span>
        </div>
        
        {/* Date de publication et vues */}
        <div className="flex justify-between items-center text-gray-500 text-sm mb-4">
          <div className="flex items-center">
            <Calendar size={14} className="mr-1" />
            <span>Publié le {annonce.publishedDate}</span>
          </div>
          <div className="flex items-center">
            <Eye size={14} className="mr-1" />
            <span>{annonce.views} vues</span>
          </div>
        </div>
        
        {/* Actions */}
        <div className="flex justify-between border-t pt-4 px-1">
          <Button variant="ghost" size="sm" className="flex flex-col items-center justify-center p-1 h-auto w-1/4">
            <Edit size={16} className="mb-1 text-gray-600" />
            <span className="text-xs">Modifier</span>
          </Button>
          <Button variant="ghost" size="sm" className="flex flex-col items-center justify-center p-1 h-auto w-1/4">
            <Trash size={16} className="mb-1 text-gray-600" />
            <span className="text-xs">Supprimer</span>
          </Button>
          <Button variant="ghost" size="sm" className="flex flex-col items-center justify-center p-1 h-auto w-1/4">
            <Check size={16} className="mb-1 text-gray-600" />
            <span className="text-xs">Louée</span>
          </Button>
          <Button variant="ghost" size="sm" className="flex flex-col items-center justify-center p-1 h-auto w-1/4">
            <RefreshCcw size={16} className="mb-1 text-gray-600" />
            <span className="text-xs">Republier</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AnnonceCard;
