import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface IScoreLogoProps {
    size?: 'small' | 'medium' | 'large';
}

export default function IScoreLogo({ size = 'medium' }: IScoreLogoProps) {
    const getSize = () => {
        switch (size) {
            case 'small':
                return { container: 100, dot: 8, text: 18, height: 36, spacing: 6 };
            case 'large':
                return { container: 180, dot: 14, text: 32, height: 56, spacing: 12 };
            default:
                return { container: 140, dot: 10, text: 24, height: 44, spacing: 8 };
        }
    };

    const dimensions = getSize();

    const styles = StyleSheet.create({
        container: {
            alignItems: 'center',
            justifyContent: 'center',
            height: dimensions.height,
        },
        logoContainer: {
            flexDirection: 'row',
            alignItems: 'flex-end',
            justifyContent: 'center',
            paddingBottom: 0,
            paddingHorizontal: 2,
            paddingVertical: 1,
        },
        iContainer: {
            alignItems: 'center',
            marginRight: dimensions.spacing,
            paddingBottom: 0,
        },
        dot: {
            width: dimensions.dot,
            height: dimensions.dot,
            borderRadius: dimensions.dot / 2,
            marginBottom: 4,
        },
        stem: {
            width: dimensions.dot * 0.5,
            height: dimensions.text * 0.9,
            borderRadius: dimensions.dot * 0.25,
        },
        scoreText: {
            fontSize: dimensions.text,
            fontWeight: '600',
            letterSpacing: -0.8,
            textShadowColor: 'rgba(0,0,0,0.1)',
            textShadowOffset: { width: 0, height: 1 },
            textShadowRadius: 2,
        },
    });

    return (
        <View style={styles.container}>
            <View style={styles.logoContainer}>
                {/* "i" with teal dot and stem */}
                <View style={styles.iContainer}>
                    {/* Teal dot */}
                    <View style={[styles.dot, { backgroundColor: '#20B2AA' }]} />
                    {/* Teal stem */}
                    <View style={[styles.stem, { backgroundColor: '#20B2AA' }]} />
                </View>
                
                {/* "score" with purple gradient */}
                <LinearGradient
                    colors={['#8B5CF6', '#6366F1']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={{
                        borderRadius: 4,
                        paddingHorizontal: 3,
                        paddingVertical: 1,
                    }}
                >
                    <Text style={[styles.scoreText, { color: '#FFFFFF' }]}>
                        score
                    </Text>
                </LinearGradient>
            </View>
        </View>
    );
}
