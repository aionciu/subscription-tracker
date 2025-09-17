import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../hooks/ThemeContext';

interface FloatingActionButtonProps {
  onPress: () => void;
  icon?: string;
  size?: 'small' | 'medium' | 'large';
  position?: 'bottom-right' | 'bottom-left' | 'bottom-center';
}

export const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({
  onPress,
  icon = '+',
  size = 'medium',
  position = 'bottom-right',
}) => {
  const { isDark } = useTheme();
  const insets = useSafeAreaInsets();

  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return {
          container: 'w-12 h-12',
          text: 'text-lg',
        };
      case 'medium':
        return {
          container: 'w-14 h-14',
          text: 'text-xl',
        };
      case 'large':
        return {
          container: 'w-16 h-16',
          text: 'text-2xl',
        };
      default:
        return {
          container: 'w-14 h-14',
          text: 'text-xl',
        };
    }
  };

  const getPositionStyles = () => {
    const baseStyles = 'absolute';
    const bottomOffset = insets.bottom + 20;

    switch (position) {
      case 'bottom-left':
        return `${baseStyles} left-5`;
      case 'bottom-center':
        return `${baseStyles} left-1/2 -translate-x-1/2`;
      case 'bottom-right':
      default:
        return `${baseStyles} right-5`;
    }
  };

  const sizeStyles = getSizeStyles();
  const positionStyles = getPositionStyles();

  return (
    <TouchableOpacity
      onPress={onPress}
      className={`
        ${positionStyles}
        ${sizeStyles.container}
        bg-primary-500 rounded-full shadow-lg
        items-center justify-center
        active:opacity-80
      `}
      style={{ bottom: insets.bottom + 20 }}
      activeOpacity={0.8}
    >
      <Text className={`${sizeStyles.text} text-white font-bold`}>
        {icon}
      </Text>
    </TouchableOpacity>
  );
};
