import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, MapPin, Upload, Wifi, Car, Tv, Thermometer, Refrigerator, 
  Bath, Bed, Droplets, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';

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
      <div className="sticky top-0 bg-white border-b z-10">
        <div className="flex items-center p-4">
          <button
            onClick={() => navigate(-1)}
            className="mr-4"
          >
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-xl font-semibold flex-1 text-center">Créer une annonce</h1>
          <div className="w-6"></div>
        </div>
      </div>

      <div className="px-4 py-6 max-w-2xl mx-auto">
        <form onSubmit={handleSubmit}>
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
                  onChange={handlePhotoUpload}
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
                    onClick={() => handleRemovePhoto(index)}
                    className="absolute top-1 right-1 bg-black bg-opacity-50 rounded-full w-6 h-6 flex items-center justify-center"
                  >
                    <span className="text-white text-xs">×</span>
                  </button>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Informations principales</h2>
            <div className="space-y-4">
              <div>
                <Input
                  placeholder="Titre de l'annonce"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  className="w-full"
                />
              </div>
              
              <div>
                <Select 
                  value={formData.propertyType}
                  onValueChange={(value) => handleInputChange('propertyType', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Type de propriété" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {propertyTypes.map((type) => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <Input
                  placeholder="Prix FCFA"
                  value={formData.price}
                  onChange={(e) => handleInputChange('price', e.target.value)}
                  type="number"
                />
                <Select 
                  value={formData.pricePeriod}
                  onValueChange={(value) => handleInputChange('pricePeriod', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Par Mois" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="month">Par Mois</SelectItem>
                      <SelectItem value="day">Par Jour</SelectItem>
                      <SelectItem value="year">Par An</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Localisation</h2>
            <div className="space-y-2">
              <Label htmlFor="address">Adresse</Label>
              <Input
                id="address"
                placeholder="Saisissez une adresse"
                value={formData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
              />
              
              <div className="h-48 bg-gray-200 rounded-lg mt-4 flex items-center justify-center">
                <MapPin className="text-gray-400 mr-2" />
                <span className="text-gray-500">Carte indisponible</span>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Description</h2>
            <Textarea
              placeholder="Décrivez votre bien..."
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              className="min-h-[150px]"
            />
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Caractéristiques principales</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="border rounded-lg p-3 flex items-center">
                <Bed className="text-green-500 mr-2" size={20} />
                <Input
                  placeholder="Nombre de chambres"
                  value={formData.bedrooms}
                  onChange={(e) => handleInputChange('bedrooms', e.target.value)}
                  type="number"
                  className="border-0 p-0 h-auto focus-visible:ring-0 focus-visible:ring-offset-0"
                />
              </div>
              <div className="border rounded-lg p-3 flex items-center">
                <Bath className="text-green-500 mr-2" size={20} />
                <Input
                  placeholder="Nombre de salles de bain"
                  value={formData.bathrooms}
                  onChange={(e) => handleInputChange('bathrooms', e.target.value)}
                  type="number"
                  className="border-0 p-0 h-auto focus-visible:ring-0 focus-visible:ring-offset-0"
                />
              </div>
              <div className="border rounded-lg p-3 flex items-center justify-between">
                <div className="flex items-center">
                  <Droplets className="text-green-500 mr-2" size={20} />
                  <span>Robinet</span>
                </div>
                <Switch
                  checked={formData.hasWater}
                  onCheckedChange={(checked) => handleInputChange('hasWater', checked)}
                />
              </div>
              <div className="border rounded-lg p-3 flex items-center justify-between">
                <div className="flex items-center">
                  <Zap className="text-green-500 mr-2" size={20} />
                  <span>Courant</span>
                </div>
                <Switch
                  checked={formData.hasElectricity}
                  onCheckedChange={(checked) => handleInputChange('hasElectricity', checked)}
                />
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Équipements</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="border rounded-lg p-3 flex items-center justify-between">
                <div className="flex items-center">
                  <Car className="text-green-500 mr-2" size={20} />
                  <span>Voiture Garage</span>
                </div>
                <Switch
                  checked={formData.amenities.garage}
                  onCheckedChange={(checked) => handleAmenityChange('garage', checked)}
                />
              </div>
              <div className="border rounded-lg p-3 flex items-center justify-between">
                <div className="flex items-center">
                  <Wifi className="text-green-500 mr-2" size={20} />
                  <span>Wi-Fi</span>
                </div>
                <Switch
                  checked={formData.amenities.wifi}
                  onCheckedChange={(checked) => handleAmenityChange('wifi', checked)}
                />
              </div>
              <div className="border rounded-lg p-3 flex items-center justify-between">
                <div className="flex items-center">
                  <Tv className="text-green-500 mr-2" size={20} />
                  <span>TV Smart</span>
                </div>
                <Switch
                  checked={formData.amenities.smartTv}
                  onCheckedChange={(checked) => handleAmenityChange('smartTv', checked)}
                />
              </div>
              <div className="border rounded-lg p-3 flex items-center justify-between">
                <div className="flex items-center">
                  <Thermometer className="text-green-500 mr-2" size={20} />
                  <span>Climatisation</span>
                </div>
                <Switch
                  checked={formData.amenities.airConditioning}
                  onCheckedChange={(checked) => handleAmenityChange('airConditioning', checked)}
                />
              </div>
              <div className="border rounded-lg p-3 flex items-center justify-between">
                <div className="flex items-center">
                  <Refrigerator className="text-green-500 mr-2" size={20} />
                  <span>Réfrigérateur</span>
                </div>
                <Switch
                  checked={formData.amenities.refrigerator}
                  onCheckedChange={(checked) => handleAmenityChange('refrigerator', checked)}
                />
              </div>
              <div className="border rounded-lg p-3 flex items-center justify-between">
                <div className="flex items-center">
                  <Bath className="text-green-500 mr-2" size={20} />
                  <span>Piscine</span>
                </div>
                <Switch
                  checked={formData.amenities.pool}
                  onCheckedChange={(checked) => handleAmenityChange('pool', checked)}
                />
              </div>
              <div className="border rounded-lg p-3 flex items-center justify-between">
                <div className="flex items-center">
                  <Tv className="text-green-500 mr-2" size={20} />
                  <span>Cuisine équipée</span>
                </div>
                <Switch
                  checked={formData.amenities.equippedKitchen}
                  onCheckedChange={(checked) => handleAmenityChange('equippedKitchen', checked)}
                />
              </div>
              <div className="border rounded-lg p-3 flex items-center justify-between">
                <div className="flex items-center">
                  <Tv className="text-green-500 mr-2" size={20} />
                  <span>Machine à café</span>
                </div>
                <Switch
                  checked={formData.amenities.coffeeMachine}
                  onCheckedChange={(checked) => handleAmenityChange('coffeeMachine', checked)}
                />
              </div>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-semibold mb-4">Disponibilité</h2>
            <div className="flex items-center justify-between">
              <span>Disponible immédiatement</span>
              <Switch
                checked={formData.availableImmediately}
                onCheckedChange={(checked) => handleInputChange('availableImmediately', checked)}
              />
            </div>
          </section>

          <Button type="submit" className="w-full py-6 text-lg bg-green-500 hover:bg-green-600">
            Publier l'annonce
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CreateAnnonce;
