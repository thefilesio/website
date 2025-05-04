
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const PAIN_POINTS = [
  { id: "website", label: "Website ist veraltet / nicht mobilfähig" },
  { id: "social", label: "Social Media frisst zu viel Zeit" },
  { id: "processes", label: "Prozesse laufen manuell" },
  { id: "ai", label: "Wir wollen KI endlich sinnvoll nutzen" },
  { id: "design", label: "Wir haben kein Design-Team" },
];

export function SystemCheckPainPoints({
  value,
  otherValue,
  onChange,
  onNext,
}: {
  value: string[];
  otherValue: string;
  onChange: (painPoints: string[], other: string) => void;
  onNext: () => void;
}) {
  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <h2 className="text-2xl font-semibold tracking-tight">
          Was trifft aktuell auf euch zu?
        </h2>
        <p className="text-muted-foreground">
          Wähle alle zutreffenden Punkte aus.
        </p>
      </div>

      <div className="space-y-4">
        {PAIN_POINTS.map((point) => (
          <div key={point.id} className="flex items-center space-x-2">
            <Checkbox
              id={point.id}
              checked={value.includes(point.id)}
              onCheckedChange={(checked) => {
                const newValue = checked
                  ? [...value, point.id]
                  : value.filter((v) => v !== point.id);
                onChange(newValue, otherValue);
              }}
            />
            <Label
              htmlFor={point.id}
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {point.label}
            </Label>
          </div>
        ))}
        
        <div className="space-y-2">
          <Label htmlFor="other">Sonstiges:</Label>
          <Input
            id="other"
            value={otherValue}
            onChange={(e) => onChange(value, e.target.value)}
            placeholder="Beschreibe deine spezifische Herausforderung..."
          />
        </div>
      </div>

      <Button onClick={onNext} className="w-full" variant="glass">
        Weiter
      </Button>
    </div>
  );
}
