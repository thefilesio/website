import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import type { SystemCheckFormData, MonthlyRevenue } from "@/types/system-check";
import { useLanguage } from "@/lib/language-context";

export function SystemCheckRevenue({
  value,
  onChange,
  onNext,
}: {
  value: SystemCheckFormData;
  onChange: (data: Partial<SystemCheckFormData>) => void;
  onNext: () => void;
}) {
  const { t, tArray } = useLanguage();
  const revenueOptions = tArray('system-check.revenue.options');
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold tracking-tight">
          {t('system-check.revenue.title')}
        </h2>
        <p className="text-muted-foreground">
          {t('system-check.revenue.description')}
        </p>
      </div>

      <div className="space-y-4">
        <RadioGroup
          value={value.monthlyRevenue}
          onValueChange={(revenue: MonthlyRevenue) => onChange({ monthlyRevenue: revenue })}
          className="space-y-3"
        >
          {revenueOptions.map((option) => (
            <div key={option} className="flex items-center space-x-2">
              <RadioGroupItem value={option} id={option} />
              <Label htmlFor={option} className="text-sm font-medium leading-none">
                {option}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <Button onClick={onNext} className="w-full" variant="glass">
        {t('system-check.next')}
      </Button>
    </div>
  );
}
