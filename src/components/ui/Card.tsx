import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { useTheme } from '../../hooks/ThemeContext';

interface CardProps {
  children: React.ReactNode;
  onPress?: () => void;
  className?: string;
  padding?: 'none' | 'small' | 'medium' | 'large';
  shadow?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  onPress,
  className = '',
  padding = 'medium',
  shadow = true,
}) => {
  const { isDark } = useTheme();

  const getPaddingStyles = () => {
    switch (padding) {
      case 'none':
        return '';
      case 'small':
        return 'p-3';
      case 'medium':
        return 'p-4';
      case 'large':
        return 'p-6';
      default:
        return 'p-4';
    }
  };

  const baseStyles = `
    rounded-2xl
    ${isDark ? 'bg-dark-800' : 'bg-white'}
    ${shadow ? 'shadow-card' : ''}
    ${getPaddingStyles()}
    ${className}
  `;

  if (onPress) {
    return (
      <TouchableOpacity
        onPress={onPress}
        className={baseStyles}
        activeOpacity={0.7}
      >
        {children}
      </TouchableOpacity>
    );
  }

  return (
    <View className={baseStyles}>
      {children}
    </View>
  );
};
