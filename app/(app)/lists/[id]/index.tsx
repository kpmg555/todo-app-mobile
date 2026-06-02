import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, Alert, TextInput } from "react-native";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocalSearchParams, useRouter } from "expo-router";
import { getList } from "../../../../src/services/lists.service";
import { getTasks, createTask, toggleTask, deleteTask } from "../../../../src/services/tasks.service";
import { useState } from "react";
import { Task } from "../../../../src/types";

export default function ListDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const qc = useQueryClient();
  const [newTask, setNewTask] = useState("");

  const { data: list, isLoading: loadingList } = useQuery({ queryKey: ["list", id], queryFn: () => getList(id) });
  const { data: tasks, isLoading: loadingTasks } = useQuery({ queryKey: ["tasks", id], queryFn: () => getTasks(id) });

  const create = useMutation({
    mutationFn: () => createTask(id, { title: newTask }),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["tasks", id] }); setNewTask(""); },
  });

  const toggle = useMutation({
    mutationFn: toggleTask,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["tasks", id] }),
  });

  const remove = useMutation({
    mutationFn: deleteTask,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["tasks", id] }),
  });

  if (loadingList || loadingTasks) return <View className="flex-1 items-center justify-center bg-surface"><ActivityIndicator color="#6366f1" size="large" /></View>;

  return (
    <View className="flex-1 bg-surface px-4 pt-12">
      <TouchableOpacity onPress={() => router.back()} className="mb-4">
        <Text className="text-primary">← Volver</Text>
      </TouchableOpacity>

      <View className="flex-row items-center gap-2 mb-6">
        <View className="w-4 h-4 rounded-full" style={{ backgroundColor: list?.color }} />
        <Text className="text-2xl font-bold text-gray-800">{list?.title}</Text>
      </View>

      <View className="flex-row gap-2 mb-6">
        <TextInput
          className="flex-1 bg-white border border-gray-200 rounded-xl px-4 py-3 text-gray-800"
          placeholder="Nueva tarea..."
          value={newTask}
          onChangeText={setNewTask}
        />
        <TouchableOpacity className="bg-primary rounded-xl px-4 items-center justify-center" onPress={() => newTask && create.mutate()}>
          <Text className="text-white font-bold text-lg">+</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }: { item: Task }) => (
          <View className="bg-white rounded-xl p-4 mb-3 flex-row items-center justify-between border border-gray-100">
            <TouchableOpacity className="flex-row items-center gap-3 flex-1" onPress={() => toggle.mutate(item.id)}>
              <View className={`w-5 h-5 rounded-full border-2 items-center justify-center ${item.completed ? "bg-primary border-primary" : "border-gray-300"}`}>
                {item.completed && <Text className="text-white text-xs">✓</Text>}
              </View>
              <Text className={`flex-1 ${item.completed ? "line-through text-muted" : "text-gray-800"}`}>{item.title}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => Alert.alert("Eliminar", "¿Eliminar tarea?", [
              { text: "Cancelar" },
              { text: "Eliminar", style: "destructive", onPress: () => remove.mutate(item.id) },
            ])}>
              <Text className="text-danger">🗑</Text>
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={<Text className="text-center text-muted mt-10">No hay tareas en esta lista</Text>}
      />
    </View>
  );
}
