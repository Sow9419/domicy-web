import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, CreditCard, Pencil, Banknote, Smartphone } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

interface PaymentMethod {
  id: string;
  type: 'card' | 'mobile' | 'bank';
  name: string;
  details?: string;
  icon: React.ElementType | string;
}

interface PaymentMethodsSectionProps {
  paymentMethods: PaymentMethod[];
}

const PaymentMethodsSection = ({ paymentMethods: initialMethods }: PaymentMethodsSectionProps) => {
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>(initialMethods);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [formData, setFormData] = useState<Omit<PaymentMethod, 'id' | 'icon'>>({
    type: 'card',
    name: '',
    details: '',
  });
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleTypeChange = (value: 'card' | 'mobile' | 'bank') => {
    setFormData(prev => ({
      ...prev,
      type: value
    }));
  };

  const getIconByType = (type: 'card' | 'mobile' | 'bank') => {
    if (type === 'card') return CreditCard;
    if (type === 'mobile') return Smartphone;
    return Banknote;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name) {
      toast({
        title: "Erreur",
        description: "Veuillez entrer un nom pour ce moyen de paiement.",
        variant: "destructive"
      });
      return;
    }

    const newPaymentMethod: PaymentMethod = {
      id: Date.now().toString(),
      ...formData,
      icon: formData.type === 'mobile' ? '📱' : getIconByType(formData.type)
    };

    setPaymentMethods(prev => [...prev, newPaymentMethod]);
    setDialogOpen(false);
    setFormData({
      type: 'card',
      name: '',
      details: '',
    });

    toast({
      title: "Moyen de paiement ajouté",
      description: "Votre nouveau moyen de paiement a été ajouté avec succès."
    });
  };

  return (
    <>
      <Card className="mb-6">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-semibold">Moyens de paiement</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {paymentMethods.map((method) => (
              <div key={method.id} className="flex items-center justify-between">
                <div className="flex items-center">
                  {typeof method.icon === 'string' ? (
                    <span className="mr-3 text-xl">{method.icon}</span>
                  ) : (
                    <method.icon size={20} className="mr-3" />
                  )}
                  <div>
                    <div className="font-medium">{method.name}</div>
                    {method.details && <div className="text-sm text-gray-500">{method.details}</div>}
                  </div>
                </div>
                <Button variant="ghost" size="sm" className="text-green-600 p-0 h-8">
                  <Pencil size={16} />
                </Button>
              </div>
            ))}
            
            <Button 
              variant="outline" 
              className="w-full mt-2 flex items-center justify-center gap-2 border-dashed"
              onClick={() => setDialogOpen(true)}
            >
              <Plus size={16} />
              Ajouter un moyen de paiement
            </Button>
          </div>
        </CardContent>
      </Card>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Ajouter un moyen de paiement</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label>Type de paiement</Label>
                <RadioGroup 
                  value={formData.type} 
                  onValueChange={(value) => handleTypeChange(value as 'card' | 'mobile' | 'bank')}
                  className="flex flex-col space-y-1"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="card" id="card" />
                    <Label htmlFor="card" className="flex items-center gap-2">
                      <CreditCard size={16} /> Carte bancaire
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="mobile" id="mobile" />
                    <Label htmlFor="mobile" className="flex items-center gap-2">
                      <Smartphone size={16} /> Mobile Money
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="bank" id="bank" />
                    <Label htmlFor="bank" className="flex items-center gap-2">
                      <Banknote size={16} /> Virement bancaire
                    </Label>
                  </div>
                </RadioGroup>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="name">Nom</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder={formData.type === 'card' ? "Visa, Mastercard, etc." : 
                              formData.type === 'mobile' ? "Orange Money, MTN Mobile Money, etc." : 
                              "BNP, Société Générale, etc."}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="details">
                  {formData.type === 'card' ? "Derniers chiffres" : 
                   formData.type === 'mobile' ? "Numéro" : 
                   "IBAN (optionnel)"}
                </Label>
                <Input
                  id="details"
                  name="details"
                  value={formData.details || ''}
                  onChange={handleChange}
                  placeholder={formData.type === 'card' ? "****1234" : ""}
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                Annuler
              </Button>
              <Button type="submit" className="bg-green-500 hover:bg-green-600">
                Ajouter
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PaymentMethodsSection;
