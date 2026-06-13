import React, { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "tertiary";
  fullWidth?: boolean;
}

const variantClassMap: Record<string, string> = {
  primary: "primary-cta",
  secondary: "secondary-cta",
  tertiary: "tertiary-btn",
};

export default function Button({
  variant = "primary",
  fullWidth = false,
  className = "",
  children,
  ...props
}: ButtonProps) {
  const base = variantClassMap[variant] ?? "";
  const width = fullWidth ? " full-width" : "";

  return (
    <button
      className={`${base}${width} ${className}`.trim()}
      type="button"
      {...props}
    >
      {children}
    </button>
  );
}
