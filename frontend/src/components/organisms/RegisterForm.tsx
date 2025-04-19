"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Input from "../atoms/Input";
import { useRegister } from "../../hooks/useRegister";

const RegisterForm = () => {
  const router = useRouter();
  const { register, loading: apiLoading, error: apiError } = useRegister();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Nome é obrigatório";
    if (!formData.email.trim()) newErrors.email = "Email é obrigatório";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email inválido";
    if (!formData.password) newErrors.password = "Senha é obrigatória";
    else if (formData.password.length < 6) newErrors.password = "A senha deve ter pelo menos 6 caracteres";
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "As senhas não coincidem";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsLoading(true);
    try {
      await register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });
      router.push("/login");
    } catch (error: any) {
      setErrors({ submit: error.message || "Ocorreu um erro ao cadastrar. Tente novamente." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Input
        label="Nome"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Digite seu nome completo"
        error={errors.name}
      />
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
        placeholder="Senha (mínimo 6 caracteres)"
        error={errors.password}
      />
      <Input
        label="Confirmar Senha"
        name="confirmPassword"
        type="password"
        value={formData.confirmPassword}
        onChange={handleChange}
        placeholder="Confirme sua senha"
        error={errors.confirmPassword}
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
        {isLoading || apiLoading ? "Cadastrando..." : "Cadastrar"}
      </button>
    </form>
  );
};

export default RegisterForm;
