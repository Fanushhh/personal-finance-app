import type { HTMLAttributes, PropsWithChildren } from 'react';

import { cn } from '@/lib/utils';

export function Card({ className, children, ...props }: PropsWithChildren<HTMLAttributes<HTMLDivElement>>) {
  return (
    <div className={cn('rounded-xl border border-gray-200 bg-white p-4 shadow-sm', className)} {...props}>
      {children}
    </div>
  );
}
