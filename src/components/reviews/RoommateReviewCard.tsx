import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, ThumbsUp, BadgeCheck } from "lucide-react";
import { RoommateReview } from "@/types/reviews";
import { useTranslation } from "react-i18next";

interface RoommateReviewCardProps {
  review: RoommateReview;
}

export const RoommateReviewCard = ({ review }: RoommateReviewCardProps) => {
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
        <div className="flex items-start justify-between">
          <div className="flex gap-3">
            <Avatar className="h-12 w-12 border-2 border-primary/20">
              <AvatarImage src={review.roommateAvatar} />
              <AvatarFallback>{review.roommateName[0]}</AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-lg">{review.roommateName}</h3>
                {review.verified && (
                  <BadgeCheck className="h-5 w-5 text-primary" />
                )}
              </div>
              <div className="flex items-center gap-2 mt-1">
                {renderStars(review.rating)}
                <span className="text-sm font-medium">{review.rating.toFixed(1)}</span>
              </div>
            </div>
          </div>
          <Badge variant="secondary" className="whitespace-nowrap">
            {review.duration}
          </Badge>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">{t("cleanliness") || "Cleanliness"}</p>
            <div className="flex items-center gap-1">
              <Star className="h-3 w-3 fill-primary text-primary" />
              <span className="text-sm font-medium">{review.cleanliness}</span>
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">{t("communication") || "Communication"}</p>
            <div className="flex items-center gap-1">
              <Star className="h-3 w-3 fill-primary text-primary" />
              <span className="text-sm font-medium">{review.communication}</span>
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">{t("respectfulness") || "Respect"}</p>
            <div className="flex items-center gap-1">
              <Star className="h-3 w-3 fill-primary text-primary" />
              <span className="text-sm font-medium">{review.respectfulness}</span>
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">{t("reliability") || "Reliability"}</p>
            <div className="flex items-center gap-1">
              <Star className="h-3 w-3 fill-primary text-primary" />
              <span className="text-sm font-medium">{review.reliability}</span>
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
