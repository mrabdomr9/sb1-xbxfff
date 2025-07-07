import React, { useState, useRef } from 'react';

interface SimpleFileUploadProps {
  onFileSelect: (file: File) => void;
  acceptedTypes?: string;
  maxSize?: number; // in MB
  label?: string;
}

const SimpleFileUpload: React.FC<SimpleFileUploadProps> = ({
  onFileSelect,
  acceptedTypes = "image/*,.pdf,.doc,.docx",
  maxSize = 10,
  label = "Upload File"
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    setError('');
    
    // Check file size
    if (file.size > maxSize * 1024 * 1024) {
      setError(`File size must be less than ${maxSize}MB`);
      return;
    }

    onFileSelect(file);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFile(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleFile(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  return (
    <div className="w-full">
      <input
        ref={fileInputRef}
        type="file"
        accept={acceptedTypes}
        onChange={handleFileInput}
        className="hidden"
      />
      
      <div
        onClick={() => fileInputRef.current?.click()}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all duration-300 ${
          isDragging
            ? 'border-[#04968d] bg-[#04968d]/10'
            : 'border-gray-300 hover:border-[#04968d] hover:bg-gray-50'
        }`}
      >
        <div className="text-4xl mb-4">
          {isDragging ? '📤' : '📁'}
        </div>
        <div className="text-lg font-medium text-gray-700 mb-2">
          {isDragging ? 'Drop file here' : label}
        </div>
        <div className="text-sm text-gray-500">
          Drag and drop or click to browse
        </div>
        <div className="text-xs text-gray-400 mt-2">
          Max size: {maxSize}MB
        </div>
      </div>

      {error && (
        <div className="mt-2 text-red-600 text-sm flex items-center">
          <span className="mr-1">⚠️</span>
          {error}
        </div>
      )}
    </div>
  );
};

export default SimpleFileUpload;