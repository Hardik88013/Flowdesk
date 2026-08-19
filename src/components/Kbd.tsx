import React from "react";
import { cn } from "@/lib/utils";

export interface KbdProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  className?: string;
}

export function Kbd({ children, className, ...props }: KbdProps) {
  return (
    <kbd
      className={cn(
        "inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 text-[11px] font-mono font-medium text-[#575A65] bg-[#FAF9F5] border border-[#D8D6CD] rounded shadow-[0_1px_0_0_#D8D6CD,inset_0_1px_0_0_#FFFFFF] select-none",
        className
      )}
      {...props}
    >
      {children}
    </kbd>
  );
}
