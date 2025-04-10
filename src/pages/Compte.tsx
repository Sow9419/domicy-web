
import React from 'react';
import { LogOut, CreditCard, Smartphone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';

// Import all the components we just created
import ProfileSection from '@/components/compte/ProfileSection';
import PersonalInfoSection from '@/components/compte/PersonalInfoSection';
import VerificationSection from '@/components/compte/VerificationSection';
import SubscriptionSection from '@/components/compte/SubscriptionSection';
import AdsManagementSection from '@/components/compte/AdsManagementSection';
import ContactHistorySection from '@/components/compte/ContactHistorySection';
import PaymentMethodsSection from '@/components/compte/PaymentMethodsSection';
import RatingsSection from '@/components/compte/RatingsSection';

// Mock data for the account page
const accountData = {
  profile: {
    name: 'Sophie Dubois',
    memberSince: '2022',
    avatarUrl: '/lovable-uploads/1ed7d643-f0eb-4fe6-acbb-d2fbe106ac2d.png',
  },
  personalInfo: {
    fullName: 'Sophie Dubois',
    email: 'sophie.dubois@gmail.com',
    phone: '+33 6 12 34 56 78',
    address: '123 Rue de Paris, 75001 Paris',
  },
  verification: [
    { label: "Carte d'identité", isVerified: true },
    { label: "Compte Vérifié", isVerified: true },
    { label: "Adresse", isVerified: false },
  ],
  subscription: {
    isPremium: false,
  },
  ads: {
    count: 2,
  },
  contacts: [
    {
      id: '1',
      propertyName: 'Villa Méditerranée',
      location: 'Marseille, France',
      lastContact: '15 mars 2024',
      hasUnread: true,
    },
    {
      id: '2',
      propertyName: 'Chalet Alpin',
      location: 'Chamonix, France',
      lastContact: '20 février 2024',
    },
  ],
  paymentMethods: [
    {
      id: '1',
      type: 'mobile' as const,
      name: 'Orange Money',
      icon: '🔶',
    },
    {
      id: '2',
      type: 'card' as const,
      name: 'Visa',
      details: '****4589',
      icon: CreditCard,
    },
  ],
  ratings: [
    {
      id: '1',
      name: 'Laurent Martin',
      rating: 5,
      comment: 'Excellente locataire, très respectueuse des lieux.',
      date: '12 janvier 2024',
    },
    {
      id: '2',
      name: 'Marie Dupont',
      rating: 4,
      comment: 'Bonne communication et sérieuse.',
      date: '5 février 2024',
    }
  ],
  averageRating: 4.8,
  totalRatings: 12,
  // User role could be used for conditional rendering
  userRole: 'tenant', // 'tenant' or 'owner'
};

const Compte = () => {
  const isMobile = useIsMobile();
  
  return (
    <div className="px-4 md:px-6 lg:px-8 max-w-6xl mx-auto pb-20 md:pb-10">
      {/* Section du profil toujours en pleine largeur */}
      <ProfileSection 
        name={accountData.profile.name}
        memberSince={accountData.profile.memberSince}
        avatarUrl={accountData.profile.avatarUrl}
      />
      
      {/* Mise en page en grille pour desktop, colonne unique pour mobile */}
      <div className={`grid ${!isMobile ? 'grid-cols-2 gap-6' : 'grid-cols-1 gap-4'}`}>
        {/* Colonne gauche */}
        <div className="space-y-6">
          <PersonalInfoSection personalInfo={accountData.personalInfo} />
          <VerificationSection verificationItems={accountData.verification} />
          <SubscriptionSection isPremium={accountData.subscription.isPremium} />
          <AdsManagementSection adsCount={accountData.ads.count} />
        </div>
        
        {/* Colonne droite */}
        <div className="space-y-6">
          <ContactHistorySection contacts={accountData.contacts} />
          <PaymentMethodsSection paymentMethods={accountData.paymentMethods} />
          <RatingsSection 
            ratings={accountData.ratings}
            averageRating={accountData.averageRating}
            totalRatings={accountData.totalRatings}
          />
        </div>
      </div>
      
      {/* Bouton Déconnexion - toujours en pleine largeur */}
      <div className="mt-8">
        <Button variant="destructive" className="w-full bg-green-500 hover:bg-green-600 mb-6">
          <LogOut className="mr-2 h-4 w-4" /> Se déconnecter
        </Button>
      </div>
    </div>
  );
};

export default Compte;
