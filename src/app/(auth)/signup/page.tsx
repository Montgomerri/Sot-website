import SignupForm from "@/components/auth/SignupForm";
import AuthCard from "@/components/auth/AuthCard";

export default function SignupPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 p-6">

      <AuthCard
        title="Create account"
        description="Join your department community"
      >
        <SignupForm />
      </AuthCard>

    </main>
  );
}