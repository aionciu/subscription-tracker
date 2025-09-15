import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';

type ThemeMode = 'light' | 'dark' | 'system';

interface ThemeToggleProps {
  className?: string;
}

const ThemeOptionButton = ({ 
  option, 
  isSelected, 
  onPress 
}: { 
  option: ThemeMode; 
  isSelected: boolean; 
  onPress: () => void; 
}) => {
  const { isDark } = useTheme();
  
  const getOptionConfig = (option: ThemeMode) => {
    switch (option) {
      case 'light':
        return { icon: '☀️', label: 'Light' };
      case 'dark':
        return { icon: '🌙', label: 'Dark' };
      case 'system':
        return { icon: '🔄', label: 'System' };
    }
  };

  const { icon, label } = getOptionConfig(option);

  return (
    <TouchableOpacity
      onPress={onPress}
      className={`flex-1 p-3 rounded-lg items-center ${
        isSelected 
          ? `bg-primary-500 ${isDark ? 'dark:bg-primary-500' : ''}` 
          : `bg-white ${isDark ? 'dark:bg-dark-800' : ''} border border-secondary-200 ${isDark ? 'dark:border-dark-700' : ''}`
      }`}
      activeOpacity={0.7}
    >
      <Text className="text-lg mb-1">{icon}</Text>
      <Text className={`text-sm font-medium ${
        isSelected 
          ? 'text-white' 
          : `text-secondary-900 ${isDark ? 'dark:text-dark-50' : ''}`
      }`}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ className = '' }) => {
  const { theme, setTheme, isDark } = useTheme();

  const options: ThemeMode[] = ['light', 'dark', 'system'];

  return (
    <View className={`bg-white ${isDark ? 'dark:bg-dark-800' : ''} rounded-xl p-4 shadow-card ${className}`}>
      <Text className={`text-lg font-bold mb-4 text-secondary-900 ${isDark ? 'dark:text-dark-50' : ''}`}>
        Theme Preference
      </Text>
      
      <View className="flex-row gap-2">
        {options.map((option) => (
          <ThemeOptionButton
            key={option}
            option={option}
            isSelected={theme === option}
            onPress={() => setTheme(option)}
          />
        ))}
      </View>
      
      <Text className={`text-xs text-secondary-500 ${isDark ? 'dark:text-dark-400' : ''} mt-3 text-center`}>
        Choose your preferred theme or let the app follow your system settings
      </Text>
    </View>
  );
};
