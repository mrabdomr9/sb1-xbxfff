import { Award, Clock, Shield, Zap } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface MarketingPhrase {
  icon: LucideIcon;
  stat: string;
  statLabel: string;
  title: string;
  description: string;
}

export const marketingPhrases: MarketingPhrase[] = [
  {
    icon: Award,
    stat: "15+",
    statLabel: "Years",
    title: "Industry Experience",
    description: "Delivering excellence in Oracle ERP and desktop solutions since 2008"
  },
  {
    icon: Shield,
    stat: "100%",
    statLabel: "Secure",
    title: "Enterprise Security",
    description: "Bank-grade security protocols protecting your business data"
  },
  {
    icon: Clock,
    stat: "24/7",
    statLabel: "Support",
    title: "Always Available",
    description: "Round-the-clock technical assistance and customer support"
  },
  {
    icon: Zap,
    stat: "Fast",
    statLabel: "Setup",
    title: "Quick Implementation",
    description: "Rapid deployment with minimal business disruption"
  }
];

export const projects = [
  {
    title: "ERP Implementation for Tech Corp",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop",
    description: "Complete Oracle ERP implementation with custom modules"
  },
  {
    title: "Logistics Management System",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&h=500&fit=crop",
    description: "End-to-end logistics and supply chain management solution"
  },
  {
    title: "School Management Platform",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=500&fit=crop",
    description: "Comprehensive school management system with parent portal"
  }
];

export const team = [
  {
    name: "Ahmed Hassan",
    role: "CEO & Oracle Expert",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop",
    description: "15+ years of Oracle ERP implementation experience"
  },
  {
    name: "Sarah Mohamed",
    role: "Technical Lead",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop",
    description: "Expert in Windows desktop application development"
  },
  {
    name: "Omar Ali",
    role: "Project Manager",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
    description: "Certified PMP with 10+ years experience"
  }
];

export const partners = [
  {
    name: "Oracle Corporation",
    logo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&h=100&fit=crop",
  },
  {
    name: "Microsoft",
    logo: "https://images.unsplash.com/photo-1642132652075-2b0bfb5378ae?w=200&h=100&fit=crop",
  },
  {
    name: "SAP",
    logo: "https://images.unsplash.com/photo-1516387938699-a93567ec168e?w=200&h=100&fit=crop",
  },
  {
    name: "IBM",
    logo: "https://images.unsplash.com/photo-1557426272-fc759fdf7a8d?w=200&h=100&fit=crop",
  }
];