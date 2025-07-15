import React from "react";

const Input = ({
  type,
  name,
  placeholder,
  className,
  label,
  required = false,
}: {
  type: string;
  name: string;
  placeholder: string;
  className: string;
  label: string;
  required?: boolean;
}) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700" htmlFor={name}>
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        className={`w-full border border-gray-300 rounded-md p-2 ${className}`}
      />
    </div>
  );
};

export default Input;
