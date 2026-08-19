import {
  Navbar,
  Hero,
  ProductDemo,
  EngineFeatures,
  BlueprintGallery,
  DeveloperExperience,
  PricingSection,
  FAQSection,
  CTASection,
  Footer,
} from "@/components";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F5] text-[#111315] selection:bg-[#D6E4FC] selection:text-[#0B63E5] overflow-x-hidden">
      {/* Sticky Navigation */}
      <Navbar />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* 1. Hero Section with Miniature Interactive Workflow */}
        <Hero />

        {/* 2. Main Product Demonstration (Interactive Dashboard & Node Selection) */}
        <ProductDemo />

        {/* 3. Deterministic Engine Architecture & Interactive Tabs */}
        <EngineFeatures />

        {/* 4. Production Blueprints & Sequential Timelines */}
        <BlueprintGallery />

        {/* 5. Developer Experience & Code Terminal SDKs */}
        <DeveloperExperience />

        {/* 6. Honest, Transparent Pricing Matrix */}
        <PricingSection />

        {/* 7. Technical FAQ Accordion */}
        <FAQSection />

        {/* 8. Bottom Developer CTA */}
        <CTASection />
      </main>

      {/* Structured Footer */}
      <Footer />
    </div>
  );
}
