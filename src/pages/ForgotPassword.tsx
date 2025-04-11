
import React, { useState } from "react";
import { ChevronLeft, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const ForgotPassword: React.FC = () => {
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
    <div className="min-h-screen bg-white p-4">
      <div className="max-w-md mx-auto">
        <Link to="/" className="flex items-center text-gray-600 mb-8">
          <ChevronLeft size={24} />
          <span>Mot de passe oublié</span>
        </Link>

        <div className="bg-white rounded-lg">
          <h1 className="text-2xl font-bold mb-6">Mot de passe oublié</h1>
          
          <p className="text-gray-600 mb-8">
            Ne vous inquiétez pas ! Il arrive à tout le monde d'oublier son mot de passe. 
            Veuillez entrer votre adresse e-mail ci-dessous et nous vous enverrons les 
            instructions pour réinitialiser votre mot de passe.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-gray-700 mb-2">
                Adresse e-mail
              </label>
              <div className="relative">
                <Input
                  id="email"
                  type="email"
                  placeholder="exemple@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="pl-10"
                />
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full bg-green-500 hover:bg-green-600" 
              disabled={isLoading}
            >
              {isLoading ? "Envoi en cours..." : "Réinitialiser le mot de passe"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
