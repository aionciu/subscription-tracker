import React from 'react';
import { Modal as RNModal, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../../hooks/ThemeContext';

interface ModalProps {
  visible: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  showCloseButton?: boolean;
  fullScreen?: boolean;
  centered?: boolean;
}

export const Modal: React.FC<ModalProps> = ({
  visible,
  onClose,
  title,
  children,
  showCloseButton = true,
  fullScreen = false,
  centered = false,
}) => {
  const { isDark } = useTheme();
  const insets = useSafeAreaInsets();

  const modalContent = (
    <View className={`flex-1 ${isDark ? 'bg-dark-900' : 'bg-secondary-50'}`}>
      {title && (
        <View 
          className={`px-5 py-4 border-b ${isDark ? 'border-dark-700' : 'border-secondary-200'}`}
          style={{ paddingTop: insets.top + 16 }}
        >
          <View className="flex-row items-center justify-between">
            <Text className={`text-xl font-bold ${isDark ? 'text-dark-50' : 'text-secondary-900'}`}>
              {title}
            </Text>
            {showCloseButton && (
              <TouchableOpacity
                onPress={onClose}
                className="p-2 -mr-2"
                activeOpacity={0.7}
              >
                <Text className={`text-2xl ${isDark ? 'text-dark-400' : 'text-secondary-500'}`}>
                  ×
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      )}
      
      <View className="flex-1">
        {children}
      </View>
    </View>
  );

  if (fullScreen) {
    return (
      <RNModal
        visible={visible}
        animationType="slide"
        presentationStyle="fullScreen"
        onRequestClose={onClose}
      >
        {modalContent}
      </RNModal>
    );
  }

  if (centered) {
    return (
      <RNModal
        visible={visible}
        animationType="fade"
        transparent={true}
        onRequestClose={onClose}
      >
        <TouchableWithoutFeedback onPress={onClose}>
          <View className="flex-1 bg-black/50 items-center justify-center p-4">
            <TouchableWithoutFeedback>
              <View className={`${isDark ? 'bg-dark-800' : 'bg-white'} rounded-2xl w-full max-w-md`} style={{ height: '95%', maxHeight: 700 }}>
                {title && (
                  <View className={`px-5 py-4 border-b ${isDark ? 'border-dark-700' : 'border-secondary-200'}`}>
                    <View className="flex-row items-center justify-between">
                      <Text className={`text-xl font-bold ${isDark ? 'text-dark-50' : 'text-secondary-900'}`}>
                        {title}
                      </Text>
                      {showCloseButton && (
                        <TouchableOpacity
                          onPress={onClose}
                          className="p-2 -mr-2"
                          activeOpacity={0.7}
                        >
                          <Text className={`text-2xl ${isDark ? 'text-dark-400' : 'text-secondary-500'}`}>
                            ×
                          </Text>
                        </TouchableOpacity>
                      )}
                    </View>
                  </View>
                )}
                
                <View style={{ flex: 1 }}>
                  {children}
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </RNModal>
    );
  }

  return (
    <RNModal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View className="flex-1 bg-black/50 justify-end">
          <TouchableWithoutFeedback>
            <View className={`${isDark ? 'bg-dark-800' : 'bg-white'} rounded-t-3xl max-h-3/4`}>
              {title && (
                <View className="px-5 py-4 border-b border-secondary-200">
                  <View className="flex-row items-center justify-between">
                    <Text className={`text-xl font-bold ${isDark ? 'text-dark-50' : 'text-secondary-900'}`}>
                      {title}
                    </Text>
                    {showCloseButton && (
                      <TouchableOpacity
                        onPress={onClose}
                        className="p-2 -mr-2"
                        activeOpacity={0.7}
                      >
                        <Text className={`text-2xl ${isDark ? 'text-dark-400' : 'text-secondary-500'}`}>
                          ×
                        </Text>
                      </TouchableOpacity>
                    )}
                  </View>
                </View>
              )}
              
              <View className="flex-1">
                {children}
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </RNModal>
  );
};
