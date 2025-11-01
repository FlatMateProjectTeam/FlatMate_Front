import { API_ENDPOINTS } from '@/store/useAppStore';

const BASE_URL = API_ENDPOINTS.baseUrl;

// Types pour les préférences
export interface PreferencesColocatairesDto {
  id?: number;
  pets?: boolean;
  sleepSchedule?: string;
  socialLevel?: number;
  workStyle?: string;
  city?: string;
  langages?: string;
  smoking?: boolean;
  gender?: string;
}

export interface PreferencesLogementDto {
  id?: number;
  address?: string;
  budget?: number;
  rooms?: number;
  capacity?: number;
  furnished?: boolean;
  gender?: string;
}

// Types pour les matches
export interface MatchResultDto {
  candidateId: string;
  score: number;
  reasons?: string[];
  recommendation?: string;
  riskFlags?: string[];
  compatibilityLabel?: string;
  candidateName?: string;
  city?: string;
  job?: string;
  gender?: string;
  pictureUrl?: string;
  age?: number; // Âge du candidat
  budget?: number; // Budget du candidat
  isLiked?: boolean; // Si l'utilisateur a déjà liké ce candidat
}

export interface LogementMatchResultDto {
  logementId: string;
  address?: string;
  price?: number;
  rooms?: number;
  ownerName?: string;
  pictureUrl?: string;
  score: number;
  reasons?: string[];
  recommendation?: string;
  highlights?: string[];
  concerns?: string[];
  compatibilityLabel?: string;
}

export interface RoommateMatchResponse {
  rawModelResponse?: string;
  matches: MatchResultDto[];
}

export interface LogementMatchResponse {
  rawModelResponse?: string;
  matches: LogementMatchResultDto[];
}

// Fonction helper pour les appels API
async function apiCall<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = localStorage.getItem('flatmate-storage')
    ? JSON.parse(localStorage.getItem('flatmate-storage') || '{}')?.state?.token
    : null;

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    let errorMessage = `HTTP error! status: ${response.status}`;
    try {
      const errorText = await response.text();
      if (errorText) {
        errorMessage = errorText;
      }
    } catch (e) {
      // Ignorer si on ne peut pas lire le body
    }
    const error = new Error(errorMessage);
    (error as any).status = response.status;
    throw error;
  }

  const contentType = response.headers.get("content-type");
  if (contentType && contentType.includes("application/json")) {
    return response.json();
  } else {
    return response.text() as unknown as T;
  }
}

// API pour les préférences
export const preferencesAPI = {
  // Sauvegarder les préférences de colocataires
  saveColocataires: (userId: string, prefs: PreferencesColocatairesDto) =>
    apiCall<PreferencesColocatairesDto>(
      `/api/preferences/colocataires/${userId}`,
      {
        method: 'PUT',
        body: JSON.stringify(prefs),
      }
    ),

  // Sauvegarder les préférences de logement
  saveLogement: (userId: string, prefs: PreferencesLogementDto) =>
    apiCall<PreferencesLogementDto>(`/api/preferences/logement/${userId}`, {
      method: 'PUT',
      body: JSON.stringify(prefs),
    }),

  // Récupérer les préférences de colocataires
  getColocataires: (userId: string) =>
    apiCall<PreferencesColocatairesDto>(
      `/api/preferences/colocataires/${userId}`
    ),

  // Récupérer les préférences de logement
  getLogement: (userId: string) =>
    apiCall<PreferencesLogementDto>(`/api/preferences/logement/${userId}`),
};

// API pour les matches
export const matchesAPI = {
  // Récupérer les matches de roommates
  getRoommateMatches: (userId: string) =>
    apiCall<RoommateMatchResponse>(`/api/match/roommates/${userId}`),

  // Récupérer les matches de logements
  getHousingMatches: (userId: string) =>
    apiCall<LogementMatchResponse>(`/api/match/housing/${userId}`),
};

// API pour les likes
export const likesAPI = {
  // Liker un utilisateur
  likeUser: (userId: string, likedUserId: string) =>
    apiCall<{ id: number; userId: number; likedUserId: number }>('/api/likes', {
      method: 'POST',
      body: JSON.stringify({ 
        userId: Number(userId), 
        likedUserId: Number(likedUserId) 
      }),
    }),

  // Vérifier si un utilisateur a liké un autre
  hasLiked: (userId: string, likedUserId: string) =>
    apiCall<{ hasLiked: boolean }>(`/api/likes/check?userId=${userId}&likedUserId=${likedUserId}`),

  // Récupérer tous les likes d'un utilisateur
  getUserLikes: (userId: string) =>
    apiCall<Array<{ id: number; userId: number; likedUserId: number }>>(`/api/likes/user/${userId}`),
};
