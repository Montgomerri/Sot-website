"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";

import { ShineBorder } from "@/components/ui/shine-border";

interface AuthCardProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

export default function AuthCard({
  title,
  description,
  children,
}: AuthCardProps) {
  return (
    <Card className="relative w-full overflow-hidden shadow-lg sm:shadow-xl">
      <ShineBorder
        shineColor={[
          "#2563eb",
          "#7c3aed",
          "#ec4899",
        ]}
        duration={10}
      />

      <CardHeader className="p-5 sm:p-6">
        <CardTitle className="text-xl sm:text-2xl">
          {title}
        </CardTitle>

        <CardDescription className="mt-1 text-sm leading-5">
          {description}
        </CardDescription>
      </CardHeader>

      <CardContent className="p-5 pt-0 sm:p-6 sm:pt-0">
        {children}
      </CardContent>
    </Card>
  );
}