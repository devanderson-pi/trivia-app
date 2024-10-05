import { HTMLAttributes } from 'react';

const Tag = ({ ...props }: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className="rounded-md bg-primary p-2.5 text-tertiary"
      {...props}
    />
  );
};

export default Tag;
