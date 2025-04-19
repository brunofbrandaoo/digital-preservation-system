"use client";

import Link from "next/link";
import RegisterForm from "../../components/organisms/RegisterForm";

export default function Register() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gray-50">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <h1 className="text-2xl font-bold text-center mb-6">Cadastro</h1>
        <RegisterForm />
        <p className="mt-6 text-center text-sm text-gray-600">
          Já possui uma conta?{" "}
          <Link href="/login" className="text-blue-600 hover:text-blue-800 font-medium">
            Faça login
          </Link>
        </p>
      </div>
    </main>
  );
}