import { useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { SystemCheckWelcome } from "@/components/system-check/welcome";
import { SystemCheckCompanyInfo } from "@/components/system-check/company-info";
import { SystemCheckOptimization } from "@/components/system-check/optimization";
import { SystemCheckBlockers } from "@/components/system-check/blockers";
import { SystemCheckAcquisition } from "@/components/system-check/acquisition";
import { SystemCheckRevenue } from "@/components/system-check/revenue";
import { SystemCheckPriority } from "@/components/system-check/priority";
import { SystemCheckContact } from "@/components/system-check/contact";
import { SystemCheckSuccess } from "@/components/system-check/success";
import type { SystemCheckFormData } from "@/types/system-check";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

type Step = 
  | "welcome" 
  | "company" 
  | "optimization" 
  | "blockers" 
  | "acquisition"
  | "revenue"
  | "priority"
  | "contact"
  | "success";

const initialFormData: SystemCheckFormData = {
  companyName: "",
  industry: "Sonstiges",
  teamSize: "1–5",
  optimizationAreas: [],
  currentBlockers: "",
  customerAcquisition: "",
  monthlyRevenue: "Don't know / prefer not to say",
  priority: "Time savings",
  desiredOutcome: "",
  preferredContact: ["Email"],
  name: "",
  email: "",
  phone: "",
  privacyConsent: false,
};

export function SystemCheckDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [step, setStep] = useState<Step>("welcome");
  const [formData, setFormData] = useState<SystemCheckFormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleNext = () => {
    const steps: Step[] = [
      "welcome",
      "company",
      "optimization",
      "blockers",
      "acquisition",
      "revenue",
      "priority",
      "contact",
      "success"
    ];
    const currentIndex = steps.indexOf(step);
    if (currentIndex < steps.length - 1) {
      setStep(steps[currentIndex + 1]);
    }
  };

  const updateFormData = (data: Partial<SystemCheckFormData>) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  const handleSubmitForm = async () => {
    // Wenn wir zum "success" Schritt wechseln, speichern wir die Daten in der Datenbank
    if (!formData.email || !formData.privacyConsent) return;
    
    setIsSubmitting(true);
    
    try {
      // Formatieren der Daten für den Eintrag in die system_checks Tabelle
      const systemCheckData = {
        company_name: formData.companyName,
        website: formData.website || null,
        industry: formData.industry,
        location: formData.location || null,
        team_size: formData.teamSize,
        optimization_areas: formData.optimizationAreas,
        other_optimization_area: formData.otherOptimizationArea || null,
        current_blockers: formData.currentBlockers,
        customer_acquisition: formData.customerAcquisition,
        monthly_revenue: formData.monthlyRevenue,
        priority: formData.priority,
        other_priority: formData.otherPriority || null,
        desired_outcome: formData.desiredOutcome || null,
        preferred_contact: formData.preferredContact,
        other_preferred_contact: formData.otherPreferredContact || null,
        contact_name: formData.name,
        contact_email: formData.email,
        contact_phone: formData.phone || null,
        privacy_consent: formData.privacyConsent,
        status: 'submitted'
      };
      
      const { error } = await supabase.from('system_checks').insert([systemCheckData]);
      
      if (error) {
        console.error("Fehler beim Speichern des System-Checks:", error);
        toast({
          title: "Fehler",
          description: "Es gab ein Problem beim Speichern deiner Daten. Bitte versuche es später erneut.",
          variant: "destructive",
        });
        return;
      }
      
      // Zum success-Schritt wechseln
      handleNext();
    } catch (error) {
      console.error("Fehler:", error);
      toast({
        title: "Fehler",
        description: "Es gab ein Problem beim Speichern deiner Daten. Bitte versuche es später erneut.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[95vw] sm:max-w-xl w-full mx-auto p-0 overflow-hidden bg-white/90 backdrop-blur-lg border border-white/20 shadow-lg rounded-2xl">
        <DialogTitle className="sr-only">System-Check</DialogTitle>
        <div className="p-6">
          {step === "welcome" && (
            <SystemCheckWelcome onNext={handleNext} />
          )}
          {step === "company" && (
            <SystemCheckCompanyInfo
              value={formData}
              onChange={updateFormData}
              onNext={handleNext}
            />
          )}
          {step === "optimization" && (
            <SystemCheckOptimization
              value={formData}
              onChange={updateFormData}
              onNext={handleNext}
            />
          )}
          {step === "blockers" && (
            <SystemCheckBlockers
              value={formData}
              onChange={updateFormData}
              onNext={handleNext}
            />
          )}
          {step === "acquisition" && (
            <SystemCheckAcquisition
              value={formData}
              onChange={updateFormData}
              onNext={handleNext}
            />
          )}
          {step === "revenue" && (
            <SystemCheckRevenue
              value={formData}
              onChange={updateFormData}
              onNext={handleNext}
            />
          )}
          {step === "priority" && (
            <SystemCheckPriority
              value={formData}
              onChange={updateFormData}
              onNext={handleNext}
            />
          )}
          {step === "contact" && (
            <SystemCheckContact
              value={formData}
              onChange={updateFormData}
              onNext={handleSubmitForm}
              isSubmitting={isSubmitting}
            />
          )}
          {step === "success" && (
            <SystemCheckSuccess onClose={() => onOpenChange(false)} />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
