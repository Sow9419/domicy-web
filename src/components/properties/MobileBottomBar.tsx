
import React from 'react';
import { Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface MobileBottomBarProps {
  price: number;
  currency: string;
  period: string;
  ownerPhone: string;
  ownerWhatsapp: string;
}

const MobileBottomBar = ({ 
  price, 
  currency, 
  period, 
  ownerPhone,
  ownerWhatsapp
}: MobileBottomBarProps) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-3 flex items-center justify-between z-50 md:hidden">
      <div className="flex flex-col">
        <span className="text-xl font-bold">{price.toLocaleString()} {currency}</span>
        <span className="text-xs text-gray-600">/{period}</span>
      </div>
      
      <div className="flex gap-2">
        <Button size="sm" className="bg-primary hover:bg-primary-hover text-white rounded-full w-10 h-10 p-0">
          <Phone size={18} />
        </Button>
        <Button size="sm" variant="outline" className="border-primary text-primary hover:bg-primary/5 rounded-full w-10 h-10 p-0">
          <svg 
            width="20" 
            height="20" 
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M10 0C4.5 0 0 4.5 0 10C0 15.5 4.5 20 10 20C15.5 20 20 15.5 20 10C20 4.5 15.5 0 10 0ZM14.78 13.75C14.59 14.26 13.86 14.68 13.41 14.79C13.09 14.87 12.67 14.93 10.38 13.83C7.45 12.42 5.59 9.41 5.5 9.29C5.41 9.17 4.59 8.09 4.59 6.96C4.59 5.83 5.14 5.31 5.37 5.07C5.56 4.87 5.86 4.77 6.14 4.77C6.24 4.77 6.33 4.77 6.41 4.78C6.64 4.79 6.76 4.8 6.91 5.14C7.11 5.57 7.54 6.7 7.59 6.81C7.63 6.92 7.68 7.07 7.62 7.21C7.56 7.36 7.51 7.42 7.4 7.55C7.29 7.68 7.19 7.78 7.08 7.92C6.98 8.05 6.87 8.19 7 8.38C7.13 8.57 7.54 9.25 8.16 9.8C8.96 10.5 9.63 10.72 9.84 10.82C10.01 10.9 10.21 10.89 10.34 10.75C10.5 10.58 10.7 10.3 10.9 10.03C11.04 9.83 11.22 9.8 11.41 9.88C11.61 9.95 12.73 10.5 12.95 10.61C13.17 10.72 13.31 10.77 13.36 10.87C13.41 10.97 13.41 11.41 13.17 11.93L13.16 11.95C13.16 11.95 14.97 13.25 14.78 13.75Z" fill="currentColor" />
          </svg>
        </Button>
        <Button size="sm" className="bg-amber-500 hover:bg-amber-600 text-white">
          Réserver
        </Button>
      </div>
    </div>
  );
};

export default MobileBottomBar;
