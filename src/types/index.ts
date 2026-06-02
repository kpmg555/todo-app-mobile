export interface User {
  id: string;
  email: string;
  name: string | null;
  photoURL: string | null;
}

export interface List {
  id: string;
  title: string;
  description: string | null;
  color: string;
  userId: string;
  createdAt: string;
  _count?: { tasks: number };
}

export interface Task {
  id: string;
  title: string;
  description: string | null;
  completed: boolean;
  priority: "LOW" | "MEDIUM" | "HIGH";
  dueDate: string | null;
  listId: string;
  userId: string;
  createdAt: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface SearchResults {
  query: string;
  results: {
    lists: List[];
    tasks: (Task & { list: { id: string; title: string; color: string } })[];
    total: number;
  };
}
