
import React, { useState } from "react";
import { ChevronLeft, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";

interface ForgotPasswordFormProps {
  onBack: () => void;
}

const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({ onBack }) => {
  const [email, setEmail] = useState("");
  const { forgotPassword, isLoading } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await forgotPassword(email);
    } catch (error) {
      console.error("Erreur lors de la réinitialisation du mot de passe:", error);
    }
  };

  return (
    <div className="w-full p-4 md:p-6">
      <button
        type="button"
        className="flex items-center text-gray-600 mb-4"
        onClick={onBack}
      >
        <ChevronLeft size={20} />
        <span>Retour</span>
      </button>
      
      <h2 className="text-2xl font-bold mb-6">Mot de passe oublié</h2>
      
      <p className="text-gray-600 mb-6">
        Ne vous inquiétez pas ! Il arrive à tout le monde d'oublier son mot de passe. 
        Veuillez entrer votre adresse e-mail ci-dessous et nous vous enverrons les 
        instructions pour réinitialiser votre mot de passe.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="relative">
          <Input
            type="email"
            placeholder="Adresse e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="pl-10 bg-gray-100"
          />
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
        </div>

        <Button 
          type="submit" 
          className="w-full bg-green-500 hover:bg-green-600" 
          disabled={isLoading}
        >
          {isLoading ? "Chargement..." : "Réinitialiser le mot de passe"}
        </Button>
      </form>
    </div>
  );
};

export default ForgotPasswordForm;
