
import React from 'react';
import { Button } from '@/components/ui/button';
import { Phone, MessageSquare } from 'lucide-react';

interface ServiceContactButtonsProps {
  phone: string;
}

const ServiceContactButtons: React.FC<ServiceContactButtonsProps> = ({ phone }) => {
  const handlePhoneCall = () => {
    window.location.href = `tel:${phone}`;
  };
  
  const handleMessage = () => {
    // In a real app, this would open a chat interface or SMS
    console.log('Opening messaging with:', phone);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4 flex space-x-3 z-10">
      <Button
        className="flex-1 bg-white text-green-600 border border-green-500 hover:bg-green-50"
        onClick={handlePhoneCall}
      >
        <Phone className="mr-2 h-4 w-4" />
        Appeler
      </Button>
      <Button
        className="flex-1 bg-green-500 hover:bg-green-600"
        onClick={handleMessage}
      >
        <MessageSquare className="mr-2 h-4 w-4" />
        Contacter
      </Button>
    </div>
  );
};

export default ServiceContactButtons;
