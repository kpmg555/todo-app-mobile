import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, Alert, TextInput } from "react-native";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { getLists, createList, deleteList } from "../../src/services/lists.service";
import { useState } from "react";

export default function Home() {
  const router = useRouter();
  const qc = useQueryClient();
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");

  const { data: lists, isLoading, error } = useQuery({ queryKey: ["lists"], queryFn: getLists });

  const create = useMutation({
    mutationFn: () => createList({ title }),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["lists"] }); setTitle(""); setShowForm(false); },
    onError: (e: any) => Alert.alert("Error", e.response?.data?.error || "Error al crear"),
  });

  const remove = useMutation({
    mutationFn: deleteList,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["lists"] }),
  });

  if (isLoading) return <View className="flex-1 items-center justify-center bg-surface"><ActivityIndicator color="#6366f1" size="large" /></View>;
  if (error) return <View className="flex-1 items-center justify-center bg-surface"><Text className="text-danger">Error cargando listas</Text></View>;

  return (
    <View className="flex-1 bg-surface px-4 pt-12">
      <View className="flex-row justify-between items-center mb-6">
        <Text className="text-2xl font-bold text-gray-800">Mis Listas</Text>
        <TouchableOpacity className="bg-primary rounded-xl px-4 py-2" onPress={() => setShowForm(!showForm)}>
          <Text className="text-white font-semibold">+ Nueva</Text>
        </TouchableOpacity>
      </View>

      {showForm && (
        <View className="bg-white rounded-xl p-4 mb-4 border border-gray-200">
          <Text className="font-semibold text-gray-700 mb-2">Nombre de la lista</Text>
          <TextInput
            className="border border-gray-200 rounded-lg px-3 py-2 mb-3 text-gray-800"
            placeholder="Ej: Trabajo, Personal..."
            value={title}
            onChangeText={setTitle}
          />
          <View className="flex-row gap-2">
            <TouchableOpacity className="flex-1 bg-primary rounded-lg py-2 items-center" onPress={() => title && create.mutate()}>
              <Text className="text-white font-semibold">Crear</Text>
            </TouchableOpacity>
            <TouchableOpacity className="flex-1 bg-gray-100 rounded-lg py-2 items-center" onPress={() => setShowForm(false)}>
              <Text className="text-gray-600">Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      <FlatList
        data={lists}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            className="bg-white rounded-xl p-4 mb-3 border border-gray-100 flex-row justify-between items-center"
            onPress={() => router.push(`/(app)/lists/${item.id}`)}
          >
            <View className="flex-row items-center gap-3">
              <View className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
              <View>
                <Text className="font-semibold text-gray-800">{item.title}</Text>
                <Text className="text-muted text-sm">{item._count?.tasks ?? 0} tareas</Text>
              </View>
            </View>
            <TouchableOpacity onPress={() => Alert.alert("Eliminar", "¿Eliminar esta lista?", [
              { text: "Cancelar" },
              { text: "Eliminar", style: "destructive", onPress: () => remove.mutate(item.id) },
            ])}>
              <Text className="text-danger text-lg">🗑</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        )}
        ListEmptyComponent={<Text className="text-center text-muted mt-10">No tienes listas aún</Text>}
      />
    </View>
  );
}
