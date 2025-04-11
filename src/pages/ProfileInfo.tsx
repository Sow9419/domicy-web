
import React, { useState } from "react";
import { ChevronLeft, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { UserRole } from "@/types/auth";

const ProfileInfo: React.FC = () => {
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const { updateUserProfile, isLoading } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRole) return;

    try {
      await updateUserProfile({
        fullName,
        phoneNumber,
        address,
        role: selectedRole
      });
    } catch (error) {
      console.error("Erreur lors de la mise à jour du profil:", error);
    }
  };

  return (
    <div className="min-h-screen bg-white p-4">
      <div className="max-w-md mx-auto">
        <Link to="/" className="flex items-center text-gray-600 mb-8">
          <ChevronLeft size={24} />
          <span>Information général</span>
        </Link>

        <h1 className="text-3xl font-bold text-center mb-4">Finaliser votre inscription</h1>

        <form onSubmit={handleSubmit} className="space-y-6 mt-8">
          <div>
            <label htmlFor="fullName" className="block text-gray-700 mb-2">
              Nom complet
            </label>
            <Input
              id="fullName"
              type="text"
              placeholder="Entrez votre nom complet"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="phoneNumber" className="block text-gray-700 mb-2">
              Numéro de téléphone
            </label>
            <Input
              id="phoneNumber"
              type="tel"
              placeholder="+33 6 12 34 56 78"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="address" className="block text-gray-700 mb-2">
              Adresse complète
            </label>
            <div className="relative">
              <Input
                id="address"
                type="text"
                placeholder="Sélectionnez votre adresse"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
                className="pr-10"
              />
              <MapPin
                size={20}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 mb-2">
              Votre rôle
            </label>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                className={`border rounded-lg p-4 flex flex-col items-center justify-center ${
                  selectedRole === "tenant"
                    ? "border-green-500 bg-green-50"
                    : "border-gray-300"
                }`}
                onClick={() => setSelectedRole("tenant")}
              >
                <span className="text-green-500 text-3xl mb-2">🏠</span>
                <span className={selectedRole === "tenant" ? "text-green-500" : ""}>
                  Locataire
                </span>
              </button>
              <button
                type="button"
                className={`border rounded-lg p-4 flex flex-col items-center justify-center ${
                  selectedRole === "owner"
                    ? "border-green-500 bg-green-50"
                    : "border-gray-300"
                }`}
                onClick={() => setSelectedRole("owner")}
              >
                <span className="text-green-500 text-3xl mb-2">🏢</span>
                <span className={selectedRole === "owner" ? "text-green-500" : ""}>
                  Propriétaire
                </span>
              </button>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600"
            disabled={!selectedRole || isLoading}
          >
            {isLoading ? "Traitement..." : "Continuer"}
          </Button>

          <p className="text-xs text-gray-500 text-center">
            En finalisant votre inscription, vous acceptez nos{" "}
            <Link to="/terms" className="text-purple-600 hover:underline">
              conditions d'utilisation
            </Link>{" "}
            et notre{" "}
            <Link to="/privacy" className="text-purple-600 hover:underline">
              politique de confidentialité
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default ProfileInfo;
