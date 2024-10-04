import { HTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

const Heading = ({
  children,
  className,
  ...props
}: HTMLAttributes<HTMLHeadingElement>) => {
  const baseStyles = 'text-4xl font-bold';
  const mergedClasses = twMerge(baseStyles, className);

  return (
    <h1
      className={mergedClasses}
      {...props}
    >
      {children}
    </h1>
  );
};

export default Heading;
