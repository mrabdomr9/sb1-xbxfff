import React, { forwardRef } from 'react';

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  ({ error, ...props }, ref) => {
    return (
      <div>
        <input
          ref={ref}
          {...props}
          className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-[#04968d] focus:border-[#04968d] focus:z-10 sm:text-sm"
        />
        {error && (
          <p className="text-red-500 text-sm mt-1">{error}</p>
        )}
      </div>
    );
  }
);

InputField.displayName = 'InputField';

export default InputField;