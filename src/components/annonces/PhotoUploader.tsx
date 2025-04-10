
import React, { useState } from 'react';
import { Plus, X, Upload, Image as ImageIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

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
      onPhotoUpload(e as unknown as React.ChangeEvent<HTMLInputElement>);
    }
  };
  
  return (
    <section className="mb-8 animate-in fade-in duration-500">
      <h2 className="text-xl font-semibold mb-4">Photos</h2>
      
      <div className="flex flex-nowrap overflow-x-auto pb-4 gap-4 snap-x scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
        <div 
          className={cn(
            "min-w-[180px] h-[180px] border-2 border-dashed rounded-xl flex flex-col items-center justify-center cursor-pointer transition-all duration-200 snap-start",
            dragging ? "border-primary bg-primary/5 scale-[1.02]" : "border-gray-300 bg-gray-50 hover:bg-gray-100"
          )}
          onClick={() => document.getElementById('photo-upload')?.click()}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="flex flex-col items-center justify-center p-4 text-center">
            <Upload className="h-8 w-8 mb-2 text-gray-400" />
            <span className="text-sm font-medium text-gray-700">Ajouter des photos</span>
            <span className="text-xs text-gray-500 mt-1">ou glisser-déposer</span>
            <input 
              id="photo-upload" 
              type="file" 
              accept="image/*" 
              multiple 
              className="hidden" 
              onChange={onPhotoUpload}
            />
          </div>
        </div>
        
        {previewImages.map((src, index) => (
          <div 
            key={index} 
            className="relative min-w-[180px] h-[180px] rounded-xl overflow-hidden shadow-sm transition-all duration-200 hover:shadow-md snap-start group"
          >
            <img 
              src={src} 
              alt={`Aperçu ${index + 1}`} 
              className="w-full h-full object-cover" 
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-200"></div>
            <button 
              type="button"
              onClick={() => onRemovePhoto(index)}
              className="absolute top-2 right-2 bg-white/80 hover:bg-white text-gray-700 hover:text-red-500 rounded-full p-1.5 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200 transform hover:scale-110"
            >
              <X size={16} />
            </button>
          </div>
        ))}
      </div>
      
      <div className="mt-2 text-xs text-gray-500 flex items-center">
        <ImageIcon size={14} className="mr-1" />
        <span>{previewImages.length}/5 photos ajoutées</span>
      </div>
    </section>
  );
};

export default PhotoUploader;
