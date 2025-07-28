import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Dimensions,
} from 'react-native';
import { ChevronDown, ChevronRight } from 'lucide-react-native';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

export default function SignUpScreen() {
    const [gender, setGender] = useState('');
    const [nationality, setNationality] = useState('');
    const [heardFrom, setHeardFrom] = useState('');
    const router = useRouter();

    const handleSubmit = () => {
        // In a real app, you'd handle form validation and submission here.
        // For now, we'll just navigate to the main page.
        router.replace('/');
    };

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
            <Text style={styles.header}>Please make sure to fill all mandatory fields</Text>

            <View style={styles.row}>
                <View style={[styles.inputGroup, styles.halfWidth]}>
                    <Text style={styles.label}>Egyptian ID</Text>
                    <View style={styles.segmentedInputContainer}>
                        <TextInput style={[styles.input, styles.segmentedInput, { flex: 0.25 }]} defaultValue="784" />
                        <TextInput style={[styles.input, styles.segmentedInput, { flex: 0.35 }]} placeholder="XXXX" />
                        <TextInput style={[styles.input, styles.segmentedInput, { flex: 0.4 }]} placeholder="XXXXXXX" />
                        <TouchableOpacity style={styles.clearButton}>
                            <Text style={styles.clearButtonText}>X</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={[styles.inputGroup, styles.halfWidth]}>
                    <Text style={styles.label}>Full Name</Text>
                    <TextInput style={styles.input} placeholder="Enter your full name" />
                </View>
            </View>

            <View style={styles.row}>
                <View style={[styles.inputGroup, styles.halfWidth]}>
                    <Text style={styles.label}>Mobile Number (example +971 50 xxxxxxx)</Text>
                    <View style={styles.segmentedInputContainer}>
                        <TextInput style={[styles.input, { flex: 0.3 }]} defaultValue="+971" />
                        <TextInput style={[styles.input, { flex: 0.7, marginLeft: 8 }]} placeholder="XXXX" />
                    </View>
                </View>
                <View style={[styles.inputGroup, styles.halfWidth]}>
                    <Text style={styles.label}>Date of Birth</Text>
                    <TextInput style={styles.input} placeholder="DD - MM - YYYY" />
                </View>
            </View>

            <View style={styles.row}>
                <View style={[styles.inputGroup, styles.halfWidth]}>
                    <Text style={styles.label}>Gender</Text>
                    <TouchableOpacity style={styles.picker} onPress={() => { }}>
                        <Text style={styles.pickerText}>Select your gender</Text>
                        <ChevronDown color="#6B7280" size={20} />
                    </TouchableOpacity>
                </View>
                <View style={[styles.inputGroup, styles.halfWidth]}>
                    <Text style={styles.label}>Nationality</Text>
                    <TouchableOpacity style={styles.picker} onPress={() => { }}>
                        <Text style={styles.pickerText}>Select your nationality</Text>
                        <ChevronDown color="#6B7280" size={20} />
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.row}>
                <View style={[styles.inputGroup, styles.halfWidth]}>
                    <Text style={styles.label}>Email</Text>
                    <TextInput style={styles.input} placeholder="Enter your email" keyboardType="email-address" />
                </View>
                <View style={[styles.inputGroup, styles.halfWidth]}>
                    <Text style={styles.label}>Confirm Email</Text>
                    <TextInput style={styles.input} placeholder="Enter your email" keyboardType="email-address" />
                </View>
            </View>

            <View style={styles.row}>
                <View style={[styles.inputGroup, styles.halfWidth]}>
                    <Text style={styles.label}>Passport (Optional: Helps us find your records more quickly)</Text>
                    <TextInput style={styles.input} placeholder="Enter your passport" />
                </View>
                <View style={[styles.inputGroup, styles.halfWidth]}>
                    <Text style={styles.label}>Where did you hear about us?</Text>
                    <TouchableOpacity style={styles.picker} onPress={() => { }}>
                        <Text style={styles.pickerText}>Please select ....</Text>
                        <ChevronDown color="#6B7280" size={20} />
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.inputGroup}>
                <Text style={styles.label}>If other, please specify</Text>
                <TextInput
                    style={[styles.input, styles.textArea]}
                    placeholder="Tell Us"
                    multiline
                />
            </View>

            <View style={styles.captchaContainer}>
                <View style={styles.checkbox} />
                <Text style={styles.captchaText}>I'm not a robot</Text>
            </View>

            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                <Text style={styles.submitButtonText}>Submit</Text>
                <ChevronRight color="#374151" size={20} />
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    contentContainer: {
        padding: 24,
    },
    header: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 24,
        color: '#1F2937',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    inputGroup: {
        marginBottom: 16,
        width: '100%',
    },
    halfWidth: {
        width: '48%',
    },
    label: {
        fontSize: 14,
        fontWeight: '500',
        color: '#4B5563',
        marginBottom: 8,
    },
    input: {
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#D1D5DB',
        borderRadius: 8,
        paddingHorizontal: 16,
        paddingVertical: 12,
        fontSize: 16,
        color: '#1F2937',
    },
    segmentedInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    segmentedInput: {
        marginRight: 8,
    },
    clearButton: {
        padding: 8,
    },
    clearButtonText: {
        fontSize: 16,
        color: '#6B7280',
    },
    picker: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#D1D5DB',
        borderRadius: 8,
        paddingHorizontal: 16,
        paddingVertical: 12,
    },
    pickerText: {
        fontSize: 16,
        color: '#9CA3AF',
    },
    textArea: {
        height: 120,
        textAlignVertical: 'top',
    },
    captchaContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 24,
    },
    checkbox: {
        width: 24,
        height: 24,
        borderWidth: 1,
        borderColor: '#D1D5DB',
        borderRadius: 4,
        marginRight: 12,
    },
    captchaText: {
        fontSize: 16,
        color: '#4B5563',
    },
    submitButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FBBF24',
        borderRadius: 8,
        paddingVertical: 16,
    },
    submitButtonText: {
        fontSize: 18,
        fontWeight: '600',
        color: '#1F2937',
        marginRight: 8,
    },
}); 