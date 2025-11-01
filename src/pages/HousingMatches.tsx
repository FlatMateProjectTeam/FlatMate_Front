import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { Home, MapPin, Bed, Bath, Wifi, Car, Heart, MessageCircle, Star, Loader2 } from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';
import { matchesAPI, type LogementMatchResultDto } from '@/services/api';
import { toast } from 'react-hot-toast';

// Fonction pour transformer les données backend en format frontend
const transformHousingMatch = (match: LogementMatchResultDto) => ({
  id: match.logementId,
  title: match.address || 'Logement',
  price: match.price || 0,
  city: match.address?.split(',')[0] || 'Not specified',
  bedrooms: match.rooms || 0,
  bathrooms: 1, // Non disponible dans le DTO, valeur par défaut
  wifi: match.highlights?.some(h => h.toLowerCase().includes('wifi')) || false,
  parking: match.highlights?.some(h => h.toLowerCase().includes('parking')) || false,
  furnished: false, // À ajouter si disponible dans le backend
  matchScore: match.score || 0,
  image: match.pictureUrl || 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop',
});

const HousingMatches = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAppStore();
  const [matches, setMatches] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [savedHomes, setSavedHomes] = useState<string[]>([]);

  useEffect(() => {
    const loadMatches = async () => {
      // Si les matches sont passés via navigation state, les utiliser
      if (location.state?.matches && Array.isArray(location.state.matches)) {
        const transformedMatches = location.state.matches.map(transformHousingMatch);
        setMatches(transformedMatches);
        setIsLoading(false);
        return;
      }

      // Sinon, charger depuis l'API
      if (!user?.id) {
        toast.error('Vous devez être connecté');
        navigate('/login');
        return;
      }

      try {
        setIsLoading(true);
        const response = await matchesAPI.getHousingMatches(user.id);
        const transformedMatches = (response.matches || []).map(transformHousingMatch);
        setMatches(transformedMatches);
      } catch (error) {
        console.error('Error loading matches:', error);
        let errorMessage = 'Erreur lors du chargement des matches';
        
        if (error instanceof Error) {
          errorMessage = error.message;
          if (error.message.includes('Failed to fetch') || error.message.includes('CORS')) {
            errorMessage = 'Erreur de connexion au serveur. Vérifiez que le backend est démarré.';
          }
        }
        
        toast.error(errorMessage);
      } finally {
        setIsLoading(false);
      }
    };

    loadMatches();
  }, [location.state, user?.id, navigate]);

  const toggleSave = (id: string) => {
    setSavedHomes(prev => 
      prev.includes(id) ? prev.filter(hId => hId !== id) : [...prev, id]
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-muted/20 py-8 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin mx-auto mb-4 text-primary" />
          <p className="text-muted-foreground">{t('common.loading') || 'Chargement...'}</p>
        </div>
      </div>
    );
  }

  if (matches.length === 0) {
    return (
      <div className="min-h-screen bg-muted/20 py-8">
        <div className="container px-4 max-w-6xl">
          <div className="text-center py-12">
            <Home className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
            <h2 className="text-2xl font-bold mb-2">Aucun logement trouvé</h2>
            <p className="text-muted-foreground mb-6">
              Aucun logement correspondant à vos préférences pour le moment.
            </p>
            <Button onClick={() => navigate('/preferences')}>
              Modifier mes préférences
            </Button>
          </div>
        </div>
      </div>
    );
  }

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
