import React, { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import ForgotPasswordForm from "./ForgotPasswordForm";
type AuthFormType = "login" | "signup" | "forgotPassword";
interface AuthDialogProps {
  triggerText: string;
  initialForm?: AuthFormType;
  className?: string;
}
const AuthDialog: React.FC<AuthDialogProps> = ({
  triggerText,
  initialForm = "login",
  className
}) => {
  const [open, setOpen] = useState(false);
  const [currentForm, setCurrentForm] = useState<AuthFormType>(initialForm);
  const isMobile = useIsMobile();
  const handleFormChange = (formType: AuthFormType) => {
    setCurrentForm(formType);
  };
  const handleClose = () => {
    setOpen(false);
    // Reset to initial form after dialog is closed
    setTimeout(() => setCurrentForm(initialForm), 300);
  };
  const renderForm = () => {
    switch (currentForm) {
      case "login":
        return <LoginForm onForgotPassword={() => handleFormChange("forgotPassword")} onSignUp={() => handleFormChange("signup")} onClose={handleClose} />;
      case "signup":
        return <SignupForm onLogin={() => handleFormChange("login")} onClose={handleClose} />;
      case "forgotPassword":
        return <ForgotPasswordForm onBack={() => handleFormChange("login")} />;
      default:
        return null;
    }
  };

  // Mobile version uses Sheet component
  if (isMobile) {
    return <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button className={className}>{triggerText}</Button>
        </SheetTrigger>
        <SheetContent side="bottom" className="h-[90vh] rounded-t-xl">
          <div className="relative h-full">
            <button className="absolute top-2 right-2 p-2 text-gray-500" onClick={handleClose}>
              
            </button>
            <div className="h-full overflow-auto pb-16">
              {renderForm()}
            </div>
          </div>
        </SheetContent>
      </Sheet>;
  }

  // Desktop version uses Dialog component
  return <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className={className}>{triggerText}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md md:max-w-lg">
        <button className="absolute top-2 right-2 p-2 text-gray-500" onClick={handleClose}>
          <X size={20} />
        </button>
        {renderForm()}
      </DialogContent>
    </Dialog>;
};
export default AuthDialog;