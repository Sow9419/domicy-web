
import React, { useState } from 'react';
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext 
} from "@/components/ui/carousel";
import { Badge } from '@/components/ui/badge';

interface ServiceImageGalleryProps {
  images: string[];
  category: string;
}

const ServiceImageGallery: React.FC<ServiceImageGalleryProps> = ({ images, category }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // If there are no images, show a placeholder
  if (images.length === 0) {
    images = ['/placeholder.svg'];
  }

  return (
    <div className="relative">
      <Carousel 
        className="w-full"
        onSelect={(index) => setCurrentIndex(index)}
      >
        <CarouselContent>
          {images.map((image, index) => (
            <CarouselItem key={index}>
              <div className="aspect-[16/9] w-full">
                <img 
                  src={image} 
                  alt={`Service ${index + 1}`} 
                  className="w-full h-full object-cover"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-2" />
        <CarouselNext className="right-2" />
      </Carousel>
      
      <div className="absolute bottom-4 left-4 z-10">
        <Badge variant="secondary" className="bg-white/80 text-gray-800">
          {category}
        </Badge>
      </div>
      
      <div className="absolute bottom-4 right-4 z-10 bg-black/60 text-white px-2 py-1 rounded-md text-sm">
        {currentIndex + 1} / {images.length}
      </div>
    </div>
  );
};

export default ServiceImageGallery;
