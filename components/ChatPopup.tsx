import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, FlatList, KeyboardAvoidingView, Platform } from 'react-native';
import { MessageSquare, X, ChevronDown, ChevronUp } from 'lucide-react-native';

const mockMessages = [
    { id: '1', text: 'Hello! How can I assist you today?', sender: 'ai' },
    { id: '2', text: 'I have a question about my credit score.', sender: 'user' },
    { id: '3', text: 'Of course. What would you like to know?', sender: 'ai' },
];

interface ChatPopupProps {
    visible: boolean;
    onClose: () => void;
}

export function ChatPopup({ visible, onClose }: ChatPopupProps) {
    const [isCollapsed, setCollapsed] = useState(false);
    const [messages, setMessages] = useState(mockMessages);
    const [inputText, setInputText] = useState('');

    const handleSend = () => {
        if (inputText.trim()) {
            setMessages([...messages, { id: String(messages.length + 1), text: inputText, sender: 'user' }]);
            setInputText('');
            // Add AI response logic here
        }
    };

    if (!visible) {
        return null;
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <View style={[styles.popup, isCollapsed && styles.collapsedPopup]}>
                <View style={styles.header}>
                    <View style={styles.headerTitleContainer}>
                        <MessageSquare size={20} color="#FFFFFF" />
                        <Text style={styles.headerTitle}>AI Assistant</Text>
                    </View>
                    <View style={styles.headerActions}>
                        <TouchableOpacity onPress={() => setCollapsed(!isCollapsed)}>
                            {isCollapsed ? <ChevronUp size={20} color="#FFFFFF" /> : <ChevronDown size={20} color="#FFFFFF" />}
                        </TouchableOpacity>
                        <TouchableOpacity onPress={onClose} style={{ marginLeft: 12 }}>
                            <X size={20} color="#FFFFFF" />
                        </TouchableOpacity>
                    </View>
                </View>

                {!isCollapsed && (
                    <>
                        <FlatList
                            data={messages}
                            renderItem={({ item }) => (
                                <View style={[styles.messageBubble, item.sender === 'ai' ? styles.aiBubble : styles.userBubble]}>
                                    <Text style={item.sender === 'ai' ? styles.aiText : styles.userText}>{item.text}</Text>
                                </View>
                            )}
                            keyExtractor={(item) => item.id}
                            style={styles.messageList}
                            contentContainerStyle={{ paddingVertical: 10 }}
                        />
                        <View style={styles.inputContainer}>
                            <TextInput
                                style={styles.input}
                                value={inputText}
                                onChangeText={setInputText}
                                placeholder="Type your message..."
                                placeholderTextColor="#9CA3AF"
                            />
                            <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
                                <Text style={styles.sendButtonText}>Send</Text>
                            </TouchableOpacity>
                        </View>
                    </>
                )}
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        zIndex: 1000,
    },
    popup: {
        width: 340,
        height: 450,
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 12,
        elevation: 10,
        overflow: 'hidden',
    },
    collapsedPopup: {
        height: 'auto',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#2563EB',
        paddingHorizontal: 16,
        paddingVertical: 12,
    },
    headerTitleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerTitle: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '600',
        marginLeft: 8,
    },
    headerActions: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    messageList: {
        flex: 1,
        paddingHorizontal: 10,
    },
    messageBubble: {
        padding: 12,
        borderRadius: 8,
        marginVertical: 4,
        maxWidth: '80%',
    },
    aiBubble: {
        backgroundColor: '#F3F4F6',
        alignSelf: 'flex-start',
    },
    userBubble: {
        backgroundColor: '#DBEAFE',
        alignSelf: 'flex-end',
    },
    aiText: {
        color: '#1F2937',
    },
    userText: {
        color: '#1E3A8A',
    },
    inputContainer: {
        flexDirection: 'row',
        padding: 10,
        borderTopWidth: 1,
        borderTopColor: '#E5E7EB',
        backgroundColor: '#FFFFFF',
    },
    input: {
        flex: 1,
        backgroundColor: '#F3F4F6',
        borderRadius: 20,
        paddingHorizontal: 16,
        paddingVertical: 10,
        marginRight: 10,
        color: '#1F2937',
    },
    sendButton: {
        backgroundColor: '#2563EB',
        borderRadius: 20,
        paddingHorizontal: 20,
        justifyContent: 'center',
    },
    sendButtonText: {
        color: '#FFFFFF',
        fontWeight: '600',
    },
}); 