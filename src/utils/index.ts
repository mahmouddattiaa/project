// Utility functions for the Kepler Credit Score Application

import { CREDIT_SCORE_RANGES, REGEX_PATTERNS } from '../constants';
import type { CreditScore } from '../types';

/**
 * Determines credit score range based on score value
 */
export const getCreditScoreRange = (score: number): keyof typeof CREDIT_SCORE_RANGES => {
  if (score >= CREDIT_SCORE_RANGES.excellent.min) return 'excellent';
  if (score >= CREDIT_SCORE_RANGES.good.min) return 'good';
  if (score >= CREDIT_SCORE_RANGES.fair.min) return 'fair';
  return 'poor';
};

/**
 * Gets color for credit score
 */
export const getCreditScoreColor = (score: number): string => {
  const range = getCreditScoreRange(score);
  return CREDIT_SCORE_RANGES[range].color;
};

/**
 * Validates email address
 */
export const validateEmail = (email: string): boolean => {
  return REGEX_PATTERNS.email.test(email);
};

/**
 * Validates phone number
 */
export const validatePhone = (phone: string): boolean => {
  return REGEX_PATTERNS.phone.test(phone);
};

/**
 * Validates password strength
 */
export const validatePassword = (password: string): boolean => {
  return REGEX_PATTERNS.password.test(password);
};

/**
 * Formats currency in Egyptian Pounds
 */
export const formatEGP = (amount: number): string => {
  return `EGP ${amount.toLocaleString()}`;
};

/**
 * Formats date to readable string
 */
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
};

/**
 * Calculates credit utilization percentage
 */
export const calculateUtilization = (balance: number, limit: number): number => {
  if (limit === 0) return 0;
  return Math.round((balance / limit) * 100);
};

/**
 * Determines if device is mobile based on screen width
 */
export const isMobileDevice = (screenWidth: number): boolean => {
  return screenWidth < 500;
};

/**
 * Debounce function for search and input handling
 */
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: number | undefined;
  return (...args: Parameters<T>) => {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay) as unknown as number;
  };
};

/**
 * Generates unique ID for components
 */
export const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};
