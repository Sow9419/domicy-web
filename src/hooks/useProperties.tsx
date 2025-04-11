
import { useState, useEffect } from 'react';
import propertiesData from '../data/properties.json';

export interface PropertyType {
  id: string;
  title: string;
  location: string;
  price: number;
  currency: string;
  period: string;
  rating: number;
  reviews?: number;
  imageUrl: string;
  description?: string;
  rooms?: number;
  bathrooms?: number;
  features?: string[];
  equipments?: string[];
  ownerName?: string;
  ownerStatus?: string;
  ownerPhone?: string;
  ownerWhatsapp?: string;
  images?: string[];
  isAvailable?: boolean;
  isFavorite?: boolean;
}

export const useProperties = () => {
  // On utilise le localStorage pour conserver l'état des favoris
  const [properties, setProperties] = useState<PropertyType[]>(() => {
    const savedProperties = localStorage.getItem('properties');
    return savedProperties ? JSON.parse(savedProperties) : propertiesData;
  });

  // Sauvegarde des propriétés dans le localStorage
  useEffect(() => {
    localStorage.setItem('properties', JSON.stringify(properties));
  }, [properties]);

  // Fonction pour récupérer toutes les propriétés
  const getAllProperties = () => properties;

  // Fonction pour récupérer une propriété par son ID
  const getPropertyById = (id: string) => {
    return properties.find(property => property.id === id) || null;
  };

  // Fonction pour récupérer les propriétés favorites
  const getFavoriteProperties = () => {
    return properties.filter(property => property.isFavorite);
  };

  // Fonction pour basculer l'état favori d'une propriété
  const toggleFavorite = (id: string) => {
    const updatedProperties = properties.map(property => 
      property.id === id ? { ...property, isFavorite: !property.isFavorite } : property
    );
    setProperties(updatedProperties);
    return updatedProperties.find(property => property.id === id)?.isFavorite;
  };

  // Fonction pour rechercher des propriétés
  const searchProperties = (searchTerm: string) => {
    // Logique de recherche simple: par localisation
    const term = searchTerm.toLowerCase().trim();
    if (!term) return properties;
    
    const results = properties.filter(property => 
      property.location.toLowerCase().includes(term) || 
      property.title.toLowerCase().includes(term)
    );
    
    return results;
  };

  return {
    properties,
    getAllProperties,
    getPropertyById,
    getFavoriteProperties,
    toggleFavorite,
    searchProperties
  };
};
