// Constants for the Kepler Credit Score Application

export const COLORS = {
  primary: '#8B5CF6',
  secondary: '#2563EB',
  success: '#059669',
  warning: '#D97706',
  error: '#EF4444',
  background: '#F9FAFB',
  white: '#FFFFFF',
  gray: {
    50: '#F9FAFB',
    100: '#F3F4F6',
    200: '#E5E7EB',
    300: '#D1D5DB',
    400: '#9CA3AF',
    500: '#6B7280',
    600: '#4B5563',
    700: '#374151',
    800: '#1F2937',
    900: '#111827',
  },
} as const;

export const CREDIT_SCORE_RANGES = {
  poor: { min: 300, max: 549, color: COLORS.error },
  fair: { min: 550, max: 649, color: COLORS.warning },
  good: { min: 650, max: 749, color: COLORS.secondary },
  excellent: { min: 750, max: 850, color: COLORS.success },
} as const;

export const EGYPTIAN_PRICING = {
  weeklyReports: 95, // EGP
  currency: 'EGP',
} as const;

export const SCREEN_DIMENSIONS = {
  mobile: 500,
  tablet: 768,
} as const;

export const REGEX_PATTERNS = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  phone: /^[+]?[\d\s\-\(\)]+$/,
  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/,
} as const;

export const API_ENDPOINTS = {
  creditScore: '/api/credit-score',
  notifications: '/api/notifications',
  userProfile: '/api/profile',
  weeklyReports: '/api/weekly-reports',
} as const;
