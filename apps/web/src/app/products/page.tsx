"use client";

import React, { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import Card from "@/components/common/Card";
import Button from "@/components/common/Button";
import { colors } from "@/styles/colors";
import { spacing, containerWidth } from "@/styles/spacing";
import { useProducts, useAuth, useCart } from "@/lib/hooks";

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const { products, loading } = useProducts();
  const { user, logout } = useAuth();
  const { addItem, count: cartCount } = useCart();

  const categories = ["all", "living", "dining", "bedroom", "office"];

  const filteredProducts =
    selectedCategory === "all"
      ? products
      : products.filter((p) => p.category === selectedCategory);

  return (
    <MainLayout cartCount={cartCount} userEmail={user?.email} onLogout={logout}>
      <div style={{ maxWidth: containerWidth, margin: "0 auto", padding: spacing.lg }}>
        <h1 style={{ fontSize: "32px", marginBottom: spacing.xl }}>Our Products</h1>
        {loading && <p style={{ textAlign: "center", color: colors.textSecondary }}>Loading products...</p>}

        {/* Category Filter */}
        <div style={{ marginBottom: spacing.xl }}>
          <h3 style={{ fontSize: "16px", marginBottom: spacing.md, fontWeight: "bold" }}>
            Categories
          </h3>
          <div style={{ display: "flex", gap: spacing.md, flexWrap: "wrap" }}>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                style={{
                  padding: `${spacing.sm} ${spacing.lg}`,
                  border: `2px solid ${
                    selectedCategory === cat ? colors.accent : colors.border
                  }`,
                  backgroundColor: selectedCategory === cat ? colors.accent : "transparent",
                  color:
                    selectedCategory === cat ? colors.white : colors.textPrimary,
                  borderRadius: "20px",
                  cursor: "pointer",
                  fontSize: "14px",
                  fontWeight: "500",
                  transition: "all 0.2s ease",
                  textTransform: "capitalize",
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
            gap: spacing.lg,
          }}
        >
          {filteredProducts.map((product) => (
            <Card key={product.id}>
              <div
                style={{
                  height: "200px",
                  backgroundColor: colors.background,
                  borderRadius: "6px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "64px",
                  marginBottom: spacing.md,
                }}
              >
                🛋️
              </div>
              <h3
                style={{
                  fontSize: "16px",
                  marginBottom: spacing.sm,
                  fontWeight: "bold",
                }}
              >
                {product.name}
              </h3>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: spacing.md,
                }}
              >
                <p style={{ fontSize: "16px", color: colors.accent, fontWeight: "bold" }}>
                  PKR {product.price.toLocaleString()}
                </p>
                <span style={{ fontSize: "12px", color: colors.textSecondary }}>
                  ⭐ {product.rating}
                </span>
              </div>
              <Button
                variant="primary"
                fullWidth
                size="md"
                onClick={() =>
                  addItem({
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    quantity: 1,
                  })
                }
              >
                Add to Cart
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </MainLayout>
  );
}
