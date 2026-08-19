"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import {
  Webhook,
  Code2,
  Send,
  GitBranch,
  CheckCircle2,
  CircleDot,
  Clock,
  Sparkles,
} from "lucide-react";

export type NodeType = "trigger" | "transform" | "action" | "condition";
export type NodeStatus = "idle" | "active" | "success" | "queued";

export interface WorkflowNodeProps {
  type: NodeType;
  title: string;
  subtitle: string;
  status?: NodeStatus;
  latency?: string;
  codeSnippet?: string;
  className?: string;
  onClick?: () => void;
  selected?: boolean;
}

const nodeTypeConfig: Record<
  NodeType,
  { label: string; icon: React.ElementType; badgeBg: string; badgeColor: string }
> = {
  trigger: {
    label: "Trigger",
    icon: Webhook,
    badgeBg: "bg-[#EEF4FD]",
    badgeColor: "text-[#0B63E5] border-[#C6DBFA]",
  },
  transform: {
    label: "Transform",
    icon: Code2,
    badgeBg: "bg-[#F3F2EC]",
    badgeColor: "text-[#575A65] border-[#E2E0D8]",
  },
  action: {
    label: "Action",
    icon: Send,
    badgeBg: "bg-[#F0FDF4]",
    badgeColor: "text-[#15803D] border-[#BBF7D0]",
  },
  condition: {
    label: "Router",
    icon: GitBranch,
    badgeBg: "bg-[#FFF7ED]",
    badgeColor: "text-[#C2410C] border-[#FED7AA]",
  },
};

export function WorkflowNode({
  type,
  title,
  subtitle,
  status = "idle",
  latency,
  codeSnippet,
  className,
  onClick,
  selected = false,
}: WorkflowNodeProps) {
  const config = nodeTypeConfig[type];
  const Icon = config.icon;

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick?.();
        }
      }}
      className={cn(
        "group relative rounded-xl bg-[#FFFFFF] border p-4 transition-all duration-150 text-left outline-none cursor-pointer select-none",
        selected
          ? "border-[#0B63E5] ring-2 ring-[#0B63E5]/20 shadow-[0_4px_16px_rgba(11,99,229,0.08)]"
          : "border-[#ECEAE4] hover:border-[#D8D5CB] shadow-[0_1px_3px_rgba(17,19,21,0.03)] hover:shadow-[0_4px_12px_-2px_rgba(17,19,21,0.05)]",
        "focus-visible:ring-2 focus-visible:ring-[#0B63E5] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FAF9F5]",
        className
      )}
    >
      {/* Visual Input Port (Top Connection Dot) */}
      <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-[#FAF9F5] border-2 border-[#D8D5CB] group-hover:border-[#0B63E5] transition-colors" />

      {/* Header Row */}
      <div className="flex items-center justify-between gap-3 mb-2.5">
        <div className="flex items-center gap-2">
          <div
            className={cn(
              "w-6 h-6 rounded-md flex items-center justify-center border",
              config.badgeBg,
              config.badgeColor
            )}
          >
            <Icon className="w-3.5 h-3.5" />
          </div>
          <span className="text-[11px] font-mono font-medium uppercase tracking-wider text-[#858997]">
            {config.label}
          </span>
        </div>

        {/* Latency / Execution Telemetry */}
        {latency && (
          <div className="flex items-center gap-1 text-[11px] font-mono text-[#858997] bg-[#FAF9F5] px-1.5 py-0.5 rounded border border-[#ECEAE4]">
            <Clock className="w-2.5 h-2.5" />
            <span>{latency}</span>
          </div>
        )}
      </div>

      {/* Title & Description */}
      <div className="space-y-1">
        <h4 className="text-sm font-semibold text-[#111315] tracking-tight group-hover:text-[#0B63E5] transition-colors">
          {title}
        </h4>
        <p className="text-xs text-[#575A65] line-clamp-2 leading-relaxed">
          {subtitle}
        </p>
      </div>

      {/* Code Snippet / Config Preview if present */}
      {codeSnippet && (
        <div className="mt-3 p-2 rounded-md bg-[#FAF9F5] border border-[#ECEAE4] font-mono text-[11px] text-[#575A65] overflow-x-auto">
          <code>{codeSnippet}</code>
        </div>
      )}

      {/* Visual Output Port (Bottom Connection Dot) */}
      <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-[#FAF9F5] border-2 border-[#D8D5CB] group-hover:border-[#0B63E5] transition-colors" />
    </div>
  );
}
