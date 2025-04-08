
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Crown, ChevronRight } from 'lucide-react';

interface SubscriptionProps {
  isPremium: boolean;
}

const SubscriptionSection = ({ isPremium }: SubscriptionProps) => {
  return (
    <Card className="mb-6">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold">Gérer mon abonnement</CardTitle>
      </CardHeader>
      <CardContent>
        {isPremium ? (
          <div className="bg-gradient-to-r from-amber-400 to-amber-600 p-4 rounded-lg text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Crown size={24} className="mr-2" />
                <div>
                  <h3 className="font-bold">Abonnement Premium</h3>
                  <p className="text-sm">Expire le 12 Juillet 2024</p>
                </div>
              </div>
              <Button variant="outline" className="text-white border-white hover:bg-white/20">
                Gérer
              </Button>
            </div>
          </div>
        ) : (
          <Button 
            className="w-full flex items-center justify-between p-4 rounded-lg bg-amber-50 text-amber-700 hover:bg-amber-100 border border-amber-200"
          >
            <div className="flex items-center">
              <Crown size={18} className="mr-3 text-amber-500" />
              <span className="font-medium">Devenir Premium</span>
            </div>
            <ChevronRight size={16} />
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default SubscriptionSection;
