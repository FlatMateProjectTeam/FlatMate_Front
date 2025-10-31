import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { Home, MapPin, Bed, Bath, Wifi, Car, Heart, MessageCircle, Star } from 'lucide-react';

const mockHousingMatches = [
  {
    id: '1',
    title: '2 Bedroom Apartment in Centre',
    price: 4500,
    city: 'Casablanca',
    bedrooms: 2,
    bathrooms: 1,
    wifi: true,
    parking: true,
    furnished: true,
    matchScore: 95,
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop',
  },
  {
    id: '2',
    title: 'Modern Studio Apartment',
    price: 3800,
    city: 'Casablanca',
    bedrooms: 1,
    bathrooms: 1,
    wifi: true,
    parking: false,
    furnished: true,
    matchScore: 88,
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop',
  },
  {
    id: '3',
    title: '3 Bedroom Family Apartment',
    price: 6000,
    city: 'Casablanca',
    bedrooms: 3,
    bathrooms: 2,
    wifi: true,
    parking: true,
    furnished: false,
    matchScore: 82,
    image: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&h=600&fit=crop',
  },
  {
    id: '4',
    title: 'Cozy 1 Bedroom Near Beach',
    price: 4200,
    city: 'Casablanca',
    bedrooms: 1,
    bathrooms: 1,
    wifi: true,
    parking: true,
    furnished: true,
    matchScore: 90,
    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop',
  },
];

const HousingMatches = () => {
  const { t } = useTranslation();
  const [matches] = useState(mockHousingMatches);
  const [savedHomes, setSavedHomes] = useState<string[]>([]);

  const toggleSave = (id: string) => {
    setSavedHomes(prev => 
      prev.includes(id) ? prev.filter(hId => hId !== id) : [...prev, id]
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
            <Home className="h-8 w-8 text-primary" />
            <h1 className="text-4xl font-bold">
              {t('housingMatches.title', { count: matches.length })}
            </h1>
          </div>
          <p className="text-muted-foreground text-lg">{t('housingMatches.subtitle')}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {matches.map((housing, index) => (
            <motion.div
              key={housing.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="card-elevated overflow-hidden hover:shadow-xl transition-shadow">
                <div className="relative h-56 overflow-hidden">
                  <img 
                    src={housing.image} 
                    alt={housing.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                  <button
                    onClick={() => toggleSave(housing.id)}
                    className="absolute top-4 right-4 p-2 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background transition-colors"
                  >
                    <Heart 
                      className={`h-5 w-5 ${savedHomes.includes(housing.id) ? 'fill-primary text-primary' : 'text-muted-foreground'}`}
                    />
                  </button>
                  <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground flex items-center gap-1">
                    <Star className="h-3 w-3 fill-current" />
                    {housing.matchScore}% Match
                  </Badge>
                </div>
                
                <CardContent className="p-6 space-y-4">
                  <div>
                    <h3 className="text-xl font-bold mb-2">{housing.title}</h3>
                    <div className="flex items-center gap-2 text-muted-foreground mb-3">
                      <MapPin className="h-4 w-4" />
                      <span>{housing.city}</span>
                    </div>
                    <div className="text-2xl font-bold text-primary">
                      {housing.price} MAD<span className="text-sm font-normal text-muted-foreground">/month</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3 py-2">
                    <div className="flex items-center gap-1.5 text-sm">
                      <Bed className="h-4 w-4 text-muted-foreground" />
                      <span>{housing.bedrooms} {t('housingMatches.bedrooms')}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-sm">
                      <Bath className="h-4 w-4 text-muted-foreground" />
                      <span>{housing.bathrooms} {t('housingMatches.bathrooms')}</span>
                    </div>
                    {housing.wifi && (
                      <div className="flex items-center gap-1.5 text-sm">
                        <Wifi className="h-4 w-4 text-muted-foreground" />
                        <span>{t('housingMatches.wifi')}</span>
                      </div>
                    )}
                    {housing.parking && (
                      <div className="flex items-center gap-1.5 text-sm">
                        <Car className="h-4 w-4 text-muted-foreground" />
                        <span>{t('housingMatches.parking')}</span>
                      </div>
                    )}
                  </div>

                  <Button className="w-full" size="lg">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    {t('housingMatches.contactOwner')}
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

export default HousingMatches;
