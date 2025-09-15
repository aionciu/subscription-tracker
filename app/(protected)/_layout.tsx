import { Stack } from "expo-router";
import { AuthGuard } from "../../components/AuthGuard";

export default function ProtectedLayout() {
  return (
    <AuthGuard requireAuth={true}>
      <Stack>
        <Stack.Screen 
          name="index" 
          options={{ 
            title: "Dashboard",
            headerShown: true,
            headerStyle: {
              backgroundColor: '#007AFF',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }} 
        />
        <Stack.Screen 
          name="profile" 
          options={{ 
            title: "Profile",
            headerShown: true,
            headerStyle: {
              backgroundColor: '#007AFF',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }} 
        />
        <Stack.Screen 
          name="subscriptions" 
          options={{ 
            title: "Subscriptions",
            headerShown: true,
            headerStyle: {
              backgroundColor: '#007AFF',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }} 
        />
      </Stack>
    </AuthGuard>
  );
}
