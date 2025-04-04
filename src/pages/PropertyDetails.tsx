
// Importation des dépendances nécessaires
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Heart,
  Share2,
  MapPin,
  Star,
  Phone,
  ArrowLeft,
  Bed,
  Bath,
  Check,
  UserCheck,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PropertyEquipment from '@/components/properties/PropertyEquipment';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

// Données mockées pour le développement
const mockProperties = [
  {
    id: '1',
    title: 'Appartement de Luxe au Cœur de Paris',
    location: '16 Rue de la Paix, 75002 Paris',
    price: 100000,
    currency: 'FCFA',
    period: 'Mois',
    rating: 4.9,
    reviews: 128,
    imageUrl: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
    description: "Do not miss the opportunity to board this magnificent oceanis 35. Finot-Conq's sharp-edged boat hull and the slightly displaced mast will offer you great balance and comfort on the one hand, and on the other excellent performance and great stability in navigation. The large space inside, consisting of a fitted kitchen.",
    rooms: 2,
    bathrooms: 2,
    features: ['Disponibilité robinet', 'Courant'],
    equipments: ['Voiture Garage', 'Meuble Déco', 'TV Smart 4K', 'Climatisation', 'Réfrigérateur', 'Piscine', 'Machine à Café', 'Cuisine Équipée'],
    ownerName: 'Sophie Dubois',
    ownerStatus: "Superhôte • Répond en moins d'une heure",
    ownerPhone: '+223 76 45 23 67',
    ownerWhatsapp: '+223 76 45 23 67',
    additionalImages: [
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2158&q=80',
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80'
    ]
  }
];

// Composant principal pour afficher les détails d'une propriété
const PropertyDetails = () => {
  // Récupération de l'ID de la propriété depuis l'URL
  const { id } = useParams();
  // Recherche de la propriété correspondante dans les données mockées
  const property = mockProperties.find(p => p.id === id) || mockProperties[0];
  // État pour gérer le statut favori
  const [isFavorite, setIsFavorite] = useState(false);
  
  // Tableau regroupant toutes les images (principale + additionnelles)
  const allImages = [property.imageUrl, ...(property.additionalImages || [])];
  // État pour suivre l'index de l'image actuellement affichée
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Fonction pour basculer l'état favori
  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };
  
  // Fonctions de navigation dans le carrousel d'images
  const goToNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % allImages.length);
  };

  const goToPreviousImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + allImages.length) % allImages.length);
  };
  
  return (
    <div className="px-0 md:px-6 lg:px-8 max-w-7xl mx-auto pb-20 md:pb-10">
      {/* Section du carrousel d'images */}
      <div className="relative w-full mb-4">
        {/* Carrousel mobile avec navigation tactile */}
        <div className="relative md:hidden">
          <div className="w-full h-[300px] relative">
            {allImages.map((img, index) => (
              <img 
                key={index}
                src={img} 
                alt={`${property.title} - image ${index + 1}`} 
                className={`absolute w-full h-full object-cover transition-opacity duration-500 ${
                  index === currentImageIndex ? 'opacity-100' : 'opacity-0'
                }`}
              />
            ))}
            
            {/* Boutons de navigation du carrousel mobile */}
            <button 
              onClick={goToPreviousImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/70 rounded-full p-2 shadow hover:bg-white/90"
            >
              <ChevronLeft size={20} className="text-gray-700" />
            </button>
            <button 
              onClick={goToNextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/70 rounded-full p-2 shadow hover:bg-white/90"
            >
              <ChevronRight size={20} className="text-gray-700" />
            </button>
            
            {/* Indicateurs de position dans le carrousel */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center space-x-1">
              {allImages.map((_, index) => (
                <div 
                  key={index}
                  className={`w-2 h-2 rounded-full ${
                    index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                  }`}
                ></div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Carrousel version desktop avec composant Carousel */}
        <div className="hidden md:block md:rounded-xl md:overflow-hidden">
          <Carousel className="w-full">
            <CarouselContent>
              {allImages.map((img, index) => (
                <CarouselItem key={index}>
                  <div className="h-[400px] relative">
                    <img 
                      src={img} 
                      alt={`${property.title} - image ${index + 1}`}
                      className="w-full h-full object-cover" 
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-4 z-10" />
            <CarouselNext className="right-4 z-10" />
          </Carousel>
        </div>
        
        {/* Bouton de retour */}
        <button 
          className="absolute top-4 left-4 w-10 h-10 flex items-center justify-center bg-white rounded-full shadow-md"
          onClick={() => window.history.back()}
        >
          <ArrowLeft size={20} className="text-gray-700" />
        </button>
        
        {/* Boutons d'action (favoris et partage) */}
        <div className="absolute top-4 right-4 flex space-x-2">
          <button 
            className="w-10 h-10 flex items-center justify-center bg-white rounded-full shadow-md"
            onClick={toggleFavorite}
          >
            <Heart 
              size={20} 
              className={isFavorite ? "fill-red-500 text-red-500" : "text-gray-700"} 
            />
          </button>
          <button 
            className="w-10 h-10 flex items-center justify-center bg-white rounded-full shadow-md"
          >
            <Share2 size={20} className="text-gray-700" />
          </button>
        </div>
      </div>
      
      {/* Section des informations de la propriété */}
      <div className="px-4 md:px-0">
        {/* Titre et localisation */}
        <h1 className="text-2xl font-bold">{property.title}</h1>
        <div className="flex items-center mt-2 text-gray-600">
          <MapPin size={16} className="mr-1" />
          <span>{property.location}</span>
        </div>
        
        {/* Prix et notation */}
        <div className="flex items-center justify-between mt-3">
          <div>
            <span className="text-2xl font-bold">{property.price.toLocaleString()} {property.currency}</span>
            <span className="text-gray-600">/{property.period}</span>
          </div>
          <div className="flex items-center bg-white px-2 py-1 rounded-md">
            <Star size={16} className="text-yellow-500 mr-1" />
            <span className="font-medium">{property.rating}</span>
            <span className="text-gray-500 ml-1">({property.reviews} avis)</span>
          </div>
        </div>
        
        {/* Caractéristiques principales */}
        <div className="flex flex-wrap gap-4 mt-4">
          <div className="flex items-center">
            <Bed size={20} className="text-gray-500 mr-2" />
            <span>{property.rooms} chambres</span>
          </div>
          <div className="flex items-center">
            <Bath size={20} className="text-gray-500 mr-2" />
            <span>{property.bathrooms} salles de bain</span>
          </div>
          {property.features.map((feature, index) => (
            <div key={index} className="flex items-center">
              <Check size={20} className="text-gray-500 mr-2" />
              <span>{feature}</span>
            </div>
          ))}
        </div>
        
        {/* Onglets d'information */}
        <Tabs defaultValue="description" className="mt-6">
          <TabsList className="w-full justify-start border-b rounded-none bg-transparent">
            <TabsTrigger 
              value="description" 
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
            >
              Description
            </TabsTrigger>
            <TabsTrigger 
              value="equipments" 
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
            >
              Équipements
            </TabsTrigger>
            <TabsTrigger 
              value="reviews" 
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
            >
              Avis
            </TabsTrigger>
          </TabsList>
          
          {/* Contenu des onglets */}
          <TabsContent value="description">
            <div className="mt-4">
              <p className="text-gray-700">{property.description}</p>
            </div>
          </TabsContent>
          <TabsContent value="equipments">
            <PropertyEquipment />
          </TabsContent>
          <TabsContent value="reviews">
            <div className="mt-4">
              <p className="text-gray-700">Les avis des utilisateurs seront affichés ici.</p>
            </div>
          </TabsContent>
        </Tabs>
        
        {/* Informations sur le propriétaire */}
        <div className="mt-8 pb-5 mb-6 border-b">
          <div className="flex items-center">
            <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center mr-3">
              <span className="text-lg font-medium">{property.ownerName.charAt(0)}</span>
            </div>
            <div>
              <p className="font-medium flex items-center">
                {property.ownerName}
                <UserCheck size={16} className="ml-2 text-blue-500" />
              </p>
              <p className="text-sm text-gray-600">{property.ownerStatus}</p>
            </div>
          </div>
        </div>
        
        {/* Boutons de contact */}
        <div className="grid grid-cols-2 gap-4 my-6">
          <Button className="bg-[#FFC107] hover:bg-amber-600 text-black font-semibold py-3">
            <Phone size={18} className="mr-2" />
            Appeler
          </Button>
          <Button className="bg-[#FFC107] hover:bg-amber-600 text-black font-semibold py-3">
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
      </div>
    </div>
  );
};

export default PropertyDetails;
