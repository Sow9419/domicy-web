import { useState, useEffect } from 'react';
import servicesData from '../data/services.json';

export interface HeroServiceType {
  id?: string;
  title: string;
  description: string;
  imageUrl: string;
  buttonText: string;
  buttonLink: string;
  category?: string;
  categoryIcon?: string;
}

export interface FeatureCardType {
  id?: string;
  title: string;
  description: string;
  imageUrl: string;
  linkUrl: string;
  buttonText: string;
}

export const useServices = () => {
  // Chargement des données depuis le fichier JSON
  const [services, setServices] = useState(servicesData);

  // Fonction pour récupérer tous les services du carrousel héros
  const getHeroServices = () => services.heroServices;

  // Fonction pour récupérer toutes les cartes de fonctionnalités
  const getFeatureCards = () => services.featureCards;

  // Fonction pour récupérer un service héros par son ID
  const getHeroServiceById = (id: string) => {
    return services.heroServices.find(service => service.id === id) || null;
  };

  // Fonction pour récupérer une carte de fonctionnalité par son ID
  const getFeatureCardById = (id: string) => {
    return services.featureCards.find(card => card.id === id) || null;
  };

  return {
    services,
    getHeroServices,
    getFeatureCards,
    getHeroServiceById,
    getFeatureCardById
  };
};