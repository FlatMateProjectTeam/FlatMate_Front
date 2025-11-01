import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { User, MapPin, Briefcase, Heart, MessageCircle, Star, Moon, Sun, Home as HomeIcon, Cigarette, Dog, Loader2 } from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';
import { matchesAPI, likesAPI, type MatchResultDto } from '@/services/api';
import { toast } from 'react-hot-toast';

// Fonction pour transformer les données backend en format frontend
const transformMatchResult = (match: MatchResultDto) => {
  // Calculer budgetMin et budgetMax depuis le budget (on suppose ±20% de marge)
  const budget = match.budget || 0;
  const budgetMin = budget > 0 ? Math.round(budget * 0.8) : 0;
  const budgetMax = budget > 0 ? Math.round(budget * 1.2) : 0;
  
  return {
    id: match.candidateId,
    firstName: match.candidateName || 'Anonymous',
    age: match.age || 0, // Utiliser l'âge depuis le backend
    job: match.job || 'Not specified',
    city: match.city || 'Not specified',
    budgetMin: budgetMin,
    budgetMax: budgetMax,
    matchScore: match.score || 0,
    bio: match.recommendation || '',
    smoking: !match.riskFlags?.some(flag => flag.toLowerCase().includes('smoking')),
    pets: false, // À ajouter si disponible dans le backend
    nightOwl: match.reasons?.some(reason => reason.toLowerCase().includes('night')) || false,
    clean: !match.riskFlags?.some(flag => flag.toLowerCase().includes('clean')),
    avatar: match.pictureUrl || `https://api.dicebear.com/7.x/avataaars/svg?seed=${match.candidateId}`,
    isLiked: match.isLiked || false, // État du like depuis le backend
  };
};

const RoommateMatches = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAppStore();
  const [matches, setMatches] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [likingIds, setLikingIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    const loadMatches = async () => {
      // Si les matches sont passés via navigation state, les utiliser
      if (location.state?.matches && Array.isArray(location.state.matches)) {
        const transformedMatches = location.state.matches.map(transformMatchResult);
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
        const response = await matchesAPI.getRoommateMatches(user.id);
        const transformedMatches = (response.matches || []).map(transformMatchResult);
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

  const handleLike = async (candidateId: string) => {
    if (!user?.id) {
      toast.error('Vous devez être connecté');
      return;
    }

    const candidate = matches.find(m => m.id === candidateId);
    if (!candidate) return;

    // Si déjà en train de liker, ignorer
    if (likingIds.has(candidateId)) return;

    const isCurrentlyLiked = candidate.isLiked;

    // Optimistic update
    setMatches(prevMatches =>
      prevMatches.map(m =>
        m.id === candidateId ? { ...m, isLiked: !isCurrentlyLiked } : m
      )
    );
    setLikingIds(prev => new Set(prev).add(candidateId));

    try {
      if (!isCurrentlyLiked) {
        // Liker le profil - convertir les IDs en nombres si nécessaire
        await likesAPI.likeUser(String(user.id), String(candidateId));
        toast.success('Profil liké avec succès !');
      } else {
        // Note: Le backend n'a pas d'endpoint pour unlike, donc on garde juste l'optimistic update
        toast('Like retiré (fonctionnalité à implémenter)');
      }
    } catch (error) {
      // Revert optimistic update en cas d'erreur
      setMatches(prevMatches =>
        prevMatches.map(m =>
          m.id === candidateId ? { ...m, isLiked: isCurrentlyLiked } : m
        )
      );
      
      console.error('Error toggling like:', error);
      toast.error(
        error instanceof Error 
          ? error.message 
          : 'Erreur lors du like'
      );
    } finally {
      setLikingIds(prev => {
        const next = new Set(prev);
        next.delete(candidateId);
        return next;
      });
    }
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
            <User className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
            <h2 className="text-2xl font-bold mb-2">Aucun match trouvé</h2>
            <p className="text-muted-foreground mb-6">
              Aucun colocataire correspondant à vos préférences pour le moment.
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
            <User className="h-8 w-8 text-primary" />
            <h1 className="text-4xl font-bold">
              {t('roommateMatches.title', { count: matches.length })}
            </h1>
          </div>
          <p className="text-foreground text-lg">{t('roommateMatches.subtitle')}</p>
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
                    onClick={() => handleLike(roommate.id)}
                    disabled={likingIds.has(roommate.id)}
                    className="absolute top-4 right-4 p-2 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Heart 
                      className={`h-5 w-5 transition-all ${
                        roommate.isLiked 
                          ? 'fill-primary text-primary animate-pulse' 
                          : 'text-muted-foreground hover:text-primary'
                      }`}
                    />
                  </button>
                  <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground flex items-center gap-1">
                    <Star className="h-3 w-3 fill-current" />
                    {roommate.matchScore}% Match
                  </Badge>
                  
                  <div className="flex flex-col items-center">
                    <div className={`w-32 h-32 rounded-full overflow-hidden bg-background mb-4 border-4 shadow-lg ${
                      roommate.matchScore > 50 
                        ? 'border-green-500' 
                        : roommate.matchScore >= 30 
                        ? 'border-yellow-500' 
                        : 'border-red-500'
                    }`}>
                      <img 
                        src={roommate.avatar} 
                        alt={roommate.firstName}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="text-2xl font-bold mb-1">
                      {roommate.firstName}{roommate.age && roommate.age > 0 ? `, ${roommate.age}` : ''}
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

                  <p className="text-foreground text-sm">{roommate.bio}</p>

                  {roommate.budgetMin > 0 && roommate.budgetMax > 0 && (
                    <div className="bg-muted/50 rounded-lg p-3">
                      <div className="flex items-center gap-2 text-sm font-medium mb-2">
                        <HomeIcon className="h-4 w-4 text-primary" />
                        <span>{t('roommateMatches.budget')}: {roommate.budgetMin}-{roommate.budgetMax} MAD</span>
                      </div>
                    </div>
                  )}

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
