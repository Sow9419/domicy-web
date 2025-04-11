
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Layout from "./components/layout/Layout";
import Index from "./pages/Index";
import Explorer from "./pages/Explorer";
import Favoris from "./pages/Favoris";
import Compte from "./pages/Compte";
import PropertyDetails from "./pages/PropertyDetails";
import AnnonceView from "./pages/AnnonceView";
import CreateAnnonce from "./pages/CreateAnnonce";
import CreateService from "./pages/CreateService";
import DetailService from "./pages/DetailService";
import NotFound from "./pages/NotFound";
import VerifyOTP from "./pages/VerifyOTP";
import ProfileInfo from "./pages/ProfileInfo";
import CreateProfile from "./pages/CreateProfile";
import ForgotPassword from "./pages/ForgotPassword";

// Create a client
const queryClient = new QueryClient();

const App: React.FC = () => (
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AuthProvider>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Index />} />
                <Route path="/explorer" element={<Explorer />} />
                <Route path="/favoris" element={<Favoris />} />
                <Route path="/compte" element={<Compte />} />
                <Route path="/propriete/:id" element={<PropertyDetails />} />
                <Route path="/annonce" element={<AnnonceView />} />
                <Route path="/creer-annonce" element={<CreateAnnonce />} />
                <Route path="/creer-service" element={<CreateService />} />
                <Route path="/service/:id" element={<DetailService />} />
              </Route>
              <Route path="/verify-otp" element={<VerifyOTP />} />
              <Route path="/profile-info" element={<ProfileInfo />} />
              <Route path="/create-profile" element={<CreateProfile />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </React.StrictMode>
);

export default App;
