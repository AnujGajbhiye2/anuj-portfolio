import { forwardRef, type TextareaHTMLAttributes } from 'react';
import { cn } from '../../lib/cn';

// TS note: forwardRef<RefType, PropsType> takes two type args:
//   1. The DOM element type the ref points to (HTMLTextAreaElement)
//   2. The props interface for this component
// This lets React Hook Form's register() pass its ref through to the real DOM node,
// which is required for features like focus-on-error to work correctly.

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string | undefined;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  function Textarea({ className, error, disabled, id, ...props }, ref) {
    const hasError = Boolean(error);

    return (
      <div className="w-full">
        <textarea
          ref={ref}
          disabled={disabled}
          id={id}
          rows={5}
          className={cn(
            'w-full px-3 py-2.5',
            'font-mono text-sm',
            'bg-background-tertiary',
            'text-text-primary',
            'border rounded-sm',
            'placeholder:text-text-dim',
            'resize-y min-h-[120px]',
            'transition-colors duration-150',
            'focus:outline-none focus:ring-2 focus:ring-offset-0',
            hasError
              ? 'border-red-500 focus:ring-red-500/20 focus:border-red-500'
              : 'border-surface hover:border-surface-hover focus:border-primary-400 focus:ring-primary-400/20',
            disabled && 'opacity-50 cursor-not-allowed',
            className,
          )}
          aria-invalid={hasError}
          aria-describedby={hasError && id ? `${id}-error` : undefined}
          {...props}
        />
        {hasError && id && (
          <p id={`${id}-error`} className="mt-1.5 text-xs text-red-400" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  },
);
