import type { SelectHTMLAttributes } from 'react';

export function Select(props: SelectHTMLAttributes<HTMLSelectElement>) {
  return <select {...props} className={`w-full rounded-md border border-gray-300 px-3 py-2 text-sm ${props.className ?? ''}`} />;
}
