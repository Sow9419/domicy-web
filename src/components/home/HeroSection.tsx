
import React from 'react';
import { Link } from 'react-router-dom';

interface HeroSectionProps {
  title: string;
  description: string;
  imageUrl: string;
  buttonText: string;
  buttonLink: string;
}

const HeroSection = ({ 
  title, 
  description, 
  imageUrl, 
  buttonText, 
  buttonLink 
}: HeroSectionProps) => {
  return (
    <div className="relative rounded-xl overflow-hidden my-4">
      <div className="absolute inset-0">
        <img 
          src={imageUrl} 
          alt={title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent" />
      </div>
      
      <div className="relative px-6 py-10 md:py-16 md:px-10 max-w-2xl">
        <h1 className="text-white text-2xl md:text-4xl font-bold mb-4">{title}</h1>
        <p className="text-white/90 mb-6 max-w-md">{description}</p>
        <Link 
          to={buttonLink}
          className="inline-flex items-center justify-center bg-primary hover:bg-primary-hover text-white font-medium px-5 py-2.5 rounded-lg transition-colors"
        >
          {buttonText}
        </Link>
      </div>
    </div>
  );
};

export default HeroSection;
