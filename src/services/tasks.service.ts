import api from "../lib/api";
import { Task } from "../types";

export const getTasks = async (listId: string): Promise<Task[]> => {
  const { data } = await api.get<Task[]>(`/lists/${listId}/tasks`);
  return data;
};

export const createTask = async (listId: string, payload: { title: string; description?: string; priority?: string; dueDate?: string }): Promise<Task> => {
  const { data } = await api.post<Task>(`/lists/${listId}/tasks`, payload);
  return data;
};

export const updateTask = async (id: string, payload: Partial<Task>): Promise<Task> => {
  const { data } = await api.put<Task>(`/tasks/${id}`, payload);
  return data;
};

export const toggleTask = async (id: string): Promise<Task> => {
  const { data } = await api.patch<Task>(`/tasks/${id}/toggle`);
  return data;
};

export const deleteTask = async (id: string): Promise<void> => {
  await api.delete(`/tasks/${id}`);
};
