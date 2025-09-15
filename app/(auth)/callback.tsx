import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { supabase } from '../../lib/supabase';

export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        console.log('Handling auth callback...');
        
        // Wait a bit for the OAuth flow to complete
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const { data, error } = await supabase.auth.getSession();
        
        console.log('Session data:', data);
        console.log('Session error:', error);
        
        if (error) {
          console.error('Auth callback error:', error);
          router.replace('/(auth)/login');
          return;
        }

        if (data.session) {
          console.log('User authenticated:', data.session.user.email);
          router.replace('/(protected)');
        } else {
          console.log('No session found, redirecting to login');
          router.replace('/(auth)/login');
        }
      } catch (error) {
        console.error('Unexpected error in auth callback:', error);
        router.replace('/(auth)/login');
      }
    };

    handleAuthCallback();
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
