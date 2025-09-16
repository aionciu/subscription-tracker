// Category types and interfaces
export interface Category {
  id: string;
  name: string;
  description: string | null;
  icon: string | null;
  color: string | null;
  is_active: boolean;
  created_at: string;
}

export interface CategoryInsert {
  name: string;
  description?: string | null;
  icon?: string | null;
  color?: string | null;
  is_active?: boolean;
}

export interface CategoryUpdate {
  name?: string;
  description?: string | null;
  icon?: string | null;
  color?: string | null;
  is_active?: boolean;
}

// Predefined category names
export const CATEGORY_NAMES = {
  STREAMING: 'Streaming',
  SOFTWARE: 'Software',
  CLOUD_STORAGE: 'Cloud Storage',
  GAMING: 'Gaming',
  NEWS_MEDIA: 'News & Media',
  PRODUCTIVITY: 'Productivity',
  FITNESS_HEALTH: 'Fitness & Health',
  EDUCATION: 'Education',
  FINANCE: 'Finance',
  COMMUNICATION: 'Communication',
  OTHER: 'Other',
} as const;

export type CategoryName = typeof CATEGORY_NAMES[keyof typeof CATEGORY_NAMES];
