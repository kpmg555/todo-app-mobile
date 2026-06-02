import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import { loginWithFirebase, registerWithFirebase } from "../../src/services/auth.service";
import { useAuthStore } from "../../src/store/auth.store";

export default function Login() {
  const router = useRouter();
  const setAuth = useAuthStore((s) => s.setAuth);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!email || !password) return setError("Completa todos los campos");
    setError("");
    setLoading(true);
    try {
      const fn = isRegister ? registerWithFirebase : loginWithFirebase;
      const { user, token } = await fn(email, password);
      await setAuth(user, token);
      router.replace("/(app)");
    } catch (e: any) {
      setError(e.response?.data?.error || e.message || "Error al iniciar sesión");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 bg-surface justify-center px-6">
      <Text className="text-3xl font-bold text-gray-800 mb-2">
        {isRegister ? "Crear cuenta" : "Bienvenido"}
      </Text>
      <Text className="text-muted mb-8">
        {isRegister ? "Regístrate para continuar" : "Inicia sesión para continuar"}
      </Text>

      <TextInput
        className="bg-white border border-gray-200 rounded-xl px-4 py-3 mb-4 text-gray-800"
        placeholder="Correo electrónico"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        className="bg-white border border-gray-200 rounded-xl px-4 py-3 mb-6 text-gray-800"
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      {error ? <Text className="text-danger text-sm mb-4 text-center">{error}</Text> : null}

      <TouchableOpacity
        className="bg-primary rounded-xl py-4 items-center mb-4"
        onPress={handleSubmit}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text className="text-white font-semibold text-base">
            {isRegister ? "Crear cuenta" : "Iniciar sesión"}
          </Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setIsRegister(!isRegister)}>
        <Text className="text-center text-primary">
          {isRegister ? "¿Ya tienes cuenta? Inicia sesión" : "¿No tienes cuenta? Regístrate"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
