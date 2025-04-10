
import React from 'react';
import { Button } from '@/components/ui/button';
import { Phone, Mail, MessageSquare } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface ServiceContactButtonsProps {
  phone: string;
  email?: string;
}

const ServiceContactButtons: React.FC<ServiceContactButtonsProps> = ({ phone, email }) => {
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

  // Mobile view (sm:hidden) and Desktop view (hidden sm:block)
  return (
    <>
      {/* Mobile view */}
      <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg p-4 z-10 sm:hidden">
        <div className="flex gap-3">
          <Button
            variant="outline"
            className="flex items-center justify-center h-12 rounded-full border-gray-300 flex-1 text-sm font-medium"
            onClick={handlePhoneCall}
          >
            <Phone className="h-4 w-4 mr-2" />
            Appeler
          </Button>
          
          <Button
            className="flex items-center justify-center h-12 rounded-full flex-1 text-sm font-medium bg-amber-400 hover:bg-amber-500 text-white border-none"
            onClick={handleMessage}
          >
            <MessageSquare className="h-4 w-4 mr-2" />
            WhatsApp
          </Button>
        </div>
      </div>
      
      {/* Desktop view */}
      <div className="hidden sm:block fixed bottom-6 right-6 z-10">
        <Card className="w-80 shadow-lg border-gray-100">
          <CardContent className="p-5">
            <h3 className="font-semibold text-lg mb-4">Contactez-nous</h3>
            
            <div className="space-y-3">
              <Button
                variant="outline"
                className="w-full justify-start h-12 border-gray-200"
                onClick={handlePhoneCall}
              >
                <Phone className="h-5 w-5 text-purple-500 mr-3" />
                <div className="flex flex-col items-start">
                  <span className="text-sm font-medium">Téléphone</span>
                  <span className="text-xs text-gray-500">{phone}</span>
                </div>
              </Button>
              
              <Button
                className="w-full justify-start h-12 bg-amber-400 hover:bg-amber-500 text-white border-none"
                onClick={handleMessage}
              >
                <MessageSquare className="h-5 w-5 mr-3" />
                <div className="flex flex-col items-start">
                  <span className="text-sm font-medium">WhatsApp</span>
                  <span className="text-xs">Cliquez pour chatter</span>
                </div>
              </Button>
              
              {email && (
                <Button
                  variant="outline"
                  className="w-full justify-start h-12 border-gray-200"
                  onClick={handleEmail}
                >
                  <Mail className="h-5 w-5 text-blue-500 mr-3" />
                  <div className="flex flex-col items-start">
                    <span className="text-sm font-medium">Email</span>
                    <span className="text-xs text-gray-500">{email}</span>
                  </div>
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default ServiceContactButtons;
