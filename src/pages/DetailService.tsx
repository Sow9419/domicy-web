
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Import service components
import ServiceDetailHeader from '@/components/services/ServiceDetailHeader';
import ServiceImageGallery from '@/components/services/ServiceImageGallery';
import ServiceInfoSection from '@/components/services/ServiceInfoSection';
import ServiceContactButtons from '@/components/services/ServiceContactButtons';
import ServiceProviderProfile from '@/components/services/ServiceProviderProfile';

// Mock service data
const mockService = {
  id: '1',
  title: 'Service de Nettoyage Professionnel',
  description: 'Nous proposons un service de nettoyage professionnel pour appartements, maisons et bureaux. Notre équipe expérimentée utilise des produits écologiques et des équipements modernes pour garantir une propreté impeccable.',
  price: '15000',
  category: 'Nettoyage',
  images: [
    '/lovable-uploads/8d7c4e8a-758a-4034-af18-f2f78c718eb2.png',
    'https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
    'https://images.unsplash.com/photo-1563453392212-326f5e854473?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
  ],
  location: 'Bamako, Mali',
  availability: '7j/7, 8h-20h',
  phone: '+223 76 12 34 56',
  email: 'nettoyage@example.com',
  user: {
    id: '101',
    name: 'Sophie Dubois',
    rating: 4.8,
    reviewsCount: 56,
    avatar: '/lovable-uploads/1ed7d643-f0eb-4fe6-acbb-d2fbe106ac2d.png',
    title: 'Superhôte',
    responseTime: 'moins d\'une heure'
  },
  bio: 'Nous offrons des solutions marketing personnalisées pour optimiser votre présence en ligne. Notre équipe d\'experts combine créativité et technologie pour générer des résultats mesurables.'
};

// Additional mock service for ID 2
const secondMockService = {
  id: '2',
  title: 'Solutions Marketing Digital',
  description: 'Propulsez votre entreprise vers le succès numérique',
  price: '30000',
  category: 'Marketing',
  images: [
    '/lovable-uploads/afa5bb36-b321-4474-a6a9-0c412e59775b.png',
    'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
  ],
  location: 'Bamako, ACI 2000',
  availability: 'Lun-Sam, 9h-18h',
  phone: '+123 456 7890',
  email: 'contact@example.com',
  user: {
    id: '102',
    name: 'Sophie Dubois',
    rating: 4.9,
    reviewsCount: 78,
    avatar: '/lovable-uploads/1ed7d643-f0eb-4fe6-acbb-d2fbe106ac2d.png',
    title: 'Superhôte',
    responseTime: 'moins d\'une heure'
  },
  bio: 'Nous offrons des solutions marketing personnalisées pour optimiser votre présence en ligne. Notre équipe d\'experts combine créativité et technologie pour générer des résultats mesurables.'
};

// Map of mock services by ID
const mockServicesMap = {
  '1': mockService,
  '2': secondMockService,
  '3': {
    ...mockService,
    id: '3',
    title: 'Publiez Votre Propriété',
    category: 'Publicité',
    price: 'Gratuit' 
  }
};

const DetailService: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [service, setService] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Fetch the service data based on the ID
    const fetchService = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Get the service from our mock data map
        const foundService = id && mockServicesMap[id as keyof typeof mockServicesMap];
        
        if (foundService) {
          setService(foundService);
        } else {
          // Default to first service if ID not found
          setService(mockService);
        }
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching service:', error);
        setLoading(false);
      }
    };
    
    fetchService();
  }, [id]);
  
  const handleBack = () => {
    navigate(-1);
  };
  
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }
  
  if (!service) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <h1 className="text-2xl font-bold mb-4">Service non trouvé</h1>
        <p className="text-gray-600 mb-6">Ce service n'existe pas ou a été supprimé.</p>
        <Button onClick={handleBack}>Retour</Button>
      </div>
    );
  }
  
  return (
    <div className="pb-24 bg-gray-50 min-h-screen">
      <div className="bg-white p-4 flex items-center sticky top-0 z-20 shadow-sm">
        <Button variant="ghost" size="icon" onClick={handleBack} className="mr-2">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-semibold">En savoir plus</h1>
      </div>
      
      <ServiceImageGallery 
        images={service.images} 
        category={service.category} 
      />
      
      <div className="max-w-4xl mx-auto">
        <div className="p-5 bg-white mt-4 rounded-lg shadow-sm">
          <h1 className="text-3xl font-bold mb-2">{service.title}</h1>
          {service.description && (
            <p className="text-gray-600">{service.description}</p>
          )}
        </div>
        
        <ServiceProviderProfile 
          user={service.user}
          bio={service.bio}
        />
        
        <ServiceInfoSection 
          title={service.title}
          description={service.description}
          price={service.price}
          category={service.category}
          location={service.location}
          availability={service.availability}
          phone={service.phone}
          email={service.email}
        />
      </div>
      
      <ServiceContactButtons phone={service.phone} />
    </div>
  );
};

export default DetailService;
