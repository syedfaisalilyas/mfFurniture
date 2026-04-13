import React from "react";
import { colors } from "@/styles/colors";
import { spacing } from "@/styles/spacing";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "danger";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      fullWidth = false,
      loading = false,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const variantStyles = {
      primary: {
        backgroundColor: colors.primary,
        color: colors.white,
      },
      secondary: {
        backgroundColor: colors.accent,
        color: colors.white,
      },
      outline: {
        backgroundColor: "transparent",
        color: colors.primary,
        border: `2px solid ${colors.primary}`,
      },
      danger: {
        backgroundColor: colors.error,
        color: colors.white,
      },
    };

    const sizeStyles = {
      sm: {
        padding: `${spacing.sm} ${spacing.md}`,
        fontSize: "12px",
      },
      md: {
        padding: `${spacing.md} ${spacing.lg}`,
        fontSize: "14px",
      },
      lg: {
        padding: `${spacing.lg} ${spacing.xl}`,
        fontSize: "16px",
      },
    };

    const style = {
      ...variantStyles[variant],
      ...sizeStyles[size],
      width: fullWidth ? "100%" : "auto",
      borderRadius: "6px",
      fontWeight: 500,
      transition: "all 0.2s ease",
      opacity: disabled || loading ? 0.6 : 1,
      cursor: disabled || loading ? "not-allowed" : "pointer",
    } as React.CSSProperties;

    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        style={style}
        onMouseEnter={(e) => {
          if (!disabled && !loading) {
            e.currentTarget.style.opacity = "0.9";
            e.currentTarget.style.transform = "translateY(-1px)";
          }
        }}
        onMouseLeave={(e) => {
          if (!disabled && !loading) {
            e.currentTarget.style.opacity = "1";
            e.currentTarget.style.transform = "translateY(0)";
          }
        }}
        {...props}
      >
        {loading ? "Loading..." : children}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
