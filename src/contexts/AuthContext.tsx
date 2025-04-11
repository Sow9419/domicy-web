
import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { User, AuthContextType, UserRole } from "@/types/auth";
import { toast } from "sonner";

// Créer le contexte
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider du contexte
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const navigate = useNavigate();

  // Simuler la vérification d'authentification au chargement
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  // Fonction de connexion
  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      // Simuler une API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Pour la démo, on considère toute tentative de connexion comme réussie
      const newUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        email,
        verified: true
      };
      
      setUser(newUser);
      setIsAuthenticated(true);
      localStorage.setItem('user', JSON.stringify(newUser));
      toast.success("Connexion réussie !");
    } catch (error) {
      toast.error("Échec de la connexion. Veuillez réessayer.");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Fonction d'inscription
  const signUp = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      // Simuler une API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        email,
        verified: false
      };
      
      setUser(newUser);
      setIsAuthenticated(true);
      localStorage.setItem('user', JSON.stringify(newUser));
      navigate("/verify-otp");
    } catch (error) {
      toast.error("Échec de l'inscription. Veuillez réessayer.");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Connexion avec Google
  const loginWithGoogle = async () => {
    try {
      setIsLoading(true);
      // Simuler une API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        email: "user@gmail.com",
        verified: true
      };
      
      setUser(newUser);
      setIsAuthenticated(true);
      localStorage.setItem('user', JSON.stringify(newUser));
      toast.success("Connexion avec Google réussie !");
      navigate("/profile-info");
    } catch (error) {
      toast.error("Échec de la connexion avec Google. Veuillez réessayer.");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Connexion avec Facebook
  const loginWithFacebook = async () => {
    try {
      setIsLoading(true);
      // Simuler une API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        email: "user@facebook.com",
        verified: true
      };
      
      setUser(newUser);
      setIsAuthenticated(true);
      localStorage.setItem('user', JSON.stringify(newUser));
      toast.success("Connexion avec Facebook réussie !");
      navigate("/profile-info");
    } catch (error) {
      toast.error("Échec de la connexion avec Facebook. Veuillez réessayer.");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Déconnexion
  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
    toast.success("Déconnexion réussie !");
    navigate("/");
  };

  // Mot de passe oublié
  const forgotPassword = async (email: string) => {
    try {
      setIsLoading(true);
      // Simuler une API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success(`Instructions envoyées à ${email}`);
      navigate("/verify-otp");
    } catch (error) {
      toast.error("Erreur lors de l'envoi des instructions.");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Vérification OTP
  const verifyOTP = async (otp: string) => {
    try {
      setIsLoading(true);
      // Simuler une API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (user) {
        const updatedUser = { ...user, verified: true };
        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
      }
      
      toast.success("Vérification réussie !");
      navigate("/profile-info");
      return true;
    } catch (error) {
      toast.error("Code de vérification incorrect. Veuillez réessayer.");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Mise à jour du profil utilisateur
  const updateUserProfile = async (data: Partial<User>) => {
    try {
      setIsLoading(true);
      // Simuler une API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (user) {
        const updatedUser = { ...user, ...data };
        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
        
        // Si l'utilisateur est un locataire, on le redirige vers la page d'accueil
        // Si l'utilisateur est un propriétaire, on le redirige vers la page de création de profil
        if (data.role === "tenant") {
          toast.success("Inscription finalisée !");
          navigate("/");
        } else if (data.role === "owner") {
          navigate("/create-profile");
        }
      }
    } catch (error) {
      toast.error("Erreur lors de la mise à jour du profil.");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated,
        login,
        signUp,
        loginWithGoogle,
        loginWithFacebook,
        logout,
        forgotPassword,
        verifyOTP,
        updateUserProfile
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Hook personnalisé pour utiliser le contexte d'authentification
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth doit être utilisé à l'intérieur d'un AuthProvider");
  }
  return context;
};
