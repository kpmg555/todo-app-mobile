import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../lib/firebase";
import api from "../lib/api";
import { AuthResponse } from "../types";

export const loginWithFirebase = async (email: string, password: string): Promise<AuthResponse> => {
  const credential = await signInWithEmailAndPassword(auth!, email, password);
  const idToken = await credential.user.getIdToken();
  const { data } = await api.post<AuthResponse>("/auth/firebase-login", { idToken });
  return data;
};

export const registerWithFirebase = async (email: string, password: string): Promise<AuthResponse> => {
  const credential = await createUserWithEmailAndPassword(auth!, email, password);
  const idToken = await credential.user.getIdToken();
  const { data } = await api.post<AuthResponse>("/auth/firebase-login", { idToken });
  return data;
};
