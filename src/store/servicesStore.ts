import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { subscribeWithSelector } from 'zustand/middleware';
import type { Service } from '../types/service';

const initialServices: Service[] = [
  {
    id: '1',
    title: 'Oracle ERP Implementation',
    description: 'End-to-end Oracle ERP implementation services tailored to your business needs, ensuring seamless integration and maximum efficiency.',
    features: [
      'Full system analysis and planning',
      'Custom module development',
      'Data migration and integration',
      'User training and documentation',
      'Post-implementation support',
      'Performance optimization'
    ],
    targetAudience: [
      'Large enterprises',
      'Mid-sized businesses',
      'Manufacturing companies',
      'Retail chains'
    ],
    benefits: [
      'Streamlined operations',
      'Improved data accuracy',
      'Enhanced reporting capabilities',
      'Better resource management',
      'Increased productivity'
    ],
    pricing: {
      startingAt: 25000,
      currency: 'USD',
      billingPeriod: 'project'
    }
  },
  {
    id: '2',
    title: 'Desktop Application Development',
    description: 'Custom Windows desktop applications designed to streamline your business processes and enhance productivity.',
    features: [
      'Intuitive user interface design',
      'Offline functionality',
      'Database integration',
      'Automated updates',
      'Cross-platform compatibility',
      'Security features'
    ],
    targetAudience: [
      'Small businesses',
      'Professional services',
      'Healthcare providers',
      'Educational institutions'
    ],
    benefits: [
      'Increased efficiency',
      'Reduced manual work',
      'Better data organization',
      'Enhanced security',
      'Customized workflow'
    ],
    pricing: {
      startingAt: 5000,
      currency: 'USD',
      billingPeriod: 'project'
    }
  },
  {
    id: '3',
    title: 'Financial Management System',
    description: 'Comprehensive financial management solution with advanced accounting features, perfect for businesses of all sizes.',
    features: [
      'Multi-currency support',
      'Automated bookkeeping',
      'Tax calculation and reporting',
      'Payroll management',
      'Invoice generation',
      'Financial analytics'
    ],
    targetAudience: [
      'Accounting firms',
      'Financial services',
      'Small businesses',
      'Startups'
    ],
    benefits: [
      'Accurate financial tracking',
      'Time-saving automation',
      'Compliance management',
      'Better cash flow visibility',
      'Simplified tax preparation'
    ],
    pricing: {
      startingAt: 199,
      currency: 'USD',
      billingPeriod: 'monthly'
    }
  },
  {
    id: '4',
    title: 'Inventory Management Solution',
    description: 'Advanced inventory tracking and management system with real-time updates and comprehensive reporting.',
    features: [
      'Real-time stock tracking',
      'Barcode/QR code scanning',
      'Automated reordering',
      'Supplier management',
      'Warehouse optimization',
      'Mobile access'
    ],
    targetAudience: [
      'Retailers',
      'Wholesalers',
      'Manufacturing',
      'E-commerce businesses'
    ],
    benefits: [
      'Reduced stockouts',
      'Lower carrying costs',
      'Improved order accuracy',
      'Better supplier relations',
      'Optimized storage'
    ],
    pricing: {
      startingAt: 299,
      currency: 'USD',
      billingPeriod: 'monthly'
    }
  },
  {
    id: '5',
    title: 'HR Management System',
    description: 'Complete human resources management solution with employee tracking, payroll, and performance management features.',
    features: [
      'Employee database management',
      'Leave and attendance tracking',
      'Performance evaluation',
      'Training management',
      'Document management',
      'Employee self-service portal'
    ],
    targetAudience: [
      'HR departments',
      'Corporate offices',
      'Staffing agencies',
      'Growing businesses'
    ],
    benefits: [
      'Streamlined HR processes',
      'Better employee engagement',
      'Reduced paperwork',
      'Improved compliance',
      'Enhanced reporting'
    ],
    pricing: {
      startingAt: 399,
      currency: 'USD',
      billingPeriod: 'monthly'
    }
  },
  {
    id: '6',
    title: 'Business Intelligence Solutions',
    description: 'Advanced analytics and reporting platform that transforms your data into actionable insights.',
    features: [
      'Interactive dashboards',
      'Custom report generation',
      'Data visualization',
      'Predictive analytics',
      'KPI tracking',
      'Real-time monitoring'
    ],
    targetAudience: [
      'Executive teams',
      'Data analysts',
      'Marketing departments',
      'Operations managers'
    ],
    benefits: [
      'Data-driven decisions',
      'Improved forecasting',
      'Better resource allocation',
      'Competitive advantage',
      'Performance optimization'
    ],
    pricing: {
      startingAt: 799,
      currency: 'USD',
      billingPeriod: 'monthly'
    }
  }
];

interface ServicesState {
  services: Service[];
  addService: (service: Omit<Service, 'id'>) => void;
  updateService: (id: string, service: Omit<Service, 'id'>) => void;
  deleteService: (id: string) => void;
}

export const useServicesStore = create<ServicesState>()(
  subscribeWithSelector(
    persist(
      (set) => ({
        services: initialServices,
        addService: (service) =>
          set((state) => ({
            services: [...state.services, { ...service, id: Date.now().toString() }],
          })),
        updateService: (id, service) =>
          set((state) => ({
            services: state.services.map((s) =>
              s.id === id ? { ...service, id } : s
            ),
          })),
        deleteService: (id) =>
          set((state) => ({
            services: state.services.filter((s) => s.id !== id),
          })),
      }),
      {
        name: 'services-storage',
      }
    )
  )
);