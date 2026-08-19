"use client";

import React, { useState, useEffect } from "react";
import { Container } from "./Container";
import { Button } from "./Button";
import {
  ArrowRight,
  Play,
  RotateCcw,
  CheckCircle2,
  UserPlus,
  Database,
  Mail,
  Loader2,
  ArrowDown,
  Bot,
} from "lucide-react";
import { cn } from "@/lib/utils";

type WorkflowStatus = "ready" | "running" | "completed";
type NodeState = "idle" | "running" | "completed";

interface StepData {
  id: string;
  label: string;
  name: string;
  description: string;
  tag: string;
  icon: React.ElementType;
  iconBg: string;
  iconColor: string;
}

const workflowSteps: StepData[] = [
  {
    id: "step-1",
    label: "Trigger",
    name: "New Lead",
    description: "Inbound form submission received",
    tag: "alex@acme.corp",
    icon: UserPlus,
    iconBg: "bg-[#EEF4FD]",
    iconColor: "text-[#0B63E5] border-[#C6DBFA]",
  },
  {
    id: "step-2",
    label: "Intelligence",
    name: "AI Classifies Lead",
    description: "Enriches company size & intent score",
    tag: "Enterprise • 96% Match",
    icon: Bot,
    iconBg: "bg-[#F5F3FF]",
    iconColor: "text-[#7C3AED] border-[#DDD6FE]",
  },
  {
    id: "step-3",
    label: "Integration",
    name: "Add to CRM",
    description: "Generates deal record in Salesforce",
    tag: "Deal #8402 Created",
    icon: Database,
    iconBg: "bg-[#FFF7ED]",
    iconColor: "text-[#C2410C] border-[#FED7AA]",
  },
  {
    id: "step-4",
    label: "Action",
    name: "Send Email",
    description: "Dispatches personalized executive deck",
    tag: "Sent via SendGrid",
    icon: Mail,
    iconBg: "bg-[#F0FDF4]",
    iconColor: "text-[#15803D] border-[#BBF7D0]",
  },
];

export function Hero() {
  const [workflowStatus, setWorkflowStatus] = useState<WorkflowStatus>("ready");
  const [activeStepIndex, setActiveStepIndex] = useState<number | null>(null);
  const [nodeStates, setNodeStates] = useState<NodeState[]>([
    "idle",
    "idle",
    "idle",
    "idle",
  ]);
  const [isShortcutActive, setIsShortcutActive] = useState(false);

  const handleRunWorkflow = () => {
    if (workflowStatus === "running") return;

    setWorkflowStatus("running");
    setActiveStepIndex(0);
    setNodeStates(["running", "idle", "idle", "idle"]);

    setTimeout(() => {
      setActiveStepIndex(1);
      setNodeStates(["completed", "running", "idle", "idle"]);
    }, 450);

    setTimeout(() => {
      setActiveStepIndex(2);
      setNodeStates(["completed", "completed", "running", "idle"]);
    }, 950);

    setTimeout(() => {
      setActiveStepIndex(3);
      setNodeStates(["completed", "completed", "completed", "running"]);
    }, 1450);

    setTimeout(() => {
      setActiveStepIndex(null);
      setNodeStates(["completed", "completed", "completed", "completed"]);
      setWorkflowStatus("completed");
    }, 1900);
  };

  const handleReset = () => {
    setWorkflowStatus("ready");
    setActiveStepIndex(null);
    setNodeStates(["idle", "idle", "idle", "idle"]);
  };

  // Easter egg listener for subtle highlight effect
  useEffect(() => {
    const handleShortcut = () => {
      setIsShortcutActive(true);
      setTimeout(() => setIsShortcutActive(false), 3000);
    };
    window.addEventListener("flowdesk:shortcut-unlocked", handleShortcut);
    return () =>
      window.removeEventListener("flowdesk:shortcut-unlocked", handleShortcut);
  }, []);

  return (
    <section className="relative pt-12 sm:pt-16 lg:pt-20 pb-16 sm:pb-24 overflow-hidden">
      <Container size="default">
        {/* Above-the-Fold Copy */}
        <div className="max-w-4xl mx-auto text-center space-y-5 sm:space-y-6 mb-12 sm:mb-16">
          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-semibold tracking-[-0.035em] text-[#111315] leading-[1.12] sm:leading-[1.1]">
            Turn repetitive work into workflows that{" "}
            <span className="text-[#0B63E5]">run themselves</span>.
          </h1>

          {/* Supporting Copy */}
          <p className="text-base sm:text-lg lg:text-xl text-[#575A65] max-w-2xl mx-auto leading-relaxed font-normal">
            Flowdesk helps teams design, automate, and monitor the workflows that
            keep their business moving.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Button
              variant="primary"
              size="lg"
              href="#signup"
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Start building free
            </Button>
            <Button
              variant="secondary"
              size="lg"
              href="#preview"
              onClick={(e) => {
                e.preventDefault();
                document
                  .getElementById("preview")
                  ?.scrollIntoView({ behavior: "smooth" });
                handleRunWorkflow();
              }}
            >
              See how it works
            </Button>
          </div>
        </div>

        {/* Miniature Realistic Flowdesk Workflow Interface */}
        <div
          id="preview"
          className={cn(
            "max-w-5xl mx-auto rounded-2xl bg-white border transition-all duration-300 overflow-hidden",
            isShortcutActive
              ? "border-[#0B63E5] ring-2 ring-[#0B63E5]/40 shadow-[0_0_24px_rgba(11,99,229,0.15)]"
              : "border-[#ECEAE4] shadow-[0_4px_24px_-4px_rgba(17,19,21,0.06),0_1px_3px_rgba(17,19,21,0.03)]"
          )}
        >
          {/* Window Header / Toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-3 px-4 sm:px-6 py-3 border-b border-[#ECEAE4] bg-[#FAF9F5]/70">
            {/* Window Controls & Title */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#E2E0D8]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#E2E0D8]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#E2E0D8]" />
              </div>
              <div className="h-4 w-px bg-[#ECEAE4]" />
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-medium text-[#111315]">
                  lead_qualification_pipeline.flow
                </span>
              </div>
            </div>

            {/* Workflow Status Badge & Run Action */}
            <div className="flex items-center gap-2.5">
              {/* Status Pill */}
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono bg-white border border-[#ECEAE4] shadow-2xs">
                {workflowStatus === "ready" && (
                  <>
                    <span className="w-2 h-2 rounded-full bg-[#858997]" />
                    <span className="text-[#575A65]">Status: Ready</span>
                  </>
                )}
                {workflowStatus === "running" && (
                  <>
                    <span className="w-2 h-2 rounded-full bg-[#0B63E5] animate-pulse" />
                    <span className="text-[#0B63E5] font-medium">
                      Status: Running...
                    </span>
                  </>
                )}
                {workflowStatus === "completed" && (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#15803D]" />
                    <span className="text-[#15803D] font-medium">
                      Status: Completed (1.9s)
                    </span>
                  </>
                )}
              </div>

              {/* Reset Button (only shown when completed) */}
              {workflowStatus === "completed" && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleReset}
                  leftIcon={<RotateCcw className="w-3 h-3 text-[#575A65]" />}
                  className="h-8 text-xs"
                >
                  Reset
                </Button>
              )}

              {/* Main Interactive Button */}
              <Button
                variant={workflowStatus === "completed" ? "secondary" : "primary"}
                size="sm"
                onClick={handleRunWorkflow}
                disabled={workflowStatus === "running"}
                className="h-8 text-xs"
                leftIcon={
                  workflowStatus === "running" ? (
                    <Loader2 className="w-3 h-3 animate-spin" />
                  ) : (
                    <Play className="w-3 h-3 fill-current" />
                  )
                }
              >
                {workflowStatus === "ready" && "Run workflow"}
                {workflowStatus === "running" && "Executing steps..."}
                {workflowStatus === "completed" && "Run again"}
              </Button>
            </div>
          </div>

          {/* Workflow Canvas Body */}
          <div className="p-5 sm:p-8 bg-[#FAF9F5]/30 relative">
            {/* Subtle Grid Dot Texture */}
            <div
              className="absolute inset-0 opacity-[0.35] pointer-events-none"
              style={{
                backgroundImage:
                  "radial-gradient(#C8C6BC 1px, transparent 1px)",
                backgroundSize: "20px 20px",
              }}
            />

            <div className="relative">
              {/* Sequential 4-Node Visual Pipeline Grid */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-3 sm:gap-4 relative items-stretch">
                {workflowSteps.map((step, index) => {
                  const state = nodeStates[index];
                  const Icon = step.icon;

                  return (
                    <React.Fragment key={step.id}>
                      {/* Node Card */}
                      <div
                        className={cn(
                          "relative p-4 rounded-xl bg-white border transition-all duration-200 flex flex-col justify-between text-left",
                          state === "running" &&
                            "border-[#0B63E5] ring-2 ring-[#0B63E5]/20 shadow-[0_4px_16px_rgba(11,99,229,0.1)] scale-[1.01]",
                          state === "completed" &&
                            "border-[#BBF7D0] shadow-[0_1px_3px_rgba(21,128,61,0.06)] bg-[#F0FDF4]/20",
                          state === "idle" &&
                            "border-[#ECEAE4] shadow-[0_1px_2px_rgba(17,19,21,0.02)]"
                        )}
                      >
                        {/* Top Metadata Row */}
                        <div>
                          <div className="flex items-center justify-between gap-2 mb-3">
                            <div className="flex items-center gap-2">
                              <div
                                className={cn(
                                  "w-7 h-7 rounded-lg flex items-center justify-center border transition-colors",
                                  state === "completed"
                                    ? "bg-[#F0FDF4] text-[#15803D] border-[#BBF7D0]"
                                    : state === "running"
                                    ? "bg-[#EEF4FD] text-[#0B63E5] border-[#C6DBFA]"
                                    : cn(step.iconBg, step.iconColor)
                                )}
                              >
                                {state === "completed" ? (
                                  <CheckCircle2 className="w-4 h-4 text-[#15803D]" />
                                ) : state === "running" ? (
                                  <Loader2 className="w-4 h-4 animate-spin text-[#0B63E5]" />
                                ) : (
                                  <Icon className="w-3.5 h-3.5" />
                                )}
                              </div>
                              <span className="text-[10px] font-mono uppercase tracking-wider text-[#858997]">
                                Step 0{index + 1}
                              </span>
                            </div>

                            {/* State Micro-Badge */}
                            <span
                              className={cn(
                                "text-[10px] font-mono px-1.5 py-0.5 rounded border transition-colors",
                                state === "completed" &&
                                  "bg-[#F0FDF4] text-[#15803D] border-[#BBF7D0]",
                                state === "running" &&
                                  "bg-[#EEF4FD] text-[#0B63E5] border-[#C6DBFA]",
                                state === "idle" &&
                                  "bg-[#FAF9F5] text-[#858997] border-[#ECEAE4]"
                              )}
                            >
                              {state === "completed" && "Success"}
                              {state === "running" && "Active"}
                              {state === "idle" && "Idle"}
                            </span>
                          </div>

                          {/* Node Title & Description */}
                          <div className="space-y-1">
                            <h4 className="text-sm font-semibold text-[#111315] tracking-tight">
                              {step.name}
                            </h4>
                            <p className="text-xs text-[#575A65] leading-relaxed">
                              {step.description}
                            </p>
                          </div>
                        </div>

                        {/* Node Payload Tag */}
                        <div className="mt-3 pt-2.5 border-t border-[#ECEAE4]/80">
                          <div className="inline-flex items-center gap-1 text-[11px] font-mono text-[#575A65] bg-[#FAF9F5] px-2 py-0.5 rounded border border-[#ECEAE4] truncate max-w-full">
                            <span className="truncate">{step.tag}</span>
                          </div>
                        </div>
                      </div>

                      {/* Connector arrow for mobile vertical flow */}
                      {index < workflowSteps.length - 1 && (
                        <div className="flex md:hidden items-center justify-center my-[-4px]">
                          <ArrowDown className="w-3.5 h-3.5 text-[#C8C6BC]" />
                        </div>
                      )}
                    </React.Fragment>
                  );
                })}
              </div>

              {/* Sub-bar Telemetry / Live Log */}
              <div className="mt-5 p-3 rounded-xl bg-white border border-[#ECEAE4] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-mono text-[#575A65]">
                <div className="flex items-center gap-2">
                  <span className="text-[#858997]">Execution Engine:</span>
                  <span className="text-[#111315] font-medium">
                    {workflowStatus === "ready" && "Awaiting trigger event"}
                    {workflowStatus === "running" &&
                      `Processing Stage 0${(activeStepIndex ?? 0) + 1}: ${
                        workflowSteps[activeStepIndex ?? 0]?.name
                      }`}
                    {workflowStatus === "completed" &&
                      "All 4 nodes completed successfully (0 errors)"}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-[#858997]">
                  <span>V8 Sandbox</span>
                  <span>•</span>
                  <span>Deterministic: 100%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
