import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface ProjectPhase {
  id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  status: 'not-started' | 'in-progress' | 'completed' | 'on-hold' | 'cancelled';
  progress: number; // 0-100
  milestones: Milestone[];
  risks: Risk[];
}

interface Milestone {
  id: string;
  name: string;
  dueDate: string;
  status: 'pending' | 'completed' | 'overdue';
  deliverables: string[];
}

interface Risk {
  id: string;
  description: string;
  impact: 'low' | 'medium' | 'high' | 'critical';
  probability: 'low' | 'medium' | 'high';
  mitigation: string;
  status: 'identified' | 'mitigated' | 'closed';
}

interface OracleProject {
  id: string;
  name: string;
  client: {
    name: string;
    industry: string;
    contactPerson: string;
    email: string;
    phone: string;
  };
  description: string;
  oracleModules: string[];
  projectType: 'New Implementation' | 'Migration' | 'Upgrade' | 'Optimization' | 'Support';
  startDate: string;
  expectedEndDate: string;
  actualEndDate?: string;
  budget: {
    total: number;
    currency: 'SAR' | 'USD';
    spent: number;
  };
  teamMembers: TeamMember[];
  phases: ProjectPhase[];
  overallProgress: number;
  status: 'planning' | 'in-progress' | 'testing' | 'deployment' | 'completed' | 'on-hold' | 'cancelled';
  priority: 'low' | 'medium' | 'high' | 'critical';
  healthScore: 'green' | 'yellow' | 'red';
  lastUpdated: string;
  createdAt: string;
}

interface TeamMember {
  id: string;
  name: string;
  role: string;
  email: string;
  allocation: number; // percentage
}

const OracleProjectTracker = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState<OracleProject[]>([]);
  const [selectedProject, setSelectedProject] = useState<OracleProject | null>(null);
  const [activeView, setActiveView] = useState<'overview' | 'phases' | 'team' | 'risks'>('overview');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filters, setFilters] = useState({
    status: 'all',
    priority: 'all',
    projectType: 'all'
  });

  // Check authentication
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isAdminLoggedIn');
    if (!isLoggedIn || isLoggedIn !== 'true') {
      navigate('/admin/login');
      return;
    }
    loadProjects();
  }, [navigate]);

  const loadProjects = () => {
    const savedProjects = localStorage.getItem('oracleProjects');
    if (savedProjects) {
      setProjects(JSON.parse(savedProjects));
    } else {
      // Initialize with demo projects
      const demoProjects: OracleProject[] = [
        {
          id: 'proj-001',
          name: 'Aramco ERP Cloud Implementation',
          client: {
            name: 'Saudi Aramco',
            industry: 'Oil & Gas',
            contactPerson: 'Ahmed Al-Rashid',
            email: 'ahmed@aramco.com',
            phone: '+966 50 123 4567'
          },
          description: 'Complete Oracle ERP Cloud implementation for refinery operations including Financials, SCM, and HCM modules.',
          oracleModules: ['Oracle Financials Cloud', 'Oracle SCM Cloud', 'Oracle HCM Cloud', 'Oracle Analytics Cloud'],
          projectType: 'New Implementation',
          startDate: '2024-01-15',
          expectedEndDate: '2024-12-15',
          budget: {
            total: 5000000,
            currency: 'SAR',
            spent: 2800000
          },
          teamMembers: [
            { id: 't1', name: 'Omar Hassan', role: 'Project Manager', email: 'omar@activesoft.com', allocation: 100 },
            { id: 't2', name: 'Sara Ahmed', role: 'Oracle Technical Lead', email: 'sara@activesoft.com', allocation: 100 },
            { id: 't3', name: 'Ali Mahmoud', role: 'Functional Consultant', email: 'ali@activesoft.com', allocation: 80 },
            { id: 't4', name: 'Fatima Al-Zahra', role: 'Data Migration Specialist', email: 'fatima@activesoft.com', allocation: 60 }
          ],
          phases: [
            {
              id: 'phase1',
              name: 'Requirements Analysis',
              description: 'Detailed analysis of business requirements and current state assessment',
              startDate: '2024-01-15',
              endDate: '2024-03-15',
              status: 'completed',
              progress: 100,
              milestones: [
                {
                  id: 'm1',
                  name: 'Business Process Documentation',
                  dueDate: '2024-02-15',
                  status: 'completed',
                  deliverables: ['Process Flow Diagrams', 'Functional Requirements', 'Gap Analysis']
                }
              ],
              risks: []
            },
            {
              id: 'phase2',
              name: 'Solution Design',
              description: 'Technical and functional design of Oracle ERP solution',
              startDate: '2024-03-16',
              endDate: '2024-05-15',
              status: 'completed',
              progress: 100,
              milestones: [
                {
                  id: 'm2',
                  name: 'Technical Architecture',
                  dueDate: '2024-04-15',
                  status: 'completed',
                  deliverables: ['System Architecture', 'Integration Design', 'Security Framework']
                }
              ],
              risks: []
            },
            {
              id: 'phase3',
              name: 'Implementation',
              description: 'Oracle ERP configuration and customization',
              startDate: '2024-05-16',
              endDate: '2024-09-15',
              status: 'in-progress',
              progress: 70,
              milestones: [
                {
                  id: 'm3',
                  name: 'Core Modules Configuration',
                  dueDate: '2024-07-15',
                  status: 'completed',
                  deliverables: ['Financials Setup', 'Chart of Accounts', 'User Roles']
                },
                {
                  id: 'm4',
                  name: 'Data Migration',
                  dueDate: '2024-08-15',
                  status: 'pending',
                  deliverables: ['Master Data Migration', 'Transaction Data Migration', 'Data Validation']
                }
              ],
              risks: [
                {
                  id: 'r1',
                  description: 'Data quality issues in legacy system',
                  impact: 'medium',
                  probability: 'high',
                  mitigation: 'Additional data cleansing phase implemented',
                  status: 'mitigated'
                }
              ]
            },
            {
              id: 'phase4',
              name: 'Testing & Training',
              description: 'User acceptance testing and end-user training',
              startDate: '2024-09-16',
              endDate: '2024-11-15',
              status: 'not-started',
              progress: 0,
              milestones: [],
              risks: []
            },
            {
              id: 'phase5',
              name: 'Go-Live & Support',
              description: 'Production deployment and post go-live support',
              startDate: '2024-11-16',
              endDate: '2024-12-15',
              status: 'not-started',
              progress: 0,
              milestones: [],
              risks: []
            }
          ],
          overallProgress: 56,
          status: 'in-progress',
          priority: 'critical',
          healthScore: 'yellow',
          lastUpdated: new Date().toISOString(),
          createdAt: '2024-01-15T00:00:00.000Z'
        },
        {
          id: 'proj-002',
          name: 'SABIC Cloud Migration',
          client: {
            name: 'SABIC',
            industry: 'Chemicals',
            contactPerson: 'Fatima Al-Zahra',
            email: 'fatima@sabic.com',
            phone: '+966 55 987 6543'
          },
          description: 'Migration from Oracle EBS to Oracle Cloud ERP for improved scalability and performance.',
          oracleModules: ['Oracle Financials Cloud', 'Oracle SCM Cloud'],
          projectType: 'Migration',
          startDate: '2024-03-01',
          expectedEndDate: '2024-09-30',
          budget: {
            total: 2500000,
            currency: 'SAR',
            spent: 800000
          },
          teamMembers: [
            { id: 't5', name: 'Khalid Al-Mansouri', role: 'Migration Lead', email: 'khalid@activesoft.com', allocation: 100 },
            { id: 't6', name: 'Nora Hassan', role: 'Technical Architect', email: 'nora@activesoft.com', allocation: 80 }
          ],
          phases: [
            {
              id: 'phase1',
              name: 'Migration Assessment',
              description: 'Current state analysis and migration planning',
              startDate: '2024-03-01',
              endDate: '2024-04-30',
              status: 'completed',
              progress: 100,
              milestones: [],
              risks: []
            },
            {
              id: 'phase2',
              name: 'Cloud Environment Setup',
              description: 'Oracle Cloud infrastructure configuration',
              startDate: '2024-05-01',
              endDate: '2024-06-30',
              status: 'in-progress',
              progress: 45,
              milestones: [],
              risks: []
            }
          ],
          overallProgress: 32,
          status: 'in-progress',
          priority: 'high',
          healthScore: 'green',
          lastUpdated: new Date().toISOString(),
          createdAt: '2024-03-01T00:00:00.000Z'
        }
      ];
      setProjects(demoProjects);
      localStorage.setItem('oracleProjects', JSON.stringify(demoProjects));
    }
  };

  const saveProjects = (updatedProjects: OracleProject[]) => {
    setProjects(updatedProjects);
    localStorage.setItem('oracleProjects', JSON.stringify(updatedProjects));
  };

  const updateProjectProgress = (projectId: string, phaseId: string, newProgress: number) => {
    const updatedProjects = projects.map(project => {
      if (project.id === projectId) {
        const updatedPhases = project.phases.map(phase => {
          if (phase.id === phaseId) {
            return { ...phase, progress: newProgress };
          }
          return phase;
        });
        
        // Calculate overall progress
        const totalWeight = updatedPhases.length;
        const weightedProgress = updatedPhases.reduce((sum, phase) => sum + phase.progress, 0);
        const overallProgress = Math.round(weightedProgress / totalWeight);
        
        return {
          ...project,
          phases: updatedPhases,
          overallProgress,
          lastUpdated: new Date().toISOString()
        };
      }
      return project;
    });
    
    saveProjects(updatedProjects);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'planning': return 'bg-blue-100 text-blue-800';
      case 'in-progress': return 'bg-yellow-100 text-yellow-800';
      case 'testing': return 'bg-purple-100 text-purple-800';
      case 'deployment': return 'bg-orange-100 text-orange-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'on-hold': return 'bg-gray-100 text-gray-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getHealthScoreColor = (score: string) => {
    switch (score) {
      case 'green': return 'text-green-600';
      case 'yellow': return 'text-yellow-600';
      case 'red': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const filteredProjects = projects.filter(project => {
    if (filters.status !== 'all' && project.status !== filters.status) return false;
    if (filters.priority !== 'all' && project.priority !== filters.priority) return false;
    if (filters.projectType !== 'all' && project.projectType !== filters.projectType) return false;
    return true;
  });

  const projectStats = {
    total: projects.length,
    inProgress: projects.filter(p => p.status === 'in-progress').length,
    completed: projects.filter(p => p.status === 'completed').length,
    critical: projects.filter(p => p.priority === 'critical').length,
    atRisk: projects.filter(p => p.healthScore === 'red').length
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <span className="text-2xl">📊</span>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Oracle Project Tracker</h1>
                <p className="text-gray-600">Monitor Oracle ERP implementation projects and milestones</p>
              </div>
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-[#04968d] text-white px-6 py-3 rounded-lg hover:bg-opacity-90 transition-colors font-semibold flex items-center"
            >
              <span className="mr-2">➕</span>
              New Oracle Project
            </button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Stats Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Projects</p>
                <p className="text-2xl font-bold text-gray-800">{projectStats.total}</p>
              </div>
              <div className="text-3xl">📋</div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">In Progress</p>
                <p className="text-2xl font-bold text-blue-600">{projectStats.inProgress}</p>
              </div>
              <div className="text-3xl">🚀</div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Completed</p>
                <p className="text-2xl font-bold text-green-600">{projectStats.completed}</p>
              </div>
              <div className="text-3xl">✅</div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Critical Priority</p>
                <p className="text-2xl font-bold text-red-600">{projectStats.critical}</p>
              </div>
              <div className="text-3xl">🚨</div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">At Risk</p>
                <p className="text-2xl font-bold text-orange-600">{projectStats.atRisk}</p>
              </div>
              <div className="text-3xl">⚠️</div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
              <select
                value={filters.status}
                onChange={(e) => setFilters({...filters, status: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#04968d] focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="planning">Planning</option>
                <option value="in-progress">In Progress</option>
                <option value="testing">Testing</option>
                <option value="deployment">Deployment</option>
                <option value="completed">Completed</option>
                <option value="on-hold">On Hold</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
              <select
                value={filters.priority}
                onChange={(e) => setFilters({...filters, priority: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#04968d] focus:border-transparent"
              >
                <option value="all">All Priorities</option>
                <option value="critical">Critical</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Project Type</label>
              <select
                value={filters.projectType}
                onChange={(e) => setFilters({...filters, projectType: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#04968d] focus:border-transparent"
              >
                <option value="all">All Types</option>
                <option value="New Implementation">New Implementation</option>
                <option value="Migration">Migration</option>
                <option value="Upgrade">Upgrade</option>
                <option value="Optimization">Optimization</option>
                <option value="Support">Support</option>
              </select>
            </div>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => setSelectedProject(project)}
            >
              <div className="p-6">
                {/* Project Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-800 mb-1">{project.name}</h3>
                    <p className="text-sm text-gray-600">{project.client.name} • {project.client.industry}</p>
                  </div>
                  <div className={`w-3 h-3 rounded-full ${getHealthScoreColor(project.healthScore)}`} title={`Health Score: ${project.healthScore}`}>
                    ●
                  </div>
                </div>

                {/* Project Details */}
                <div className="space-y-3 mb-4">
                  <div className="flex items-center justify-between">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                      {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(project.priority)}`}>
                      {project.priority.charAt(0).toUpperCase() + project.priority.slice(1)}
                    </span>
                  </div>

                  <div className="text-sm text-gray-600">
                    <div>Type: {project.projectType}</div>
                    <div>Modules: {project.oracleModules.length}</div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Overall Progress</span>
                    <span className="text-sm font-bold text-gray-800">{project.overallProgress}%</span>
                  </div>
                  <div className="bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-[#04968d] h-2 rounded-full transition-all duration-300"
                      style={{ width: `${project.overallProgress}%` }}
                    ></div>
                  </div>
                </div>

                {/* Budget Information */}
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Budget</span>
                    <span className="font-medium">
                      {project.budget.spent.toLocaleString()} / {project.budget.total.toLocaleString()} {project.budget.currency}
                    </span>
                  </div>
                  <div className="mt-2 bg-gray-200 rounded-full h-1">
                    <div 
                      className="bg-blue-500 h-1 rounded-full"
                      style={{ width: `${Math.min((project.budget.spent / project.budget.total) * 100, 100)}%` }}
                    ></div>
                  </div>
                </div>

                {/* Dates */}
                <div className="mt-4 text-xs text-gray-500">
                  <div>Start: {new Date(project.startDate).toLocaleDateString()}</div>
                  <div>Expected End: {new Date(project.expectedEndDate).toLocaleDateString()}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Project Detail Modal */}
      {selectedProject && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden">
            {/* Modal Header */}
            <div className="bg-[#04968d] text-white p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold">{selectedProject.name}</h2>
                  <p className="text-lg opacity-90">{selectedProject.client.name}</p>
                </div>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="text-white hover:bg-white/20 p-2 rounded-lg transition-colors"
                >
                  ✕
                </button>
              </div>

              {/* Navigation Tabs */}
              <div className="flex space-x-4 mt-6">
                {['overview', 'phases', 'team', 'risks'].map((view) => (
                  <button
                    key={view}
                    onClick={() => setActiveView(view as any)}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      activeView === view
                        ? 'bg-white text-[#04968d]'
                        : 'text-white hover:bg-white/20'
                    }`}
                  >
                    {view.charAt(0).toUpperCase() + view.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-6 overflow-y-auto max-h-[70vh]">
              {/* Overview Tab */}
              {activeView === 'overview' && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-4">Project Information</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium text-gray-600">Description</label>
                        <p className="text-gray-800">{selectedProject.description}</p>
                      </div>
                      
                      <div>
                        <label className="text-sm font-medium text-gray-600">Oracle Modules</label>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {selectedProject.oracleModules.map((module, index) => (
                            <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                              {module}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium text-gray-600">Project Type</label>
                          <p className="text-gray-800">{selectedProject.projectType}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-600">Priority</label>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(selectedProject.priority)}`}>
                            {selectedProject.priority.charAt(0).toUpperCase() + selectedProject.priority.slice(1)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-4">Client Information</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium text-gray-600">Company</label>
                        <p className="text-gray-800">{selectedProject.client.name}</p>
                      </div>
                      
                      <div>
                        <label className="text-sm font-medium text-gray-600">Industry</label>
                        <p className="text-gray-800">{selectedProject.client.industry}</p>
                      </div>
                      
                      <div>
                        <label className="text-sm font-medium text-gray-600">Contact Person</label>
                        <p className="text-gray-800">{selectedProject.client.contactPerson}</p>
                      </div>
                      
                      <div className="grid grid-cols-1 gap-2">
                        <div>
                          <label className="text-sm font-medium text-gray-600">Email</label>
                          <p className="text-gray-800">{selectedProject.client.email}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-600">Phone</label>
                          <p className="text-gray-800">{selectedProject.client.phone}</p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6">
                      <h4 className="text-lg font-semibold text-gray-800 mb-3">Budget Overview</h4>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-gray-600">Total Budget</span>
                          <span className="font-bold text-gray-800">
                            {selectedProject.budget.total.toLocaleString()} {selectedProject.budget.currency}
                          </span>
                        </div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-gray-600">Spent</span>
                          <span className="font-bold text-gray-800">
                            {selectedProject.budget.spent.toLocaleString()} {selectedProject.budget.currency}
                          </span>
                        </div>
                        <div className="bg-gray-200 rounded-full h-3 mt-3">
                          <div 
                            className="bg-[#04968d] h-3 rounded-full"
                            style={{ width: `${Math.min((selectedProject.budget.spent / selectedProject.budget.total) * 100, 100)}%` }}
                          ></div>
                        </div>
                        <div className="text-sm text-gray-600 mt-1">
                          {((selectedProject.budget.spent / selectedProject.budget.total) * 100).toFixed(1)}% utilized
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Phases Tab */}
              {activeView === 'phases' && (
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-6">Project Phases</h3>
                  <div className="space-y-6">
                    {selectedProject.phases.map((phase, index) => (
                      <div key={phase.id} className="border border-gray-200 rounded-xl p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center space-x-4">
                            <div className="w-8 h-8 bg-[#04968d] text-white rounded-full flex items-center justify-center font-bold">
                              {index + 1}
                            </div>
                            <div>
                              <h4 className="text-lg font-semibold text-gray-800">{phase.name}</h4>
                              <p className="text-gray-600 text-sm">{phase.description}</p>
                            </div>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(phase.status)}`}>
                            {phase.status.replace('-', ' ').charAt(0).toUpperCase() + phase.status.replace('-', ' ').slice(1)}
                          </span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                          <div>
                            <label className="text-sm font-medium text-gray-600">Start Date</label>
                            <p className="text-gray-800">{new Date(phase.startDate).toLocaleDateString()}</p>
                          </div>
                          <div>
                            <label className="text-sm font-medium text-gray-600">End Date</label>
                            <p className="text-gray-800">{new Date(phase.endDate).toLocaleDateString()}</p>
                          </div>
                          <div>
                            <label className="text-sm font-medium text-gray-600">Progress</label>
                            <div className="flex items-center space-x-2">
                              <input
                                type="range"
                                min="0"
                                max="100"
                                value={phase.progress}
                                onChange={(e) => updateProjectProgress(selectedProject.id, phase.id, Number(e.target.value))}
                                className="flex-1"
                              />
                              <span className="text-sm font-bold w-10">{phase.progress}%</span>
                            </div>
                          </div>
                        </div>

                        {phase.milestones.length > 0 && (
                          <div>
                            <h5 className="font-medium text-gray-800 mb-2">Milestones</h5>
                            <div className="space-y-2">
                              {phase.milestones.map((milestone) => (
                                <div key={milestone.id} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                                  <div>
                                    <div className="font-medium text-gray-800">{milestone.name}</div>
                                    <div className="text-sm text-gray-600">Due: {new Date(milestone.dueDate).toLocaleDateString()}</div>
                                  </div>
                                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                    milestone.status === 'completed' ? 'bg-green-100 text-green-800' :
                                    milestone.status === 'overdue' ? 'bg-red-100 text-red-800' :
                                    'bg-yellow-100 text-yellow-800'
                                  }`}>
                                    {milestone.status}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Team Tab */}
              {activeView === 'team' && (
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-6">Project Team</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {selectedProject.teamMembers.map((member) => (
                      <div key={member.id} className="bg-gray-50 rounded-xl p-6">
                        <div className="flex items-center space-x-4 mb-4">
                          <div className="w-12 h-12 bg-[#04968d] text-white rounded-full flex items-center justify-center font-bold text-lg">
                            {member.name.charAt(0)}
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-800">{member.name}</h4>
                            <p className="text-gray-600">{member.role}</p>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <div>
                            <label className="text-sm font-medium text-gray-600">Email</label>
                            <p className="text-gray-800">{member.email}</p>
                          </div>
                          <div>
                            <label className="text-sm font-medium text-gray-600">Allocation</label>
                            <div className="flex items-center space-x-2">
                              <div className="bg-gray-200 rounded-full h-2 flex-1">
                                <div 
                                  className="bg-[#04968d] h-2 rounded-full"
                                  style={{ width: `${member.allocation}%` }}
                                ></div>
                              </div>
                              <span className="text-sm font-medium">{member.allocation}%</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Risks Tab */}
              {activeView === 'risks' && (
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-6">Project Risks</h3>
                  {selectedProject.phases.some(phase => phase.risks.length > 0) ? (
                    <div className="space-y-6">
                      {selectedProject.phases.map((phase) => (
                        phase.risks.length > 0 && (
                          <div key={phase.id}>
                            <h4 className="text-lg font-semibold text-gray-800 mb-4">{phase.name}</h4>
                            <div className="space-y-4">
                              {phase.risks.map((risk) => (
                                <div key={risk.id} className="border border-gray-200 rounded-xl p-6">
                                  <div className="flex items-start justify-between mb-4">
                                    <div className="flex-1">
                                      <h5 className="font-semibold text-gray-800 mb-2">{risk.description}</h5>
                                      <p className="text-gray-600 text-sm">{risk.mitigation}</p>
                                    </div>
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                      risk.status === 'closed' ? 'bg-green-100 text-green-800' :
                                      risk.status === 'mitigated' ? 'bg-yellow-100 text-yellow-800' :
                                      'bg-red-100 text-red-800'
                                    }`}>
                                      {risk.status}
                                    </span>
                                  </div>
                                  
                                  <div className="grid grid-cols-2 gap-4">
                                    <div>
                                      <label className="text-sm font-medium text-gray-600">Impact</label>
                                      <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                                        risk.impact === 'critical' ? 'bg-red-100 text-red-800' :
                                        risk.impact === 'high' ? 'bg-orange-100 text-orange-800' :
                                        risk.impact === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                                        'bg-green-100 text-green-800'
                                      }`}>
                                        {risk.impact}
                                      </span>
                                    </div>
                                    <div>
                                      <label className="text-sm font-medium text-gray-600">Probability</label>
                                      <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                                        risk.probability === 'high' ? 'bg-red-100 text-red-800' :
                                        risk.probability === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                                        'bg-green-100 text-green-800'
                                      }`}>
                                        {risk.probability}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )
                      ))}
                    </div>
                  ) : (
                    <div className="text-center text-gray-500 py-12">
                      <div className="text-4xl mb-4">🎯</div>
                      <p>No risks identified for this project</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OracleProjectTracker;