"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Container } from "./Container";
import { Button } from "./Button";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: "Product", href: "#product" },
    { label: "Solutions", href: "#solutions" },
    { label: "Resources", href: "#resources" },
  ];

  // Close mobile menu on ESC key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileMenuOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Prevent background scrolling when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  return (
    <header className="sticky top-0 z-50 w-full bg-[#FAF9F5]/90 backdrop-blur-md border-b border-[#ECEAE4] transition-colors">
      <Container size="default">
        <nav
          className="flex h-16 sm:h-18 items-center justify-between"
          aria-label="Main Navigation"
        >
          {/* Left: Brand Wordmark */}
          <div className="flex items-center">
            <Link
              href="/"
              className="flex items-center gap-2.5 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B63E5] rounded-md"
              aria-label="Flowdesk Home"
            >
              <div className="w-7.5 h-7.5 rounded-lg bg-[#111315] flex items-center justify-center text-white shadow-xs group-hover:bg-[#22252B] transition-colors">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-white"
                >
                  <rect
                    x="3.5"
                    y="3.5"
                    width="7"
                    height="7"
                    rx="2"
                    fill="currentColor"
                  />
                  <rect
                    x="13.5"
                    y="13.5"
                    width="7"
                    height="7"
                    rx="2"
                    fill="#0B63E5"
                  />
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
          </div>

          {/* Middle Navigation (Desktop) */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-sm font-medium text-[#575A65] hover:text-[#111315] transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Right Action Links (Desktop) */}
          <div className="hidden md:flex items-center gap-3">
            <Button variant="ghost" size="sm" href="#signin">
              Sign in
            </Button>
            <Button
              variant="primary"
              size="sm"
              href="#signup"
              rightIcon={<ArrowUpRight className="w-3.5 h-3.5" />}
            >
              Get started
            </Button>
          </div>

          {/* Mobile Right: Direct CTA + Menu Toggle */}
          <div className="flex md:hidden items-center gap-2">
            <Button
              variant="primary"
              size="sm"
              href="#signup"
              className="text-xs px-2.5 h-8"
            >
              Get started
            </Button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 rounded-lg text-[#575A65] hover:text-[#111315] hover:bg-[#F3F2EC] transition-colors focus-visible:ring-2 focus-visible:ring-[#0B63E5]"
              aria-expanded={mobileMenuOpen}
              aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" aria-hidden="true" />
              ) : (
                <Menu className="h-5 w-5" aria-hidden="true" />
              )}
            </button>
          </div>
        </nav>
      </Container>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden border-t border-[#ECEAE4] bg-[#FAF9F5] overflow-hidden"
          >
            <Container size="default" className="py-4">
              <div className="flex flex-col gap-1 pb-3">
                {navLinks.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-3 py-2.5 text-sm font-medium text-[#575A65] hover:text-[#111315] hover:bg-[#F3F2EC] rounded-lg transition-colors"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
              <div className="flex flex-col gap-2 pt-3 border-t border-[#ECEAE4]">
                <Button
                  variant="outline"
                  size="md"
                  href="#signin"
                  className="w-full justify-center"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sign in
                </Button>
                <Button
                  variant="primary"
                  size="md"
                  href="#signup"
                  className="w-full justify-center"
                  rightIcon={<ArrowUpRight className="w-4 h-4" />}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Get started
                </Button>
              </div>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
