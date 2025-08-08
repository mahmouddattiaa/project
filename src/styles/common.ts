// Shared styles for the Kepler Credit Score Application
import { StyleSheet } from 'react-native';
import { COLORS } from '../constants';

export const commonStyles = StyleSheet.create({
  // Container styles
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.white,
  },

  // Card styles
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },

  // Header styles
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },

  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.gray[900],
  },

  // Button styles
  primaryButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },

  secondaryButton: {
    backgroundColor: COLORS.gray[100],
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLORS.gray[200],
  },

  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.white,
  },

  secondaryButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.gray[700],
  },

  // Input styles
  input: {
    borderWidth: 1,
    borderColor: COLORS.gray[200],
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 16,
    fontSize: 16,
    backgroundColor: COLORS.white,
    color: COLORS.gray[900],
  },

  inputFocused: {
    borderColor: COLORS.primary,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },

  // Text styles
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: COLORS.gray[900],
    marginBottom: 8,
  },

  subtitle: {
    fontSize: 16,
    color: COLORS.gray[600],
    marginBottom: 24,
  },

  label: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.gray[700],
    marginBottom: 8,
  },

  // Layout styles
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  spaceBetween: {
    justifyContent: 'space-between',
  },

  centered: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Spacing utilities
  marginBottom16: {
    marginBottom: 16,
  },

  marginBottom24: {
    marginBottom: 24,
  },

  paddingHorizontal20: {
    paddingHorizontal: 20,
  },

  // Logo styles
  logo: {
    resizeMode: 'stretch',
    backgroundColor: 'transparent',
  },

  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  modalContainer: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 20,
    maxHeight: '80%',
  },

  // Error styles
  errorText: {
    color: COLORS.error,
    fontSize: 14,
    marginTop: 4,
  },

  successText: {
    color: COLORS.success,
    fontSize: 14,
    marginTop: 4,
  },
});
