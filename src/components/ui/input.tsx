import * as React from 'react';
import { cn } from '@/lib/utils';

const fieldBase = [
  'w-full rounded-xl border border-white/10 bg-forest-900/70 px-4 py-3',
  'font-sans text-[0.9375rem] font-light text-cream-100',
  'placeholder:text-cream-100/35',
  'transition-[border-color,box-shadow] duration-300',
  'focus:border-gold-500/60 focus:outline-none focus:ring-2 focus:ring-gold-500/20',
  'disabled:cursor-not-allowed disabled:opacity-50',
].join(' ');

const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, type = 'text', ...props }, ref) => (
    <input ref={ref} type={type} className={cn(fieldBase, className)} {...props} />
  ),
);
Input.displayName = 'Input';

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => (
  <textarea ref={ref} className={cn(fieldBase, 'min-h-[7rem] resize-y', className)} {...props} />
));
Textarea.displayName = 'Textarea';

export { Input, Textarea, fieldBase };
