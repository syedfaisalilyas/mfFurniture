import React from "react";
import Link from "next/link";
import { colors } from "@/styles/colors";
import { spacing, containerWidth } from "@/styles/spacing";

const Footer: React.FC = () => {
  return (
    <footer
      style={{
        backgroundColor: colors.primary,
        color: colors.white,
        padding: `${spacing.xxl} 0 ${spacing.lg}`,
        marginTop: spacing.xxl,
      }}
    >
      <div style={{ maxWidth: containerWidth, margin: "0 auto", padding: `0 ${spacing.md}` }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: spacing.xl,
            marginBottom: spacing.xl,
          }}
        >
          {/* About */}
          <div>
            <h3 style={{ fontSize: "16px", fontWeight: "bold", marginBottom: spacing.md }}>
              About Rustic Illusions
            </h3>
            <p style={{ fontSize: "14px", color: "rgba(255, 255, 255, 0.8)", lineHeight: 1.6 }}>
              Premium handcrafted furniture for your home. We bring rustic elegance and timeless style to every space.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 style={{ fontSize: "16px", fontWeight: "bold", marginBottom: spacing.md }}>
              Quick Links
            </h3>
            <ul style={{ listStyle: "none" }}>
              <li style={{ marginBottom: spacing.sm }}>
                <Link
                  href="/products"
                  style={{ color: "rgba(255, 255, 255, 0.8)", fontSize: "14px" }}
                >
                  Shop
                </Link>
              </li>
              <li style={{ marginBottom: spacing.sm }}>
                <Link
                  href="/orders"
                  style={{ color: "rgba(255, 255, 255, 0.8)", fontSize: "14px" }}
                >
                  Orders
                </Link>
              </li>
              <li style={{ marginBottom: spacing.sm }}>
                <Link
                  href="/wishlist"
                  style={{ color: "rgba(255, 255, 255, 0.8)", fontSize: "14px" }}
                >
                  Wishlist
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 style={{ fontSize: "16px", fontWeight: "bold", marginBottom: spacing.md }}>
              Support
            </h3>
            <ul style={{ listStyle: "none" }}>
              <li style={{ marginBottom: spacing.sm }}>
                <a href="mailto:support@mfurniture.com" style={{ color: "rgba(255, 255, 255, 0.8)", fontSize: "14px" }}>
                  Email Support
                </a>
              </li>
              <li style={{ marginBottom: spacing.sm }}>
                <a href="tel:+1234567890" style={{ color: "rgba(255, 255, 255, 0.8)", fontSize: "14px" }}>
                  Phone Support
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 style={{ fontSize: "16px", fontWeight: "bold", marginBottom: spacing.md }}>
              Newsletter
            </h3>
            <p style={{ fontSize: "14px", color: "rgba(255, 255, 255, 0.8)", marginBottom: spacing.md }}>
              Subscribe for updates and special offers
            </p>
            <div style={{ display: "flex", gap: spacing.sm }}>
              <input
                type="email"
                placeholder="Your email"
                style={{
                  flex: 1,
                  padding: `${spacing.sm} ${spacing.md}`,
                  borderRadius: "4px",
                  border: "none",
                  fontSize: "12px",
                }}
              />
              <button
                style={{
                  padding: `${spacing.sm} ${spacing.md}`,
                  backgroundColor: colors.accent,
                  color: colors.white,
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  fontSize: "12px",
                  fontWeight: "bold",
                }}
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div
          style={{
            borderTop: `1px solid rgba(255, 255, 255, 0.2)`,
            paddingTop: spacing.lg,
            textAlign: "center",
            fontSize: "12px",
            color: "rgba(255, 255, 255, 0.6)",
          }}
        >
          <p>© 2024 Rustic Illusions. All rights reserved.</p>
          <div style={{ marginTop: spacing.sm, display: "flex", gap: spacing.md, justifyContent: "center" }}>
            <a href="#" style={{ color: "rgba(255, 255, 255, 0.6)" }}>
              Privacy Policy
            </a>
            <a href="#" style={{ color: "rgba(255, 255, 255, 0.6)" }}>
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
