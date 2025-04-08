
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Star, ChevronRight } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface Rating {
  id: string;
  name: string;
  rating: number;
  comment: string;
  date: string;
}

interface RatingsSectionProps {
  ratings: Rating[];
  averageRating: number;
  totalRatings: number;
}

const RatingsSection = ({ ratings, averageRating, totalRatings }: RatingsSectionProps) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  // Show only the first rating and add a button to see more
  const firstRating = ratings[0];

  return (
    <>
      <Card className="mb-10">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-semibold">Évaluations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center mb-4">
            <Star size={18} fill="#FFD700" color="#FFD700" className="mr-1" />
            <span className="font-medium mr-1">{averageRating.toFixed(1)}</span>
            <span className="text-gray-500">({totalRatings} avis)</span>
          </div>
          
          {ratings.length === 0 ? (
            <div className="text-gray-500 text-center py-4">
              Aucune évaluation pour le moment
            </div>
          ) : (
            <>
              <Separator className="my-3" />
              <div className="mb-4">
                <div className="flex items-center justify-between">
                  <span className="font-medium">{firstRating.name}</span>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        size={16} 
                        fill={i < firstRating.rating ? "#FFD700" : "none"} 
                        color={i < firstRating.rating ? "#FFD700" : "#D1D5DB"} 
                      />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-gray-600">{firstRating.comment}</p>
                <p className="text-xs text-gray-400 mt-1">{firstRating.date}</p>
              </div>
              
              {ratings.length > 1 && (
                <Button 
                  variant="outline" 
                  className="w-full flex items-center justify-center gap-2"
                  onClick={() => setDialogOpen(true)}
                >
                  Voir tous les avis ({totalRatings})
                  <ChevronRight size={16} />
                </Button>
              )}
            </>
          )}
        </CardContent>
      </Card>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-[550px] max-h-[80vh] overflow-auto">
          <DialogHeader>
            <DialogTitle>Tous les avis ({totalRatings})</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            {ratings.map((rating) => (
              <div key={rating.id} className="pb-4 border-b border-gray-200 last:border-b-0">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold">{rating.name}</span>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        size={16} 
                        fill={i < rating.rating ? "#FFD700" : "none"} 
                        color={i < rating.rating ? "#FFD700" : "#D1D5DB"} 
                      />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-gray-600">{rating.comment}</p>
                <p className="text-xs text-gray-400 mt-1">{rating.date}</p>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default RatingsSection;
