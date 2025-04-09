
import React, { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Upload, Image as ImageIcon, X } from 'lucide-react';

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
    <div className="p-4">
      <Label className="block mb-3">Photos du service (max 5)</Label>
      
      <div
        className={`border-2 border-dashed rounded-lg p-6 text-center ${
          dragging ? 'border-primary bg-primary/5' : 'border-gray-300'
        } transition-colors cursor-pointer`}
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
        <Upload className="h-10 w-10 mx-auto mb-2 text-gray-400" />
        <p className="text-sm text-gray-600">
          Glissez-déposez des images ou cliquez pour sélectionner
        </p>
        <p className="text-xs text-gray-400 mt-1">
          PNG, JPG jusqu'à 5 Mo
        </p>
      </div>

      {images.length > 0 && (
        <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {images.map((image, index) => (
            <div key={index} className="relative group">
              <div className="aspect-square rounded-lg overflow-hidden border border-gray-200">
                <img 
                  src={image} 
                  alt={`Service ${index + 1}`} 
                  className="w-full h-full object-cover"
                />
              </div>
              <button
                className="absolute top-1 right-1 bg-white/70 hover:bg-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={(e) => {
                  e.stopPropagation();
                  removeImage(index);
                }}
              >
                <X size={14} className="text-red-500" />
              </button>
            </div>
          ))}
          
          {images.length < 5 && (
            <div 
              className="aspect-square rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center cursor-pointer hover:border-gray-400 transition-colors"
              onClick={() => document.getElementById('service-images')?.click()}
            >
              <ImageIcon className="h-8 w-8 text-gray-400" />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ServiceImageUploader;
