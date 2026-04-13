"use client";

import React, { useState } from "react";
import Link from "next/link";
import MainLayout from "@/components/layout/MainLayout";
import Button from "@/components/common/Button";
import TextInput from "@/components/common/TextInput";
import Card from "@/components/common/Card";
import { colors } from "@/styles/colors";
import { spacing, containerWidth } from "@/styles/spacing";
import { useAuth } from "@/lib/hooks/useAuth";

export default function RegisterPage() {
  const { register, loading: authLoading, error: authError } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [success, setSuccess] = useState(false);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      newErrors.email = "Invalid email format";
    if (!password) newErrors.password = "Password is required";
    else if (password.length < 6)
      newErrors.password = "Password must be at least 6 characters";
    if (!confirmPassword) newErrors.confirmPassword = "Please confirm your password";
    else if (password !== confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      await register(email, password);
      setSuccess(true);
    } catch (err) {
      // Error is handled by useAuth hook
    }
  };

  if (success) {
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
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: "64px", marginBottom: spacing.lg }}>✅</div>
            <h1 style={{ fontSize: "28px", marginBottom: spacing.md, fontWeight: "bold" }}>
              Account Created!
            </h1>
            <p style={{ fontSize: "14px", color: colors.textSecondary, marginBottom: spacing.lg }}>
              Please check your email to confirm your account. Once confirmed, you can log in.
            </p>
            <Link href="/login">
              <Button variant="primary" fullWidth size="lg">
                Go to Login
              </Button>
            </Link>
          </Card>
        </div>
      </MainLayout>
    );
  }

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
            Create Account
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

          <form onSubmit={handleRegister}>
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
              placeholder="At least 6 characters"
            />

            <TextInput
              label="Confirm Password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              error={errors.confirmPassword}
              placeholder="Re-enter your password"
            />

            <Button
              variant="primary"
              fullWidth
              size="lg"
              loading={authLoading}
              style={{ marginBottom: spacing.md }}
            >
              Create Account
            </Button>
          </form>

          <p
            style={{
              textAlign: "center",
              fontSize: "14px",
              color: colors.textSecondary,
            }}
          >
            Already have an account?{" "}
            <Link
              href="/login"
              style={{
                color: colors.primary,
                fontWeight: "bold",
              }}
            >
              Login
            </Link>
          </p>
        </Card>
      </div>
    </MainLayout>
  );
}
