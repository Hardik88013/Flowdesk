"use client";

import React, { useState } from "react";
import { Container } from "./Container";
import { SectionHeading } from "./SectionHeading";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "How does Flowdesk ensure deterministic execution across steps?",
    answer:
      "Flowdesk isolates each workflow node in an ephemeral V8 sandbox with immutable execution contexts. When a node executes, its inputs, outputs, and side-effect hashes are permanently snapshotted into an event log. This allows any execution trace to be replayed with 100% byte-for-byte fidelity in local or staging environments.",
  },
  {
    question: "Can we execute custom TypeScript and Python code inside nodes?",
    answer:
      "Yes. You are never restricted to pre-built drag-and-drop actions. Any node can execute arbitrary TypeScript or Python code, import third-party NPM/PyPI packages, and validate data contracts using Zod or Pydantic schemas.",
  },
  {
    question: "How are secrets and API credentials managed securely?",
    answer:
      "Credentials are encrypted at rest using AES-256 GCM in a hardware security module (HSM). Secrets are injected into execution isolates only at runtime with time-bounded, scoped tokens and are automatically redacted from all telemetry traces and logs.",
  },
  {
    question: "What happens when a downstream third-party API rate-limits or fails?",
    answer:
      "Flowdesk automatically applies configurable exponential backoff with full jitter (supporting delays up to 72 hours). Automatic idempotency keys prevent duplicate charges or double-writes. If retries are exhausted, the payload routes to a dead-letter queue with automated PagerDuty/Slack escalation.",
  },
  {
    question: "Can workflows be checked into Git repositories for CI/CD?",
    answer:
      "Yes. Workflows can be exported as declarative `.flow.ts` code files and checked into your GitHub/GitLab repositories. The `@flowdesk/cli` provides GitHub Actions to validate AST contracts, run unit tests, and deploy changes deterministically on every pull request merge.",
  },
  {
    question: "Is there vendor lock-in if we choose to run on-premise or self-host?",
    answer:
      "No. The Flowdesk core execution engine and SDKs are open-source. Enterprise customers can deploy self-hosted runner agents inside their own AWS VPC, Google Cloud, or Kubernetes clusters without routing data through our cloud infrastructure.",
  },
];

export function FAQSection() {
  const [openIndexes, setOpenIndexes] = useState<number[]>([0]);

  const toggleItem = (idx: number) => {
    setOpenIndexes((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  };

  return (
    <section id="faq" className="py-16 sm:py-24 border-t border-[#ECEAE4] bg-[#FAF9F5]/40 scroll-mt-16">
      <Container size="narrow">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <SectionHeading
            eyebrow="Architecture & Specs"
            eyebrowVariant="brand"
            align="center"
            size="lg"
            title="Frequently Asked Questions"
            description="Clear answers regarding deterministic runtimes, security compliance, self-hosting, and developer workflows."
          />
        </div>

        {/* Accordion List */}
        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIndexes.includes(idx);
            return (
              <div
                key={idx}
                className="rounded-xl bg-white border border-[#ECEAE4] shadow-[0_1px_2px_rgba(17,19,21,0.02)] overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => toggleItem(idx)}
                  className="w-full flex items-center justify-between gap-4 p-4 sm:p-5 text-left font-semibold text-sm sm:text-base text-[#111315] hover:text-[#0B63E5] transition-colors focus-visible:outline-none focus-visible:bg-[#FAF9F5]"
                  aria-expanded={isOpen}
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    className={cn(
                      "w-4 h-4 text-[#858997] transition-transform duration-200 shrink-0",
                      isOpen && "rotate-180 text-[#0B63E5]"
                    )}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <div className="px-4 sm:px-5 pb-5 text-xs sm:text-sm text-[#575A65] leading-relaxed border-t border-[#ECEAE4]/60 pt-3">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
