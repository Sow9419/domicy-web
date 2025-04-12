
import React from "react";
import { Button } from "@/components/ui/button";
import AuthDialog from "@/components/auth/AuthDialog";
import { useAuth } from "@/contexts/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useIsMobile } from "@/hooks/use-mobile";
import { LogOut, Settings, User, UserPlus, UserRound, LogIn } from "lucide-react";

const AuthButtons: React.FC = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const isMobile = useIsMobile();

  const getInitials = (name: string) => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  if (isAuthenticated && user) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-10 w-10 rounded-full">
            <Avatar className="h-10 w-10 border border-gray-200">
              <AvatarImage src={user.profileImage || ''} alt={user.fullName || user.email} />
              <AvatarFallback className="bg-green-50 text-green-500">{user.fullName ? getInitials(user.fullName) : 'U'}</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">{user.fullName || 'Utilisateur'}</p>
              <p className="text-xs leading-none text-muted-foreground">
                {user.email}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <User className="mr-2 h-4 w-4" />
            <span>Mon profil</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Settings className="mr-2 h-4 w-4" />
            <span>Paramètres</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={logout}>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Se déconnecter</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
          <Avatar className="h-10 w-10 border border-gray-200">
            <AvatarFallback className="bg-gray-100 text-gray-500">
              <UserRound className="h-5 w-5" />
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <div className="flex flex-col">
          <DropdownMenuItem asChild>
            <AuthDialog 
              triggerText={(<div className="flex items-center"><LogIn className="mr-2 h-4 w-4 text-black" /> <span className="text-black">Se connecter</span></div>) as unknown as string}
              initialForm="login" 
              className="w-full justify-start text-sm bg-transparent hover:bg-transparent"
            />
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <AuthDialog 
              triggerText={(<div className="flex items-center"><UserPlus className="mr-2 h-4 w-4 text-black" /> <span className="text-black">S'inscrire</span></div>) as unknown as string}
              initialForm="signup" 
              className="w-full justify-start text-sm bg-transparent hover:bg-transparent"
            />
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AuthButtons;
