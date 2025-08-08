// Mock data for development and testing
import type { Notification, CreditAccount, QuickAction, ChatMessage, CreditFactor } from '../types';
import { FileText, Target, Bell, CircleHelp as HelpCircle } from 'lucide-react-native';

export const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'alert',
    title: 'New hard inquiry detected',
    description: 'Chase Bank performed a credit check on Dec 15',
    time: '1h ago',
  },
  {
    id: '2',
    type: 'info',
    title: 'Credit utilization improved',
    description: 'Your utilization decreased to 15% this month',
    time: '3d ago',
  },
  {
    id: '3',
    type: 'success',
    title: 'Payment successful',
    description: 'Your payment of $45.50 to Capital One was successful.',
    time: '5d ago',
  },
];

export const mockCreditAccounts: CreditAccount[] = [
  {
    id: 'cc1',
    type: 'Credit Card',
    name: 'Chase Sapphire Preferred',
    balance: 1250,
    limit: 5000,
    utilization: 25,
    paymentStatus: 'On Time',
    opened: '2019-03-15',
    status: 'Open',
    bank: 'Chase Bank',
    apr: 18.99,
    minPayment: 35,
  },
  {
    id: 'cc2',
    type: 'Credit Card',
    name: 'Capital One Venture',
    balance: 2100,
    limit: 8000,
    utilization: 26,
    paymentStatus: 'On Time',
    opened: '2020-07-22',
    status: 'Open',
    bank: 'Capital One',
    apr: 21.99,
    minPayment: 55,
  },
];

export const quickActions: QuickAction[] = [
  {
    icon: FileText,
    title: 'Full Report',
    subtitle: 'View details',
    color: '#2563EB',
    backgroundColor: '#EFF6FF',
    route: '/report',
  },
  {
    icon: Target,
    title: 'Set Goals',
    subtitle: 'Improve score',
    color: '#059669',
    backgroundColor: '#ECFDF5',
  },
  {
    icon: Bell,
    title: 'Alerts',
    subtitle: 'Monitor changes',
    color: '#D97706',
    backgroundColor: '#FEF3C7',
    route: '/notifications',
  },
  {
    icon: HelpCircle,
    title: 'Help',
    subtitle: 'Get support',
    color: '#7C3AED',
    backgroundColor: '#F3E8FF',
  },
];

export const mockChatMessages: ChatMessage[] = [
  { id: '1', text: 'Hello! How can I assist you today?', sender: 'ai' },
  { id: '2', text: 'I have a question about my credit score.', sender: 'user' },
  { id: '3', text: 'Of course. What would you like to know?', sender: 'ai' },
];

export const mockCreditFactors: CreditFactor[] = [
  {
    factor: 'Payment History',
    score: 95,
    impact: 'High',
    color: '#059669',
    description: 'Your payment history is excellent',
  },
  {
    factor: 'Credit Utilization',
    score: 75,
    impact: 'High',
    color: '#D97706',
    description: 'Your utilization could be improved',
  },
  {
    factor: 'Credit Age',
    score: 85,
    impact: 'Medium',
    color: '#059669',
    description: 'Good average account age',
  },
  {
    factor: 'Credit Mix',
    score: 70,
    impact: 'Low',
    color: '#D97706',
    description: 'Consider diversifying your credit types',
  },
];
