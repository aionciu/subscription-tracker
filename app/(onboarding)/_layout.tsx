import { Stack } from "expo-router";
import { OnboardingGuard } from "../../src/components/OnboardingGuard";
import { OnboardingProvider } from "../../src/hooks/OnboardingContext";

export default function OnboardingLayout() {
  return (
    <OnboardingGuard>
      <OnboardingProvider>
        <Stack>
          <Stack.Screen 
            name="index" 
            options={{ 
              title: "Welcome",
              headerShown: false 
            }} 
          />
          <Stack.Screen 
            name="profile" 
            options={{ 
              title: "Profile Setup",
              headerShown: false 
            }} 
          />
          <Stack.Screen 
            name="providers" 
            options={{ 
              title: "Select Providers",
              headerShown: false 
            }} 
          />
          <Stack.Screen 
            name="setup" 
            options={{ 
              title: "Quick Setup",
              headerShown: false 
            }} 
          />
          <Stack.Screen 
            name="complete" 
            options={{ 
              title: "Complete",
              headerShown: false 
            }} 
          />
        </Stack>
      </OnboardingProvider>
    </OnboardingGuard>
  );
}
