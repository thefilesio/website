import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { SystemCheckFormData, OptimizationArea } from "@/types/system-check";
import { useLanguage } from "@/lib/language-context";

export function SystemCheckOptimization({
  value,
  onChange,
  onNext,
}: {
  value: SystemCheckFormData;
  onChange: (data: Partial<SystemCheckFormData>) => void;
  onNext: () => void;
}) {
  const { t, tArray } = useLanguage();
  const optimizationAreas = tArray('system-check.optimization.options');
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold tracking-tight">
          {t('system-check.optimization.title')}
        </h2>
        <p className="text-muted-foreground">
          {t('system-check.optimization.description')}
        </p>
      </div>

      <div className="space-y-4">
        {optimizationAreas.map((area) => (
          <div key={area} className="flex items-center space-x-2">
            <Checkbox
              id={area}
              checked={value.optimizationAreas.includes(area)}
              onCheckedChange={(checked) => {
                const newAreas = checked
                  ? [...value.optimizationAreas, area]
                  : value.optimizationAreas.filter((a) => a !== area);
                onChange({
                  optimizationAreas: newAreas,
                  otherOptimizationArea: area === "Sonstiges" && !checked 
                    ? undefined 
                    : value.otherOptimizationArea
                });
              }}
            />
            <Label
              htmlFor={area}
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {area}
            </Label>
          </div>
        ))}
        
        {value.optimizationAreas.includes("Sonstiges") && (
          <div className="ml-6">
            <Input
              value={value.otherOptimizationArea}
              onChange={(e) => onChange({ otherOptimizationArea: e.target.value })}
              placeholder={t('system-check.optimization.other-placeholder')}
              className="max-w-sm"
            />
          </div>
        )}
      </div>

      <Button
        onClick={onNext}
        className="w-full"
        variant="glass"
        disabled={value.optimizationAreas.length === 0}
      >
        {t('system-check.next')}
      </Button>
    </div>
  );
}
