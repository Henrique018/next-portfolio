import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

export const buttonVariants = cva(
  'flex cursor-pointer items-center justify-center gap-2.5 rounded px-4 py-2 font-bold transition-colors duration-150 ease-in focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-700 disabled:pointer-events-none disabled:border-neutral-200 disabled:text-neutral-100',
  {
    variants: {
      variant: {
        primary: 'bg-highlight text-white',
        ghost: 'bg-transparent text-highlight',
        outlined: 'bg-transparent text-highlight border border-highlight',
        gray: 'bg-[#9d9d9d] text-white border-none',
      },
    },
    defaultVariants: {
      variant: 'primary',
    },
  },
);

type ButtonProps = {
  children: React.ReactNode;
  className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants>;

export const Button = ({
  children,
  variant,
  className,
  type = 'button',
  ...props
}: ButtonProps) => {
  return (
    <button
      type={type}
      data-variant={variant}
      className={cn(buttonVariants({ variant }), className)}
      {...props}
    >
      {children}
    </button>
  );
};
