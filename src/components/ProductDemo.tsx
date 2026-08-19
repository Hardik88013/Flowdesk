"use client";

import React, { useState, useEffect } from "react";
import { Container } from "./Container";
import { Badge } from "./Badge";
import { Button } from "./Button";
import { Kbd } from "./Kbd";
import { cn } from "@/lib/utils";
import {
  UserPlus,
  Bot,
  Database,
  Mail,
  Play,
  CheckCircle2,
  Activity,
  ChevronRight,
  Copy,
  Check,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export interface DemoNode {
  id: string;
  stepNumber: string;
  keyNumber: string;
  type: "Trigger" | "Compute" | "Integration" | "Action";
  title: string;
  shortDesc: string;
  fullDesc: string;
  status: "Active" | "Ready" | "Success";
  icon: React.ElementType;
  iconBg: string;
  iconColor: string;
  config: {
    eventSource: string;
    schema: string;
    actionTarget: string;
    retryPolicy: string;
  };
  samplePayload: Record<string, unknown>;
}

const demoNodes: DemoNode[] = [
  {
    id: "node-1",
    stepNumber: "01",
    keyNumber: "1",
    type: "Trigger",
    title: "New Lead",
    shortDesc: "Inbound form webhook received",
    fullDesc:
      "Listens for incoming webhook events from your marketing forms. Automatically validates incoming JSON against schema definitions with zero cold starts.",
    status: "Active",
    icon: UserPlus,
    iconBg: "bg-[#EEF4FD]",
    iconColor: "text-[#0B63E5] border-[#C6DBFA]",
    config: {
      eventSource: "POST /v1/webhooks/inbound",
      schema: "LeadPayloadSchema (Zod)",
      actionTarget: "Flowdesk Ingest Queue",
      retryPolicy: "3 retries with jitter",
    },
    samplePayload: {
      email: "sarah.chen@acme.inc",
      company: "Acme Corporation",
      employees: 250,
      source: "website_demo_form",
    },
  },
  {
    id: "node-2",
    stepNumber: "02",
    keyNumber: "2",
    type: "Compute",
    title: "Qualify Lead",
    shortDesc: "Evaluates company size & intent",
    fullDesc:
      "Runs deterministic scoring rules. Classifies lead as Enterprise or Mid-Market based on headcount, industry domain, and budget criteria.",
    status: "Active",
    icon: Bot,
    iconBg: "bg-[#F5F3FF]",
    iconColor: "text-[#7C3AED] border-[#DDD6FE]",
    config: {
      eventSource: "Scoring Engine V8",
      schema: "ScoringOutputSchema",
      actionTarget: "Routing Matrix",
      retryPolicy: "Deterministic fallback",
    },
    samplePayload: {
      lead_score: 94,
      segment: "Enterprise Tier",
      priority: "P1_Immediate",
      matched_rules: ["headcount > 100", "verified_domain"],
    },
  },
  {
    id: "node-3",
    stepNumber: "03",
    keyNumber: "3",
    type: "Integration",
    title: "CRM Update",
    shortDesc: "Creates verified customer record",
    fullDesc:
      "Maps scored attributes and creates an organized account record in your CRM database with deduplication checks.",
    status: "Ready",
    icon: Database,
    iconBg: "bg-[#FFF7ED]",
    iconColor: "text-[#C2410C] border-[#FED7AA]",
    config: {
      eventSource: "CRM Connector",
      schema: "DealRecordSchema",
      actionTarget: "CRM Workspace Partition",
      retryPolicy: "Idempotent upsert",
    },
    samplePayload: {
      record_id: "deal_99214",
      status: "lead_assigned",
      assigned_team: "Enterprise Accounts",
      synced_at: "2026-08-19T21:48:00Z",
    },
  },
  {
    id: "node-4",
    stepNumber: "04",
    keyNumber: "4",
    type: "Action",
    title: "Email Notification",
    shortDesc: "Dispatches personalized welcome kit",
    fullDesc:
      "Renders dynamic email template with the prospect's company name and dispatches immediate confirmation and scheduling links.",
    status: "Ready",
    icon: Mail,
    iconBg: "bg-[#F0FDF4]",
    iconColor: "text-[#15803D] border-[#BBF7D0]",
    config: {
      eventSource: "Transactional Email Dispatcher",
      schema: "EmailDispatchSchema",
      actionTarget: "sarah.chen@acme.inc",
      retryPolicy: "5 retries with delivery receipts",
    },
    samplePayload: {
      template: "enterprise_welcome_v2",
      delivered: true,
      message_id: "msg_4109fa77",
      latency: "14ms",
    },
  },
];

export function ProductDemo() {
  const [selectedNodeId, setSelectedNodeId] = useState<string>("node-1");
  const [isRunning, setIsRunning] = useState(false);
  const [runningStepIndex, setRunningStepIndex] = useState<number | null>(null);
  const [copiedPayload, setCopiedPayload] = useState(false);

  const selectedNode =
    demoNodes.find((n) => n.id === selectedNodeId) || demoNodes[0];

  // Number key shortcuts [1, 2, 3, 4] for instant node switching
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return;
      }
      const match = demoNodes.find((n) => n.keyNumber === e.key);
      if (match) {
        setSelectedNodeId(match.id);
      }
    };
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, []);

  const handleRunSimulation = () => {
    if (isRunning) return;
    setIsRunning(true);
    setRunningStepIndex(0);
    setSelectedNodeId("node-1");

    setTimeout(() => {
      setRunningStepIndex(1);
      setSelectedNodeId("node-2");
    }, 500);

    setTimeout(() => {
      setRunningStepIndex(2);
      setSelectedNodeId("node-3");
    }, 1000);

    setTimeout(() => {
      setRunningStepIndex(3);
      setSelectedNodeId("node-4");
    }, 1500);

    setTimeout(() => {
      setRunningStepIndex(null);
      setIsRunning(false);
    }, 2000);
  };

  const handleCopyPayload = () => {
    navigator.clipboard.writeText(
      JSON.stringify(selectedNode.samplePayload, null, 2)
    );
    setCopiedPayload(true);
    setTimeout(() => setCopiedPayload(false), 2000);
  };

  return (
    <section
      id="product-demo"
      className="py-16 sm:py-24 border-t border-[#ECEAE4] bg-[#FAF9F5] scroll-mt-16 overflow-hidden"
    >
      <Container size="default">
        {/* Two-Column Grid Layout on Desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* LEFT COLUMN: Compact Editorial Explanation */}
          <div className="lg:col-span-5 space-y-6 sm:space-y-8">
            <div className="space-y-4">
              <Badge variant="brand" dot>
                Interactive Demonstration
              </Badge>

              <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-semibold tracking-[-0.03em] text-[#111315] leading-[1.15]">
                Build workflows visually.
              </h2>

              <p className="text-base sm:text-lg text-[#575A65] leading-relaxed">
                Connect triggers, actions, and business tools without repetitive
                manual work. Flowdesk translates visual pipelines directly into
                deterministic execution contracts.
              </p>
            </div>

            {/* Three Concise Capabilities */}
            <div className="space-y-4 pt-2">
              <div className="p-4 rounded-xl bg-white border border-[#ECEAE4] shadow-[0_1px_2px_rgba(17,19,21,0.02)] space-y-1.5">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-md bg-[#EEF4FD] text-[#0B63E5] flex items-center justify-center text-xs font-bold border border-[#C6DBFA]/60">
                    1
                  </div>
                  <h3 className="text-sm font-semibold text-[#111315]">
                    Trigger
                  </h3>
                </div>
                <p className="text-xs text-[#575A65] leading-relaxed pl-8">
                  Capture events instantly from webhooks, database changes, or
                  scheduled timers with zero cold starts.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white border border-[#ECEAE4] shadow-[0_1px_2px_rgba(17,19,21,0.02)] space-y-1.5">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-md bg-[#F5F3FF] text-[#7C3AED] flex items-center justify-center text-xs font-bold border border-[#DDD6FE]/60">
                    2
                  </div>
                  <h3 className="text-sm font-semibold text-[#111315]">
                    Connect
                  </h3>
                </div>
                <p className="text-xs text-[#575A65] leading-relaxed pl-8">
                  Transform data payloads and validate schemas between steps
                  with full type safety and automatic contract checking.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white border border-[#ECEAE4] shadow-[0_1px_2px_rgba(17,19,21,0.02)] space-y-1.5">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-md bg-[#F0FDF4] text-[#15803D] flex items-center justify-center text-xs font-bold border border-[#BBF7D0]/60">
                    3
                  </div>
                  <h3 className="text-sm font-semibold text-[#111315]">
                    Automate
                  </h3>
                </div>
                <p className="text-xs text-[#575A65] leading-relaxed pl-8">
                  Execute reliable downstream operations across databases, CRMs,
                  and communication tools with automatic retries.
                </p>
              </div>
            </div>

            {/* Micro instruction hint with keycaps */}
            <div className="pt-2 text-xs font-mono text-[#858997] flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0B63E5]" />
              <span>Press</span>
              <div className="inline-flex items-center gap-1">
                <Kbd>1</Kbd>
                <Kbd>2</Kbd>
                <Kbd>3</Kbd>
                <Kbd>4</Kbd>
              </div>
              <span>to switch nodes.</span>
            </div>
          </div>

          {/* RIGHT COLUMN: Realistic Flowdesk Workflow Builder Interface */}
          <div className="lg:col-span-7 w-full">
            <div className="rounded-2xl bg-white border border-[#ECEAE4] shadow-[0_4px_24px_-4px_rgba(17,19,21,0.06),0_1px_3px_rgba(17,19,21,0.03)] overflow-hidden">
              {/* Builder Top Bar */}
              <div className="flex flex-wrap items-center justify-between gap-3 px-4 sm:px-6 py-3.5 border-b border-[#ECEAE4] bg-[#FAF9F5]/80">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#E2E0D8]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#E2E0D8]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#E2E0D8]" />
                  </div>
                  <div className="h-4 w-px bg-[#ECEAE4]" />
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-[#111315]">
                      Lead qualification
                    </span>
                    <Badge variant="brand" className="text-[10px] py-0 px-1.5">
                      Active
                    </Badge>
                  </div>
                </div>

                {/* Run Button */}
                <Button
                  variant="primary"
                  size="sm"
                  onClick={handleRunSimulation}
                  disabled={isRunning}
                  className="h-8 text-xs"
                  leftIcon={
                    isRunning ? (
                      <Activity className="w-3 h-3 animate-spin text-[#0B63E5]" />
                    ) : (
                      <Play className="w-3 h-3 fill-current" />
                    )
                  }
                >
                  {isRunning ? "Executing..." : "Run"}
                </Button>
              </div>

              {/* Builder Canvas Area */}
              <div className="p-4 sm:p-6 bg-[#FAF9F5]/30 relative">
                <div
                  className="absolute inset-0 opacity-[0.35] pointer-events-none"
                  style={{
                    backgroundImage:
                      "radial-gradient(#C8C6BC 1px, transparent 1px)",
                    backgroundSize: "20px 20px",
                  }}
                />

                <div className="relative space-y-3">
                  {demoNodes.map((node, index) => {
                    const isSelected = selectedNode.id === node.id;
                    const isRunningCurrent = runningStepIndex === index;
                    const Icon = node.icon;

                    return (
                      <React.Fragment key={node.id}>
                        {/* Interactive Node Card */}
                        <div
                          role="button"
                          tabIndex={0}
                          onClick={() => setSelectedNodeId(node.id)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                              e.preventDefault();
                              setSelectedNodeId(node.id);
                            }
                          }}
                          className={cn(
                            "group relative p-3.5 sm:p-4 rounded-xl bg-white border transition-all duration-150 cursor-pointer select-none text-left outline-none",
                            isSelected
                              ? "border-[#0B63E5] ring-2 ring-[#0B63E5]/20 shadow-[0_4px_16px_rgba(11,99,229,0.08)] bg-white"
                              : "border-[#ECEAE4] hover:border-[#D8D5CB] shadow-[0_1px_2px_rgba(17,19,21,0.02)]",
                            isRunningCurrent &&
                              "border-[#16A34A] ring-2 ring-[#16A34A]/20 bg-[#F0FDF4]/30"
                          )}
                        >
                          <div className="flex items-center justify-between gap-3">
                            <div className="flex items-center gap-3">
                              <div
                                className={cn(
                                  "w-8 h-8 rounded-lg flex items-center justify-center border transition-colors shrink-0",
                                  isRunningCurrent
                                    ? "bg-[#EEF4FD] text-[#0B63E5] border-[#C6DBFA]"
                                    : cn(node.iconBg, node.iconColor)
                                )}
                              >
                                <Icon className="w-4 h-4" />
                              </div>

                              <div>
                                <div className="flex items-center gap-2">
                                  <h4 className="text-xs sm:text-sm font-semibold text-[#111315] group-hover:text-[#0B63E5] transition-colors">
                                    {node.title}
                                  </h4>
                                  <span className="text-[10px] font-mono uppercase px-1.5 py-0.2 rounded bg-[#FAF9F5] text-[#858997] border border-[#ECEAE4]">
                                    {node.type}
                                  </span>
                                </div>
                                <p className="text-xs text-[#575A65] mt-0.5">
                                  {node.shortDesc}
                                </p>
                              </div>
                            </div>

                            <div className="flex items-center gap-2 shrink-0">
                              <Kbd className="hidden sm:inline-flex opacity-60 group-hover:opacity-100">
                                {node.keyNumber}
                              </Kbd>

                              <span
                                className={cn(
                                  "text-[10px] font-mono px-2 py-0.5 rounded border",
                                  node.status === "Active"
                                    ? "bg-[#EEF4FD] text-[#0B63E5] border-[#C6DBFA]"
                                    : "bg-[#FAF9F5] text-[#858997] border-[#ECEAE4]"
                                )}
                              >
                                {node.status}
                              </span>
                              <ChevronRight
                                className={cn(
                                  "w-4 h-4 transition-transform",
                                  isSelected
                                    ? "text-[#0B63E5] translate-x-0.5"
                                    : "text-[#C8C6BC]"
                                )}
                              />
                            </div>
                          </div>
                        </div>

                        {index < demoNodes.length - 1 && (
                          <div className="flex items-center justify-center my-[-3px] relative z-10">
                            <div className="h-3 w-0.5 bg-[#D8D6CD] relative">
                              {isRunningCurrent && (
                                <motion.div
                                  layoutId="demoPulse"
                                  className="w-1.5 h-1.5 rounded-full bg-[#0B63E5] absolute -left-[2px] top-0"
                                  animate={{ top: ["0%", "100%"] }}
                                  transition={{ duration: 0.5, repeat: Infinity }}
                                />
                              )}
                            </div>
                          </div>
                        )}
                      </React.Fragment>
                    );
                  })}
                </div>
              </div>

              {/* Node Details Inspection Panel */}
              <div className="p-4 sm:p-5 border-t border-[#ECEAE4] bg-white">
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[#858997]">Selected:</span>
                      <span className="font-semibold text-[#111315]">
                        {selectedNode.title}
                      </span>
                      <Badge variant="brand" className="text-[10px]">
                        Step {selectedNode.stepNumber}
                      </Badge>
                    </div>

                    <div className="flex items-center gap-2 text-xs font-mono">
                      <button
                        type="button"
                        onClick={handleCopyPayload}
                        className="flex items-center gap-1 text-[11px] text-[#858997] hover:text-[#111315] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#0B63E5] rounded px-1.5 py-0.5 bg-[#FAF9F5] border border-[#ECEAE4]"
                        aria-label="Copy sample payload"
                      >
                        {copiedPayload ? (
                          <>
                            <Check className="w-3 h-3 text-[#15803D]" />
                            <span className="text-[#15803D]">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>Copy Payload</span>
                          </>
                        )}
                      </button>

                      <span className="text-[#15803D] flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Status: {selectedNode.status}</span>
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-[#575A65] leading-relaxed">
                    {selectedNode.fullDesc}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 border-t border-[#ECEAE4]/80 text-[11px] font-mono">
                    <div className="p-2 rounded-lg bg-[#FAF9F5] border border-[#ECEAE4]">
                      <span className="text-[#858997] block text-[10px] uppercase">
                        Endpoint / Source:
                      </span>
                      <span className="text-[#111315] truncate block">
                        {selectedNode.config.eventSource}
                      </span>
                    </div>

                    <div className="p-2 rounded-lg bg-[#FAF9F5] border border-[#ECEAE4]">
                      <span className="text-[#858997] block text-[10px] uppercase">
                        Contract Schema:
                      </span>
                      <span className="text-[#0B63E5] truncate block">
                        {selectedNode.config.schema}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
