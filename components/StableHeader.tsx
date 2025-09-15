import React from 'react';
import { Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface StableHeaderProps {
  title: string;
}

export const StableHeader: React.FC<StableHeaderProps> = ({ title }) => {
  const insets = useSafeAreaInsets();

  return (
    <View 
      className="bg-primary-500 px-5 pb-4"
      style={{ paddingTop: insets.top }}
    >
      <Text className="text-lg font-bold text-white text-center">
        {title}
      </Text>
    </View>
  );
};
