
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Edit } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  address?: string;
}

interface PersonalInfoSectionProps {
  personalInfo: PersonalInfo;
}

const PersonalInfoSection = ({ personalInfo }: PersonalInfoSectionProps) => {
  return (
    <Card className="mb-6">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-semibold">Informations Personnelles</CardTitle>
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
          <Edit size={16} />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-gray-500">Nom Complet</span>
            <span className="font-medium">{personalInfo.fullName}</span>
          </div>
          <Separator />
          <div className="flex justify-between items-center">
            <span className="text-gray-500">Email</span>
            <span className="font-medium">{personalInfo.email}</span>
          </div>
          <Separator />
          <div className="flex justify-between items-center">
            <span className="text-gray-500">Téléphone</span>
            <span className="font-medium">{personalInfo.phone}</span>
          </div>
          {personalInfo.address && (
            <>
              <Separator />
              <div className="flex justify-between items-center">
                <span className="text-gray-500">Adresse</span>
                <span className="font-medium">{personalInfo.address}</span>
              </div>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default PersonalInfoSection;
