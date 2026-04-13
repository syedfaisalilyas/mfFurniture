"use client";

import React, { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import Card from "@/components/common/Card";
import TextInput from "@/components/common/TextInput";
import Button from "@/components/common/Button";
import { colors } from "@/styles/colors";
import { spacing, containerWidth } from "@/styles/spacing";
import { useAuth, useCart } from "@/lib/hooks";

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const { count: cartCount } = useCart();
  const [profile, setProfile] = useState({
    name: user?.email?.split("@")[0] || "User",
    email: user?.email || "",
    phone: "+92 300 1234567",
    city: "Karachi",
    address: "123 Main Street",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (field: string, value: string) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      // Save profile logic here
      setIsEditing(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout cartCount={cartCount} userEmail={user?.email} onLogout={logout}>
      <div style={{ maxWidth: containerWidth, margin: "0 auto", padding: `${spacing.lg} ${spacing.md}` }}>
        <h1 style={{ fontSize: "32px", marginBottom: spacing.xl }}>My Profile</h1>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 350px", gap: spacing.xl }}>
          {/* Profile Form */}
          <Card>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: spacing.xl }}>
              <h2 style={{ fontSize: "20px", fontWeight: "bold" }}>Personal Information</h2>
              {!isEditing && (
                <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
                  Edit
                </Button>
              )}
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: spacing.lg,
              }}
            >
              <TextInput
                label="Name"
                value={profile.name}
                onChange={(e) => handleChange("name", e.target.value)}
                disabled={!isEditing}
              />

              <TextInput
                label="Email"
                type="email"
                value={profile.email}
                onChange={(e) => handleChange("email", e.target.value)}
                disabled={true}
              />

              <TextInput
                label="Phone"
                value={profile.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
                disabled={!isEditing}
              />

              <TextInput
                label="City"
                value={profile.city}
                onChange={(e) => handleChange("city", e.target.value)}
                disabled={!isEditing}
              />

              <div style={{ gridColumn: "1 / -1" }}>
                <TextInput
                  label="Address"
                  value={profile.address}
                  onChange={(e) => handleChange("address", e.target.value)}
                  disabled={!isEditing}
                />
              </div>
            </div>

            {isEditing && (
              <div style={{ display: "flex", gap: spacing.md, marginTop: spacing.lg }}>
                <Button
                  variant="primary"
                  loading={loading}
                  onClick={handleSave}
                  style={{ flex: 1 }}
                >
                  Save Changes
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setIsEditing(false)}
                  disabled={loading}
                  style={{ flex: 1 }}
                >
                  Cancel
                </Button>
              </div>
            )}
          </Card>

          {/* Quick Links */}
          <div style={{ display: "flex", flexDirection: "column", gap: spacing.md }}>
            <Card>
              <h3 style={{ fontSize: "16px", fontWeight: "bold", marginBottom: spacing.md }}>
                Account Settings
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: spacing.sm }}>
                <a
                  href="#"
                  style={{
                    color: colors.primary,
                    fontSize: "14px",
                    padding: `${spacing.sm} 0`,
                  }}
                >
                  Change Password
                </a>
                <a
                  href="#"
                  style={{
                    color: colors.primary,
                    fontSize: "14px",
                    padding: `${spacing.sm} 0`,
                  }}
                >
                  Privacy Settings
                </a>
                <a
                  href="#"
                  style={{
                    color: colors.primary,
                    fontSize: "14px",
                    padding: `${spacing.sm} 0`,
                  }}
                >
                  Notifications
                </a>
              </div>
            </Card>

            <Card>
              <h3 style={{ fontSize: "16px", fontWeight: "bold", marginBottom: spacing.md }}>
                Support
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: spacing.sm }}>
                <a
                  href="#"
                  style={{
                    color: colors.primary,
                    fontSize: "14px",
                    padding: `${spacing.sm} 0`,
                  }}
                >
                  Help Center
                </a>
                <a
                  href="#"
                  style={{
                    color: colors.primary,
                    fontSize: "14px",
                    padding: `${spacing.sm} 0`,
                  }}
                >
                  Contact Us
                </a>
                <a
                  href="#"
                  style={{
                    color: colors.error,
                    fontSize: "14px",
                    padding: `${spacing.sm} 0`,
                    fontWeight: "bold",
                  }}
                >
                  Delete Account
                </a>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
