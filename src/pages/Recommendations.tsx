import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RoommateReviewCard } from "@/components/reviews/RoommateReviewCard";
import { HousingReviewCard } from "@/components/reviews/HousingReviewCard";
import { mockRoommateReviews, mockHousingReviews } from "@/data/mockReviews";
import { Star, Users, Home } from "lucide-react";
import { useTranslation } from "react-i18next";

const Recommendations = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState("roommates");

  const avgRoommateRating = (
    mockRoommateReviews.reduce((acc, r) => acc + r.rating, 0) /
    mockRoommateReviews.length
  ).toFixed(1);

  const avgHousingRating = (
    mockHousingReviews.reduce((acc, r) => acc + r.rating, 0) /
    mockHousingReviews.length
  ).toFixed(1);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        {/* Hero Section */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
            <Star className="h-8 w-8 text-primary fill-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            {t("recommendations") || "Recommendations"}
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t("recommendations_subtitle") ||
              "Real reviews from our community. Help others make informed decisions about their next roommate or housing."}
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-card p-6 rounded-lg border shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-primary/10">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{mockRoommateReviews.length}</p>
                <p className="text-sm text-muted-foreground">
                  {t("roommate_reviews") || "Roommate Reviews"}
                </p>
                <div className="flex items-center gap-1 mt-1">
                  <Star className="h-4 w-4 fill-primary text-primary" />
                  <span className="font-medium">{avgRoommateRating}</span>
                  <span className="text-xs text-muted-foreground">
                    {t("average") || "average"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-card p-6 rounded-lg border shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-primary/10">
                <Home className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{mockHousingReviews.length}</p>
                <p className="text-sm text-muted-foreground">
                  {t("housing_reviews") || "Housing Reviews"}
                </p>
                <div className="flex items-center gap-1 mt-1">
                  <Star className="h-4 w-4 fill-primary text-primary" />
                  <span className="font-medium">{avgHousingRating}</span>
                  <span className="text-xs text-muted-foreground">
                    {t("average") || "average"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="roommates" className="gap-2">
              <Users className="h-4 w-4" />
              {t("roommate_reviews") || "Roommate Reviews"}
            </TabsTrigger>
            <TabsTrigger value="housing" className="gap-2">
              <Home className="h-4 w-4" />
              {t("housing_reviews") || "Housing Reviews"}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="roommates" className="space-y-6">
            {mockRoommateReviews.map((review) => (
              <RoommateReviewCard key={review.id} review={review} />
            ))}
          </TabsContent>

          <TabsContent value="housing" className="space-y-6">
            {mockHousingReviews.map((review) => (
              <HousingReviewCard key={review.id} review={review} />
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Recommendations;
