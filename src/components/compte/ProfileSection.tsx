
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Edit } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface ProfileSectionProps {
  name: string;
  memberSince: string;
  avatarUrl: string;
}

const ProfileSection = ({ name, memberSince, avatarUrl }: ProfileSectionProps) => {
  return (
    <Card className="mb-6 overflow-hidden">
      <div className="bg-gradient-to-r from-green-400 to-green-600 h-20" />
      <CardContent className="relative pt-12 pb-6">
        <Avatar className="w-20 h-20 border-4 border-white absolute -top-10 left-6 shadow-md">
          <AvatarImage src={avatarUrl} alt={name} />
          <AvatarFallback>{name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
        </Avatar>
        <div className="flex justify-between items-start mt-2">
          <div>
            <h1 className="text-xl font-bold">{name}</h1>
            <p className="text-gray-500">Membre depuis {memberSince}</p>
          </div>
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <Edit size={16} />
            Modifier
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileSection;
