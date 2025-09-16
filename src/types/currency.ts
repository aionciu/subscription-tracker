// Currency types and interfaces
export interface Currency {
  id: string;
  code: string;
  name: string;
  symbol: string;
  is_active: boolean;
  created_at: string;
}

export interface CurrencyInsert {
  code: string;
  name: string;
  symbol: string;
  is_active?: boolean;
}

export interface CurrencyUpdate {
  code?: string;
  name?: string;
  symbol?: string;
  is_active?: boolean;
}

// Common currency codes for the Romanian market
export const CURRENCY_CODES = {
  RON: 'RON',
  EUR: 'EUR',
  USD: 'USD',
  GBP: 'GBP',
  CHF: 'CHF',
  CAD: 'CAD',
  AUD: 'AUD',
} as const;

export type CurrencyCode = typeof CURRENCY_CODES[keyof typeof CURRENCY_CODES];
