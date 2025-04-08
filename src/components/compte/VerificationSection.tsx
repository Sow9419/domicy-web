
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Check, AlertCircle } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';

interface VerificationItem {
  label: string;
  isVerified: boolean;
}

interface VerificationSectionProps {
  verificationItems: VerificationItem[];
}

const VerificationSection = ({ verificationItems }: VerificationSectionProps) => {
  return (
    <Card className="mb-6">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold">Vérification d'identité</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {verificationItems.map((item, index) => (
            <React.Fragment key={index}>
              {index > 0 && <Separator />}
              <div className="flex justify-between items-center">
                <span>{item.label}</span>
                {item.isVerified ? (
                  <span className="flex items-center text-green-500">
                    <Check size={16} className="mr-1" />
                    Vérifié
                  </span>
                ) : (
                  <Button size="sm" className="bg-amber-500 hover:bg-amber-600 text-white flex items-center gap-1">
                    <AlertCircle size={14} />
                    Vérifier
                  </Button>
                )}
              </div>
            </React.Fragment>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default VerificationSection;
