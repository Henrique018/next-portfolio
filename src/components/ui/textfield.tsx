import React, { forwardRef } from 'react';
import { cn } from '@/lib/utils';

export type TextfieldProps = {
  name: string;
  className?: string;
  adornment?: {
    left?: React.ReactNode;
    right?: React.ReactNode;
  };
} & React.InputHTMLAttributes<HTMLInputElement>;

export const Textfield = forwardRef<HTMLInputElement, TextfieldProps>(function Textfield(
  { name, value, className, type = 'text', onChange, adornment, ...props },
  ref,
) {
  return (
    <div className="relative w-full rounded-md border border-highlight p-2 focus-within:ring-2 focus-within:ring-highlight max-w-[320px]">
      <input
        ref={ref}
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        className={cn(
          'outline-none w-full bg-transparent text-primary placeholder:text-muted-foreground',
          className,
          adornment?.left ? 'pl-10' : '',
          adornment?.right ? 'pr-10' : '',
        )}
        {...props}
      />

      {adornment?.left && (
        <span className="absolute top-1/2 left-3 -translate-y-1/2 transform">
          {adornment.left}
        </span>
      )}

      {adornment?.right && (
        <span className="absolute top-1/2 right-3 -translate-y-1/2 transform">
          {adornment.right}
        </span>
      )}
    </div>
  );
});
