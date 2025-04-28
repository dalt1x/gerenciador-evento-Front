import React from 'react';
import { twMerge } from 'tailwind-merge';

interface ButtonOwnProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

type PolymorphicButtonProps<C extends React.ElementType> = 
  ButtonOwnProps & Omit<React.ComponentPropsWithoutRef<C>, keyof ButtonOwnProps> & {
    as?: C;
  };

const Button = <C extends React.ElementType = 'button'>({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  className,
  icon,
  iconPosition = 'left',
  disabled,
  as,
  ...props
}: PolymorphicButtonProps<C>) => {
  const Component = as || 'button';

  const baseClasses = 'btn';

  const variantClasses = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    outline: 'btn-outline',
    danger: 'btn-danger',
  };

  const sizeClasses = {
    sm: 'text-xs py-1.5 px-3',
    md: 'text-sm py-2 px-4',
    lg: 'text-base py-2.5 px-5',
  };

  const classes = twMerge(
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    (disabled || isLoading) && 'opacity-70 cursor-not-allowed',
    className
  );

  return (
    <Component
      className={classes}
      disabled={Component === 'button' ? (disabled || isLoading) : undefined}
      {...(props as any)}
    >
      {isLoading ? (
        <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2" />
      ) : icon && iconPosition === 'left' ? (
        <span className="mr-2">{icon}</span>
      ) : null}

      {children}

      {!isLoading && icon && iconPosition === 'right' && (
        <span className="ml-2">{icon}</span>
      )}
    </Component>
  );
};

export default Button;
