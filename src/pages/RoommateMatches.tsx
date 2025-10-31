import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { User, MapPin, Briefcase, Heart, MessageCircle, Star, Moon, Sun, Home as HomeIcon, Cigarette, Dog } from 'lucide-react';

const mockRoommateMatches = [
  {
    id: '1',
    firstName: 'Ahmed',
    age: 27,
    job: 'Software Engineer',
    city: 'Casablanca',
    budgetMin: 400,
    budgetMax: 600,
    matchScore: 92,
    bio: 'Clean, organized, and respectful. Love coding and gaming.',
    smoking: false,
    pets: false,
    nightOwl: true,
    clean: true,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ahmed',
  },
  {
    id: '2',
    firstName: 'Sara',
    age: 24,
    job: 'Teacher',
    city: 'Casablanca',
    budgetMin: 350,
    budgetMax: 550,
    matchScore: 87,
    bio: 'Love reading and yoga. Looking for a peaceful living environment.',
    smoking: false,
    pets: true,
    nightOwl: false,
    clean: true,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sara',
  },
  {
    id: '3',
    firstName: 'Youssef',
    age: 29,
    job: 'Marketing Manager',
    city: 'Casablanca',
    budgetMin: 500,
    budgetMax: 700,
    matchScore: 85,
    bio: 'Working professional, enjoy sports and traveling on weekends.',
    smoking: false,
    pets: false,
    nightOwl: false,
    clean: true,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Youssef',
  },
  {
    id: '4',
    firstName: 'Fatima',
    age: 26,
    job: 'Graphic Designer',
    city: 'Casablanca',
    budgetMin: 400,
    budgetMax: 650,
    matchScore: 90,
    bio: 'Creative and friendly. Love art, music, and cooking new recipes.',
    smoking: false,
    pets: true,
    nightOwl: true,
    clean: true,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Fatima',
  },
];

const RoommateMatches = () => {
  const { t } = useTranslation();
  const [matches] = useState(mockRoommateMatches);
  const [savedRoommates, setSavedRoommates] = useState<string[]>([]);

  const toggleSave = (id: string) => {
    setSavedRoommates(prev => 
      prev.includes(id) ? prev.filter(rId => rId !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-muted/20 py-8">
      <div className="container px-4 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-2 mb-4">
            <User className="h-8 w-8 text-primary" />
            <h1 className="text-4xl font-bold">
              {t('roommateMatches.title', { count: matches.length })}
            </h1>
          </div>
          <p className="text-muted-foreground text-lg">{t('roommateMatches.subtitle')}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {matches.map((roommate, index) => (
            <motion.div
              key={roommate.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="card-elevated overflow-hidden hover:shadow-xl transition-shadow">
                <div className="relative bg-gradient-to-br from-primary/10 to-secondary/10 p-8">
                  <button
                    onClick={() => toggleSave(roommate.id)}
                    className="absolute top-4 right-4 p-2 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background transition-colors"
                  >
                    <Heart 
                      className={`h-5 w-5 ${savedRoommates.includes(roommate.id) ? 'fill-primary text-primary' : 'text-muted-foreground'}`}
                    />
                  </button>
                  <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground flex items-center gap-1">
                    <Star className="h-3 w-3 fill-current" />
                    {roommate.matchScore}% Match
                  </Badge>
                  
                  <div className="flex flex-col items-center">
                    <div className="w-32 h-32 rounded-full overflow-hidden bg-background mb-4 border-4 border-background shadow-lg">
                      <img 
                        src={roommate.avatar} 
                        alt={roommate.firstName}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="text-2xl font-bold mb-1">
                      {roommate.firstName}, {roommate.age}
                    </h3>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Briefcase className="h-4 w-4" />
                      <span>{roommate.job}</span>
                    </div>
                  </div>
                </div>
                
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>{roommate.city}</span>
                  </div>

                  <p className="text-muted-foreground text-sm">{roommate.bio}</p>

                  <div className="bg-muted/50 rounded-lg p-3">
                    <div className="flex items-center gap-2 text-sm font-medium mb-2">
                      <HomeIcon className="h-4 w-4 text-primary" />
                      <span>{t('roommateMatches.budget')}: {roommate.budgetMin}-{roommate.budgetMax} MAD</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {!roommate.smoking && (
                      <Badge variant="secondary" className="flex items-center gap-1">
                        <Cigarette className="h-3 w-3" />
                        {t('roommateMatches.nonSmoker')}
                      </Badge>
                    )}
                    {roommate.pets && (
                      <Badge variant="secondary" className="flex items-center gap-1">
                        <Dog className="h-3 w-3" />
                        {t('roommateMatches.petFriendly')}
                      </Badge>
                    )}
                    {roommate.nightOwl ? (
                      <Badge variant="secondary" className="flex items-center gap-1">
                        <Moon className="h-3 w-3" />
                        {t('roommateMatches.nightOwl')}
                      </Badge>
                    ) : (
                      <Badge variant="secondary" className="flex items-center gap-1">
                        <Sun className="h-3 w-3" />
                        {t('roommateMatches.earlyBird')}
                      </Badge>
                    )}
                    {roommate.clean && (
                      <Badge variant="secondary">
                        {t('roommateMatches.cleanOrganized')}
                      </Badge>
                    )}
                  </div>

                  <Button className="w-full" size="lg">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    {t('roommateMatches.message')}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RoommateMatches;
