import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react-native';

const scoreFactors = [
  {
    factor: 'Payment History',
    impact: 'positive',
    description: 'On-time payments',
    percentage: 35,
    status: 'Excellent',
  },
  {
    factor: 'Credit Utilization',
    impact: 'positive',
    description: '15% of available credit',
    percentage: 30,
    status: 'Good',
  },
  {
    factor: 'Credit History Length',
    impact: 'neutral',
    description: '7 years average',
    percentage: 15,
    status: 'Fair',
  },
  {
    factor: 'Credit Mix',
    impact: 'positive',
    description: 'Good variety',
    percentage: 10,
    status: 'Good',
  },
  {
    factor: 'New Credit',
    impact: 'negative',
    description: '2 recent inquiries',
    percentage: 10,
    status: 'Needs Work',
  },
];

export function ScoreFactors() {
  const getImpactIcon = (impact: string) => {
    switch (impact) {
      case 'positive':
        return <TrendingUp size={16} color="#059669" />;
      case 'negative':
        return <TrendingDown size={16} color="#EF4444" />;
      default:
        return <Minus size={16} color="#6B7280" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Excellent':
        return '#059669';
      case 'Good':
        return '#22C55E';
      case 'Fair':
        return '#EAB308';
      case 'Needs Work':
        return '#EF4444';
      default:
        return '#6B7280';
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Credit Score Factors</Text>
        <Text style={styles.subtitle}>What impacts your score</Text>
      </View>

      {scoreFactors.map((factor, index) => (
        <View key={index} style={styles.factorItem}>
          <View style={styles.factorHeader}>
            <View style={styles.factorInfo}>
              <Text style={styles.factorName}>{factor.factor}</Text>
              <Text style={styles.factorDescription}>{factor.description}</Text>
            </View>
            <View style={styles.factorRight}>
              <View style={styles.impactContainer}>
                {getImpactIcon(factor.impact)}
              </View>
              <Text style={styles.percentage}>{factor.percentage}%</Text>
            </View>
          </View>
          
          <View style={styles.statusContainer}>
            <View style={[styles.statusDot, { backgroundColor: getStatusColor(factor.status) }]} />
            <Text style={[styles.statusText, { color: getStatusColor(factor.status) }]}>
              {factor.status}
            </Text>
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
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
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#6B7280',
  },
  factorItem: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  factorHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  factorInfo: {
    flex: 1,
    marginRight: 16,
  },
  factorName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  factorDescription: {
    fontSize: 14,
    color: '#6B7280',
  },
  factorRight: {
    alignItems: 'center',
  },
  impactContainer: {
    marginBottom: 4,
  },
  percentage: {
    fontSize: 12,
    fontWeight: '600',
    color: '#9CA3AF',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  statusText: {
    fontSize: 14,
    fontWeight: '600',
  },
});