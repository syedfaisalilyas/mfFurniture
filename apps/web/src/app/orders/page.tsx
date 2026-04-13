"use client";

import React from "react";
import Link from "next/link";
import MainLayout from "@/components/layout/MainLayout";
import Card from "@/components/common/Card";
import Button from "@/components/common/Button";
import { colors } from "@/styles/colors";
import { spacing, containerWidth } from "@/styles/spacing";
import { useOrders, useAuth, useCart } from "@/lib/hooks";

const statusColors: Record<string, string> = {
  pending: colors.statusPending,
  confirmed: colors.statusConfirmed,
  processing: colors.statusProcessing,
  shipped: colors.statusShipped,
  delivered: colors.statusDelivered,
  cancelled: colors.statusCancelled,
};

export default function OrdersPage() {
  const { user, logout } = useAuth();
  const { orders, loading } = useOrders(user?.id);
  const { count: cartCount } = useCart();

  return (
    <MainLayout cartCount={cartCount} userEmail={user?.email} onLogout={logout}>
      <div style={{ maxWidth: containerWidth, margin: "0 auto", padding: `${spacing.lg} ${spacing.md}` }}>
        <h1 style={{ fontSize: "32px", marginBottom: spacing.xl }}>My Orders</h1>

        {loading && <p style={{ textAlign: "center", color: colors.textSecondary }}>Loading orders...</p>}

        {!loading && orders.length === 0 ? (
          <Card>
            <div style={{ textAlign: "center", padding: spacing.xl }}>
              <div style={{ fontSize: "64px", marginBottom: spacing.md }}>📦</div>
              <h2 style={{ fontSize: "20px", marginBottom: spacing.md }}>No Orders Yet</h2>
              <p style={{ color: colors.textSecondary, marginBottom: spacing.lg }}>
                You haven't placed any orders yet
              </p>
              <Link href="/products">
                <Button variant="primary">Start Shopping</Button>
              </Link>
            </div>
          </Card>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: spacing.lg }}>
            {orders.map((order) => (
              <Card key={order.id} clickable>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr 1fr 150px",
                    gap: spacing.lg,
                    alignItems: "center",
                  }}
                >
                  <div>
                    <p style={{ fontSize: "12px", color: colors.textSecondary, marginBottom: spacing.sm }}>
                      Order ID
                    </p>
                    <p style={{ fontSize: "16px", fontWeight: "bold" }}>{order.id}</p>
                  </div>

                  <div>
                    <p style={{ fontSize: "12px", color: colors.textSecondary, marginBottom: spacing.sm }}>
                      Date
                    </p>
                    <p style={{ fontSize: "14px" }}>
                      {new Date(order.date).toLocaleDateString()}
                    </p>
                  </div>

                  <div>
                    <p style={{ fontSize: "12px", color: colors.textSecondary, marginBottom: spacing.sm }}>
                      Total
                    </p>
                    <p style={{ fontSize: "16px", fontWeight: "bold" }}>
                      PKR {order.total.toLocaleString()}
                    </p>
                  </div>

                  <div style={{ textAlign: "right" }}>
                    <div
                      style={{
                        display: "inline-block",
                        padding: `${spacing.sm} ${spacing.md}`,
                        backgroundColor: `${statusColors[order.status]}20`,
                        color: statusColors[order.status],
                        borderRadius: "20px",
                        fontSize: "12px",
                        fontWeight: "bold",
                        textTransform: "capitalize",
                        marginBottom: spacing.sm,
                      }}
                    >
                      {order.status}
                    </div>
                    <p style={{ fontSize: "12px", color: colors.textSecondary }}>
                      {order.items} item{order.items > 1 ? "s" : ""}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
}
