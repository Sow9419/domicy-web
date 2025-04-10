
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';

export interface PropertyType {
  id: string;
  title: string;
  location: string;
  price: number;
  currency: string;
  period: string;
  rating: number;
  reviews: number;
  imageUrl: string;
  description: string;
  rooms: number;
  bathrooms: number;
  features: string[];
  equipments: string[];
  unavailableEquipments?: string[];
  ownerName: string;
  ownerStatus: string;
  ownerPhone: string;
  ownerWhatsapp: string;
  additionalImages: string[];
  isFavorite?: boolean;
}

// Mock data
const mockProperties: PropertyType[] = [
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
    unavailableEquipments: ['Internet Fibre', 'Piscine', 'Sécurité 24/7'],
    ownerName: 'Sophie Dubois',
    ownerStatus: "Superhôte • Répond en moins d'une heure",
    ownerPhone: '+223 76 45 23 67',
    ownerWhatsapp: '+223 76 45 23 67',
    additionalImages: [
      'https://images.unsplash.com/photo-1595576508898-0ad5c879a061?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1618773928121-c32242e63f39?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
    ],
    isFavorite: false
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
    ],
    isFavorite: false
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
    ],
    isFavorite: false
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
    ],
    isFavorite: false
  }
];

export const usePropertyDetails = (propertyId: string | undefined) => {
  const navigate = useNavigate();
  const [propertyData, setPropertyData] = useState<PropertyType | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    if (propertyId) {
      const foundProperty = mockProperties.find(p => p.id === propertyId);
      if (foundProperty) {
        setPropertyData(foundProperty);
        setIsFavorite(foundProperty.isFavorite || false);
        setLoading(false);
      } else {
        toast({
          title: "Propriété non trouvée",
          description: "La propriété que vous cherchez n'existe pas ou a été supprimée.",
          variant: "destructive"
        });
        setTimeout(() => navigate('/'), 2000);
      }
    } else {
      setLoading(false);
    }
  }, [propertyId, navigate]);
  
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
  
  return {
    propertyData,
    isFavorite,
    loading,
    toggleFavorite
  };
};
