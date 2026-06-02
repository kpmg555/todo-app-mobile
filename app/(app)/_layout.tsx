import { Tabs, Redirect } from "expo-router";
import { useAuthStore } from "../../src/store/auth.store";
import { Text } from "react-native";

export default function AppLayout() {
  const token = useAuthStore((s) => s.token);

  if (!token) return <Redirect href="/(auth)/login" />;

  return (
    <Tabs screenOptions={{ headerShown: false, tabBarActiveTintColor: "#6366f1" }}>
      <Tabs.Screen name="index" options={{ title: "Inicio", tabBarIcon: () => <Text>🏠</Text> }} />
      <Tabs.Screen name="search" options={{ title: "Buscar", tabBarIcon: () => <Text>🔍</Text> }} />
      <Tabs.Screen name="profile" options={{ title: "Perfil", tabBarIcon: () => <Text>👤</Text> }} />
    </Tabs>
  );
}
