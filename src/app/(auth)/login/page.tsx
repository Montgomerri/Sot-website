import LoginForm from "@/components/auth/LoginForm";
import AuthCard from "@/components/auth/AuthCard";

export default function LoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 p-6">

      <AuthCard
        title="Welcome back"
        description="Login to continue to your department platform"
      >
        <LoginForm />
      </AuthCard>

    </main>
  );
}