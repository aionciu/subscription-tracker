import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface StableHeaderProps {
  title: string;
}

export const StableHeader: React.FC<StableHeaderProps> = ({ title }) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.header, { paddingTop: insets.top }]}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingBottom: 16,
    elevation: 0,
    shadowOpacity: 0,
    borderBottomWidth: 0,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
});
