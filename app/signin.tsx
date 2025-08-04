import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Dimensions,
} from 'react-native';
import { ChevronRight, Eye, EyeOff } from 'lucide-react-native';
import { useRouter } from 'expo-router';

export default function SignInScreen() {
    const [nationalIdOrEmail, setNationalIdOrEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [screenData, setScreenData] = useState(Dimensions.get('window'));
    const router = useRouter();

    useEffect(() => {
        const onChange = (result: any) => {
            setScreenData(result.window);
        };

        const subscription = Dimensions.addEventListener('change', onChange);
        return () => subscription?.remove();
    }, []);

    const isMobile = screenData.width < 500;

    // Validation functions
    const validateNationalIdOrEmail = (value: string) => {
        // Check if it's a 14-digit Egyptian National ID
        const egyptianIdRegex = /^\d{14}$/;
        if (egyptianIdRegex.test(value)) {
            return true;
        }
        
        // Check if it's a valid email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailRegex.test(value.trim())) {
            return true;
        }
        
        return false;
    };

    const validatePassword = (password: string) => {
        return password.length >= 6;
    };

    // Check if all required fields are filled and valid
    const isFormValid = () => {
        return (
            validateNationalIdOrEmail(nationalIdOrEmail) &&
            validatePassword(password)
        );
    };

    const getStyles = () => StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: '#FAFBFC',
        },
        contentContainer: {
            padding: isMobile ? 16 : 32,
            paddingBottom: isMobile ? 50 : 40,
            maxWidth: 500,
            alignSelf: 'center',
            width: '100%',
            justifyContent: 'center',
            minHeight: screenData.height,
        },
        logoHeader: {
            alignItems: 'center' as const,
            paddingVertical: isMobile ? 32 : 40,
            marginBottom: isMobile ? 32 : 40,
            backgroundColor: '#FFFFFF',
            borderRadius: 20,
            marginHorizontal: isMobile ? -4 : 0,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.08,
            shadowRadius: 16,
            elevation: 8,
        },
        logoContainer: {
            marginBottom: 10,
            padding: isMobile ? 5 : 16,
            borderRadius: 20,
            backgroundColor: 'rgba(139, 92, 246, 0.08)',
            shadowColor: '#8B5CF6',
            shadowOffset: { width: 0, height: 6 },
            shadowOpacity: 0.15,
            shadowRadius: 20,
            elevation: 8,
            alignItems: 'center' as const,
            justifyContent: 'center' as const,
            borderWidth: 1,
            borderColor: 'rgba(139, 92, 246, 0.1)',
            overflow: 'hidden' as const,
        },
        logoImage: {
            width: isMobile ? 140 : 180,
            height: isMobile ? 50 : 65,
            maxWidth: '90%',
            maxHeight: '90%',
        },
        welcomeText: {
            fontSize: isMobile ? 24 : 28,
            fontWeight: '700' as const,
            color: '#1A202C',
            textAlign: 'center' as const,
            marginBottom: 8,
            letterSpacing: -0.5,
        },
        subtitleText: {
            fontSize: isMobile ? 16 : 18,
            color: '#718096',
            textAlign: 'center' as const,
            marginBottom: 12,
            fontWeight: '400' as const,
        },
        formContainer: {
            backgroundColor: '#FFFFFF',
            borderRadius: 20,
            padding: isMobile ? 24 : 32,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.08,
            shadowRadius: 16,
            elevation: 8,
            marginBottom: 24,
        },
        formTitle: {
            fontSize: isMobile ? 20 : 24,
            fontWeight: '700' as const,
            color: '#1A202C',
            textAlign: 'center' as const,
            marginBottom: 8,
            letterSpacing: -0.3,
        },
        formSubtitle: {
            fontSize: isMobile ? 14 : 16,
            color: '#718096',
            textAlign: 'center' as const,
            marginBottom: 32,
            fontWeight: '400' as const,
        },
        inputGroup: {
            marginBottom: 24,
            width: '100%',
        },
        label: {
            fontSize: isMobile ? 14 : 15,
            fontWeight: '600' as const,
            color: '#2D3748',
            marginBottom: 12,
            letterSpacing: 0.2,
        },
        input: {
            backgroundColor: '#FFFFFF',
            borderWidth: 2,
            borderColor: '#E2E8F0',
            borderRadius: 12,
            paddingHorizontal: isMobile ? 16 : 20,
            paddingVertical: isMobile ? 16 : 18,
            fontSize: isMobile ? 16 : 17,
            color: '#2D3748',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.05,
            shadowRadius: 3,
            elevation: 2,
        },
        inputError: {
            borderColor: '#E53E3E',
            borderWidth: 2,
            backgroundColor: '#FED7D7',
        },
        passwordContainer: {
            position: 'relative',
        },
        passwordInput: {
            paddingRight: 50,
        },
        passwordToggle: {
            position: 'absolute',
            right: 16,
            top: '50%',
            transform: [{ translateY: -12 }],
            padding: 4,
        },
        errorText: {
            color: '#E53E3E',
            fontSize: 13,
            marginTop: 6,
            marginLeft: 4,
            fontWeight: '500' as const,
        },
        rememberMeContainer: {
            flexDirection: 'row' as const,
            alignItems: 'center' as const,
            justifyContent: 'space-between' as const,
            marginBottom: 32,
        },
        rememberMeLeft: {
            flexDirection: 'row' as const,
            alignItems: 'center' as const,
        },
        checkbox: {
            width: 20,
            height: 20,
            borderWidth: 2,
            borderColor: '#E2E8F0',
            borderRadius: 4,
            marginRight: 12,
            alignItems: 'center' as const,
            justifyContent: 'center' as const,
            backgroundColor: '#FFFFFF',
        },
        checkboxChecked: {
            backgroundColor: '#8B5CF6',
            borderColor: '#8B5CF6',
        },
        checkboxIcon: {
            color: '#FFFFFF',
            fontSize: 12,
            fontWeight: 'bold' as const,
        },
        rememberMeText: {
            fontSize: isMobile ? 14 : 15,
            color: '#2D3748',
            fontWeight: '500' as const,
        },
        forgotPassword: {
            fontSize: isMobile ? 14 : 15,
            color: '#8B5CF6',
            fontWeight: '600' as const,
        },
        signInButton: {
            flexDirection: 'row' as const,
            alignItems: 'center' as const,
            justifyContent: 'center' as const,
            backgroundColor: '#8B5CF6',
            borderRadius: 16,
            paddingVertical: isMobile ? 18 : 20,
            marginBottom: 24,
            shadowColor: '#8B5CF6',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 12,
            elevation: 8,
        },
        signInButtonDisabled: {
            backgroundColor: '#CBD5E0',
            shadowOpacity: 0.1,
        },
        signInButtonText: {
            fontSize: isMobile ? 17 : 18,
            fontWeight: '700' as const,
            color: '#FFFFFF',
            marginRight: 8,
            letterSpacing: 0.3,
        },
        divider: {
            flexDirection: 'row' as const,
            alignItems: 'center' as const,
            marginVertical: 24,
        },
        dividerLine: {
            flex: 1,
            height: 1,
            backgroundColor: '#E2E8F0',
        },
        dividerText: {
            fontSize: 14,
            color: '#718096',
            marginHorizontal: 16,
            fontWeight: '500' as const,
        },
        signUpContainer: {
            flexDirection: 'row' as const,
            justifyContent: 'center' as const,
            alignItems: 'center' as const,
        },
        signUpText: {
            fontSize: isMobile ? 15 : 16,
            color: '#718096',
            fontWeight: '500' as const,
        },
        signUpLink: {
            fontSize: isMobile ? 15 : 16,
            color: '#8B5CF6',
            fontWeight: '600' as const,
            marginLeft: 4,
        },
    });

    const styles = getStyles();

    const handleSignIn = () => {
        if (!isFormValid()) {
            let errorMessage = 'Please fix the following errors:\n';
            
            if (!validateNationalIdOrEmail(nationalIdOrEmail)) {
                errorMessage += '• Please enter a valid National ID (14 digits) or Email address\n';
            }
            if (!validatePassword(password)) {
                errorMessage += '• Password must be at least 6 characters\n';
            }
            
            alert(errorMessage);
            return;
        }
        
        // In a real app, you'd handle authentication here.
        // For now, we'll just navigate to the main page.
        router.replace('/');
    };

    const handleForgotPassword = () => {
        // Navigate to forgot password screen
        alert('Forgot password functionality would be implemented here');
    };

    const handleSignUp = () => {
        // Navigate to sign up screen
        router.push('/signup');
    };

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
            <View style={styles.logoHeader}>
                <View style={styles.logoContainer}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ 
                            fontSize: 32, 
                            fontWeight: '800',
                            color: '#2563EB',
                            letterSpacing: -0.5,
                        }}>
                            i
                        </Text>
                        <Text style={{ 
                            fontSize: 32, 
                            fontWeight: '800',
                            color: '#8B5CF6',
                            letterSpacing: -0.5,
                        }}>
                            score
                        </Text>
                    </View>
                </View>
                <Text style={styles.welcomeText}>Welcome Back</Text>
                <Text style={styles.subtitleText}>Sign in to continue your credit journey</Text>
            </View>

            <View style={styles.formContainer}>
                <Text style={styles.formTitle}>Sign In</Text>
                <Text style={styles.formSubtitle}>Enter your credentials to access your account</Text>

                <View style={styles.inputGroup}>
                    <Text style={styles.label}>National ID or Email *</Text>
                    <TextInput 
                        style={[
                            styles.input,
                            nationalIdOrEmail.length > 0 && !validateNationalIdOrEmail(nationalIdOrEmail) && styles.inputError
                        ]}
                        placeholder="Enter your National ID or Email"
                        placeholderTextColor={'#9CA3AF'}
                        value={nationalIdOrEmail}
                        onChangeText={setNationalIdOrEmail}
                        autoCapitalize="none"
                        keyboardType="email-address"
                    />
                    {nationalIdOrEmail.length > 0 && !validateNationalIdOrEmail(nationalIdOrEmail) && (
                        <Text style={styles.errorText}>Please enter a valid National ID (14 digits) or Email</Text>
                    )}
                </View>

                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Password *</Text>
                    <View style={styles.passwordContainer}>
                        <TextInput 
                            style={[
                                styles.input,
                                styles.passwordInput,
                                password.length > 0 && !validatePassword(password) && styles.inputError
                            ]}
                            placeholder="Enter your password"
                            placeholderTextColor={'#9CA3AF'}
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry={!showPassword}
                            autoCapitalize="none"
                        />
                        <TouchableOpacity 
                            style={styles.passwordToggle}
                            onPress={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? (
                                <EyeOff color="#718096" size={20} />
                            ) : (
                                <Eye color="#718096" size={20} />
                            )}
                        </TouchableOpacity>
                    </View>
                    {password.length > 0 && !validatePassword(password) && (
                        <Text style={styles.errorText}>Password must be at least 6 characters</Text>
                    )}
                </View>

                <View style={styles.rememberMeContainer}>
                    <TouchableOpacity 
                        style={styles.rememberMeLeft}
                        onPress={() => setRememberMe(!rememberMe)}
                    >
                        <View style={[styles.checkbox, rememberMe && styles.checkboxChecked]}>
                            {rememberMe && <Text style={styles.checkboxIcon}>✓</Text>}
                        </View>
                        <Text style={styles.rememberMeText}>Remember me</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleForgotPassword}>
                        <Text style={styles.forgotPassword}>Forgot Password?</Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity 
                    style={[
                        styles.signInButton, 
                        !isFormValid() && styles.signInButtonDisabled
                    ]} 
                    onPress={handleSignIn}
                    disabled={!isFormValid()}
                >
                    <Text style={styles.signInButtonText}>Sign In</Text>
                    <ChevronRight color="#FFFFFF" size={20} />
                </TouchableOpacity>

                <View style={styles.divider}>
                    <View style={styles.dividerLine} />
                    <Text style={styles.dividerText}>or</Text>
                    <View style={styles.dividerLine} />
                </View>

                <View style={styles.signUpContainer}>
                    <Text style={styles.signUpText}>Don't have an account?</Text>
                    <TouchableOpacity onPress={handleSignUp}>
                        <Text style={styles.signUpLink}>Sign Up</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
}
