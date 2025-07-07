import { Database, Monitor, Users, Building, Image, FileText, Settings, MessageSquare, Briefcase, Building2, TestTube, Upload } from 'lucide-react';

export const dashboardCards = [
  {
    title: 'Manage Services',
    description: 'Update service offerings and descriptions',
    icon: Database,
    link: '/admin/services'
  },
  {
    title: 'Manage Projects',
    description: 'Update latest projects showcase',
    icon: Briefcase,
    link: '/admin/projects'
  },
  {
    title: 'Manage Clients',
    description: 'Update client portfolio',
    icon: Building2,
    link: '/admin/clients'
  },
  {
    title: 'Manage Partners',
    description: 'Update partner companies',
    icon: Building,
    link: '/admin/partners'
  },
  {
    title: 'Manage Users',
    description: 'Add or remove admin users',
    icon: Users,
    link: '/admin/users'
  },
  {
    title: 'Manage Logo',
    description: 'Update company logo',
    icon: Image,
    link: '/admin/logo'
  },
  {
    title: 'Manage Brochures',
    description: 'Update service brochures',
    icon: FileText,
    link: '/admin/brochures'
  },
  {
    title: 'Settings',
    description: 'Update your profile and password',
    icon: Settings,
    link: '/admin/settings'
  },
  {
    title: 'Contact Submissions',
    description: 'View and manage contact form submissions',
    icon: MessageSquare,
    link: '/admin/contacts'
  },
  {
    title: 'Portfolio Manager',
    description: 'Populate comprehensive portfolio data',
    icon: Upload,
    link: '/admin/portfolio'
  },
  {
    title: 'CRUD Testing',
    description: 'Test all database operations',
    icon: TestTube,
    link: '/admin/crud-testing'
  }
];