import React, { useState } from 'react';
import { Database, Upload, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { populateAllPortfolioData } from '../../scripts/populateDatabase';

const PortfolioManager = () => {
  const [isPopulating, setIsPopulating] = useState(false);
  const [result, setResult] = useState<{ success: boolean; message?: string; error?: string } | null>(null);

  const handlePopulateData = async () => {
    setIsPopulating(true);
    setResult(null);
    
    try {
      const response = await populateAllPortfolioData();
      setResult(response);
    } catch (error) {
      setResult({
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      });
    } finally {
      setIsPopulating(false);
    }
  };

  return (
    <div className="container mx-auto px-6 py-8">
      <h1 className="text-3xl font-bold mb-8">Portfolio Data Manager</h1>

      <div className="max-w-4xl bg-white rounded-lg shadow-md p-8">
        <div className="text-center mb-8">
          <Database className="w-16 h-16 text-[#04968d] mx-auto mb-4" />
          <h2 className="text-2xl font-semibold mb-4">Populate Portfolio Database</h2>
          <p className="text-gray-600 mb-6">
            This will add comprehensive portfolio data including services, projects, and clients to demonstrate 
            Active Soft's expertise in Oracle ERP systems and Windows desktop solutions.
          </p>
        </div>

        {/* Portfolio Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-blue-50 p-6 rounded-lg text-center">
            <h3 className="text-xl font-semibold text-blue-800 mb-2">6 Services</h3>
            <p className="text-blue-600 text-sm">
              Oracle ERP, Desktop Apps, BI Solutions, Healthcare HMIS, Supply Chain, and Optimization Services
            </p>
          </div>
          <div className="bg-green-50 p-6 rounded-lg text-center">
            <h3 className="text-xl font-semibold text-green-800 mb-2">4 Case Studies</h3>
            <p className="text-green-600 text-sm">
              Global Manufacturing, Healthcare Network, Supply Chain, and University Management Projects
            </p>
          </div>
          <div className="bg-purple-50 p-6 rounded-lg text-center">
            <h3 className="text-xl font-semibold text-purple-800 mb-2">7 Clients</h3>
            <p className="text-purple-600 text-sm">
              Technology, Healthcare, Logistics, Education, Pharma, Energy, and Banking sectors
            </p>
          </div>
        </div>

        {/* Action Button */}
        <div className="text-center mb-6">
          <button
            onClick={handlePopulateData}
            disabled={isPopulating}
            className="bg-[#04968d] text-white px-8 py-4 rounded-lg hover:bg-opacity-90 disabled:opacity-50 flex items-center space-x-3 mx-auto"
          >
            {isPopulating ? (
              <>
                <Loader2 className="w-6 h-6 animate-spin" />
                <span>Populating Database...</span>
              </>
            ) : (
              <>
                <Upload className="w-6 h-6" />
                <span>Populate Portfolio Data</span>
              </>
            )}
          </button>
        </div>

        {/* Result Display */}
        {result && (
          <div className={`p-4 rounded-lg border ${
            result.success 
              ? 'bg-green-50 border-green-200 text-green-800' 
              : 'bg-red-50 border-red-200 text-red-800'
          }`}>
            <div className="flex items-center space-x-2">
              {result.success ? (
                <CheckCircle className="w-5 h-5 text-green-600" />
              ) : (
                <AlertCircle className="w-5 h-5 text-red-600" />
              )}
              <span className="font-medium">
                {result.success ? 'Success!' : 'Error'}
              </span>
            </div>
            <p className="mt-2">
              {result.success ? result.message : result.error}
            </p>
          </div>
        )}

        {/* Data Preview */}
        <div className="mt-8 border-t pt-8">
          <h3 className="text-xl font-semibold mb-4">Portfolio Data Preview</h3>
          
          <div className="space-y-6">
            <div>
              <h4 className="font-medium text-[#04968d] mb-2">Featured Services Include:</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Oracle ERP Cloud Implementation & Migration ($75,000+)</li>
                <li>• Custom Windows Desktop Application Development ($15,000+)</li>
                <li>• Healthcare Management Information System (HMIS) ($45,000+)</li>
                <li>• Business Intelligence & Analytics Solutions ($35,000+)</li>
                <li>• Supply Chain Management & Logistics Optimization ($55,000+)</li>
                <li>• Enterprise Resource Planning (ERP) Optimization ($25,000+)</li>
              </ul>
            </div>

            <div>
              <h4 className="font-medium text-[#04968d] mb-2">Success Stories Include:</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• TechCorp International - Global ERP transformation across 15 countries</li>
                <li>• MedCenter Network - Healthcare digitization for 37 facilities</li>
                <li>• LogiFlow Solutions - Supply chain optimization with real-time tracking</li>
                <li>• Cairo University - Student management system for 200,000+ students</li>
              </ul>
            </div>

            <div>
              <h4 className="font-medium text-[#04968d] mb-2">Notable Clients Include:</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Technology Manufacturing, Healthcare Networks, Logistics Companies</li>
                <li>• Educational Institutions, Pharmaceutical Manufacturers</li>
                <li>• Renewable Energy Companies, Banking & Financial Services</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioManager;