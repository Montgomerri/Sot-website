"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Alert from "@/components/ui/Alert";

import { createClient } from "@/lib/supabase/client";

export default function SignupForm() {
  const supabase = createClient();
  const router = useRouter();

  const [fullName, setFullName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState<string | null>(null);

  const [success, setSuccess] =
    useState<string | null>(null);

  const handleSignup = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      // Create user in Supabase
      const { error: signUpError } =
        await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: fullName,
            },
          },
        });

      if (signUpError) {
        setError(signUpError.message);
        setLoading(false);
        return;
      }

      // Send welcome email
      try {
        const response = await fetch(
          "/api/welcome",
          {
            method: "POST",
            headers: {
              "Content-Type":
                "application/json",
            },
            body: JSON.stringify({
              email,
              name: fullName,
            }),
          }
        );

        const result =
          await response.json();

        console.log(
          "Welcome email response:",
          result
        );
      } catch (emailError) {
        console.error(
          "Welcome email failed:",
          emailError
        );
      }

      setSuccess(
        "Account created successfully! Redirecting to login..."
      );

      setTimeout(() => {
        router.push("/login");
      }, 1200);
    } catch (err: any) {
      setError(
        err.message ||
          "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSignup}
      className="w-full space-y-4"
    >
      {error && (
        <Alert message={error} />
      )}

      {success && (
        <div className="rounded-lg border border-green-200 bg-green-50 px-3 py-3 text-sm leading-5 text-green-700">
          {success}
        </div>
      )}

      <Input
        label="Full name"
        value={fullName}
        required
        disabled={loading}
        onChange={(
          e: React.ChangeEvent<HTMLInputElement>
        ) =>
          setFullName(e.target.value)
        }
      />

      <Input
        label="Email"
        type="email"
        value={email}
        required
        disabled={loading}
        onChange={(
          e: React.ChangeEvent<HTMLInputElement>
        ) =>
          setEmail(e.target.value)
        }
      />

      <Input
        label="Password"
        type="password"
        value={password}
        required
        disabled={loading}
        onChange={(
          e: React.ChangeEvent<HTMLInputElement>
        ) =>
          setPassword(e.target.value)
        }
      />

      <div className="pt-1">
        <Button
          type="submit"
          disabled={loading}
        >
          {loading
            ? "Creating account..."
            : "Create account"}
        </Button>
      </div>

      <p className="pt-2 text-center text-xs leading-5 text-gray-500 sm:text-sm">
        Already have an account?{" "}
        <a
          href="/login"
          className="font-medium text-black underline-offset-4 hover:underline"
        >
          Sign in
        </a>
      </p>
    </form>
  );
}