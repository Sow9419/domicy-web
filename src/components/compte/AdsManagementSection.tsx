
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Plus, ChevronRight, Home, PenSquare } from 'lucide-react';

interface AdsManagementSectionProps {
  adsCount: number;
}

const AdsManagementSection = ({ adsCount }: AdsManagementSectionProps) => {
  return (
    <Card className="mb-6">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold">Gérer mes annonces</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <Link 
          to="/creer-annonce"
          className="w-full flex items-center justify-between p-4 rounded-lg border border-green-500 text-green-600 hover:bg-green-50 transition-colors"
        >
          <div className="flex items-center">
            <div className="mr-3 w-6 h-6 flex items-center justify-center text-green-500">
              <Plus size={18} />
            </div>
            <span className="font-medium">Créer une annonce</span>
          </div>
          <ChevronRight size={16} className="text-green-400" />
        </Link>
        
        <Link 
          to="/creer-service"
          className="w-full flex items-center justify-between p-4 rounded-lg border border-blue-500 text-blue-600 hover:bg-blue-50 transition-colors"
        >
          <div className="flex items-center">
            <div className="mr-3 w-6 h-6 flex items-center justify-center text-blue-500">
              <PenSquare size={18} />
            </div>
            <span className="font-medium">Créer une publicité</span>
          </div>
          <ChevronRight size={16} className="text-blue-400" />
        </Link>
        
        <Link 
          to="/annonce"
          className="w-full flex items-center justify-between p-4 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-center">
            <div className="mr-3 w-6 h-6 flex items-center justify-center text-gray-600">
              <Home size={16} />
            </div>
            <div className="text-left">
              <span>Voir mes annonces</span>
              {adsCount > 0 && (
                <span className="ml-2 px-2 py-0.5 text-xs bg-gray-200 rounded-full">{adsCount}</span>
              )}
            </div>
          </div>
          <ChevronRight size={16} className="text-gray-400" />
        </Link>
      </CardContent>
    </Card>
  );
};

export default AdsManagementSection;
