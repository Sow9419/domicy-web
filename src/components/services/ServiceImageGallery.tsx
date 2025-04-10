
import React, { useState } from 'react';
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext 
} from "@/components/ui/carousel";
import { Badge } from '@/components/ui/badge';
import { ChevronLeft, ChevronRight } from 'lucide-react';

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
        setApi={(api) => {
          if (api) {
            api.on('select', () => {
              setCurrentIndex(api.selectedScrollSnap());
            });
          }
        }}
      >
        <CarouselContent>
          {images.map((image, index) => (
            <CarouselItem key={index}>
              <div className="aspect-[4/3] md:aspect-[16/9] w-full">
                <img 
                  src={image} 
                  alt={`Service ${index + 1}`} 
                  className="w-full h-full object-cover"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious 
          className="left-2 bg-white/80 hover:bg-white text-gray-900 border-none"
        >
          <ChevronLeft className="h-5 w-5" />
        </CarouselPrevious>
        <CarouselNext 
          className="right-2 bg-white/80 hover:bg-white text-gray-900 border-none"
        >
          <ChevronRight className="h-5 w-5" />
        </CarouselNext>
      </Carousel>
      
      <div className="absolute bottom-4 left-4 z-10">
        <Badge variant="secondary" className="bg-black/70 backdrop-blur-sm text-white border-none">
          {category}
        </Badge>
      </div>
      
      <div className="absolute bottom-4 right-4 z-10 bg-black/70 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm">
        {currentIndex + 1} / {images.length}
      </div>
    </div>
  );
};

export default ServiceImageGallery;
