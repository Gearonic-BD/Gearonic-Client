import React from "react";

const Input = ({
  type,
  name,
  placeholder,
  className,
  label,
  required = false,
  error,
  value,
  onChange,
}: {
  type: string;
  name: string;
  placeholder: string;
  className: string;
  label: string;
  required?: boolean;
  error?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <div>
      <label
        className="block text-sm font-medium text-gray-700 mb-1"
        htmlFor={name}
      >
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`w-full border border-gray-300 outline-none rounded-xs text-sb px-3 py-2 ${className} 
        ${
          error ? "border-red-500 focus:border-red-500" : "focus:border-primary"
        }`}
      />
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};

export default Input;
