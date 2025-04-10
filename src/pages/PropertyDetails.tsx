
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Heart,
  Share2,
  MapPin,
  Star,
  ArrowLeft,
  Bed,
  Bath,
  Check,
  UserCheck,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PropertyEquipment from '@/components/properties/PropertyEquipment';
import BookingCard from '@/components/properties/BookingCard';
import MobileBottomBar from '@/components/properties/MobileBottomBar';
import { useProperties } from '@/hooks/useProperties';

// Composant principal pour afficher les détails d'une propriété
const PropertyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getPropertyById, toggleFavorite } = useProperties();
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Récupérer les données de la propriété
  const property = id ? getPropertyById(id) : null;
  const [isFavorite, setIsFavorite] = useState(property?.isFavorite || false);
  
  useEffect(() => {
    // Simule un temps de chargement pour l'expérience utilisateur
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);
  
  useEffect(() => {
    if (property) {
      setIsFavorite(property.isFavorite || false);
    }
  }, [property]);
  
  // Si aucune propriété n'est trouvée
  if (!loading && !property) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-6">
        <h1 className="text-2xl font-bold mb-4">Propriété non trouvée</h1>
        <p className="text-gray-600 mb-6">Cette propriété n'existe pas ou a été supprimée.</p>
        <button 
          onClick={() => navigate(-1)}
          className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
        >
          Retour
        </button>
      </div>
    );
  }
  
  if (loading || !property) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }
  
  // Tableau regroupant toutes les images
  const allImages = property.images || [property.imageUrl];
  
  // Fonction pour basculer l'état favori
  const handleToggleFavorite = () => {
    setIsFavorite(!isFavorite);
    if (id) {
      toggleFavorite(id);
    }
  };
  
  // Fonctions de navigation dans le carrousel d'images
  const goToNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % allImages.length);
  };

  const goToPreviousImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + allImages.length) % allImages.length);
  };
  
  return (
    <div className="max-w-7xl mx-auto pb-28 md:pb-10">
      {/* Section du carrousel d'images */}
      <div className="relative w-full mb-6">
        {/* Carrousel mobile avec navigation tactile */}
        <div className="relative">
          <div className="w-full h-[350px] md:h-[400px] relative">
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
            
            {/* Overlay gradient for better visibility of controls */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-transparent"></div>
            
            {/* Boutons de navigation du carrousel */}
            <button 
              onClick={goToPreviousImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/70 rounded-full p-2 shadow hover:bg-white/90 z-10"
            >
              <ChevronLeft size={20} className="text-gray-700" />
            </button>
            <button 
              onClick={goToNextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/70 rounded-full p-2 shadow hover:bg-white/90 z-10"
            >
              <ChevronRight size={20} className="text-gray-700" />
            </button>
            
            {/* Indicateurs de position dans le carrousel */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center space-x-1 z-10">
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
        
        {/* Bouton de retour */}
        <button 
          className="absolute top-4 left-4 w-10 h-10 flex items-center justify-center bg-white rounded-full shadow-md z-10"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft size={20} className="text-gray-700" />
        </button>
        
        {/* Boutons d'action (favoris et partage) */}
        <div className="absolute top-4 right-4 flex space-x-2 z-10">
          <button 
            className="w-10 h-10 flex items-center justify-center bg-white rounded-full shadow-md"
            onClick={handleToggleFavorite}
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
      
      {/* Main content with two columns on desktop */}
      <div className="px-4 md:px-8 md:flex md:gap-8">
        {/* Left column: Property details */}
        <div className="md:flex-1">
          {/* Titre et localisation */}
          <h1 className="text-2xl font-bold">{property.title}</h1>
          <div className="flex items-center mt-2 text-gray-600">
            <MapPin size={16} className="mr-1" />
            <span>{property.location}</span>
          </div>
          
          {/* Mobile only: Price and rating */}
          <div className="flex items-center justify-between mt-4 md:hidden">
            <div>
              <span className="text-2xl font-bold">{property.price.toLocaleString()} {property.currency}</span>
              <span className="text-gray-600">/{property.period}</span>
            </div>
            <div className="flex items-center bg-white px-2 py-1 rounded-md border border-gray-100">
              <Star size={16} className="text-yellow-500 mr-1" fill="currentColor" />
              <span className="font-medium">{property.rating}</span>
              <span className="text-gray-500 ml-1">({property.reviews || 0} avis)</span>
            </div>
          </div>
          
          {/* Caractéristiques principales */}
          <div className="flex flex-wrap gap-4 mt-6 p-4 bg-gray-50 rounded-lg">
            {property.rooms && (
              <div className="flex items-center">
                <Bed size={20} className="text-primary mr-2" />
                <span>{property.rooms} chambres</span>
              </div>
            )}
            {property.bathrooms && (
              <div className="flex items-center">
                <Bath size={20} className="text-primary mr-2" />
                <span>{property.bathrooms} salles de bain</span>
              </div>
            )}
            {property.features?.map((feature, index) => (
              <div key={index} className="flex items-center">
                <Check size={20} className="text-primary mr-2" />
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
          
          {/* Mobile only: Owner information */}
          <div className="mt-8 pb-5 border-b md:hidden">
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                <span className="text-lg font-medium">{property.ownerName?.charAt(0)}</span>
              </div>
              <div>
                <p className="font-medium flex items-center">
                  {property.ownerName}
                  <UserCheck size={16} className="ml-2 text-primary" />
                </p>
                <p className="text-sm text-gray-600">{property.ownerStatus}</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Right column: Booking card (desktop only) */}
        <div className="hidden md:block md:w-80 lg:w-96">
          <div className="sticky top-4">
            <BookingCard 
              price={property.price} 
              currency={property.currency} 
              period={property.period}
              rating={property.rating}
              reviews={property.reviews || 0}
              ownerName={property.ownerName || ""}
              ownerStatus={property.ownerStatus || ""}
              ownerPhone={property.ownerPhone || ""}
              ownerWhatsapp={property.ownerWhatsapp || ""}
            />
          </div>
        </div>
      </div>
      
      {/* Mobile Bottom Bar */}
      <MobileBottomBar 
        price={property.price} 
        currency={property.currency} 
        period={property.period}
        ownerPhone={property.ownerPhone || ""}
        ownerWhatsapp={property.ownerWhatsapp || ""}
      />
    </div>
  );
};

export default PropertyDetails;
