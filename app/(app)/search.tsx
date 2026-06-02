import { useState } from "react";
import { View, Text, TextInput, ActivityIndicator, TouchableOpacity } from "react-native";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { search } from "../../src/services/search.service";

export default function Search() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const { data, isLoading } = useQuery({
    queryKey: ["search", query],
    queryFn: () => search(query),
    enabled: query.length > 1,
  });

  return (
    <View className="flex-1 bg-surface px-4 pt-12">
      <Text className="text-2xl font-bold text-gray-800 mb-4">Buscar</Text>

      <TextInput
        className="bg-white border border-gray-200 rounded-xl px-4 py-3 mb-6 text-gray-800"
        placeholder="Buscar listas y tareas..."
        value={query}
        onChangeText={setQuery}
        autoFocus
      />

      {isLoading && <ActivityIndicator color="#6366f1" />}

      {data && (
        <>
          {data.results.lists.length > 0 && (
            <>
              <Text className="font-semibold text-gray-600 mb-2">Listas ({data.results.lists.length})</Text>
              {data.results.lists.map((list) => (
                <TouchableOpacity key={list.id} className="bg-white rounded-xl p-4 mb-2 border border-gray-100"
                  onPress={() => router.push(`/(app)/lists/${list.id}`)}>
                  <View className="flex-row items-center gap-2">
                    <View className="w-3 h-3 rounded-full" style={{ backgroundColor: list.color }} />
                    <Text className="font-semibold text-gray-800">{list.title}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </>
          )}

          {data.results.tasks.length > 0 && (
            <>
              <Text className="font-semibold text-gray-600 mb-2 mt-4">Tareas ({data.results.tasks.length})</Text>
              {data.results.tasks.map((task) => (
                <TouchableOpacity key={task.id} className="bg-white rounded-xl p-4 mb-2 border border-gray-100"
                  onPress={() => router.push(`/(app)/lists/${task.listId}`)}>
                  <Text className={`text-gray-800 ${task.completed ? "line-through text-muted" : ""}`}>{task.title}</Text>
                  <Text className="text-muted text-sm">en {task.list.title}</Text>
                </TouchableOpacity>
              ))}
            </>
          )}

          {data.results.total === 0 && (
            <Text className="text-center text-muted mt-10">Sin resultados para "{query}"</Text>
          )}
        </>
      )}
    </View>
  );
}
