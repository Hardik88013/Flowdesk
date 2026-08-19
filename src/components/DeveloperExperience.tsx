"use client";

import React, { useState } from "react";
import { Container } from "./Container";
import { SectionHeading } from "./SectionHeading";
import { Badge } from "./Badge";
import { Button } from "./Button";
import { Card } from "./Card";
import { cn } from "@/lib/utils";
import {
  Terminal,
  Code2,
  Copy,
  Check,
  Zap,
  Laptop,
  GitPullRequest,
  FileCode,
  ArrowRight,
} from "lucide-react";

export function DeveloperExperience() {
  const [activeLang, setActiveLang] = useState<"ts" | "py" | "cli">("ts");
  const [copied, setCopied] = useState(false);

  const codeSnippets = {
    ts: `import { defineWorkflow, step, z } from "@flowdesk/sdk";

// Define strict payload contract
const OrderPayload = z.object({
  orderId: z.string(),
  amount: z.number().positive(),
  customerEmail: z.string().email(),
});

export default defineWorkflow("fulfill_order", {
  trigger: step.webhook({ path: "/orders/created", schema: OrderPayload }),
  execute: async ({ trigger, ctx }) => {
    // Step 1: Charge customer with automatic idempotency key
    const payment = await ctx.stripe.charges.create({
      amount: trigger.amount,
      currency: "usd",
      receipt_email: trigger.customerEmail,
    });

    // Step 2: Dispatch shipping notification
    await ctx.sendgrid.sendEmail({
      to: trigger.customerEmail,
      templateId: "order_confirmation_v2",
      data: { orderId: trigger.orderId, receipt: payment.id },
    });

    return { status: "fulfilled", paymentId: payment.id };
  },
});`,
    py: `from flowdesk import Workflow, step, Context
from pydantic import BaseModel, EmailStr

class OrderPayload(BaseModel):
    order_id: str
    amount: float
    customer_email: EmailStr

workflow = Workflow("fulfill_order")

@workflow.trigger(path="/orders/created", schema=OrderPayload)
async def handle_order(payload: OrderPayload, ctx: Context):
    # Step 1: Execute payment
    payment = await ctx.stripe.charges.create(
        amount=int(payload.amount * 100),
        currency="usd",
        receipt_email=payload.customer_email
    )
    
    # Step 2: Dispatch notification
    await ctx.slack.notify_channel(
        channel="#orders",
        text=f"New order processed: {payload.order_id}"
    )
    
    return {"status": "fulfilled", "payment_id": payment.id}`,
    cli: `# 1. Install Flowdesk CLI
$ npm install -g @flowdesk/cli

# 2. Initialize a local workflow project
$ flowdesk init my-automation-repo --template=typescript

# 3. Start local development sandbox with hot reload
$ flowdesk dev --port 4000
  ✔ Local V8 runtime initialized on http://localhost:4000
  ✔ Listening for local webhook triggers at /webhooks/*
  ✔ Time-travel telemetry visualizer ready on http://localhost:4000/_studio

# 4. Deploy deterministically to production
$ flowdesk deploy --env=production
  ✔ Type checking passed in 140ms
  ✔ AST bundle uploaded to Edge Engine (version: v14.0.2)
  ✔ 0 cold starts • 12 global regions active`,
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(codeSnippets[activeLang]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="resources" className="py-16 sm:py-24 border-t border-[#ECEAE4] bg-[#FAF9F5]/40 scroll-mt-16">
      <Container size="default">
        {/* Section Heading */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <SectionHeading
            eyebrow="Developer First"
            eyebrowVariant="brand"
            size="lg"
            title="Code-first or visual canvas. No lock-in, zero proprietary syntax."
            description="Build workflows visually in the Flowdesk web studio, or author them directly in TypeScript and Python. Both modes share the exact same deterministic AST model."
          />
        </div>

        {/* Code Showcase Terminal Window */}
        <div className="rounded-2xl bg-[#111315] text-[#FAF9F5] shadow-[0_12px_36px_-6px_rgba(0,0,0,0.25)] border border-[#26282E] overflow-hidden">
          {/* Terminal Window Header */}
          <div className="flex flex-wrap items-center justify-between gap-3 px-4 sm:px-6 py-3 border-b border-[#26282E] bg-[#17191E]">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
              </div>
              <div className="h-4 w-px bg-[#2E313A]" />
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setActiveLang("ts")}
                  className={cn(
                    "px-2.5 py-1 rounded text-xs font-mono transition-colors",
                    activeLang === "ts"
                      ? "bg-[#282B33] text-white"
                      : "text-[#858997] hover:text-white"
                  )}
                >
                  fulfill_order.flow.ts
                </button>
                <button
                  type="button"
                  onClick={() => setActiveLang("py")}
                  className={cn(
                    "px-2.5 py-1 rounded text-xs font-mono transition-colors",
                    activeLang === "py"
                      ? "bg-[#282B33] text-white"
                      : "text-[#858997] hover:text-white"
                  )}
                >
                  fulfill_order.py
                </button>
                <button
                  type="button"
                  onClick={() => setActiveLang("cli")}
                  className={cn(
                    "px-2.5 py-1 rounded text-xs font-mono transition-colors",
                    activeLang === "cli"
                      ? "bg-[#282B33] text-white"
                      : "text-[#858997] hover:text-white"
                  )}
                >
                  flowdesk-cli
                </button>
              </div>
            </div>

            <button
              type="button"
              onClick={copyToClipboard}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-mono text-[#858997] hover:text-white hover:bg-[#282B33] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#0B63E5]"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-[#27C93F]" />
                  <span>Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Snippet</span>
                </>
              )}
            </button>
          </div>

          {/* Terminal Code Body */}
          <div className="p-5 sm:p-7 overflow-x-auto text-xs sm:text-sm font-mono leading-relaxed text-[#E1E4EA]">
            <pre>
              <code>{codeSnippets[activeLang]}</code>
            </pre>
          </div>

          {/* Terminal Footer */}
          <div className="px-5 py-3 border-t border-[#26282E] bg-[#17191E] flex items-center justify-between text-xs font-mono text-[#858997]">
            <span>Engine: V8 Sandboxed Isolates</span>
            <span>Zero Runtime Dependencies</span>
          </div>
        </div>

        {/* 3 Developer Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          <Card variant="default" className="space-y-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#EEF4FD] text-[#0B63E5] flex items-center justify-center border border-[#C6DBFA]/70">
              <Laptop className="w-4 h-4" />
            </div>
            <h4 className="text-sm font-semibold text-[#111315]">Local Emulation & Replay</h4>
            <p className="text-xs text-[#575A65] leading-relaxed">
              Run the full Flowdesk orchestration engine on your laptop with `flowdesk dev`. Zero cloud connectivity required for local testing.
            </p>
          </Card>

          <Card variant="default" className="space-y-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#EEF4FD] text-[#0B63E5] flex items-center justify-center border border-[#C6DBFA]/70">
              <GitPullRequest className="w-4 h-4" />
            </div>
            <h4 className="text-sm font-semibold text-[#111315]">CI/CD Pull Request Checks</h4>
            <p className="text-xs text-[#575A65] leading-relaxed">
              Automated GitHub Actions validate workflow AST schemas and check for breaking contract changes before every production merge.
            </p>
          </Card>

          <Card variant="default" className="space-y-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#EEF4FD] text-[#0B63E5] flex items-center justify-center border border-[#C6DBFA]/70">
              <FileCode className="w-4 h-4" />
            </div>
            <h4 className="text-sm font-semibold text-[#111315]">Auto-Generated OpenAPI Specs</h4>
            <p className="text-xs text-[#575A65] leading-relaxed">
              Every workflow automatically generates strict OpenAPI 3.1 documentation and typed TypeScript clients for external API consumers.
            </p>
          </Card>
        </div>
      </Container>
    </section>
  );
}
