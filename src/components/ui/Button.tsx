import { forwardRef, type ButtonHTMLAttributes } from 'react';
import { cn } from '../../lib/cn';


export type ButtonVariant = 'default' | 'ghost' | 'outline';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

const variantStyles: Record<ButtonVariant, string> = {
  default: 'bg-primary-400/10 text-primary-400 border border-primary-400/50 hover:bg-primary-400/20',
  ghost: 'text-text-muted hover:text-primary-400 hover:bg-primary-400/10',
  outline: 'border border-surface text-text-secondary hover:border-primary-400',
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'h-8 px-3 text-xs',
  md: 'h-10 px-4 text-sm',
  lg: 'h-12 px-6 text-base',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button({ className, variant = 'default', size = 'md', ...props }, ref) {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center font-mono font-medium',
          'transition-colors duration-150',
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-400',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        {...props}
      />
    );
  }
);