import { Redirect } from "expo-router";
import { View, ActivityIndicator } from "react-native";
import { useAuthStore } from "../src/store/auth.store";

export default function Index() {
  const { token, isRestoring } = useAuthStore();

  if (isRestoring) {
    return (
      <View className="flex-1 items-center justify-center bg-surface">
        <ActivityIndicator size="large" color="#6366f1" />
      </View>
    );
  }

  return <Redirect href={token ? "/(app)" : "/(auth)/login"} />;
}
