import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Dimensions,
    Modal,
    Image,
} from 'react-native';
import { ChevronDown, ChevronRight, Calendar, Eye, EyeOff } from 'lucide-react-native';
import { useRouter } from 'expo-router';

export default function SignUpScreen() {
    const [nationalIdOrPassport, setNationalIdOrPassport] = useState('');
    const [fullName, setFullName] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [gender, setGender] = useState('');
    const [nationality, setNationality] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [heardFrom, setHeardFrom] = useState('');
    const [otherSpecify, setOtherSpecify] = useState('');
    const [isRobotChecked, setIsRobotChecked] = useState(false);
    const [isTermsAccepted, setIsTermsAccepted] = useState(false);
    const [showGenderDropdown, setShowGenderDropdown] = useState(false);
    const [showNationalityDropdown, setShowNationalityDropdown] = useState(false);
    const [showHeardFromDropdown, setShowHeardFromDropdown] = useState(false);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [screenData, setScreenData] = useState(Dimensions.get('window'));
    const router = useRouter();

    useEffect(() => {
        const onChange = (result: any) => {
            setScreenData(result.window);
        };

        const subscription = Dimensions.addEventListener('change', onChange);
        return () => subscription?.remove();
    }, []);

    const isMobile = screenData.width < 500; // Using 500px as breakpoint for better mobile detection

    // Validation functions
    const validateNationalIdOrPassport = (value: string) => {
        // Check if it's a 14-digit Egyptian National ID
        const egyptianIdRegex = /^\d{14}$/;
        if (egyptianIdRegex.test(value)) {
            return true;
        }
        
        // Check if it's a valid passport (at least 6 characters, letters and numbers)
        const passportRegex = /^[A-Z0-9]{6,}$/i;
        if (passportRegex.test(value.trim())) {
            return true;
        }
        
        return false;
    };

    const validateFullName = (name: string) => {
        return name.trim().length >= 2;
    };

    const validateMobileNumber = (number: string) => {
        return /^\d{11}$/.test(number) && number.startsWith('0');
    };

    const validateDateOfBirth = (date: string) => {
        const dateRegex = /^(0[1-9]|[1-2][0-9]|3[0-1])\s*-\s*(0[1-9]|1[0-2])\s*-\s*(\d{4})$/;
        if (!dateRegex.test(date)) return false;
        
        const [day, month, year] = date.split('-').map(part => parseInt(part.trim()));
        const inputDate = new Date(year, month - 1, day);
        const today = new Date();
        const age = today.getFullYear() - year;
        
        return inputDate <= today && age >= 18 && age <= 100;
    };

    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email.trim());
    };

    const validatePassword = (password: string) => {
        // Password must be at least 8 characters long
        if (password.length < 8) return { isValid: false, errors: ['Must be at least 8 characters'] };
        
        const errors = [];
        
        // Check for uppercase letter
        if (!/[A-Z]/.test(password)) {
            errors.push('Must contain at least one uppercase letter');
        }
        
        // Check for lowercase letter
        if (!/[a-z]/.test(password)) {
            errors.push('Must contain at least one lowercase letter');
        }
        
        // Check for number
        if (!/\d/.test(password)) {
            errors.push('Must contain at least one number');
        }
        
        // Check for special character
        if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
            errors.push('Must contain at least one special character');
        }
        
        return { isValid: errors.length === 0, errors };
    };

    const validateConfirmPassword = (password: string, confirmPassword: string) => {
        return password === confirmPassword && password.length > 0;
    };

    const getPasswordStrength = (password: string) => {
        if (password.length === 0) return { strength: 'None', color: '#E2E8F0', percentage: 0 };
        
        let score = 0;
        if (password.length >= 8) score++;
        if (/[A-Z]/.test(password)) score++;
        if (/[a-z]/.test(password)) score++;
        if (/\d/.test(password)) score++;
        if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) score++;
        
        if (score < 2) return { strength: 'Weak', color: '#E53E3E', percentage: 20 };
        if (score < 4) return { strength: 'Medium', color: '#DD6B20', percentage: 60 };
        if (score < 5) return { strength: 'Strong', color: '#38A169', percentage: 80 };
        return { strength: 'Very Strong', color: '#38A169', percentage: 100 };
    };

    // Check if all required fields are filled and valid
    const isFormValid = () => {
        return (
            validateNationalIdOrPassport(nationalIdOrPassport) &&
            validateFullName(fullName) &&
            validateMobileNumber(mobileNumber) &&
            validateDateOfBirth(dateOfBirth) &&
            gender !== '' &&
            nationality !== '' &&
            validateEmail(email) &&
            validatePassword(password).isValid &&
            validateConfirmPassword(password, confirmPassword) &&
            isRobotChecked &&
            isTermsAccepted
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
            maxWidth: 800,
            alignSelf: 'center',
            width: '100%',
        },
        logoHeader: {
            alignItems: 'center' as const,
            paddingVertical: isMobile ? 32 : 40,
            marginBottom: isMobile ? 24 : 32,
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
            width: isMobile ? 320 : 400,
            height: isMobile ? 120 : 150,
            resizeMode: 'stretch',
            backgroundColor: 'transparent',
        },
        welcomeText: {
            fontSize: isMobile ? 28 : 32,
            fontWeight: '700' as const,
            color: '#1A202C',
            textAlign: 'center' as const,
            marginBottom: 8,
            letterSpacing: -0.5,
        },
        subtitleText: {
            fontSize: isMobile ? 18 : 20,
            color: '#718096',
            textAlign: 'center' as const,
            marginBottom: 12,
            fontWeight: '400' as const,
        },
        header: {
            fontSize: isMobile ? 16 : 18,
            fontWeight: '500' as const,
            marginBottom: 32,
            color: '#A0AEC0',
            textAlign: 'center' as const,
            fontStyle: 'italic' as const,
        },
        row: {
            flexDirection: 'row' as const,
            justifyContent: 'space-between' as const,
            marginBottom: 24,
            gap: isMobile ? 12 : 16,
        },
        column: {
            flexDirection: 'column' as const,
            marginBottom: 24,
        },
        inputGroup: {
            marginBottom: 24,
            width: '100%',
        },
        halfWidth: {
            width: isMobile ? '100%' : '48%',
            flex: isMobile ? 0 : 1,
        },
        fullWidth: {
            width: '100%',
        },
        label: {
            fontSize: isMobile ? 16 : 17,
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
            fontSize: isMobile ? 18 : 19,
            color: '#2D3748',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.05,
            shadowRadius: 3,
            elevation: 2,
        },
        inputDisabled: {
            backgroundColor: '#F7FAFC',
            color: '#A0AEC0',
            borderColor: '#E2E8F0',
        },
        inputError: {
            borderColor: '#E53E3E',
            borderWidth: 2,
            backgroundColor: '#FED7D7',
        },
        errorText: {
            color: '#E53E3E',
            fontSize: 15,
            marginTop: 6,
            marginLeft: 4,
            fontWeight: '500' as const,
        },
        passwordContainer: {
            position: 'relative' as const,
            width: '100%',
        },
        passwordInputContainer: {
            flexDirection: 'row' as const,
            alignItems: 'center' as const,
            backgroundColor: '#FFFFFF',
            borderWidth: 2,
            borderColor: '#E2E8F0',
            borderRadius: 12,
            paddingHorizontal: isMobile ? 16 : 20,
            paddingVertical: isMobile ? 16 : 18,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.05,
            shadowRadius: 3,
            elevation: 2,
        },
        passwordInput: {
            flex: 1,
            fontSize: isMobile ? 18 : 19,
            color: '#2D3748',
            paddingRight: 12,
        },
        passwordToggle: {
            padding: 4,
        },
        passwordStrengthContainer: {
            marginTop: 8,
            marginBottom: 4,
        },
        passwordStrengthBar: {
            height: 4,
            backgroundColor: '#E2E8F0',
            borderRadius: 2,
            overflow: 'hidden' as const,
            marginBottom: 8,
        },
        passwordStrengthFill: {
            height: '100%',
            borderRadius: 2,
        },
        passwordStrengthText: {
            fontSize: 14,
            fontWeight: '600' as const,
            marginBottom: 4,
        },
        passwordCriteria: {
            marginTop: 4,
        },
        passwordCriteriaItem: {
            flexDirection: 'row' as const,
            alignItems: 'center' as const,
            marginBottom: 2,
        },
        passwordCriteriaIcon: {
            fontSize: 14,
            marginRight: 6,
            fontWeight: 'bold' as const,
        },
        passwordCriteriaText: {
            fontSize: 14,
            color: '#718096',
        },
        passwordCriteriaValid: {
            color: '#38A169',
        },
        passwordCriteriaInvalid: {
            color: '#E53E3E',
        },
        segmentedInputContainer: {
            flexDirection: 'row' as const,
            alignItems: 'center' as const,
            width: '100%',
            gap: isMobile ? 8 : 12,
        },
        segmentedInput: {
            minWidth: 0,
        },
        clearButton: {
            padding: isMobile ? 6 : 8,
            paddingHorizontal: isMobile ? 8 : 10,
            borderRadius: 8,
            backgroundColor: '#F7FAFC',
        },
        clearButtonText: {
            fontSize: isMobile ? 16 : 18,
            color: '#718096',
            fontWeight: '500' as const,
        },
        picker: {
            flexDirection: 'row' as const,
            alignItems: 'center' as const,
            justifyContent: 'space-between' as const,
            backgroundColor: '#FFFFFF',
            borderWidth: 2,
            borderColor: '#E2E8F0',
            borderRadius: 12,
            paddingHorizontal: isMobile ? 16 : 20,
            paddingVertical: isMobile ? 16 : 18,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.05,
            shadowRadius: 3,
            elevation: 2,
        },
        pickerText: {
            fontSize: isMobile ? 18 : 19,
            color: '#A0AEC0',
            fontWeight: '400' as const,
        },
        pickerSelectedText: {
            fontSize: isMobile ? 18 : 19,
            color: '#2D3748',
            fontWeight: '500' as const,
        },
        dropdown: {
            backgroundColor: '#FFFFFF',
            borderWidth: 1,
            borderColor: '#E2E8F0',
            borderRadius: 12,
            marginTop: 8,
            maxHeight: 200,
            elevation: 8,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.1,
            shadowRadius: 8,
        },
        modalOverlay: {
            flex: 1,
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            justifyContent: 'center' as const,
            alignItems: 'center' as const,
            padding: 24,
        },
        modalContent: {
            backgroundColor: '#FFFFFF',
            borderRadius: 20,
            padding: 24,
            width: '100%',
            maxWidth: 340,
            maxHeight: 400,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 10 },
            shadowOpacity: 0.15,
            shadowRadius: 20,
            elevation: 20,
        },
        modalTitle: {
            fontSize: isMobile ? 20 : 22,
            fontWeight: '700' as const,
            marginBottom: 20,
            textAlign: 'center' as const,
            color: '#1A202C',
            letterSpacing: -0.3,
        },
        dropdownItem: {
            paddingHorizontal: 20,
            paddingVertical: 16,
            borderBottomWidth: 1,
            borderBottomColor: '#F7FAFC',
            borderRadius: 8,
            marginBottom: 4,
        },
        dropdownItemText: {
            fontSize: isMobile ? 16 : 17,
            color: '#2D3748',
            fontWeight: '500' as const,
        },
        dropdownContainer: {
            width: '100%',
        },
        textArea: {
            height: 120,
            textAlignVertical: 'top' as const,
            paddingTop: isMobile ? 16 : 18,
        },
        captchaContainer: {
            flexDirection: 'row' as const,
            alignItems: 'center' as const,
            marginVertical: 20,
            padding: 16,
            backgroundColor: '#FFFFFF',
            borderRadius: 12,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.05,
            shadowRadius: 8,
            elevation: 3,
        },
        checkbox: {
            width: 24,
            height: 24,
            borderWidth: 2,
            borderColor: '#E2E8F0',
            borderRadius: 6,
            marginRight: 16,
            alignItems: 'center' as const,
            justifyContent: 'center' as const,
            backgroundColor: '#FFFFFF',
        },
        checkboxChecked: {
            backgroundColor: '#8B5CF6',
            borderColor: '#8B5CF6',
            shadowColor: '#8B5CF6',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.2,
            shadowRadius: 4,
            elevation: 3,
        },
        checkboxIcon: {
            color: '#FFFFFF',
            fontSize: 16,
            fontWeight: 'bold' as const,
        },
        captchaText: {
            fontSize: isMobile ? 17 : 18,
            color: '#2D3748',
            fontWeight: '500' as const,
            flex: 1,
        },
        termsTextContainer: {
            flexDirection: 'row' as const,
            flexWrap: 'wrap' as const,
            alignItems: 'center' as const,
            flex: 1,
        },
        termsLink: {
            fontSize: isMobile ? 15 : 16,
            color: '#8B5CF6',
            textDecorationLine: 'underline' as const,
            fontWeight: '600' as const,
        },
        submitButton: {
            flexDirection: 'row' as const,
            alignItems: 'center' as const,
            justifyContent: 'center' as const,
            backgroundColor: '#8B5CF6',
            borderRadius: 16,
            paddingVertical: isMobile ? 18 : 20,
            marginTop: 32,
            shadowColor: '#8B5CF6',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 12,
            elevation: 8,
        },
        submitButtonDisabled: {
            backgroundColor: '#CBD5E0',
            shadowOpacity: 0.1,
        },
        submitButtonText: {
            fontSize: isMobile ? 19 : 20,
            fontWeight: '700' as const,
            color: '#FFFFFF',
            marginRight: 8,
            letterSpacing: 0.3,
        },
        datePickerContainer: {
            flexDirection: 'row' as const,
            justifyContent: 'space-between' as const,
            marginBottom: 24,
            height: 220,
            gap: 8,
        },
        datePickerColumn: {
            flex: 1,
            marginHorizontal: 4,
        },
        datePickerLabel: {
            fontSize: 15,
            fontWeight: '700' as const,
            color: '#2D3748',
            textAlign: 'center' as const,
            marginBottom: 12,
            letterSpacing: 0.2,
        },
        datePickerScroll: {
            flex: 1,
            borderWidth: 2,
            borderColor: '#E2E8F0',
            borderRadius: 12,
            backgroundColor: '#FFFFFF',
        },
        datePickerItem: {
            paddingVertical: 14,
            paddingHorizontal: 8,
            alignItems: 'center' as const,
            borderBottomWidth: 1,
            borderBottomColor: '#F7FAFC',
            marginHorizontal: 4,
            borderRadius: 8,
            marginVertical: 2,
        },
        datePickerItemSelected: {
            backgroundColor: '#8B5CF6',
            borderBottomColor: 'transparent',
            shadowColor: '#8B5CF6',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.2,
            shadowRadius: 4,
            elevation: 3,
        },
        datePickerItemText: {
            fontSize: 15,
            color: '#2D3748',
            fontWeight: '500' as const,
        },
        datePickerItemTextSelected: {
            fontWeight: '700' as const,
            color: '#FFFFFF',
        },
        datePickerButtons: {
            flexDirection: 'row' as const,
            justifyContent: 'space-between' as const,
            marginTop: 24,
            gap: 12,
        },
        datePickerCancelButton: {
            flex: 1,
            paddingVertical: 14,
            borderWidth: 2,
            borderColor: '#E2E8F0',
            borderRadius: 12,
            alignItems: 'center' as const,
            backgroundColor: '#FFFFFF',
        },
        datePickerCancelText: {
            fontSize: 16,
            color: '#718096',
            fontWeight: '600' as const,
        },
        datePickerConfirmButton: {
            flex: 1,
            paddingVertical: 14,
            backgroundColor: '#8B5CF6',
            borderRadius: 12,
            alignItems: 'center' as const,
            shadowColor: '#8B5CF6',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.2,
            shadowRadius: 4,
            elevation: 3,
        },
        datePickerConfirmButtonDisabled: {
            backgroundColor: '#CBD5E0',
            shadowOpacity: 0.1,
        },
        datePickerConfirmText: {
            fontSize: 16,
            fontWeight: '700' as const,
            color: '#FFFFFF',
        },
    });

    const styles = getStyles();

    const renderDropdownModal = (
        visible: boolean, 
        onClose: () => void, 
        title: string, 
        options: { label: string; value: string }[], 
        onSelect: (value: string) => void
    ) => (
        <Modal
            visible={visible}
            transparent={true}
            animationType="fade"
            onRequestClose={onClose}
        >
            <TouchableOpacity style={styles.modalOverlay} onPress={onClose} activeOpacity={1}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>{title}</Text>
                    <ScrollView>
                        {options.map((option, index) => (
                            <TouchableOpacity
                                key={index}
                                style={[
                                    styles.dropdownItem,
                                    index === options.length - 1 && { borderBottomWidth: 0 }
                                ]}
                                onPress={() => {
                                    onSelect(option.value);
                                    onClose();
                                }}
                            >
                                <Text style={styles.dropdownItemText}>{option.label}</Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>
            </TouchableOpacity>
        </Modal>
    );

    const renderDatePicker = () => {
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const years = [];
        for (let i = currentYear - 18; i >= currentYear - 100; i--) {
            years.push(i);
        }
        
        const months = [
            { name: 'January', value: 1 },
            { name: 'February', value: 2 },
            { name: 'March', value: 3 },
            { name: 'April', value: 4 },
            { name: 'May', value: 5 },
            { name: 'June', value: 6 },
            { name: 'July', value: 7 },
            { name: 'August', value: 8 },
            { name: 'September', value: 9 },
            { name: 'October', value: 10 },
            { name: 'November', value: 11 },
            { name: 'December', value: 12 }
        ];

        const [selectedDay, setSelectedDay] = useState('');
        const [selectedMonth, setSelectedMonth] = useState('');
        const [selectedYear, setSelectedYear] = useState('');

        const getDaysInMonth = (month: number, year: number) => {
            return new Date(year, month, 0).getDate();
        };

        const generateDays = () => {
            if (!selectedMonth || !selectedYear) return [];
            const daysInMonth = getDaysInMonth(parseInt(selectedMonth), parseInt(selectedYear));
            const days = [];
            for (let i = 1; i <= daysInMonth; i++) {
                days.push(i);
            }
            return days;
        };

        const handleConfirmDate = () => {
            if (selectedDay && selectedMonth && selectedYear) {
                const formattedDay = selectedDay.padStart(2, '0');
                const formattedMonth = selectedMonth.padStart(2, '0');
                const formattedDate = `${formattedDay}-${formattedMonth}-${selectedYear}`;
                setDateOfBirth(formattedDate);
                setShowDatePicker(false);
            }
        };

        return (
            <Modal
                visible={showDatePicker}
                transparent={true}
                animationType="fade"
                onRequestClose={() => setShowDatePicker(false)}
            >
                <TouchableOpacity 
                    style={styles.modalOverlay} 
                    onPress={() => setShowDatePicker(false)} 
                    activeOpacity={1}
                >
                    <View style={[styles.modalContent, { maxHeight: 400, width: '90%', maxWidth: 350 }]}>
                        <Text style={styles.modalTitle}>Select Date of Birth</Text>
                        
                        <View style={styles.datePickerContainer}>
                            {/* Day Selector */}
                            <View style={styles.datePickerColumn}>
                                <Text style={styles.datePickerLabel}>Day</Text>
                                <ScrollView style={styles.datePickerScroll} showsVerticalScrollIndicator={false}>
                                    {generateDays().map((day) => (
                                        <TouchableOpacity
                                            key={day}
                                            style={[
                                                styles.datePickerItem,
                                                selectedDay === day.toString() && styles.datePickerItemSelected
                                            ]}
                                            onPress={() => setSelectedDay(day.toString())}
                                        >
                                            <Text style={[
                                                styles.datePickerItemText,
                                                selectedDay === day.toString() && styles.datePickerItemTextSelected
                                            ]}>
                                                {day}
                                            </Text>
                                        </TouchableOpacity>
                                    ))}
                                </ScrollView>
                            </View>

                            {/* Month Selector */}
                            <View style={styles.datePickerColumn}>
                                <Text style={styles.datePickerLabel}>Month</Text>
                                <ScrollView style={styles.datePickerScroll} showsVerticalScrollIndicator={false}>
                                    {months.map((month) => (
                                        <TouchableOpacity
                                            key={month.value}
                                            style={[
                                                styles.datePickerItem,
                                                selectedMonth === month.value.toString() && styles.datePickerItemSelected
                                            ]}
                                            onPress={() => setSelectedMonth(month.value.toString())}
                                        >
                                            <Text style={[
                                                styles.datePickerItemText,
                                                selectedMonth === month.value.toString() && styles.datePickerItemTextSelected
                                            ]}>
                                                {month.name}
                                            </Text>
                                        </TouchableOpacity>
                                    ))}
                                </ScrollView>
                            </View>

                            {/* Year Selector */}
                            <View style={styles.datePickerColumn}>
                                <Text style={styles.datePickerLabel}>Year</Text>
                                <ScrollView style={styles.datePickerScroll} showsVerticalScrollIndicator={false}>
                                    {years.map((year) => (
                                        <TouchableOpacity
                                            key={year}
                                            style={[
                                                styles.datePickerItem,
                                                selectedYear === year.toString() && styles.datePickerItemSelected
                                            ]}
                                            onPress={() => setSelectedYear(year.toString())}
                                        >
                                            <Text style={[
                                                styles.datePickerItemText,
                                                selectedYear === year.toString() && styles.datePickerItemTextSelected
                                            ]}>
                                                {year}
                                            </Text>
                                        </TouchableOpacity>
                                    ))}
                                </ScrollView>
                            </View>
                        </View>

                        <View style={styles.datePickerButtons}>
                            <TouchableOpacity 
                                style={styles.datePickerCancelButton}
                                onPress={() => setShowDatePicker(false)}
                            >
                                <Text style={styles.datePickerCancelText}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                                style={[
                                    styles.datePickerConfirmButton,
                                    (!selectedDay || !selectedMonth || !selectedYear) && styles.datePickerConfirmButtonDisabled
                                ]}
                                onPress={handleConfirmDate}
                                disabled={!selectedDay || !selectedMonth || !selectedYear}
                            >
                                <Text style={styles.datePickerConfirmText}>Confirm</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </TouchableOpacity>
            </Modal>
        );
    };

    const handleSubmit = () => {
        if (!isFormValid()) {
            let errorMessage = 'Please fix the following errors:\n';
            
            if (!validateNationalIdOrPassport(nationalIdOrPassport)) {
                errorMessage += '• National ID must be exactly 14 digits OR Passport must be at least 6 characters (letters and numbers)\n';
            }
            if (!validateFullName(fullName)) {
                errorMessage += '• Full name must be at least 2 characters\n';
            }
            if (!validateMobileNumber(mobileNumber)) {
                errorMessage += '• Mobile number must be 11 digits starting with 0\n';
            }
            if (!validateDateOfBirth(dateOfBirth)) {
                errorMessage += '• Date of birth must be valid (DD-MM-YYYY) and age 18-100\n';
            }
            if (gender === '') {
                errorMessage += '• Please select your gender\n';
            }
            if (nationality === '') {
                errorMessage += '• Please select your nationality\n';
            }
            if (!validateEmail(email)) {
                errorMessage += '• Please enter a valid email address\n';
            }
            if (!validatePassword(password).isValid) {
                const passwordErrors = validatePassword(password).errors;
                errorMessage += '• Password requirements not met:\n';
                passwordErrors.forEach(error => {
                    errorMessage += `  - ${error}\n`;
                });
            }
            if (!validateConfirmPassword(password, confirmPassword)) {
                errorMessage += '• Passwords do not match\n';
            }
            if (!isRobotChecked) {
                errorMessage += '• Please confirm that you are not a robot\n';
            }
            if (!isTermsAccepted) {
                errorMessage += '• Please accept the Terms and Conditions\n';
            }
            
            alert(errorMessage);
            return;
        }
        
        // In a real app, you'd handle form validation and submission here.
        // For now, we'll just navigate to the main page.
        router.replace('/');
    };

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
            <View style={styles.logoHeader}>
                <View style={styles.logoContainer}>
                    <Image 
                        source={require('../assets/images/Dev-logo.svg')} 
                        style={styles.logoImage} 
                    />
                </View>
                <Text style={styles.welcomeText}>Welcome to Kepler</Text>
                <Text style={styles.subtitleText}>Your Credit Score Journey Starts Here</Text>
            </View>
            
            <Text style={styles.header}>Please make sure to fill all mandatory fields</Text>

            <View style={isMobile ? styles.column : styles.row}>
                <View style={[styles.inputGroup, isMobile ? styles.fullWidth : styles.halfWidth]}>
                    <Text style={styles.label}>National ID or Passport *</Text>
                    <TextInput 
                        style={[
                            styles.input,
                            nationalIdOrPassport.length > 0 && !validateNationalIdOrPassport(nationalIdOrPassport) && styles.inputError
                        ]}
                        placeholder="Enter 14-digit National ID or Passport"
                        placeholderTextColor={'#9CA3AF'}
                        value={nationalIdOrPassport}
                        onChangeText={setNationalIdOrPassport}
                    />
                    {nationalIdOrPassport.length > 0 && !validateNationalIdOrPassport(nationalIdOrPassport) && (
                        <Text style={styles.errorText}>Must be 14-digit National ID or valid Passport (6+ characters)</Text>
                    )}
                </View>
                <View style={[styles.inputGroup, isMobile ? styles.fullWidth : styles.halfWidth]}>
                    <Text style={styles.label}>Full Name (English or Arabic) *</Text>
                    <TextInput 
                        style={[
                            styles.input,
                            fullName.length > 0 && !validateFullName(fullName) && styles.inputError
                        ]} 
                        placeholder="Enter your full name"
                        placeholderTextColor={'#9CA3AF'}
                        value={fullName}
                        onChangeText={setFullName}
                    />
                    {fullName.length > 0 && !validateFullName(fullName) && (
                        <Text style={styles.errorText}>Must be at least 2 characters</Text>
                    )}
                </View>
            </View>

            <View style={isMobile ? styles.column : styles.row}>
                <View style={[styles.inputGroup, isMobile ? styles.fullWidth : styles.halfWidth]}>
                    <Text style={styles.label}>Mobile Number *</Text>
                    <View style={styles.segmentedInputContainer}>
                        <TextInput 
                            style={[styles.input, styles.segmentedInput, { width: isMobile ? 70 : 80 }]} 
                            value="+20" 
                            editable={false}
                            keyboardType="phone-pad"
                        />
                        <TextInput 
                            style={[
                                styles.input, 
                                { flex: 1 },
                                mobileNumber.length > 0 && !validateMobileNumber(mobileNumber) && styles.inputError
                            ]} 
                            placeholder="Enter 11 digits"
                            keyboardType="phone-pad"
                            maxLength={11}
                            value={mobileNumber}
                            onChangeText={setMobileNumber}
                        />
                    </View>
                    {mobileNumber.length > 0 && !validateMobileNumber(mobileNumber) && (
                        <Text style={styles.errorText}>Must be 11 digits starting with 1</Text>
                    )}
                </View>
                <View style={[styles.inputGroup, isMobile ? styles.fullWidth : styles.halfWidth]}>
                    <Text style={styles.label}>Date of Birth *</Text>
                    <TouchableOpacity 
                        style={[
                            styles.picker,
                            dateOfBirth.length > 0 && !validateDateOfBirth(dateOfBirth) && styles.inputError
                        ]}
                        onPress={() => setShowDatePicker(true)}
                    >
                        <Text style={dateOfBirth ? styles.pickerSelectedText : styles.pickerText}>
                            {dateOfBirth || 'Select your date of birth'}
                        </Text>
                        <Calendar color="#6B7280" size={20} />
                    </TouchableOpacity>
                    {dateOfBirth.length > 0 && !validateDateOfBirth(dateOfBirth) && (
                        <Text style={styles.errorText}>Valid format: DD-MM-YYYY, age 18-100</Text>
                    )}
                </View>
            </View>

            <View style={isMobile ? styles.column : styles.row}>
                <View style={[styles.inputGroup, isMobile ? styles.fullWidth : styles.halfWidth]}>
                    <Text style={styles.label}>Gender *</Text>
                    <View style={styles.dropdownContainer}>
                        <TouchableOpacity 
                            style={styles.picker} 
                            onPress={() => setShowGenderDropdown(true)}
                        >
                            <Text style={gender ? styles.pickerSelectedText : styles.pickerText}>
                                {gender || 'Select your gender'}
                            </Text>
                            <ChevronDown color="#6B7280" size={20} />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={[styles.inputGroup, isMobile ? styles.fullWidth : styles.halfWidth]}>
                    <Text style={styles.label}>Nationality *</Text>
                    <View style={styles.dropdownContainer}>
                        <TouchableOpacity 
                            style={styles.picker} 
                            onPress={() => setShowNationalityDropdown(true)}
                        >
                            <Text style={nationality ? styles.pickerSelectedText : styles.pickerText}>
                                {nationality || 'Select your nationality'}
                            </Text>
                            <ChevronDown color="#6B7280" size={20} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            <View style={isMobile ? styles.column : styles.row}>
                <View style={[styles.inputGroup, isMobile ? styles.fullWidth : styles.halfWidth]}>
                    <Text style={styles.label}>Email *</Text>
                    <TextInput 
                        style={[
                            styles.input,
                            email.length > 0 && !validateEmail(email) && styles.inputError
                        ]} 
                        placeholder="Enter your email" 
                        keyboardType="email-address"
                        value={email}
                        onChangeText={setEmail}
                    />
                    {email.length > 0 && !validateEmail(email) && (
                        <Text style={styles.errorText}>Please enter a valid email address</Text>
                    )}
                </View>
                <View style={[styles.inputGroup, isMobile ? styles.fullWidth : styles.halfWidth]} />
            </View>

            <View style={isMobile ? styles.column : styles.row}>
                <View style={[styles.inputGroup, isMobile ? styles.fullWidth : styles.halfWidth]}>
                    <Text style={styles.label}>Password *</Text>
                    <View style={styles.passwordContainer}>
                        <View style={[
                            styles.passwordInputContainer,
                            password.length > 0 && !validatePassword(password).isValid && styles.inputError
                        ]}>
                            <TextInput 
                                style={styles.passwordInput}
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
                        
                        {password.length > 0 && (
                            <View style={styles.passwordStrengthContainer}>
                                <View style={styles.passwordStrengthBar}>
                                    <View 
                                        style={[
                                            styles.passwordStrengthFill,
                                            { 
                                                width: `${getPasswordStrength(password).percentage}%`,
                                                backgroundColor: getPasswordStrength(password).color 
                                            }
                                        ]} 
                                    />
                                </View>
                                <Text style={[
                                    styles.passwordStrengthText,
                                    { color: getPasswordStrength(password).color }
                                ]}>
                                    {getPasswordStrength(password).strength}
                                </Text>
                                
                                <View style={styles.passwordCriteria}>
                                    <View style={styles.passwordCriteriaItem}>
                                        <Text style={[
                                            styles.passwordCriteriaIcon,
                                            password.length >= 8 ? styles.passwordCriteriaValid : styles.passwordCriteriaInvalid
                                        ]}>
                                            {password.length >= 8 ? '✓' : '✗'}
                                        </Text>
                                        <Text style={[
                                            styles.passwordCriteriaText,
                                            password.length >= 8 ? styles.passwordCriteriaValid : styles.passwordCriteriaInvalid
                                        ]}>
                                            At least 8 characters
                                        </Text>
                                    </View>
                                    
                                    <View style={styles.passwordCriteriaItem}>
                                        <Text style={[
                                            styles.passwordCriteriaIcon,
                                            /[A-Z]/.test(password) ? styles.passwordCriteriaValid : styles.passwordCriteriaInvalid
                                        ]}>
                                            {/[A-Z]/.test(password) ? '✓' : '✗'}
                                        </Text>
                                        <Text style={[
                                            styles.passwordCriteriaText,
                                            /[A-Z]/.test(password) ? styles.passwordCriteriaValid : styles.passwordCriteriaInvalid
                                        ]}>
                                            One uppercase letter
                                        </Text>
                                    </View>
                                    
                                    <View style={styles.passwordCriteriaItem}>
                                        <Text style={[
                                            styles.passwordCriteriaIcon,
                                            /[a-z]/.test(password) ? styles.passwordCriteriaValid : styles.passwordCriteriaInvalid
                                        ]}>
                                            {/[a-z]/.test(password) ? '✓' : '✗'}
                                        </Text>
                                        <Text style={[
                                            styles.passwordCriteriaText,
                                            /[a-z]/.test(password) ? styles.passwordCriteriaValid : styles.passwordCriteriaInvalid
                                        ]}>
                                            One lowercase letter
                                        </Text>
                                    </View>
                                    
                                    <View style={styles.passwordCriteriaItem}>
                                        <Text style={[
                                            styles.passwordCriteriaIcon,
                                            /\d/.test(password) ? styles.passwordCriteriaValid : styles.passwordCriteriaInvalid
                                        ]}>
                                            {/\d/.test(password) ? '✓' : '✗'}
                                        </Text>
                                        <Text style={[
                                            styles.passwordCriteriaText,
                                            /\d/.test(password) ? styles.passwordCriteriaValid : styles.passwordCriteriaInvalid
                                        ]}>
                                            One number
                                        </Text>
                                    </View>
                                    
                                    <View style={styles.passwordCriteriaItem}>
                                        <Text style={[
                                            styles.passwordCriteriaIcon,
                                            /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password) ? styles.passwordCriteriaValid : styles.passwordCriteriaInvalid
                                        ]}>
                                            {/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password) ? '✓' : '✗'}
                                        </Text>
                                        <Text style={[
                                            styles.passwordCriteriaText,
                                            /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password) ? styles.passwordCriteriaValid : styles.passwordCriteriaInvalid
                                        ]}>
                                            One special character
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        )}
                    </View>
                </View>
                <View style={[styles.inputGroup, isMobile ? styles.fullWidth : styles.halfWidth]}>
                    <Text style={styles.label}>Confirm Password *</Text>
                    <View style={[
                        styles.passwordInputContainer,
                        confirmPassword.length > 0 && !validateConfirmPassword(password, confirmPassword) && styles.inputError
                    ]}>
                        <TextInput 
                            style={styles.passwordInput}
                            placeholder="Confirm your password" 
                            placeholderTextColor={'#9CA3AF'}
                            value={confirmPassword}
                            onChangeText={setConfirmPassword}
                            secureTextEntry={!showConfirmPassword}
                            autoCapitalize="none"
                        />
                        <TouchableOpacity 
                            style={styles.passwordToggle}
                            onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                            {showConfirmPassword ? (
                                <EyeOff color="#718096" size={20} />
                            ) : (
                                <Eye color="#718096" size={20} />
                            )}
                        </TouchableOpacity>
                    </View>
                    {confirmPassword.length > 0 && !validateConfirmPassword(password, confirmPassword) && (
                        <Text style={styles.errorText}>Passwords do not match</Text>
                    )}
                </View>
            </View>

            <View style={isMobile ? styles.column : styles.row}>
                <View style={[styles.inputGroup, isMobile ? styles.fullWidth : styles.halfWidth]}>
                    <Text style={styles.label}>Where did you hear about us?</Text>
                    <View style={styles.dropdownContainer}>
                        <TouchableOpacity 
                            style={styles.picker} 
                            onPress={() => setShowHeardFromDropdown(true)}
                        >
                            <Text style={heardFrom ? styles.pickerSelectedText : styles.pickerText}>
                                {heardFrom || 'Please select...'}
                            </Text>
                            <ChevronDown color="#6B7280" size={20} />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={[styles.inputGroup, isMobile ? styles.fullWidth : styles.halfWidth]} />
            </View>

            <View style={styles.inputGroup}>
                <Text style={styles.label}>If other, please specify</Text>
                <TextInput
                    style={[
                        styles.input, 
                        styles.textArea,
                        heardFrom !== 'Other' && styles.inputDisabled
                    ]}
                    placeholder={heardFrom === 'Other' ? "Tell Us" : "Please select 'Other' above to enable this field"}
                    placeholderTextColor={heardFrom === 'Other' ? '#9CA3AF' : '#D1D5DB'}
                    multiline
                    editable={heardFrom === 'Other'}
                    value={heardFrom === 'Other' ? otherSpecify : ''}
                    onChangeText={setOtherSpecify}
                />
            </View>

            <View style={styles.captchaContainer}>
                <TouchableOpacity 
                    style={[styles.checkbox, isRobotChecked && styles.checkboxChecked]}
                    onPress={() => setIsRobotChecked(!isRobotChecked)}
                >
                    {isRobotChecked && <Text style={styles.checkboxIcon}>✓</Text>}
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setIsRobotChecked(!isRobotChecked)}>
                    <Text style={styles.captchaText}>I'm not a robot</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.captchaContainer}>
                <TouchableOpacity 
                    style={[styles.checkbox, isTermsAccepted && styles.checkboxChecked]}
                    onPress={() => setIsTermsAccepted(!isTermsAccepted)}
                >
                    {isTermsAccepted && <Text style={styles.checkboxIcon}>✓</Text>}
                </TouchableOpacity>
                <View style={styles.termsTextContainer}>
                    <Text style={styles.captchaText}>I have read and agree to the </Text>
                    <TouchableOpacity onPress={() => router.push('/terms')}>
                        <Text style={styles.termsLink}>Terms and Conditions</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <TouchableOpacity 
                style={[
                    styles.submitButton, 
                    !isFormValid() && styles.submitButtonDisabled
                ]} 
                onPress={handleSubmit}
                disabled={!isFormValid()}
            >
                <Text style={styles.submitButtonText}>Submit</Text>
                <ChevronRight color="#FFFFFF" size={20} />
            </TouchableOpacity>

            {/* Gender Modal */}
            {renderDropdownModal(
                showGenderDropdown,
                () => setShowGenderDropdown(false),
                'Select Gender',
                [
                    { label: 'Male', value: 'Male' },
                    { label: 'Female', value: 'Female' }
                ],
                setGender
            )}

            {/* Nationality Modal */}
            {renderDropdownModal(
                showNationalityDropdown,
                () => setShowNationalityDropdown(false),
                'Select Nationality',
                [
                    { label: 'Egyptian', value: 'Egyptian' },
                    { label: 'Foreign', value: 'Foreign' }
                ],
                setNationality
            )}

            {/* Heard From Modal */}
            {renderDropdownModal(
                showHeardFromDropdown,
                () => setShowHeardFromDropdown(false),
                'Where did you hear about us?',
                [
                    { label: 'Social Media', value: 'Social Media' },
                    { label: 'Google Search', value: 'Google Search' },
                    { label: 'Friend/Family', value: 'Friend/Family' },
                    { label: 'Advertisement', value: 'Advertisement' },
                    { label: 'Other', value: 'Other' }
                ],
                (value) => {
                    setHeardFrom(value);
                    if (value !== 'Other') {
                        setOtherSpecify('');
                    }
                }
            )}

            {/* Date Picker Modal */}
            {renderDatePicker()}
        </ScrollView>
    );
} 