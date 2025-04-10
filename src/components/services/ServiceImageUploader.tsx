
import React, { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Upload, Image as ImageIcon, X, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ServiceImageUploaderProps {
  images: string[];
  setImages: (images: string[]) => void;
}

const ServiceImageUploader: React.FC<ServiceImageUploaderProps> = ({
  images,
  setImages
}) => {
  const [dragging, setDragging] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(e.target.files);
    }
  };

  const handleFiles = (files: FileList) => {
    const newImages = [...images];
    
    Array.from(files).forEach(file => {
      // In a real app, you'd upload these files to a server
      // For this demo, we'll create local URLs
      const imageUrl = URL.createObjectURL(file);
      newImages.push(imageUrl);
    });
    
    setImages(newImages.slice(0, 5)); // Limit to 5 images
  };

  const removeImage = (index: number) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };

  return (
    <div className="p-4 animate-in fade-in duration-500">
      <Label className="block mb-3 text-lg font-semibold">Photos du service (max 5)</Label>
      
      <div className="flex flex-nowrap overflow-x-auto pb-4 gap-4 snap-x scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
        <div
          className={cn(
            "min-w-[180px] h-[180px] border-2 border-dashed rounded-xl flex flex-col items-center justify-center cursor-pointer transition-all duration-200 snap-start",
            dragging ? "border-primary bg-primary/5 scale-[1.02]" : "border-gray-300 bg-gray-50 hover:bg-gray-100"
          )}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => document.getElementById('service-images')?.click()}
        >
          <input
            type="file"
            id="service-images"
            multiple
            accept="image/*"
            className="hidden"
            onChange={handleFileInput}
          />
          <div className="flex flex-col items-center justify-center p-4 text-center">
            <Upload className="h-8 w-8 mb-2 text-gray-400" />
            <span className="text-sm font-medium text-gray-700">Ajouter des photos</span>
            <span className="text-xs text-gray-500 mt-1">ou glisser-déposer</span>
          </div>
        </div>

        {images.map((image, index) => (
          <div 
            key={index} 
            className="relative min-w-[180px] h-[180px] rounded-xl overflow-hidden shadow-sm transition-all duration-200 hover:shadow-md snap-start group"
          >
            <img 
              src={image} 
              alt={`Service ${index + 1}`} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-200"></div>
            <button
              className="absolute top-2 right-2 bg-white/80 hover:bg-white text-gray-700 hover:text-red-500 rounded-full p-1.5 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200 transform hover:scale-110"
              onClick={(e) => {
                e.stopPropagation();
                removeImage(index);
              }}
            >
              <X size={16} />
            </button>
          </div>
        ))}
        
        {images.length < 5 && images.length > 0 && (
          <div 
            className="min-w-[180px] h-[180px] rounded-xl border-2 border-dashed border-gray-300 flex items-center justify-center cursor-pointer hover:border-gray-400 hover:bg-gray-50 transition-all duration-200 snap-start"
            onClick={() => document.getElementById('service-images')?.click()}
          >
            <div className="flex flex-col items-center justify-center">
              <Plus size={24} className="text-gray-400 mb-1" />
              <span className="text-xs text-gray-500">Ajouter</span>
            </div>
          </div>
        )}
      </div>
      
      <div className="mt-2 text-xs text-gray-500 flex items-center">
        <ImageIcon size={14} className="mr-1" />
        <span>{images.length}/5 photos ajoutées</span>
      </div>
    </div>
  );
};

export default ServiceImageUploader;
