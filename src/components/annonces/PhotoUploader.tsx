
import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface PhotoUploaderProps {
  photos: File[];
  previewImages: string[];
  onPhotoUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemovePhoto: (index: number) => void;
}

const PhotoUploader: React.FC<PhotoUploaderProps> = ({
  photos,
  previewImages,
  onPhotoUpload,
  onRemovePhoto
}) => {
  const { toast } = useToast();
  
  return (
    <section className="mb-8">
      <h2 className="text-xl font-semibold mb-4">Photos</h2>
      <div className="grid grid-cols-4 gap-3">
        <label htmlFor="photo-upload" className="border-2 border-dashed border-gray-300 rounded-lg aspect-square flex flex-col items-center justify-center cursor-pointer bg-gray-50 hover:bg-gray-100">
          <Plus size={24} className="text-gray-400 mb-1" />
          <span className="text-xs text-gray-500">Ajouter</span>
          <input 
            id="photo-upload" 
            type="file" 
            accept="image/*" 
            multiple 
            className="hidden" 
            onChange={onPhotoUpload}
          />
        </label>
        
        {previewImages.map((src, index) => (
          <div key={index} className="relative rounded-lg overflow-hidden aspect-square">
            <img 
              src={src} 
              alt={`Property preview ${index + 1}`} 
              className="w-full h-full object-cover" 
            />
            <button 
              type="button"
              onClick={() => onRemovePhoto(index)}
              className="absolute top-1 right-1 bg-black bg-opacity-50 rounded-full w-6 h-6 flex items-center justify-center"
            >
              <span className="text-white text-xs">×</span>
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PhotoUploader;
