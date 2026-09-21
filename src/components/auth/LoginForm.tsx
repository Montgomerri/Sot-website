"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Alert from "@/components/ui/Alert";

import { createClient } from "@/lib/supabase/client";

export default function LoginForm() {
  const supabase = createClient();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] =
    useState<string | null>(null);

  const handleLogin = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setLoading(true);
    setError(null);

    const { error } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      });

    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    await supabase.auth.getSession();

    router.push("/dashboard");
    router.refresh();
  };

  return (
    <form
      onSubmit={handleLogin}
      className="w-full space-y-4"
    >
      <div className="mb-5 sm:mb-6">
        <h2 className="text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl">
          Welcome back
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Login to continue
        </p>
      </div>

      {error && <Alert message={error} />}

      <Input
        label="Email"
        type="email"
        value={email}
        disabled={loading}
        required
        onChange={(e) =>
          setEmail(e.target.value)
        }
      />

      <Input
        label="Password"
        type="password"
        value={password}
        disabled={loading}
        required
        onChange={(e) =>
          setPassword(e.target.value)
        }
      />

      <div className="pt-1">
        <Button
          type="submit"
          disabled={loading}
        >
          {loading
            ? "Signing in..."
            : "Sign in"}
        </Button>
      </div>

      <p className="pt-2 text-center text-xs leading-5 text-gray-500 sm:text-sm">
        Don't have an account?{" "}
        <a
          href="/signup"
          className="font-medium text-black underline-offset-4 hover:underline"
        >
          Create account
        </a>
      </p>
    </form>
  );
}