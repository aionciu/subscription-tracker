import { Session, User } from '@supabase/supabase-js';
import * as WebBrowser from 'expo-web-browser';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const initiateOAuthFlow = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: 'exp://127.0.0.1:8081/--/(auth)/callback',
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        },
      },
    });
    
    if (error) {
      console.error('OAuth error:', error);
      throw error;
    }
    
    return data;
  };

  const openOAuthSession = async (oauthUrl: string) => {
    const result = await WebBrowser.openAuthSessionAsync(
      oauthUrl,
      'exp://127.0.0.1:8081/--/(auth)/callback'
    );
    
    console.log('WebBrowser result:', result);
    return result;
  };

  const parseTokensFromUrl = (url: string) => {
    const urlObj = new URL(url);
    const hashParams = new URLSearchParams(urlObj.hash.substring(1));
    
    const accessToken = hashParams.get('access_token');
    const refreshToken = hashParams.get('refresh_token');
    
    console.log('Parsed tokens:', { 
      accessToken: accessToken ? 'Present' : 'Missing',
      refreshToken: refreshToken ? 'Present' : 'Missing'
    });
    
    return { accessToken, refreshToken };
  };

  const setUserSession = async (accessToken: string, refreshToken: string) => {
    const { data: sessionData, error: sessionError } = await supabase.auth.setSession({
      access_token: accessToken,
      refresh_token: refreshToken,
    });
    
    if (sessionError) {
      console.error('Session error:', sessionError);
      throw sessionError;
    }
    
    console.log('Session set successfully:', sessionData);
    return sessionData;
  };

  const signInWithGoogle = async () => {
    try {
      setLoading(true);
      
      const oauthData = await initiateOAuthFlow();
      console.log('OAuth data:', oauthData);
      
      if (!oauthData.url) {
        throw new Error('No OAuth URL received');
      }
      
      const browserResult = await openOAuthSession(oauthData.url);
      
      if (browserResult.type === 'success' && browserResult.url) {
        const { accessToken, refreshToken } = parseTokensFromUrl(browserResult.url);
        
        if (accessToken && refreshToken) {
          await setUserSession(accessToken, refreshToken);
        } else {
          throw new Error('Missing tokens in callback URL');
        }
      }
    } catch (error) {
      console.error('Error signing in with Google:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    session,
    loading,
    signInWithGoogle,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
