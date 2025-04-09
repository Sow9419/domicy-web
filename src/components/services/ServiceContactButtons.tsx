
import React from 'react';
import { Button } from '@/components/ui/button';
import { Phone, Mail, MessageSquare } from 'lucide-react';

interface ServiceContactButtonsProps {
  phone: string;
}

const ServiceContactButtons: React.FC<ServiceContactButtonsProps> = ({ phone }) => {
  const handlePhoneCall = () => {
    window.location.href = `tel:${phone}`;
  };
  
  const handleEmail = () => {
    // In a real app, this would open an email composer
    console.log('Opening email composer');
  };
  
  const handleMessage = () => {
    // In a real app, this would open a chat interface or WhatsApp
    window.location.href = `https://wa.me/${phone.replace(/\s+/g, '')}`;
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4 flex flex-col space-y-3 z-10 sm:flex-row sm:space-y-0 sm:space-x-3">
      <h3 className="font-semibold text-lg w-full sm:hidden">Contactez-nous</h3>
      
      <div className="grid grid-cols-3 gap-3 w-full sm:flex sm:space-x-3">
        <Button
          variant="outline"
          className="flex flex-col items-center justify-center h-auto py-3 border-gray-200"
          onClick={handleMessage}
        >
          <MessageSquare className="h-5 w-5 text-emerald-500 mb-1" />
          <span className="text-xs font-normal">WhatsApp</span>
          <span className="text-xs text-gray-500 hidden">Cliquez pour chatter</span>
        </Button>
        
        <Button
          variant="outline"
          className="flex flex-col items-center justify-center h-auto py-3 border-gray-200"
          onClick={handlePhoneCall}
        >
          <Phone className="h-5 w-5 text-purple-500 mb-1" />
          <span className="text-xs font-normal">Téléphone</span>
          <span className="text-xs text-gray-500 hidden">+123 456 7890</span>
        </Button>
        
        <Button
          variant="outline"
          className="flex flex-col items-center justify-center h-auto py-3 border-gray-200"
          onClick={handleEmail}
        >
          <Mail className="h-5 w-5 text-blue-500 mb-1" />
          <span className="text-xs font-normal">Email</span>
          <span className="text-xs text-gray-500 hidden">contact@example.com</span>
        </Button>
      </div>
    </div>
  );
};

export default ServiceContactButtons;
