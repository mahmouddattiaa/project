import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  Modal,
} from 'react-native';
import { ChevronRight, CreditCard, Calendar, DollarSign, TrendingUp, CircleAlert as AlertCircle, CircleCheck as CheckCircle, Mail, Download, Building2, Banknote, X, ArrowUpRight, ArrowDownLeft, Clock, Percent, MapPin, Gift, AlertTriangle } from 'lucide-react-native';
import * as MailComposer from 'expo-mail-composer';
import * as FileSystem from 'expo-file-system';

const creditAccounts = [
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
    dueDate: '2025-01-15',
    lastPayment: { amount: 250, date: '2024-12-15' },
    rewardsEarned: 2450,
    transactions: [
      { date: '2024-12-28', description: 'Amazon Purchase', amount: -89.99, type: 'purchase' },
      { date: '2024-12-25', description: 'Restaurant', amount: -65.50, type: 'purchase' },
      { date: '2024-12-20', description: 'Gas Station', amount: -45.00, type: 'purchase' },
      { date: '2024-12-15', description: 'Payment Received', amount: 250.00, type: 'payment' },
      { date: '2024-12-10', description: 'Grocery Store', amount: -125.75, type: 'purchase' },
    ]
  },
  {
    id: 'cc2',
    type: 'Credit Card',
    name: 'American Express Gold',
    balance: 0,
    limit: 3000,
    utilization: 0,
    paymentStatus: 'On Time',
    opened: '2020-08-22',
    status: 'Open',
    bank: 'American Express',
    apr: 22.99,
    minPayment: 0,
    dueDate: '2025-01-22',
    lastPayment: { amount: 450, date: '2024-12-22' },
    rewardsEarned: 1875,
    transactions: [
      { date: '2024-12-22', description: 'Payment Received', amount: 450.00, type: 'payment' },
      { date: '2024-12-18', description: 'Travel Booking', amount: -320.00, type: 'purchase' },
      { date: '2024-12-15', description: 'Hotel', amount: -130.00, type: 'purchase' },
    ]
  },
  {
    id: 'al1',
    type: 'Auto Loan',
    name: 'Toyota Financial',
    balance: 15750,
    limit: 25000,
    utilization: 63,
    paymentStatus: 'On Time',
    opened: '2021-06-10',
    status: 'Open',
    bank: 'Toyota Financial',
    apr: 4.5,
    minPayment: 485,
    dueDate: '2025-01-10',
    lastPayment: { amount: 485, date: '2024-12-10' },
    vehicleInfo: { year: '2021', make: 'Toyota', model: 'Camry', vin: 'JT***********1234' },
    transactions: [
      { date: '2024-12-10', description: 'Auto Loan Payment', amount: 485.00, type: 'payment' },
      { date: '2024-11-10', description: 'Auto Loan Payment', amount: 485.00, type: 'payment' },
      { date: '2024-10-10', description: 'Auto Loan Payment', amount: 485.00, type: 'payment' },
    ]
  },
  {
    id: 'pl1',
    type: 'Personal Loan',
    name: 'SoFi Personal Loan',
    balance: 0,
    limit: 10000,
    utilization: 0,
    paymentStatus: 'Paid Off',
    opened: '2018-12-05',
    status: 'Closed',
    bank: 'SoFi',
    apr: 8.99,
    paidOffDate: '2023-11-15',
    originalAmount: 10000,
    totalPaid: 11250,
    transactions: [
      { date: '2023-11-15', description: 'Final Payment', amount: 425.00, type: 'payment' },
      { date: '2023-10-15', description: 'Monthly Payment', amount: 425.00, type: 'payment' },
    ]
  },
];

const liabilityAccounts = [
  {
    id: 'ca1',
    type: 'Checking Account',
    name: 'Chase Total Checking',
    balance: 5250,
    bank: 'Chase Bank',
    accountNumber: '****1234',
    status: 'Active',
    interestRate: 0.01,
    opened: '2018-05-12',
    branchLocation: 'Downtown Cairo Branch',
    accountFeatures: ['Online Banking', 'Mobile Deposits', 'ATM Access'],
    transactions: [
      { date: '2024-12-30', description: 'Salary Deposit', amount: 3500.00, type: 'deposit' },
      { date: '2024-12-28', description: 'ATM Withdrawal', amount: -200.00, type: 'withdrawal' },
      { date: '2024-12-25', description: 'Online Transfer', amount: -150.00, type: 'transfer' },
      { date: '2024-12-22', description: 'Direct Deposit', amount: 500.00, type: 'deposit' },
      { date: '2024-12-20', description: 'Utility Payment', amount: -85.50, type: 'payment' },
      { date: '2024-12-18', description: 'ATM Withdrawal', amount: -100.00, type: 'withdrawal' },
    ]
  },
  {
    id: 'sa1',
    type: 'Savings Account',
    name: 'High Yield Savings',
    balance: 15000,
    bank: 'Marcus by Goldman Sachs',
    accountNumber: '****5678',
    status: 'Active',
    interestRate: 4.25,
    opened: '2020-03-18',
    branchLocation: 'Online Only',
    accountFeatures: ['High Interest Rate', 'No Minimum Balance', 'Online Banking'],
    transactions: [
      { date: '2024-12-31', description: 'Interest Payment', amount: 52.08, type: 'interest' },
      { date: '2024-12-15', description: 'Transfer from Checking', amount: 1000.00, type: 'deposit' },
      { date: '2024-11-30', description: 'Interest Payment', amount: 51.25, type: 'interest' },
      { date: '2024-11-15', description: 'Transfer from Checking', amount: 500.00, type: 'deposit' },
    ]
  },
  {
    id: 'cd1',
    type: 'Certificate of Deposit',
    name: 'CD 12-Month Term',
    balance: 25000,
    bank: 'Bank of America',
    accountNumber: '****9012',
    status: 'Active',
    interestRate: 5.0,
    opened: '2024-06-15',
    maturity: '2025-06-15',
    branchLocation: 'Zamalek Branch',
    accountFeatures: ['Fixed Rate', 'FDIC Insured', 'Auto Renewal Option'],
    originalDeposit: 25000,
    projectedEarnings: 1250,
    transactions: [
      { date: '2024-06-15', description: 'Initial Deposit', amount: 25000.00, type: 'deposit' },
    ]
  },
  {
    id: 'ca2',
    type: 'Checking Account',
    name: 'Business Checking',
    balance: 8750,
    bank: 'Wells Fargo',
    accountNumber: '****3456',
    status: 'Active',
    interestRate: 0.05,
    opened: '2022-01-20',
    branchLocation: 'Maadi Business Center',
    accountFeatures: ['Business Banking', 'Wire Transfers', 'Merchant Services'],
    transactions: [
      { date: '2024-12-29', description: 'Client Payment', amount: 2500.00, type: 'deposit' },
      { date: '2024-12-27', description: 'Office Rent', amount: -1200.00, type: 'payment' },
      { date: '2024-12-24', description: 'Equipment Purchase', amount: -450.00, type: 'purchase' },
      { date: '2024-12-20', description: 'Service Fee', amount: -15.00, type: 'fee' },
    ]
  },
];

const paymentHistory = [
  { month: 'Dec 2024', status: 'on-time', accounts: 4 },
  { month: 'Nov 2024', status: 'on-time', accounts: 4 },
  { month: 'Oct 2024', status: 'on-time', accounts: 4 },
  { month: 'Sep 2024', status: 'late', accounts: 3 },
  { month: 'Aug 2024', status: 'on-time', accounts: 4 },
  { month: 'Jul 2024', status: 'on-time', accounts: 4 },
];

export default function ReportScreen() {
  const [activeSection, setActiveSection] = useState('liabilities');
  const [selectedAccount, setSelectedAccount] = useState<any>(null);
  const [showAccountDetails, setShowAccountDetails] = useState(false);
  const [showTariffModal, setShowTariffModal] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [agreedToTariff, setAgreedToTariff] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [selectedPaymentAccount, setSelectedPaymentAccount] = useState<any>(null);

  // Email configuration for automatic sending
  const senderEmail = 'focusritual1@gmail.com';
  const recipientEmail = 'mahmouddattiaa7@gmail.com';

  const getUtilizationColor = (utilization: number) => {
    if (utilization <= 10) return '#8B5CF6';
    if (utilization <= 30) return '#EAB308';
    return '#EF4444';
  };

  const getStatusIcon = (status: string) => {
    return status === 'on-time' ? (
      <CheckCircle size={16} color="#8B5CF6" />
    ) : (
      <AlertCircle size={16} color="#EF4444" />
    );
  };

  const getAccountIcon = (type: string) => {
    switch (type) {
      case 'Checking Account':
      case 'Savings Account':
        return <Banknote size={20} color="#8B5CF6" />;
      case 'Certificate of Deposit':
        return <Building2 size={20} color="#8B5CF6" />;
      default:
        return <CreditCard size={20} color="#8B5CF6" />;
    }
  };

  const sendPDFReport = () => {
    setShowTariffModal(true);
  };

  const closeTariffModal = () => {
    setShowTariffModal(false);
    setAgreedToTariff(false);
    setAgreedToTerms(false);
    setSelectedPaymentAccount(null);
  };

  const openTermsModal = () => {
    setShowTermsModal(true);
  };

  const closeTermsModal = () => {
    setShowTermsModal(false);
  };

  const getAllPaymentAccounts = () => {
    const creditCards = creditAccounts.filter(account => account.status === 'Open');
    const bankAccounts = liabilityAccounts.filter(account => account.status === 'Active');
    return [...creditCards, ...bankAccounts];
  };

  const sendReportInLanguage = async (language: 'english' | 'arabic') => {
    if (!agreedToTariff || !agreedToTerms || !selectedPaymentAccount) {
      let message = 'Please complete the following requirements:\n';
      if (!agreedToTariff) message += '• Agree to the £25.00 tariff\n';
      if (!agreedToTerms) message += '• Accept Terms & Conditions\n';
      if (!selectedPaymentAccount) message += '• Select a payment account';
      
      Alert.alert('Requirements Not Met', message);
      return;
    }

    try {
      // Close the tariff modal first
      closeTariffModal();

      // Show processing alert
      Alert.alert(
        'Processing Report',
        'Your report is being processed and will be sent automatically...',
        [{ text: 'OK' }]
      );

      // Simulate automatic email sending (replace with actual backend call)
      await sendEmailAutomatically(language, selectedPaymentAccount);

    } catch (error) {
      console.error('Error sending report:', error);
      Alert.alert(
        'Error Sending Report', 
        'There was an issue sending your report. Please try again or contact support if the problem persists.',
        [{ text: 'OK' }]
      );
    }
  };

  // Function to handle automatic email sending
  const sendEmailAutomatically = async (language: 'english' | 'arabic', paymentAccount: any) => {
    try {
      // Prepare email data for backend API
      const emailData = {
        language: language,
        paymentAccount: {
          name: paymentAccount.name,
          type: paymentAccount.type
        }
      };

      // Call backend API to send email
      const response = await fetch('http://localhost:3000/api/send-report-local', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(emailData)
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.details || result.error || 'Failed to send email');
      }

      console.log('Email sent successfully:', result.messageId);

      // Show success message
      const accountType = paymentAccount.type.includes('Credit') ? 'credit card' : 'bank account';
      Alert.alert(
        'Report Sent Successfully! ✅',
        `Your ${language === 'english' ? 'English' : 'Arabic'} credit report has been automatically sent from ${senderEmail} to ${recipientEmail}.\n\nThe £25.00 tariff has been charged to your ${accountType}: ${paymentAccount.name}.`,
        [{ text: 'OK' }]
      );

    } catch (error) {
      console.error('Error in automatic email sending:', error);
      
      // Fallback: Show simulation message if backend is not available
      Alert.alert(
        'Report Processing Complete! 📧',
        `Your ${language === 'english' ? 'English' : 'Arabic'} credit report would be automatically sent from ${senderEmail} to ${recipientEmail}.\n\nNote: To enable actual email sending, please start the email server.\n\nThe £25.00 tariff has been processed for your ${paymentAccount.type.includes('Credit') ? 'credit card' : 'bank account'}: ${paymentAccount.name}.`,
        [{ text: 'OK' }]
      );
    }
  };

  const openAccountDetails = (account: any) => {
    setSelectedAccount(account);
    setShowAccountDetails(true);
  };

  const closeAccountDetails = () => {
    setSelectedAccount(null);
    setShowAccountDetails(false);
  };

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'deposit':
      case 'interest':
      case 'payment':
        return <ArrowDownLeft size={16} color="#8B5CF6" />;
      case 'withdrawal':
      case 'purchase':
      case 'fee':
        return <ArrowUpRight size={16} color="#EF4444" />;
      default:
        return <ArrowUpRight size={16} color="#6B7280" />;
    }
  };

  const formatTransactionAmount = (amount: number, type: string) => {
    const color = amount > 0 ? '#8B5CF6' : '#EF4444';
    const sign = amount > 0 ? '+' : '';
    return (
      <Text style={[styles.transactionAmount, { color }]}>
        {sign}£{Math.abs(amount).toLocaleString()}
      </Text>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View>
            <Text style={styles.headerTitle}>Financial Report</Text>
            <Text style={styles.headerSubtitle}>Complete financial overview</Text>
          </View>
          <TouchableOpacity style={styles.emailButton} onPress={sendPDFReport}>
            <Mail size={20} color="#FFFFFF" />
            <Text style={styles.emailButtonText}>Full Report</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeSection === 'liabilities' && styles.activeTab]}
          onPress={() => setActiveSection('liabilities')}
        >
          <Text style={[styles.tabText, activeSection === 'liabilities' && styles.activeTabText]}>
            Bank Accounts
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeSection === 'credit' && styles.activeTab]}
          onPress={() => setActiveSection('credit')}
        >
          <Text style={[styles.tabText, activeSection === 'credit' && styles.activeTabText]}>
            Credit Accounts
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeSection === 'history' && styles.activeTab]}
          onPress={() => setActiveSection('history')}
        >
          <Text style={[styles.tabText, activeSection === 'history' && styles.activeTabText]}>
            Payment History
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {activeSection === 'liabilities' && (
          <View>
            <View style={styles.summaryCard}>
              <Text style={styles.summaryTitle}>Bank Accounts Summary</Text>
              <View style={styles.summaryStats}>
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>4</Text>
                  <Text style={styles.statLabel}>Total Accounts</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>4</Text>
                  <Text style={styles.statLabel}>Active Accounts</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>£54,000</Text>
                  <Text style={styles.statLabel}>Total Balance</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>3</Text>
                  <Text style={styles.statLabel}>Banks</Text>
                </View>
              </View>
            </View>

            {liabilityAccounts.map((account, index) => (
              <TouchableOpacity key={index} onPress={() => openAccountDetails(account)}>
                <View style={styles.accountCard}>
                  <View style={styles.accountHeader}>
                    <View style={styles.accountIcon}>
                      {getAccountIcon(account.type)}
                    </View>
                    <View style={styles.accountInfo}>
                      <Text style={styles.accountName}>{account.name}</Text>
                      <Text style={styles.accountType}>{account.type} • {account.bank}</Text>
                    </View>
                    <ChevronRight size={20} color="#9CA3AF" />
                  </View>

                  <View style={styles.accountDetails}>
                    <View style={styles.accountRow}>
                      <Text style={styles.accountLabel}>Balance</Text>
                      <Text style={styles.accountValue}>£{account.balance.toLocaleString()}</Text>
                    </View>
                    <View style={styles.accountRow}>
                      <Text style={styles.accountLabel}>Account Number</Text>
                      <Text style={styles.accountValue}>{account.accountNumber}</Text>
                    </View>
                    <View style={styles.accountRow}>
                      <Text style={styles.accountLabel}>Status</Text>
                      <Text style={[styles.accountValue, { color: '#8B5CF6' }]}>
                        {account.status}
                      </Text>
                    </View>
                    {account.maturity && (
                      <View style={styles.accountRow}>
                        <Text style={styles.accountLabel}>Maturity Date</Text>
                        <Text style={styles.accountValue}>{account.maturity}</Text>
                      </View>
                    )}
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {activeSection === 'credit' && (
          <View>
            <View style={styles.summaryCard}>
              <Text style={styles.summaryTitle}>Credit Accounts Summary</Text>
              <View style={styles.summaryStats}>
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>4</Text>
                  <Text style={styles.statLabel}>Total Accounts</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>3</Text>
                  <Text style={styles.statLabel}>Open Accounts</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>£17,000</Text>
                  <Text style={styles.statLabel}>Total Balance</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>£43,000</Text>
                  <Text style={styles.statLabel}>Total Credit</Text>
                </View>
              </View>
            </View>

            {creditAccounts.map((account, index) => (
              <TouchableOpacity key={index} onPress={() => openAccountDetails(account)}>
                <View style={styles.accountCard}>
                  <View style={styles.accountHeader}>
                    <View style={styles.accountIcon}>
                      <CreditCard size={20} color="#8B5CF6" />
                    </View>
                    <View style={styles.accountInfo}>
                      <Text style={styles.accountName}>{account.name}</Text>
                      <Text style={styles.accountType}>{account.type} • {account.bank}</Text>
                    </View>
                    <ChevronRight size={20} color="#9CA3AF" />
                  </View>

                  <View style={styles.accountDetails}>
                    <View style={styles.accountRow}>
                      <Text style={styles.accountLabel}>Balance</Text>
                      <Text style={styles.accountValue}>£{account.balance.toLocaleString()}</Text>
                    </View>
                    <View style={styles.accountRow}>
                      <Text style={styles.accountLabel}>Credit Limit</Text>
                      <Text style={styles.accountValue}>£{account.limit.toLocaleString()}</Text>
                    </View>
                    <View style={styles.accountRow}>
                      <Text style={styles.accountLabel}>Utilization</Text>
                      <Text style={[styles.accountValue, { color: getUtilizationColor(account.utilization) }]}>
                        {account.utilization}%
                      </Text>
                    </View>
                    <View style={styles.accountRow}>
                      <Text style={styles.accountLabel}>Payment Status</Text>
                      <Text style={[
                        styles.accountValue,
                        { color: account.paymentStatus === 'On Time' ? '#8B5CF6' : '#EF4444' }
                      ]}>
                        {account.paymentStatus}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.utilizationBar}>
                    <View
                      style={[
                        styles.utilizationFill,
                        {
                          width: `${account.utilization}%`,
                          backgroundColor: getUtilizationColor(account.utilization),
                        },
                      ]}
                    />
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {activeSection === 'history' && (
          <View>
            <View style={styles.historyCard}>
              <Text style={styles.cardTitle}>Payment History (6 months)</Text>
              <Text style={styles.cardSubtitle}>
                Payment history makes up 35% of your credit score
              </Text>

              <View style={styles.historyTimeline}>
                {paymentHistory.map((month, index) => (
                  <View key={index} style={styles.historyItem}>
                    <View style={styles.historyDate}>
                      <Calendar size={16} color="#6B7280" />
                      <Text style={styles.historyMonth}>{month.month}</Text>
                    </View>
                    <View style={styles.historyStatus}>
                      {getStatusIcon(month.status)}
                      <Text style={[
                        styles.historyStatusText,
                        { color: month.status === 'on-time' ? '#8B5CF6' : '#EF4444' }
                      ]}>
                        {month.status === 'on-time' ? 'On Time' : 'Late Payment'}
                      </Text>
                    </View>
                    <Text style={styles.historyAccounts}>
                      {month.accounts} accounts
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          </View>
        )}
      </ScrollView>

      {/* Tariff Agreement Modal */}
      <Modal
        visible={showTariffModal}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={closeTariffModal}
      >
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={closeTariffModal} style={styles.closeButton}>
              <X size={24} color="#111827" />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Report Tariff Notice</Text>
            <View style={{ width: 24 }} />
          </View>

          <ScrollView style={styles.modalContent} showsVerticalScrollIndicator={false}>
            {/* Warning Section */}
            <View style={styles.warningCard}>
              <View style={styles.warningHeader}>
                <AlertTriangle size={24} color="#EAB308" />
                <Text style={styles.warningTitle}>Important Notice</Text>
              </View>
              <Text style={styles.warningText}>
                A tariff of £25.00 will be applied to your account for sending a comprehensive credit report via email. This fee covers the detailed analysis, formatting, and secure delivery of your complete financial profile.
              </Text>
            </View>

            {/* Report Details */}
            <View style={styles.reportDetailsCard}>
              <Text style={styles.reportDetailsTitle}>What's Included:</Text>
              <View style={styles.reportFeature}>
                <CheckCircle size={16} color="#8B5CF6" />
                <Text style={styles.reportFeatureText}>Complete credit history analysis</Text>
              </View>
              <View style={styles.reportFeature}>
                <CheckCircle size={16} color="#8B5CF6" />
                <Text style={styles.reportFeatureText}>Account details and transaction history</Text>
              </View>
              <View style={styles.reportFeature}>
                <CheckCircle size={16} color="#8B5CF6" />
                <Text style={styles.reportFeatureText}>Credit score breakdown and factors</Text>
              </View>
              <View style={styles.reportFeature}>
                <CheckCircle size={16} color="#8B5CF6" />
                <Text style={styles.reportFeatureText}>Personalized recommendations</Text>
              </View>
              <View style={styles.reportFeature}>
                <CheckCircle size={16} color="#8B5CF6" />
                <Text style={styles.reportFeatureText}>Secure PDF format with encryption</Text>
              </View>
            </View>

            {/* Agreement Checkboxes */}
            <View style={styles.agreementSection}>
              <TouchableOpacity 
                style={styles.checkboxRow}
                onPress={() => setAgreedToTariff(!agreedToTariff)}
              >
                <View style={[styles.checkbox, agreedToTariff && styles.checkboxChecked]}>
                  {agreedToTariff && <CheckCircle size={16} color="#FFFFFF" />}
                </View>
                <Text style={styles.checkboxText}>
                  I agree to the £25.00 tariff for the comprehensive credit report
                </Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.checkboxRow}
                onPress={() => setAgreedToTerms(!agreedToTerms)}
              >
                <View style={[styles.checkbox, agreedToTerms && styles.checkboxChecked]}>
                  {agreedToTerms && <CheckCircle size={16} color="#FFFFFF" />}
                </View>
                <View style={styles.termsTextContainer}>
                  <Text style={styles.checkboxText}>
                    I agree to the{' '}
                    <Text style={styles.termsLink} onPress={openTermsModal}>
                      Terms & Conditions and Privacy Policy
                    </Text>
                  </Text>
                </View>
              </TouchableOpacity>
            </View>

            {/* Payment Account Selection */}
            <View style={styles.paymentSection}>
              <Text style={styles.paymentSectionTitle}>Select Payment Account:</Text>
              <Text style={styles.paymentSectionSubtitle}>
                Choose which account to charge the £25.00 tariff to
              </Text>
              
              {getAllPaymentAccounts().map((account, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.paymentAccountCard,
                    selectedPaymentAccount?.id === account.id && styles.paymentAccountCardSelected
                  ]}
                  onPress={() => setSelectedPaymentAccount(account)}
                >
                  <View style={styles.paymentAccountHeader}>
                    <View style={styles.accountIcon}>
                      {getAccountIcon(account.type)}
                    </View>
                    <View style={styles.paymentAccountInfo}>
                      <Text style={styles.paymentAccountName}>{account.name}</Text>
                      <Text style={styles.paymentAccountType}>
                        {account.type} • {account.bank}
                      </Text>
                      {account.balance !== undefined && (
                        <Text style={styles.paymentAccountBalance}>
                          Available: £{account.balance.toLocaleString()}
                        </Text>
                      )}
                      {(account as any).limit && (
                        <Text style={styles.paymentAccountLimit}>
                          Limit: £{(account as any).limit.toLocaleString()}
                        </Text>
                      )}
                    </View>
                    <View style={[
                      styles.radioButton,
                      selectedPaymentAccount?.id === account.id && styles.radioButtonSelected
                    ]}>
                      {selectedPaymentAccount?.id === account.id && (
                        <View style={styles.radioButtonInner} />
                      )}
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </View>

            {/* Language Selection Buttons */}
            <View style={styles.languageSection}>
              <Text style={styles.languageSectionTitle}>Select Report Language:</Text>
              
              <TouchableOpacity 
                style={[
                  styles.languageButton, 
                  (!agreedToTariff || !agreedToTerms || !selectedPaymentAccount) && styles.languageButtonDisabled
                ]}
                onPress={() => sendReportInLanguage('english')}
                disabled={!agreedToTariff || !agreedToTerms || !selectedPaymentAccount}
              >
                <Text style={[
                  styles.languageButtonText,
                  (!agreedToTariff || !agreedToTerms || !selectedPaymentAccount) && styles.languageButtonTextDisabled
                ]}>
                  Send English Report
                </Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={[
                  styles.languageButton, 
                  (!agreedToTariff || !agreedToTerms || !selectedPaymentAccount) && styles.languageButtonDisabled
                ]}
                onPress={() => sendReportInLanguage('arabic')}
                disabled={!agreedToTariff || !agreedToTerms || !selectedPaymentAccount}
              >
                <Text style={[
                  styles.languageButtonText,
                  (!agreedToTariff || !agreedToTerms || !selectedPaymentAccount) && styles.languageButtonTextDisabled
                ]}>
                  إرسال التقرير بالعربية
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </SafeAreaView>
      </Modal>

      {/* Terms & Conditions Modal */}
      <Modal
        visible={showTermsModal}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={closeTermsModal}
      >
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={closeTermsModal} style={styles.closeButton}>
              <X size={24} color="#111827" />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Terms & Conditions</Text>
            <View style={{ width: 24 }} />
          </View>

          <ScrollView style={styles.modalContent} showsVerticalScrollIndicator={false}>
            {/* Data Security Warning */}
            <View style={styles.warningCard}>
              <View style={styles.warningHeader}>
                <AlertTriangle size={24} color="#EAB308" />
                <Text style={styles.warningTitle}>Confidential Information</Text>
              </View>
              <Text style={styles.warningText}>
                This credit report contains highly sensitive personal and financial information. Do not share this document with unauthorized parties. Keep it secure and confidential at all times.
              </Text>
            </View>

            {/* Terms Section */}
            <View style={styles.termsSection}>
              <Text style={styles.termsSectionTitle}>Data Collection & Usage</Text>
              <Text style={styles.termsText}>
                By agreeing to these terms, you acknowledge that we have the right to collect, process, and store your financial data as required for credit reporting services. This includes but is not limited to:
              </Text>
              <View style={styles.termsList}>
                <Text style={styles.termsListItem}>• Personal identification information</Text>
                <Text style={styles.termsListItem}>• Account balances and transaction history</Text>
                <Text style={styles.termsListItem}>• Credit utilization and payment patterns</Text>
                <Text style={styles.termsListItem}>• Employment and income verification data</Text>
                <Text style={styles.termsListItem}>• Credit inquiries and applications</Text>
              </View>
            </View>

            <View style={styles.termsSection}>
              <Text style={styles.termsSectionTitle}>Report Confidentiality</Text>
              <Text style={styles.termsText}>
                Your credit report is generated exclusively for your personal use. You agree to:
              </Text>
              <View style={styles.termsList}>
                <Text style={styles.termsListItem}>• Keep the report confidential and secure</Text>
                <Text style={styles.termsListItem}>• Not share with unauthorized third parties</Text>
                <Text style={styles.termsListItem}>• Use the report only for legitimate financial purposes</Text>
                <Text style={styles.termsListItem}>• Report any unauthorized access immediately</Text>
              </View>
            </View>

            <View style={styles.termsSection}>
              <Text style={styles.termsSectionTitle}>Data Retention & Rights</Text>
              <Text style={styles.termsText}>
                We retain your data in accordance with regulatory requirements and industry standards. You have the right to:
              </Text>
              <View style={styles.termsList}>
                <Text style={styles.termsListItem}>• Request data correction or updates</Text>
                <Text style={styles.termsListItem}>• Access your personal information</Text>
                <Text style={styles.termsListItem}>• Request data deletion (subject to legal requirements)</Text>
                <Text style={styles.termsListItem}>• File complaints with regulatory authorities</Text>
              </View>
            </View>

            <View style={styles.termsSection}>
              <Text style={styles.termsSectionTitle}>Legal Compliance</Text>
              <Text style={styles.termsText}>
                Our services comply with relevant data protection and credit reporting regulations. We may share your information with:
              </Text>
              <View style={styles.termsList}>
                <Text style={styles.termsListItem}>• Authorized financial institutions</Text>
                <Text style={styles.termsListItem}>• Regulatory bodies and government agencies</Text>
                <Text style={styles.termsListItem}>• Legal authorities when required by law</Text>
                <Text style={styles.termsListItem}>• Third-party service providers (under strict confidentiality)</Text>
              </View>
            </View>

            <View style={styles.termsSection}>
              <Text style={styles.termsSectionTitle}>Liability & Disputes</Text>
              <Text style={styles.termsText}>
                While we strive for accuracy, you acknowledge that credit information may change frequently. We are not liable for decisions made based on this report. Any disputes should be reported within 30 days of report generation.
              </Text>
            </View>

            <View style={styles.termsSection}>
              <Text style={styles.termsSectionTitle}>Contact Information</Text>
              <Text style={styles.termsText}>
                For questions about these terms or your data rights, contact us at:
              </Text>
              <Text style={styles.contactInfo}>
                Email: privacy@creditbureau.com{'\n'}
                Phone: +1 (555) 123-4567{'\n'}
                Address: 123 Financial Street, Credit City, CC 12345
              </Text>
            </View>

            <View style={styles.acceptTermsButton}>
              <TouchableOpacity 
                style={styles.languageButton}
                onPress={closeTermsModal}
              >
                <Text style={styles.languageButtonText}>I Understand</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </SafeAreaView>
      </Modal>

      {/* Account Details Modal */}
      <Modal
        visible={showAccountDetails}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={closeAccountDetails}
      >
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={closeAccountDetails} style={styles.closeButton}>
              <X size={24} color="#111827" />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Account Details</Text>
            <View style={{ width: 24 }} />
          </View>

          {selectedAccount && (
            <ScrollView style={styles.modalContent} showsVerticalScrollIndicator={false}>
              {/* Account Summary */}
              <View style={styles.modalSummaryCard}>
                <View style={styles.modalAccountHeader}>
                  <View style={styles.accountIcon}>
                    {getAccountIcon(selectedAccount.type)}
                  </View>
                  <View style={styles.modalAccountInfo}>
                    <Text style={styles.modalAccountName}>{selectedAccount.name}</Text>
                    <Text style={styles.modalAccountType}>
                      {selectedAccount.type} • {selectedAccount.bank}
                    </Text>
                    <Text style={styles.modalAccountBalance}>
                      £{selectedAccount.balance.toLocaleString()}
                    </Text>
                  </View>
                </View>
              </View>

              {/* Account Information */}
              <View style={styles.detailSection}>
                <Text style={styles.sectionTitle}>Account Information</Text>
                <View style={styles.detailCard}>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Account Number</Text>
                    <Text style={styles.detailValue}>{selectedAccount.accountNumber}</Text>
                  </View>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Status</Text>
                    <Text style={[styles.detailValue, { color: '#8B5CF6' }]}>
                      {selectedAccount.status}
                    </Text>
                  </View>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Opened</Text>
                    <Text style={styles.detailValue}>{selectedAccount.opened}</Text>
                  </View>
                  {selectedAccount.interestRate && (
                    <View style={styles.detailRow}>
                      <Text style={styles.detailLabel}>Interest Rate</Text>
                      <Text style={styles.detailValue}>{selectedAccount.interestRate}% APY</Text>
                    </View>
                  )}
                  {selectedAccount.apr && (
                    <View style={styles.detailRow}>
                      <Text style={styles.detailLabel}>APR</Text>
                      <Text style={styles.detailValue}>{selectedAccount.apr}%</Text>
                    </View>
                  )}
                  {selectedAccount.branchLocation && (
                    <View style={styles.detailRow}>
                      <Text style={styles.detailLabel}>Branch</Text>
                      <Text style={styles.detailValue}>{selectedAccount.branchLocation}</Text>
                    </View>
                  )}
                  {selectedAccount.maturity && (
                    <View style={styles.detailRow}>
                      <Text style={styles.detailLabel}>Maturity Date</Text>
                      <Text style={styles.detailValue}>{selectedAccount.maturity}</Text>
                    </View>
                  )}
                </View>
              </View>

              {/* Credit Account Specific Details */}
              {selectedAccount.type.includes('Credit') || selectedAccount.type.includes('Loan') ? (
                <View style={styles.detailSection}>
                  <Text style={styles.sectionTitle}>Credit Details</Text>
                  <View style={styles.detailCard}>
                    {selectedAccount.limit && (
                      <View style={styles.detailRow}>
                        <Text style={styles.detailLabel}>Credit Limit</Text>
                        <Text style={styles.detailValue}>£{selectedAccount.limit.toLocaleString()}</Text>
                      </View>
                    )}
                    {selectedAccount.utilization !== undefined && (
                      <View style={styles.detailRow}>
                        <Text style={styles.detailLabel}>Utilization</Text>
                        <Text style={[styles.detailValue, { color: getUtilizationColor(selectedAccount.utilization) }]}>
                          {selectedAccount.utilization}%
                        </Text>
                      </View>
                    )}
                    {selectedAccount.minPayment && (
                      <View style={styles.detailRow}>
                        <Text style={styles.detailLabel}>Minimum Payment</Text>
                        <Text style={styles.detailValue}>£{selectedAccount.minPayment}</Text>
                      </View>
                    )}
                    {selectedAccount.dueDate && (
                      <View style={styles.detailRow}>
                        <Text style={styles.detailLabel}>Next Due Date</Text>
                        <Text style={styles.detailValue}>{selectedAccount.dueDate}</Text>
                      </View>
                    )}
                    {selectedAccount.lastPayment && (
                      <View style={styles.detailRow}>
                        <Text style={styles.detailLabel}>Last Payment</Text>
                        <Text style={styles.detailValue}>
                          £{selectedAccount.lastPayment.amount} on {selectedAccount.lastPayment.date}
                        </Text>
                      </View>
                    )}
                    {selectedAccount.rewardsEarned && (
                      <View style={styles.detailRow}>
                        <Text style={styles.detailLabel}>Rewards Earned</Text>
                        <Text style={styles.detailValue}>{selectedAccount.rewardsEarned} points</Text>
                      </View>
                    )}
                  </View>
                </View>
              ) : null}

              {/* Account Features */}
              {selectedAccount.accountFeatures && (
                <View style={styles.detailSection}>
                  <Text style={styles.sectionTitle}>Account Features</Text>
                  <View style={styles.detailCard}>
                    {selectedAccount.accountFeatures.map((feature: string, index: number) => (
                      <View key={index} style={styles.featureRow}>
                        <CheckCircle size={16} color="#8B5CF6" />
                        <Text style={styles.featureText}>{feature}</Text>
                      </View>
                    ))}
                  </View>
                </View>
              )}

              {/* Recent Transactions */}
              {selectedAccount.transactions && selectedAccount.transactions.length > 0 && (
                <View style={styles.detailSection}>
                  <Text style={styles.sectionTitle}>Recent Transactions</Text>
                  <View style={styles.detailCard}>
                    {selectedAccount.transactions.map((transaction: any, index: number) => (
                      <View key={index} style={styles.transactionRow}>
                        <View style={styles.transactionIcon}>
                          {getTransactionIcon(transaction.type)}
                        </View>
                        <View style={styles.transactionInfo}>
                          <Text style={styles.transactionDescription}>
                            {transaction.description}
                          </Text>
                          <Text style={styles.transactionDate}>{transaction.date}</Text>
                        </View>
                        {formatTransactionAmount(transaction.amount, transaction.type)}
                      </View>
                    ))}
                  </View>
                </View>
              )}
            </ScrollView>
          )}
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  emailButton: {
    flexDirection: 'row',
    flexWrap:"wrap",
    alignItems: 'center',
    backgroundColor: '#8B5CF6',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 8,
  },
  emailButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 6,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#6B7280',
  },
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    marginHorizontal: 4,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  activeTab: {
    backgroundColor: '#8B5CF6',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
  },
  activeTabText: {
    color: '#FFFFFF',
  },
  content: {
    flex: 1,
  },
  summaryCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginBottom: 16,
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 16,
  },
  summaryStats: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statItem: {
    width: '47%',
    alignItems: 'center',
    marginBottom: 16,
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#8B5CF6',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
  },
  accountCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginBottom: 16,
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  accountHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  accountIcon: {
    width: 40,
    height: 40,
    backgroundColor: '#F3F0FF',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  accountInfo: {
    flex: 1,
  },
  accountName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 2,
  },
  accountType: {
    fontSize: 14,
    color: '#6B7280',
  },
  accountDetails: {
    marginBottom: 16,
  },
  accountRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  accountLabel: {
    fontSize: 14,
    color: '#6B7280',
  },
  accountValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
  },
  utilizationBar: {
    height: 4,
    backgroundColor: '#E5E7EB',
    borderRadius: 2,
  },
  utilizationFill: {
    height: '100%',
    borderRadius: 2,
  },
  historyCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginBottom: 16,
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 8,
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 20,
  },
  historyTimeline: {
    marginTop: 16,
  },
  historyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  historyDate: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  historyMonth: {
    fontSize: 14,
    color: '#374151',
    marginLeft: 8,
  },
  historyStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  historyStatusText: {
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 6,
  },
  historyAccounts: {
    fontSize: 12,
    color: '#9CA3AF',
    width: 80,
    textAlign: 'right',
  },
  // Modal Styles
  modalContainer: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  closeButton: {
    padding: 4,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
  },
  modalContent: {
    flex: 1,
    paddingHorizontal: 20,
  },
  modalSummaryCard: {
    backgroundColor: '#FFFFFF',
    marginTop: 20,
    marginBottom: 16,
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  modalAccountHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  modalAccountInfo: {
    marginLeft: 12,
    flex: 1,
  },
  modalAccountName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 4,
  },
  modalAccountType: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 8,
  },
  modalAccountBalance: {
    fontSize: 28,
    fontWeight: '700',
    color: '#8B5CF6',
  },
  detailSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 12,
  },
  detailCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  detailLabel: {
    fontSize: 14,
    color: '#6B7280',
    flex: 1,
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
    textAlign: 'right',
    flex: 1,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  featureText: {
    fontSize: 14,
    color: '#374151',
    marginLeft: 8,
  },
  transactionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  transactionIcon: {
    width: 32,
    height: 32,
    backgroundColor: '#F3F4F6',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  transactionInfo: {
    flex: 1,
  },
  transactionDescription: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 2,
  },
  transactionDate: {
    fontSize: 12,
    color: '#6B7280',
  },
  transactionAmount: {
    fontSize: 14,
    fontWeight: '700',
  },
  // Tariff Modal Styles
  warningCard: {
    backgroundColor: '#FEF3C7',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#F59E0B',
  },
  warningHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  warningTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#92400E',
    marginLeft: 8,
  },
  warningText: {
    fontSize: 14,
    color: '#78350F',
    lineHeight: 20,
  },
  reportDetailsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  reportDetailsTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 16,
  },
  reportFeature: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
  },
  reportFeatureText: {
    fontSize: 14,
    color: '#374151',
    marginLeft: 8,
  },
  agreementSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 12,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#D1D5DB',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    marginTop: 2,
  },
  checkboxChecked: {
    backgroundColor: '#8B5CF6',
    borderColor: '#8B5CF6',
  },
  checkboxText: {
    fontSize: 14,
    color: '#374151',
    flex: 1,
    lineHeight: 20,
  },
  languageSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  languageSectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 16,
  },
  languageButton: {
    backgroundColor: '#8B5CF6',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 12,
  },
  languageButtonDisabled: {
    backgroundColor: '#D1D5DB',
  },
  languageButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  languageButtonTextDisabled: {
    color: '#9CA3AF',
  },
  // Terms & Conditions Styles
  termsTextContainer: {
    flex: 1,
  },
  termsLink: {
    color: '#8B5CF6',
    textDecorationLine: 'underline',
    fontWeight: '600',
  },
  // Payment Account Selection Styles
  paymentSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  paymentSectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 8,
  },
  paymentSectionSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 16,
  },
  paymentAccountCard: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },
  paymentAccountCardSelected: {
    borderColor: '#8B5CF6',
    backgroundColor: '#F3F0FF',
  },
  paymentAccountHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  paymentAccountInfo: {
    flex: 1,
    marginLeft: 12,
  },
  paymentAccountName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 2,
  },
  paymentAccountType: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 2,
  },
  paymentAccountBalance: {
    fontSize: 12,
    color: '#8B5CF6',
    fontWeight: '600',
  },
  paymentAccountLimit: {
    fontSize: 12,
    color: '#6B7280',
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#D1D5DB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioButtonSelected: {
    borderColor: '#8B5CF6',
  },
  radioButtonInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#8B5CF6',
  },
  // Terms Modal Styles
  termsSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  termsSectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 12,
  },
  termsText: {
    fontSize: 14,
    color: '#374151',
    lineHeight: 20,
    marginBottom: 12,
  },
  termsList: {
    marginLeft: 8,
  },
  termsListItem: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 22,
    marginBottom: 4,
  },
  contactInfo: {
    fontSize: 14,
    color: '#8B5CF6',
    fontWeight: '600',
    marginTop: 8,
    lineHeight: 20,
  },
  acceptTermsButton: {
    marginTop: 20,
    marginBottom: 32,
  },
});