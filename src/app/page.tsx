import {
  Navbar,
  Hero,
  ProductDemo,
  HowItWorks,
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

        {/* 2. Main Product Demonstration (Interactive Dashboard) */}
        <ProductDemo />

        {/* 3. Editorial How It Works Section */}
        <HowItWorks />

        {/* 4. Deterministic Engine Architecture & Interactive Tabs */}
        <EngineFeatures />

        {/* 5. Production Blueprints & Sequential Timelines */}
        <BlueprintGallery />

        {/* 6. Developer Experience & Code Terminal SDKs */}
        <DeveloperExperience />

        {/* 7. Honest, Transparent Pricing Matrix */}
        <PricingSection />

        {/* 8. Technical FAQ Accordion */}
        <FAQSection />

        {/* 9. Bottom Developer CTA */}
        <CTASection />
      </main>

      {/* Structured Footer */}
      <Footer />
    </div>
  );
}
