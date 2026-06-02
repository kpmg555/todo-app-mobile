import { View, Text, TouchableOpacity, Alert } from "react-native";
import { useRouter } from "expo-router";
import { useAuthStore } from "../../src/store/auth.store";
import { useQueryClient } from "@tanstack/react-query";

export default function Profile() {
  const router = useRouter();
  const { user, clearAuth } = useAuthStore();
  const qc = useQueryClient();

  const handleLogout = async () => {
    Alert.alert("Cerrar sesión", "¿Estás seguro?", [
      { text: "Cancelar" },
      {
        text: "Cerrar sesión",
        style: "destructive",
        onPress: async () => {
          await clearAuth();
          qc.clear();
          router.replace("/(auth)/login");
        },
      },
    ]);
  };

  return (
    <View className="flex-1 bg-surface px-4 pt-12">
      <Text className="text-2xl font-bold text-gray-800 mb-8">Perfil</Text>

      <View className="bg-white rounded-xl p-6 mb-6 border border-gray-100">
        <View className="w-16 h-16 rounded-full bg-primary items-center justify-center mb-4">
          <Text className="text-white text-2xl font-bold">
            {user?.name?.[0] ?? user?.email?.[0] ?? "U"}
          </Text>
        </View>
        <Text className="text-xl font-semibold text-gray-800">{user?.name ?? "Usuario"}</Text>
        <Text className="text-muted">{user?.email}</Text>
      </View>

      <View className="bg-white rounded-xl p-4 mb-4 border border-gray-100">
        <Text className="font-semibold text-gray-700 mb-1">Acerca de</Text>
        <Text className="text-muted text-sm">Todo App — Mini Proyecto Final</Text>
        <Text className="text-muted text-sm">React Native + Expo + Firebase</Text>
      </View>

      <TouchableOpacity className="bg-danger rounded-xl py-4 items-center" onPress={handleLogout}>
        <Text className="text-white font-semibold text-base">Cerrar sesión</Text>
      </TouchableOpacity>
    </View>
  );
}
