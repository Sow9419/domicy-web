
import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";

interface SignupFormProps {
  onLogin: () => void;
  onClose?: () => void;
}

const SignupForm: React.FC<SignupFormProps> = ({ onLogin, onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const { signUp, loginWithGoogle, loginWithFacebook, isLoading } = useAuth();

  const validatePassword = () => {
    if (password !== confirmPassword) {
      setPasswordError("Les mots de passe ne correspondent pas");
      return false;
    }
    if (password.length < 6) {
      setPasswordError("Le mot de passe doit contenir au moins 6 caractères");
      return false;
    }
    setPasswordError("");
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validatePassword()) return;
    
    try {
      await signUp(email, password);
      if (onClose) onClose();
    } catch (error) {
      console.error("Erreur d'inscription:", error);
    }
  };

  const handleGoogleSignup = async () => {
    try {
      await loginWithGoogle();
      if (onClose) onClose();
    } catch (error) {
      console.error("Erreur d'inscription avec Google:", error);
    }
  };

  const handleFacebookSignup = async () => {
    try {
      await loginWithFacebook();
      if (onClose) onClose();
    } catch (error) {
      console.error("Erreur d'inscription avec Facebook:", error);
    }
  };

  return (
    <div className="w-full p-4 md:p-6">
      <div className="flex flex-col items-center mb-6">
        <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white text-xl font-bold mb-4">
          dy
        </div>
        <h2 className="text-2xl font-bold mb-2">Créer un compte</h2>
        <p className="text-gray-600 text-center">
          Veuillez remplir les informations suivantes pour créer votre compte.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Input
            type="email"
            placeholder="Email ou nom d'utilisateur"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="bg-gray-100"
          />
        </div>
        
        <div className="relative">
          <Input
            type={showPassword ? "text" : "password"}
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="bg-gray-100"
          />
          <button
            type="button"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        <div className="relative">
          <Input
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirmer le mot de passe"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="bg-gray-100"
          />
          <button
            type="button"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        {passwordError && (
          <p className="text-red-500 text-sm">{passwordError}</p>
        )}

        <Button 
          type="submit" 
          className="w-full bg-green-500 hover:bg-green-600" 
          disabled={isLoading}
        >
          {isLoading ? "Chargement..." : "Continuer"}
        </Button>
      </form>

      <div className="my-6 flex items-center justify-center">
        <div className="flex-1 h-px bg-gray-300"></div>
        <p className="mx-4 text-sm text-gray-500">Ou via les réseaux sociaux</p>
        <div className="flex-1 h-px bg-gray-300"></div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <Button 
          type="button" 
          variant="outline" 
          className="flex items-center justify-center gap-2"
          onClick={handleGoogleSignup}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM16.64 14.42C16.13 15.59 15.22 16.5 14.05 17.01C13.36 17.31 12.69 17.46 12 17.46C11.31 17.46 10.64 17.31 9.95 17.01C8.78 16.5 7.87 15.59 7.36 14.42C7.07 13.73 6.93 13.06 6.93 12.38C6.93 11.69 7.07 11.01 7.36 10.32C7.87 9.15 8.78 8.24 9.95 7.73C10.64 7.44 11.31 7.29 12 7.29C12.69 7.29 13.36 7.44 14.05 7.73C15.22 8.24 16.13 9.15 16.64 10.32C16.93 11.01 17.07 11.69 17.07 12.38C17.07 13.06 16.93 13.73 16.64 14.42Z" fill="#EA4335"/>
          </svg>
          Google
        </Button>
        <Button 
          type="button" 
          variant="outline" 
          className="flex items-center justify-center gap-2"
          onClick={handleFacebookSignup}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM16.5 8.5H14.5C13.95 8.5 13.5 8.95 13.5 9.5V11.5H16.5V13.5H13.5V17.5H11.5V13.5H8.5V11.5H11.5V9.5C11.5 7.84 12.84 6.5 14.5 6.5H16.5V8.5Z" fill="#1877F2"/>
          </svg>
          Facebook
        </Button>
      </div>

      <div className="text-center mt-6">
        <p className="text-gray-600">
          Déjà un compte ?{" "}
          <button 
            type="button" 
            className="text-green-500 hover:underline"
            onClick={onLogin}
          >
            Se connecter
          </button>
        </p>
      </div>
    </div>
  );
};

export default SignupForm;
