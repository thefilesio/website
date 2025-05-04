import { useState } from "react";
import { ButterflyLogo } from "@/components/butterfly-logo";
import { useLanguage } from "@/lib/language-context";

export function CtaSection() {
  const { t } = useLanguage();

  return (
    <section className="py-20 px-6">
      <div className="container max-w-6xl mx-auto">
        <div className="glass p-10 md:p-16 text-center relative overflow-hidden">
          {/* Background elements */}
          <div className="absolute -top-16 -left-16 h-64 w-64 rounded-full bg-teal/20 blur-3xl"></div>
          <div className="absolute -bottom-16 -right-16 h-64 w-64 rounded-full bg-sand/30 blur-3xl"></div>
          
          {/* Content */}
          <div className="relative z-10">
            <div className="flex justify-center mb-6">
              <ButterflyLogo size="lg" className="animate-float" />
            </div>
            
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              {t('cta-section.title')}
            </h2>
            
            <p className="text-lg md:text-xl text-foreground/80 max-w-2xl mx-auto mb-10">
              {t('cta-section.subtitle')}
            </p>

            {/* CTA Button mit direktem Link zu Calendly */}
            <div className="mx-auto flex justify-center">
              <a
                href="https://www.cal.com/thefiles.io/demo"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-teal hover:bg-teal/90 text-white font-semibold py-4 px-8 rounded-lg text-lg transition-all shadow-lg hover:shadow-xl inline-block"
              >
                {t('cta-section.button')}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
