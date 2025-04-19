import { useState } from "react";

export function useRegister() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function register({ name, email, password }: { name: string; email: string; password: string }) {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("http://localhost:4000/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message || "Erro ao cadastrar usuário");
      }
      return await res.json();
    } catch (err: any) {
      setError(err.message || "Erro desconhecido");
      throw err;
    } finally {
      setLoading(false);
    }
  }

  return { register, loading, error };
}
