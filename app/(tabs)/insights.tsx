import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import {
  Lightbulb,
  TrendingUp,
  Target,
  BookOpen,
  ChevronRight,
  Star,
  DollarSign,
  CreditCard,
  Calendar,
} from 'lucide-react-native';
import { ScoreFactors } from '@/components/ScoreFactors';

const recommendations = [
  {
    icon: CreditCard,
    title: 'Pay down credit card balances',
    description: 'Reduce your credit utilization to under 10% to boost your score by 20-30 points',
    impact: 'High Impact',
    impactColor: '#EF4444',
    timeframe: '1-2 months',
    priority: 'high',
  },
  {
    icon: Calendar,
    title: 'Set up automatic payments',
    description: 'Never miss a payment by setting up autopay for at least the minimum amount',
    impact: 'Medium Impact',
    impactColor: '#EAB308',
    timeframe: 'Immediate',
    priority: 'medium',
  },
  {
    icon: Target,
    title: 'Keep old accounts open',
    description: 'Maintain your oldest credit accounts to improve your credit history length',
    impact: 'Low Impact',
    impactColor: '#059669',
    timeframe: 'Ongoing',
    priority: 'low',
  },
];

const educationalContent = [
  {
    title: 'Understanding Credit Utilization',
    description: 'Learn how to optimize your credit card usage for maximum score impact',
    readTime: '5 min read',
    category: 'Credit Basics',
  },
  {
    title: 'Building Credit from Scratch',
    description: 'A complete guide to establishing and building your credit history',
    readTime: '8 min read',
    category: 'Credit Building',
  },
  {
    title: 'Credit Score Myths Debunked',
    description: 'Common misconceptions about credit scores and the truth behind them',
    readTime: '6 min read',
    category: 'Education',
  },
  {
    title: 'How to Dispute Credit Report Errors',
    description: 'Step-by-step guide to correcting mistakes on your credit report',
    readTime: '10 min read',
    category: 'Credit Repair',
  },
];

const scoreSimulator = {
  currentScore: 742,
  scenarios: [
    {
      action: 'Pay off $1,250 credit card debt',
      potentialIncrease: '+15 to +25 points',
      timeframe: '1-2 months',
      likelihood: 'Very Likely',
    },
    {
      action: 'Open a new credit card',
      potentialIncrease: '-5 to -10 points',
      timeframe: 'Immediate',
      likelihood: 'Likely',
    },
    {
      action: 'Close oldest credit card',
      potentialIncrease: '-10 to -20 points',
      timeframe: '3-6 months',
      likelihood: 'Likely',
    },
  ],
};

export default function InsightsScreen() {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return '#EF4444';
      case 'medium':
        return '#EAB308';
      case 'low':
        return '#059669';
      default:
        return '#6B7280';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Credit Insights</Text>
        <Text style={styles.headerSubtitle}>Personalized tips and education</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Score Goal Card */}
        <View style={styles.goalCard}>
          <View style={styles.goalHeader}>
            <Target size={24} color="#8B5CF6" />
            <Text style={styles.goalTitle}>Your Credit Goal</Text>
          </View>
          <View style={styles.goalContent}>
            <View style={styles.goalScores}>
              <View style={styles.currentScore}>
                <Text style={styles.scoreLabel}>Current</Text>
                <Text style={styles.scoreValue}>742</Text>
              </View>
              <View style={styles.goalArrow}>
                <TrendingUp size={20} color="#059669" />
              </View>
              <View style={styles.targetScore}>
                <Text style={styles.scoreLabel}>Goal</Text>
                <Text style={styles.targetScoreValue}>800</Text>
              </View>
            </View>
            <Text style={styles.goalDescription}>
              You're 58 points away from your goal!
            </Text>
            <TouchableOpacity style={styles.goalButton}>
              <Text style={styles.goalButtonText}>View Action Plan</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Credit Score Factors */}
        <ScoreFactors />

        {/* Recommendations */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Lightbulb size={20} color="#8B5CF6" />
            <Text style={styles.sectionTitle}>Personalized Recommendations</Text>
          </View>

          {recommendations.map((rec, index) => {
            const IconComponent = rec.icon;
            return (
              <TouchableOpacity key={index} style={styles.recommendationCard}>
                <View style={styles.recommendationHeader}>
                  <View style={styles.recommendationIcon}>
                    <IconComponent size={40} color="#8B5CF6" />
                  </View>
                  <View style={styles.recommendationInfo}>
                    <Text style={styles.recommendationTitle}>{rec.title}</Text>
                    <Text style={styles.recommendationDescription}>{rec.description}</Text>
                  </View>
                </View>
                
                <View style={styles.recommendationFooter}>
                  <View style={styles.recommendationMeta}>
                    <View style={[styles.impactBadge, { backgroundColor: `${rec.impactColor}15` }]}>
                      <Text style={[styles.impactText, { color: rec.impactColor }]}>
                        {rec.impact}
                      </Text>
                    </View>
                    <Text style={styles.timeframeText}>{rec.timeframe}</Text>
                  </View>
                  <ChevronRight size={16} color="#9CA3AF" />
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Score Simulator */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <TrendingUp size={20} color="#8B5CF6" />
            <Text style={styles.sectionTitle}>Score Simulator</Text>
          </View>

          <View style={styles.simulatorCard}>
            <Text style={styles.simulatorDescription}>
              See how different actions might impact your credit score
            </Text>
            
            {scoreSimulator.scenarios.map((scenario, index) => (
              <View key={index} style={styles.scenarioItem}>
                <View style={styles.scenarioInfo}>
                  <Text style={styles.scenarioAction}>{scenario.action}</Text>
                  <Text style={styles.scenarioTimeframe}>{scenario.timeframe}</Text>
                </View>
                <View style={styles.scenarioImpact}>
                  <Text style={[
                    styles.scenarioPoints,
                    { color: scenario.potentialIncrease.includes('-') ? '#EF4444' : '#059669' }
                  ]}>
                    {scenario.potentialIncrease}
                  </Text>
                  <Text style={styles.scenarioLikelihood}>{scenario.likelihood}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Educational Content */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <BookOpen size={20} color="#8B5CF6" />
            <Text style={styles.sectionTitle}>Credit Education</Text>
          </View>

          {educationalContent.map((content, index) => (
            <TouchableOpacity key={index} style={styles.contentCard}>
              <View style={styles.contentInfo}>
                <Text style={styles.contentCategory}>{content.category}</Text>
                <Text style={styles.contentTitle}>{content.title}</Text>
                <Text style={styles.contentDescription}>{content.description}</Text>
                <Text style={styles.readTime}>{content.readTime}</Text>
              </View>
              <ChevronRight size={16} color="#9CA3AF" />
            </TouchableOpacity>
          ))}
        </View>
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
  content: {
    flex: 1,
  },
  goalCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginBottom: 24,
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
  goalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  goalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    marginLeft: 8,
  },
  goalContent: {
    alignItems: 'center',
  },
  goalScores: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  currentScore: {
    alignItems: 'center',
    marginRight: 24,
  },
  scoreLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 4,
  },
  scoreValue: {
    fontSize: 32,
    fontWeight: '800',
    color: '#8B5CF6',
  },
  goalArrow: {
    marginHorizontal: 16,
  },
  targetScore: {
    alignItems: 'center',
    marginLeft: 24,
  },
  targetScoreValue: {
    fontSize: 32,
    fontWeight: '800',
    color: '#059669',
  },
  goalDescription: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 16,
  },
  goalButton: {
    backgroundColor: '#8B5CF6',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  goalButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  section: {
    marginHorizontal: 20,
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    marginLeft: 8,
  },
  recommendationCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  recommendationHeader: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  recommendationIcon: {
    width: 40,
    height: 40,
    backgroundColor: '#EFF6FF',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  recommendationInfo: {
    flex: 1,
  },
  recommendationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  recommendationDescription: {
    fontSize: 14,
    color: '#6B7280',
  },
  recommendationFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  recommendationMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  impactBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 12,
  },
  impactText: {
    fontSize: 12,
    fontWeight: '600',
  },
  timeframeText: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  simulatorCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  simulatorDescription: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 16,
  },
  scenarioItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  scenarioInfo: {
    flex: 1,
    marginRight: 12,
  },
  scenarioAction: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 2,
  },
  scenarioTimeframe: {
    fontSize: 12,
    color: '#6B7280',
  },
  scenarioImpact: {
    alignItems: 'flex-end',
  },
  scenarioPoints: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 2,
  },
  scenarioLikelihood: {
    fontSize: 10,
    color: '#9CA3AF',
  },
  contentCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  contentInfo: {
    flex: 1,
  },
  contentCategory: {
    fontSize: 12,
    fontWeight: '600',
    color: '#8B5CF6',
    marginBottom: 4,
  },
  contentTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  contentDescription: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 8,
  },
  readTime: {
    fontSize: 12,
    color: '#9CA3AF',
  },
});