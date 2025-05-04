import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { SystemCheckFormData, Priority } from "@/types/system-check";
import { useLanguage } from "@/lib/language-context";

export function SystemCheckPriority({
  value,
  onChange,
  onNext,
}: {
  value: SystemCheckFormData;
  onChange: (data: Partial<SystemCheckFormData>) => void;
  onNext: () => void;
}) {
  const { t, tArray } = useLanguage();
  const priorityOptions = tArray('system-check.priority.options');
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold tracking-tight">
          {t('system-check.priority.title')}
        </h2>
        <p className="text-muted-foreground">
          {t('system-check.priority.description')}
        </p>
      </div>

      <div className="space-y-4">
        <RadioGroup
          value={value.priority}
          onValueChange={(priority: Priority) => {
            onChange({ 
              priority, 
              otherPriority: priority === "Other" ? "" : undefined 
            });
          }}
          className="space-y-3"
        >
          {priorityOptions.map((option) => (
            <div key={option} className="flex items-center space-x-2">
              <RadioGroupItem value={option} id={`priority-${option}`} />
              <Label htmlFor={`priority-${option}`} className="text-sm font-medium leading-none">
                {option}
              </Label>
            </div>
          ))}
        </RadioGroup>
        
        {value.priority === "Other" && (
          <div className="ml-6">
            <Input
              value={value.otherPriority}
              onChange={(e) => onChange({ otherPriority: e.target.value })}
              placeholder={t('system-check.priority.other-placeholder')}
              className="max-w-sm"
            />
          </div>
        )}
        
        <div className="space-y-2 pt-2">
          <Label htmlFor="desiredOutcome">
            {t('system-check.priority.desired-outcome')}
          </Label>
          <Textarea
            id="desiredOutcome"
            value={value.desiredOutcome}
            onChange={(e) => onChange({ desiredOutcome: e.target.value })}
            placeholder={t('system-check.priority.desired-outcome-placeholder')}
            className="min-h-[100px]"
          />
        </div>
      </div>

      <Button
        onClick={onNext}
        className="w-full"
        variant="glass"
        disabled={!value.priority || (value.priority === "Other" && !value.otherPriority)}
      >
        {t('system-check.next')}
      </Button>
    </div>
  );
}
