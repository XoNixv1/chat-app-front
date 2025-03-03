"use client";

import type React from "react";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { register } from "@/app/actions/auth";
import { Mail, Lock, User, Loader2 } from "lucide-react";

export default function RegisterForm() {
  const router = useRouter();
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);

    const formData = new FormData(event.currentTarget);
    const username = formData.get("username") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const result = await register(username, email, password);
      if (result.success) {
        router.push("/login"); // Redirect to login
      } else {
        setError(result.error || "Registration failed");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-zinc-900 p-8 rounded-lg border border-zinc-700">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="username" className="text-zinc-200">
            Username
          </label>
          <div className="relative">
            <User className="absolute left-3 top-3 h-4 w-4 text-zinc-400" />
            <Input
              id="username"
              name="username"
              type="text"
              placeholder="Choose a username"
              required
              className="pl-9 bg-zinc-800 border-zinc-700 text-zinc-100 placeholder:text-zinc-500 focus-visible:ring-teal-500"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="email" className="text-zinc-200">
            Email
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-3 h-4 w-4 text-zinc-400" />
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              required
              className="pl-9 bg-zinc-800 border-zinc-700 text-zinc-100 placeholder:text-zinc-500 focus-visible:ring-teal-500"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="password" className="text-zinc-200">
            Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-3 h-4 w-4 text-zinc-400" />
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Create a password"
              required
              className="pl-9 bg-zinc-800 border-zinc-700 text-zinc-100 placeholder:text-zinc-500 focus-visible:ring-teal-500"
            />
          </div>
        </div>

        {error && <div className="text-red-500 text-sm">{error}</div>}

        <Button
          type="submit"
          className="w-full bg-teal-500 hover:bg-teal-600 text-white"
          disabled={loading}
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Creating account...
            </>
          ) : (
            "Create account"
          )}
        </Button>

        <div className="text-center text-zinc-400 text-sm">
          Already have an account?{" "}
          <Link href="/login" className="text-teal-500 hover:text-teal-400">
            Sign in
          </Link>
        </div>
      </form>
    </div>
  );
}
