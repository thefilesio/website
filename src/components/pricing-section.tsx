import { useState } from "react";
import { Check, Monitor, Mail, Bot, Brush } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ButterflyLogo } from "@/components/butterfly-logo";
import { useLanguage } from "@/lib/language-context";

export function PricingSection() {
  const [selectedPlanIndex, setSelectedPlanIndex] = useState(1); // Mitte als Default
  const { t, tArray } = useLanguage();

  const plans = [
    {
      name: t('packages.webpage.title'),
      description: t('packages.webpage.description'),
      price: t('packages.webpage.price'),
      features: tArray('packages.webpage.features'),
      icon: <Monitor />,
    },
    {
      name: t('packages.outreach.title'),
      description: t('packages.outreach.description'),
      price: t('packages.outreach.price'),
      trial: t('packages.outreach.trial'),
      features: tArray('packages.outreach.features'),
      icon: <Brush />, // Icon bleibt
    },
    {
      name: t('packages.chatbot.title'),
      description: t('packages.chatbot.description'),
      price: t('packages.chatbot.price'),
      features: tArray('packages.chatbot.features'),
      icon: <Bot />,
    }
  ];

  return (
    <section id="pricing" className="py-20 px-6">
      <div className="container max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('pricing.our-packages')}</h2>
          <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
            {t('pricing.we-build-systems')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <PricingCard 
              key={plan.name}
              plan={plan}
              isSelected={index === selectedPlanIndex}
              onClick={() => setSelectedPlanIndex(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

interface PricingCardProps {
  plan: {
    name: string;
    description: string;
    price: string;
    trial?: string;
    features: string[];
    icon: React.ReactNode;
  };
  isSelected: boolean;
  onClick: () => void;
}

function PricingCard({ plan, isSelected, onClick }: PricingCardProps) {
  const { t } = useLanguage();

  // Einheitliches Button-Design abhängig von Auswahl
  const buttonExtraClasses = isSelected
    ? "bg-primary text-white border-none hover:bg-primary/90"
    : "bg-transparent border border-primary text-primary hover:bg-primary/10";

  // Ziel-URL zu Cal.com je nach Plan
  const getBookingUrl = (planName: string) => {
    const name = planName.toLowerCase();
    if (name.includes("webpage")) return "https://cal.com/thefiles.io/webpage";
    if (name.includes("design abo") || name.includes("design subscription")) return "https://cal.com/thefiles.io/design-abo";
    if (name.includes("chatbot")) return "https://cal.com/thefiles.io/ki";
    return "#";
  };

  return (
    <div 
      className={`
        glass-card p-8 relative overflow-hidden transition-all duration-500 flex flex-col h-full
        ${isSelected ? 'border-primary/50 shadow-lg shadow-primary/20 scale-105' : 'hover:-translate-y-1 hover:shadow-md'}
      `}
    >
      <div className="flex-grow" onClick={onClick}>
        <div className="flex items-center gap-2 mb-4">
          <span className={`text-primary ${isSelected ? 'animate-pulse' : ''}`}>
            {plan.icon}
          </span>
          <h3 className="text-2xl font-bold">{plan.name}</h3>
        </div>

        <p className="text-foreground/80 mb-6">{plan.description}</p>

        <div className="flex items-baseline mb-8 flex-col items-start">
          <span className="text-4xl font-bold">{plan.price}</span>
          {plan.trial && (
            <span className="text-sm text-foreground/60 mt-1">{plan.trial}</span>
          )}
        </div>

        <ul className="space-y-3">
          {plan.features.map((feature, index) => {
            if (feature.startsWith('"')) {
              // Catchphrase: kursiv und mittig, kein BrushStroke
              return (
                <li key={index} className="w-full flex flex-col items-center mt-2">
                  <span className="text-sm font-semibold text-foreground italic text-center w-full">{feature}</span>
                </li>
              );
            }
            return (
              <li key={index} className="flex items-center gap-2">
                <Check size={20} className="text-primary flex-shrink-0" />
                <span className="text-sm">{feature}</span>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="mt-auto pt-8">
        <Button
          variant="outline"
          size="lg"
          className={`w-full butterfly-hover ${buttonExtraClasses}`}
          onClick={() => window.location.href = getBookingUrl(plan.name)}
        >
          {t('pricing.select') || "Jetzt starten"}
        </Button>
      </div>
    </div>
  );
}
