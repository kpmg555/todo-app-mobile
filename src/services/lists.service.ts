import api from "../lib/api";
import { List } from "../types";

export const getLists = async (): Promise<List[]> => {
  const { data } = await api.get<List[]>("/lists");
  return data;
};

export const getList = async (id: string): Promise<List> => {
  const { data } = await api.get<List>(`/lists/${id}`);
  return data;
};

export const createList = async (payload: { title: string; description?: string; color?: string }): Promise<List> => {
  const { data } = await api.post<List>("/lists", payload);
  return data;
};

export const updateList = async (id: string, payload: Partial<{ title: string; description: string; color: string }>): Promise<List> => {
  const { data } = await api.put<List>(`/lists/${id}`, payload);
  return data;
};

export const deleteList = async (id: string): Promise<void> => {
  await api.delete(`/lists/${id}`);
};
