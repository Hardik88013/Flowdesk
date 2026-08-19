"use client";

import React, { useState } from "react";
import { Container } from "./Container";
import { SectionHeading } from "./SectionHeading";
import { Badge } from "./Badge";
import { Button } from "./Button";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";

interface Blueprint {
  id: string;
  category: string;
  title: string;
  description: string;
  stepsCount: number;
  avgRuntime: string;
  reliability: string;
  steps: {
    name: string;
    action: string;
    runtime: string;
  }[];
}

const blueprints: Blueprint[] = [
  {
    id: "billing-provisioning",
    category: "Revenue Operations",
    title: "Customer Billing & Workspace Provisioning",
    description:
      "Ingest Stripe subscription events, calculate tax exemptions via TaxJar, provision isolated database partitions on AWS RDS, and notify team channels.",
    stepsCount: 4,
    avgRuntime: "64ms",
    reliability: "99.999%",
    steps: [
      { name: "Stripe Webhook", action: "customer.subscription.created", runtime: "2ms" },
      { name: "Tax Calculation", action: "POST /v2/taxes/calculate", runtime: "18ms" },
      { name: "PostgreSQL Provision", action: "CREATE SCHEMA tenant_481", runtime: "32ms" },
      { name: "Slack Broadcast", action: "chat.postMessage (#sales)", runtime: "12ms" },
    ],
  },
  {
    id: "incident-triage",
    category: "DevOps & SRE",
    title: "Automated Incident Triage & Root Cause Extraction",
    description:
      "Trigger upon PagerDuty high-severity alerts, query CloudWatch logs for error stack traces, cross-reference recent Git commits, and generate an incident briefing in Slack.",
    stepsCount: 4,
    avgRuntime: "112ms",
    reliability: "99.99%",
    steps: [
      { name: "PagerDuty Trigger", action: "incident.trigger (Sev-1)", runtime: "4ms" },
      { name: "CloudWatch Extract", action: "query_logs({ window: '15m' })", runtime: "48ms" },
      { name: "GitHub Commit Diff", action: "GET /repos/main/commits", runtime: "38ms" },
      { name: "War Room Slack", action: "create_channel (#inc-1092)", runtime: "22ms" },
    ],
  },
  {
    id: "data-sync-vector",
    category: "Data & Search Infrastructure",
    title: "Change Data Capture & Vector Search Sync",
    description:
      "Listen to PostgreSQL write-ahead log mutations, parse updated JSON documents, generate OpenAI text embeddings, and synchronize vector indices in Pinecone.",
    stepsCount: 4,
    avgRuntime: "85ms",
    reliability: "99.99%",
    steps: [
      { name: "PostgreSQL CDC", action: "WAL log mutation stream", runtime: "5ms" },
      { name: "Transform & Chunk", action: "chunkDocument({ size: 512 })", runtime: "12ms" },
      { name: "Vector Embedding", action: "text-embedding-3-small", runtime: "45ms" },
      { name: "Pinecone Upsert", action: "upsertVectors({ namespace: 'prod' })", runtime: "23ms" },
    ],
  },
];

export function BlueprintGallery() {
  const [selectedBlueprintId, setSelectedBlueprintId] = useState<string>(
    "billing-provisioning"
  );

  const selectedBlueprint =
    blueprints.find((b) => b.id === selectedBlueprintId) || blueprints[0];

  return (
    <section id="solutions" className="py-16 sm:py-24 border-t border-[#ECEAE4] bg-[#FAF9F5] scroll-mt-16">
      <Container size="default">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <SectionHeading
            eyebrow="Production Blueprints"
            eyebrowVariant="brand"
            size="lg"
            title="Real-world automation architectures, pre-engineered."
            description="Explore standard blueprints tested for high throughput, sub-second latency, and deterministic reliability. Clone any blueprint into your workspace with one click."
          />
        </div>

        {/* Blueprint Selector Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {blueprints.map((bp) => {
            const isSelected = bp.id === selectedBlueprint.id;
            return (
              <div
                key={bp.id}
                role="button"
                tabIndex={0}
                onClick={() => setSelectedBlueprintId(bp.id)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setSelectedBlueprintId(bp.id);
                  }
                }}
                className={cn(
                  "p-5 rounded-xl bg-white border transition-all text-left cursor-pointer select-none outline-none",
                  isSelected
                    ? "border-[#0B63E5] ring-2 ring-[#0B63E5]/15 shadow-[0_4px_16px_rgba(11,99,229,0.06)]"
                    : "border-[#ECEAE4] hover:border-[#D8D5CB] shadow-[0_1px_2px_rgba(17,19,21,0.02)]",
                  "focus-visible:ring-2 focus-visible:ring-[#0B63E5]"
                )}
              >
                <div className="flex items-center justify-between gap-2 mb-3">
                  <Badge variant="default" className="text-[10px]">
                    {bp.category}
                  </Badge>
                  <span className="text-[11px] font-mono text-[#858997]">
                    {bp.avgRuntime} avg
                  </span>
                </div>

                <h4 className="text-sm font-semibold text-[#111315] mb-2 leading-snug">
                  {bp.title}
                </h4>

                <p className="text-xs text-[#575A65] line-clamp-2 leading-relaxed">
                  {bp.description}
                </p>

                <div className="mt-4 pt-3 border-t border-[#ECEAE4] flex items-center justify-between text-xs font-medium text-[#0B63E5]">
                  <span>{bp.stepsCount} Connected Nodes</span>
                  <ChevronRight
                    className={cn(
                      "w-4 h-4 transition-transform",
                      isSelected && "translate-x-1"
                    )}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Deep Dive Blueprint Inspection Panel */}
        <div className="rounded-2xl bg-white border border-[#ECEAE4] shadow-sm p-6 sm:p-8 lg:p-10">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 border-b border-[#ECEAE4]">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Badge variant="brand">{selectedBlueprint.category}</Badge>
                <span className="text-xs font-mono text-[#858997]">
                  Target SLA: {selectedBlueprint.reliability}
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-semibold text-[#111315]">
                {selectedBlueprint.title}
              </h3>
              <p className="text-sm text-[#575A65] max-w-3xl leading-relaxed">
                {selectedBlueprint.description}
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <Button variant="primary" size="md">
                Clone Blueprint
              </Button>
            </div>
          </div>

          {/* Sequential Step Timeline */}
          <div className="mt-8">
            <h4 className="text-xs font-mono font-medium uppercase tracking-wider text-[#858997] mb-4">
              Execution Sequence Pipeline
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {selectedBlueprint.steps.map((step, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-[#FAF9F5] border border-[#ECEAE4] space-y-2 relative"
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono text-[#858997]">Stage 0{idx + 1}</span>
                    <span className="font-mono text-[11px] text-[#15803D] bg-white px-1.5 py-0.5 rounded border border-[#ECEAE4]">
                      {step.runtime}
                    </span>
                  </div>

                  <h5 className="text-sm font-semibold text-[#111315]">
                    {step.name}
                  </h5>

                  <p className="text-xs font-mono text-[#575A65] truncate">
                    {step.action}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
