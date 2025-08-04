import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Dimensions,
} from 'react-native';
import { ChevronLeft } from 'lucide-react-native';
import { useRouter } from 'expo-router';

export default function TermsScreen() {
    const router = useRouter();
    const screenData = Dimensions.get('window');
    const isMobile = screenData.width < 500;

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: '#FFFFFF',
        },
        header: {
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: isMobile ? 16 : 24,
            paddingVertical: 16,
            borderBottomWidth: 1,
            borderBottomColor: '#E5E7EB',
            backgroundColor: '#FFFFFF',
        },
        backButton: {
            marginRight: 16,
            padding: 8,
        },
        headerCenter: {
            flex: 1,
            alignItems: 'center',
        },
        brandContainer: {
            flexDirection: 'row',
            alignItems: 'center',
        },
        brandText: {
            fontSize: 20,
            fontWeight: '800',
            color: '#8B5CF6',
            letterSpacing: -0.5,
        },
        brandTextBlue: {
            fontSize: 20,
            fontWeight: '800',
            color: '#2563EB',
            letterSpacing: -0.5,
        },
        headerRight: {
            width: 56,
        },
        headerLogo: {
            width: 80,
            height: 24,
            resizeMode: 'contain',
            marginRight: 12,
        },
        headerTitle: {
            fontSize: isMobile ? 18 : 20,
            fontWeight: '600',
            color: '#1F2937',
        },
        contentContainer: {
            padding: isMobile ? 16 : 24,
        },
        title: {
            fontSize: isMobile ? 20 : 24,
            fontWeight: '700',
            color: '#1F2937',
            marginBottom: 8,
            textAlign: 'center',
        },
        subtitle: {
            fontSize: isMobile ? 14 : 16,
            color: '#6B7280',
            marginBottom: 24,
            textAlign: 'center',
        },
        sectionTitle: {
            fontSize: isMobile ? 16 : 18,
            fontWeight: '600',
            color: '#1F2937',
            marginTop: 24,
            marginBottom: 12,
        },
        paragraph: {
            fontSize: isMobile ? 14 : 16,
            lineHeight: isMobile ? 20 : 24,
            color: '#4B5563',
            marginBottom: 16,
            textAlign: 'justify',
        },
        listItem: {
            fontSize: isMobile ? 14 : 16,
            lineHeight: isMobile ? 20 : 24,
            color: '#4B5563',
            marginBottom: 8,
            marginLeft: 16,
        },
        companyName: {
            fontWeight: '600',
            color: '#8B5CF6',
        },
        effectiveDate: {
            fontSize: isMobile ? 12 : 14,
            color: '#9CA3AF',
            textAlign: 'center',
            marginBottom: 16,
        },
    });

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity 
                    style={styles.backButton}
                    onPress={() => router.back()}
                >
                    <ChevronLeft color="#1F2937" size={24} />
                </TouchableOpacity>
                <View style={styles.headerCenter}>
                    <View style={styles.brandContainer}>
                        <Text style={styles.brandTextBlue}>i</Text>
                        <Text style={styles.brandText}>score</Text>
                    </View>
                </View>
                <View style={styles.headerRight} />
            </View>

            <ScrollView contentContainerStyle={styles.contentContainer}>
                <Text style={styles.title}>Terms and Conditions</Text>
                <Text style={styles.effectiveDate}>Effective Date: August 3, 2025</Text>
                <Text style={styles.subtitle}>
                    Welcome to <Text style={styles.companyName}>iscore</Text> Credit Score Application
                </Text>

                <Text style={styles.paragraph}>
                    By using the <Text style={styles.companyName}>iscore</Text> mobile application ("App"), you agree to be bound by these Terms and Conditions ("Terms"). Please read them carefully before using our services.
                </Text>

                <Text style={styles.sectionTitle}>1. Acceptance of Terms</Text>
                <Text style={styles.paragraph}>
                    By accessing and using the <Text style={styles.companyName}>iscore</Text> App, you acknowledge that you have read, understood, and agree to be bound by these Terms and our Privacy Policy.
                </Text>

                <Text style={styles.sectionTitle}>2. Services Provided</Text>
                <Text style={styles.paragraph}>
                    <Text style={styles.companyName}>iscore</Text> provides credit scoring and financial assessment services including:
                </Text>
                <Text style={styles.listItem}>• Credit score calculation and monitoring</Text>
                <Text style={styles.listItem}>• Financial health analysis</Text>
                <Text style={styles.listItem}>• Credit improvement recommendations</Text>
                <Text style={styles.listItem}>• Financial education and insights</Text>

                <Text style={styles.sectionTitle}>3. User Eligibility</Text>
                <Text style={styles.paragraph}>
                    You must be at least 18 years old and legally capable of entering into binding contracts to use our services. By registering, you represent and warrant that you meet these requirements.
                </Text>

                <Text style={styles.sectionTitle}>4. Data Collection and Privacy</Text>
                <Text style={styles.paragraph}>
                    We collect and process your personal and financial information to provide our credit scoring services. This includes:
                </Text>
                <Text style={styles.listItem}>• National ID information</Text>
                <Text style={styles.listItem}>• Personal contact details</Text>
                <Text style={styles.listItem}>• Financial transaction history</Text>
                <Text style={styles.listItem}>• Credit history and payment behavior</Text>
                <Text style={styles.paragraph}>
                    All data is processed in accordance with applicable privacy laws and our Privacy Policy.
                </Text>

                <Text style={styles.sectionTitle}>5. Accuracy of Information</Text>
                <Text style={styles.paragraph}>
                    You agree to provide accurate, current, and complete information when registering and using our services. You are responsible for maintaining the accuracy of your account information.
                </Text>

                <Text style={styles.sectionTitle}>6. Credit Score Accuracy</Text>
                <Text style={styles.paragraph}>
                    While we strive to provide accurate credit scores, <Text style={styles.companyName}>iscore</Text> cannot guarantee 100% accuracy. Credit scores are estimates based on available data and should be used for informational purposes only.
                </Text>

                <Text style={styles.sectionTitle}>7. User Responsibilities</Text>
                <Text style={styles.paragraph}>
                    You agree to:
                </Text>
                <Text style={styles.listItem}>• Use the App only for lawful purposes</Text>
                <Text style={styles.listItem}>• Keep your login credentials secure</Text>
                <Text style={styles.listItem}>• Not share your account with others</Text>
                <Text style={styles.listItem}>• Report any unauthorized access immediately</Text>

                <Text style={styles.sectionTitle}>8. Prohibited Activities</Text>
                <Text style={styles.paragraph}>
                    You may not:
                </Text>
                <Text style={styles.listItem}>• Attempt to manipulate or falsify your credit score</Text>
                <Text style={styles.listItem}>• Use the App for fraudulent purposes</Text>
                <Text style={styles.listItem}>• Reverse engineer or attempt to hack the App</Text>
                <Text style={styles.listItem}>• Violate any applicable laws or regulations</Text>

                <Text style={styles.sectionTitle}>9. Limitation of Liability</Text>
                <Text style={styles.paragraph}>
                    <Text style={styles.companyName}>iscore</Text> shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of the App or reliance on credit score information.
                </Text>

                <Text style={styles.sectionTitle}>10. Termination</Text>
                <Text style={styles.paragraph}>
                    We reserve the right to suspend or terminate your account at any time for violation of these Terms or for any other reason at our sole discretion.
                </Text>

                <Text style={styles.sectionTitle}>11. Changes to Terms</Text>
                <Text style={styles.paragraph}>
                    We may update these Terms from time to time. Continued use of the App after changes constitutes acceptance of the updated Terms.
                </Text>

                <Text style={styles.sectionTitle}>12. Governing Law</Text>
                <Text style={styles.paragraph}>
                    These Terms are governed by the laws of Egypt. Any disputes shall be resolved in the competent courts of Egypt.
                </Text>

                <Text style={styles.sectionTitle}>13. Contact Information</Text>
                <Text style={styles.paragraph}>
                    For questions about these Terms, please contact us through the App or visit our support section.
                </Text>

                <Text style={styles.paragraph}>
                    By clicking "I accept" or using the <Text style={styles.companyName}>iscore</Text> App, you acknowledge that you have read and agree to these Terms and Conditions.
                </Text>
            </ScrollView>
        </View>
    );
}
