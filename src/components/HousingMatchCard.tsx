import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Bed, Bath, Wifi, Car, Star, MessageCircle } from 'lucide-react';
import { HousingMatch } from '@/data/mockMatches';
import { useTranslation } from 'react-i18next';

interface HousingMatchCardProps {
  housing: HousingMatch;
}

export const HousingMatchCard = ({ housing }: HousingMatchCardProps) => {
  const { t } = useTranslation();

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative h-40 overflow-hidden">
        <img 
          src={housing.image} 
          alt={housing.title}
          className="w-full h-full object-cover"
        />
        <Badge className="absolute top-2 left-2 bg-primary text-primary-foreground flex items-center gap-1">
          <Star className="h-3 w-3 fill-current" />
          {housing.matchScore}%
        </Badge>
      </div>
      
      <CardContent className="p-4 space-y-3">
        <div>
          <h4 className="font-bold text-sm mb-1">{housing.title}</h4>
          <div className="flex items-center gap-1 text-xs text-muted-foreground mb-2">
            <MapPin className="h-3 w-3" />
            <span>{housing.city}</span>
          </div>
          <div className="text-lg font-bold text-primary">
            {housing.price} MAD<span className="text-xs font-normal text-muted-foreground">/month</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 text-xs">
          <div className="flex items-center gap-1">
            <Bed className="h-3 w-3 text-muted-foreground" />
            <span>{housing.bedrooms}</span>
          </div>
          <div className="flex items-center gap-1">
            <Bath className="h-3 w-3 text-muted-foreground" />
            <span>{housing.bathrooms}</span>
          </div>
          {housing.wifi && (
            <div className="flex items-center gap-1">
              <Wifi className="h-3 w-3 text-muted-foreground" />
            </div>
          )}
          {housing.parking && (
            <div className="flex items-center gap-1">
              <Car className="h-3 w-3 text-muted-foreground" />
            </div>
          )}
        </div>

        <Button size="sm" className="w-full">
          <MessageCircle className="h-3 w-3 mr-1" />
          {t('housingMatches.contactOwner')}
        </Button>
      </CardContent>
    </Card>
  );
};
