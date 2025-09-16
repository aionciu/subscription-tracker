// Subscription provider types and interfaces
export interface Provider {
  id: string;
  name: string;
  description: string | null;
  website_url: string | null;
  logo_url: string | null;
  category_id: string | null;
  is_popular: boolean;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface ProviderWithCategory extends Provider {
  category: Category | null;
}

export interface ProviderInsert {
  name: string;
  description?: string | null;
  website_url?: string | null;
  logo_url?: string | null;
  category_id?: string | null;
  is_popular?: boolean;
  is_active?: boolean;
}

export interface ProviderUpdate {
  name?: string;
  description?: string | null;
  website_url?: string | null;
  logo_url?: string | null;
  category_id?: string | null;
  is_popular?: boolean;
  is_active?: boolean;
}

// Popular providers for Romanian market
export const POPULAR_PROVIDERS = {
  // Streaming
  NETFLIX: 'Netflix',
  SPOTIFY: 'Spotify',
  DISNEY_PLUS: 'Disney+',
  HBO_MAX: 'HBO Max',
  AMAZON_PRIME: 'Amazon Prime Video',
  YOUTUBE_PREMIUM: 'YouTube Premium',
  
  // Software
  MICROSOFT_365: 'Microsoft 365',
  ADOBE_CREATIVE: 'Adobe Creative Cloud',
  FIGMA: 'Figma',
  NOTION: 'Notion',
  SLACK: 'Slack',
  
  // Gaming
  PLAYSTATION_PLUS: 'PlayStation Plus',
  XBOX_GAME_PASS: 'Xbox Game Pass',
  STEAM: 'Steam',
  NINTENDO_ONLINE: 'Nintendo Switch Online',
} as const;

export type PopularProvider = typeof POPULAR_PROVIDERS[keyof typeof POPULAR_PROVIDERS];

// Import Category type
import { Category } from './category';
