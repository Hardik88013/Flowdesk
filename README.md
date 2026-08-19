# Flowdesk — Visual Workflow Automation Platform

> **Frontend Engineering Challenge Submission** — *“Build It Like You Mean It”*

Flowdesk is a modern SaaS platform that turns repetitive, brittle business processes into visual, deterministic automated workflows. Built with Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4, and Framer Motion.

---

## ✦ Core Design Principles

- **Editorial & Restrained**: Built upon a warm off-white canvas (`#FAF9F5`), near-black typography (`#111315`), and hairline tactile borders (`#ECEAE4`).
- **Product Realism over Hype**: Zero fake testimonials, zero fake customer logos, zero fake user counts, and zero artificial marketing metrics.
- **Micro-Physics & Tactile Feedback**: Linear-style physical button highlights, spring deceleration curves, and active press damping (`active:scale-[0.985]`).
- **Zero Horizontal Overflow**: Strictly constrained layout bounds (`max-w-[1240px]`) tested across mobile (`390px`) and desktop (`1440px`).
- **WCAG 2.1 AA Accessibility**: Semantic landmarks, keyboard navigation with high-contrast offset rings, and ARIA attributes throughout.

---

## ✦ Homepage Feature Sections

1. **Lightweight Header (`Navbar.tsx`)**:
   - Wordmark, middle navigation (`Product`, `Solutions`, `Resources`), and action buttons (`Sign in`, `Get started`).
   - Accessible mobile drawer with `AnimatePresence` height transition, ESC key listener, and background scroll locking.

2. **Editorial Hero & Miniature Pipeline (`Hero.tsx`)**:
   - Headline: *“Turn repetitive work into workflows that run themselves.”*
   - Miniature realistic workflow interface (`New Lead` → `AI Classifies Lead` → `Add to CRM` → `Send Email`).
   - Interactive **“Run workflow”** simulation with sequential node activation, live status indicators, and replay capabilities.

3. **Interactive Product Demonstration (`ProductDemo.tsx`)**:
   - Two-column desktop dashboard showcasing how Flowdesk works in practice.
   - 3 core capabilities: **Trigger**, **Connect**, and **Automate**.
   - Interactive canvas: clicking any workflow node displays real-time endpoint parameters, full descriptions, and Zod schema contracts.

4. **Deterministic Engine Architecture (`EngineFeatures.tsx`)**:
   - Interactive tabbed explorer covering **Visual DAG Orchestration**, **Type-Safe Schemas & Contracts**, **Time-Travel Replay**, and **Enterprise Fault Tolerance**.
   - Technical micro-pillars: Git-Backed Versioning, AES-256 Secret Vault, Multi-Region Routing, and Automatic Idempotency.

5. **Production Blueprints Gallery (`BlueprintGallery.tsx`)**:
   - Real-world production blueprints with sequential stage timelines:
     - *Customer Billing & Workspace Provisioning*
     - *Automated Incident Triage & Root Cause Extraction*
     - *Change Data Capture & Vector Search Sync*

6. **Developer Experience & Code-First Engine (`DeveloperExperience.tsx`)**:
   - Interactive terminal supporting **TypeScript SDK** (`@flowdesk/sdk`), **Python SDK**, and **Flowdesk CLI** with one-click clipboard copying.

7. **Transparent Packaging (`PricingSection.tsx`)**:
   - Developer ($0 / Free Forever), Team ($39–$49/mo), and Enterprise tiers with annual/monthly billing toggle.

8. **Technical FAQ Accordion (`FAQSection.tsx`)**:
   - Accessible accordion answering key questions regarding deterministic runtimes, custom package execution, secret management, and self-hosted runners.

9. **Developer Call to Action & Structured Footer (`CTASection.tsx`, `Footer.tsx`)**:
   - Terminal install snippet (`npm i -g @flowdesk/cli && flowdesk init`).
   - Operational system status badge (`All Systems Operational • 99.99% Uptime`).

---

## ✦ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router, Turbopack)
- **Language**: [TypeScript](https://www.typescriptlang.org/) (Strict Mode)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Animation**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Typography**: [Geist Sans & Geist Mono](https://vercel.com/font)

---

## ✦ Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Local Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Production Build
```bash
npm run build
npm run start
```

---

## ✦ Repository

- GitHub: [https://github.com/Hardik88013/Flowdesk.git](https://github.com/Hardik88013/Flowdesk.git)
