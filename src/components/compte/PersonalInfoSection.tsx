
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Edit, Save, X } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  address?: string;
}

interface PersonalInfoSectionProps {
  personalInfo: PersonalInfo;
}

const PersonalInfoSection = ({ personalInfo: initialInfo }: PersonalInfoSectionProps) => {
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>(initialInfo);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [formData, setFormData] = useState<PersonalInfo>(initialInfo);
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPersonalInfo(formData);
    setDialogOpen(false);
    toast({
      title: "Informations mises à jour",
      description: "Vos informations personnelles ont été modifiées avec succès."
    });
  };

  return (
    <>
      <Card className="mb-6">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-lg font-semibold">Informations Personnelles</CardTitle>
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-8 w-8 p-0"
            onClick={() => setDialogOpen(true)}
          >
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

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Modifier les informations personnelles</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="fullName">Nom Complet</Label>
                <Input
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="phone">Téléphone</Label>
                <Input
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="address">Adresse</Label>
                <Input
                  id="address"
                  name="address"
                  value={formData.address || ''}
                  onChange={handleChange}
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                Annuler
              </Button>
              <Button type="submit" className="bg-green-500 hover:bg-green-600">
                Enregistrer
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PersonalInfoSection;
