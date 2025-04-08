
import React from 'react';
import { 
  User, 
  ChevronRight,
  LogOut,
  Check,
  Phone,
  Star,
  Plus,
  CreditCard,
  Edit
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useIsMobile } from '@/hooks/use-mobile';

// Composant pour les sections
const AccountSection = ({ title, children, className = "" }: { title: string, children: React.ReactNode, className?: string }) => (
  <div className={`mb-6 ${className}`}>
    <h2 className="text-lg font-semibold mb-4">{title}</h2>
    {children}
  </div>
);

// Composant pour les items de lien
const AccountLink = ({ 
  title, 
  icon: Icon, 
  onClick,
  isCreateButton = false,
  rightElement
}: { 
  title: string, 
  icon?: React.ElementType, 
  onClick?: () => void,
  isCreateButton?: boolean,
  rightElement?: React.ReactNode
}) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center justify-between p-4 rounded-lg border ${isCreateButton ? 'border-primary text-primary' : 'border-gray-200'} mb-3 hover:bg-gray-50 transition-colors`}
  >
    <div className="flex items-center">
      {Icon && (
        <div className={`mr-3 w-6 h-6 flex items-center justify-center ${isCreateButton ? 'text-primary' : 'text-gray-600'}`}>
          <Icon size={isCreateButton ? 18 : 16} />
        </div>
      )}
      <span className={`${isCreateButton ? 'font-medium' : ''}`}>{title}</span>
    </div>
    {rightElement || (
      <ChevronRight size={16} className="text-gray-400" />
    )}
  </button>
);

// Composant pour les infos personnelles
const PersonalInfoItem = ({ label, value }: { label: string, value: string }) => (
  <div className="flex justify-between items-center mb-3">
    <span className="text-gray-500">{label}</span>
    <span className="font-medium">{value}</span>
  </div>
);

// Composant pour la vérification
const VerificationItem = ({ label, isVerified }: { label: string, isVerified: boolean }) => (
  <div className="flex justify-between items-center mb-3">
    <span>{label}</span>
    {isVerified && (
      <span className="flex items-center text-green-500">
        <Check size={16} className="mr-1" />
        Vérifié
      </span>
    )}
  </div>
);

// Composant pour l'historique des contacts
const ContactHistoryItem = ({ 
  propertyName, 
  location, 
  lastContact 
}: { 
  propertyName: string, 
  location: string, 
  lastContact: string 
}) => (
  <div className="flex items-center justify-between mb-4 border-b pb-4">
    <div>
      <h3 className="font-medium">{propertyName}</h3>
      <p className="text-gray-500 text-sm">{location}</p>
      <p className="text-gray-500 text-sm">Dernier contact: {lastContact}</p>
    </div>
    <div className="flex space-x-2">
      <Button size="icon" className="rounded-full bg-green-500 hover:bg-green-600">
        <Phone size={16} />
      </Button>
      <Button size="icon" className="rounded-full bg-green-500 hover:bg-green-600">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="16" 
          height="16" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round">
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
        </svg>
      </Button>
    </div>
  </div>
);

// Composant pour les moyens de paiement
const PaymentMethodItem = ({ 
  icon: Icon, 
  name, 
  details 
}: { 
  icon: React.ElementType,
  name: string, 
  details?: string 
}) => (
  <div className="flex items-center justify-between mb-3">
    <div className="flex items-center">
      <Icon size={20} className="mr-3" />
      <div>
        <div className="font-medium">{name}</div>
        {details && <div className="text-sm text-gray-500">{details}</div>}
      </div>
    </div>
    <Button variant="link" className="text-purple-500 p-0">Modifier</Button>
  </div>
);

// Composant pour les évaluations
const RatingItem = ({ 
  name, 
  rating, 
  comment 
}: { 
  name: string, 
  rating: number, 
  comment: string 
}) => (
  <div className="mb-4">
    <div className="flex items-center justify-between">
      <span className="font-medium">{name}</span>
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <Star 
            key={i} 
            size={16} 
            fill={i < rating ? "#FFD700" : "none"} 
            color={i < rating ? "#FFD700" : "#D1D5DB"} 
          />
        ))}
      </div>
    </div>
    <p className="text-sm text-gray-600">{comment}</p>
  </div>
);

const Compte = () => {
  const isMobile = useIsMobile();
  
  return (
    <div className="px-4 md:px-6 lg:px-8 max-w-2xl mx-auto pb-20 md:pb-10">
      {/* Section Profil */}
      <div className="flex items-center py-6">
        <Avatar className="w-16 h-16 mr-4">
          <AvatarImage src="/lovable-uploads/1ed7d643-f0eb-4fe6-acbb-d2fbe106ac2d.png" alt="Sophie Dubois" />
          <AvatarFallback>SD</AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-xl font-bold">Sophie Dubois</h1>
          <p className="text-gray-500">Membre depuis 2022</p>
        </div>
      </div>

      {/* Section Informations Personnelles */}
      <AccountSection title="Informations Personnelles">
        <Card className="p-4">
          <PersonalInfoItem label="Nom Complet" value="Dramane Sow" />
          <PersonalInfoItem label="Email" value="sophie.dubois@gmail.com" />
          <PersonalInfoItem label="Téléphone" value="+33 6 12 34 56 78" />
        </Card>
      </AccountSection>

      {/* Section Vérification d'identité */}
      <AccountSection title="Vérification d'identité">
        <Card className="p-4">
          <VerificationItem label="Carte d'identité" isVerified={true} />
          <VerificationItem label="Compte Vérifier" isVerified={true} />
        </Card>
      </AccountSection>

      {/* Section Gérer mon abonnement */}
      <AccountSection title="Gérer mon abonnement">
        <AccountLink
          icon={() => <span className="text-purple-500">🚀</span>}
          title="Devenir Premium"
        />
      </AccountSection>

      {/* Section Gérer mes annonces */}
      <AccountSection title="Gérer mes annonces">
        <AccountLink
          icon={Plus}
          title="Créer une annonce"
          isCreateButton={true}
        />
        <AccountLink
          title="Voir mes annonces"
        />
      </AccountSection>

      {/* Section Historique des contacts propriétaire */}
      <AccountSection title="Historique des contacts Propriétaire">
        <Card className="p-4">
          <ContactHistoryItem
            propertyName="Villa Méditerranée"
            location="Basekou Sow"
            lastContact="15 mars 2024"
          />
          <ContactHistoryItem
            propertyName="Chalet Alpin"
            location="Dramane Sow"
            lastContact="20 février 2024"
          />
        </Card>
      </AccountSection>

      {/* Section Moyens de paiement */}
      <AccountSection title="Moyens de paiement">
        <Card className="p-4">
          <PaymentMethodItem
            icon={() => <span className="text-orange-500">🔶</span>}
            name="Orange Money"
          />
          <PaymentMethodItem
            icon={CreditCard}
            name="Visa"
            details="****4589"
          />
          <Button variant="link" className="text-purple-500 px-0 py-2 flex items-center">
            <Plus size={16} className="mr-2" />
            Ajouter un moyen de paiement
          </Button>
        </Card>
      </AccountSection>

      {/* Section Évaluations */}
      <AccountSection title="Évaluations" className="mb-10">
        <Card className="p-4">
          <div className="flex items-center mb-4">
            <Star size={18} fill="#FFD700" color="#FFD700" className="mr-1" />
            <span className="font-medium mr-1">4.8</span>
            <span className="text-gray-500">(12 avis)</span>
          </div>
          <Separator className="my-3" />
          <RatingItem
            name="Laurent Martin"
            rating={5}
            comment="Excellente locataire, très respectueuse des lieux."
          />
        </Card>
      </AccountSection>
      
      {/* Bouton Déconnexion */}
      <Button variant="destructive" className="w-full bg-green-500 hover:bg-green-600 mb-6">
        Se déconnecter
      </Button>
    </div>
  );
};

export default Compte;
