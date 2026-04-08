import  { type ComponentPropsWithRef } from 'react'
import { cn } from '../../lib/cn';

export type CardVariant = 'default' | 'interactive' | 'selected' | 'ghost';

export interface CardProps extends ComponentPropsWithRef<'div'> {
  variant?: CardVariant;
}

export interface CardHeaderProps extends ComponentPropsWithRef<'div'> {}
export interface CardContentProps extends ComponentPropsWithRef<'div'> {}
export interface CardFooterProps extends ComponentPropsWithRef<'div'> {}

const variantStyles: Record<CardVariant, string> = {
  default: 'border-surface bg-background-secondary',
  interactive:
    'border-surface bg-background-secondary cursor-pointer hover:border-primary-400/50 hover:bg-surface-hover transition-colors duration-150',
  selected: 'border-primary-400 bg-primary-400/10',
  ghost: 'border-transparent bg-transparent',
};


export const Card = ({ className, ref , variant = 'default', ...props }: CardProps) => {
  return (
   <div
        ref={ref}
        className={cn(
          'border rounded-sm overflow-hidden',
          variantStyles[variant],
          className
        )}
        {...props}
      />
  )
}

export const CardHeader = ({ className, ref, ...props }: CardHeaderProps) => {
  return (
    <div
      ref={ref}
      className={cn('border-b border-surface p-4', className)}
      {...props}
    />
  )
}

export const CardContent = ({ className, ref, ...props }: CardContentProps) => {
  return (
    <div
      ref={ref}
      className={cn('p-4', className)}
      {...props}
    />
  )
}

export const CardFooter = ({ className, ref, ...props }: CardFooterProps) => {
  return (
    <div
      ref={ref}
      className={cn('border-t border-surface p-4 flex items-center', className)}
      {...props}
    />
  )
}

export default Card
