import React from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen w-full bg-gray-100 px-3 py-6 sm:px-6 sm:py-10">
      <div className="mx-auto flex w-full max-w-5xl overflow-hidden rounded-2xl bg-white shadow-xl">
        {/* LEFT / BRANDING */}
        <section className="hidden flex-1 bg-gray-900 p-8 text-white sm:flex sm:p-10 lg:p-12">
          <div className="my-auto max-w-md">
            <h1 className="text-2xl font-semibold leading-tight lg:text-3xl">
              Department Q&A Platform
            </h1>

            <p className="mt-3 text-sm leading-6 text-gray-300 lg:text-base">
              Ask questions, share knowledge, and grow together.
            </p>

            <div className="mt-7 space-y-3 text-sm leading-6 text-gray-300">
              <p>• Ask questions anytime</p>
              <p>• Share answers with others</p>
              <p>• Build your academic profile</p>
            </div>
          </div>
        </section>

        {/* RIGHT / FORM */}
        <section className="flex w-full min-w-0 items-center justify-center p-4 sm:p-8 lg:flex-1 lg:p-12">
          <div className="w-full max-w-md">
            {children}
          </div>
        </section>
      </div>
    </main>
  );
}