
import { ButterflyLogo } from "@/components/butterfly-logo";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/language-context";

export function SystemCheckWelcome({ onNext }: { onNext: () => void }) {
  const { t } = useLanguage();
  
  return (
    <div className="space-y-6 text-center">
      <div className="flex items-center justify-center">
        <div className="relative w-24 h-24 flex items-center justify-center">
          <ButterflyLogo size="lg" animated />
        </div>
      </div>
      <div className="space-y-3">
        <h2 className="text-2xl font-semibold tracking-tight">
          {t('system-check.welcome.title')}
        </h2>
        <p className="text-muted-foreground">
          {t('system-check.welcome.description')}
        </p>
      </div>
      <Button
        onClick={onNext}
        className="w-full group relative overflow-hidden"
        variant="glass"
        size="lg"
      >
        {t('system-check.welcome.start')}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-30 transition-opacity">
          <ButterflyLogo size="sm" animated />
        </div>
      </Button>
    </div>
  );
}
