import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';

const { width } = Dimensions.get('window');

interface CreditScoreGaugeProps {
  score: number;
  size?: number;
}

export function CreditScoreGauge({ score, size = 200 }: CreditScoreGaugeProps) {
  const centerX = size / 2;
  const centerY = size / 2;
  const radius = size / 2 - 20;
  const strokeWidth = 12;
  
  // Calculate the angle for the score (180 degrees for semi-circle)
  const scoreAngle = (score / 850) * 180;
  const scoreRadians = (scoreAngle - 90) * (Math.PI / 180);
  
  // Calculate needle position
  const needleLength = radius - 10;
  const needleX = centerX + needleLength * Math.cos(scoreRadians);
  const needleY = centerY + needleLength * Math.sin(scoreRadians);
  
  // Score ranges and colors
  const ranges = [
    { min: 300, max: 579, color: '#EF4444', label: 'Poor' },
    { min: 580, max: 669, color: '#F97316', label: 'Fair' },
    { min: 670, max: 739, color: '#EAB308', label: 'Good' },
    { min: 740, max: 799, color: '#22C55E', label: 'Very Good' },
    { min: 800, max: 850, color: '#059669', label: 'Excellent' },
  ];
  
  const getCurrentRange = (score: number) => {
    return ranges.find(range => score >= range.min && score <= range.max) || ranges[0];
  };
  
  const currentRange = getCurrentRange(score);
  
  // Create path for semi-circle background
  const createSemiCirclePath = (radius: number, strokeWidth: number) => {
    const startX = centerX - radius;
    const startY = centerY;
    const endX = centerX + radius;
    const endY = centerY;
    
    return `M ${startX} ${startY} A ${radius} ${radius} 0 0 1 ${endX} ${endY}`;
  };

  return (
    <View style={styles.container}>
      <Svg width={size} height={size / 2 + 40} style={styles.svg}>
        {/* Background arc */}
        <Path
          d={createSemiCirclePath(radius, strokeWidth)}
          fill="none"
          stroke="#E5E7EB"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />
        
        {/* Score segments */}
        {ranges.map((range, index) => {
          const startAngle = ((range.min - 300) / 550) * 180 - 90;
          const endAngle = ((range.max - 300) / 550) * 180 - 90;
          const startRadians = startAngle * (Math.PI / 180);
          const endRadians = endAngle * (Math.PI / 180);
          
          const startX = centerX + radius * Math.cos(startRadians);
          const startY = centerY + radius * Math.sin(startRadians);
          const endX = centerX + radius * Math.cos(endRadians);
          const endY = centerY + radius * Math.sin(endRadians);
          
          const largeArcFlag = endAngle - startAngle > 180 ? 1 : 0;
          
          const pathData = `M ${startX} ${startY} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${endX} ${endY}`;
          
          return (
            <Path
              key={index}
              d={pathData}
              fill="none"
              stroke={range.color}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              opacity={score >= range.min ? 1 : 0.3}
            />
          );
        })}
        
        {/* Center circle */}
        <Circle
          cx={centerX}
          cy={centerY}
          r={8}
          fill="#374151"
        />
        
        {/* Needle */}
        <Path
          d={`M ${centerX} ${centerY} L ${needleX} ${needleY}`}
          stroke="#374151"
          strokeWidth={3}
          strokeLinecap="round"
        />
      </Svg>
      
      <View style={styles.scoreContainer}>
        <Text style={[styles.scoreText, { color: currentRange.color }]}>{score}</Text>
        <Text style={styles.scoreLabel}>{currentRange.label}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    position: 'relative',
  },
  svg: {
    marginBottom: -20,
  },
  scoreContainer: {
    position: 'absolute',
    bottom: 20,
    alignItems: 'center',
  },
  scoreText: {
    fontSize: 36,
    fontWeight: '800',
    marginBottom: 4,
  },
  scoreLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
  },
});