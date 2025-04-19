"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Input from "../atoms/Input";
import { useLogin } from "../../hooks/useLogin";

const LoginForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const { login, loading: apiLoading, error: apiError } = useLogin();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.email.trim()) newErrors.email = "Email é obrigatório";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email inválido";
    if (!formData.password) newErrors.password = "Senha é obrigatória";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsLoading(true);
    try {
      await login({
        email: formData.email,
        password: formData.password,
      });
      router.push("/");
    } catch (error: unknown) {
      setErrors({ submit: error.message || "Ocorreu um erro ao fazer login. Tente novamente." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Input
        label="Email"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="seu@email.com"
        error={errors.email}
      />
      <Input
        label="Senha"
        name="password"
        type="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="Digite sua senha"
        error={errors.password}
      />
      {(errors.submit || apiError) && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {errors.submit || apiError}
        </div>
      )}
      <button
        type="submit"
        disabled={isLoading || apiLoading}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading || apiLoading ? "Entrando..." : "Entrar"}
      </button>
    </form>
  );
};

export default LoginForm;
