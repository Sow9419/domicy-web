
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion } from "framer-motion";
import { HeroServiceType } from '@/hooks/useServices';

interface FeatureCardProps {
  title: string;
  description: string;
  imageUrl: string;
  linkUrl: string;
  buttonText: string;
}

const FeatureCard = ({ title, description, imageUrl, linkUrl, buttonText }: FeatureCardProps) => {
  return (
    <div className="relative rounded-xl overflow-hidden group hover:shadow-xl transition-all duration-500">
      <div className="absolute inset-0">
        <img src={imageUrl} alt={title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/20" />
      </div>
      
      <div className="relative p-6 md:p-8 flex flex-col h-full min-h-[300px] justify-end">
        <h3 className="text-white text-2xl md:text-3xl font-bold mb-2">{title}</h3>
        <p className="text-white/90 mb-6 line-clamp-2">{description}</p>
        <Link 
          to={linkUrl}
          className="inline-flex items-center justify-center bg-primary hover:bg-primary/90 text-white font-medium px-5 py-3 rounded-lg transition-all duration-300 self-start group-hover:translate-x-2"
        >
          <span>{buttonText}</span>
          <ArrowRight className="ml-2 h-4 w-4 transition-all duration-300 group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
};

export const ServicesList = () => {
  const { getHeroServices } = useServices();
  const services = getHeroServices();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

  return (
    <div className="mt-8 mb-12">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Nos services populaires</h2>
        <Link 
          to="/explorer" 
          className="text-primary hover:text-primary/80 font-medium inline-flex items-center"
        >
          Voir tout
          <ExternalLink className="ml-1 h-4 w-4" />
        </Link>
      </div>
      
      <ScrollArea orientation="horizontal" className="w-full">
        <motion.div 
          className="flex space-x-6 pb-4 px-1 pt-1 min-w-max"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {services.map((service, index) => (
            <motion.div 
              key={service.id || index} 
              className="w-[300px] flex-shrink-0"
              variants={itemVariants}
              whileHover={{ 
                y: -8,
                transition: { duration: 0.3 }
              }}
            >
              <ServiceCard 
                id={service.id}
                title={service.title}
                description={service.description}
                imageUrl={service.imageUrl}
                category={service.category || ""}
                buttonLink={service.buttonLink}
                buttonText={service.buttonText}
              />
            </motion.div>
          ))}
        </motion.div>
      </ScrollArea>
    </div>
  );
};

// New ServiceCard component with a more modern design
const ServiceCard = ({ 
  id, 
  title, 
  description, 
  imageUrl, 
  category, 
  buttonLink, 
  buttonText 
}: HeroServiceType) => {
  return (
    <div className="rounded-xl overflow-hidden bg-white shadow-lg hover:shadow-xl transition-all duration-300 h-[380px] flex flex-col">
      <div className="h-48 overflow-hidden relative">
        <img 
          src={imageUrl} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-700 hover:scale-110" 
        />
        {category && (
          <span className="absolute top-4 left-4 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-white text-xs font-medium border border-white/30">
            {category}
          </span>
        )}
      </div>
      
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">{title}</h3>
        <p className="text-gray-600 mb-4 line-clamp-3 flex-grow">{description}</p>
        
        <Link
          to={id ? `/service/${id}` : buttonLink}
          className="mt-auto inline-flex items-center justify-center bg-primary/10 hover:bg-primary/20 text-primary font-medium px-4 py-2 rounded-lg transition-all duration-300 self-start"
        >
          {buttonText}
          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
};

// We need to import useServices here
import { useServices } from '@/hooks/useServices';

export default FeatureCard;
