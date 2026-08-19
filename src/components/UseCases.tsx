"use client";

import React from "react";
import { Container } from "./Container";
import { Badge } from "./Badge";
import { cn } from "@/lib/utils";
import {
  UserCheck,
  FileText,
  Bell,
  RefreshCw,
  ArrowUpRight,
} from "lucide-react";

interface UseCaseItem {
  id: string;
  icon: React.ElementType;
  title: string;
  description: string;
  tag: string;
}

const useCases: UseCaseItem[] = [
  {
    id: "lead-mgmt",
    icon: UserCheck,
    title: "Lead management",
    description:
      "Route, qualify, and assign inbound prospects to the right team members instantly without manual triage or missed handoffs.",
    tag: "Revenue Ops",
  },
  {
    id: "doc-proc",
    icon: FileText,
    title: "Document processing",
    description:
      "Extract structured data from invoices, contracts, and receipts, validate schemas, and update downstream records automatically.",
    tag: "Finance & Legal",
  },
  {
    id: "team-notifs",
    icon: Bell,
    title: "Team notifications",
    description:
      "Filter high-signal operational events and broadcast context-rich briefings to Slack, Discord, or email where decisions happen.",
    tag: "Internal Comms",
  },
  {
    id: "data-sync",
    icon: RefreshCw,
    title: "Data synchronization",
    description:
      "Keep internal databases, CRMs, and billing platforms continuously in sync with deterministic conflict resolution and zero data loss.",
    tag: "Infrastructure",
  },
];

export function UseCases() {
  return (
    <section
      id="use-cases"
      className="py-16 sm:py-24 border-t border-[#ECEAE4] bg-[#FAF9F5]/40 scroll-mt-16 overflow-hidden"
    >
      <Container size="default">
        {/* Section Header */}
        <div className="max-w-2xl mb-12 sm:mb-16 space-y-4">
          <Badge variant="default" dot>
            Applications
          </Badge>

          <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-semibold tracking-[-0.03em] text-[#111315] leading-[1.15]">
            Automate the work between the work.
          </h2>

          <p className="text-base sm:text-lg text-[#575A65] leading-relaxed">
            Eliminate the repetitive manual glue tasks that slow down
            operations, revenue, and engineering teams every day.
          </p>
        </div>

        {/* Refined Editorial Grid (2x2 on Desktop, 1-Col on Mobile) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
          {useCases.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className="group relative p-6 sm:p-7 rounded-xl bg-white border border-[#ECEAE4] hover:border-[#D8D5CB] hover:bg-[#F8F7F2]/40 transition-all duration-150 shadow-[0_1px_2px_rgba(17,19,21,0.02)] hover:shadow-[0_4px_12px_-2px_rgba(17,19,21,0.04)] flex flex-col justify-between space-y-4 text-left"
              >
                <div className="space-y-3.5">
                  {/* Icon & Category Tag */}
                  <div className="flex items-center justify-between">
                    <div className="w-8 h-8 rounded-lg bg-[#FAF9F5] group-hover:bg-white text-[#111315] border border-[#ECEAE4] group-hover:border-[#D8D5CB] flex items-center justify-center transition-all duration-150 group-hover:text-[#0B63E5]">
                      <Icon className="w-4 h-4 transition-transform duration-150 group-hover:scale-105" />
                    </div>

                    <span className="text-[11px] font-mono text-[#858997] bg-[#FAF9F5] px-2 py-0.5 rounded border border-[#ECEAE4]">
                      {item.tag}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <div className="space-y-1.5">
                    <h3 className="text-base sm:text-lg font-semibold tracking-tight text-[#111315] flex items-center justify-between group-hover:text-[#0B63E5] transition-colors">
                      <span>{item.title}</span>
                      <ArrowUpRight className="w-4 h-4 text-[#C8C6BC] group-hover:text-[#0B63E5] transition-all duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 opacity-0 group-hover:opacity-100" />
                    </h3>

                    <p className="text-xs sm:text-sm text-[#575A65] leading-relaxed font-normal">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
