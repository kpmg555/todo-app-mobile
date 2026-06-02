import api from "../lib/api";
import { SearchResults } from "../types";

export const search = async (q: string): Promise<SearchResults> => {
  const { data } = await api.get<SearchResults>(`/search?q=${encodeURIComponent(q)}`);
  return data;
};
