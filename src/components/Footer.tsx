import React from "react";
import Link from "next/link";
import { Container } from "./Container";
import { ArrowUpRight } from "lucide-react";

export function Footer() {
  const footerLinks = {
    product: [
      { label: "Visual Canvas Studio", href: "#builder" },
      { label: "Deterministic Engine", href: "#features" },
      { label: "Production Blueprints", href: "#workflows" },
      { label: "Integrations & Sockets", href: "#integrations" },
      { label: "Pricing & Quotas", href: "#pricing" },
    ],
    developers: [
      { label: "TypeScript SDK", href: "#docs" },
      { label: "Python SDK", href: "#docs" },
      { label: "Flowdesk CLI", href: "#docs" },
      { label: "OpenAPI 3.1 Spec", href: "#docs" },
      { label: "GitHub Repository", href: "https://github.com", external: true },
    ],
    architecture: [
      { label: "Deterministic AST Model", href: "#features" },
      { label: "Time-Travel Traces", href: "#features" },
      { label: "Fault Tolerance Policy", href: "#features" },
      { label: "Self-Hosted Runners", href: "#faq" },
      { label: "Security & Encryption", href: "#faq" },
    ],
    company: [
      { label: "About Flowdesk", href: "#" },
      { label: "System Status", href: "#", status: "Operational" },
      { label: "Changelog", href: "#" },
      { label: "Privacy Policy", href: "#" },
      { label: "Terms of Service", href: "#" },
    ],
  };

  return (
    <footer className="border-t border-[#ECEAE4] bg-[#FAF9F5] pt-14 pb-12 text-[#575A65]">
      <Container size="default">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 lg:gap-12 pb-12 border-b border-[#ECEAE4]">
          {/* Brand Column */}
          <div className="col-span-2 space-y-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2.5 group"
              aria-label="Flowdesk Home"
            >
              <div className="w-7.5 h-7.5 rounded-lg bg-[#111315] flex items-center justify-center text-white shadow-sm">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect x="3.5" y="3.5" width="7" height="7" rx="2" fill="currentColor" />
                  <rect x="13.5" y="13.5" width="7" height="7" rx="2" fill="#0B63E5" />
                  <path
                    d="M7 10.5V17H13.5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <span className="font-semibold text-base tracking-tight text-[#111315]">
                Flowdesk
              </span>
            </Link>

            <p className="text-xs text-[#575A65] max-w-sm leading-relaxed">
              The deterministic workflow automation runtime. Turn repetitive business operations into visual, type-safe execution pipelines.
            </p>

            {/* Live Operational Status Badge */}
            <div className="pt-2">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-white border border-[#ECEAE4] text-xs font-mono text-[#111315] shadow-xs">
                <span className="w-2 h-2 rounded-full bg-[#16A34A] animate-pulse" />
                <span>All Systems Operational</span>
              </div>
            </div>
          </div>

          {/* Links Columns */}
          <div className="space-y-3">
            <h5 className="text-xs font-mono font-semibold uppercase tracking-wider text-[#111315]">
              Product
            </h5>
            <ul className="space-y-2 text-xs">
              {footerLinks.product.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="hover:text-[#111315] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-3">
            <h5 className="text-xs font-mono font-semibold uppercase tracking-wider text-[#111315]">
              Developers
            </h5>
            <ul className="space-y-2 text-xs">
              {footerLinks.developers.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="inline-flex items-center gap-1 hover:text-[#111315] transition-colors"
                    {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  >
                    <span>{link.label}</span>
                    {link.external && <ArrowUpRight className="w-3 h-3" />}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-3">
            <h5 className="text-xs font-mono font-semibold uppercase tracking-wider text-[#111315]">
              Architecture
            </h5>
            <ul className="space-y-2 text-xs">
              {footerLinks.architecture.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="hover:text-[#111315] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Sub-Footer */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#858997]">
          <p>© {new Date().getFullYear()} Flowdesk Technologies Inc. All rights reserved.</p>
          <div className="flex items-center gap-4 font-mono text-[11px]">
            <span>Deterministic AST Engine</span>
            <span>•</span>
            <span>TypeScript & Python Native</span>
          </div>
        </div>
      </Container>
    </footer>
  );
}
