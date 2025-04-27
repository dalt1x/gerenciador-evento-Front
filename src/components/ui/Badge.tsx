import React from 'react';
import { twMerge } from 'tailwind-merge';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'success' | 'warning' | 'error';
  className?: string;
}

const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'primary',
  className,
}) => {
  const variantClasses = {
    primary: 'bg-primary-600 text-white',
    secondary: 'bg-secondary-500 text-white',
    outline: 'bg-transparent border border-gray-600 text-gray-300',
    success: 'bg-success-500 text-white',
    warning: 'bg-warning-500 text-white',
    error: 'bg-error-500 text-white',
  };

  return (
    <span
      className={twMerge(
        'badge',
        variantClasses[variant],
        className
      )}
    >
      {children}
    </span>
  );
};

export default Badge;