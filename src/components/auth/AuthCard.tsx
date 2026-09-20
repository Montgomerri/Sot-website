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
    <Card className="relative w-full max-w-md overflow-hidden shadow-xl">
      <ShineBorder
        shineColor={[
          "#2563eb",
          "#7c3aed",
          "#ec4899",
        ]}
        duration={10}
      />

      <CardHeader>
        <CardTitle className="text-2xl">
          {title}
        </CardTitle>

        <CardDescription>
          {description}
        </CardDescription>
      </CardHeader>

      <CardContent>
        {children}
      </CardContent>
    </Card>
  );
}