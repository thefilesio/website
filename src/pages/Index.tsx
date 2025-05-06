import { useEffect, useState } from "react";
import { Header } from "@/components/header";
import { HeroSection } from "@/components/hero-section";
import { ServicesSection } from "@/components/services-section";
import { ProcessSection } from "@/components/process-section";
import { PricingSection } from "@/components/pricing-section";
import { TestimonialsSection } from "@/components/testimonials-section";
import { TechGrid } from "@/components/tech-grid";
import { CtaSection } from "@/components/cta-section";
import { Footer } from "@/components/footer";
import { ScrollTopButton } from "@/components/scrolltop-button";
import { ChatWidget } from "@/components/chat";

// Import AOS for scroll animations
import AOS from "aos";
import "aos/dist/aos.css";

const Index = () => {
  useEffect(() => {
    // Initialize AOS (Animate on Scroll)
    AOS.init({
      duration: 800,
      once: false,
      easing: 'ease-out-cubic',
    });
  }, []);

  const [systemCheckOpen, setSystemCheckOpen] = useState(false);

  return (
    <div className="min-h-screen w-full overflow-x-hidden">
      <Header onSystemCheckOpenChange={setSystemCheckOpen} />
      <HeroSection />
      <ServicesSection />
      <ProcessSection />
      <PricingSection />
      <TestimonialsSection />
      <TechGrid />
      <CtaSection />
      <Footer />
      <ScrollTopButton />
      <ChatWidget systemCheckOpen={systemCheckOpen} />
    </div>
  );
};

export default Index;
