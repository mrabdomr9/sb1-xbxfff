export interface Service {
  id: string;
  title: string;
  description: string;
  features: string[];
  targetAudience: string[];
  benefits: string[];
  pricing?: {
    startingAt: number;
    currency: string;
    billingPeriod: string;
  };
}