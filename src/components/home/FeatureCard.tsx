
import React from 'react';
import { Link } from 'react-router-dom';

interface FeatureCardProps {
  title: string;
  description: string;
  imageUrl: string;
  linkUrl: string;
  buttonText: string;
}

const FeatureCard = ({ title, description, imageUrl, linkUrl, buttonText }: FeatureCardProps) => {
  return (
    <div className="relative rounded-xl overflow-hidden">
      <div className="absolute inset-0">
        <img src={imageUrl} alt={title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/20" />
      </div>
      
      <div className="relative p-6 md:p-8 flex flex-col h-full min-h-[300px] justify-end">
        <h3 className="text-white text-2xl md:text-3xl font-bold mb-2">{title}</h3>
        <p className="text-white/90 mb-4">{description}</p>
        <Link 
          to={linkUrl}
          className="inline-flex items-center justify-center bg-primary hover:bg-primary-hover text-white font-medium px-4 py-2 rounded-lg transition-colors self-start"
        >
          {buttonText}
        </Link>
      </div>
    </div>
  );
};

export default FeatureCard;
