"use client";

import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Badge } from "./Badge";
import { Button } from "./Button";
import { Kbd } from "./Kbd";
import {
  Play,
  RotateCcw,
  CheckCircle2,
  Clock,
  Code2,
  Database,
  Send,
  Webhook,
  ArrowRight,
  Sparkles,
  Zap,
  Activity,
  Layers,
  ChevronRight,
  CornerDownRight,
  Settings2,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export interface CanvasNode {
  id: string;
  type: "trigger" | "transform" | "condition" | "action";
  label: string;
  name: string;
  description: string;
  icon: React.ElementType;
  status: "idle" | "running" | "success" | "skipped";
  duration: string;
  payload: Record<string, unknown>;
  code: string;
}

const initialNodes: CanvasNode[] = [
  {
    id: "node-1",
    type: "trigger",
    label: "Trigger",
    name: "Webhook Ingestion",
    description: "POST /v1/webhooks/stripe-events",
    icon: Webhook,
    status: "idle",
    duration: "2ms",
    payload: {
      event: "customer.subscription.created",
      customer_id: "cus_9x82Ja",
      plan: "team_pro_annual",
      amount: 4900,
    },
    code: `export default defineTrigger({
  event: "stripe.customer.subscription.created",
  schema: StripeEventSchema,
});`,
  },
  {
    id: "node-2",
    type: "transform",
    label: "Compute",
    name: "Enrich & Calculate Limits",
    description: "Evaluates seat allocation and quotas",
    icon: Code2,
    status: "idle",
    duration: "8ms",
    payload: {
      allocated_seats: 15,
      rate_limit_rpm: 10000,
      region: "us-east-1",
      deterministic_hash: "0x8f2c",
    },
    code: `export async function transform(event, ctx) {
  const seats = calculateQuota(event.plan);
  return {
    ...event,
    allocated_seats: seats,
    region: ctx.tenant.region,
  };
}`,
  },
  {
    id: "node-3",
    type: "action",
    label: "Action",
    name: "Provision Database Tenant",
    description: "Allocates isolated PostgreSQL schema",
    icon: Database,
    status: "idle",
    duration: "42ms",
    payload: {
      schema: "tenant_cus_9x82Ja",
      connection_pool_size: 20,
      status: "healthy",
    },
    code: `export async function action(input, ctx) {
  return await ctx.db.createTenantSchema({
    tenantId: input.customer_id,
    seats: input.allocated_seats,
  });
}`,
  },
  {
    id: "node-4",
    type: "action",
    label: "Action",
    name: "Notify Slack Channel",
    description: "Dispatches payload to #sales-alerts",
    icon: Send,
    status: "idle",
    duration: "19ms",
    payload: {
      channel: "#sales-alerts",
      message: "New Team Pro subscription activated: cus_9x82Ja",
      delivery_id: "del_417a8",
    },
    code: `export async function notify(input, ctx) {
  await ctx.slack.send({
    channel: "#sales-alerts",
    text: \`🚀 New \${input.plan} subscription: \${input.customer_id}\`,
  });
}`,
  },
];

export function WorkflowCanvas() {
  const [nodes, setNodes] = useState<CanvasNode[]>(initialNodes);
  const [selectedNodeId, setSelectedNodeId] = useState<string>("node-1");
  const [isRunning, setIsRunning] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<"payload" | "code" | "logs">("payload");

  const selectedNode =
    nodes.find((n) => n.id === selectedNodeId) || nodes[0];

  const runSimulation = () => {
    if (isRunning) return;
    setIsRunning(true);
    setCurrentStepIndex(0);

    // Reset all nodes to idle
    setNodes((prev) => prev.map((n) => ({ ...n, status: "idle" })));

    nodes.forEach((_, idx) => {
      setTimeout(() => {
        setCurrentStepIndex(idx);
        setSelectedNodeId(nodes[idx].id);
        setNodes((prev) =>
          prev.map((n, i) => {
            if (i === idx) return { ...n, status: "running" };
            if (i < idx) return { ...n, status: "success" };
            return n;
          })
        );
      }, idx * 600);
    });

    setTimeout(() => {
      setNodes((prev) => prev.map((n) => ({ ...n, status: "success" })));
      setCurrentStepIndex(null);
      setIsRunning(false);
    }, nodes.length * 600 + 200);
  };

  const resetSimulation = () => {
    setIsRunning(false);
    setCurrentStepIndex(null);
    setNodes(initialNodes);
    setSelectedNodeId("node-1");
  };

  return (
    <div className="w-full rounded-2xl bg-white border border-[#ECEAE4] shadow-[0_4px_24px_-4px_rgba(17,19,21,0.06),0_1px_3px_rgba(17,19,21,0.03)] overflow-hidden">
      {/* Canvas Top Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 sm:px-6 py-3 border-b border-[#ECEAE4] bg-[#FAF9F5]/70">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#E2E0D8]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#E2E0D8]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#E2E0D8]" />
          </div>
          <div className="h-4 w-px bg-[#ECEAE4]" />
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-medium text-[#111315]">
              stripe_tenant_provision.flow.ts
            </span>
            <Badge variant="brand" className="text-[10px] py-0 px-1.5">
              Production
            </Badge>
          </div>
        </div>

        {/* Canvas Controls */}
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={resetSimulation}
            disabled={isRunning}
            leftIcon={<RotateCcw className="w-3 h-3 text-[#575A65]" />}
          >
            Reset
          </Button>

          <Button
            variant="primary"
            size="sm"
            onClick={runSimulation}
            isLoading={isRunning}
            leftIcon={!isRunning && <Play className="w-3 h-3 fill-current" />}
          >
            {isRunning ? "Executing Pipeline..." : "Run Test"}
          </Button>
        </div>
      </div>

      {/* Main Canvas Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[460px]">
        {/* Visual Pipeline Grid (Left 7 Cols) */}
        <div className="lg:col-span-7 p-5 sm:p-7 bg-[#FAF9F5]/40 flex flex-col justify-between relative border-b lg:border-b-0 lg:border-r border-[#ECEAE4]">
          {/* Subtle Dot Grid Background */}
          <div
            className="absolute inset-0 opacity-[0.35] pointer-events-none"
            style={{
              backgroundImage:
                "radial-gradient(#C8C6BC 1px, transparent 1px)",
              backgroundSize: "20px 20px",
            }}
          />

          <div className="relative space-y-4">
            <div className="flex items-center justify-between text-xs text-[#858997] font-mono">
              <span className="flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 text-[#0B63E5]" />
                <span>Deterministic Graph • 4 Nodes</span>
              </span>
              <span>Click node to inspect</span>
            </div>

            {/* Nodes Stack with Visual Cable Connectors */}
            <div className="space-y-3 relative">
              {nodes.map((node, index) => {
                const isSelected = selectedNode.id === node.id;
                const isCurrent = currentStepIndex === index;
                const Icon = node.icon;

                return (
                  <React.Fragment key={node.id}>
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
                        "group relative p-3.5 rounded-xl bg-white border transition-all duration-120 cursor-pointer select-none text-left outline-none",
                        isSelected
                          ? "border-[#0B63E5] ring-2 ring-[#0B63E5]/15 shadow-[0_2px_8px_rgba(11,99,229,0.08)]"
                          : "border-[#ECEAE4] hover:border-[#D8D5CB] shadow-[0_1px_2px_rgba(17,19,21,0.02)]",
                        isCurrent && "border-[#16A34A] ring-2 ring-[#16A34A]/20 bg-[#F0FDF4]/30"
                      )}
                    >
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <div
                            className={cn(
                              "w-8 h-8 rounded-lg flex items-center justify-center border transition-colors",
                              node.status === "success"
                                ? "bg-[#F0FDF4] text-[#15803D] border-[#BBF7D0]"
                                : node.status === "running"
                                ? "bg-[#EEF4FD] text-[#0B63E5] border-[#C6DBFA] animate-pulse"
                                : "bg-[#FAF9F5] text-[#575A65] border-[#ECEAE4]"
                            )}
                          >
                            {node.status === "success" ? (
                              <CheckCircle2 className="w-4 h-4 text-[#16A34A]" />
                            ) : (
                              <Icon className="w-4 h-4" />
                            )}
                          </div>

                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-semibold text-[#111315] group-hover:text-[#0B63E5] transition-colors">
                                {node.name}
                              </span>
                              <span className="text-[10px] font-mono uppercase px-1.5 py-0.2 rounded bg-[#FAF9F5] text-[#858997] border border-[#ECEAE4]">
                                {node.label}
                              </span>
                            </div>
                            <p className="text-[11px] text-[#575A65] font-mono mt-0.5">
                              {node.description}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <div className="text-[11px] font-mono text-[#858997] bg-[#FAF9F5] px-2 py-0.5 rounded border border-[#ECEAE4]">
                            {node.duration}
                          </div>
                          <ChevronRight
                            className={cn(
                              "w-4 h-4 transition-transform",
                              isSelected ? "text-[#0B63E5] translate-x-0.5" : "text-[#C8C6BC]"
                            )}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Cable Flow Connector between Nodes */}
                    {index < nodes.length - 1 && (
                      <div className="flex items-center justify-center my-[-4px] relative z-10">
                        <div className="h-4 w-0.5 bg-[#D8D6CD] relative">
                          {isCurrent && (
                            <motion.div
                              layoutId="flowPulse"
                              className="w-1.5 h-1.5 rounded-full bg-[#0B63E5] absolute -left-[2px] top-0"
                              animate={{ top: ["0%", "100%"] }}
                              transition={{ duration: 0.6, repeat: Infinity }}
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

          {/* Bottom Execution Status Footer */}
          <div className="mt-6 pt-4 border-t border-[#ECEAE4] flex items-center justify-between text-xs text-[#858997] font-mono">
            <div className="flex items-center gap-2">
              <span
                className={cn(
                  "w-2 h-2 rounded-full",
                  isRunning ? "bg-[#0B63E5] animate-ping" : "bg-[#16A34A]"
                )}
              />
              <span className="text-[#575A65]">
                {isRunning ? "Pipeline running in sandbox" : "Runtime: Edge V8 Isolated"}
              </span>
            </div>
            <span>Deterministic Replay: 100%</span>
          </div>
        </div>

        {/* Node Inspector / Code / Payload Panel (Right 5 Cols) */}
        <div className="lg:col-span-5 flex flex-col bg-white">
          {/* Inspector Tab Bar */}
          <div className="flex items-center justify-between px-4 sm:px-5 py-2.5 border-b border-[#ECEAE4] bg-[#FAF9F5]/40">
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setActiveTab("payload")}
                className={cn(
                  "px-2.5 py-1 rounded-md text-xs font-medium transition-colors",
                  activeTab === "payload"
                    ? "bg-white text-[#111315] shadow-sm border border-[#ECEAE4]"
                    : "text-[#575A65] hover:text-[#111315]"
                )}
              >
                Output State
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("code")}
                className={cn(
                  "px-2.5 py-1 rounded-md text-xs font-medium transition-colors",
                  activeTab === "code"
                    ? "bg-white text-[#111315] shadow-sm border border-[#ECEAE4]"
                    : "text-[#575A65] hover:text-[#111315]"
                )}
              >
                Node SDK Code
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("logs")}
                className={cn(
                  "px-2.5 py-1 rounded-md text-xs font-medium transition-colors",
                  activeTab === "logs"
                    ? "bg-white text-[#111315] shadow-sm border border-[#ECEAE4]"
                    : "text-[#575A65] hover:text-[#111315]"
                )}
              >
                Telemetry
              </button>
            </div>

            <span className="text-[11px] font-mono text-[#858997]">
              {selectedNode.id}
            </span>
          </div>

          {/* Inspector Body Content */}
          <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between font-mono text-xs overflow-y-auto">
            {activeTab === "payload" && (
              <div className="space-y-3">
                <div className="flex items-center justify-between text-[#858997]">
                  <span>Step: {selectedNode.name}</span>
                  <span className="text-[#16A34A]">Status: {selectedNode.status.toUpperCase()}</span>
                </div>
                <div className="p-3.5 rounded-lg bg-[#FAF9F5] border border-[#ECEAE4] text-[#111315] leading-relaxed overflow-x-auto">
                  <pre className="text-[11px]">
                    {JSON.stringify(selectedNode.payload, null, 2)}
                  </pre>
                </div>
              </div>
            )}

            {activeTab === "code" && (
              <div className="space-y-3">
                <div className="flex items-center justify-between text-[#858997]">
                  <span>TypeScript Definition</span>
                  <span className="text-[#0B63E5]">@flowdesk/sdk</span>
                </div>
                <div className="p-3.5 rounded-lg bg-[#FAF9F5] border border-[#ECEAE4] text-[#111315] leading-relaxed overflow-x-auto">
                  <pre className="text-[11px] text-[#0F172A]">
                    <code>{selectedNode.code}</code>
                  </pre>
                </div>
              </div>
            )}

            {activeTab === "logs" && (
              <div className="space-y-2.5 text-[11px]">
                <div className="flex items-center justify-between text-[#858997]">
                  <span>Execution Trace</span>
                  <span>Total: {selectedNode.duration}</span>
                </div>
                <div className="space-y-2 text-[#575A65]">
                  <div className="flex items-start gap-2">
                    <span className="text-[#858997]">00.00ms</span>
                    <span>Received context envelope [0x7a91]</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-[#858997]">00.02ms</span>
                    <span>Zod schema validation passed</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-[#858997]">00.05ms</span>
                    <span>Dispatched async handler ({selectedNode.name})</span>
                  </div>
                  <div className="flex items-start gap-2 text-[#15803D]">
                    <span className="text-[#858997]">{selectedNode.duration}</span>
                    <span>Execution completed with 0 errors</span>
                  </div>
                </div>
              </div>
            )}

            {/* Bottom Meta Pill */}
            <div className="mt-4 pt-3 border-t border-[#ECEAE4] flex items-center justify-between text-[11px] text-[#858997]">
              <span>Memory: 14.2MB</span>
              <span>Trace ID: trc_89bf2e9</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
