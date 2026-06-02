import api from "../lib/api";
import { AuthResponse } from "../types";

const API_KEY = process.env.EXPO_PUBLIC_FIREBASE_API_KEY;

const firebaseREST = async (endpoint: string, email: string, password: string): Promise<string> => {
  const res = await fetch(
    `https://identitytoolkit.googleapis.com/v1/accounts:${endpoint}?key=${API_KEY}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, returnSecureToken: true }),
    }
  );
  const data = await res.json();
  if (!res.ok) throw new Error(data.error?.message || "Error de autenticación");
  return data.idToken;
};

export const loginWithFirebase = async (email: string, password: string): Promise<AuthResponse> => {
  const idToken = await firebaseREST("signInWithPassword", email, password);
  const { data } = await api.post<AuthResponse>("/auth/firebase-login", { idToken });
  return data;
};

export const registerWithFirebase = async (email: string, password: string): Promise<AuthResponse> => {
  const idToken = await firebaseREST("signUp", email, password);
  const { data } = await api.post<AuthResponse>("/auth/firebase-login", { idToken });
  return data;
};
