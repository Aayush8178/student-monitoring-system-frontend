import React from 'react';

/**
 * Enhanced button component with multiple variants
 */
export const Button = ({ 
  children, 
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  icon = null,
  className = '',
  ...props 
}) => {
  const variantClass = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg',
    secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-800 shadow-sm',
    danger: 'bg-red-600 hover:bg-red-700 text-white shadow-md hover:shadow-lg',
    success: 'bg-green-600 hover:bg-green-700 text-white shadow-md hover:shadow-lg',
    outline: 'border-2 border-blue-600 text-blue-600 hover:bg-blue-50',
  }[variant];

  const sizeClass = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-5 py-2.5 text-base',
    lg: 'px-7 py-3 text-lg'
  }[size];

  return (
    <button
      className={`
        font-semibold rounded-lg transition-all duration-200 ease-out
        flex items-center justify-center gap-2
        disabled:opacity-50 disabled:cursor-not-allowed
        transform hover:scale-105 active:scale-95
        ${variantClass} ${sizeClass} ${className}
      `}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      )}
      {icon && !loading && <span>{icon}</span>}
      {children}
    </button>
  );
};

export default Button;
