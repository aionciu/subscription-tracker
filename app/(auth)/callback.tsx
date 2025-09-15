import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { supabase } from '../../lib/supabase';

const waitForOAuthCompletion = async (): Promise<void> => {
  await new Promise(resolve => setTimeout(resolve, 1000));
};

const getCurrentSession = async () => {
  const { data, error } = await supabase.auth.getSession();
  
  console.log('Session data:', data);
  console.log('Session error:', error);
  
  return { data, error };
};

const handleSessionError = (error: any, router: any) => {
  console.error('Auth callback error:', error);
  router.replace('/(auth)/login');
};

const handleSuccessfulAuth = (session: any, router: any) => {
  console.log('User authenticated:', session.user.email);
  router.replace('/(protected)');
};

const handleNoSession = (router: any) => {
  console.log('No session found, redirecting to login');
  router.replace('/(auth)/login');
};

const handleUnexpectedError = (error: any, router: any) => {
  console.error('Unexpected error in auth callback:', error);
  router.replace('/(auth)/login');
};

const processAuthCallback = async (router: any) => {
  try {
    console.log('Handling auth callback...');
    
    await waitForOAuthCompletion();
    const { data, error } = await getCurrentSession();
    
    if (error) {
      handleSessionError(error, router);
      return;
    }

    if (data.session) {
      handleSuccessfulAuth(data.session, router);
    } else {
      handleNoSession(router);
    }
  } catch (error) {
    handleUnexpectedError(error, router);
  }
};

export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    processAuthCallback(router);
  }, [router]);

  return (
    <View style={{ 
      flex: 1, 
      justifyContent: 'center', 
      alignItems: 'center',
      backgroundColor: '#fff'
    }}>
      <ActivityIndicator size="large" color="#007AFF" />
      <Text style={{ marginTop: 16, fontSize: 16, color: '#666' }}>
        Completing sign in...
      </Text>
    </View>
  );
}
