import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, ThumbsUp, BadgeCheck, MapPin } from "lucide-react";
import { HousingReview } from "@/types/reviews";
import { useTranslation } from "react-i18next";

interface HousingReviewCardProps {
  review: HousingReview;
}

export const HousingReviewCard = ({ review }: HousingReviewCardProps) => {
  const { t } = useTranslation();

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-0.5">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`h-4 w-4 ${
              i < Math.floor(rating)
                ? "fill-primary text-primary"
                : "text-muted-foreground"
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 animate-fade-in">
      <CardHeader className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative h-32 sm:h-24 sm:w-32 rounded-lg overflow-hidden flex-shrink-0">
            <img
              src={review.housingImage}
              alt={review.housingTitle}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 space-y-2">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-lg">{review.housingTitle}</h3>
                  {review.verified && (
                    <BadgeCheck className="h-5 w-5 text-primary" />
                  )}
                </div>
                <div className="flex items-center gap-1 text-muted-foreground mt-1">
                  <MapPin className="h-4 w-4" />
                  <span className="text-sm">{review.housingLocation}</span>
                </div>
              </div>
              <Badge variant="secondary" className="whitespace-nowrap">
                {review.duration}
              </Badge>
            </div>
            <div className="flex items-center gap-2">
              {renderStars(review.rating)}
              <span className="text-sm font-medium">{review.rating.toFixed(1)}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">{t("condition") || "Condition"}</p>
            <div className="flex items-center gap-1">
              <Star className="h-3 w-3 fill-primary text-primary" />
              <span className="text-sm font-medium">{review.condition}</span>
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">{t("location") || "Location"}</p>
            <div className="flex items-center gap-1">
              <Star className="h-3 w-3 fill-primary text-primary" />
              <span className="text-sm font-medium">{review.location}</span>
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">{t("value") || "Value"}</p>
            <div className="flex items-center gap-1">
              <Star className="h-3 w-3 fill-primary text-primary" />
              <span className="text-sm font-medium">{review.valueForMoney}</span>
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">{t("landlord") || "Landlord"}</p>
            <div className="flex items-center gap-1">
              <Star className="h-3 w-3 fill-primary text-primary" />
              <span className="text-sm font-medium">{review.landlordRating}</span>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <p className="text-foreground leading-relaxed">{review.comment}</p>

        {review.pros.length > 0 && (
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">
              {t("pros") || "Pros"}
            </p>
            <div className="flex flex-wrap gap-2">
              {review.pros.map((pro, index) => (
                <Badge key={index} variant="default" className="bg-primary/10 text-primary hover:bg-primary/20">
                  {pro}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {review.cons.length > 0 && (
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">
              {t("cons") || "Cons"}
            </p>
            <div className="flex flex-wrap gap-2">
              {review.cons.map((con, index) => (
                <Badge key={index} variant="secondary" className="bg-secondary/50">
                  {con}
                </Badge>
              ))}
            </div>
          </div>
        )}

        <div className="flex items-center justify-between pt-4 border-t">
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Avatar className="h-6 w-6">
                <AvatarImage src={review.reviewerAvatar} />
                <AvatarFallback>{review.reviewerName[0]}</AvatarFallback>
              </Avatar>
              <span>{review.reviewerName}</span>
            </div>
            <span>•</span>
            <span>{new Date(review.date).toLocaleDateString()}</span>
          </div>
          <Button variant="ghost" size="sm" className="gap-2">
            <ThumbsUp className="h-4 w-4" />
            <span>{review.helpful}</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
