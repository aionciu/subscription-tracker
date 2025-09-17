import React, { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../../hooks/ThemeContext';

interface SelectOption {
  value: string;
  label: string;
  description?: string;
}

interface SelectProps {
  label?: string;
  placeholder?: string;
  value: string;
  onValueChange: (value: string) => void;
  options: SelectOption[];
  error?: string;
  disabled?: boolean;
  searchable?: boolean;
  className?: string;
}

export const Select: React.FC<SelectProps> = ({
  label,
  placeholder = 'Select an option',
  value,
  onValueChange,
  options,
  error,
  disabled = false,
  searchable = false,
  className = '',
}) => {
  const { isDark } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const selectedOption = options.find(option => option.value === value);

  const getSelectStyles = () => {
    const baseStyles = `
      border-2 rounded-lg px-4 py-3 flex-row items-center justify-between
      ${isDark ? 'bg-dark-700' : 'bg-white'}
      ${disabled ? 'opacity-50' : ''}
    `;

    if (error) {
      return `${baseStyles} border-red-500`;
    }

    if (isOpen) {
      return `${baseStyles} border-primary-500`;
    }

    return `${baseStyles} ${isDark ? 'border-dark-600' : 'border-secondary-200'}`;
  };

  const handleOptionSelect = (optionValue: string) => {
    onValueChange(optionValue);
    setIsOpen(false);
  };

  return (
    <View className={className}>
      {label && (
        <Text className={`text-sm font-medium mb-2 ${isDark ? 'text-dark-200' : 'text-secondary-700'}`}>
          {label}
        </Text>
      )}
      
      <TouchableOpacity
        onPress={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className={getSelectStyles()}
        activeOpacity={disabled ? 1 : 0.7}
      >
        <View className="flex-1">
          {selectedOption ? (
            <View>
              <Text className={`text-base ${isDark ? 'text-dark-50' : 'text-secondary-900'}`}>
                {selectedOption.label}
              </Text>
              {selectedOption.description && (
                <Text className={`text-sm ${isDark ? 'text-dark-400' : 'text-secondary-500'}`}>
                  {selectedOption.description}
                </Text>
              )}
            </View>
          ) : (
            <Text className={`text-base ${isDark ? 'text-dark-400' : 'text-secondary-500'}`}>
              {placeholder}
            </Text>
          )}
        </View>
        
        <Text className={`text-lg ${isDark ? 'text-dark-400' : 'text-secondary-500'}`}>
          {isOpen ? '▲' : '▼'}
        </Text>
      </TouchableOpacity>
      
      {isOpen && (
        <View className={`mt-1 border-2 rounded-lg max-h-48 ${isDark ? 'bg-dark-700 border-dark-600' : 'bg-white border-secondary-200'}`}>
          <ScrollView className="max-h-48">
            {options.map((option) => (
              <TouchableOpacity
                key={option.value}
                onPress={() => handleOptionSelect(option.value)}
                className={`px-4 py-3 border-b ${isDark ? 'border-dark-600' : 'border-secondary-100'} ${
                  value === option.value ? (isDark ? 'bg-dark-600' : 'bg-secondary-50') : ''
                }`}
                activeOpacity={0.7}
              >
                <Text className={`text-base ${isDark ? 'text-dark-50' : 'text-secondary-900'}`}>
                  {option.label}
                </Text>
                {option.description && (
                  <Text className={`text-sm mt-1 ${isDark ? 'text-dark-400' : 'text-secondary-500'}`}>
                    {option.description}
                  </Text>
                )}
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}
      
      {error && (
        <Text className="text-red-500 text-sm mt-1">
          {error}
        </Text>
      )}
    </View>
  );
};
