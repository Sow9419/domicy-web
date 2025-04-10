
import React from 'react';
import { useParams } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PropertyEquipment from '@/components/properties/PropertyEquipment';
import BookingCard from '@/components/properties/BookingCard';
import MobileBottomBar from '@/components/properties/MobileBottomBar';
import PropertyHeader from '@/components/properties/PropertyHeader';
import PropertyDescription from '@/components/properties/PropertyDescription';
import PropertyReviews from '@/components/properties/PropertyReviews';
import PropertyOwnerInfo from '@/components/properties/PropertyOwnerInfo';
import PropertyActions from '@/components/properties/PropertyActions';
import PropertyImageCarousel from '@/components/properties/PropertyImageCarousel';
import { usePropertyDetails } from '@/hooks/usePropertyDetails';

const PropertyDetails = () => {
  const { id } = useParams();
  const { propertyData, isFavorite, loading, toggleFavorite } = usePropertyDetails(id);
  
  if (loading || !propertyData) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="animate-spin h-10 w-10 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }
  
  const allImages = [propertyData.imageUrl, ...(propertyData.additionalImages || [])];
  
  return (
    <div className="max-w-7xl mx-auto pb-28 md:pb-10">
      <div className="relative w-full mb-6">
        <PropertyImageCarousel images={allImages} title={propertyData.title} />
        
        <PropertyActions 
          isFavorite={isFavorite} 
          onToggleFavorite={toggleFavorite}
          propertyTitle={propertyData.title}
          propertyLocation={propertyData.location}
        />
      </div>
      
      <div className="px-4 md:px-8 md:flex md:gap-8">
        <div className="md:flex-1">
          <PropertyHeader 
            title={propertyData.title}
            location={propertyData.location}
            price={propertyData.price}
            currency={propertyData.currency}
            period={propertyData.period}
            rating={propertyData.rating}
            reviews={propertyData.reviews}
            rooms={propertyData.rooms}
            bathrooms={propertyData.bathrooms}
            features={propertyData.features}
          />
          
          <Tabs defaultValue="description" className="mt-6">
            <TabsList className="w-full justify-start border-b rounded-none bg-transparent">
              <TabsTrigger 
                value="description" 
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
              >
                Description
              </TabsTrigger>
              <TabsTrigger 
                value="equipments" 
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
              >
                Équipements
              </TabsTrigger>
              <TabsTrigger 
                value="reviews" 
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
              >
                Avis
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="description">
              <PropertyDescription description={propertyData.description} />
            </TabsContent>
            <TabsContent value="equipments">
              <PropertyEquipment 
                equipments={propertyData.equipments} 
                unavailableEquipments={propertyData.unavailableEquipments}
              />
            </TabsContent>
            <TabsContent value="reviews">
              <PropertyReviews />
            </TabsContent>
          </Tabs>
          
          <PropertyOwnerInfo 
            ownerName={propertyData.ownerName}
            ownerStatus={propertyData.ownerStatus}
          />
        </div>
        
        <div className="hidden md:block md:w-80 lg:w-96">
          <div className="sticky top-4">
            <BookingCard 
              price={propertyData.price} 
              currency={propertyData.currency} 
              period={propertyData.period}
              rating={propertyData.rating}
              reviews={propertyData.reviews}
              ownerName={propertyData.ownerName}
              ownerStatus={propertyData.ownerStatus}
              ownerPhone={propertyData.ownerPhone}
              ownerWhatsapp={propertyData.ownerWhatsapp}
            />
          </div>
        </div>
      </div>
      
      <MobileBottomBar 
        price={propertyData.price} 
        currency={propertyData.currency} 
        period={propertyData.period}
        ownerPhone={propertyData.ownerPhone}
        ownerWhatsapp={propertyData.ownerWhatsapp}
      />
    </div>
  );
};

export default PropertyDetails;
