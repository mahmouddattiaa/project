import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import { Bell, TrendingUp, Shield, CreditCard, TriangleAlert as AlertTriangle, ChevronRight } from 'lucide-react-native';
import { CreditScoreGauge } from '@/components/CreditScoreGauge';
import { ScoreFactors } from '@/components/ScoreFactors';
import { QuickActions } from '@/components/QuickActions';
import { Link } from 'expo-router';
import { NotificationPopup } from '@/components/NotificationPopup';
import { ChatPopup } from '@/components/ChatPopup';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const creditScore = 742;
  const scoreChange = +12;
  const lastUpdated = 'Updated 2 days ago';
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [isChatVisible, setChatVisible] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Good morning,</Text>
            <Text style={styles.userName}>Sarah Johnson</Text>
          </View>
          <TouchableOpacity style={styles.notificationButton} onPress={() => setPopupVisible(true)}>
            <Bell size={24} color="#374151" />
            <View style={styles.notificationBadge} />
          </TouchableOpacity>
        </View>

        {/* Credit Score Card */}
        <View style={styles.scoreCard}>
          <View style={styles.scoreHeader}>
            <Text style={styles.scoreTitle}>Your Credit Score</Text>
            <Text style={styles.lastUpdated}>{lastUpdated}</Text>
          </View>

          <CreditScoreGauge score={creditScore} />

          <View style={styles.scoreDetails}>
            <View style={styles.scoreChange}>
              <TrendingUp size={16} color="#059669" />
              <Text style={styles.scoreChangeText}>+{scoreChange} points</Text>
            </View>
            <Text style={styles.scoreRange}>Good (670-739)</Text>
          </View>

          <Link href="/report" asChild>
            <TouchableOpacity style={styles.viewReportButton}>
              <Text style={styles.viewReportText}>View Full Report</Text>
              <ChevronRight size={18} color="#2563EB" />
            </TouchableOpacity>
          </Link>
        </View>

        {/* Quick Actions */}
        <QuickActions onOpenChat={() => setChatVisible(true)} />

        {/* Score Factors */}
        <ScoreFactors />

        {/* Alerts & Notifications */}
        <View style={styles.alertsCard}>
          <View style={styles.cardHeader}>
            <Shield size={20} color="#2563EB" />
            <Text style={styles.cardTitle}>Credit Monitoring</Text>
          </View>

          <View style={styles.alertItem}>
            <View style={styles.alertIcon}>
              <AlertTriangle size={16} color="#D97706" />
            </View>
            <View style={styles.alertContent}>
              <Text style={styles.alertTitle}>New hard inquiry detected</Text>
              <Text style={styles.alertDescription}>
                Chase Bank performed a credit check on Dec 15
              </Text>
            </View>
            <ChevronRight size={16} color="#9CA3AF" />
          </View>

          <View style={styles.alertItem}>
            <View style={styles.alertIcon}>
              <CreditCard size={16} color="#059669" />
            </View>
            <View style={styles.alertContent}>
              <Text style={styles.alertTitle}>Credit utilization improved</Text>
              <Text style={styles.alertDescription}>
                Your utilization decreased to 15% this month
              </Text>
            </View>
            <ChevronRight size={16} color="#9CA3AF" />
          </View>
        </View>

        {/* Marketing Card */}
        <View style={styles.promoCard}>
          <View style={styles.promoContent}>
            <Text style={styles.promoTitle}>Improve Your Score</Text>
            <Text style={styles.promoDescription}>
              Get personalized tips to boost your credit score by 50+ points
            </Text>
            <TouchableOpacity style={styles.promoButton}>
              <Text style={styles.promoButtonText}>Get Tips</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <NotificationPopup visible={isPopupVisible} onClose={() => setPopupVisible(false)} />
      <ChatPopup visible={isChatVisible} onClose={() => setChatVisible(false)} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
  },
  greeting: {
    fontSize: 16,
    color: '#6B7280',
    fontWeight: '400',
  },
  userName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
    marginTop: 2,
  },
  notificationButton: {
    position: 'relative',
    padding: 8,
  },
  notificationBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 8,
    height: 8,
    backgroundColor: '#EF4444',
    borderRadius: 4,
  },
  scoreCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  scoreHeader: {
    marginBottom: 24,
  },
  scoreTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 4,
  },
  lastUpdated: {
    fontSize: 14,
    color: '#6B7280',
  },
  scoreDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 24,
  },
  scoreChange: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  scoreChangeText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#059669',
    marginLeft: 4,
  },
  scoreRange: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
  },
  viewReportButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F3F4F6',
    paddingVertical: 12,
    borderRadius: 8,
  },
  viewReportText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2563EB',
    marginRight: 4,
  },
  alertsCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginBottom: 20,
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
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    marginLeft: 8,
  },
  alertItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  alertIcon: {
    width: 32,
    height: 32,
    backgroundColor: '#FEF3C7',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  alertContent: {
    flex: 1,
  },
  alertTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 2,
  },
  alertDescription: {
    fontSize: 12,
    color: '#6B7280',
  },
  promoCard: {
    backgroundColor: '#2563EB',
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 16,
    padding: 24,
  },
  promoContent: {
    alignItems: 'center',
  },
  promoTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 8,
  },
  promoDescription: {
    fontSize: 14,
    color: '#BFDBFE',
    textAlign: 'center',
    marginBottom: 20,
  },
  promoButton: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  promoButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2563EB',
  },
});