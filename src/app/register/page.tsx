import RegisterForm from "@/components/auth/register-form";

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-zinc-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-teal-500">Create Account</h1>
          <p className="text-zinc-400 mt-2">Sign up to get started</p>
        </div>
        <RegisterForm />
      </div>
    </div>
  );
}
