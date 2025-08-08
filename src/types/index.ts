// Types for the Kepler Credit Score Application

export interface CreditScore {
  score: number;
  range: 'poor' | 'fair' | 'good' | 'excellent';
  lastUpdated: string;
  trend: 'up' | 'down' | 'stable';
}

export interface CreditAccount {
  id: string;
  type: 'Credit Card' | 'Loan' | 'Mortgage';
  name: string;
  balance: number;
  limit?: number;
  utilization?: number;
  paymentStatus: 'On Time' | 'Late' | 'Missed';
  opened: string;
  status: 'Open' | 'Closed';
  bank: string;
  apr: number;
  minPayment: number;
}

export interface Notification {
  id: string;
  type: 'alert' | 'info' | 'success';
  title: string;
  description: string;
  time: string;
}

export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  memberSince: string;
  creditScore: number;
  accountsMonitored: number;
}

export interface NotificationSettings {
  alerts: boolean;
  email: boolean;
  push: boolean;
  weekly: boolean;
}

export interface TariffModalState {
  visible: boolean;
  acceptedTerms: boolean;
  selectedAccount: string;
}

export interface QuickAction {
  icon: any;
  title: string;
  subtitle: string;
  color: string;
  backgroundColor: string;
  route?: string;
}

export interface ChatMessage {
  id: string;
  text: string;
  sender: 'ai' | 'user';
}

export interface CreditFactor {
  factor: string;
  score: number;
  impact: 'High' | 'Medium' | 'Low';
  color: string;
  description: string;
}
