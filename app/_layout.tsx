import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { verifyInstallation } from "nativewind";
import { Platform, StatusBar as RNStatusBar } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "../globals.css";
import { AuthProvider } from "../src/hooks/AuthContext";
import { ThemeProvider } from "../src/hooks/ThemeContext";

// Verify NativeWind installation
verifyInstallation();

const StatusBarWrapper = () => {
  // Force white status bar content for iOS
  if (Platform.OS === 'ios') {
    RNStatusBar.setBarStyle('light-content', true);
  }
  
  return (
    <StatusBar 
      style="light" 
      backgroundColor={Platform.OS === 'android' ? '#000000' : undefined}
      translucent={Platform.OS === 'android'}
    />
  );
};

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <StatusBarWrapper />
        <AuthProvider>
          <Stack>
            <Stack.Screen name="(auth)" options={{ headerShown: false }} />
            <Stack.Screen name="(onboarding)" options={{ headerShown: false }} />
            <Stack.Screen name="(protected)" options={{ headerShown: false }} />
            <Stack.Screen name="index" options={{ headerShown: false }} />
          </Stack>
        </AuthProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
