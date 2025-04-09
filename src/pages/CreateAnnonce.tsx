
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

// Import the new components
import AnnonceFormHeader from '@/components/annonces/AnnonceFormHeader';
import PhotoUploader from '@/components/annonces/PhotoUploader';
import MainInfoForm from '@/components/annonces/MainInfoForm';
import LocationForm from '@/components/annonces/LocationForm';
import DescriptionForm from '@/components/annonces/DescriptionForm';
import MainCharacteristicsForm from '@/components/annonces/MainCharacteristicsForm';
import AmenitiesForm from '@/components/annonces/AmenitiesForm';
import AvailabilityForm from '@/components/annonces/AvailabilityForm';

interface FormData {
  title: string;
  propertyType: string;
  price: string;
  pricePeriod: string;
  address: string;
  description: string;
  bedrooms: string;
  bathrooms: string;
  hasWater: boolean;
  hasElectricity: boolean;
  amenities: {
    garage: boolean;
    wifi: boolean;
    smartTv: boolean;
    airConditioning: boolean;
    refrigerator: boolean;
    pool: boolean;
    equippedKitchen: boolean;
    coffeeMachine: boolean;
  };
  availableImmediately: boolean;
  photos: File[];
}

const propertyTypes = [
  'Appartement',
  'Maison',
  'Studio',
  'Villa',
  'Duplex',
  'Loft',
  'Terrain',
  'Bureau',
  'Local commercial'
];

const CreateAnnonce = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState<FormData>({
    title: '',
    propertyType: '',
    price: '',
    pricePeriod: 'month',
    address: '',
    description: '',
    bedrooms: '',
    bathrooms: '',
    hasWater: true,
    hasElectricity: true,
    amenities: {
      garage: false,
      wifi: false,
      smartTv: false,
      airConditioning: false,
      refrigerator: false,
      pool: false,
      equippedKitchen: false,
      coffeeMachine: false
    },
    availableImmediately: true,
    photos: []
  });

  const [previewImages, setPreviewImages] = useState<string[]>([]);

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleAmenityChange = (amenity: string, value: boolean) => {
    setFormData(prev => ({
      ...prev,
      amenities: {
        ...prev.amenities,
        [amenity]: value
      }
    }));
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      
      if (formData.photos.length + filesArray.length > 5) {
        toast({
          title: "Limite atteinte",
          description: "Vous pouvez ajouter jusqu'à 5 photos",
          variant: "destructive"
        });
        return;
      }
      
      const newPreviews = filesArray.map(file => URL.createObjectURL(file));
      
      setFormData(prev => ({
        ...prev,
        photos: [...prev.photos, ...filesArray]
      }));
      
      setPreviewImages(prev => [...prev, ...newPreviews]);
    }
  };
  
  const handleRemovePhoto = (index: number) => {
    const updatedPhotos = [...formData.photos];
    updatedPhotos.splice(index, 1);
    
    const updatedPreviews = [...previewImages];
    URL.revokeObjectURL(updatedPreviews[index]);
    updatedPreviews.splice(index, 1);
    
    setFormData(prev => ({
      ...prev,
      photos: updatedPhotos
    }));
    
    setPreviewImages(updatedPreviews);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.propertyType || !formData.price || !formData.address) {
      toast({
        title: "Informations manquantes",
        description: "Veuillez remplir tous les champs obligatoires",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Annonce publiée",
      description: "Votre annonce a été publiée avec succès"
    });
    
    navigate('/annonce');
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      <AnnonceFormHeader />

      <div className="px-4 py-6 max-w-2xl mx-auto">
        <form onSubmit={handleSubmit}>
          <PhotoUploader 
            photos={formData.photos}
            previewImages={previewImages}
            onPhotoUpload={handlePhotoUpload}
            onRemovePhoto={handleRemovePhoto}
          />

          <MainInfoForm 
            title={formData.title}
            propertyType={formData.propertyType}
            price={formData.price}
            pricePeriod={formData.pricePeriod}
            propertyTypes={propertyTypes}
            onInputChange={handleInputChange}
          />

          <LocationForm 
            address={formData.address}
            onInputChange={handleInputChange}
          />

          <DescriptionForm 
            description={formData.description}
            onInputChange={handleInputChange}
          />

          <MainCharacteristicsForm 
            bedrooms={formData.bedrooms}
            bathrooms={formData.bathrooms}
            hasWater={formData.hasWater}
            hasElectricity={formData.hasElectricity}
            onInputChange={handleInputChange}
          />

          <AmenitiesForm 
            amenities={formData.amenities}
            onAmenityChange={handleAmenityChange}
          />

          <AvailabilityForm 
            availableImmediately={formData.availableImmediately}
            onInputChange={handleInputChange}
          />

          <Button type="submit" className="w-full py-6 text-lg bg-green-500 hover:bg-green-600">
            Publier l'annonce
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CreateAnnonce;
