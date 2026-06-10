import { cn } from '@/utils/cn';

const variants = {
  primary: 'btn-primary',
  gold:    'btn-gold',
  outline: 'btn-outline',
  ghost:   'btn-ghost',
};

const sizes = {
  sm: 'text-sm px-4 py-2',
  md: '',
  lg: 'text-base px-8 py-4',
};

export const Button = ({
  as: Comp = 'button',
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className,
  children,
  ...rest
}) => (
  <Comp
    className={cn(variants[variant], sizes[size], fullWidth && 'w-full', className)}
    {...rest}
  >
    {children}
  </Comp>
);
