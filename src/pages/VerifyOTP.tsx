
import React, { useState } from "react";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";

const VerifyOTP: React.FC = () => {
  const [otp, setOtp] = useState("");
  const [isResending, setIsResending] = useState(false);
  const { verifyOTP, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleVerify = async () => {
    if (otp.length === 5) {
      try {
        await verifyOTP(otp);
      } catch (error) {
        console.error("Erreur de vérification OTP:", error);
      }
    }
  };

  const handleResend = () => {
    setIsResending(true);
    // Simuler l'envoi d'un nouveau code
    setTimeout(() => {
      setIsResending(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-white p-4">
      <div className="max-w-md mx-auto">
        <Link to="/" className="flex items-center text-gray-600 mb-8">
          <ChevronLeft size={24} />
          <span>Retour</span>
        </Link>

        <h1 className="text-2xl font-bold text-center mb-6">Vérification OTP</h1>

        <div className="bg-white rounded-lg p-6">
          <p className="text-gray-600 text-center mb-8">
            Nous avons envoyé un code de vérification à votre adresse e-mail. Veuillez entrer le code ci-dessous pour confirmer votre identité.
          </p>

          <div className="mb-8">
            <InputOTP
              maxLength={5}
              value={otp}
              onChange={setOtp}
              render={({ slots }) => (
                <InputOTPGroup className="gap-2 justify-center">
                  {slots.map((slot, i) => (
                    <InputOTPSlot
                      key={i}
                      index={i}
                      {...slot}
                      className="rounded-md border-gray-300 w-12 h-12"
                    />
                  ))}
                </InputOTPGroup>
              )}
            />
          </div>

          <Button
            className="w-full bg-green-500 hover:bg-green-600 mb-6"
            onClick={handleVerify}
            disabled={otp.length !== 5 || isLoading}
          >
            {isLoading ? "Vérification..." : "Vérifier"}
          </Button>

          <div className="text-center">
            <p className="text-gray-600 mb-2">
              Vous n'avez pas reçu le code ?
            </p>
            <button
              className="text-green-500 hover:underline"
              onClick={handleResend}
              disabled={isResending}
            >
              {isResending ? "Envoi en cours..." : "Renvoyer"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyOTP;
