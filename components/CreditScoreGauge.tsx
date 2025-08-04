import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

interface CreditScoreGaugeProps {
  score: number;
  size?: number;
}

export function CreditScoreGauge({ score, size = 200 }: CreditScoreGaugeProps) {
  return (
    <View style={styles.container}>
      <View style={styles.scoreContainer}>
        <Text style={styles.scoreText}>{score}</Text>
        <Text style={styles.scoreSubtext}>Credit Score</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
  },
  scoreContainer: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingVertical: 20,
    paddingHorizontal: 28,
    shadowColor: '#8B5CF6',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
    borderWidth: 1,
    borderColor: 'rgba(139, 92, 246, 0.15)',
    minWidth: 130,
  },
  scoreText: {
    fontSize: 42,
    fontWeight: '800',
    color: '#8B5CF6',
    marginBottom: 3,
    letterSpacing: -1,
  },
  scoreSubtext: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6B7280',
    letterSpacing: 0.2,
    textTransform: 'uppercase',
  },
});