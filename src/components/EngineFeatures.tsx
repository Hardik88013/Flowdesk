"use client";

import React, { useState } from "react";
import { Container } from "./Container";
import { SectionHeading } from "./SectionHeading";
import { Badge } from "./Badge";
import { Card } from "./Card";
import { Button } from "./Button";
import { cn } from "@/lib/utils";
import {
  GitFork,
  Code2,
  History,
  ShieldAlert,
  CheckCircle2,
  Lock,
  Globe2,
  GitBranch,
  ArrowRight,
  Terminal,
  Layers,
  Cpu,
  RefreshCw,
} from "lucide-react";

interface FeatureTab {
  id: string;
  title: string;
  badge: string;
  description: string;
  bullets: string[];
  codePreview: string;
  codeLanguage: string;
}

const featureTabs: FeatureTab[] = [
  {
    id: "orchestration",
    title: "Visual DAG Orchestration",
    badge: "Runtime",
    description:
      "Design branching logic, parallel fan-outs, and conditional gateways on an infinite visual canvas. Every node maps 1:1 to deterministic AST representations.",
    bullets: [
      "Parallel branch fan-out with join barrier synchronization",
      "Dynamic conditional routing with visual boolean expressions",
      "Sub-workflow nesting for reusable modular subroutines",
    ],
    codeLanguage: "typescript",
    codePreview: `const pipeline = defineWorkflow("order_fulfillment", {
  trigger: events.on("order.created"),
  steps: [
    parallel([
      steps.chargeCard({ amount: $.trigger.total }),
      steps.reserveInventory({ sku: $.trigger.sku }),
    ]),
    branch({
      if: (res) => res.charge.status === "success",
      then: steps.dispatchOrder(),
      else: steps.triggerFraudReview(),
    }),
  ],
});`,
  },
  {
    id: "typesafety",
    title: "Type-Safe Schemas & Contracts",
    badge: "Developer Experience",
    description:
      "Never pass untyped payloads. Flowdesk validates inputs and outputs across all connected steps with end-to-end Zod and TypeScript contracts.",
    bullets: [
      "Full autocomplete for upstream node payloads",
      "Automated runtime Zod parsing and failure isolation",
      "Versioned API contracts preventing breaking step mutations",
    ],
    codeLanguage: "typescript",
    codePreview: `import { z } from "zod";

export const UserPayloadSchema = z.object({
  userId: z.string().uuid(),
  tier: z.enum(["starter", "growth", "enterprise"]),
  email: z.string().email(),
  features: z.array(z.string()),
});

export type UserPayload = z.infer<typeof UserPayloadSchema>;`,
  },
  {
    id: "observability",
    title: "Time-Travel Replay & Tracing",
    badge: "Observability",
    description:
      "Inspect execution state at any discrete millisecond. Replay failed production workflows with identical state payloads in your local sandbox.",
    bullets: [
      "Step-by-step state snapshot recording with zero overhead",
      "One-click 'Replay in Sandbox' with sanitized customer data",
      "OpenTelemetry native exporter for Datadog, Grafana, and Honeycomb",
    ],
    codeLanguage: "bash",
    codePreview: `# Replay a production run locally with trace-id
$ flowdesk trace replay trc_89bf2e9 --mode=dry-run

[00:00:00.012] Trigger: Webhook Ingest [OK]
[00:00:00.024] Step 1: Calculate Quota [OK]
[00:00:00.048] Step 2: Database Provision [FAILED - Socket Timeout]
[00:00:00.052] Snapshot captured at memory offset 0x4f1b`,
  },
  {
    id: "reliability",
    title: "Enterprise Fault Tolerance",
    badge: "Reliability",
    description:
      "Third-party APIs fail. Flowdesk guarantees zero data loss with exponential backoff retries, idempotency key caches, and dead-letter queues.",
    bullets: [
      "Configurable exponential backoff with jitter up to 72 hours",
      "Automatic idempotency key assignment across all HTTP steps",
      "Dead-letter queues with automated Slack/PagerDuty escalation",
    ],
    codeLanguage: "typescript",
    codePreview: `export const resiliencePolicy = {
  retry: {
    maxAttempts: 5,
    backoff: "exponential",
    initialDelayMs: 200,
    maxDelayMs: 60000,
    jitter: true,
  },
  idempotency: {
    key: (ctx) => \`charge_\${ctx.orderId}_\${ctx.attempt}\`,
    ttlSeconds: 86400,
  },
};`,
  },
];

export function EngineFeatures() {
  const [activeTabId, setActiveTabId] = useState<string>("orchestration");
  const activeTab =
    featureTabs.find((t) => t.id === activeTabId) || featureTabs[0];

  return (
    <section id="product" className="py-16 sm:py-24 border-t border-[#ECEAE4] bg-[#FAF9F5]/40 scroll-mt-16">
      <Container size="default">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <SectionHeading
            eyebrow="Engine Architecture"
            eyebrowVariant="brand"
            size="lg"
            title="Deterministic by design. Built for high-velocity systems."
            description="Unlike legacy automation tools that break silently, Flowdesk executes workflows as strict, reproducible directed acyclic graphs with full type safety and sub-millisecond overhead."
          />
        </div>

        {/* Interactive Tabbed Engine Viewer */}
        <div className="rounded-2xl bg-white border border-[#ECEAE4] shadow-[0_2px_12px_rgba(17,19,21,0.04)] overflow-hidden">
          {/* Tab Navigation Strip */}
          <div className="flex border-b border-[#ECEAE4] bg-[#FAF9F5]/80 overflow-x-auto no-scrollbar">
            {featureTabs.map((tab) => {
              const isActive = activeTab.id === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTabId(tab.id)}
                  className={cn(
                    "flex items-center gap-2 px-5 py-3.5 text-xs sm:text-sm font-medium border-r border-[#ECEAE4] whitespace-nowrap transition-colors select-none focus-visible:outline-none focus-visible:bg-white",
                    isActive
                      ? "bg-white text-[#111315] border-b-2 border-b-[#0B63E5] shadow-sm"
                      : "text-[#575A65] hover:text-[#111315] hover:bg-[#F3F2EC]/60"
                  )}
                >
                  <span
                    className={cn(
                      "w-1.5 h-1.5 rounded-full",
                      isActive ? "bg-[#0B63E5]" : "bg-[#C8C6BC]"
                    )}
                  />
                  <span>{tab.title}</span>
                </button>
              );
            })}
          </div>

          {/* Active Tab Panel Body */}
          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[420px]">
            {/* Left Column: Description & Feature Bullets */}
            <div className="lg:col-span-6 p-6 sm:p-8 lg:p-10 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-[#ECEAE4]">
              <div className="space-y-6">
                <div className="flex items-center gap-2.5">
                  <Badge variant="brand">{activeTab.badge}</Badge>
                  <h3 className="text-xl sm:text-2xl font-semibold tracking-tight text-[#111315]">
                    {activeTab.title}
                  </h3>
                </div>

                <p className="text-sm sm:text-base text-[#575A65] leading-relaxed">
                  {activeTab.description}
                </p>

                <div className="space-y-3 pt-2">
                  {activeTab.bullets.map((bullet, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#111315]">
                      <CheckCircle2 className="w-4 h-4 text-[#15803D] shrink-0 mt-0.5" />
                      <span>{bullet}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-8 mt-6 border-t border-[#ECEAE4] flex items-center justify-between text-xs font-mono text-[#858997]">
                <span>AST Parser: Verified</span>
                <span>Zero Cold Start</span>
              </div>
            </div>

            {/* Right Column: High-Fidelity Code Engine Preview */}
            <div className="lg:col-span-6 p-5 sm:p-7 bg-[#FAF9F5]/60 flex flex-col justify-between font-mono">
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-[#858997] pb-2 border-b border-[#ECEAE4]">
                  <span className="flex items-center gap-1.5">
                    <Terminal className="w-3.5 h-3.5 text-[#0B63E5]" />
                    <span>runtime_spec.{activeTab.codeLanguage}</span>
                  </span>
                  <span>Read-only</span>
                </div>

                <div className="p-4 rounded-xl bg-white border border-[#ECEAE4] shadow-sm overflow-x-auto text-xs text-[#111315] leading-relaxed">
                  <pre>
                    <code>{activeTab.codePreview}</code>
                  </pre>
                </div>
              </div>

              <div className="mt-4 pt-3 flex items-center justify-between text-xs text-[#858997]">
                <span>Typecheck: Passed (0ms)</span>
                <span>Status: 200 OK</span>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Architectural Micro-Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
          <Card variant="default" className="space-y-3">
            <div className="w-8 h-8 rounded-lg bg-[#EEF4FD] text-[#0B63E5] flex items-center justify-center border border-[#C6DBFA]/70">
              <GitBranch className="w-4 h-4" />
            </div>
            <h4 className="text-sm font-semibold text-[#111315]">Git-Backed Versioning</h4>
            <p className="text-xs text-[#575A65] leading-relaxed">
              Every workflow is represented as declarative code files (`.flow.ts`) committed to your GitHub/GitLab repositories.
            </p>
          </Card>

          <Card variant="default" className="space-y-3">
            <div className="w-8 h-8 rounded-lg bg-[#EEF4FD] text-[#0B63E5] flex items-center justify-center border border-[#C6DBFA]/70">
              <Lock className="w-4 h-4" />
            </div>
            <h4 className="text-sm font-semibold text-[#111315]">AES-256 Secret Vault</h4>
            <p className="text-xs text-[#575A65] leading-relaxed">
              API keys and connection strings are encrypted in hardware security modules with isolated ephemeral execution access.
            </p>
          </Card>

          <Card variant="default" className="space-y-3">
            <div className="w-8 h-8 rounded-lg bg-[#EEF4FD] text-[#0B63E5] flex items-center justify-center border border-[#C6DBFA]/70">
              <Globe2 className="w-4 h-4" />
            </div>
            <h4 className="text-sm font-semibold text-[#111315]">Multi-Region Routing</h4>
            <p className="text-xs text-[#575A65] leading-relaxed">
              Workflow steps execute on V8 edge isolates located in the geographical region nearest to your target databases.
            </p>
          </Card>

          <Card variant="default" className="space-y-3">
            <div className="w-8 h-8 rounded-lg bg-[#EEF4FD] text-[#0B63E5] flex items-center justify-center border border-[#C6DBFA]/70">
              <RefreshCw className="w-4 h-4" />
            </div>
            <h4 className="text-sm font-semibold text-[#111315]">Automatic Idempotency</h4>
            <p className="text-xs text-[#575A65] leading-relaxed">
              Deduplicate incoming webhook triggers automatically using deterministic SHA-256 payload hashing.
            </p>
          </Card>
        </div>
      </Container>
    </section>
  );
}
