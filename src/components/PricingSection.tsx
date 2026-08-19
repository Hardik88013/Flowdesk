"use client";

import React, { useState } from "react";
import { Container } from "./Container";
import { SectionHeading } from "./SectionHeading";
import { Badge } from "./Badge";
import { Button } from "./Button";
import { Card } from "./Card";
import { cn } from "@/lib/utils";
import { CheckCircle2, ArrowRight, Sparkles, ShieldCheck, Zap } from "lucide-react";

export function PricingSection() {
  const [annualBilling, setAnnualBilling] = useState(true);

  return (
    <section id="pricing" className="py-16 sm:py-24 border-t border-[#ECEAE4] bg-[#FAF9F5] scroll-mt-16">
      <Container size="default">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-6 mb-12 sm:mb-16">
          <SectionHeading
            eyebrow="Transparent Packaging"
            eyebrowVariant="brand"
            align="center"
            size="lg"
            title="Simple, execution-based pricing. No hidden seat penalties."
            description="Start free on your local machine and scale deterministically with predictable execution quotas. All plans include full SDK access and type safety."
          />

          {/* Billing Frequency Toggle */}
          <div className="inline-flex items-center gap-1.5 p-1 rounded-xl bg-white border border-[#ECEAE4] shadow-sm">
            <button
              type="button"
              onClick={() => setAnnualBilling(false)}
              className={cn(
                "px-3.5 py-1.5 rounded-lg text-xs font-medium transition-colors select-none",
                !annualBilling
                  ? "bg-[#111315] text-white shadow-sm"
                  : "text-[#575A65] hover:text-[#111315]"
              )}
            >
              Monthly Billing
            </button>
            <button
              type="button"
              onClick={() => setAnnualBilling(true)}
              className={cn(
                "flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-colors select-none",
                annualBilling
                  ? "bg-[#111315] text-white shadow-sm"
                  : "text-[#575A65] hover:text-[#111315]"
              )}
            >
              <span>Annual Billing</span>
              <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-[#EEF4FD] text-[#0B63E5] border border-[#C6DBFA]/60 font-semibold">
                Save 20%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto items-stretch">
          {/* Developer Tier */}
          <div className="rounded-2xl p-6 sm:p-8 bg-white border border-[#ECEAE4] shadow-sm flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-lg font-semibold text-[#111315]">Developer</h4>
                <Badge variant="default">Free Forever</Badge>
              </div>

              <div className="space-y-1">
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl sm:text-4xl font-semibold tracking-tight text-[#111315]">
                    $0
                  </span>
                  <span className="text-xs text-[#858997]">/month</span>
                </div>
                <p className="text-xs text-[#575A65] leading-relaxed">
                  Ideal for personal side projects, CLI exploration, and local automation scripts.
                </p>
              </div>

              <div className="pt-4 border-t border-[#ECEAE4] space-y-2.5 text-xs text-[#575A65]">
                <div className="flex items-center gap-2 text-[#111315]">
                  <CheckCircle2 className="w-4 h-4 text-[#15803D] shrink-0" />
                  <span><strong>10,000</strong> monthly executions</span>
                </div>
                <div className="flex items-center gap-2 text-[#111315]">
                  <CheckCircle2 className="w-4 h-4 text-[#15803D] shrink-0" />
                  <span>3 active production pipelines</span>
                </div>
                <div className="flex items-center gap-2 text-[#111315]">
                  <CheckCircle2 className="w-4 h-4 text-[#15803D] shrink-0" />
                  <span>Full TypeScript & Python SDK</span>
                </div>
                <div className="flex items-center gap-2 text-[#111315]">
                  <CheckCircle2 className="w-4 h-4 text-[#15803D] shrink-0" />
                  <span>Local CLI emulator (`flowdesk dev`)</span>
                </div>
                <div className="flex items-center gap-2 text-[#111315]">
                  <CheckCircle2 className="w-4 h-4 text-[#15803D] shrink-0" />
                  <span>Community Discord support</span>
                </div>
              </div>
            </div>

            <Button variant="secondary" size="md" className="w-full justify-center" href="#signup">
              Start Free
            </Button>
          </div>

          {/* Team Tier (Highlighted) */}
          <div className="rounded-2xl p-6 sm:p-8 bg-white border-2 border-[#0B63E5] shadow-[0_8px_24px_rgba(11,99,229,0.08)] flex flex-col justify-between space-y-6 relative">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-[#0B63E5] text-white text-[11px] font-mono font-medium tracking-wide uppercase shadow-sm">
              Most Popular
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between pt-1">
                <h4 className="text-lg font-semibold text-[#111315]">Team</h4>
                <Badge variant="brand">High Velocity</Badge>
              </div>

              <div className="space-y-1">
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl sm:text-4xl font-semibold tracking-tight text-[#111315]">
                    ${annualBilling ? "39" : "49"}
                  </span>
                  <span className="text-xs text-[#858997]">/month</span>
                </div>
                <p className="text-xs text-[#575A65] leading-relaxed">
                  Engineered for growing engineering teams deploying production workflows.
                </p>
              </div>

              <div className="pt-4 border-t border-[#ECEAE4] space-y-2.5 text-xs text-[#575A65]">
                <div className="flex items-center gap-2 text-[#111315]">
                  <CheckCircle2 className="w-4 h-4 text-[#0B63E5] shrink-0" />
                  <span><strong>250,000</strong> monthly executions</span>
                </div>
                <div className="flex items-center gap-2 text-[#111315]">
                  <CheckCircle2 className="w-4 h-4 text-[#0B63E5] shrink-0" />
                  <span>Unlimited active pipelines</span>
                </div>
                <div className="flex items-center gap-2 text-[#111315]">
                  <CheckCircle2 className="w-4 h-4 text-[#0B63E5] shrink-0" />
                  <span>Full Visual Canvas & IDE Studio</span>
                </div>
                <div className="flex items-center gap-2 text-[#111315]">
                  <CheckCircle2 className="w-4 h-4 text-[#0B63E5] shrink-0" />
                  <span>30-day time-travel trace retention</span>
                </div>
                <div className="flex items-center gap-2 text-[#111315]">
                  <CheckCircle2 className="w-4 h-4 text-[#0B63E5] shrink-0" />
                  <span>99.9% uptime SLA guarantee</span>
                </div>
                <div className="flex items-center gap-2 text-[#111315]">
                  <CheckCircle2 className="w-4 h-4 text-[#0B63E5] shrink-0" />
                  <span>Shared team workspace & RBAC</span>
                </div>
              </div>
            </div>

            <Button
              variant="brand"
              size="md"
              className="w-full justify-center"
              href="#signup"
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Start 14-Day Team Trial
            </Button>
          </div>

          {/* Enterprise Tier */}
          <div className="rounded-2xl p-6 sm:p-8 bg-white border border-[#ECEAE4] shadow-sm flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-lg font-semibold text-[#111315]">Enterprise</h4>
                <Badge variant="neutral">Dedicated VPC</Badge>
              </div>

              <div className="space-y-1">
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl sm:text-4xl font-semibold tracking-tight text-[#111315]">
                    Custom
                  </span>
                </div>
                <p className="text-xs text-[#575A65] leading-relaxed">
                  For mission-critical infrastructure demanding dedicated compute and strict compliance.
                </p>
              </div>

              <div className="pt-4 border-t border-[#ECEAE4] space-y-2.5 text-xs text-[#575A65]">
                <div className="flex items-center gap-2 text-[#111315]">
                  <CheckCircle2 className="w-4 h-4 text-[#15803D] shrink-0" />
                  <span><strong>Custom execution volume</strong> (10M+)</span>
                </div>
                <div className="flex items-center gap-2 text-[#111315]">
                  <CheckCircle2 className="w-4 h-4 text-[#15803D] shrink-0" />
                  <span>Dedicated VPC or On-Premises Runner</span>
                </div>
                <div className="flex items-center gap-2 text-[#111315]">
                  <CheckCircle2 className="w-4 h-4 text-[#15803D] shrink-0" />
                  <span>SOC2 Type II & HIPAA compliance</span>
                </div>
                <div className="flex items-center gap-2 text-[#111315]">
                  <CheckCircle2 className="w-4 h-4 text-[#15803D] shrink-0" />
                  <span>Custom audit log retention (1+ year)</span>
                </div>
                <div className="flex items-center gap-2 text-[#111315]">
                  <CheckCircle2 className="w-4 h-4 text-[#15803D] shrink-0" />
                  <span>24/7 dedicated on-call engineer SLA</span>
                </div>
              </div>
            </div>

            <Button variant="secondary" size="md" className="w-full justify-center" href="#contact">
              Contact Enterprise Sales
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
