import LoginForm from "@/components/auth/login-form";

export const dynamic = "force-dynamic";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-zinc-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-teal-500">Welcome Back</h1>
          <p className="text-zinc-400 mt-2">Please sign in to continue</p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
