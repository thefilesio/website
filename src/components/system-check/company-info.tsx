import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useLanguage } from "@/lib/language-context";
import type { SystemCheckFormData, Industry, TeamSize } from "@/types/system-check";

export function SystemCheckCompanyInfo({
  value,
  onChange,
  onNext,
}: {
  value: SystemCheckFormData;
  onChange: (data: Partial<SystemCheckFormData>) => void;
  onNext: () => void;
}) {
  const { t, tArray } = useLanguage();
  const industries = tArray('system-check.company.industries');
  const teamSizes = tArray('system-check.company.team-sizes');

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold tracking-tight">
          {t('system-check.company.title')}
        </h2>
      </div>

      <div className="space-y-2">
        <Label htmlFor="companyName">{t('system-check.company.company-name')}</Label>
        <Input
          id="companyName"
          value={value.companyName}
          onChange={(e) => onChange({ companyName: e.target.value })}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="website">{t('system-check.company.website')}</Label>
        <Input
          id="website"
          value={value.website}
          onChange={(e) => onChange({ website: e.target.value })}
          placeholder={t('system-check.company.website-placeholder')}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="industry">{t('system-check.company.industry')}</Label>
        <Select
          value={value.industry}
          onValueChange={(industry: Industry) => {
            onChange({ industry, otherIndustry: industry === industries[industries.length - 1] ? "" : undefined });
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder={t('system-check.company.industry')} />
          </SelectTrigger>
          <SelectContent>
            {industries.map((industry) => (
              <SelectItem key={industry} value={industry}>
                {industry}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {value.industry === industries[industries.length - 1] && (
          <Input
            className="mt-2"
            placeholder={t('system-check.company.industry')}
            value={value.otherIndustry}
            onChange={(e) => onChange({ otherIndustry: e.target.value })}
          />
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="location">{t('system-check.company.location')}</Label>
        <Input
          id="location"
          value={value.location}
          onChange={(e) => onChange({ location: e.target.value })}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="teamSize">{t('system-check.company.team-size')}</Label>
        <Select
          value={value.teamSize}
          onValueChange={(teamSize: TeamSize) => onChange({ teamSize })}
        >
          <SelectTrigger>
            <SelectValue placeholder={t('system-check.company.team-size')} />
          </SelectTrigger>
          <SelectContent>
            {teamSizes.map((size) => (
              <SelectItem key={size} value={size}>
                {size}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Button
        onClick={onNext}
        className="w-full"
        variant="glass"
        disabled={!value.companyName || !value.industry || !value.teamSize}
      >
        {t('system-check.next')}
      </Button>
    </div>
  );
}
