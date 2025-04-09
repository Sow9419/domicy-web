
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

// Import service components
import ServiceFormHeader from '@/components/services/ServiceFormHeader';
import ServiceBasicInfoForm from '@/components/services/ServiceBasicInfoForm';
import ServiceCategoryForm from '@/components/services/ServiceCategoryForm';
import ServiceImageUploader from '@/components/services/ServiceImageUploader';
import ServiceContactForm from '@/components/services/ServiceContactForm';

const CreateService: React.FC = () => {
  const navigate = useNavigate();
  
  // Service form state
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [availability, setAvailability] = useState('');
  
  // Current step in the form process
  const [currentStep, setCurrentStep] = useState(1);
  
  const handleNext = () => {
    if (currentStep === 1 && (!title || !description || !price)) {
      toast.error('Veuillez remplir tous les champs obligatoires');
      return;
    }
    
    if (currentStep === 2 && !category) {
      toast.error('Veuillez sélectionner une catégorie');
      return;
    }
    
    if (currentStep === 4 && (!phone || !email || !availability)) {
      toast.error('Veuillez remplir tous les champs de contact');
      return;
    }
    
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
      window.scrollTo(0, 0);
    } else {
      handleSubmit();
    }
  };
  
  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo(0, 0);
    }
  };
  
  const handleSubmit = () => {
    // In a real app, you would send this data to your API
    console.log({
      title,
      description,
      price,
      category,
      images,
      phone,
      email,
      availability
    });
    
    // Show success message
    toast.success('Service créé avec succès!');
    
    // Navigate to the service details page
    // In a real app, you would navigate to the newly created service
    navigate('/service/1');
  };
  
  // Render the current step
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <ServiceBasicInfoForm
            title={title}
            setTitle={setTitle}
            description={description}
            setDescription={setDescription}
            price={price}
            setPrice={setPrice}
          />
        );
      case 2:
        return (
          <ServiceCategoryForm
            selectedCategory={category}
            setSelectedCategory={setCategory}
          />
        );
      case 3:
        return (
          <ServiceImageUploader
            images={images}
            setImages={setImages}
          />
        );
      case 4:
        return (
          <ServiceContactForm
            phone={phone}
            setPhone={setPhone}
            email={email}
            setEmail={setEmail}
            availability={availability}
            setAvailability={setAvailability}
          />
        );
      default:
        return null;
    }
  };
  
  return (
    <div className="pb-20">
      <ServiceFormHeader />
      
      <div className="pt-4 pb-2 px-4 bg-gray-50">
        <h2 className="text-lg font-semibold">
          {currentStep === 1 && "Informations de base"}
          {currentStep === 2 && "Catégorie du service"}
          {currentStep === 3 && "Photos du service"}
          {currentStep === 4 && "Coordonnées de contact"}
        </h2>
        <p className="text-sm text-gray-500">
          Étape {currentStep} sur 4
        </p>
        
        <div className="mt-3 flex space-x-1">
          {[1, 2, 3, 4].map((step) => (
            <div 
              key={step}
              className={`h-1 flex-1 rounded-full ${
                step <= currentStep ? 'bg-green-500' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>
      
      {renderStep()}
      
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4 flex justify-between">
        <Button
          variant="outline"
          onClick={handleBack}
          disabled={currentStep === 1}
        >
          Précédent
        </Button>
        
        <Button onClick={handleNext}>
          {currentStep < 4 ? 'Suivant' : 'Publier le service'}
        </Button>
      </div>
    </div>
  );
};

export default CreateService;
