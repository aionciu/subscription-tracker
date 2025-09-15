import React, { useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    StyleSheet,
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
    style={[styles.googleButton, disabled && styles.buttonDisabled]}
    onPress={onPress}
    disabled={disabled}
  >
    {isLoading ? (
      <ActivityIndicator color="#fff" />
    ) : (
      <>
        <Text style={styles.googleButtonText}>📧</Text>
        <Text style={styles.googleButtonText}>Continue with Gmail</Text>
      </>
    )}
  </TouchableOpacity>
);

const LoginHeader = () => (
  <View style={styles.header}>
    <Text style={styles.title}>Welcome to Subscription Tracker</Text>
    <Text style={styles.subtitle}>
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
  <View style={styles.authSection}>
    <GoogleSignInButton 
      onPress={onSignIn} 
      disabled={disabled} 
      isLoading={isLoading} 
    />
    <Text style={styles.disclaimer}>
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
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  header: {
    alignItems: 'center',
    marginBottom: 48,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1a1a1a',
    textAlign: 'center',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
  },
  authSection: {
    alignItems: 'center',
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4285f4',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderRadius: 12,
    minWidth: 280,
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  googleButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  disclaimer: {
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
    marginTop: 24,
    paddingHorizontal: 16,
    lineHeight: 18,
  },
});
