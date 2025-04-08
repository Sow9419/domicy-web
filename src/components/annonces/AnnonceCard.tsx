
import React from 'react';
import { Edit, Trash, Check, RefreshCcw, Eye } from 'lucide-react';
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
        return <Badge className="bg-green-500">Active</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-500">En attente</Badge>;
      case 'rented':
        return <Badge className="bg-blue-500">Louée</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="border rounded-lg overflow-hidden bg-white">
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img 
          src={annonce.imageUrl} 
          alt={annonce.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-2 left-2 flex items-center">
          <span className="bg-yellow-500 text-white px-2 py-1 rounded text-sm font-medium">
            {annonce.price}{annonce.period}
          </span>
        </div>
        <div className="absolute top-2 right-2">
          {getStatusBadge(annonce.status)}
        </div>
      </div>
      
      {/* Details */}
      <div className="p-4">
        <h3 className="font-semibold text-lg">{annonce.title}</h3>
        <div className="flex items-center text-gray-600 mt-1">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 mr-1">
            <path fillRule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
          </svg>
          <span className="text-sm">{annonce.address}</span>
        </div>
        
        <div className="flex justify-between items-center mt-3">
          <div className="flex items-center text-gray-500 text-sm">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
            </svg>
            Publié le {annonce.publishedDate}
          </div>
          <div className="flex items-center text-gray-500 text-sm">
            <Eye size={16} className="mr-1" />
            {annonce.views} vues
          </div>
        </div>
        
        {/* Actions */}
        <div className="grid grid-cols-4 gap-2 mt-4 border-t pt-4">
          <Button variant="outline" size="sm" className="flex-col py-2">
            <Edit size={16} className="mb-1" />
            <span className="text-xs">Modifier</span>
          </Button>
          <Button variant="outline" size="sm" className="flex-col py-2">
            <Trash size={16} className="mb-1" />
            <span className="text-xs">Supprimer</span>
          </Button>
          <Button variant="outline" size="sm" className="flex-col py-2">
            <Check size={16} className="mb-1" />
            <span className="text-xs">Louée</span>
          </Button>
          <Button variant="outline" size="sm" className="flex-col py-2">
            <RefreshCcw size={16} className="mb-1" />
            <span className="text-xs">Republier</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AnnonceCard;
