import { useEffect } from 'react';
import { Toaster as SonnerToaster } from 'sonner';
import { Toaster as HotToaster } from 'react-hot-toast';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAppStore } from './store/useAppStore';
import { Header } from './components/Header';
import { AiAssistant } from './components/AiAssistant';

import Landing from './pages/Landing';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Preferences from './pages/Preferences';
import Matches from './pages/Matches';
import Messages from './pages/Messages';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';

import './i18n/config';

const queryClient = new QueryClient();

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAppStore();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

const AppContent = () => {
  const { i18n } = useTranslation();
  const { language } = useAppStore();

  useEffect(() => {
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
    i18n.changeLanguage(language);
  }, [language, i18n]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <AiAssistant />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/preferences"
          element={
            <ProtectedRoute>
              <Preferences />
            </ProtectedRoute>
          }
        />
        <Route
          path="/matches"
          element={
            <ProtectedRoute>
              <Matches />
            </ProtectedRoute>
          }
        />
        <Route
          path="/messages"
          element={
            <ProtectedRoute>
              <Messages />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <HotToaster position="top-center" />
        <SonnerToaster />
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
