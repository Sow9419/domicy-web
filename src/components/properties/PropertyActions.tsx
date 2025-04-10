
import React from 'react';
import { ArrowLeft, Heart, Share2 } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

interface PropertyActionsProps {
  isFavorite: boolean;
  onToggleFavorite: () => void;
  propertyTitle: string;
  propertyLocation: string;
}

const PropertyActions = ({ 
  isFavorite, 
  onToggleFavorite, 
  propertyTitle, 
  propertyLocation 
}: PropertyActionsProps) => {
  const shareProperty = () => {
    if (navigator.share) {
      navigator.share({
        title: propertyTitle,
        text: `Découvrez cette propriété: ${propertyTitle} à ${propertyLocation}`,
        url: window.location.href,
      })
      .catch((error) => console.log('Erreur de partage', error));
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Lien copié",
        description: "Le lien de cette propriété a été copié dans votre presse-papier",
        duration: 2000
      });
    }
  };

  return (
    <>
      <button 
        className="absolute top-4 left-4 w-10 h-10 flex items-center justify-center bg-white rounded-full shadow-md z-10"
        onClick={() => window.history.back()}
      >
        <ArrowLeft size={20} className="text-gray-700" />
      </button>
      
      <div className="absolute top-4 right-4 flex space-x-2 z-10">
        <button 
          className="w-10 h-10 flex items-center justify-center bg-white rounded-full shadow-md"
          onClick={onToggleFavorite}
        >
          <Heart 
            size={20} 
            className={isFavorite ? "fill-red-500 text-red-500" : "text-gray-700"} 
          />
        </button>
        <button 
          className="w-10 h-10 flex items-center justify-center bg-white rounded-full shadow-md"
          onClick={shareProperty}
        >
          <Share2 size={20} className="text-gray-700" />
        </button>
      </div>
    </>
  );
};

export default PropertyActions;
