import React from "react";
import { cn } from "@/lib/utils";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "subtle" | "ghost";
  interactive?: boolean;
  className?: string;
  children: React.ReactNode;
}

export function Card({
  variant = "default",
  interactive = false,
  className,
  children,
  ...props
}: CardProps) {
  const variantStyles = {
    default: "card-tactile",
    subtle: "bg-[#F8F7F2] border border-[#ECEAE4]",
    ghost: "bg-transparent border border-transparent",
  };

  return (
    <div
      className={cn(
        "rounded-xl p-5 sm:p-6",
        variantStyles[variant],
        interactive && "cursor-pointer active:scale-[0.995]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
