import React from "react";
import { cn } from "@/lib/utils";

export type BadgeVariant = "default" | "brand" | "success" | "neutral" | "outline";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  dot?: boolean;
  className?: string;
  children: React.ReactNode;
}

const variantStyles: Record<BadgeVariant, string> = {
  default:
    "bg-[#F3F2EC] text-[#575A65] border-[#E2E0D8]",
  brand:
    "bg-[#EEF4FD] text-[#0B63E5] border-[#C6DBFA]",
  success:
    "bg-[#F0FDF4] text-[#15803D] border-[#BBF7D0]",
  neutral:
    "bg-[#111315] text-[#FAF9F5] border-[#111315]",
  outline:
    "bg-transparent text-[#575A65] border-[#E2E0D8]",
};

const dotColors: Record<BadgeVariant, string> = {
  default: "bg-[#858997]",
  brand: "bg-[#0B63E5]",
  success: "bg-[#16A34A]",
  neutral: "bg-[#FAF9F5]",
  outline: "bg-[#858997]",
};

export function Badge({
  variant = "default",
  dot = false,
  className,
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-xs font-mono font-medium tracking-wide uppercase border",
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {dot && (
        <span
          className={cn("w-1.5 h-1.5 rounded-full shrink-0", dotColors[variant])}
        />
      )}
      {children}
    </span>
  );
}
