import { useState } from "react";

export function useLogin() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function login({ email, password }: { email: string; password: string }) {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("http://localhost:4000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message || "Erro ao fazer login");
      }
      const data = await res.json();
      if (data.access_token) {
        localStorage.setItem("token", data.access_token);
      }
      return data;
    } catch (err: any) {
      setError(err.message || "Erro desconhecido");
      throw err;
    } finally {
      setLoading(false);
    }
  }

  return { login, loading, error };
}
