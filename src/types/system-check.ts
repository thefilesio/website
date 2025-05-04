export type Industry =
  | "Immobilien"
  | "Gesundheit / Arztpraxis"
  | "Gastronomie"
  | "E-Commerce"
  | "Beratung / Coaching"
  | "Agentur / Marketing"
  | "Sonstiges";

export type TeamSize = "1–5" | "6–20" | "21–50" | "51+";

export type MonthlyRevenue =
  | "< €5,000 monthly revenue"
  | "€5,000–20,000 monthly revenue"
  | "€20,000–50,000 monthly revenue"
  | "> €50,000 monthly revenue"
  | "Don't know / prefer not to say";

export type Priority =
  | "Time savings"
  | "More leads / revenue"
  | "Customer satisfaction"
  | "Overview & control"
  | "Professional appearance"
  | "Other";

export type ContactMethod = "Email" | "WhatsApp" | "Phone" | "Slack / Teams" | "Other";

export type OptimizationArea =
  | "Customer inquiries & leads"
  | "Appointment booking"
  | "Email communication"
  | "Invoices & quotes"
  | "Document management"
  | "Social media"
  | "Support / chatbot"
  | "Internal processes"
  | "Design / branding"
  | "Website / landing pages"
  | "Other";

export interface SystemCheckFormData {
  // Step 1: Company Information
  companyName: string;
  website?: string;
  industry: Industry;
  otherIndustry?: string;
  location?: string;
  teamSize: TeamSize;

  // Step 2: Optimization Areas
  optimizationAreas: OptimizationArea[];
  otherOptimizationArea?: string;

  // Step 3: Current Blockers
  currentBlockers: string;

  // Step 4: Customer Acquisition
  customerAcquisition: string;

  // Step 5: Company Size
  monthlyRevenue: MonthlyRevenue;

  // Step 6: Priority & Goal
  priority: Priority;
  otherPriority?: string;
  desiredOutcome: string;

  // Step 7: Preferred Communication
  preferredContact: ContactMethod[];
  otherPreferredContact?: string;

  // Step 8: Contact Information
  name: string;
  email: string;
  phone: string;
  
  // Privacy consent
  privacyConsent: boolean;
}
