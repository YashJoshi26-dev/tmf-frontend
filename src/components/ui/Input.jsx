import { forwardRef } from 'react';
import { cn } from '@/utils/cn';

export const Input = forwardRef(({ label, error, hint, className, ...rest }, ref) => (
  <label className="block w-full">
    {label && <span className="block text-sm text-brand-muted mb-1">{label}</span>}
    <input ref={ref} className={cn('input-luxe', error && 'border-red-500 focus:border-red-500 focus:ring-red-200', className)} {...rest} />
    {error
      ? <span className="text-xs text-red-600 mt-1 block">{error}</span>
      : hint && <span className="text-xs text-brand-muted mt-1 block">{hint}</span>}
  </label>
));
Input.displayName = 'Input';
