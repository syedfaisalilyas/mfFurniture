"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import MainLayout from "@/components/layout/MainLayout";
import Button from "@/components/common/Button";
import TextInput from "@/components/common/TextInput";
import Card from "@/components/common/Card";
import { colors } from "@/styles/colors";
import { spacing, containerWidth } from "@/styles/spacing";
import { useAuth } from "@/lib/hooks/useAuth";

export default function LoginPage() {
  const router = useRouter();
  const { login, loading: authLoading, error: authError } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      newErrors.email = "Invalid email format";
    if (!password) newErrors.password = "Password is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      await login(email, password);
      router.push("/");
    } catch (err) {
      // Error is handled by useAuth hook
    }
  };

  return (
    <MainLayout>
      <div
        style={{
          maxWidth: containerWidth,
          margin: "0 auto",
          padding: `${spacing.xxl} ${spacing.md}`,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "500px",
        }}
      >
        <Card
          style={{
            width: "100%",
            maxWidth: "400px",
          }}
        >
          <h1
            style={{
              fontSize: "28px",
              marginBottom: spacing.lg,
              textAlign: "center",
              fontWeight: "bold",
            }}
          >
            Login
          </h1>

          {authError && (
            <div
              style={{
                padding: spacing.md,
                backgroundColor: `${colors.error}20`,
                color: colors.error,
                borderRadius: "6px",
                marginBottom: spacing.md,
                fontSize: "14px",
              }}
            >
              {authError}
            </div>
          )}

          <form onSubmit={handleLogin}>
            <TextInput
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={errors.email}
              placeholder="your@email.com"
            />

            <TextInput
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={errors.password}
              placeholder="Enter your password"
            />

            <Button
              variant="primary"
              fullWidth
              size="lg"
              loading={authLoading}
              style={{ marginBottom: spacing.md }}
            >
              Login
            </Button>
          </form>

          <p
            style={{
              textAlign: "center",
              fontSize: "14px",
              color: colors.textSecondary,
              marginBottom: spacing.md,
            }}
          >
            Don't have an account?{" "}
            <Link
              href="/register"
              style={{
                color: colors.primary,
                fontWeight: "bold",
              }}
            >
              Sign up
            </Link>
          </p>

          <p
            style={{
              textAlign: "center",
              fontSize: "14px",
            }}
          >
            <Link
              href="/forgot-password"
              style={{
                color: colors.textSecondary,
              }}
            >
              Forgot password?
            </Link>
          </p>
        </Card>
      </div>
    </MainLayout>
  );
}
