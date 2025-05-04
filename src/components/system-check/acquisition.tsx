import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useLanguage } from "@/lib/language-context";
import type { SystemCheckFormData } from "@/types/system-check";

export function SystemCheckAcquisition({
  value,
  onChange,
  onNext,
}: {
  value: SystemCheckFormData;
  onChange: (data: Partial<SystemCheckFormData>) => void;
  onNext: () => void;
}) {
  const { t } = useLanguage();
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold tracking-tight">
          {t('system-check.acquisition.title')}
        </h2>
        <p className="text-muted-foreground">
          {t('system-check.acquisition.description')}
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="acquisition">{t('system-check.acquisition.label')}</Label>
          <Textarea
            id="acquisition"
            value={value.customerAcquisition}
            onChange={(e) => onChange({ customerAcquisition: e.target.value })}
            placeholder={t('system-check.acquisition.placeholder')}
            className="min-h-[100px]"
          />
        </div>
      </div>

      <Button
        onClick={onNext}
        className="w-full"
        variant="glass"
        disabled={!value.customerAcquisition.trim()}
      >
        {t('system-check.next')}
      </Button>
    </div>
  );
}
