
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Heart,
  Share2,
  MapPin,
  Star,
  Phone,
  Mail,
  MessageSquare,
  Check,
  Wifi,
  Tv,
  ChevronLeft
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const mockProperties = [
  {
    id: '1',
    title: 'Ramen Sapporo',
    location: 'Bamako, Baco Djicoroni',
    price: 120000,
    currency: 'FCFA',
    period: 'Mois',
    rating: 4.5,
    imageUrl: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
    description: 'Appartement confortable et lumineux de 2 chambres au cœur de Baco Djicoroni. La propriété comprend une cuisine équipée, un salon spacieux, et une salle de bain moderne. Idéal pour les professionnels ou une petite famille.',
    features: ['2 chambres', 'Cuisine équipée', 'Salon spacieux', 'Salle de bain moderne', 'Wifi', 'Parking'],
    ownerName: 'Ibrahim Keita',
    ownerPhone: '+223 76 45 23 67',
    ownerEmail: 'ibrahim.keita@example.com',
    additionalImages: [
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2158&q=80',
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80'
    ]
  }
];

const PropertyDetails = () => {
  const { id } = useParams();
  const property = mockProperties.find(p => p.id === id);
  
  if (!property) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <h2 className="text-xl font-semibold mb-2">Propriété non trouvée</h2>
        <p className="text-gray-600 mb-6">
          Nous n'avons pas trouvé la propriété que vous recherchez.
        </p>
        <Link 
          to="/explorer" 
          className="bg-primary hover:bg-primary-hover text-white font-medium px-5 py-2.5 rounded-lg transition-colors"
        >
          Retour à l'explorateur
        </Link>
      </div>
    );
  }
  
  return (
    <div className="px-4 md:px-6 md:ml-16 pb-20 md:pb-10">
      <div className="py-4">
        <Link to="/explorer" className="inline-flex items-center text-gray-600 hover:text-gray-900">
          <ChevronLeft size={20} className="mr-1" />
          <span>Retour</span>
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
          <img 
            src={property.imageUrl} 
            alt={property.title} 
            className="w-full h-full object-cover"
          />
          <button 
            className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center bg-white/80 backdrop-blur-sm rounded-full shadow-sm"
            aria-label="Ajouter aux favoris"
          >
            <Heart size={20} className="text-gray-600" />
          </button>
        </div>
        
        <div className="grid grid-cols-2 gap-2">
          {property.additionalImages.map((img, index) => (
            <div key={index} className="relative aspect-square overflow-hidden rounded-xl">
              <img 
                src={img} 
                alt={`${property.title} - image ${index + 2}`} 
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-2xl font-bold">{property.title}</h1>
              <p className="flex items-center text-gray-600 mt-1">
                <MapPin size={16} className="mr-1" />
                {property.location}
              </p>
            </div>
            <div className="flex items-center bg-gray-100 px-2 py-1 rounded-md">
              <Star size={16} className="text-yellow-500 mr-1" />
              <span className="font-medium">{property.rating}</span>
            </div>
          </div>
          
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-3">Description</h2>
            <p className="text-gray-700">{property.description}</p>
          </div>
          
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-3">Caractéristiques</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {property.features.map((feature, index) => (
                <div key={index} className="flex items-center">
                  {feature.includes('Wifi') ? (
                    <Wifi size={18} className="text-gray-600 mr-2" />
                  ) : feature.includes('TV') ? (
                    <Tv size={18} className="text-gray-600 mr-2" />
                  ) : (
                    <Check size={18} className="text-green-500 mr-2" />
                  )}
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="md:col-span-1">
          <div className="sticky top-4 bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
            <div className="mb-4">
              <span className="text-2xl font-bold">{property.price.toLocaleString()} {property.currency}</span>
              <span className="text-gray-600">/{property.period}</span>
            </div>
            
            <div className="mb-5 pb-5 border-b">
              <h3 className="font-semibold mb-3">Propriétaire</h3>
              <div className="flex items-center mb-3">
                <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mr-3">
                  <span className="text-lg font-medium">{property.ownerName.charAt(0)}</span>
                </div>
                <div>
                  <p className="font-medium">{property.ownerName}</p>
                  <p className="text-sm text-gray-600">Propriétaire vérifié</p>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-3">Contacter</h3>
              <div className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <Phone size={18} className="mr-2" />
                  {property.ownerPhone}
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Mail size={18} className="mr-2" />
                  {property.ownerEmail}
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <MessageSquare size={18} className="mr-2" />
                  WhatsApp
                </Button>
                <Button className="w-full bg-primary hover:bg-primary-hover mt-2">
                  <Share2 size={18} className="mr-2" />
                  Partager
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;
