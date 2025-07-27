import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { ChevronRight, CreditCard, Calendar, DollarSign, TrendingUp, CircleAlert as AlertCircle, CircleCheck as CheckCircle } from 'lucide-react-native';

const creditAccounts = [
  {
    type: 'Credit Card',
    name: 'Chase Sapphire Preferred',
    balance: 1250,
    limit: 5000,
    utilization: 25,
    paymentStatus: 'On Time',
    opened: '2019-03-15',
    status: 'Open',
  },
  {
    type: 'Credit Card',
    name: 'American Express Gold',
    balance: 0,
    limit: 3000,
    utilization: 0,
    paymentStatus: 'On Time',
    opened: '2020-08-22',
    status: 'Open',
  },
  {
    type: 'Auto Loan',
    name: 'Toyota Financial',
    balance: 15750,
    limit: 25000,
    utilization: 63,
    paymentStatus: 'On Time',
    opened: '2021-06-10',
    status: 'Open',
  },
  {
    type: 'Personal Loan',
    name: 'SoFi Personal Loan',
    balance: 0,
    limit: 10000,
    utilization: 0,
    paymentStatus: 'Paid Off',
    opened: '2018-12-05',
    status: 'Closed',
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
  const [activeSection, setActiveSection] = useState('accounts');

  const getUtilizationColor = (utilization: number) => {
    if (utilization <= 10) return '#059669';
    if (utilization <= 30) return '#EAB308';
    return '#EF4444';
  };

  const getStatusIcon = (status: string) => {
    return status === 'on-time' ? (
      <CheckCircle size={16} color="#059669" />
    ) : (
      <AlertCircle size={16} color="#EF4444" />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Credit Report</Text>
        <Text style={styles.headerSubtitle}>Complete credit overview</Text>
      </View>

      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeSection === 'accounts' && styles.activeTab]}
          onPress={() => setActiveSection('accounts')}
        >
          <Text style={[styles.tabText, activeSection === 'accounts' && styles.activeTabText]}>
            Accounts
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
        <TouchableOpacity
          style={[styles.tab, activeSection === 'inquiries' && styles.activeTab]}
          onPress={() => setActiveSection('inquiries')}
        >
          <Text style={[styles.tabText, activeSection === 'inquiries' && styles.activeTabText]}>
            Inquiries
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {activeSection === 'accounts' && (
          <View>
            <View style={styles.summaryCard}>
              <Text style={styles.summaryTitle}>Account Summary</Text>
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
                  <Text style={styles.statValue}>$17,000</Text>
                  <Text style={styles.statLabel}>Total Balance</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>$43,000</Text>
                  <Text style={styles.statLabel}>Total Credit</Text>
                </View>
              </View>
            </View>

            {creditAccounts.map((account, index) => (
              <View key={index} style={styles.accountCard}>
                <View style={styles.accountHeader}>
                  <View style={styles.accountIcon}>
                    <CreditCard size={20} color="#2563EB" />
                  </View>
                  <View style={styles.accountInfo}>
                    <Text style={styles.accountName}>{account.name}</Text>
                    <Text style={styles.accountType}>{account.type}</Text>
                  </View>
                  <ChevronRight size={20} color="#9CA3AF" />
                </View>

                <View style={styles.accountDetails}>
                  <View style={styles.accountRow}>
                    <Text style={styles.accountLabel}>Balance</Text>
                    <Text style={styles.accountValue}>${account.balance.toLocaleString()}</Text>
                  </View>
                  <View style={styles.accountRow}>
                    <Text style={styles.accountLabel}>Credit Limit</Text>
                    <Text style={styles.accountValue}>${account.limit.toLocaleString()}</Text>
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
                      { color: account.paymentStatus === 'On Time' ? '#059669' : '#EF4444' }
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
                        { color: month.status === 'on-time' ? '#059669' : '#EF4444' }
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

        {activeSection === 'inquiries' && (
          <View>
            <View style={styles.inquiriesCard}>
              <Text style={styles.cardTitle}>Credit Inquiries</Text>
              <Text style={styles.cardSubtitle}>
                Recent credit checks and their impact on your score
              </Text>

              <View style={styles.inquirySection}>
                <Text style={styles.inquirySectionTitle}>Hard Inquiries (Last 2 Years)</Text>
                
                <View style={styles.inquiryItem}>
                  <View style={styles.inquiryInfo}>
                    <Text style={styles.inquiryName}>Chase Bank</Text>
                    <Text style={styles.inquiryDate}>December 15, 2024</Text>
                  </View>
                  <View style={styles.inquiryImpact}>
                    <TrendingUp size={16} color="#EF4444" />
                    <Text style={styles.inquiryImpactText}>-5 pts</Text>
                  </View>
                </View>

                <View style={styles.inquiryItem}>
                  <View style={styles.inquiryInfo}>
                    <Text style={styles.inquiryName}>American Express</Text>
                    <Text style={styles.inquiryDate}>August 22, 2024</Text>
                  </View>
                  <View style={styles.inquiryImpact}>
                    <TrendingUp size={16} color="#EF4444" />
                    <Text style={styles.inquiryImpactText}>-3 pts</Text>
                  </View>
                </View>
              </View>

              <View style={styles.inquirySection}>
                <Text style={styles.inquirySectionTitle}>Soft Inquiries (Last 30 Days)</Text>
                
                <View style={styles.inquiryItem}>
                  <View style={styles.inquiryInfo}>
                    <Text style={styles.inquiryName}>Credit Monitoring Check</Text>
                    <Text style={styles.inquiryDate}>December 18, 2024</Text>
                  </View>
                  <View style={styles.inquiryImpact}>
                    <Text style={styles.noImpactText}>No Impact</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        )}
      </ScrollView>
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
    backgroundColor: '#2563EB',
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
    color: '#2563EB',
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
    backgroundColor: '#EFF6FF',
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
  inquiriesCard: {
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
  inquirySection: {
    marginBottom: 24,
  },
  inquirySectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 12,
  },
  inquiryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  inquiryInfo: {
    flex: 1,
  },
  inquiryName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 2,
  },
  inquiryDate: {
    fontSize: 12,
    color: '#6B7280',
  },
  inquiryImpact: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inquiryImpactText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#EF4444',
    marginLeft: 4,
  },
  noImpactText: {
    fontSize: 14,
    color: '#6B7280',
  },
});