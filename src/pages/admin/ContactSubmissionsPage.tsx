import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SimpleTable from '../../components/SimpleTable';

interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  service: string;
  message: string;
  submittedAt: string;
  status: 'new' | 'contacted' | 'in-progress' | 'closed';
  priority: 'low' | 'medium' | 'high';
  notes: string;
  assignedTo?: string;
  followUpDate?: string;
}

const ContactSubmissionsPage = () => {
  const navigate = useNavigate();
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
  const [filteredSubmissions, setFilteredSubmissions] = useState<ContactSubmission[]>([]);
  const [selectedSubmission, setSelectedSubmission] = useState<ContactSubmission | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filters, setFilters] = useState({
    status: 'all',
    priority: 'all',
    service: 'all',
    dateRange: 'all'
  });
  const [searchTerm, setSearchTerm] = useState('');

  // Check authentication
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isAdminLoggedIn');
    if (!isLoggedIn || isLoggedIn !== 'true') {
      navigate('/admin/login');
      return;
    }
    loadSubmissions();
  }, [navigate]);

  // Apply filters when filters or submissions change
  useEffect(() => {
    applyFilters();
  }, [submissions, filters, searchTerm]);

  const loadSubmissions = () => {
    // Load from localStorage or initialize with demo data
    const savedSubmissions = localStorage.getItem('contactSubmissions');
    if (savedSubmissions) {
      setSubmissions(JSON.parse(savedSubmissions));
    } else {
      // Demo data
      const demoSubmissions: ContactSubmission[] = [
        {
          id: '1',
          name: 'Ahmed Al-Rashid',
          email: 'ahmed@aramco.com',
          phone: '+966 50 123 4567',
          company: 'Saudi Aramco',
          service: 'Oracle ERP Implementation',
          message: 'We are looking to implement Oracle ERP for our refinery operations. We need a comprehensive solution that can handle complex manufacturing processes.',
          submittedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
          status: 'new',
          priority: 'high',
          notes: '',
          assignedTo: ''
        },
        {
          id: '2',
          name: 'Fatima Al-Zahra',
          email: 'fatima@sabic.com',
          phone: '+966 55 987 6543',
          company: 'SABIC',
          service: 'Oracle Cloud Migration Services',
          message: 'We currently use Oracle EBS and want to migrate to Oracle Cloud. Need consultation on migration strategy and timeline.',
          submittedAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(), // 6 hours ago
          status: 'contacted',
          priority: 'medium',
          notes: 'Initial call scheduled for tomorrow',
          assignedTo: 'Omar Hassan'
        },
        {
          id: '3',
          name: 'Mohammad Al-Faisal',
          email: 'mohammad@stc.com.sa',
          phone: '+966 56 234 5678',
          company: 'Saudi Telecom Company',
          service: 'Oracle ERP Support & Maintenance',
          message: 'Looking for 24/7 support services for our existing Oracle ERP system. Need pricing and SLA details.',
          submittedAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
          status: 'in-progress',
          priority: 'medium',
          notes: 'Proposal sent, waiting for response',
          assignedTo: 'Sara Ahmed'
        },
        {
          id: '4',
          name: 'Khalid Al-Mansouri',
          email: 'khalid@almarai.com',
          phone: '+966 54 345 6789',
          company: 'Almarai',
          service: 'Oracle ERP Optimization & Consulting',
          message: 'Our Oracle ERP system is running slow and we need performance optimization. Also looking for process improvements.',
          submittedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
          status: 'closed',
          priority: 'low',
          notes: 'Project completed successfully',
          assignedTo: 'Ali Mahmoud'
        }
      ];
      setSubmissions(demoSubmissions);
      localStorage.setItem('contactSubmissions', JSON.stringify(demoSubmissions));
    }
  };

  const saveSubmissions = (updatedSubmissions: ContactSubmission[]) => {
    setSubmissions(updatedSubmissions);
    localStorage.setItem('contactSubmissions', JSON.stringify(updatedSubmissions));
  };

  const applyFilters = () => {
    let filtered = [...submissions];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(submission =>
        submission.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        submission.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        submission.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        submission.message.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Status filter
    if (filters.status !== 'all') {
      filtered = filtered.filter(submission => submission.status === filters.status);
    }

    // Priority filter
    if (filters.priority !== 'all') {
      filtered = filtered.filter(submission => submission.priority === filters.priority);
    }

    // Service filter
    if (filters.service !== 'all') {
      filtered = filtered.filter(submission => submission.service === filters.service);
    }

    // Date range filter
    if (filters.dateRange !== 'all') {
      const now = new Date();
      const filterDate = new Date();
      
      switch (filters.dateRange) {
        case 'today':
          filterDate.setHours(0, 0, 0, 0);
          break;
        case 'week':
          filterDate.setDate(now.getDate() - 7);
          break;
        case 'month':
          filterDate.setMonth(now.getMonth() - 1);
          break;
      }
      
      filtered = filtered.filter(submission => 
        new Date(submission.submittedAt) >= filterDate
      );
    }

    // Sort by submission date (newest first)
    filtered.sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime());

    setFilteredSubmissions(filtered);
  };

  const updateSubmissionStatus = (id: string, status: ContactSubmission['status']) => {
    const updatedSubmissions = submissions.map(submission =>
      submission.id === id ? { ...submission, status, notes: `Status updated to ${status}` } : submission
    );
    saveSubmissions(updatedSubmissions);
  };

  const updateSubmissionPriority = (id: string, priority: ContactSubmission['priority']) => {
    const updatedSubmissions = submissions.map(submission =>
      submission.id === id ? { ...submission, priority } : submission
    );
    saveSubmissions(updatedSubmissions);
  };

  const viewSubmission = (submission: ContactSubmission) => {
    setSelectedSubmission(submission);
    setIsModalOpen(true);
  };

  const updateSubmission = (updatedSubmission: ContactSubmission) => {
    const updatedSubmissions = submissions.map(submission =>
      submission.id === updatedSubmission.id ? updatedSubmission : submission
    );
    saveSubmissions(updatedSubmissions);
    setIsModalOpen(false);
    setSelectedSubmission(null);
  };

  const deleteSubmission = (submission: ContactSubmission) => {
    if (window.confirm(`Are you sure you want to delete the submission from ${submission.name}?`)) {
      const updatedSubmissions = submissions.filter(s => s.id !== submission.id);
      saveSubmissions(updatedSubmissions);
    }
  };

  const exportToCSV = () => {
    const csvContent = [
      ['Name', 'Email', 'Phone', 'Company', 'Service', 'Status', 'Priority', 'Submitted At', 'Message'],
      ...filteredSubmissions.map(sub => [
        sub.name,
        sub.email,
        sub.phone,
        sub.company,
        sub.service,
        sub.status,
        sub.priority,
        new Date(sub.submittedAt).toLocaleString(),
        sub.message.replace(/,/g, ';') // Replace commas to avoid CSV issues
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `contact-submissions-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const getTimeAgo = (dateString: string) => {
    const diff = Date.now() - new Date(dateString).getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
    if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    if (minutes > 0) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    return 'Just now';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-800';
      case 'contacted': return 'bg-yellow-100 text-yellow-800';
      case 'in-progress': return 'bg-purple-100 text-purple-800';
      case 'closed': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-orange-100 text-orange-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const columns = [
    {
      key: 'name',
      header: 'Contact Info',
      render: (value: string, row: ContactSubmission) => (
        <div>
          <div className="font-semibold text-gray-800">{value}</div>
          <div className="text-sm text-gray-500">{row.email}</div>
          <div className="text-sm text-gray-500">{row.company}</div>
        </div>
      )
    },
    {
      key: 'service',
      header: 'Service',
      render: (value: string) => (
        <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-sm">{value}</span>
      )
    },
    {
      key: 'status',
      header: 'Status',
      render: (value: string, row: ContactSubmission) => (
        <select
          value={value}
          onChange={(e) => updateSubmissionStatus(row.id, e.target.value as ContactSubmission['status'])}
          className={`px-2 py-1 rounded text-sm font-medium border-0 cursor-pointer ${getStatusColor(value)}`}
        >
          <option value="new">New</option>
          <option value="contacted">Contacted</option>
          <option value="in-progress">In Progress</option>
          <option value="closed">Closed</option>
        </select>
      )
    },
    {
      key: 'priority',
      header: 'Priority',
      render: (value: string, row: ContactSubmission) => (
        <select
          value={value}
          onChange={(e) => updateSubmissionPriority(row.id, e.target.value as ContactSubmission['priority'])}
          className={`px-2 py-1 rounded text-sm font-medium border-0 cursor-pointer ${getPriorityColor(value)}`}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      )
    },
    {
      key: 'submittedAt',
      header: 'Submitted',
      render: (value: string) => (
        <div>
          <div className="text-sm text-gray-800">{new Date(value).toLocaleDateString()}</div>
          <div className="text-xs text-gray-500">{getTimeAgo(value)}</div>
        </div>
      )
    }
  ];

  const stats = {
    total: submissions.length,
    new: submissions.filter(s => s.status === 'new').length,
    contacted: submissions.filter(s => s.status === 'contacted').length,
    inProgress: submissions.filter(s => s.status === 'in-progress').length,
    closed: submissions.filter(s => s.status === 'closed').length,
    high: submissions.filter(s => s.priority === 'high').length
  };

  const services = [...new Set(submissions.map(s => s.service))];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <span className="text-2xl">💬</span>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Contact Submissions</h1>
                <p className="text-gray-600">Manage and respond to contact form submissions</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={exportToCSV}
                className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors font-medium flex items-center"
              >
                <span className="mr-2">📊</span>
                Export CSV
              </button>
              <div className="text-sm text-gray-500">
                {filteredSubmissions.length} of {submissions.length} submissions
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total</p>
                <p className="text-2xl font-bold text-gray-800">{stats.total}</p>
              </div>
              <div className="text-3xl">📧</div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">New</p>
                <p className="text-2xl font-bold text-blue-600">{stats.new}</p>
              </div>
              <div className="text-3xl">🆕</div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Contacted</p>
                <p className="text-2xl font-bold text-yellow-600">{stats.contacted}</p>
              </div>
              <div className="text-3xl">📞</div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">In Progress</p>
                <p className="text-2xl font-bold text-purple-600">{stats.inProgress}</p>
              </div>
              <div className="text-3xl">⏳</div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Closed</p>
                <p className="text-2xl font-bold text-green-600">{stats.closed}</p>
              </div>
              <div className="text-3xl">✅</div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">High Priority</p>
                <p className="text-2xl font-bold text-red-600">{stats.high}</p>
              </div>
              <div className="text-3xl">🚨</div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* Search */}
            <div>
              <input
                type="text"
                placeholder="Search submissions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#04968d] focus:border-transparent"
              />
            </div>

            {/* Status Filter */}
            <div>
              <select
                value={filters.status}
                onChange={(e) => setFilters({...filters, status: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#04968d] focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="new">New</option>
                <option value="contacted">Contacted</option>
                <option value="in-progress">In Progress</option>
                <option value="closed">Closed</option>
              </select>
            </div>

            {/* Priority Filter */}
            <div>
              <select
                value={filters.priority}
                onChange={(e) => setFilters({...filters, priority: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#04968d] focus:border-transparent"
              >
                <option value="all">All Priority</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>

            {/* Service Filter */}
            <div>
              <select
                value={filters.service}
                onChange={(e) => setFilters({...filters, service: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#04968d] focus:border-transparent"
              >
                <option value="all">All Services</option>
                {services.map(service => (
                  <option key={service} value={service}>{service}</option>
                ))}
              </select>
            </div>

            {/* Date Range Filter */}
            <div>
              <select
                value={filters.dateRange}
                onChange={(e) => setFilters({...filters, dateRange: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#04968d] focus:border-transparent"
              >
                <option value="all">All Time</option>
                <option value="today">Today</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
              </select>
            </div>
          </div>
        </div>

        {/* Submissions Table */}
        <SimpleTable
          columns={columns}
          data={filteredSubmissions}
          onView={viewSubmission}
          onDelete={deleteSubmission}
        />
      </div>

      {/* Submission Detail Modal */}
      {isModalOpen && selectedSubmission && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="bg-[#04968d] text-white p-6 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Contact Submission Details</h2>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-white hover:bg-white/20 p-2 rounded-lg transition-colors"
                >
                  ✕
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Contact Information */}
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">Contact Information</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                      <input
                        type="text"
                        value={selectedSubmission.name}
                        onChange={(e) => setSelectedSubmission({...selectedSubmission, name: e.target.value})}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#04968d] focus:border-transparent"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <input
                        type="email"
                        value={selectedSubmission.email}
                        onChange={(e) => setSelectedSubmission({...selectedSubmission, email: e.target.value})}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#04968d] focus:border-transparent"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                      <input
                        type="tel"
                        value={selectedSubmission.phone}
                        onChange={(e) => setSelectedSubmission({...selectedSubmission, phone: e.target.value})}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#04968d] focus:border-transparent"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                      <input
                        type="text"
                        value={selectedSubmission.company}
                        onChange={(e) => setSelectedSubmission({...selectedSubmission, company: e.target.value})}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#04968d] focus:border-transparent"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Service of Interest</label>
                      <input
                        type="text"
                        value={selectedSubmission.service}
                        onChange={(e) => setSelectedSubmission({...selectedSubmission, service: e.target.value})}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#04968d] focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>

                {/* Management */}
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">Management</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                      <select
                        value={selectedSubmission.status}
                        onChange={(e) => setSelectedSubmission({...selectedSubmission, status: e.target.value as ContactSubmission['status']})}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#04968d] focus:border-transparent"
                      >
                        <option value="new">New</option>
                        <option value="contacted">Contacted</option>
                        <option value="in-progress">In Progress</option>
                        <option value="closed">Closed</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                      <select
                        value={selectedSubmission.priority}
                        onChange={(e) => setSelectedSubmission({...selectedSubmission, priority: e.target.value as ContactSubmission['priority']})}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#04968d] focus:border-transparent"
                      >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Assigned To</label>
                      <input
                        type="text"
                        value={selectedSubmission.assignedTo || ''}
                        onChange={(e) => setSelectedSubmission({...selectedSubmission, assignedTo: e.target.value})}
                        placeholder="Assign to team member"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#04968d] focus:border-transparent"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Follow-up Date</label>
                      <input
                        type="date"
                        value={selectedSubmission.followUpDate || ''}
                        onChange={(e) => setSelectedSubmission({...selectedSubmission, followUpDate: e.target.value})}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#04968d] focus:border-transparent"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Submitted At</label>
                      <div className="text-gray-600 bg-gray-50 px-4 py-2 rounded-lg">
                        {new Date(selectedSubmission.submittedAt).toLocaleString()}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Message */}
              <div className="mt-8">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Message</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-700 whitespace-pre-wrap">{selectedSubmission.message}</p>
                </div>
              </div>

              {/* Notes */}
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Internal Notes</label>
                <textarea
                  value={selectedSubmission.notes}
                  onChange={(e) => setSelectedSubmission({...selectedSubmission, notes: e.target.value})}
                  rows={4}
                  placeholder="Add internal notes about this submission..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#04968d] focus:border-transparent"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex justify-between pt-6 border-t border-gray-200 mt-8">
                <div className="flex space-x-4">
                  <a
                    href={`mailto:${selectedSubmission.email}?subject=Re: Your Oracle ERP Inquiry&body=Dear ${selectedSubmission.name},%0D%0A%0D%0AThank you for your interest in our Oracle ERP services.%0D%0A%0D%0ABest regards,%0D%0AActive Soft Team`}
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center"
                  >
                    <span className="mr-2">📧</span>
                    Send Email
                  </a>
                  
                  <a
                    href={`tel:${selectedSubmission.phone}`}
                    className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors font-medium flex items-center"
                  >
                    <span className="mr-2">📞</span>
                    Call
                  </a>
                </div>
                
                <div className="flex space-x-4">
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                  >
                    Cancel
                  </button>
                  
                  <button
                    onClick={() => updateSubmission(selectedSubmission)}
                    className="bg-[#04968d] text-white px-6 py-3 rounded-lg hover:bg-opacity-90 transition-colors font-medium"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactSubmissionsPage;