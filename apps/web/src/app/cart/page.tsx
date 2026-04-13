"use client";

import React from "react";
import Link from "next/link";
import MainLayout from "@/components/layout/MainLayout";
import Button from "@/components/common/Button";
import Card from "@/components/common/Card";
import { colors } from "@/styles/colors";
import { spacing, containerWidth } from "@/styles/spacing";
import { useCart, useAuth } from "@/lib/hooks";

export default function CartPage() {
  const { items, subtotal, tax, total, updateQuantity, removeItem, count: cartCount } =
    useCart();
  const { user, logout } = useAuth();

  return (
    <MainLayout cartCount={cartCount} userEmail={user?.email} onLogout={logout}>
      <div style={{ maxWidth: containerWidth, margin: "0 auto", padding: `${spacing.lg} ${spacing.md}` }}>
        <h1 style={{ fontSize: "32px", marginBottom: spacing.xl }}>Shopping Cart</h1>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 350px", gap: spacing.xl }}>
          {/* Cart Items */}
          <div>
            {items.length === 0 ? (
              <Card>
                <div style={{ textAlign: "center", padding: spacing.xl }}>
                  <div style={{ fontSize: "64px", marginBottom: spacing.md }}>🛒</div>
                  <h2 style={{ fontSize: "20px", marginBottom: spacing.md }}>Cart is Empty</h2>
                  <p style={{ color: colors.textSecondary, marginBottom: spacing.lg }}>
                    Add some furniture to get started
                  </p>
                  <Link href="/products">
                    <Button variant="primary">Continue Shopping</Button>
                  </Link>
                </div>
              </Card>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: spacing.md }}>
                {items.map((item) => (
                  <Card key={item.id}>
                    <div style={{ display: "flex", gap: spacing.lg }}>
                      <div
                        style={{
                          width: "100px",
                          height: "100px",
                          backgroundColor: colors.background,
                          borderRadius: "6px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "48px",
                          flexShrink: 0,
                        }}
                      >
                        🛋️
                      </div>
                      <div style={{ flex: 1 }}>
                        <h3 style={{ fontSize: "16px", fontWeight: "bold", marginBottom: spacing.sm }}>
                          {item.name}
                        </h3>
                        <p style={{ fontSize: "14px", color: colors.accent, fontWeight: "bold", marginBottom: spacing.md }}>
                          PKR {item.price.toLocaleString()}
                        </p>
                        <div style={{ display: "flex", alignItems: "center", gap: spacing.sm }}>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            style={{
                              width: "32px",
                              height: "32px",
                              border: `1px solid ${colors.border}`,
                              borderRadius: "4px",
                              cursor: "pointer",
                              backgroundColor: colors.background,
                            }}
                          >
                            −
                          </button>
                          <span style={{ minWidth: "30px", textAlign: "center" }}>
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            style={{
                              width: "32px",
                              height: "32px",
                              border: `1px solid ${colors.border}`,
                              borderRadius: "4px",
                              cursor: "pointer",
                              backgroundColor: colors.background,
                            }}
                          >
                            +
                          </button>
                          <button
                            onClick={() => removeItem(item.id)}
                            style={{
                              marginLeft: "auto",
                              backgroundColor: "transparent",
                              border: "none",
                              color: colors.error,
                              cursor: "pointer",
                              fontSize: "14px",
                              fontWeight: "bold",
                            }}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>

          {/* Order Summary */}
          {items.length > 0 && (
            <Card style={{ height: "fit-content", position: "sticky", top: "100px" }}>
              <h2 style={{ fontSize: "18px", fontWeight: "bold", marginBottom: spacing.lg }}>
                Order Summary
              </h2>

              <div style={{ marginBottom: spacing.md }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: spacing.sm,
                  }}
                >
                  <span style={{ fontSize: "14px" }}>Subtotal</span>
                  <span style={{ fontWeight: "bold" }}>PKR {subtotal.toLocaleString()}</span>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: spacing.md,
                    paddingBottom: spacing.md,
                    borderBottom: `1px solid ${colors.border}`,
                  }}
                >
                  <span style={{ fontSize: "14px" }}>Tax (17%)</span>
                  <span style={{ fontWeight: "bold" }}>PKR {tax.toLocaleString()}</span>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: "16px",
                    fontWeight: "bold",
                    marginBottom: spacing.lg,
                  }}
                >
                  <span>Total</span>
                  <span style={{ color: colors.accent }}>PKR {total.toLocaleString()}</span>
                </div>
              </div>

              <Button variant="primary" fullWidth size="lg" style={{ marginBottom: spacing.md }}>
                Proceed to Checkout
              </Button>
              <Link href="/products">
                <Button variant="outline" fullWidth size="lg">
                  Continue Shopping
                </Button>
              </Link>
            </Card>
          )}
        </div>
      </div>
    </MainLayout>
  );
}
