import React from "react";
import { colors } from "@/styles/colors";
import { spacing } from "@/styles/spacing";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  clickable?: boolean;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ children, clickable, style, ...props }, ref) => (
    <div
      ref={ref}
      style={{
        backgroundColor: colors.surface,
        borderRadius: "8px",
        padding: spacing.lg,
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
        transition: "all 0.2s ease",
        cursor: clickable ? "pointer" : "default",
        ...style,
      }}
      onMouseEnter={(e) => {
        if (clickable) {
          e.currentTarget.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.15)";
          e.currentTarget.style.transform = "translateY(-2px)";
        }
      }}
      onMouseLeave={(e) => {
        if (clickable) {
          e.currentTarget.style.boxShadow = "0 2px 8px rgba(0, 0, 0, 0.1)";
          e.currentTarget.style.transform = "translateY(0)";
        }
      }}
      {...props}
    >
      {children}
    </div>
  )
);

Card.displayName = "Card";

export default Card;
