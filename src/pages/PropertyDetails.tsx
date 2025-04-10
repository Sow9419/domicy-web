
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
import { toast } from '@/components/ui/use-toast';

// Données mockées pour le développement - Synchronisées avec celles de Explorer.tsx
const mockProperties = [
  {
    id: '1',
    title: 'Ramen Sapporo',
    location: 'Bamako, Baco Djicoroni',
    price: 120000,
    currency: 'FCFA',
    period: 'Mois',
    rating: 4.5,
    reviews: 128,
    imageUrl: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
    description: "Magnifique appartement situé au cœur de Baco Djicoroni. Cet espace moderne et lumineux offre tout le confort nécessaire pour un séjour agréable. Profitez d'une cuisine entièrement équipée et d'un salon spacieux avec vue imprenable sur la ville.",
    rooms: 2,
    bathrooms: 1,
    features: ['Disponibilité robinet', 'Courant'],
    equipments: ['Voiture Garage', 'Meuble Déco', 'TV Smart 4K', 'Climatisation', 'Réfrigérateur', 'Machine à Café', 'Cuisine Équipée'],
    ownerName: 'Sophie Dubois',
    ownerStatus: "Superhôte • Répond en moins d'une heure",
    ownerPhone: '+223 76 45 23 67',
    ownerWhatsapp: '+223 76 45 23 67',
    additionalImages: [
      'https://images.unsplash.com/photo-1595576508898-0ad5c879a061?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1618773928121-c32242e63f39?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
    ]
  },
  {
    id: '2',
    title: 'Appartement moderne',
    location: 'Bamako, Baco Djicoroni',
    price: 150000,
    currency: 'FCFA',
    period: 'Mois',
    rating: 4.8,
    reviews: 95,
    imageUrl: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
    description: "Superbe appartement moderne avec finitions haut de gamme. Espace de vie ouvert avec cuisine américaine, chambres spacieuses et salle de bain luxueuse. Idéalement situé près des commerces et transports.",
    rooms: 3,
    bathrooms: 2,
    features: ['Disponibilité robinet', 'Courant', 'Internet Fibre'],
    equipments: ['Parking', 'Meuble Déco', 'TV Smart 4K', 'Climatisation', 'Réfrigérateur', 'Machine à laver', 'Cuisine Équipée'],
    ownerName: 'Jean Dupont',
    ownerStatus: "Hôte expérimenté • Répond rapidement",
    ownerPhone: '+223 76 98 76 54',
    ownerWhatsapp: '+223 76 98 76 54',
    additionalImages: [
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2158&q=80'
    ]
  },
  {
    id: '3',
    title: 'Villa avec piscine',
    location: 'Bamako, ACI 2000',
    price: 350000,
    currency: 'FCFA',
    period: 'Mois',
    rating: 4.9,
    reviews: 152,
    imageUrl: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
    description: "Magnifique villa de luxe avec piscine privée dans un quartier sécurisé. Cette propriété exceptionnelle offre des espaces de vie généreux, des finitions haut de gamme et un jardin paysager. Parfait pour les familles ou pour recevoir.",
    rooms: 5,
    bathrooms: 3,
    features: ['Disponibilité robinet', 'Courant', 'Internet Fibre', 'Sécurité 24/7'],
    equipments: ['Piscine', 'Jardin', 'Garage', 'TV Smart 4K', 'Climatisation', 'Réfrigérateur', 'Machine à laver', 'Cuisine Équipée', 'Barbecue'],
    ownerName: 'Marie Konaté',
    ownerStatus: "Superhôte • Répond en moins d'une heure",
    ownerPhone: '+223 76 12 34 56',
    ownerWhatsapp: '+223 76 12 34 56',
    additionalImages: [
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
      'https://images.unsplash.com/photo-1576941089067-2de3c901e126?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
      'https://images.unsplash.com/photo-1572331165267-854da2b10ccc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80'
    ]
  },
  {
    id: '4',
    title: 'Studio meublé',
    location: 'Bamako, Hamdallaye',
    price: 75000,
    currency: 'FCFA',
    period: 'Mois',
    rating: 4.2,
    reviews: 64,
    imageUrl: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
    description: "Studio confortable et fonctionnel, entièrement meublé et équipé. Idéal pour une personne seule ou un couple. Situé dans un quartier calme avec tous les commerces à proximité.",
    rooms: 1,
    bathrooms: 1,
    features: ['Disponibilité robinet', 'Courant'],
    equipments: ['Meuble Déco', 'TV', 'Climatisation', 'Réfrigérateur', 'Cuisine Équipée'],
    ownerName: 'Ibrahim Touré',
    ownerStatus: "Hôte réactif",
    ownerPhone: '+223 76 87 65 43',
    ownerWhatsapp: '+223 76 87 65 43',
    additionalImages: [
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80'
    ]
  }
];

// Composant principal pour afficher les détails d'une propriété
const PropertyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Recherche de la propriété par ID, avec fallback sur la première propriété si non trouvée
  const property = mockProperties.find(p => p.id === id);
  
  // Si aucune propriété n'est trouvée avec cet ID
  const [propertyData, setPropertyData] = useState(property || mockProperties[0]);
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(true);
  
  // Effet pour initialiser les données de la propriété
  useEffect(() => {
    if (id) {
      const foundProperty = mockProperties.find(p => p.id === id);
      if (foundProperty) {
        setPropertyData(foundProperty);
        setIsFavorite(foundProperty.isFavorite || false);
      } else {
        // Afficher un toast si la propriété n'est pas trouvée
        toast({
          title: "Propriété non trouvée",
          description: "La propriété que vous cherchez n'existe pas ou a été supprimée.",
          variant: "destructive"
        });
        // Rediriger vers la page d'accueil après 2 secondes
        setTimeout(() => navigate('/'), 2000);
      }
    }
    setLoading(false);
  }, [id, navigate]);
  
  // Tableau regroupant toutes les images (principale + additionnelles)
  const allImages = [propertyData.imageUrl, ...(propertyData.additionalImages || [])];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Fonction pour basculer l'état favori
  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    toast({
      title: isFavorite ? "Retiré des favoris" : "Ajouté aux favoris",
      description: isFavorite ? 
        "Cette propriété a été retirée de vos favoris" : 
        "Cette propriété a été ajoutée à vos favoris",
      duration: 2000
    });
  };
  
  // Fonctions de navigation dans le carrousel d'images
  const goToNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % allImages.length);
  };

  const goToPreviousImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + allImages.length) % allImages.length);
  };

  // Partager la propriété
  const shareProperty = () => {
    if (navigator.share) {
      navigator.share({
        title: propertyData.title,
        text: `Découvrez cette propriété: ${propertyData.title} à ${propertyData.location}`,
        url: window.location.href,
      })
      .catch((error) => console.log('Erreur de partage', error));
    } else {
      // Copier le lien dans le presse-papier si l'API Web Share n'est pas disponible
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Lien copié",
        description: "Le lien de cette propriété a été copié dans votre presse-papier",
        duration: 2000
      });
    }
  };
  
  // Afficher un indicateur de chargement pendant que les données sont récupérées
  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="animate-spin h-10 w-10 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }
  
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
                alt={`${propertyData.title} - image ${index + 1}`} 
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
          onClick={() => window.history.back()}
        >
          <ArrowLeft size={20} className="text-gray-700" />
        </button>
        
        {/* Boutons d'action (favoris et partage) */}
        <div className="absolute top-4 right-4 flex space-x-2 z-10">
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
            onClick={shareProperty}
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
          <h1 className="text-2xl font-bold">{propertyData.title}</h1>
          <div className="flex items-center mt-2 text-gray-600">
            <MapPin size={16} className="mr-1" />
            <span>{propertyData.location}</span>
          </div>
          
          {/* Mobile only: Price and rating */}
          <div className="flex items-center justify-between mt-4 md:hidden">
            <div>
              <span className="text-2xl font-bold">{propertyData.price.toLocaleString()} {propertyData.currency}</span>
              <span className="text-gray-600">/{propertyData.period}</span>
            </div>
            <div className="flex items-center bg-white px-2 py-1 rounded-md border border-gray-100">
              <Star size={16} className="text-yellow-500 mr-1" fill="currentColor" />
              <span className="font-medium">{propertyData.rating}</span>
              <span className="text-gray-500 ml-1">({propertyData.reviews} avis)</span>
            </div>
          </div>
          
          {/* Caractéristiques principales */}
          <div className="flex flex-wrap gap-4 mt-6 p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center">
              <Bed size={20} className="text-primary mr-2" />
              <span>{propertyData.rooms} chambres</span>
            </div>
            <div className="flex items-center">
              <Bath size={20} className="text-primary mr-2" />
              <span>{propertyData.bathrooms} salles de bain</span>
            </div>
            {propertyData.features.map((feature, index) => (
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
                <p className="text-gray-700">{propertyData.description}</p>
              </div>
            </TabsContent>
            <TabsContent value="equipments">
              <PropertyEquipment equipments={propertyData.equipments} />
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
                <span className="text-lg font-medium">{propertyData.ownerName.charAt(0)}</span>
              </div>
              <div>
                <p className="font-medium flex items-center">
                  {propertyData.ownerName}
                  <UserCheck size={16} className="ml-2 text-primary" />
                </p>
                <p className="text-sm text-gray-600">{propertyData.ownerStatus}</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Right column: Booking card (desktop only) */}
        <div className="hidden md:block md:w-80 lg:w-96">
          <div className="sticky top-4">
            <BookingCard 
              price={propertyData.price} 
              currency={propertyData.currency} 
              period={propertyData.period}
              rating={propertyData.rating}
              reviews={propertyData.reviews}
              ownerName={propertyData.ownerName}
              ownerStatus={propertyData.ownerStatus}
              ownerPhone={propertyData.ownerPhone}
              ownerWhatsapp={propertyData.ownerWhatsapp}
            />
          </div>
        </div>
      </div>
      
      {/* Mobile Bottom Bar */}
      <MobileBottomBar 
        price={propertyData.price} 
        currency={propertyData.currency} 
        period={propertyData.period}
        ownerPhone={propertyData.ownerPhone}
        ownerWhatsapp={propertyData.ownerWhatsapp}
      />
    </div>
  );
};

export default PropertyDetails;
