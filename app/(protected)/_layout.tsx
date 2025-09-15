import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AuthGuard } from "../../components/AuthGuard";

export default function ProtectedLayout() {
  const insets = useSafeAreaInsets();
  
  return (
    <AuthGuard requireAuth={true}>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: '#007AFF',
          tabBarInactiveTintColor: '#8E8E93',
          tabBarStyle: {
            backgroundColor: '#fff',
            borderTopWidth: 1,
            borderTopColor: '#E5E5EA',
            paddingBottom: insets.bottom + 8,
            paddingTop: 8,
            height: 50 + insets.bottom,
          },
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: '500',
          },
          // Hide default headers to prevent flickering
          headerShown: false,
          // Remove animation to prevent header flickering
          animation: 'none',
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Dashboard",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home-outline" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="subscriptions"
          options={{
            title: "Subscriptions",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="card-outline" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="person-outline" size={size} color={color} />
            ),
          }}
        />
      </Tabs>
    </AuthGuard>
  );
}
