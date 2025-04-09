
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { CheckCircle2 } from 'lucide-react';

interface UserProps {
  id: string;
  name: string;
  rating: number;
  reviewsCount: number;
  avatar: string;
  title?: string;
  responseTime?: string;
}

interface ServiceProviderProfileProps {
  user: UserProps;
  bio: string;
}

const ServiceProviderProfile: React.FC<ServiceProviderProfileProps> = ({ user, bio }) => {
  return (
    <div className="bg-white p-5 mt-4 rounded-lg shadow-sm">
      <div className="flex items-center space-x-4">
        <Avatar className="h-16 w-16 border-2 border-primary">
          <AvatarImage src={user.avatar} alt={user.name} />
          <AvatarFallback>{user.name.substring(0, 2)}</AvatarFallback>
        </Avatar>
        
        <div>
          <div className="flex items-center space-x-2">
            <h2 className="text-xl font-semibold">{user.name}</h2>
            {user.title && (
              <span className="inline-flex items-center text-primary">
                <CheckCircle2 className="h-4 w-4 mr-1" />
                <span className="text-sm">{user.title}</span>
              </span>
            )}
          </div>
          
          {user.responseTime && (
            <p className="text-gray-600 text-sm">
              Répond en {user.responseTime}
            </p>
          )}
          
          <div className="flex items-center mt-1">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(user.rating) ? 'text-yellow-400' : 'text-gray-300'
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="ml-1 text-sm text-gray-600">
              {user.rating} ({user.reviewsCount} avis)
            </span>
          </div>
        </div>
      </div>
      
      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-3">Bio</h3>
        <p className="text-gray-700 leading-relaxed">{bio}</p>
      </div>
    </div>
  );
};

export default ServiceProviderProfile;
