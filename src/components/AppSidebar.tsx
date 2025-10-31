import { Home, LayoutDashboard, Users, MessageSquare, Settings, User, LogOut, Heart } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAppStore } from '@/store/useAppStore';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';

export function AppSidebar() {
  const { t } = useTranslation();
  const { isAuthenticated, user, logout } = useAppStore();
  const { state } = useSidebar();
  const isCollapsed = state === 'collapsed';

  const mainNavItems = [
    { title: t('nav.dashboard'), url: '/dashboard', icon: LayoutDashboard },
    { title: t('nav.matches'), url: '/matches', icon: Heart },
    { title: t('nav.messages'), url: '/messages', icon: MessageSquare },
    { title: t('nav.preferences'), url: '/preferences', icon: Settings },
    { title: t('nav.profile'), url: '/profile', icon: User },
  ];

  const publicNavItems = [
    { title: t('nav.home'), url: '/', icon: Home },
  ];

  const navItems = isAuthenticated ? mainNavItems : publicNavItems;

  return (
    <Sidebar collapsible="icon" className="border-r border-border">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-foreground">
            {!isCollapsed && 'FlatMate'}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.url}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      className={({ isActive }) =>
                        isActive
                          ? 'bg-primary/10 text-primary font-medium'
                          : 'hover:bg-accent hover:text-accent-foreground'
                      }
                    >
                      <item.icon className="h-5 w-5" />
                      {!isCollapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              
              {isAuthenticated && (
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <button
                      onClick={logout}
                      className="w-full hover:bg-accent hover:text-accent-foreground"
                    >
                      <LogOut className="h-5 w-5" />
                      {!isCollapsed && <span>{t('nav.logout')}</span>}
                    </button>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {!isAuthenticated && !isCollapsed && (
          <SidebarGroup>
            <SidebarGroupContent className="px-4 space-y-2">
              <NavLink to="/login" className="w-full">
                <Button variant="outline" className="w-full">
                  {t('nav.login')}
                </Button>
              </NavLink>
              <NavLink to="/signup" className="w-full">
                <Button variant="default" className="w-full">
                  {t('nav.signup')}
                </Button>
              </NavLink>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>
    </Sidebar>
  );
}
