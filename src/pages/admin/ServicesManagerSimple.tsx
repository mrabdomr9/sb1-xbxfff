import React, { useState } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';

interface Service {
  id: number;
  title: string;
  description: string;
  features: string[];
  benefits: string[];
  targetAudience: string[];
  isActive: boolean;
}

const ServicesManagerSimple = () => {
  const [services, setServices] = useState<Service[]>([
    {
      id: 1,
      title: 'Oracle ERP Implementation',
      description: 'Complete Oracle ERP solutions for enterprise businesses',
      features: ['Oracle Cloud Applications', 'Custom ERP Development', 'System Integration'],
      benefits: ['Streamlined Operations', 'Real-time Analytics', 'Cost Reduction'],
      targetAudience: ['Large Enterprises', 'Manufacturing', 'Finance'],
      isActive: true
    },
    {
      id: 2,
      title: 'Windows Desktop Applications',
      description: 'Powerful desktop solutions built with modern Windows technologies',
      features: ['.NET Framework Development', 'WPF & UWP Applications', 'Database Integration'],
      benefits: ['High Performance', 'Offline Capability', 'Rich User Interface'],
      targetAudience: ['SMBs', 'Enterprises', 'Government'],
      isActive: true
    },
    {
      id: 3,
      title: 'Web Development Solutions',
      description: 'Modern web applications and enterprise portals',
      features: ['React & TypeScript', 'Enterprise Portals', 'API Development'],
      benefits: ['Global Accessibility', 'Cross-platform', 'Easy Maintenance'],
      targetAudience: ['All Business Sizes', 'E-commerce', 'SaaS'],
      isActive: false
    }
  ]);

  const [editingService, setEditingService] = useState<Service | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);

  const handleToggleActive = (id: number) => {
    setServices(services.map(service => 
      service.id === id ? { ...service, isActive: !service.isActive } : service
    ));
  };

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this service?')) {
      setServices(services.filter(service => service.id !== id));
    }
  };

  const handleEdit = (service: Service) => {
    setEditingService(service);
  };

  const handleSave = () => {
    if (editingService) {
      setServices(services.map(service => 
        service.id === editingService.id ? editingService : service
      ));
      setEditingService(null);
    }
  };

  return (
    <AdminLayout 
      title="Services Manager" 
      description="Manage your service offerings and descriptions"
    >
      {/* Action Buttons */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-[#04968d] text-white px-6 py-3 rounded-lg hover:bg-opacity-90 transition-colors flex items-center space-x-2"
        >
          <span>➕</span>
          <span>Add New Service</span>
        </button>
        
        <div className="text-sm text-gray-600">
          Total Services: {services.length} | Active: {services.filter(s => s.isActive).length}
        </div>
      </div>

      {/* Services List */}
      <div className="space-y-6">
        {services.map((service) => (
          <div key={service.id} className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="text-xl font-semibold text-gray-800">{service.title}</h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    service.isActive 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {service.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>
                <p className="text-gray-600 mb-4">{service.description}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-2">Features:</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {service.features.map((feature, index) => (
                        <li key={index}>• {feature}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-2">Benefits:</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {service.benefits.map((benefit, index) => (
                        <li key={index}>• {benefit}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-2">Target Audience:</h4>
                    <div className="flex flex-wrap gap-1">
                      {service.targetAudience.map((audience, index) => (
                        <span key={index} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                          {audience}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex space-x-2 ml-4">
                <button
                  onClick={() => handleEdit(service)}
                  className="bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600 transition-colors"
                >
                  ✏️ Edit
                </button>
                <button
                  onClick={() => handleToggleActive(service.id)}
                  className={`px-3 py-2 rounded transition-colors ${
                    service.isActive
                      ? 'bg-yellow-500 text-white hover:bg-yellow-600'
                      : 'bg-green-500 text-white hover:bg-green-600'
                  }`}
                >
                  {service.isActive ? '⏸️ Deactivate' : '▶️ Activate'}
                </button>
                <button
                  onClick={() => handleDelete(service.id)}
                  className="bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600 transition-colors"
                >
                  🗑️ Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      {editingService && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-6">Edit Service</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                <input
                  type="text"
                  value={editingService.title}
                  onChange={(e) => setEditingService({...editingService, title: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#04968d]"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  value={editingService.description}
                  onChange={(e) => setEditingService({...editingService, description: e.target.value})}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#04968d]"
                />
              </div>
            </div>
            
            <div className="flex space-x-4 mt-6">
              <button
                onClick={handleSave}
                className="bg-[#04968d] text-white px-6 py-2 rounded-lg hover:bg-opacity-90"
              >
                Save Changes
              </button>
              <button
                onClick={() => setEditingService(null)}
                className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Form Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 max-w-2xl w-full">
            <h2 className="text-2xl font-bold mb-6">Add New Service</h2>
            <p className="text-gray-600 mb-4">Add new service form would go here...</p>
            
            <div className="flex space-x-4">
              <button
                onClick={() => setShowAddForm(false)}
                className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default ServicesManagerSimple;