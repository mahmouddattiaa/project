import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { FileText, Target, Bell, CircleHelp as HelpCircle } from 'lucide-react-native';
import { Link } from 'expo-router';

const actions = [
  {
    icon: FileText,
    title: 'Full Report',
    subtitle: 'View details',
    color: '#2563EB',
    backgroundColor: '#EFF6FF',
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
  },
  {
    icon: HelpCircle,
    title: 'Help',
    subtitle: 'Get support',
    color: '#7C3AED',
    backgroundColor: '#F3E8FF',
  },
];

const getHrefForAction = (title: string) => {
  switch (title) {
    case 'Full Report':
      return '/report';
    case 'Set Goals':
      return '/insights';
    case 'Alerts':
      return '/notifications';
    default:
      return null;
  }
};

interface QuickActionsProps {
  onOpenChat: () => void;
}

export function QuickActions({ onOpenChat }: QuickActionsProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Quick Actions</Text>
      <View style={styles.actionsGrid}>
        {actions.map((action, index) => {
          const IconComponent = action.icon;
          const href = getHrefForAction(action.title);

          if (action.title === 'Help') {
            return (
              <TouchableOpacity key={index} style={styles.actionItem} onPress={onOpenChat}>
                <View style={[styles.iconContainer, { backgroundColor: action.backgroundColor }]}>
                  <IconComponent size={24} color={action.color} />
                </View>
                <Text style={styles.actionTitle}>{action.title}</Text>
                <Text style={styles.actionSubtitle}>{action.subtitle}</Text>
              </TouchableOpacity>
            );
          }

          if (href) {
            return (
              <Link key={index} href={href} asChild>
                <TouchableOpacity style={styles.actionItem}>
                  <View style={[styles.iconContainer, { backgroundColor: action.backgroundColor }]}>
                    <IconComponent size={24} color={action.color} />
                  </View>
                  <Text style={styles.actionTitle}>{action.title}</Text>
                  <Text style={styles.actionSubtitle}>{action.subtitle}</Text>
                </TouchableOpacity>
              </Link>
            );
          }

          return (
            <TouchableOpacity key={index} style={styles.actionItem}>
              <View style={[styles.iconContainer, { backgroundColor: action.backgroundColor }]}>
                <IconComponent size={24} color={action.color} />
              </View>
              <Text style={styles.actionTitle}>{action.title}</Text>
              <Text style={styles.actionSubtitle}>{action.subtitle}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 16,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  actionItem: {
    width: '47%',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
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
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  actionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
    textAlign: 'center',
    marginBottom: 4,
  },
  actionSubtitle: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
  },
});