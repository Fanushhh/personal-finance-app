import { LoginForm } from '@/components/auth/LoginForm';

export default function LoginPage() {
  return (
    <main className="px-4 py-16">
      <h1 className="mb-6 text-center text-2xl font-bold">Autentificare</h1>
      <LoginForm />
    </main>
  );
}
