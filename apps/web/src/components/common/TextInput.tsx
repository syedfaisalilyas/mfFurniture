import React from "react";
import { colors } from "@/styles/colors";
import { spacing } from "@/styles/spacing";

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helpText?: string;
}

const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(
  ({ label, error, helpText, ...props }, ref) => {
    return (
      <div style={{ marginBottom: spacing.md }}>
        {label && (
          <label
            style={{
              display: "block",
              marginBottom: spacing.sm,
              fontSize: "14px",
              fontWeight: 500,
              color: colors.textPrimary,
            }}
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          style={{
            width: "100%",
            padding: `${spacing.md} ${spacing.md}`,
            fontSize: "14px",
            border: `1px solid ${error ? colors.error : colors.border}`,
            borderRadius: "6px",
            backgroundColor: colors.white,
            color: colors.textPrimary,
            transition: "border-color 0.2s ease, box-shadow 0.2s ease",
            boxShadow: error ? `0 0 0 3px ${colors.error}20` : "none",
          }}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = colors.primary;
            e.currentTarget.style.boxShadow = `0 0 0 3px ${colors.primary}20`;
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = error ? colors.error : colors.border;
            e.currentTarget.style.boxShadow = error
              ? `0 0 0 3px ${colors.error}20`
              : "none";
          }}
          {...props}
        />
        {error && (
          <p
            style={{
              marginTop: spacing.sm,
              fontSize: "12px",
              color: colors.error,
            }}
          >
            {error}
          </p>
        )}
        {helpText && !error && (
          <p
            style={{
              marginTop: spacing.sm,
              fontSize: "12px",
              color: colors.textSecondary,
            }}
          >
            {helpText}
          </p>
        )}
      </div>
    );
  }
);

TextInput.displayName = "TextInput";

export default TextInput;
