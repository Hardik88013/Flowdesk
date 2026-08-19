"use client";

import React, { useState } from "react";
import { Container } from "./Container";
import { SectionHeading } from "./SectionHeading";
import { Button } from "./Button";
import { Badge } from "./Badge";
import { Card } from "./Card";
import { Kbd } from "./Kbd";
import { ArrowRight, Terminal, Copy, Check, ArrowUpRight, Zap, ShieldCheck } from "lucide-react";

export function CTASection() {
  const [copied, setCopied] = useState(false);
  const installCmd = "npm i -g @flowdesk/cli && flowdesk init";

  const copyCommand = () => {
    navigator.clipboard.writeText(installCmd);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="py-16 sm:py-24 border-t border-[#ECEAE4] bg-[#FAF9F5] relative overflow-hidden">
      <Container size="default">
        <div className="max-w-4xl mx-auto rounded-3xl bg-[#111315] text-[#FAF9F5] p-8 sm:p-12 lg:p-16 border border-[#26282E] shadow-[0_16px_48px_-12px_rgba(0,0,0,0.3)] relative overflow-hidden text-center space-y-8">
          {/* Subtle background glow grid */}
          <div
            className="absolute inset-0 opacity-10 pointer-events-none"
            style={{
              backgroundImage: "radial-gradient(#FAF9F5 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          />

          <div className="relative space-y-4 max-w-2xl mx-auto">
            <Badge variant="brand" dot className="bg-[#1A2234] text-[#70A6FF] border-[#2A3C60]">
              Developer Preview
            </Badge>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-[-0.03em] text-[#FAF9F5] leading-[1.12]">
              Ready to replace brittle scripts with visual pipelines?
            </h2>

            <p className="text-sm sm:text-base text-[#A6ABB8] leading-relaxed">
              Start building locally in seconds. Free forever for developers with 10,000 monthly executions and zero cloud lock-in.
            </p>
          </div>

          {/* Quick Terminal Copy Bar */}
          <div className="relative max-w-md mx-auto">
            <div className="flex items-center justify-between gap-3 px-4 py-2.5 rounded-xl bg-[#1B1D24] border border-[#2D3039] font-mono text-xs text-[#D8DCE6] shadow-inner">
              <div className="flex items-center gap-2 truncate">
                <span className="text-[#0B63E5] font-bold">$</span>
                <span className="truncate">{installCmd}</span>
              </div>
              <button
                type="button"
                onClick={copyCommand}
                className="flex items-center gap-1 px-2 py-1 rounded bg-[#282B34] hover:bg-[#343844] text-[#A6ABB8] hover:text-white transition-colors shrink-0 text-[11px] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#0B63E5]"
                aria-label="Copy terminal command"
              >
                {copied ? (
                  <>
                    <Check className="w-3 h-3 text-[#27C93F]" />
                    <span>Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="relative flex flex-wrap items-center justify-center gap-3 pt-2">
            <Button
              variant="brand"
              size="lg"
              href="#builder"
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Open Interactive Studio
            </Button>
            <Button
              variant="outline"
              size="lg"
              href="#docs"
              className="text-[#FAF9F5] border-[#2D3039] hover:bg-[#1E2028]"
            >
              Explore API Reference
            </Button>
          </div>

          {/* Trust Metrics */}
          <div className="relative pt-4 flex flex-wrap items-center justify-center gap-6 text-xs font-mono text-[#858997]">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#27C93F]" />
              <span>SOC2 Type II Ready</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-[#0B63E5]" />
              <span>Zero-Config Deployment</span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
