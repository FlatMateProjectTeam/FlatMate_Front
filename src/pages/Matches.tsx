import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, X, MapPin, Briefcase, User } from 'lucide-react';

const mockMatches = [
  {
    id: '1',
    firstName: 'Sarah',
    age: 26,
    job: 'Software Engineer',
    city: 'Casablanca',
    compatibility: 87,
    bio: 'Love reading, hiking, and cooking. Looking for a clean and respectful roommate.',
    interests: ['Reading', 'Hiking', 'Cooking'],
  },
  {
    id: '2',
    firstName: 'Ahmed',
    age: 28,
    job: 'Marketing Manager',
    city: 'Rabat',
    compatibility: 92,
    bio: 'Working professional seeking a quiet roommate. I enjoy sports and traveling.',
    interests: ['Sports', 'Travel', 'Photography'],
  },
  {
    id: '3',
    firstName: 'Yasmine',
    age: 24,
    job: 'Graphic Designer',
    city: 'Casablanca',
    compatibility: 78,
    bio: 'Creative and organized. Love art, music, and meeting new people.',
    interests: ['Art', 'Music', 'Design'],
  },
];

const Matches = () => {
  const { t } = useTranslation();
  const [matches, setMatches] = useState(mockMatches);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleLike = () => {
    if (currentIndex < matches.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePass = () => {
    if (currentIndex < matches.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const currentMatch = matches[currentIndex];

  return (
    <div className="min-h-screen bg-muted/20 py-8">
      <div className="container px-4 max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 text-center"
        >
          <h1 className="text-4xl font-bold mb-2">{t('matches.title')}</h1>
          <p className="text-muted-foreground text-lg">{t('matches.subtitle')}</p>
        </motion.div>

        <div className="relative">
          <AnimatePresence mode="wait">
            {currentMatch ? (
              <motion.div
                key={currentMatch.id}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0, x: -300 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="card-elevated overflow-hidden">
                  <div className="h-80 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                    <User className="h-32 w-32 text-muted-foreground" />
                  </div>
                  <CardContent className="p-6 space-y-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h2 className="text-3xl font-bold">
                          {currentMatch.firstName}, {currentMatch.age}
                        </h2>
                        <div className="flex items-center gap-2 text-muted-foreground mt-1">
                          <Briefcase className="h-4 w-4" />
                          <span>{currentMatch.job}</span>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground mt-1">
                          <MapPin className="h-4 w-4" />
                          <span>{currentMatch.city}</span>
                        </div>
                      </div>
                      <Badge className="text-lg px-4 py-2 bg-gradient-to-r from-primary to-secondary">
                        {currentMatch.compatibility}% {t('matches.compatibility')}
                      </Badge>
                    </div>

                    <p className="text-muted-foreground">{currentMatch.bio}</p>

                    <div className="flex flex-wrap gap-2">
                      {currentMatch.interests.map((interest) => (
                        <Badge key={interest} variant="secondary">
                          {interest}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex gap-4 pt-4">
                      <Button
                        variant="outline"
                        size="lg"
                        onClick={handlePass}
                        className="flex-1 border-2"
                      >
                        <X className="h-5 w-5 mr-2" />
                        {t('matches.pass')}
                      </Button>
                      <Button
                        size="lg"
                        onClick={handleLike}
                        className="flex-1"
                      >
                        <Heart className="h-5 w-5 mr-2" />
                        {t('matches.like')}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20"
              >
                <Card className="card-elevated p-12">
                  <Heart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-2xl font-bold mb-2">{t('matches.noMore')}</h3>
                  <p className="text-muted-foreground">{t('matches.checkLater')}</p>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Matches;
