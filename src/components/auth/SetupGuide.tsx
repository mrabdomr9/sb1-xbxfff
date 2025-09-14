import React from 'react';
import { AlertCircle, CheckCircle, ExternalLink } from 'lucide-react';
import Card from '../common/Card';

interface SetupStepProps {
  step: number;
  title: string;
  description: string;
  isCompleted?: boolean;
}

const SetupStep: React.FC<SetupStepProps> = ({ step, title, description, isCompleted = false }) => (
  <div className="flex items-start mb-4">
    <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
      isCompleted ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'
    }`}>
      {isCompleted ? (
        <CheckCircle className="w-5 h-5" />
      ) : (
        <span className="font-bold text-sm">{step}</span>
      )}
    </div>
    <div>
      <h3 className="font-medium text-gray-900">{title}</h3>
      <p className="text-sm text-gray-600 mt-1">{description}</p>
    </div>
  </div>
);

const SetupGuide: React.FC = () => {
  return (
    <div className="max-w-2xl mx-auto p-4">
      <Card className="p-6">
        <div className="flex items-center mb-4">
          <AlertCircle className="w-6 h-6 text-yellow-500 mr-2" />
          <h2 className="text-xl font-bold text-gray-900">Authentication Setup Required</h2>
        </div>
        
        <p className="text-gray-600 mb-6">
          To access the admin dashboard, you need to create an admin user in your Supabase project.
          Follow these steps to complete the setup:
        </p>
        
        <div className="space-y-2 mb-6">
          <SetupStep 
            step={1}
            title="Access Supabase Dashboard"
            description="Go to https://supabase.com/dashboard and sign in to your account."
          />
          
          <SetupStep 
            step={2}
            title="Select Your Project"
            description="Choose the project you're using for this application."
          />
          
          <SetupStep 
            step={3}
            title="Navigate to Authentication"
            description="In the left sidebar, click on 'Authentication' then select the 'Users' tab."
          />
          
          <SetupStep 
            step={4}
            title="Create Admin User"
            description="Click 'Add user' and enter the following details:
            Email: admin@activesoft.com
            Password: admin123 (or your preferred secure password)
            Make sure to check 'Auto Confirm User'."
          />
          
          <SetupStep 
            step={5}
            title="Verify User Creation"
            description="The user should now appear in your users list with a 'Confirmed' status."
          />
          
          <SetupStep 
            step={6}
            title="Test Login"
            description="Return to this application and try logging in with the credentials you just created."
          />
        </div>
        
        <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
          <h3 className="font-medium text-blue-800 mb-2">Need Help?</h3>
          <p className="text-sm text-blue-700 mb-3">
            If you're still having issues, check that your environment variables are correctly set in your .env file:
          </p>
          <pre className="bg-gray-800 text-gray-100 p-3 rounded text-xs overflow-x-auto">
            {`VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key`}
          </pre>
        </div>
        
        <div className="mt-6 flex justify-center">
          <a 
            href="https://supabase.com/dashboard" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Go to Supabase Dashboard
            <ExternalLink className="ml-2 w-4 h-4" />
          </a>
        </div>
      </Card>
    </div>
  );
};

export default SetupGuide;