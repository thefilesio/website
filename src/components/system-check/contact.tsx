import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useLanguage } from "@/lib/language-context";
import { SystemCheckFormData, ContactMethod } from "@/types/system-check";
import { Link } from "react-router-dom";

export function SystemCheckContact({
  value,
  onChange,
  onNext,
  isSubmitting,
}: {
  value: SystemCheckFormData;
  onChange: (data: Partial<SystemCheckFormData>) => void;
  onNext: () => void;
  isSubmitting: boolean;
}) {
  const { t, tArray } = useLanguage();
  const contactOptions = tArray('system-check.contact.options');
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    privacyConsent?: string;
  }>({});
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let hasErrors = false;
    const newErrors: {
      name?: string;
      email?: string;
      privacyConsent?: string;
    } = {};
    
    if (!value.name) {
      newErrors.name = t('system-check.contact.errors.name-required');
      hasErrors = true;
    }
    
    if (!value.email) {
      newErrors.email = t('system-check.contact.errors.email-required');
      hasErrors = true;
    }
    
    if (!value.privacyConsent) {
      newErrors.privacyConsent = t('system-check.contact.errors.privacy-required');
      hasErrors = true;
    }
    
    setErrors(newErrors);
    
    if (!hasErrors) {
      onNext();
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold tracking-tight">{t('system-check.contact.title')}</h2>
        <p className="text-muted-foreground">
          {t('system-check.contact.subtitle')}
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">{t('system-check.contact.name')} *</Label>
          <Input 
            id="name" 
            placeholder={t('system-check.contact.name-placeholder')}
            value={value.name || ""}
            onChange={(e) => {
              onChange({ name: e.target.value });
              if (errors.name) setErrors({ ...errors, name: undefined });
            }}
          />
          {errors.name && (
            <p className="text-sm text-destructive">{errors.name}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="email">{t('system-check.contact.email')} *</Label>
          <Input 
            id="email" 
            type="email" 
            placeholder={t('system-check.contact.email-placeholder')}
            value={value.email || ""}
            onChange={(e) => {
              onChange({ email: e.target.value });
              if (errors.email) setErrors({ ...errors, email: undefined });
            }}
          />
          {errors.email && (
            <p className="text-sm text-destructive">{errors.email}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="phone">{t('system-check.contact.phone')}</Label>
          <Input 
            id="phone" 
            placeholder={t('system-check.contact.phone-placeholder')}
            value={value.phone || ""}
            onChange={(e) => onChange({ phone: e.target.value })}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="desiredOutcome">{t('system-check.contact.desired-outcome')}</Label>
          <Textarea 
            id="desiredOutcome" 
            placeholder={t('system-check.contact.desired-outcome-placeholder')}
            value={value.desiredOutcome || ""}
            onChange={(e) => onChange({ desiredOutcome: e.target.value })}
            rows={3}
          />
        </div>
        
        <div className="space-y-4">
          {contactOptions.map((option) => (
            <div key={option} className="flex items-center space-x-2">
              <Checkbox
                id={option}
                checked={value.preferredContact.includes(option as ContactMethod)}
                onCheckedChange={(checked) => {
                  const newContacts = checked
                    ? [...value.preferredContact, option as ContactMethod]
                    : value.preferredContact.filter((c) => c !== option);
                  onChange({
                    preferredContact: newContacts,
                    otherPreferredContact: option === "Other" && !checked 
                      ? undefined 
                      : value.otherPreferredContact
                  });
                }}
              />
              <Label
                htmlFor={option}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {option}
              </Label>
            </div>
          ))}
          
          {value.preferredContact.includes("Other" as ContactMethod) && (
            <div className="ml-6">
              <Input
                value={value.otherPreferredContact}
                onChange={(e) => onChange({ otherPreferredContact: e.target.value })}
                placeholder={t('system-check.contact.other-placeholder')}
                className="max-w-sm"
              />
            </div>
          )}
        </div>
        
        <div className="flex items-start space-x-2 pt-2">
          <Checkbox 
            id="privacyConsent" 
            checked={value.privacyConsent || false}
            onCheckedChange={(checked) => {
              onChange({ privacyConsent: checked === true });
              if (errors.privacyConsent) setErrors({ ...errors, privacyConsent: undefined });
            }}
            className="mt-1 data-[state=checked]:bg-teal data-[state=checked]:border-teal"
          />
          <div className="space-y-1">
            <label
              htmlFor="privacyConsent"
              className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {(() => {
                const consent = t('system-check.contact.privacy-consent');
                if (consent.includes('Datenschutzerklärung')) {
                  const parts = consent.split('Datenschutzerklärung');
                  return <>{parts[0]}<Link to="/datenschutz" className="text-primary hover:underline" target="_blank">{t('footer.privacy')}</Link>{parts[1]}</>;
                } else if (consent.includes('privacy policy')) {
                  const parts = consent.split('privacy policy');
                  return <>{parts[0]}<Link to="/datenschutz" className="text-primary hover:underline" target="_blank">{t('footer.privacy')}</Link>{parts[1]}</>;
                }
                return consent;
              })()}
            </label>
            {errors.privacyConsent && (
              <p className="text-sm text-destructive">{errors.privacyConsent}</p>
            )}
          </div>
        </div>
        
        <div className="flex justify-end pt-4">
          <Button 
            type="submit" 
            variant="glass" 
            className="w-full sm:w-auto"
            disabled={isSubmitting || !value.privacyConsent}
          >
            {isSubmitting ? t('system-check.contact.submitting') : t('system-check.contact.submit')}
          </Button>
        </div>
      </form>
    </div>
  );
}
