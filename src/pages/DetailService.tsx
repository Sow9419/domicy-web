
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

// Import service components
import ServiceDetailHeader from '@/components/services/ServiceDetailHeader';
import ServiceImageGallery from '@/components/services/ServiceImageGallery';
import ServiceInfoSection from '@/components/services/ServiceInfoSection';
import ServiceContactButtons from '@/components/services/ServiceContactButtons';

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
    name: 'Clean Services Mali',
    rating: 4.8,
    reviewsCount: 56,
    avatar: '/lovable-uploads/1ed7d643-f0eb-4fe6-acbb-d2fbe106ac2d.png'
  }
};

const DetailService: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [service, setService] = useState(mockService);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // In a real app, fetch the service data based on the ID
    // For this demo, we'll use the mock data and simulate a loading state
    const fetchService = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // In a real app, you would fetch from your API:
        // const response = await fetch(`/api/services/${id}`);
        // const data = await response.json();
        // setService(data);
        
        setService(mockService);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching service:', error);
        setLoading(false);
      }
    };
    
    fetchService();
  }, [id]);
  
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }
  
  return (
    <div className="pb-24">
      <ServiceDetailHeader title={service.title} />
      
      <ServiceImageGallery 
        images={service.images} 
        category={service.category} 
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
      
      <ServiceContactButtons phone={service.phone} />
    </div>
  );
};

export default DetailService;
