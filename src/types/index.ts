export type DataClassification = 'USER-PROVIDED' | 'CALCULATED' | 'RETRIEVED' | 'DEMO' | 'AI-GENERATED' | 'UNKNOWN';

export type ConfidenceLevel = 'High' | 'Moderate' | 'Limited';

export interface EntrepreneurProfile {
  name: string;
  ageRange: string;
  state: string;
  district: string;
  villageTown: string;
  pinCode: string;
  preferredLanguage: string;
  experience: string;
  skills: string[];
  interests: string[];
  businessKnowledge: string;
  availableCapital: number;
  landAvailability: string;
  shopAvailability: string;
  equipmentOwned: string[];
  vehicles: string[];
  familyWorkers: number;
  workingHours: number;
}

export interface FinancialMetrics {
  totalProjectCost: number;
  ownContribution: number;
  fundingRequirement: number;
  monthlyRevenue: number;
  monthlyExpenses: {
    rent: number;
    inventory: number;
    salaries: number;
    utilities: number;
    transport: number;
    marketing: number;
    other: number;
  };
  netMonthlyProfit: number;
  breakEvenMonths: number;
  monthlyEmi: number;
}

export interface RecommendationResult {
  businessName: string;
  category: string;
  suitabilityScore: number; // 0-100
  demandIndicator: 'High' | 'Moderate' | 'Low';
  competitionIndicator: 'Low' | 'Moderate' | 'High';
  riskLevel: 'Low' | 'Medium' | 'High';
  growthPotential: 'High' | 'Moderate' | 'Steady';
  whyMatched: string[];
  confidence: ConfidenceLevel;
  confidenceReason: string;
  financialSnapshot: FinancialMetrics;
  actionPlan: ActionStep[];
  locationRecommendations: LocationPoint[];
}

export interface ActionStep {
  id: string;
  title: string;
  priority: 'High' | 'Medium' | 'Low';
  estimatedEffort: string;
  requiredInformation: string;
  status: 'Pending' | 'In Progress' | 'Completed';
}

export interface LocationPoint {
  id: string;
  name: string;
  type: 'Recommended' | 'Moderate' | 'High Competition';
  lat: number;
  lng: number;
  suitability: number;
  competitionDensity: string;
  footTrafficEstimate: string;
}

export interface DPRDocument {
  dprId: string;
  sha256Hash: string;
  generatedTimestamp: string;
  entrepreneurName: string;
  businessName: string;
  location: string;
  totalInvestment: number;
  ownContribution: number;
  loanRequested: number;
  projectedMonthlyRevenue: number;
  projectedMonthlyProfit: number;
  breakEvenPeriodMonths: number;
  repaymentTenureYears: number;
  estimatedEmi: number;
  swotAnalysis: {
    strengths: string[];
    weaknesses: string[];
    opportunities: string[];
    threats: string[];
  };
}

export interface QuestionField {
  id: string;
  label: string;
  type: 'text' | 'number' | 'select' | 'radio' | 'slider' | 'checkbox' | 'file' | 'map';
  placeholder?: string;
  options?: { label: string; value: string }[];
  defaultValue?: any;
  required: boolean;
  whyAsk?: string;
  allowIDontKnow?: boolean;
  min?: number;
  max?: number;
  step?: number;
  unit?: string;
}

export interface TaskDefinition {
  id: string;
  title: string;
  category: 'START' | 'PLAN' | 'GROW' | 'FINANCE' | 'SOLVE';
  description: string;
  iconName: string;
  questions: QuestionField[];
}
