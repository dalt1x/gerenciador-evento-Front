import React from 'react';
import { twMerge } from 'tailwind-merge';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: string;
  className?: string;
  fullPage?: boolean;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'md',
  color = 'primary',
  className,
  fullPage = false,
}) => {
  const sizeClasses = {
    sm: 'h-4 w-4 border-2',
    md: 'h-8 w-8 border-3',
    lg: 'h-12 w-12 border-4',
  };

  const colorClasses = {
    primary: 'border-primary-600',
    secondary: 'border-secondary-500',
    white: 'border-white',
  };

  const containerClass = fullPage
    ? 'fixed inset-0 flex items-center justify-center bg-dark-100/80 z-50'
    : '';

  return (
    <div className={containerClass}>
      <div
        className={twMerge(
          'animate-spin rounded-full border-t-transparent',
          sizeClasses[size],
          colorClasses[color as keyof typeof colorClasses] || 'border-primary-600',
          className
        )}
      />
    </div>
  );
};

export default LoadingSpinner;