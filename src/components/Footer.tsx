import React from "react";
import Link from "next/link";
import { Container } from "./Container";

export function Footer() {
  const footerSections = [
    {
      title: "Product",
      links: [
        { label: "Overview", href: "#product-demo" },
        { label: "How It Works", href: "#how-it-works" },
        { label: "Engine Architecture", href: "#features" },
        { label: "Production Blueprints", href: "#solutions" },
      ],
    },
    {
      title: "Solutions",
      links: [
        { label: "Lead Management", href: "#use-cases" },
        { label: "Document Processing", href: "#use-cases" },
        { label: "Team Notifications", href: "#use-cases" },
        { label: "Data Synchronization", href: "#use-cases" },
      ],
    },
    {
      title: "Resources",
      links: [
        { label: "Documentation", href: "#resources" },
        { label: "TypeScript SDK", href: "#resources" },
        { label: "Python SDK", href: "#resources" },
        { label: "Flowdesk CLI", href: "#resources" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About", href: "#" },
        { label: "Security", href: "#faq" },
        { label: "Privacy Policy", href: "#" },
        { label: "Terms of Service", href: "#" },
      ],
    },
  ];

  return (
    <footer className="border-t border-[#ECEAE4] bg-[#FAF9F5] pt-14 pb-12 text-[#575A65]">
      <Container size="default">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 lg:gap-12 pb-12 border-b border-[#ECEAE4]">
          {/* Flowdesk Brand Column */}
          <div className="col-span-2 space-y-3">
            <Link
              href="/"
              className="inline-flex items-center gap-2.5 group"
              aria-label="Flowdesk Home"
            >
              <div className="w-7 h-7 rounded-lg bg-[#111315] flex items-center justify-center text-white shadow-2xs">
                <svg
                  width="15"
                  height="15"
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

            <p className="text-xs text-[#575A65] max-w-xs leading-relaxed font-normal">
              Visual workflow automation platform for modern teams.
            </p>
          </div>

          {/* Nav Columns: Product, Solutions, Resources, Company */}
          {footerSections.map((section) => (
            <div key={section.title} className="space-y-3">
              <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-[#111315]">
                {section.title}
              </h4>
              <ul className="space-y-2 text-xs">
                {section.links.map((link) => (
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
          ))}
        </div>

        {/* Small Copyright Line */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#858997]">
          <p>© {new Date().getFullYear()} Flowdesk. All rights reserved.</p>
          <p className="font-mono text-[11px]">Engineered for clarity</p>
        </div>
      </Container>
    </footer>
  );
}
