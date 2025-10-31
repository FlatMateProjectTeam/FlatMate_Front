import { useTranslation } from 'react-i18next';
import { useAppStore } from '@/store/useAppStore';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Users, MessageSquare, Heart, Eye, Settings, Sparkles } from 'lucide-react';

const Dashboard = () => {
  const { t } = useTranslation();
  const { user } = useAppStore();

  const stats = [
    {
      title: t('dashboard.stats.profileCompletion'),
      value: '75%',
      icon: Settings,
      color: 'text-primary',
      bgColor: 'bg-primary/10',
    },
    {
      title: t('dashboard.stats.matches'),
      value: '12',
      icon: Heart,
      color: 'text-secondary',
      bgColor: 'bg-secondary/10',
    },
    {
      title: t('dashboard.stats.messages'),
      value: '5',
      icon: MessageSquare,
      color: 'text-primary',
      bgColor: 'bg-primary/10',
    },
    {
      title: t('dashboard.stats.views'),
      value: '48',
      icon: Eye,
      color: 'text-secondary',
      bgColor: 'bg-secondary/10',
    },
  ];

  const quickActions = [
    { title: t('nav.preferences'), icon: Settings, link: '/preferences', color: 'primary' },
    { title: t('nav.matches'), icon: Heart, link: '/matches', color: 'secondary' },
    { title: t('nav.messages'), icon: MessageSquare, link: '/messages', color: 'primary' },
    { title: t('nav.profile'), icon: Users, link: '/profile', color: 'secondary' },
  ];

  return (
    <div className="min-h-screen bg-muted/20 py-8">
      <div className="container px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold mb-2">
            {t('dashboard.welcome')}, {user?.firstName}! 👋
          </h1>
          <p className="text-muted-foreground text-lg">
            Here's what's happening with your account today
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="card-elevated">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <div className={`p-3 rounded-full ${stat.bgColor}`}>
                      <stat.icon className={`h-6 w-6 ${stat.color}`} />
                    </div>
                    <span className="text-3xl font-bold">{stat.value}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="card-elevated">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                {t('dashboard.quickActions')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {quickActions.map((action) => (
                  <Link key={action.title} to={action.link}>
                    <Button
                      variant={action.color === 'primary' ? 'default' : 'secondary'}
                      className="w-full h-auto py-6 flex flex-col gap-2"
                    >
                      <action.icon className="h-6 w-6" />
                      <span>{action.title}</span>
                    </Button>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
