// Mock data for testing

export const mockProviders = [
  {
    id: '1',
    name: 'Netflix',
    description: 'Streaming service',
    category: { name: 'Streaming' },
    website: 'https://netflix.com',
    logo_url: 'https://example.com/netflix-logo.png',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
  {
    id: '2',
    name: 'Spotify',
    description: 'Music streaming',
    category: { name: 'Music' },
    website: 'https://spotify.com',
    logo_url: 'https://example.com/spotify-logo.png',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
];

export const mockBillingCycles = [
  { id: 'monthly', name: 'Monthly', type: 'monthly' },
  { id: 'yearly', name: 'Yearly', type: 'yearly' },
];

export const mockCurrencies = [
  { id: 'RON', name: 'Romanian Leu', symbol: 'lei', code: 'RON' },
  { id: 'USD', name: 'US Dollar', symbol: '$', code: 'USD' },
];

export const mockUser = {
  id: 'test-user-id',
  email: 'test@example.com',
  full_name: 'Test User',
  avatar_url: null,
  created_at: '2024-01-01T00:00:00Z',
  updated_at: '2024-01-01T00:00:00Z',
  onboarding_completed: false,
};
