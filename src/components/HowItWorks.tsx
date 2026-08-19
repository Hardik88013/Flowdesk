"use client";

import React from "react";
import { Container } from "./Container";
import { Badge } from "./Badge";
import { motion } from "framer-motion";

interface Step {
  number: string;
  title: string;
  description: string;
}

const steps: Step[] = [
  {
    number: "01",
    title: "Connect",
    description: "Connect the tools and data your workflow depends on.",
  },
  {
    number: "02",
    title: "Build",
    description: "Arrange triggers and actions into a visual workflow.",
  },
  {
    number: "03",
    title: "Automate",
    description:
      "Let Flowdesk handle the repetitive work while you focus on decisions.",
  },
];

export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="py-20 sm:py-28 lg:py-32 border-t border-[#ECEAE4] bg-[#FAF9F5] scroll-mt-16 overflow-hidden"
    >
      <Container size="default">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-16 sm:space-y-20 lg:space-y-24"
        >
          {/* Editorial Section Header */}
          <div className="max-w-2xl space-y-4">
            <Badge variant="default" dot>
              How It Works
            </Badge>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-[-0.03em] text-[#111315] leading-[1.15]">
              From manual process to automated workflow.
            </h2>
          </div>

          {/* Editorial 3-Step Flow */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 lg:gap-12 relative">
            {steps.map((step) => (
              <div
                key={step.number}
                className="relative flex flex-col justify-between pt-6 border-t border-[#ECEAE4] md:border-t-2 md:border-[#E2E0D8] space-y-6"
              >
                {/* Step Header: Number & Subtle Visual Node Indicator */}
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs sm:text-sm font-semibold text-[#858997] tracking-wider">
                    {step.number}
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0B63E5]/70" />
                </div>

                {/* Step Title & Copy */}
                <div className="space-y-2.5">
                  <h3 className="text-xl sm:text-2xl font-semibold tracking-tight text-[#111315]">
                    {step.title}
                  </h3>
                  <p className="text-sm sm:text-base text-[#575A65] leading-relaxed font-normal">
                    {step.description}
                  </p>
                </div>

                {/* Subtle Step Baseline Divider */}
                <div className="pt-4">
                  <div className="h-px w-8 bg-[#ECEAE4]" />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
