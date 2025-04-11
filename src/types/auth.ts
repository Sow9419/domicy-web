
export type UserRole = "tenant" | "owner";

export interface User {
  id: string;
  email: string;
  fullName?: string;
  phoneNumber?: string;
  address?: string;
  role?: UserRole;
  profileImage?: string;
  idDocument?: string;
  whatsappNumber?: string;
  slogan?: string;
  verified: boolean;
}

export interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  loginWithFacebook: () => Promise<void>;
  logout: () => void;
  forgotPassword: (email: string) => Promise<void>;
  verifyOTP: (otp: string) => Promise<boolean>;
  updateUserProfile: (data: Partial<User>) => Promise<void>;
}
