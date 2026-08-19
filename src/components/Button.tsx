import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "brand"
  | "outline"
  | "ghost"
  | "subtle";

export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  external?: boolean;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "btn-primary-tactile border border-transparent active:bg-[#000000]",
  secondary:
    "btn-secondary-tactile active:bg-[#EFECE4]",
  brand:
    "btn-brand-tactile border border-transparent active:bg-[#063D99]",
  outline:
    "bg-transparent text-[#111315] hover:bg-[#F3F2EC] active:bg-[#EAE8E0] border border-[#E2E0D8]",
  ghost:
    "bg-transparent text-[#575A65] hover:text-[#111315] hover:bg-[#F3F2EC]/70 active:bg-[#EAE8E0] border border-transparent",
  subtle:
    "bg-[#EEF4FD] text-[#0B63E5] hover:bg-[#E2EDFD] active:bg-[#D4E4FC] border border-[#C6DBFA]/70",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "h-8 px-3 text-xs font-medium gap-1.5 rounded-md",
  md: "h-9.5 px-3.5 sm:px-4 text-sm font-medium gap-2 rounded-lg",
  lg: "h-11 px-5 text-sm font-medium gap-2.5 rounded-lg",
};

export const Button = React.forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  ButtonProps
>(function Button(
  {
    variant = "primary",
    size = "md",
    href,
    external = false,
    isLoading = false,
    leftIcon,
    rightIcon,
    className,
    disabled,
    children,
    ...props
  },
  ref
) {
  const baseStyles =
    "inline-flex items-center justify-center font-sans tracking-[-0.01em] transition-all duration-120 ease-out select-none cursor-pointer active:scale-[0.985] disabled:opacity-40 disabled:cursor-not-allowed disabled:pointer-events-none disabled:active:scale-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B63E5] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FAF9F5]";

  const combinedClassName = cn(
    baseStyles,
    variantStyles[variant],
    sizeStyles[size],
    className
  );

  const content = (
    <>
      {isLoading ? (
        <Loader2 className="h-3.5 w-3.5 animate-spin shrink-0 text-current" />
      ) : (
        leftIcon && <span className="shrink-0 flex items-center justify-center">{leftIcon}</span>
      )}
      <span className="truncate">{children}</span>
      {!isLoading && rightIcon && (
        <span className="shrink-0 flex items-center justify-center">{rightIcon}</span>
      )}
    </>
  );

  if (href) {
    if (external) {
      return (
        <a
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={combinedClassName}
          {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
        >
          {content}
        </a>
      );
    }

    return (
      <Link
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={href}
        className={combinedClassName}
        {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      ref={ref as React.Ref<HTMLButtonElement>}
      type="button"
      disabled={disabled || isLoading}
      className={combinedClassName}
      {...props}
    >
      {content}
    </button>
  );
});
