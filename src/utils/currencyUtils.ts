import { Currency } from '../types/currency';

/**
 * Format a number as currency with proper symbol and localization
 */
export function formatCurrency(amount: number, currency: Currency): string {
  const symbol = currency.symbol;
  const code = currency.code;
  
  // For Romanian Lei, show symbol after amount
  if (code === 'RON') {
    return `${amount.toFixed(2)} ${symbol}`;
  }
  
  // For other currencies, show symbol before amount
  return `${symbol}${amount.toFixed(2)}`;
}

/**
 * Format currency for display in cards (shorter format)
 */
export function formatCurrencyShort(amount: number, currency: Currency): string {
  const symbol = currency.symbol;
  const code = currency.code;
  
  // For amounts >= 1000, show in K format
  if (amount >= 1000) {
    const shortAmount = (amount / 1000).toFixed(1);
    if (code === 'RON') {
      return `${shortAmount}K ${symbol}`;
    }
    return `${symbol}${shortAmount}K`;
  }
  
  return formatCurrency(amount, currency);
}

/**
 * Get the primary currency for the user (defaults to RON for Romania)
 */
export function getPrimaryCurrency(): Currency {
  return {
    id: 'ron-id',
    code: 'RON',
    name: 'Romanian Leu',
    symbol: 'lei',
    is_active: true,
    created_at: new Date().toISOString(),
  };
}
