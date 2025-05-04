import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useLanguage } from "@/lib/language-context";
import type { SystemCheckFormData } from "@/types/system-check";

export function SystemCheckBlockers({
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
          {t('system-check.blockers.title')}
        </h2>
        <p className="text-muted-foreground">
          {t('system-check.blockers.description')}
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="blockers">{t('system-check.blockers.label')}</Label>
          <Textarea
            id="blockers"
            value={value.currentBlockers}
            onChange={(e) => onChange({ currentBlockers: e.target.value })}
            placeholder={t('system-check.blockers.placeholder')}
            className="min-h-[120px]"
          />
        </div>
      </div>

      <Button
        onClick={onNext}
        className="w-full"
        variant="glass"
        disabled={!value.currentBlockers.trim()}
      >
        {t('system-check.next')}
      </Button>
    </div>
  );
}
