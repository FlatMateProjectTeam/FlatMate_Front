import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAppStore } from '@/store/useAppStore';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Menu, Home, LayoutDashboard, Heart, MessageSquare, Settings, User, LogOut } from 'lucide-react';

export const MobileNav = () => {
  const { t } = useTranslation();
  const { isAuthenticated, logout } = useAppStore();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleNavigation = (path: string) => {
    navigate(path);
    setOpen(false);
  };

  const handleLogout = () => {
    logout();
    setOpen(false);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] sm:w-[350px]">
        <SheetHeader>
          <SheetTitle className="text-left">
            <span className="text-xl font-bold text-gradient">FlatMate</span>
          </SheetTitle>
        </SheetHeader>
        <nav className="flex flex-col gap-4 mt-8">
          {isAuthenticated ? (
            <>
              <Button
                variant="ghost"
                className="justify-start gap-3"
                onClick={() => handleNavigation('/dashboard')}
              >
                <LayoutDashboard className="h-5 w-5" />
                {t('nav.dashboard')}
              </Button>
              <Button
                variant="ghost"
                className="justify-start gap-3"
                onClick={() => handleNavigation('/matches')}
              >
                <Heart className="h-5 w-5" />
                {t('nav.matches')}
              </Button>
              <Button
                variant="ghost"
                className="justify-start gap-3"
                onClick={() => handleNavigation('/messages')}
              >
                <MessageSquare className="h-5 w-5" />
                {t('nav.messages')}
              </Button>
              <Button
                variant="ghost"
                className="justify-start gap-3"
                onClick={() => handleNavigation('/preferences')}
              >
                <Settings className="h-5 w-5" />
                {t('nav.preferences')}
              </Button>
              <Button
                variant="ghost"
                className="justify-start gap-3"
                onClick={() => handleNavigation('/profile')}
              >
                <User className="h-5 w-5" />
                {t('nav.profile')}
              </Button>
              <div className="border-t pt-4 mt-4">
                <Button
                  variant="ghost"
                  className="justify-start gap-3 text-destructive hover:text-destructive w-full"
                  onClick={handleLogout}
                >
                  <LogOut className="h-5 w-5" />
                  {t('nav.logout')}
                </Button>
              </div>
            </>
          ) : (
            <>
              <Button
                variant="ghost"
                className="justify-start gap-3"
                onClick={() => handleNavigation('/')}
              >
                <Home className="h-5 w-5" />
                {t('nav.home')}
              </Button>
              <div className="border-t pt-4 mt-4 flex flex-col gap-2">
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => handleNavigation('/login')}
                >
                  {t('nav.login')}
                </Button>
                <Button
                  variant="default"
                  className="w-full"
                  onClick={() => handleNavigation('/signup')}
                >
                  {t('nav.signup')}
                </Button>
              </div>
            </>
          )}
        </nav>
      </SheetContent>
    </Sheet>
  );
};
