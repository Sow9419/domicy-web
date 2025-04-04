
import React from 'react';
import { Phone, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface BookingCardProps {
  price: number;
  currency: string;
  period: string;
  rating: number;
  reviews: number;
  ownerName: string;
  ownerStatus: string;
  ownerPhone: string;
  ownerWhatsapp: string;
}

const BookingCard = ({ 
  price, 
  currency, 
  period, 
  rating, 
  reviews, 
  ownerName, 
  ownerStatus,
  ownerPhone,
  ownerWhatsapp
}: BookingCardProps) => {
  return (
    <Card className="w-full shadow-md border-gray-100">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <span className="text-2xl font-bold">{price.toLocaleString()} {currency}</span>
            <span className="text-gray-600">/{period}</span>
          </div>
          <div className="flex items-center bg-white px-2 py-1 rounded-md border border-gray-100">
            <Star size={16} className="text-yellow-500 mr-1" fill="currentColor" />
            <span className="font-medium">{rating}</span>
            <span className="text-gray-500 ml-1">({reviews} avis)</span>
          </div>
        </div>
        
        <div className="mb-6 pb-6 border-b">
          <div className="flex items-center">
            <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center mr-3">
              <span className="text-lg font-medium">{ownerName.charAt(0)}</span>
            </div>
            <div>
              <p className="font-medium">{ownerName}</p>
              <p className="text-sm text-gray-600">{ownerStatus}</p>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 gap-3">
          <Button className="bg-primary hover:bg-primary-hover text-white font-semibold py-3">
            <Phone size={18} className="mr-2" />
            Appeler
          </Button>
          <Button variant="outline" className="border-primary text-primary hover:bg-primary/5 font-semibold py-3">
            <svg 
              width="20" 
              height="20" 
              viewBox="0 0 20 20" 
              className="mr-2"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M10 0C4.5 0 0 4.5 0 10C0 15.5 4.5 20 10 20C15.5 20 20 15.5 20 10C20 4.5 15.5 0 10 0ZM14.78 13.75C14.59 14.26 13.86 14.68 13.41 14.79C13.09 14.87 12.67 14.93 10.38 13.83C7.45 12.42 5.59 9.41 5.5 9.29C5.41 9.17 4.59 8.09 4.59 6.96C4.59 5.83 5.14 5.31 5.37 5.07C5.56 4.87 5.86 4.77 6.14 4.77C6.24 4.77 6.33 4.77 6.41 4.78C6.64 4.79 6.76 4.8 6.91 5.14C7.11 5.57 7.54 6.7 7.59 6.81C7.63 6.92 7.68 7.07 7.62 7.21C7.56 7.36 7.51 7.42 7.4 7.55C7.29 7.68 7.19 7.78 7.08 7.92C6.98 8.05 6.87 8.19 7 8.38C7.13 8.57 7.54 9.25 8.16 9.8C8.96 10.5 9.63 10.72 9.84 10.82C10.01 10.9 10.21 10.89 10.34 10.75C10.5 10.58 10.7 10.3 10.9 10.03C11.04 9.83 11.22 9.8 11.41 9.88C11.61 9.95 12.73 10.5 12.95 10.61C13.17 10.72 13.31 10.77 13.36 10.87C13.41 10.97 13.41 11.41 13.17 11.93L13.16 11.95C13.16 11.95 14.97 13.25 14.78 13.75Z" fill="currentColor" />
            </svg>
            WhatsApp
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default BookingCard;
