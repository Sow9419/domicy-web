
import React from 'react';
import { 
  User, 
  Home, 
  Heart, 
  Bell, 
  CreditCard, 
  ShieldCheck, 
  LogOut,
  ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const AccountSection = ({ title, children }: { title: string, children: React.ReactNode }) => (
  <div className="mb-8">
    <h2 className="text-lg font-semibold mb-4">{title}</h2>
    {children}
  </div>
);

const AccountItem = ({ 
  icon: Icon, 
  title, 
  description, 
  onClick 
}: { 
  icon: React.ElementType, 
  title: string, 
  description: string, 
  onClick?: () => void 
}) => (
  <button 
    onClick={onClick}
    className="w-full flex items-center justify-between p-4 rounded-lg border border-gray-200 mb-3 hover:bg-gray-50 transition-colors"
  >
    <div className="flex items-center">
      <div className="mr-4 w-10 h-10 flex items-center justify-center bg-gray-100 rounded-full">
        <Icon size={20} className="text-gray-600" />
      </div>
      <div className="text-left">
        <h3 className="font-medium">{title}</h3>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
    </div>
    <ChevronRight size={20} className="text-gray-400" />
  </button>
);

const SubscriptionCard = ({ 
  title, 
  price, 
  currency,
  period,
  features,
  buttonText,
  recommended = false
}: { 
  title: string, 
  price: number, 
  currency: string,
  period: string,
  features: string[],
  buttonText: string,
  recommended?: boolean
}) => (
  <div className={`relative border rounded-xl p-6 ${recommended ? 'border-primary shadow-md' : 'border-gray-200'}`}>
    {recommended && (
      <div className="absolute top-0 right-0 bg-primary text-white text-xs font-medium px-3 py-1 rounded-bl-lg rounded-tr-lg">
        Recommandé
      </div>
    )}
    <h3 className="text-xl font-bold mb-2">{title}</h3>
    <div className="mb-4">
      <span className="text-2xl font-bold">{price.toLocaleString()} {currency}</span>
      <span className="text-gray-600">/{period}</span>
    </div>
    <ul className="mb-6 space-y-2">
      {features.map((feature, index) => (
        <li key={index} className="flex items-start">
          <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <span className="text-sm">{feature}</span>
        </li>
      ))}
    </ul>
    <Button className={`w-full ${recommended ? 'bg-primary hover:bg-primary-hover' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}>
      {buttonText}
    </Button>
  </div>
);

const Compte = () => {
  return (
    <div className="px-4 md:px-6 lg:px-8 max-w-7xl mx-auto pb-20 md:pb-10">
      <h1 className="text-2xl font-bold my-6">Mon Compte</h1>
      
      <div className="flex items-center p-6 bg-gray-50 rounded-xl mb-8">
        <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center mr-4">
          <User size={32} className="text-gray-600" />
        </div>
        <div>
          <h2 className="text-xl font-semibold">Amadou Diallo</h2>
          <p className="text-gray-600">amadou.diallo@example.com</p>
        </div>
      </div>
      
      <AccountSection title="Abonnement">
        <div className="mb-4 p-4 rounded-lg bg-yellow-50 border border-yellow-200">
          <p className="text-yellow-800">
            Vous n'avez pas d'abonnement actif. Choisissez un plan pour accéder à toutes les fonctionnalités.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <SubscriptionCard 
            title="Plan Mensuel"
            price={5000}
            currency="FCFA"
            period="mois"
            features={[
              "Accès illimité aux annonces",
              "Filtres de recherche avancés",
              "Notifications personnalisées",
              "Contact direct avec les propriétaires"
            ]}
            buttonText="S'abonner"
          />
          
          <SubscriptionCard 
            title="Plan Annuel"
            price={50000}
            currency="FCFA"
            period="an"
            features={[
              "Accès illimité aux annonces",
              "Filtres de recherche avancés",
              "Notifications personnalisées",
              "Contact direct avec les propriétaires",
              "Économisez 10000 FCFA (2 mois gratuits)"
            ]}
            buttonText="S'abonner"
            recommended={true}
          />
        </div>
      </AccountSection>
      
      <AccountSection title="Paramètres du compte">
        <AccountItem 
          icon={User}
          title="Informations personnelles"
          description="Gérez vos informations personnelles"
        />
        <AccountItem 
          icon={Home}
          title="Mes annonces"
          description="Gérez vos annonces publiées"
        />
        <AccountItem 
          icon={Heart}
          title="Mes favoris"
          description="Accédez à vos annonces favorites"
        />
        <AccountItem 
          icon={Bell}
          title="Notifications"
          description="Gérez vos préférences de notifications"
        />
        <AccountItem 
          icon={CreditCard}
          title="Paiements"
          description="Gérez vos méthodes de paiement"
        />
        <AccountItem 
          icon={ShieldCheck}
          title="Sécurité"
          description="Modifiez votre mot de passe et la sécurité du compte"
        />
      </AccountSection>
      
      <div className="mt-8">
        <Button variant="outline" className="flex items-center text-red-600 border-red-200 hover:bg-red-50">
          <LogOut size={18} className="mr-2" />
          Déconnexion
        </Button>
      </div>
    </div>
  );
};

export default Compte;
