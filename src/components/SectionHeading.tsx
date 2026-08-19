import React from "react";
import { cn } from "@/lib/utils";
import { Badge, type BadgeVariant } from "./Badge";

export interface SectionHeadingProps {
  eyebrow?: string;
  eyebrowVariant?: BadgeVariant;
  title: string | React.ReactNode;
  description?: string | React.ReactNode;
  align?: "left" | "center" | "right";
  size?: "sm" | "md" | "lg";
  as?: "h1" | "h2" | "h3" | "h4";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  eyebrowVariant = "default",
  title,
  description,
  align = "left",
  size = "md",
  as: HeadingTag = "h2",
  className,
}: SectionHeadingProps) {
  const alignClasses = {
    left: "text-left items-start",
    center: "text-center items-center mx-auto",
    right: "text-right items-end ml-auto",
  };

  const titleSizes = {
    sm: "text-xl sm:text-2xl font-semibold tracking-tight text-[#111315]",
    md: "text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-[-0.025em] text-[#111315] leading-[1.18]",
    lg: "text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-[-0.03em] text-[#111315] leading-[1.12]",
  };

  const descriptionSizes = {
    sm: "text-xs sm:text-sm text-[#575A65] leading-relaxed max-w-xl",
    md: "text-sm sm:text-base text-[#575A65] leading-relaxed max-w-2xl",
    lg: "text-base sm:text-lg text-[#575A65] leading-relaxed max-w-3xl",
  };

  return (
    <div
      className={cn(
        "flex flex-col gap-3",
        alignClasses[align],
        className
      )}
    >
      {eyebrow && (
        <Badge variant={eyebrowVariant} dot>
          {eyebrow}
        </Badge>
      )}

      <HeadingTag className={titleSizes[size]}>{title}</HeadingTag>

      {description && (
        <p className={descriptionSizes[size]}>{description}</p>
      )}
    </div>
  );
}
