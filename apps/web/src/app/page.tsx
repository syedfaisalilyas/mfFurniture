"use client";

import Link from "next/link";
import Button from "@/components/common/Button";
import Card from "@/components/common/Card";
import MainLayout from "@/components/layout/MainLayout";
import { colors } from "@/styles/colors";
import { spacing, containerWidth } from "@/styles/spacing";
import { useProducts, useAuth, useCart } from "@/lib/hooks";

export default function Home() {
  const { products } = useProducts();
  const { user, logout } = useAuth();
  const { count: cartCount } = useCart();

  const featuredProducts = products.slice(0, 4).map((p) => ({
    id: p.id,
    name: p.name,
    price: `PKR ${p.price.toLocaleString()}`,
    image: "🛋️",
  }));

  return (
    <MainLayout
      cartCount={cartCount}
      userEmail={user?.email}
      onLogout={logout}
    >
      {/* Hero Section */}
      <section
        style={{
          backgroundColor: colors.primary,
          color: colors.white,
          padding: `${spacing.xxl} ${spacing.md}`,
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: containerWidth, margin: "0 auto" }}>
          <h1 style={{ fontSize: "48px", marginBottom: spacing.lg, fontWeight: "bold" }}>
            Welcome to Rustic Illusions
          </h1>
          <p
            style={{
              fontSize: "18px",
              marginBottom: spacing.xl,
              color: "rgba(255, 255, 255, 0.9)",
            }}
          >
            Handcrafted furniture that brings rustic elegance to your home
          </p>
          <Link href="/products">
            <Button variant="secondary" size="lg">
              Shop Now
            </Button>
          </Link>
        </div>
      </section>

      {/* Categories Section */}
      <section style={{ padding: `${spacing.xxl} ${spacing.md}` }}>
        <div style={{ maxWidth: containerWidth, margin: "0 auto" }}>
          <h2 style={{ fontSize: "32px", marginBottom: spacing.xl, textAlign: "center" }}>
            Featured Products
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: spacing.lg,
            }}
          >
            {featuredProducts.map((product) => (
              <Card key={product.id} clickable>
                <div style={{ textAlign: "center" }}>
                  <div
                    style={{
                      fontSize: "64px",
                      marginBottom: spacing.md,
                    }}
                  >
                    {product.image}
                  </div>
                  <h3 style={{ fontSize: "18px", marginBottom: spacing.sm, fontWeight: "bold" }}>
                    {product.name}
                  </h3>
                  <p
                    style={{
                      fontSize: "16px",
                      color: colors.accent,
                      fontWeight: "bold",
                      marginBottom: spacing.md,
                    }}
                  >
                    {product.price}
                  </p>
                  <Button variant="primary" size="md" fullWidth>
                    Add to Cart
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section
        style={{
          backgroundColor: colors.surface,
          padding: `${spacing.xxl} ${spacing.md}`,
          borderTop: `1px solid ${colors.border}`,
        }}
      >
        <div style={{ maxWidth: containerWidth, margin: "0 auto" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: spacing.xl,
            }}
          >
            {[
              { icon: "🚚", title: "Fast Delivery", desc: "Quick shipping across Pakistan" },
              { icon: "✅", title: "Quality Assured", desc: "Premium furniture with warranty" },
              { icon: "💳", title: "Easy Payment", desc: "Multiple payment options" },
              { icon: "🔒", title: "Secure", desc: "100% secure transactions" },
            ].map((feature, idx) => (
              <div key={idx} style={{ textAlign: "center" }}>
                <div style={{ fontSize: "48px", marginBottom: spacing.md }}>
                  {feature.icon}
                </div>
                <h3 style={{ fontSize: "18px", marginBottom: spacing.sm, fontWeight: "bold" }}>
                  {feature.title}
                </h3>
                <p style={{ fontSize: "14px", color: colors.textSecondary }}>
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
