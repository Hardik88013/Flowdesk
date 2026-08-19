"use client";

import React from "react";
import { Container } from "./Container";
import { Button } from "./Button";
import { ArrowRight } from "lucide-react";

export function CTASection() {
  return (
    <section className="py-20 sm:py-28 lg:py-32 border-t border-[#ECEAE4] bg-[#FAF9F5] relative overflow-hidden">
      <Container size="default">
        <div className="max-w-4xl mx-auto rounded-3xl bg-[#111315] text-[#FAF9F5] p-8 sm:p-14 lg:p-18 border border-[#26282E] shadow-[0_16px_48px_-12px_rgba(0,0,0,0.3)] relative overflow-hidden text-center space-y-8">
          {/* Subtle architectural dot grid */}
          <div
            className="absolute inset-0 opacity-[0.08] pointer-events-none"
            style={{
              backgroundImage: "radial-gradient(#FAF9F5 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          />

          <div className="relative space-y-4 max-w-2xl mx-auto">
            {/* Headline */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-[-0.035em] text-[#FAF9F5] leading-[1.12]">
              Your next workflow shouldn&apos;t be manual.
            </h2>

            {/* Supporting text */}
            <p className="text-base sm:text-lg text-[#A6ABB8] leading-relaxed font-normal">
              Build the process once. Let Flowdesk handle the repetition.
            </p>
          </div>

          {/* Primary Action Button */}
          <div className="relative flex flex-wrap items-center justify-center gap-3 pt-2">
            <Button
              variant="brand"
              size="lg"
              href="#signup"
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Start building free
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
