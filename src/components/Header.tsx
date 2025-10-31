import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAppStore } from '@/store/useAppStore';
import { Button } from '@/components/ui/button';
import { LanguageSelector } from './LanguageSelector';
import { MobileNav } from './MobileNav';
import { LogOut } from 'lucide-react';
import { motion } from 'framer-motion';
import logoFlatmate from '@/assets/logo-flatmate.jpg';

export const Header = () => {
  const { t } = useTranslation();
  const { isAuthenticated, logout } = useAppStore();

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
    >
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <MobileNav />
          <Link to="/" className="flex items-center">
            <img 
              src={logoFlatmate} 
              alt="FlatMate - Finding Your Housemate" 
              className="h-10 w-auto object-contain"
            />
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          {isAuthenticated ? (
            <>
              <Link to="/dashboard">
                <Button variant="ghost">{t('nav.dashboard')}</Button>
              </Link>
              <Link to="/matches">
                <Button variant="ghost">{t('nav.matches')}</Button>
              </Link>
              <Link to="/messages">
                <Button variant="ghost">{t('nav.messages')}</Button>
              </Link>
              <Link to="/preferences">
                <Button variant="ghost">{t('nav.preferences')}</Button>
              </Link>
              <Link to="/profile">
                <Button variant="ghost">{t('nav.profile')}</Button>
              </Link>
              <Button variant="ghost" onClick={logout}>
                <LogOut className="h-4 w-4 mr-2" />
                {t('nav.logout')}
              </Button>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button variant="ghost">{t('nav.login')}</Button>
              </Link>
              <Link to="/signup">
                <Button variant="default">{t('nav.signup')}</Button>
              </Link>
            </>
          )}
        </nav>

        <div className="flex items-center gap-2">
          <LanguageSelector />
        </div>
      </div>
    </motion.header>
  );
};
