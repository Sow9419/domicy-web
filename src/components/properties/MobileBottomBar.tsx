
import React from 'react';
import { Phone, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface MobileBottomBarProps {
  ownerPhone: string;
  ownerWhatsapp: string;
}

const MobileBottomBar = ({ 
  ownerPhone,
  ownerWhatsapp
}: MobileBottomBarProps) => {
  const handlePhoneCall = () => {
    window.location.href = `tel:${ownerPhone}`;
  };
  
  const handleWhatsApp = () => {
    window.location.href = `https://wa.me/${ownerWhatsapp.replace(/\s+/g, '')}`;
  };
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg p-4 z-50 md:hidden">
      <div className="flex gap-3">
        <Button
          variant="outline"
          className="flex items-center justify-center h-12 rounded-full border-amber-400 text-amber-500 flex-1 text-sm font-medium"
          onClick={handlePhoneCall}
        >
          <Phone className="h-4 w-4 mr-2" />
          Appeler
        </Button>
        
        <Button
          className="flex items-center justify-center h-12 rounded-full flex-1 text-sm font-medium bg-amber-400 hover:bg-amber-500 text-white border-none"
          onClick={handleWhatsApp}
        >
          <MessageSquare className="h-4 w-4 mr-2" />
          WhatsApp
        </Button>
      </div>
    </div>
  );
};

export default MobileBottomBar;
