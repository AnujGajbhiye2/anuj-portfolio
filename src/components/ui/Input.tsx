import { forwardRef, type InputHTMLAttributes, type ReactNode } from 'react';
import { cn } from '../../lib/cn';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  /** Error message to display below the input */
  error?: string | undefined;
  /** Element to render on the left side (e.g., search icon) */
  leftElement?: ReactNode;
  /** Element to render on the right side (e.g., show/hide password) */
  rightElement?: ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      error,
      leftElement,
      rightElement,
      type = 'text',
      disabled,
      id,
      ...props
    },
    ref
  ) => {
  const hasError = Boolean(error);
  return (
    <div className="w-full">
      {/* Input container - relative for absolute positioning of icons */}
      <div className="relative">
        {/* Left element */}
        {leftElement && (
          <div
            className={cn(
              'absolute left-3 top-1/2 -translate-y-1/2',
              'text-text-muted',
              "pointer-events-none", // Don't block input clicks
            )}
          >
            {leftElement}
          </div>
        )}

        {/* The actual input */}
        <input
          ref={ref}
          type={type}
          disabled={disabled}
          id={id}
          className={cn(
            // Base styles
            'w-full h-10',
            'px-3', // Will be adjusted if icons present
            'font-mono text-sm',
            'bg-background-tertiary',
            'text-text-primary',
            'border rounded-sm',
            'placeholder:text-text-dim',
            'transition-colors duration-150',

            // Focus styles
            'focus:outline-none focus:ring-2 focus:ring-offset-0',

            // Conditional: Error or normal state
            hasError
              ? 'border-red-500 focus:ring-red-500/20 focus:border-red-500'
              : 'border-surface hover:border-surface-hover focus:border-primary-400 focus:ring-primary-400/20',

            // Disabled state
            disabled && 'opacity-50 cursor-not-allowed',

            // Adjust padding when icons are present
            leftElement && 'pl-10',
            rightElement && 'pr-10',

            // Allow className override
            className,
          )}
          // Accessibility attributes
          aria-invalid={hasError}
          aria-describedby={hasError && id ? `${id}-error` : undefined}
          {...props}
        />

        {/* Right element */}
        {rightElement && (
          <div
            className={cn(
              'absolute right-3 top-1/2 -translate-y-1/2',
              'text-text-muted',
              // Note: NO pointer-events-none here - right element might be clickable
              // (e.g., show/hide password button)
            )}
          >
            {rightElement}
          </div>
        )}
      </div>

      {/* Error message */}
      {hasError && id && (
        <p
          id={`${id}-error`}
          className="mt-1.5 text-xs text-red-400"
          role="alert" // Announces to screen readers immediately
        >
          {error}
        </p>
      )}
    </div>
  );
  }
);

export default Input;
