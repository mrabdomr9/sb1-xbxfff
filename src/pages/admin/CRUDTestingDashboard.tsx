import React, { useState, useEffect } from 'react';
import { 
  CheckCircle, 
  XCircle, 
  Clock, 
  AlertTriangle,
  Database,
  Plus,
  Edit,
  Trash2,
  Eye,
  FileText,
  Users,
  Building,
  Briefcase,
  Image,
  Settings,
  MessageSquare
} from 'lucide-react';
import { 
  useServices, 
  useProjects, 
  useClients, 
  usePartners, 
  useBrochures,
  useContactSubmissions,
  useSettings 
} from '../../hooks/useDatabaseIntegration';

interface TestResult {
  operation: string;
  status: 'pending' | 'success' | 'error' | 'warning' | 'skipped';
  message: string;
  timestamp: Date;
  duration?: number;
}

interface ModuleTestResults {
  moduleName: string;
  icon: React.ComponentType<any>;
  create: TestResult[];
  read: TestResult[];
  update: TestResult[];
  delete: TestResult[];
}

const CRUDTestingDashboard = () => {
  const [testResults, setTestResults] = useState<ModuleTestResults[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [currentTest, setCurrentTest] = useState<string>('');

  // Database hooks
  const servicesHook = useServices();
  const projectsHook = useProjects();
  const clientsHook = useClients();
  const partnersHook = usePartners();
  const brochuresHook = useBrochures();
  const contactsHook = useContactSubmissions();
  const settingsHook = useSettings();

  const modules = [
    {
      name: 'Services',
      icon: Database,
      hook: servicesHook,
      testData: {
        create: {
          title: 'Test Service CRUD',
          description: 'This is a test service for CRUD verification',
          features: ['Test Feature 1', 'Test Feature 2'],
          target_audience: ['Test Audience'],
          benefits: ['Test Benefit 1']
        },
        update: {
          title: 'Updated Test Service CRUD',
          description: 'This is an updated test service for CRUD verification'
        }
      },
      allowUpdate: true,
      allowDelete: true
    },
    {
      name: 'Projects',
      icon: Briefcase,
      hook: projectsHook,
      testData: {
        create: {
          title: 'Test Project CRUD',
          description: 'This is a test project for CRUD verification',
          image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop'
        },
        update: {
          title: 'Updated Test Project CRUD',
          description: 'This is an updated test project for CRUD verification'
        }
      },
      allowUpdate: true,
      allowDelete: true
    },
    {
      name: 'Clients',
      icon: Building,
      hook: clientsHook,
      testData: {
        create: {
          name: 'Test Client CRUD',
          logo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=600&h=400&fit=crop',
          description: 'This is a test client for CRUD verification'
        },
        update: {
          name: 'Updated Test Client CRUD',
          description: 'This is an updated test client for CRUD verification'
        }
      },
      allowUpdate: true,
      allowDelete: true
    },
    {
      name: 'Partners',
      icon: Users,
      hook: partnersHook,
      testData: {
        create: {
          name: 'Test Partner CRUD',
          logo: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&h=100&fit=crop'
        },
        update: {
          name: 'Updated Test Partner CRUD'
        }
      },
      allowUpdate: true,
      allowDelete: true
    },
    {
      name: 'Contact Submissions',
      icon: MessageSquare,
      hook: contactsHook,
      testData: {
        create: {
          name: 'Test Contact CRUD',
          email: 'test@example.com',
          phone: '1234567890',
          business_field: 'Testing',
          message: 'This is a test contact submission for CRUD verification'
        }
      },
      allowUpdate: false, // Contact submissions are read-only after creation
      allowDelete: false  // Contact submissions should not be deleted
    }
  ];

  const createTestResult = (operation: string, status: TestResult['status'], message: string, duration?: number): TestResult => ({
    operation,
    status,
    message,
    timestamp: new Date(),
    duration
  });

  const updateTestResults = (moduleName: string, operation: keyof Omit<ModuleTestResults, 'moduleName' | 'icon'>, result: TestResult) => {
    setTestResults(prev => {
      const moduleIndex = prev.findIndex(m => m.moduleName === moduleName);
      if (moduleIndex === -1) {
        const module = modules.find(m => m.name === moduleName);
        const newModule: ModuleTestResults = {
          moduleName,
          icon: module?.icon || Database,
          create: [],
          read: [],
          update: [],
          delete: []
        };
        newModule[operation].push(result);
        return [...prev, newModule];
      } else {
        const updated = [...prev];
        updated[moduleIndex][operation].push(result);
        return updated;
      }
    });
  };

  const testCreateOperation = async (module: any) => {
    const startTime = Date.now();
    setCurrentTest(`Testing CREATE for ${module.name}`);
    
    try {
      const result = await module.hook.create(module.testData.create);
      const duration = Date.now() - startTime;
      
      if (result.data) {
        updateTestResults(module.name, 'create', createTestResult(
          'CREATE',
          'success',
          `Successfully created ${module.name.toLowerCase()} record`,
          duration
        ));
        return result.data;
      } else {
        updateTestResults(module.name, 'create', createTestResult(
          'CREATE',
          'error',
          `Failed to create ${module.name.toLowerCase()}: ${result.error}`,
          duration
        ));
        return null;
      }
    } catch (error) {
      const duration = Date.now() - startTime;
      updateTestResults(module.name, 'create', createTestResult(
        'CREATE',
        'error',
        `Error creating ${module.name.toLowerCase()}: ${error instanceof Error ? error.message : 'Unknown error'}`,
        duration
      ));
      return null;
    }
  };

  const testReadOperation = async (module: any) => {
    const startTime = Date.now();
    setCurrentTest(`Testing READ for ${module.name}`);
    
    try {
      await module.hook.loadData();
      const duration = Date.now() - startTime;
      
      if (module.hook.data && Array.isArray(module.hook.data)) {
        updateTestResults(module.name, 'read', createTestResult(
          'READ',
          'success',
          `Successfully loaded ${module.hook.data.length} ${module.name.toLowerCase()} records`,
          duration
        ));
        return true;
      } else {
        updateTestResults(module.name, 'read', createTestResult(
          'READ',
          'warning',
          `No data found for ${module.name.toLowerCase()}`,
          duration
        ));
        return false;
      }
    } catch (error) {
      const duration = Date.now() - startTime;
      updateTestResults(module.name, 'read', createTestResult(
        'READ',
        'error',
        `Error reading ${module.name.toLowerCase()}: ${error instanceof Error ? error.message : 'Unknown error'}`,
        duration
      ));
      return false;
    }
  };

  const testUpdateOperation = async (module: any, recordId: string) => {
    if (!module.allowUpdate) {
      updateTestResults(module.name, 'update', createTestResult(
        'UPDATE',
        'skipped',
        `Update operation skipped - ${module.name.toLowerCase()} records are read-only after creation`,
        0
      ));
      return false;
    }

    const startTime = Date.now();
    setCurrentTest(`Testing UPDATE for ${module.name}`);
    
    try {
      const result = await module.hook.update(recordId, module.testData.update);
      const duration = Date.now() - startTime;
      
      if (result.data) {
        updateTestResults(module.name, 'update', createTestResult(
          'UPDATE',
          'success',
          `Successfully updated ${module.name.toLowerCase()} record`,
          duration
        ));
        return true;
      } else {
        updateTestResults(module.name, 'update', createTestResult(
          'UPDATE',
          'error',
          `Failed to update ${module.name.toLowerCase()}: ${result.error}`,
          duration
        ));
        return false;
      }
    } catch (error) {
      const duration = Date.now() - startTime;
      updateTestResults(module.name, 'update', createTestResult(
        'UPDATE',
        'error',
        `Error updating ${module.name.toLowerCase()}: ${error instanceof Error ? error.message : 'Unknown error'}`,
        duration
      ));
      return false;
    }
  };

  const testDeleteOperation = async (module: any, recordId: string) => {
    if (!module.allowDelete) {
      updateTestResults(module.name, 'delete', createTestResult(
        'DELETE',
        'skipped',
        `Delete operation skipped - ${module.name.toLowerCase()} records should be preserved for audit purposes`,
        0
      ));
      return false;
    }

    const startTime = Date.now();
    setCurrentTest(`Testing DELETE for ${module.name}`);
    
    try {
      const result = await module.hook.remove(recordId);
      const duration = Date.now() - startTime;
      
      if (result.data) {
        updateTestResults(module.name, 'delete', createTestResult(
          'DELETE',
          'success',
          `Successfully deleted ${module.name.toLowerCase()} record`,
          duration
        ));
        return true;
      } else {
        updateTestResults(module.name, 'delete', createTestResult(
          'DELETE',
          'error',
          `Failed to delete ${module.name.toLowerCase()}: ${result.error}`,
          duration
        ));
        return false;
      }
    } catch (error) {
      const duration = Date.now() - startTime;
      updateTestResults(module.name, 'delete', createTestResult(
        'DELETE',
        'error',
        `Error deleting ${module.name.toLowerCase()}: ${error instanceof Error ? error.message : 'Unknown error'}`,
        duration
      ));
      return false;
    }
  };

  const runAllTests = async () => {
    setIsRunning(true);
    setTestResults([]);
    
    for (const module of modules) {
      // Test READ operation first
      await testReadOperation(module);
      
      // Test CREATE operation
      const createdRecord = await testCreateOperation(module);
      
      if (createdRecord && createdRecord.id) {
        // Test UPDATE operation (if allowed)
        await testUpdateOperation(module, createdRecord.id);
        
        // Test DELETE operation (if allowed)
        await testDeleteOperation(module, createdRecord.id);
      } else {
        // If create failed, still test update and delete to show they're skipped
        if (!module.allowUpdate) {
          updateTestResults(module.name, 'update', createTestResult(
            'UPDATE',
            'skipped',
            `Update operation skipped - ${module.name.toLowerCase()} records are read-only after creation`,
            0
          ));
        }
        if (!module.allowDelete) {
          updateTestResults(module.name, 'delete', createTestResult(
            'DELETE',
            'skipped',
            `Delete operation skipped - ${module.name.toLowerCase()} records should be preserved for audit purposes`,
            0
          ));
        }
      }
      
      // Small delay between modules
      await new Promise(resolve => setTimeout(resolve, 500));
    }
    
    setCurrentTest('');
    setIsRunning(false);
  };

  const getStatusIcon = (status: TestResult['status']) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'error':
        return <XCircle className="w-4 h-4 text-red-500" />;
      case 'warning':
        return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
      case 'skipped':
        return <Clock className="w-4 h-4 text-blue-500" />;
      case 'pending':
        return <Clock className="w-4 h-4 text-gray-500" />;
      default:
        return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: TestResult['status']) => {
    switch (status) {
      case 'success':
        return 'bg-green-50 border-green-200';
      case 'error':
        return 'bg-red-50 border-red-200';
      case 'warning':
        return 'bg-yellow-50 border-yellow-200';
      case 'skipped':
        return 'bg-blue-50 border-blue-200';
      case 'pending':
        return 'bg-gray-50 border-gray-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  const calculateOverallStats = () => {
    const allResults = testResults.flatMap(module => [
      ...module.create,
      ...module.read,
      ...module.update,
      ...module.delete
    ]);

    const total = allResults.length;
    const success = allResults.filter(r => r.status === 'success').length;
    const errors = allResults.filter(r => r.status === 'error').length;
    const warnings = allResults.filter(r => r.status === 'warning').length;
    const skipped = allResults.filter(r => r.status === 'skipped').length;

    return { total, success, errors, warnings, skipped };
  };

  const stats = calculateOverallStats();

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">CRUD Operations Testing Dashboard</h1>
        <p className="text-gray-600 mb-6">
          Comprehensive testing of all Create, Read, Update, Delete operations for the admin dashboard
        </p>

        {/* Control Panel */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Test Controls</h2>
            <button
              onClick={runAllTests}
              disabled={isRunning}
              className="bg-[#04968d] text-white px-6 py-2 rounded-md hover:bg-opacity-90 disabled:opacity-50 flex items-center space-x-2"
            >
              {isRunning ? (
                <>
                  <Clock className="w-5 h-5 animate-spin" />
                  <span>Running Tests...</span>
                </>
              ) : (
                <>
                  <Database className="w-5 h-5" />
                  <span>Run All CRUD Tests</span>
                </>
              )}
            </button>
          </div>

          {isRunning && currentTest && (
            <div className="bg-blue-50 border border-blue-200 rounded-md p-3">
              <p className="text-blue-700 font-medium">{currentTest}</p>
            </div>
          )}
        </div>

        {/* Overall Statistics */}
        {stats.total > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
            <div className="bg-white p-4 rounded-lg shadow-md text-center">
              <div className="text-2xl font-bold text-gray-700">{stats.total}</div>
              <div className="text-sm text-gray-500">Total Tests</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md text-center">
              <div className="text-2xl font-bold text-green-600">{stats.success}</div>
              <div className="text-sm text-gray-500">Successful</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md text-center">
              <div className="text-2xl font-bold text-red-600">{stats.errors}</div>
              <div className="text-sm text-gray-500">Errors</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md text-center">
              <div className="text-2xl font-bold text-yellow-600">{stats.warnings}</div>
              <div className="text-sm text-gray-500">Warnings</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md text-center">
              <div className="text-2xl font-bold text-blue-600">{stats.skipped}</div>
              <div className="text-sm text-gray-500">Skipped</div>
            </div>
          </div>
        )}
      </div>

      {/* Test Results */}
      <div className="space-y-6">
        {testResults.map((module) => (
          <div key={module.moduleName} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="bg-gray-50 px-6 py-4 border-b">
              <div className="flex items-center space-x-3">
                <module.icon className="w-6 h-6 text-[#04968d]" />
                <h3 className="text-xl font-semibold">{module.moduleName}</h3>
              </div>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* CREATE Results */}
                <div>
                  <h4 className="font-medium text-gray-700 mb-3 flex items-center">
                    <Plus className="w-4 h-4 mr-2" />
                    CREATE Operations
                  </h4>
                  <div className="space-y-2">
                    {module.create.map((result, index) => (
                      <div key={index} className={`p-3 rounded-md border ${getStatusColor(result.status)}`}>
                        <div className="flex items-center justify-between mb-1">
                          {getStatusIcon(result.status)}
                          {result.duration && (
                            <span className="text-xs text-gray-500">{result.duration}ms</span>
                          )}
                        </div>
                        <p className="text-sm">{result.message}</p>
                        <p className="text-xs text-gray-500">{result.timestamp.toLocaleTimeString()}</p>
                      </div>
                    ))}
                    {module.create.length === 0 && (
                      <p className="text-gray-500 text-sm">No tests run</p>
                    )}
                  </div>
                </div>

                {/* READ Results */}
                <div>
                  <h4 className="font-medium text-gray-700 mb-3 flex items-center">
                    <Eye className="w-4 h-4 mr-2" />
                    READ Operations
                  </h4>
                  <div className="space-y-2">
                    {module.read.map((result, index) => (
                      <div key={index} className={`p-3 rounded-md border ${getStatusColor(result.status)}`}>
                        <div className="flex items-center justify-between mb-1">
                          {getStatusIcon(result.status)}
                          {result.duration && (
                            <span className="text-xs text-gray-500">{result.duration}ms</span>
                          )}
                        </div>
                        <p className="text-sm">{result.message}</p>
                        <p className="text-xs text-gray-500">{result.timestamp.toLocaleTimeString()}</p>
                      </div>
                    ))}
                    {module.read.length === 0 && (
                      <p className="text-gray-500 text-sm">No tests run</p>
                    )}
                  </div>
                </div>

                {/* UPDATE Results */}
                <div>
                  <h4 className="font-medium text-gray-700 mb-3 flex items-center">
                    <Edit className="w-4 h-4 mr-2" />
                    UPDATE Operations
                  </h4>
                  <div className="space-y-2">
                    {module.update.map((result, index) => (
                      <div key={index} className={`p-3 rounded-md border ${getStatusColor(result.status)}`}>
                        <div className="flex items-center justify-between mb-1">
                          {getStatusIcon(result.status)}
                          {result.duration && (
                            <span className="text-xs text-gray-500">{result.duration}ms</span>
                          )}
                        </div>
                        <p className="text-sm">{result.message}</p>
                        <p className="text-xs text-gray-500">{result.timestamp.toLocaleTimeString()}</p>
                      </div>
                    ))}
                    {module.update.length === 0 && (
                      <p className="text-gray-500 text-sm">No tests run</p>
                    )}
                  </div>
                </div>

                {/* DELETE Results */}
                <div>
                  <h4 className="font-medium text-gray-700 mb-3 flex items-center">
                    <Trash2 className="w-4 h-4 mr-2" />
                    DELETE Operations
                  </h4>
                  <div className="space-y-2">
                    {module.delete.map((result, index) => (
                      <div key={index} className={`p-3 rounded-md border ${getStatusColor(result.status)}`}>
                        <div className="flex items-center justify-between mb-1">
                          {getStatusIcon(result.status)}
                          {result.duration && (
                            <span className="text-xs text-gray-500">{result.duration}ms</span>
                          )}
                        </div>
                        <p className="text-sm">{result.message}</p>
                        <p className="text-xs text-gray-500">{result.timestamp.toLocaleTimeString()}</p>
                      </div>
                    ))}
                    {module.delete.length === 0 && (
                      <p className="text-gray-500 text-sm">No tests run</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {testResults.length === 0 && !isRunning && (
          <div className="bg-white p-12 rounded-lg shadow-md text-center">
            <Database className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No Tests Run Yet</h3>
            <p className="text-gray-500 mb-6">Click "Run All CRUD Tests" to start testing database operations</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CRUDTestingDashboard;