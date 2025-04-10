
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronDown, Filter, Eye, Edit, Trash, Check, RefreshCcw, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AnnonceCard from '@/components/annonces/AnnonceCard';
import { Badge } from '@/components/ui/badge';
import { useIsMobile } from '@/hooks/use-mobile';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// Données fictives pour les annonces
const mockAnnonces = [
  {
    id: '1',
    title: 'Appartement Lumineux - Paris 11ème',
    address: '25 Rue Saint-Maur',
    price: '1,200€',
    period: '/mois',
    publishedDate: '12 mars',
    views: '245',
    status: 'active',
    imageUrl: 'https://images.unsplash.com/photo-1582562124811-c09040d0a901',
  },
  {
    id: '2',
    title: 'Studio Moderne - Lyon 6ème',
    address: '8 Rue Garibaldi',
    price: '850€',
    period: '/mois',
    publishedDate: '10 mars',
    views: '178',
    status: 'pending',
    imageUrl: 'https://images.unsplash.com/photo-1472396961693-142e6e269027',
  },
];

const AnnonceView = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [sortOrder, setSortOrder] = useState<string>("recent");
  const [annonces, setAnnonces] = useState(mockAnnonces);
  
  // Statistiques
  const totalAnnonces = annonces.length;
  const totalViews = annonces.reduce((total, annonce) => total + parseInt(annonce.views.replace(/,/g, '')), 0);

  return (
    <div className="bg-white min-h-screen pb-20">
      {/* Header */}
      <div className="sticky top-0 bg-white border-b z-10">
        <div className="flex items-center p-4">
          <button
            onClick={() => navigate(-1)}
            className="mr-4"
          >
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-xl font-semibold flex-1 text-center">Annnonce</h1>
          <div className="w-6"></div> {/* Pour centrer le titre */}
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-6 max-w-7xl mx-auto">
        <div className={`${!isMobile ? 'grid grid-cols-12 gap-6' : ''}`}>
          {/* Sidebar for Desktop */}
          {!isMobile && (
            <div className="col-span-3 space-y-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-semibold">Filtres</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium mb-1 block">Statut</label>
                      <Select value={statusFilter} onValueChange={setStatusFilter}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Tous les statuts" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value="all">Tous les statuts</SelectItem>
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="pending">En attente</SelectItem>
                            <SelectItem value="rented">Louée</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1 block">Trier par</label>
                      <Select value={sortOrder} onValueChange={setSortOrder}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Plus récent" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value="recent">Plus récent</SelectItem>
                            <SelectItem value="oldest">Plus ancien</SelectItem>
                            <SelectItem value="views-high">Vues (décroissant)</SelectItem>
                            <SelectItem value="views-low">Vues (croissant)</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Stats Cards for Desktop */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-semibold">Statistiques</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <p className="text-gray-500 text-sm">Total Annonces</p>
                      <p className="text-3xl font-bold mt-1">{totalAnnonces}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-sm">Vues Totales</p>
                      <p className="text-3xl font-bold mt-1">{totalViews.toLocaleString()}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
          
          {/* Main Content */}
          <div className={`${!isMobile ? 'col-span-9' : ''}`}>
            {/* Mobile Stats Cards */}
            {isMobile && (
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-white p-4 rounded-lg shadow-sm border">
                  <p className="text-gray-500 text-sm">Total Annonces</p>
                  <p className="text-3xl font-bold mt-1">{totalAnnonces}</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm border">
                  <p className="text-gray-500 text-sm">Vues Totales</p>
                  <p className="text-3xl font-bold mt-1">{totalViews.toLocaleString()}</p>
                </div>
              </div>
            )}

            {/* Mobile Filters */}
            {isMobile && (
              <div className="flex gap-3 mb-6">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="flex-1">
                    <SelectValue placeholder="Tous les statuts" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="all">Tous les statuts</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="pending">En attente</SelectItem>
                      <SelectItem value="rented">Louée</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>

                <Select value={sortOrder} onValueChange={setSortOrder}>
                  <SelectTrigger className="flex-1">
                    <SelectValue placeholder="Plus récent" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="recent">Plus récent</SelectItem>
                      <SelectItem value="oldest">Plus ancien</SelectItem>
                      <SelectItem value="views-high">Vues (décroissant)</SelectItem>
                      <SelectItem value="views-low">Vues (croissant)</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* Desktop Header */}
            {!isMobile && (
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Mes Annonces</h2>
                <Link to="/creer-annonce">
                  <Button className="bg-yellow-500 hover:bg-yellow-600 text-white">
                    <Plus size={16} className="mr-2" /> Créer une annonce
                  </Button>
                </Link>
              </div>
            )}

            {/* Annonces List */}
            <div className={`${!isMobile ? 'grid grid-cols-2 gap-6' : 'space-y-6'}`}>
              {annonces.map((annonce) => (
                <AnnonceCard key={annonce.id} annonce={annonce} />
              ))}
            </div>
          </div>
        </div>
        
        {/* Floating Action Button - Mobile Only */}
        {isMobile && (
          <Link to="/creer-annonce">
            <Button
              className="fixed right-6 bottom-6 w-14 h-14 rounded-full shadow-lg bg-yellow-500 hover:bg-yellow-600 text-white"
            >
              <span className="text-2xl">+</span>
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default AnnonceView;
