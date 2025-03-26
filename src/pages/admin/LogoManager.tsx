import React, { useState } from 'react';
import { useLogoStore } from '../../store/logoStore';
import { Upload } from 'lucide-react';

const LogoManager = () => {
  const { logo, updateLogo } = useLogoStore();
  const [previewUrl, setPreviewUrl] = useState<string | null>(logo);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setPreviewUrl(base64String);
        updateLogo(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="container mx-auto px-6 py-8">
      <h1 className="text-3xl font-bold mb-8">Manage Company Logo</h1>

      <div className="max-w-xl bg-white rounded-lg shadow-md p-6">
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Current Logo</h2>
          {previewUrl ? (
            <img
              src={previewUrl}
              alt="Company Logo"
              className="max-w-[200px] h-auto mb-4"
            />
          ) : (
            <div className="bg-gray-100 p-4 rounded text-gray-500 mb-4">
              No logo uploaded
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Upload New Logo
          </label>
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md hover:border-[#04968d] transition-colors">
            <div className="space-y-1 text-center">
              <Upload className="mx-auto h-12 w-12 text-gray-400" />
              <div className="flex text-sm text-gray-600">
                <label htmlFor="logo-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-[#04968d] hover:text-opacity-80 focus-within:outline-none">
                  <span>Upload a file</span>
                  <input
                    id="logo-upload"
                    type="file"
                    className="sr-only"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs text-gray-500">
                PNG, JPG, GIF up to 5MB
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogoManager;