import React from 'react';
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../../hooks/ThemeContext';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'danger';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  fullWidth = false,
  icon,
}) => {
  const { isDark } = useTheme();

  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return {
          container: `bg-primary-500 ${disabled ? 'opacity-50' : ''}`,
          text: 'text-white',
        };
      case 'secondary':
        return {
          container: `bg-secondary-200 ${disabled ? 'opacity-50' : ''}`,
          text: 'text-secondary-900',
        };
      case 'outline':
        return {
          container: `border-2 border-primary-500 ${disabled ? 'opacity-50' : ''}`,
          text: 'text-primary-500',
        };
      case 'danger':
        return {
          container: `bg-red-500 ${disabled ? 'opacity-50' : ''}`,
          text: 'text-white',
        };
      default:
        return {
          container: `bg-primary-500 ${disabled ? 'opacity-50' : ''}`,
          text: 'text-white',
        };
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return {
          container: 'px-3 py-2 rounded-md',
          text: 'text-sm',
        };
      case 'medium':
        return {
          container: 'px-4 py-3 rounded-lg',
          text: 'text-base',
        };
      case 'large':
        return {
          container: 'px-6 py-4 rounded-lg',
          text: 'text-lg',
        };
      default:
        return {
          container: 'px-4 py-3 rounded-lg',
          text: 'text-base',
        };
    }
  };

  const variantStyles = getVariantStyles();
  const sizeStyles = getSizeStyles();

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      className={`
        ${variantStyles.container}
        ${sizeStyles.container}
        ${fullWidth ? 'w-full' : ''}
        flex-row items-center justify-center
        ${disabled || loading ? '' : 'active:opacity-80'}
      `}
      activeOpacity={disabled || loading ? 1 : 0.8}
    >
      {loading ? (
        <ActivityIndicator 
          size="small" 
          color={variant === 'outline' ? '#3B82F6' : 'white'} 
        />
      ) : (
        <>
          {icon && <View className="mr-2">{icon}</View>}
          <Text className={`${variantStyles.text} ${sizeStyles.text} font-semibold`}>
            {title}
          </Text>
        </>
      )}
    </TouchableOpacity>
  );
};
