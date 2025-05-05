'use client';

import { useState } from "react";
import { ButterflyLogo } from "@/components/butterfly-logo";
import { Button } from "@/components/ui/button";
import { FloatingShapes } from "@/components/floating-shapes";
import { ArrowRight } from "lucide-react";
import { SystemCheckDialog } from "@/components/system-check-dialog";
import { useLanguage } from "@/lib/language-context";

export function HeroSection() {
  const [showSystemCheck, setShowSystemCheck] = useState(false);
  const { t } = useLanguage();

  return (
    <section
      className="relative min-h-screen flex items-center justify-center px-6 pt-[100px] pb-10 overflow-hidden"
      aria-label="TheFiles.io Hero Section"
    >
      <FloatingShapes />

      <div className="container max-w-6xl mx-auto flex flex-col items-center text-center">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight leading-tight">
          <span className="block">{t('hero-section.headline1') || 'Design. Automation. KI.'}</span>
          <span className="text-primary">{t('hero-section.headline2') || 'Das digitale Upgrade für dein Unternehmen.'}</span>
        </h1>

        <h2 className="text-xl md:text-2xl text-foreground/80 mb-4">
          {t('hero-section.subheadline') || 'Wir gestalten moderne Websites, automatisieren Prozesse und integrieren KI – schnell, klar und messbar.'}
        </h2>

        <p className="text-lg md:text-xl text-foreground/80 max-w-3xl mx-auto mb-10">
          {t('hero-section.subtitle') || 'Für Startups & KMU, die mit System statt Zufall wachsen wollen.'}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mb-16">
          <a 
            href="https://cal.com/thefiles.io/demo?overlayCalendar=true"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button 
              variant="glass" 
              size="xl" 
              className="group relative overflow-hidden"
            >
              <span className="relative z-10 flex items-center">
                {t('buttons.book-demo')}
                <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                <ButterflyLogo 
                  size="sm" 
                  className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-30 transition-opacity duration-300" 
                />
              </span>
            </Button>
          </a>
          <Button 
            variant="outline" 
            size="xl" 
            className="bg-white/50 backdrop-blur-sm hover:bg-white/70 transition-all"
            onClick={() => setShowSystemCheck(true)}
          >
            {t('buttons.system-check')}
          </Button>
        </div>

        <a 
          href="#services" 
          className="animate-bounce flex flex-col items-center text-sm text-foreground/60 hover:text-primary transition-colors"
        >
          <span>{t('buttons.learn-more')}</span>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 5L12 19M12 19L18 13M12 19L6 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </a>
      </div>

      <SystemCheckDialog
        open={showSystemCheck}
        onOpenChange={setShowSystemCheck}
      />
    </section>
  );
}
