import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Switch,
  Modal,
  TextInput,
  Alert,
} from 'react-native';
import { User, Settings, Bell, Shield, CircleHelp as HelpCircle, LogOut, ChevronRight, CreditCard as Edit, CreditCard, FileText, Smartphone, Mail, X } from 'lucide-react-native';
import { Link } from 'expo-router';

const profileData = {
  name: 'Sarah Johnson',
  email: 'sarah.johnson@email.com',
  phone: '+1 (555) 123-4567',
  memberSince: 'March 2019',
  creditScore: 742,
  accountsMonitored: 4,
  alertsEnabled: true,
  darkMode: false,
  biometric: true,
  emailNotifications: true,
  pushNotifications: true,
  weeklyReports: false,
};

export default function ProfileScreen() {
  const [contactInfo, setContactInfo] = useState({
    name: profileData.name,
    email: profileData.email,
    phone: profileData.phone,
  });

  const [editModal, setEditModal] = useState({
    visible: false,
    field: '',
    title: '',
    value: '',
  });

  const [notifications, setNotifications] = useState({
    alerts: profileData.alertsEnabled,
    email: profileData.emailNotifications,
    push: profileData.pushNotifications,
    weekly: profileData.weeklyReports,
  });

  const [settings, setSettings] = useState({
    darkMode: profileData.darkMode,
    biometric: profileData.biometric,
  });

  const [security, setSecurity] = useState({
    pin: true,
    biometric: true,
  });

  const handleNotificationToggle = (type: string, value: boolean) => {
    setNotifications(prev => ({ ...prev, [type]: value }));
  };

  const handleSettingToggle = (type: string, value: boolean) => {
    setSettings(prev => ({ ...prev, [type]: value }));
  };

  const handleSecurityToggle = (type: string, value: boolean) => {
    setSecurity(prev => ({ ...prev, [type]: value }));
  };

  const openEditModal = (field: string, title: string, currentValue: string) => {
    setEditModal({
      visible: true,
      field,
      title,
      value: currentValue,
    });
  };

  const closeEditModal = () => {
    setEditModal({
      visible: false,
      field: '',
      title: '',
      value: '',
    });
  };

  const saveContactInfo = () => {
    if (editModal.field && editModal.value.trim()) {
      setContactInfo(prev => ({
        ...prev,
        [editModal.field]: editModal.value.trim(),
      }));
      closeEditModal();
      Alert.alert('Success', 'Contact information updated successfully!');
    } else {
      Alert.alert('Error', 'Please enter a valid value.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
        <TouchableOpacity style={styles.editButton}>
          <Edit size={20} color="#8B5CF6" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Profile Info */}
        <View style={styles.profileCard}>
          <View style={styles.profileHeader}>
            <View style={styles.avatarContainer}>
              <User size={32} color="#FFFFFF" />
            </View>
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>{contactInfo.name}</Text>
              <Text style={styles.memberSince}>Member since {profileData.memberSince}</Text>
            </View>
          </View>

          <View style={styles.profileStats}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{profileData.creditScore}</Text>
              <Text style={styles.statLabel}>Credit Score</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{profileData.accountsMonitored}</Text>
              <Text style={styles.statLabel}>Accounts</Text>
            </View>
          </View>
        </View>

        {/* Contact Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contact Information</Text>

          <TouchableOpacity 
            style={styles.contactItem}
            onPress={() => openEditModal('name', 'Edit Name', contactInfo.name)}
          >
            <User size={20} color="#6B7280" />
            <View style={styles.contactInfo}>
              <Text style={styles.contactLabel}>Full Name</Text>
              <Text style={styles.contactValue}>{contactInfo.name}</Text>
            </View>
            <ChevronRight size={16} color="#9CA3AF" />
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.contactItem}
            onPress={() => openEditModal('email', 'Edit Email', contactInfo.email)}
          >
            <Mail size={20} color="#6B7280" />
            <View style={styles.contactInfo}>
              <Text style={styles.contactLabel}>Email</Text>
              <Text style={styles.contactValue}>{contactInfo.email}</Text>
            </View>
            <ChevronRight size={16} color="#9CA3AF" />
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.contactItem}
            onPress={() => openEditModal('phone', 'Edit Phone', contactInfo.phone)}
          >
            <Smartphone size={20} color="#6B7280" />
            <View style={styles.contactInfo}>
              <Text style={styles.contactLabel}>Phone</Text>
              <Text style={styles.contactValue}>{contactInfo.phone}</Text>
            </View>
            <ChevronRight size={16} color="#9CA3AF" />
          </TouchableOpacity>
        </View>

        {/* Notifications */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Bell size={20} color="#8B5CF6" />
            <Text style={styles.sectionTitle}>Notifications</Text>
          </View>

          <View style={styles.settingItem}>
            <Text style={styles.settingLabel}>Credit Alerts</Text>
            <Switch
              value={notifications.alerts}
              onValueChange={(value) => handleNotificationToggle('alerts', value)}
              trackColor={{ false: '#E5E7EB', true: '#8B5CF6' }}
              thumbColor='#FFFFFF'
              ios_backgroundColor="#E5E7EB"
              style={{ transform: [{ scaleX: 1.1 }, { scaleY: 1.1 }] }}
            />
          </View>

          <View style={styles.settingItem}>
            <Text style={styles.settingLabel}>Email Notifications</Text>
            <Switch
              value={notifications.email}
              onValueChange={(value) => handleNotificationToggle('email', value)}
              trackColor={{ false: '#E5E7EB', true: '#8B5CF6' }}
              thumbColor='#FFFFFF'
              ios_backgroundColor="#E5E7EB"
              style={{ transform: [{ scaleX: 1.1 }, { scaleY: 1.1 }] }}
            />
          </View>

          <View style={styles.settingItem}>
            <Text style={styles.settingLabel}>Push Notifications</Text>
            <Switch
              value={notifications.push}
              onValueChange={(value) => handleNotificationToggle('push', value)}
              trackColor={{ false: '#E5E7EB', true: '#8B5CF6' }}
              thumbColor='#FFFFFF'
              ios_backgroundColor="#E5E7EB"
              style={{ transform: [{ scaleX: 1.1 }, { scaleY: 1.1 }] }}
            />
          </View>

          <View style={styles.settingItem}>
            <Text style={styles.settingLabel}>Weekly Reports</Text>
            <Switch
              value={notifications.weekly}
              onValueChange={(value) => handleNotificationToggle('weekly', value)}
              trackColor={{ false: '#E5E7EB', true: '#8B5CF6' }}
              thumbColor='#FFFFFF'
              ios_backgroundColor="#E5E7EB"
              style={{ transform: [{ scaleX: 1.1 }, { scaleY: 1.1 }] }}
            />
          </View>
        </View>

        {/* Security & Privacy */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Shield size={20} color="#8B5CF6" />
            <Text style={styles.sectionTitle}>Security & Privacy</Text>
          </View>

          <View style={styles.settingItem}>
            <Text style={styles.settingLabel}>PIN Protection</Text>
            <Switch
              value={security.pin}
              onValueChange={(value) => handleSecurityToggle('pin', value)}
              trackColor={{ false: '#E5E7EB', true: '#8B5CF6' }}
              thumbColor='#FFFFFF'
              ios_backgroundColor="#E5E7EB"
              style={{ transform: [{ scaleX: 1.1 }, { scaleY: 1.1 }] }}
            />
          </View>

          <View style={styles.settingItem}>
            <Text style={styles.settingLabel}>Biometric Login</Text>
            <Switch
              value={security.biometric}
              onValueChange={(value) => handleSecurityToggle('biometric', value)}
              trackColor={{ false: '#E5E7EB', true: '#8B5CF6' }}
              thumbColor='#FFFFFF'
              ios_backgroundColor="#E5E7EB"
              style={{ transform: [{ scaleX: 1.1 }, { scaleY: 1.1 }] }}
            />
          </View>

          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuLabel}>Change Password</Text>
            <ChevronRight size={16} color="#9CA3AF" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuLabel}>Two-Factor Authentication</Text>
            <ChevronRight size={16} color="#9CA3AF" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuLabel}>Privacy Settings</Text>
            <ChevronRight size={16} color="#9CA3AF" />
          </TouchableOpacity>
        </View>

        {/* Account Management */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Settings size={20} color="#8B5CF6" />
            <Text style={styles.sectionTitle}>Account</Text>
          </View>

          <TouchableOpacity style={styles.menuItem}>
            <CreditCard size={20} color="#6B7280" />
            <Text style={styles.menuLabel}>Subscription</Text>
            <View style={styles.planBadge}>
              <Text style={styles.planBadgeText}>Pro</Text>
            </View>
            <ChevronRight size={16} color="#9CA3AF" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <FileText size={20} color="#6B7280" />
            <Text style={styles.menuLabel}>Download My Data</Text>
            <ChevronRight size={16} color="#9CA3AF" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <HelpCircle size={20} color="#6B7280" />
            <Text style={styles.menuLabel}>Help & Support</Text>
            <ChevronRight size={16} color="#9CA3AF" />
          </TouchableOpacity>
        </View>

        {/* Marketing Preferences */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Marketing Preferences</Text>

          <View style={styles.marketingCard}>
            <Text style={styles.marketingTitle}>Personalized Offers</Text>
            <Text style={styles.marketingDescription}>
              Get tailored credit card and loan offers based on your credit profile
            </Text>
            <TouchableOpacity style={styles.marketingButton}>
              <Text style={styles.marketingButtonText}>Manage Preferences</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Logout */}
        <Link href="/signup" asChild>
          <TouchableOpacity style={styles.logoutButton}>
            <LogOut size={20} color="#EF4444" />
            <Text style={styles.logoutText}>Sign Out</Text>
          </TouchableOpacity>
        </Link>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Version 2.1.0</Text>
          <Text style={styles.footerText}>© 2024 Credit Bureau</Text>
        </View>
      </ScrollView>

      {/* Edit Contact Information Modal */}
      <Modal
        visible={editModal.visible}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={closeEditModal}
      >
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={closeEditModal} style={styles.closeButton}>
              <X size={24} color="#111827" />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>{editModal.title}</Text>
            <TouchableOpacity onPress={saveContactInfo} style={styles.saveButton}>
              <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.modalContent}>
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>
                {editModal.field === 'name' ? 'Full Name' : 
                 editModal.field === 'email' ? 'Email Address' : 'Phone Number'}
              </Text>
              <TextInput
                style={styles.input}
                value={editModal.value}
                onChangeText={(text) => setEditModal(prev => ({ ...prev, value: text }))}
                placeholder={`Enter your ${editModal.field}`}
                keyboardType={editModal.field === 'email' ? 'email-address' : 
                             editModal.field === 'phone' ? 'phone-pad' : 'default'}
                autoCapitalize={editModal.field === 'email' ? 'none' : 'words'}
                autoFocus
              />
            </View>
          </View>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#111827',
  },
  editButton: {
    padding: 8,
  },
  content: {
    flex: 1,
  },
  profileCard: {
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
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  avatarContainer: {
    width: 60,
    height: 60,
    backgroundColor: '#8B5CF6',
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 4,
  },
  memberSince: {
    fontSize: 14,
    color: '#6B7280',
  },
  profileStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#8B5CF6',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
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
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  contactInfo: {
    flex: 1,
    marginLeft: 12,
  },
  contactLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 2,
  },
  contactValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  settingLabel: {
    fontSize: 16,
    color: '#111827',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  menuLabel: {
    fontSize: 16,
    color: '#111827',
    flex: 1,
    marginLeft: 12,
  },
  planBadge: {
    backgroundColor: '#8B5CF6',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
  },
  planBadgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  marketingCard: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  marketingTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 8,
  },
  marketingDescription: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 16,
  },
  marketingButton: {
    backgroundColor: '#F3F4F6',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  marketingButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#8B5CF6',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#FECACA',
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#EF4444',
    marginLeft: 8,
  },
  footer: {
    alignItems: 'center',
    paddingBottom: 32,
  },
  footerText: {
    fontSize: 12,
    color: '#9CA3AF',
    marginBottom: 4,
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
  saveButton: {
    backgroundColor: '#8B5CF6',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  modalContent: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 24,
  },
  inputContainer: {
    marginBottom: 24,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: '#FFFFFF',
    color: '#111827',
  },
});