export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  age?: number;
  gender?: string;
  job?: string;
  bio?: string;
  avatar?: string;
  city?: string;
  phone?: string;
}

export interface RoommatePreferences {
  ageMin: number;
  ageMax: number;
  gender?: string;
  petsAllowed: boolean;
  smoking: boolean;
  cleanliness: number; // 1-5
  sociability: number; // 1-5
  workSchedule: string;
  sleepSchedule: string;
}

export interface HousingPreferences {
  city: string;
  propertyType: string;
  bedrooms: number;
  budgetMin: number;
  budgetMax: number;
  furnished: boolean;
  amenities: string[];
  moveInDate?: string;
}

export interface Match {
  id: string;
  user: User;
  compatibility: number;
  type: 'roommate' | 'housing';
  commonInterests: string[];
  distance?: string;
  createdAt: string;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: string;
  read: boolean;
}

export interface Conversation {
  id: string;
  participant: User;
  lastMessage: Message;
  unreadCount: number;
}
