import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'success' | 'warning' | 'danger' | 'secondary';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  children, 
  className = '',
  ...props 
}) => {
  const variantClasses = {
    primary: 'bg-primary text-white hover:bg-primary/90',
    success: 'bg-success text-white hover:bg-success/90',
    warning: 'bg-warning text-white hover:bg-warning/90',
    danger: 'bg-danger text-white hover:bg-danger/90',
    secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300',
  };
  
  return (
    <button
      className={`px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
