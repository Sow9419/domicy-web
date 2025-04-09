
import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ServiceFormHeader: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div className="sticky top-0 bg-white border-b z-10">
      <div className="flex items-center p-4">
        <button
          onClick={() => navigate(-1)}
          className="mr-4"
        >
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-xl font-semibold flex-1 text-center">Créer un service</h1>
        <div className="w-6"></div>
      </div>
    </div>
  );
};

export default ServiceFormHeader;
