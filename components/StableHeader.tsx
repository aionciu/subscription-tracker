import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { getUserAvatarText } from '../utils/userUtils';

interface StableHeaderProps {
  title: string;
  onAvatarPress?: () => void;
}

export const StableHeader: React.FC<StableHeaderProps> = ({ title, onAvatarPress }) => {
  const insets = useSafeAreaInsets();
  const { user } = useAuth();
  const { isDark } = useTheme();

  const avatarUrl = user?.user_metadata?.avatar_url;
  const avatarText = getUserAvatarText(user);

  const AvatarComponent = () => {
    if (avatarUrl) {
      return (
        <Image
          source={{ uri: avatarUrl }}
          className="w-8 h-8 rounded-full"
          resizeMode="cover"
        />
      );
    }

    return (
      <View className={`w-8 h-8 rounded-full ${isDark ? 'bg-dark-700' : 'bg-white'} items-center justify-center`}>
        <Text className="text-primary-500 font-bold text-sm">
          {avatarText}
        </Text>
      </View>
    );
  };

  return (
    <View 
      className="bg-primary-500 px-5 pb-4 flex-row items-center justify-between"
      style={{ paddingTop: insets.top }}
    >
      <View className="flex-1" />
      <Text className="text-lg font-bold text-white text-center flex-2">
        {title}
      </Text>
      <TouchableOpacity 
        onPress={onAvatarPress}
        className="flex-1 items-end"
        activeOpacity={0.7}
      >
        <AvatarComponent />
      </TouchableOpacity>
    </View>
  );
};
