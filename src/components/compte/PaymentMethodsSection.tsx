
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, CreditCard, Pencil } from 'lucide-react';

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

const PaymentMethodsSection = ({ paymentMethods }: PaymentMethodsSectionProps) => {
  return (
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
          
          <Button variant="outline" className="w-full mt-2 flex items-center justify-center gap-2 border-dashed">
            <Plus size={16} />
            Ajouter un moyen de paiement
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PaymentMethodsSection;
