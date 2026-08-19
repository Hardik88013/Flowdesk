import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Flowdesk — Visual Workflow Automation for Modern Teams",
  description:
    "Turn repetitive business processes into visual, reliable automated workflows. Built for high-velocity operations and engineering teams.",
  keywords: [
    "workflow automation",
    "visual workflows",
    "process orchestration",
    "business automation",
    "SaaS",
  ],
  authors: [{ name: "Flowdesk" }],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#FAF9F5",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#FAF9F5] text-[#111315]">
        {/* Skip to Content for Keyboard Accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#111315] focus:text-white focus:rounded-lg focus:shadow-lg text-xs font-mono"
        >
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
