import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { Users, Home } from 'lucide-react';

const Preferences = () => {
  const { t } = useTranslation();
  const [roommatePrefs, setRoommatePrefs] = useState({
    ageMin: 18,
    ageMax: 35,
    petsAllowed: false,
    smoking: false,
    cleanliness: 3,
    sociability: 3,
  });

  const [housingPrefs, setHousingPrefs] = useState({
    city: 'casablanca',
    budgetMin: 2000,
    budgetMax: 6000,
    bedrooms: 2,
    furnished: true,
  });

  const handleSave = () => {
    toast.success(t('common.success'));
  };

  return (
    <div className="min-h-screen bg-muted/20 py-8">
      <div className="container px-4 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold mb-2">{t('preferences.title')}</h1>
          <p className="text-muted-foreground text-lg">{t('preferences.subtitle')}</p>
        </motion.div>

        <Card className="card-elevated">
          <CardContent className="p-6">
            <Tabs defaultValue="roommate" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="roommate" className="gap-2">
                  <Users className="h-4 w-4" />
                  {t('preferences.tabs.roommate')}
                </TabsTrigger>
                <TabsTrigger value="housing" className="gap-2">
                  <Home className="h-4 w-4" />
                  {t('preferences.tabs.housing')}
                </TabsTrigger>
              </TabsList>

              <TabsContent value="roommate" className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <Label>{t('preferences.roommate.ageRange')}: {roommatePrefs.ageMin} - {roommatePrefs.ageMax}</Label>
                    <div className="grid grid-cols-2 gap-4 mt-2">
                      <Input
                        type="number"
                        value={roommatePrefs.ageMin}
                        onChange={(e) => setRoommatePrefs({ ...roommatePrefs, ageMin: parseInt(e.target.value) })}
                      />
                      <Input
                        type="number"
                        value={roommatePrefs.ageMax}
                        onChange={(e) => setRoommatePrefs({ ...roommatePrefs, ageMax: parseInt(e.target.value) })}
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <Label>{t('preferences.roommate.pets')}</Label>
                    <Switch
                      checked={roommatePrefs.petsAllowed}
                      onCheckedChange={(checked) => setRoommatePrefs({ ...roommatePrefs, petsAllowed: checked })}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label>{t('preferences.roommate.smoking')}</Label>
                    <Switch
                      checked={roommatePrefs.smoking}
                      onCheckedChange={(checked) => setRoommatePrefs({ ...roommatePrefs, smoking: checked })}
                    />
                  </div>

                  <div>
                    <Label>{t('preferences.roommate.cleanliness')}: {roommatePrefs.cleanliness}/5</Label>
                    <Slider
                      value={[roommatePrefs.cleanliness]}
                      onValueChange={(value) => setRoommatePrefs({ ...roommatePrefs, cleanliness: value[0] })}
                      max={5}
                      min={1}
                      step={1}
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label>{t('preferences.roommate.sociability')}: {roommatePrefs.sociability}/5</Label>
                    <Slider
                      value={[roommatePrefs.sociability]}
                      onValueChange={(value) => setRoommatePrefs({ ...roommatePrefs, sociability: value[0] })}
                      max={5}
                      min={1}
                      step={1}
                      className="mt-2"
                    />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="housing" className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <Label>{t('preferences.housing.city')}</Label>
                    <Select value={housingPrefs.city} onValueChange={(value) => setHousingPrefs({ ...housingPrefs, city: value })}>
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="casablanca">Casablanca</SelectItem>
                        <SelectItem value="rabat">Rabat</SelectItem>
                        <SelectItem value="marrakech">Marrakech</SelectItem>
                        <SelectItem value="fes">Fès</SelectItem>
                        <SelectItem value="tangier">Tangier</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>{t('preferences.housing.budget')}: {housingPrefs.budgetMin} - {housingPrefs.budgetMax} MAD</Label>
                    <div className="grid grid-cols-2 gap-4 mt-2">
                      <Input
                        type="number"
                        value={housingPrefs.budgetMin}
                        onChange={(e) => setHousingPrefs({ ...housingPrefs, budgetMin: parseInt(e.target.value) })}
                      />
                      <Input
                        type="number"
                        value={housingPrefs.budgetMax}
                        onChange={(e) => setHousingPrefs({ ...housingPrefs, budgetMax: parseInt(e.target.value) })}
                      />
                    </div>
                  </div>

                  <div>
                    <Label>{t('preferences.housing.bedrooms')}</Label>
                    <Select
                      value={housingPrefs.bedrooms.toString()}
                      onValueChange={(value) => setHousingPrefs({ ...housingPrefs, bedrooms: parseInt(value) })}
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 Bedroom</SelectItem>
                        <SelectItem value="2">2 Bedrooms</SelectItem>
                        <SelectItem value="3">3 Bedrooms</SelectItem>
                        <SelectItem value="4">4+ Bedrooms</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center justify-between">
                    <Label>{t('preferences.housing.furnished')}</Label>
                    <Switch
                      checked={housingPrefs.furnished}
                      onCheckedChange={(checked) => setHousingPrefs({ ...housingPrefs, furnished: checked })}
                    />
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            <div className="mt-6 flex justify-end">
              <Button onClick={handleSave} size="lg">
                {t('preferences.save')}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Preferences;
