
import React from 'react';
import { ArrowLeft, Heart, Share2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

interface ServiceDetailHeaderProps {
  title: string;
}

const ServiceDetailHeader: React.FC<ServiceDetailHeaderProps> = ({ title }) => {
  const navigate = useNavigate();
  
  return (
    <div className="sticky top-0 bg-white border-b z-10">
      <div className="flex items-center p-4">
        <button
          onClick={() => navigate(-1)}
          className="mr-2"
        >
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-lg font-semibold flex-1 truncate">{title}</h1>
        <div className="flex space-x-2">
          <Button 
            variant="ghost" 
            size="icon"
            className="rounded-full"
            aria-label="Ajouter aux favoris"
          >
            <Heart size={20} />
          </Button>
          <Button 
            variant="ghost" 
            size="icon"
            className="rounded-full"
            aria-label="Partager"
          >
            <Share2 size={20} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetailHeader;
