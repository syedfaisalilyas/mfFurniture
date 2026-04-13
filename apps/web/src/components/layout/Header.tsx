"use client";

import React, { useState } from "react";
import Link from "next/link";
import { colors } from "@/styles/colors";
import { spacing, containerWidth } from "@/styles/spacing";
import Button from "@/components/common/Button";

interface HeaderProps {
  cartCount?: number;
  userEmail?: string;
  onLogout?: () => void;
}

const Header: React.FC<HeaderProps> = ({ cartCount = 0, userEmail, onLogout }) => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <header
      style={{
        backgroundColor: colors.primary,
        color: colors.white,
        padding: `${spacing.md} 0`,
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
        position: "sticky",
        top: 0,
        zIndex: 1000,
      }}
    >
      <div style={{ maxWidth: containerWidth, margin: "0 auto", padding: `0 ${spacing.md}` }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {/* Logo */}
          <Link href="/" style={{ fontSize: "24px", fontWeight: "bold", color: colors.white }}>
            Rustic Illusions
          </Link>

          {/* Desktop Navigation */}
          <nav style={{ display: "none", gap: spacing.lg }} className="desktop-nav">
            <Link href="/products" style={{ color: colors.white, fontSize: "14px" }}>
              Products
            </Link>
            <Link href="/orders" style={{ color: colors.white, fontSize: "14px" }}>
              Orders
            </Link>
            <Link href="/wishlist" style={{ color: colors.white, fontSize: "14px" }}>
              Wishlist
            </Link>
          </nav>

          {/* Right Actions */}
          <div style={{ display: "flex", gap: spacing.md, alignItems: "center" }}>
            {/* Cart Button */}
            <Link
              href="/cart"
              style={{
                position: "relative",
                color: colors.white,
                fontSize: "18px",
              }}
            >
              🛒
              {cartCount > 0 && (
                <span
                  style={{
                    position: "absolute",
                    top: "-8px",
                    right: "-8px",
                    backgroundColor: colors.accent,
                    color: colors.white,
                    borderRadius: "50%",
                    width: "20px",
                    height: "20px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "10px",
                    fontWeight: "bold",
                  }}
                >
                  {cartCount}
                </span>
              )}
            </Link>

            {/* User Menu */}
            {userEmail ? (
              <div style={{ position: "relative" }}>
                <button
                  onClick={() => setShowMenu(!showMenu)}
                  style={{
                    backgroundColor: "transparent",
                    color: colors.white,
                    border: "none",
                    cursor: "pointer",
                    fontSize: "14px",
                    padding: `${spacing.sm} ${spacing.md}`,
                    borderRadius: "4px",
                    transition: "background-color 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.1)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "transparent";
                  }}
                >
                  {userEmail}
                </button>

                {showMenu && (
                  <div
                    style={{
                      position: "absolute",
                      top: "100%",
                      right: 0,
                      backgroundColor: colors.surface,
                      color: colors.textPrimary,
                      borderRadius: "6px",
                      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
                      minWidth: "150px",
                      marginTop: spacing.sm,
                      zIndex: 1001,
                    }}
                  >
                    <Link
                      href="/profile"
                      style={{
                        display: "block",
                        padding: `${spacing.md} ${spacing.lg}`,
                        color: colors.textPrimary,
                        borderBottom: `1px solid ${colors.border}`,
                        fontSize: "14px",
                      }}
                    >
                      Profile
                    </Link>
                    <button
                      onClick={() => {
                        setShowMenu(false);
                        onLogout?.();
                      }}
                      style={{
                        width: "100%",
                        padding: `${spacing.md} ${spacing.lg}`,
                        textAlign: "left",
                        backgroundColor: "transparent",
                        border: "none",
                        color: colors.error,
                        cursor: "pointer",
                        fontSize: "14px",
                      }}
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div style={{ display: "flex", gap: spacing.sm }}>
                <Link href="/login">
                  <Button variant="outline" size="sm">
                    Login
                  </Button>
                </Link>
                <Link href="/register">
                  <Button variant="secondary" size="sm">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav {
            display: none !important;
          }
        }
        @media (min-width: 768px) {
          .desktop-nav {
            display: flex !important;
          }
        }
      `}</style>
    </header>
  );
};

export default Header;
