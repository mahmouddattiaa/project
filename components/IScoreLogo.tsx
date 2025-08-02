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
                return { container: 80, dot: 6, text: 16, height: 32 };
            case 'large':
                return { container: 160, dot: 10, text: 28, height: 48 };
            default:
                return { container: 120, dot: 8, text: 22, height: 40 };
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
            alignItems: 'center',
            justifyContent: 'center',
        },
        iContainer: {
            alignItems: 'center',
            marginRight: 4,
        },
        dot: {
            width: dimensions.dot,
            height: dimensions.dot,
            borderRadius: dimensions.dot / 2,
            marginBottom: 2,
        },
        stem: {
            width: dimensions.dot * 0.6,
            height: dimensions.text * 0.8,
            borderRadius: dimensions.dot * 0.3,
        },
        scoreText: {
            fontSize: dimensions.text,
            fontWeight: '600',
            letterSpacing: -0.5,
        },
    });

    return (
        <View style={styles.container}>
            <View style={styles.logoContainer}>
                <View style={styles.iContainer}>
                    <LinearGradient
                        colors={['#20B2AA', '#6B46C1']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={styles.dot}
                    />
                    <LinearGradient
                        colors={['#20B2AA', '#6B46C1']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={styles.stem}
                    />
                </View>
                <View style={{ position: 'relative' }}>
                    <LinearGradient
                        colors={['#20B2AA', '#6B46C1']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            borderRadius: 4,
                            opacity: 0.9,
                        }}
                    />
                    <Text style={[styles.scoreText, { 
                        color: '#FFFFFF',
                        position: 'relative',
                        paddingHorizontal: 8,
                        paddingVertical: 2,
                    }]}>
                        score
                    </Text>
                </View>
            </View>
        </View>
    );
}
