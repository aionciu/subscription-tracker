import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AuthGuard } from '../../components/AuthGuard';
import { useAuth } from '../../contexts/AuthContext';

const showSignInError = () => {
  Alert.alert(
    'Sign In Error',
    'Failed to sign in with Google. Please try again.',
    [{ text: 'OK' }]
  );
};

const handleSignInError = (error: unknown) => {
  console.error('Sign in error:', error);
  showSignInError();
};

const performGoogleSignIn = async (
  signInWithGoogle: () => Promise<void>,
  setIsSigningIn: (value: boolean) => void
) => {
  try {
    setIsSigningIn(true);
    await signInWithGoogle();
  } catch (error) {
    handleSignInError(error);
  } finally {
    setIsSigningIn(false);
  }
};

const GoogleSignInButton = ({ 
  onPress, 
  disabled, 
  isLoading 
}: { 
  onPress: () => void; 
  disabled: boolean; 
  isLoading: boolean; 
}) => (
  <TouchableOpacity
    className={`flex-row items-center bg-google px-6 py-4 rounded-xl min-w-70 justify-center shadow-card ${disabled ? 'opacity-70' : ''}`}
    onPress={onPress}
    disabled={disabled}
  >
    {isLoading ? (
      <ActivityIndicator color="#fff" />
    ) : (
      <>
        <Text className="text-white text-base font-semibold ml-2">📧</Text>
        <Text className="text-white text-base font-semibold ml-2">Continue with Gmail</Text>
      </>
    )}
  </TouchableOpacity>
);

const LoginHeader = () => (
  <View className="items-center mb-12">
    <Text className="text-3xl font-bold text-secondary-900 text-center mb-3">Welcome to Subscription Tracker</Text>
    <Text className="text-base text-secondary-500 text-center leading-6">
      Track and manage your subscriptions in one place
    </Text>
  </View>
);

const AuthSection = ({ 
  onSignIn, 
  isLoading, 
  disabled 
}: { 
  onSignIn: () => void; 
  isLoading: boolean; 
  disabled: boolean; 
}) => (
  <View className="items-center">
    <GoogleSignInButton 
      onPress={onSignIn} 
      disabled={disabled} 
      isLoading={isLoading} 
    />
    <Text className="text-xs text-secondary-400 text-center mt-6 px-4 leading-5">
      By signing in, you agree to our Terms of Service and Privacy Policy
    </Text>
  </View>
);

export default function LoginScreen() {
  const { signInWithGoogle, loading } = useAuth();
  const [isSigningIn, setIsSigningIn] = useState(false);

  const handleGoogleSignIn = () => {
    performGoogleSignIn(signInWithGoogle, setIsSigningIn);
  };

  return (
    <AuthGuard requireAuth={false}>
      <SafeAreaView className="flex-1 bg-white">
        <View className="flex-1 justify-center px-6">
          <LoginHeader />
          <AuthSection 
            onSignIn={handleGoogleSignIn}
            isLoading={isSigningIn}
            disabled={isSigningIn || loading}
          />
        </View>
      </SafeAreaView>
    </AuthGuard>
  );
}

