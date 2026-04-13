"use client";

import React from "react";
import { colors } from "@/styles/colors";
import Header from "./Header";
import Footer from "./Footer";

interface MainLayoutProps {
  children: React.ReactNode;
  cartCount?: number;
  userEmail?: string;
  onLogout?: () => void;
}

const MainLayout: React.FC<MainLayoutProps> = ({
  children,
  cartCount,
  userEmail,
  onLogout,
}) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        backgroundColor: colors.background,
      }}
    >
      <Header cartCount={cartCount} userEmail={userEmail} onLogout={onLogout} />

      <main style={{ flex: 1 }}>
        {children}
      </main>

      <Footer />
    </div>
  );
};

export default MainLayout;
