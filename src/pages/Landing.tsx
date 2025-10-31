import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Home, Users, Heart, Sparkles } from 'lucide-react';
import heroImage from '@/assets/hero-bg.jpg';

const Landing = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section 
        className="relative h-[90vh] flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)), url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="container px-4 z-10 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              {t('hero.title')}
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-3xl mx-auto">
              {t('hero.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/signup">
                <Button 
                  size="lg" 
                  className="bg-primary hover:bg-primary/90 text-white text-lg px-8 py-6"
                >
                  <Users className="mr-2 h-5 w-5" />
                  {t('hero.cta.roommates')}
                </Button>
              </Link>
              <Link to="/signup">
                <Button 
                  size="lg" 
                  variant="secondary"
                  className="bg-secondary hover:bg-secondary/90 text-foreground text-lg px-8 py-6"
                >
                  <Home className="mr-2 h-5 w-5" />
                  {t('hero.cta.housing')}
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Floating Elements */}
        <motion.div
          className="absolute bottom-10 left-10 text-primary"
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <Heart className="h-12 w-12 opacity-30" />
        </motion.div>
        <motion.div
          className="absolute top-20 right-20 text-secondary"
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 2.5, repeat: Infinity }}
        >
          <Sparkles className="h-10 w-10 opacity-30" />
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/20">
        <div className="container px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="grid md:grid-cols-3 gap-8"
          >
            <div className="card-elevated p-8 text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-3">AI-Powered Matching</h3>
              <p className="text-muted-foreground">
                Our intelligent algorithm finds the perfect roommates based on compatibility
              </p>
            </div>

            <div className="card-elevated p-8 text-center">
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-secondary" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Safe & Verified</h3>
              <p className="text-muted-foreground">
                All profiles are verified to ensure a secure and trustworthy experience
              </p>
            </div>

            <div className="card-elevated p-8 text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Home className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Find Your Home</h3>
              <p className="text-muted-foreground">
                Browse thousands of listings across Morocco's major cities
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
