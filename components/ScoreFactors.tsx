import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const scoreFactors = [
  {
    factor: 'Payment History',
    description: 'On-time payments',
    percentage: 35,
  },
  {
    factor: 'Credit Utilization',
    description: '15% of available credit',
    percentage: 30,
  },
  {
    factor: 'Credit History Length',
    description: '7 years average',
    percentage: 15,
  },
  {
    factor: 'Credit Mix',
    description: 'Good variety',
    percentage: 10,
  },
  {
    factor: 'New Credit',
    description: '2 recent inquiries',
    percentage: 10,
  },
];

export function ScoreFactors() {
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
              <Text style={styles.percentage}>{factor.percentage}%</Text>
            </View>
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
  percentage: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
  },
});