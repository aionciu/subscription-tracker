import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../../hooks/ThemeContext';

interface InputProps {
  label?: string;
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  error?: string;
  disabled?: boolean;
  multiline?: boolean;
  numberOfLines?: number;
  keyboardType?: 'default' | 'numeric' | 'email-address' | 'phone-pad';
  secureTextEntry?: boolean;
  rightIcon?: React.ReactNode;
  onRightIconPress?: () => void;
  className?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  placeholder,
  value,
  onChangeText,
  error,
  disabled = false,
  multiline = false,
  numberOfLines = 1,
  keyboardType = 'default',
  secureTextEntry = false,
  rightIcon,
  onRightIconPress,
  className = '',
}) => {
  const { isDark } = useTheme();
  const [isFocused, setIsFocused] = useState(false);

  const getInputStyles = () => {
    const baseStyles = `
      border-2 rounded-lg px-4 py-3 text-base
      ${isDark ? 'bg-dark-700 text-dark-50' : 'bg-white text-secondary-900'}
      ${disabled ? 'opacity-50' : ''}
    `;

    if (error) {
      return `${baseStyles} border-red-500`;
    }

    if (isFocused) {
      return `${baseStyles} border-primary-500`;
    }

    return `${baseStyles} ${isDark ? 'border-dark-600' : 'border-secondary-200'}`;
  };

  return (
    <View className={className}>
      {label && (
        <Text className={`text-sm font-medium mb-2 ${isDark ? 'text-dark-200' : 'text-secondary-700'}`}>
          {label}
        </Text>
      )}
      
      <View className="relative">
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={isDark ? '#9CA3AF' : '#6B7280'}
          editable={!disabled}
          multiline={multiline}
          numberOfLines={numberOfLines}
          keyboardType={keyboardType}
          secureTextEntry={secureTextEntry}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={getInputStyles()}
          style={{
            textAlignVertical: multiline ? 'top' : 'center',
          }}
        />
        
        {rightIcon && (
          <TouchableOpacity
            onPress={onRightIconPress}
            className="absolute right-3 top-1/2 -translate-y-1/2"
            activeOpacity={0.7}
          >
            {rightIcon}
          </TouchableOpacity>
        )}
      </View>
      
      {error && (
        <Text className="text-red-500 text-sm mt-1">
          {error}
        </Text>
      )}
    </View>
  );
};
