import { ButtonHTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  loadingText?: string;
  variant?: 'primary' | 'danger';
}

const Button = ({
  children,
  className,
  isLoading = false,
  loadingText = 'Loading...',
  variant = 'primary',
  ...props
}: ButtonProps) => {
  let backgroundColor;

  switch (variant) {
    case 'danger':
      backgroundColor = 'bg-error focus:ring-error';
      break;
    case 'primary':
    default:
      backgroundColor = 'bg-primary focus:ring-primary';
  }

  const baseStyles =
    'cursor-pointer rounded-md px-4 py-2 text-xl font-medium text-tertiary shadow-sm outline-none focus:ring-4 focus:ring-opacity-50 focus:brightness-90 hover:enabled:brightness-90 disabled:cursor-not-allowed';
  const mergedClasses = twMerge(baseStyles, backgroundColor, className);

  return (
    <button
      className={mergedClasses}
      {...props}
    >
      {isLoading ? loadingText : children}
    </button>
  );
};

export default Button;
