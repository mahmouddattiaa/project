import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, FlatList, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { X, TriangleAlert as AlertTriangle, CreditCard, CheckCircle } from 'lucide-react-native';

const mockNotifications = [
    {
        id: '1',
        type: 'alert',
        title: 'New hard inquiry detected',
        description: 'Chase Bank performed a credit check on Dec 15',
        time: '1h ago',
    },
    {
        id: '2',
        type: 'info',
        title: 'Credit utilization improved',
        description: 'Your utilization decreased to 15% this month',
        time: '3d ago',
    },
    {
        id: '3',
        type: 'success',
        title: 'Payment successful',
        description: 'Your payment of $45.50 to Capital One was successful.',
        time: '5d ago',
    },
];

const getIconForType = (type: string) => {
    switch (type) {
        case 'alert':
            return <AlertTriangle size={20} color="#D97706" />;
        case 'info':
            return <CreditCard size={20} color="#2563EB" />;
        case 'success':
            return <CheckCircle size={20} color="#059669" />;
        default:
            return null;
    }
};

export default function NotificationsScreen() {
    const router = useRouter();

    const renderItem = ({ item }: { item: typeof mockNotifications[0] }) => (
        <View style={styles.notificationItem}>
            <View style={[styles.iconContainer, { backgroundColor: item.type === 'alert' ? '#FEF3C7' : item.type === 'info' ? '#DBEAFE' : '#D1FAE5' }]}>
                {getIconForType(item.type)}
            </View>
            <View style={styles.notificationContent}>
                <Text style={styles.notificationTitle}>{item.title}</Text>
                <Text style={styles.notificationDescription}>{item.description}</Text>
            </View>
            <Text style={styles.notificationTime}>{item.time}</Text>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <View style={styles.headerLeft}>
                    <View style={styles.logoContainer}>
                        <Image 
                            source={require('../assets/images/Dev-logo.svg')} 
                            style={styles.headerLogo} 
                        />
                    </View>
                </View>
                <Text style={styles.headerTitle}>Notifications</Text>
                <TouchableOpacity onPress={() => router.back()} style={styles.closeButton}>
                    <X size={24} color="#FFFFFF" />
                </TouchableOpacity>
            </View>
            <FlatList
                data={mockNotifications}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.content}
            />
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
        backgroundColor: '#8B5CF6',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 8,
    },
    headerLeft: {
        minWidth: 60,
    },
    logoContainer: {
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        padding: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerLogo: {
        width: 120,
        height: 42,
        resizeMode: 'stretch',
        backgroundColor: 'transparent',
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: '#FFFFFF',
        flex: 1,
        textAlign: 'center',
    },
    closeButton: {
        padding: 8,
    },
    content: {
        padding: 20,
    },
    placeholderText: {
        fontSize: 16,
        color: '#6B7280',
    },
    notificationItem: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        backgroundColor: '#FFFFFF',
        padding: 16,
        borderRadius: 12,
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
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 16,
    },
    notificationContent: {
        flex: 1,
    },
    notificationTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: '#111827',
        marginBottom: 4,
    },
    notificationDescription: {
        fontSize: 14,
        color: '#6B7280',
    },
    notificationTime: {
        fontSize: 12,
        color: '#9CA3AF',
    },
}); 