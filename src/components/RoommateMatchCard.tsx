import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Briefcase, Star, MessageCircle, Moon, Sun, Cigarette, Dog } from 'lucide-react';
import { RoommateMatch } from '@/data/mockMatches';
import { useTranslation } from 'react-i18next';

interface RoommateMatchCardProps {
  roommate: RoommateMatch;
}

export const RoommateMatchCard = ({ roommate }: RoommateMatchCardProps) => {
  const { t } = useTranslation();

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative bg-gradient-to-br from-primary/10 to-secondary/10 p-4">
        <Badge className="absolute top-2 left-2 bg-primary text-primary-foreground flex items-center gap-1 text-xs">
          <Star className="h-3 w-3 fill-current" />
          {roommate.matchScore}%
        </Badge>
        
        <div className="flex flex-col items-center pt-4">
          <div className="w-20 h-20 rounded-full overflow-hidden bg-background mb-2 border-2 border-background shadow-lg">
            <img 
              src={roommate.avatar} 
              alt={roommate.firstName}
              className="w-full h-full object-cover"
            />
          </div>
          <h4 className="font-bold text-sm">
            {roommate.firstName}, {roommate.age}
          </h4>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Briefcase className="h-3 w-3" />
            <span>{roommate.job}</span>
          </div>
        </div>
      </div>
      
      <CardContent className="p-4 space-y-3">
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <MapPin className="h-3 w-3" />
          <span>{roommate.city}</span>
        </div>

        <p className="text-xs text-muted-foreground line-clamp-2">{roommate.bio}</p>

        <div className="bg-muted/50 rounded p-2 text-xs font-medium">
          {roommate.budgetMin}-{roommate.budgetMax} MAD
        </div>

        <div className="flex flex-wrap gap-1">
          {!roommate.smoking && (
            <Badge variant="secondary" className="text-xs flex items-center gap-1">
              <Cigarette className="h-3 w-3" />
              Non-smoker
            </Badge>
          )}
          {roommate.pets && (
            <Badge variant="secondary" className="text-xs flex items-center gap-1">
              <Dog className="h-3 w-3" />
              Pet-friendly
            </Badge>
          )}
          {roommate.nightOwl ? (
            <Badge variant="secondary" className="text-xs flex items-center gap-1">
              <Moon className="h-3 w-3" />
              Night owl
            </Badge>
          ) : (
            <Badge variant="secondary" className="text-xs flex items-center gap-1">
              <Sun className="h-3 w-3" />
              Early bird
            </Badge>
          )}
        </div>

        <Button size="sm" className="w-full">
          <MessageCircle className="h-3 w-3 mr-1" />
          {t('roommateMatches.message')}
        </Button>
      </CardContent>
    </Card>
  );
};
