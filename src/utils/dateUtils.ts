import { format, isValid, parseISO } from 'date-fns';

/**
 * Safely format a date string using date-fns
 * @param dateString - ISO date string or date object
 * @param formatString - Format string (default: 'MMM dd, yyyy')
 * @returns Formatted date string or original string if invalid
 */
export function safeFormatDate(dateString: string | Date, formatString: string = 'MMM dd, yyyy'): string {
  try {
    const date = typeof dateString === 'string' ? parseISO(dateString) : dateString;
    
    if (!isValid(date)) {
      return dateString.toString();
    }
    
    return format(date, formatString);
  } catch (error) {
    console.warn('Error formatting date:', error);
    return dateString.toString();
  }
}

/**
 * Calculate days until a given date
 * @param targetDate - Target date string or date object
 * @returns Number of days until the target date (negative if past)
 */
export function getDaysUntil(targetDate: string | Date): number {
  try {
    const target = typeof targetDate === 'string' ? parseISO(targetDate) : targetDate;
    const today = new Date();
    
    if (!isValid(target)) {
      return 0;
    }
    
    const diffTime = target.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  } catch (error) {
    console.warn('Error calculating days until date:', error);
    return 0;
  }
}

/**
 * Get a human-readable string for days until a date
 * @param targetDate - Target date string or date object
 * @returns Human-readable string (e.g., "Today", "Tomorrow", "5 days", "Overdue")
 */
export function getDaysUntilString(targetDate: string | Date): string {
  const days = getDaysUntil(targetDate);
  
  if (days < 0) {
    return 'Overdue';
  } else if (days === 0) {
    return 'Today';
  } else if (days === 1) {
    return 'Tomorrow';
  } else {
    return `${days} days`;
  }
}

/**
 * Get the next billing date based on billing cycle
 * @param currentDate - Current billing date
 * @param billingCycleDays - Number of days in billing cycle
 * @returns Next billing date
 */
export function getNextBillingDate(currentDate: string | Date, billingCycleDays: number): Date {
  try {
    const current = typeof currentDate === 'string' ? parseISO(currentDate) : currentDate;
    
    if (!isValid(current)) {
      return new Date();
    }
    
    const next = new Date(current);
    next.setDate(next.getDate() + billingCycleDays);
    
    return next;
  } catch (error) {
    console.warn('Error calculating next billing date:', error);
    return new Date();
  }
}
