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

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      // 1. Create user in Supabase
      const { error: signUpError } = await supabase.auth.signUp({
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

      // 2. Send welcome email (non-blocking but still awaited for logging)
      try {
        const response = await fetch("/api/welcome", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            name: fullName,
          }),
        });

        const result = await response.json();
        console.log("Welcome email response:", result);
      } catch (emailError) {
        console.error("Welcome email failed:", emailError);
      }

      // 3. Success UI
      setSuccess("Account created successfully! Redirecting to login...");

      // 4. Redirect
      setTimeout(() => {
        router.push("/login");
      }, 1200);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSignup} className="space-y-4">
      

      {error && <Alert message={error} />}

      {success && (
        <div className="bg-green-50 text-green-700 text-sm px-3 py-2 rounded-lg border border-green-200">
          {success}
        </div>
      )}

      <Input
        label="Full name"
        value={fullName}
        required
        disabled={loading}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setFullName(e.target.value)
        }
      />

      <Input
        label="Email"
        type="email"
        value={email}
        required
        disabled={loading}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setEmail(e.target.value)
        }
      />

      <Input
        label="Password"
        type="password"
        value={password}
        required
        disabled={loading}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setPassword(e.target.value)
        }
      />

      <Button type="submit" disabled={loading}>
        {loading ? "Creating account..." : "Create account"}
      </Button>

      <p className="text-xs text-gray-500 text-center mt-4">
        Already have an account?{" "}
        <a href="/login" className="text-black font-medium">
          Sign in
        </a>
      </p>
    </form>
  );
}