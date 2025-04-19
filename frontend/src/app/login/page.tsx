import Link from "next/link";
import LoginForm from "@/components/organisms/LoginForm";

export default function Login() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gray-50">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <h1 className="text-2xl font-bold text-center mb-6">Login</h1>
        <LoginForm />
        <p className="mt-6 text-center text-sm text-gray-600">
          Não possui uma conta?{" "}
          <Link href="/register" className="text-blue-600 hover:text-blue-800 font-medium">
            Cadastre-se
          </Link>
        </p>
      </div>
    </main>
  );
}