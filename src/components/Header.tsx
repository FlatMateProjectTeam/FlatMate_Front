import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAppStore } from '@/store/useAppStore';
import { Button } from '@/components/ui/button';
import { LanguageSelector } from './LanguageSelector';
import { SidebarTrigger, useSidebar } from '@/components/ui/sidebar';
import { Home, Menu } from 'lucide-react';
import { motion } from 'framer-motion';
import { useIsMobile } from '@/hooks/use-mobile';

export const Header = () => {
  const { t } = useTranslation();
  const { isAuthenticated } = useAppStore();
  const isMobile = useIsMobile();
  const { open } = useSidebar();

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
    >
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          {isMobile && (
            <SidebarTrigger className="mr-2">
              <Menu className="h-5 w-5" />
            </SidebarTrigger>
          )}
          <Link to="/" className="flex items-center gap-2">
            <Home className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold text-gradient">FlatMate</span>
          </Link>
        </div>

        <div className="flex items-center gap-2">
          <LanguageSelector />
        </div>
      </div>
    </motion.header>
  );
};
