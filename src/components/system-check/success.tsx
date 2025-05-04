
import { Button } from "@/components/ui/button";
import { ButterflyLogo } from "@/components/butterfly-logo";
import { useLanguage } from "@/lib/language-context";

export function SystemCheckSuccess({ onClose }: { onClose: () => void }) {
  const { t } = useLanguage();
  
  return (
    <div className="space-y-6 text-center">
      <div className="relative mx-auto w-24 h-24">
        <ButterflyLogo size="lg" animated className="animate-pulse" />
      </div>
      
      <div className="space-y-3">
        <h2 className="text-2xl font-semibold tracking-tight">
          {t('system-check.success.title')}
        </h2>
        <p className="text-muted-foreground">
          {t('system-check.success.description')}
        </p>
      </div>

      <Button onClick={onClose} variant="outline" className="w-full">
        {t('system-check.success.close')}
      </Button>
    </div>
  );
}
