import { HTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

const ErrorMessage = ({
  children,
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) => {
  const baseStyles = 'text-sm font-medium text-error';
  const mergedClasses = twMerge(baseStyles, className);

  return (
    <div
      className={mergedClasses}
      role="alert"
      {...props}
    >
      {children}
    </div>
  );
};

export default ErrorMessage;
