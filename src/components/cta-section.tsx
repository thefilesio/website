import { useState } from "react";
import { ButterflyLogo } from "@/components/butterfly-logo";
import { useLanguage } from "@/lib/language-context";
import { SystemCheckDialog } from "@/components/system-check-dialog";

export function CtaSection() {
  const { t } = useLanguage();
  const [showSystemCheck, setShowSystemCheck] = useState(false);

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
              {t("cta-section.title")}
            </h2>

            <p className="text-lg md:text-xl text-foreground/80 max-w-2xl mx-auto mb-10">
              {t("cta-section.subtitle")}
            </p>

            {/* CTA Button: Öffnet den SystemCheck */}
            <div className="mx-auto flex justify-center">
              <button
                onClick={() => setShowSystemCheck(true)}
                className="bg-teal-500 hover:bg-teal-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition"
              >
                🚀 {t("cta-section.button")}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* SystemCheckDialog anzeigen */}
      <SystemCheckDialog open={showSystemCheck} onOpenChange={setShowSystemCheck} />
    </section>
  );
}
