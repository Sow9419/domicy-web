
import React, { useState } from "react";
import { ChevronLeft, Plus, Camera, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

const CreateProfile: React.FC = () => {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [idDocument, setIdDocument] = useState<string | null>(null);
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [slogan, setSlogan] = useState("");
  const { updateUserProfile, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleIdDocumentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Dans un cas réel, vous enverriez ce fichier à votre API
      setIdDocument(file.name);
      toast.success("Document téléchargé avec succès");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateUserProfile({
        profileImage: profileImage || undefined,
        idDocument: idDocument || undefined,
        whatsappNumber,
        slogan
      });
      toast.success("Profil créé avec succès");
      navigate("/");
    } catch (error) {
      console.error("Erreur lors de la création du profil:", error);
      toast.error("Erreur lors de la création du profil");
    }
  };

  return (
    <div className="min-h-screen bg-white p-4">
      <div className="max-w-md mx-auto">
        <Link to="/profile-info" className="flex items-center text-gray-600 mb-8">
          <ChevronLeft size={24} />
          <span>Création de profil</span>
        </Link>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Section photo de profil */}
          <div className="flex flex-col items-center">
            <div className="relative mb-2">
              {profileImage ? (
                <div className="w-24 h-24 rounded-full overflow-hidden">
                  <img
                    src={profileImage}
                    alt="Photo de profil"
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="w-24 h-24 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center bg-gray-50">
                  <Camera size={32} className="text-gray-400" />
                </div>
              )}
              <label
                htmlFor="profileImage"
                className="absolute bottom-0 right-0 bg-green-500 rounded-full p-1 cursor-pointer"
              >
                <Plus size={16} className="text-white" />
                <input
                  type="file"
                  id="profileImage"
                  accept="image/*"
                  className="hidden"
                  onChange={handleProfileImageChange}
                />
              </label>
            </div>
            <p className="text-sm text-gray-600">Ajouter une photo</p>
          </div>

          {/* Section pièce d'identité */}
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 bg-gray-50">
            <div className="flex flex-col items-center mb-4">
              <div className="bg-gray-200 p-3 rounded-full mb-2">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="3" y="5" width="18" height="14" rx="2" stroke="#667085" strokeWidth="2"/>
                  <path d="M3 10H21" stroke="#667085" strokeWidth="2"/>
                  <path d="M8 15H16" stroke="#667085" strokeWidth="2"/>
                </svg>
              </div>
              <h3 className="font-medium">Pièce d'identité</h3>
              <p className="text-sm text-gray-600 text-center mt-1">
                Veuillez scanner ou télécharger votre pièce d'identité
              </p>
            </div>
            <label htmlFor="idDocument">
              <Button
                type="button"
                variant="outline"
                className="w-full flex items-center justify-center gap-2 border-green-500 text-green-500"
              >
                <Upload size={16} />
                Scanner / Télécharger
              </Button>
              <input
                type="file"
                id="idDocument"
                accept="image/*,.pdf"
                className="hidden"
                onChange={handleIdDocumentChange}
              />
            </label>
            {idDocument && (
              <p className="text-sm text-green-600 mt-2 text-center">
                Document téléchargé: {idDocument}
              </p>
            )}
          </div>

          {/* Numéro WhatsApp */}
          <div>
            <label htmlFor="whatsappNumber" className="block text-gray-700 mb-2">
              Numéro WhatsApp
            </label>
            <div className="flex">
              <div className="bg-gray-100 border border-r-0 border-gray-300 rounded-l-md px-3 flex items-center">
                <span>+223</span>
              </div>
              <Input
                id="whatsappNumber"
                type="tel"
                placeholder="Numéro WhatsApp"
                value={whatsappNumber}
                onChange={(e) => setWhatsappNumber(e.target.value)}
                required
                className="rounded-l-none"
              />
            </div>
            <p className="text-gray-500 text-xs mt-1">Example: 94 23 19 14</p>
          </div>

          {/* Slogan */}
          <div>
            <label htmlFor="slogan" className="block text-gray-700 mb-2">
              Slogan Pour attirer les clients
            </label>
            <Input
              id="slogan"
              placeholder="Ex: Superhôte · Répond en moins d'une heure..."
              value={slogan}
              onChange={(e) => setSlogan(e.target.value)}
              required
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600"
            disabled={isLoading}
          >
            {isLoading ? "Traitement..." : "Finaliser l'inscription"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CreateProfile;
