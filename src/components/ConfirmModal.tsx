import React from 'react';
import { Text, View } from 'react-native';
import { useTheme } from '../hooks/ThemeContext';
import { Button } from './ui/Button';
import { Modal } from './ui/Modal';

interface ConfirmModalProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  variant?: 'danger' | 'warning' | 'info';
  loading?: boolean;
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
  visible,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  variant = 'danger',
  loading = false,
}) => {
  const { isDark } = useTheme();

  const getVariantStyles = () => {
    switch (variant) {
      case 'danger':
        return {
          icon: '⚠️',
          confirmVariant: 'danger' as const,
        };
      case 'warning':
        return {
          icon: '⚠️',
          confirmVariant: 'secondary' as const,
        };
      case 'info':
        return {
          icon: 'ℹ️',
          confirmVariant: 'primary' as const,
        };
      default:
        return {
          icon: '⚠️',
          confirmVariant: 'danger' as const,
        };
    }
  };

  const variantStyles = getVariantStyles();

  return (
    <Modal visible={visible} onClose={onClose} title={title}>
      <View className="p-5">
        <View className="items-center mb-6">
          <Text className="text-6xl mb-4">{variantStyles.icon}</Text>
          <Text className={`text-lg text-center leading-6 ${isDark ? 'text-dark-200' : 'text-secondary-700'}`}>
            {message}
          </Text>
        </View>

        <View className="flex-row space-x-3">
          <Button
            title={cancelText}
            onPress={onClose}
            variant="outline"
            className="flex-1"
            disabled={loading}
          />
          <Button
            title={confirmText}
            onPress={onConfirm}
            variant={variantStyles.confirmVariant}
            className="flex-1"
            loading={loading}
          />
        </View>
      </View>
    </Modal>
  );
};
