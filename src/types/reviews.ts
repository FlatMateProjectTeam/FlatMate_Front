export interface RoommateReview {
  id: string;
  reviewerId: string;
  reviewerName: string;
  reviewerAvatar: string;
  roommateId: string;
  roommateName: string;
  roommateAvatar: string;
  rating: number;
  cleanliness: number;
  communication: number;
  respectfulness: number;
  reliability: number;
  comment: string;
  pros: string[];
  cons: string[];
  duration: string;
  date: string;
  verified: boolean;
  helpful: number;
}

export interface HousingReview {
  id: string;
  reviewerId: string;
  reviewerName: string;
  reviewerAvatar: string;
  housingId: string;
  housingTitle: string;
  housingImage: string;
  housingLocation: string;
  rating: number;
  condition: number;
  location: number;
  valueForMoney: number;
  landlordRating: number;
  comment: string;
  pros: string[];
  cons: string[];
  duration: string;
  date: string;
  verified: boolean;
  helpful: number;
}
