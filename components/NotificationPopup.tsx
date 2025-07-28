import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Modal } from 'react-native';
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

interface NotificationPopupProps {
    visible: boolean;
    onClose: () => void;
}

export function NotificationPopup({ visible, onClose }: NotificationPopupProps) {
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
        <Modal
            animationType="fade"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <TouchableOpacity style={styles.overlay} activeOpacity={1} onPress={onClose}>
                <View style={styles.popup}>
                    <View style={styles.header}>
                        <Text style={styles.headerTitle}>Notifications</Text>
                        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                            <X size={20} color="#6B7280" />
                        </TouchableOpacity>
                    </View>
                    <FlatList
                        data={mockNotifications}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.id}
                        showsVerticalScrollIndicator={false}
                    />
                </View>
            </TouchableOpacity>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'flex-start',
        alignItems: 'flex-end',
        paddingTop: 80,
        paddingRight: 20,
    },
    popup: {
        width: 340,
        maxHeight: 400,
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.2,
        shadowRadius: 12,
        elevation: 8,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#F3F4F6',
        paddingBottom: 12,
    },
    headerTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#111827',
    },
    closeButton: {
        padding: 4,
    },
    notificationItem: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#F3F4F6',
    },
    iconContainer: {
        width: 32,
        height: 32,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },
    notificationContent: {
        flex: 1,
    },
    notificationTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: '#111827',
        marginBottom: 2,
    },
    notificationDescription: {
        fontSize: 12,
        color: '#6B7280',
    },
    notificationTime: {
        fontSize: 12,
        color: '#9CA3AF',
        marginLeft: 8,
    },
}); 