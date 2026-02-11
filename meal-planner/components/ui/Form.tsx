import type { FormHTMLAttributes, PropsWithChildren } from 'react';

export function Form({ children, ...props }: PropsWithChildren<FormHTMLAttributes<HTMLFormElement>>) {
  return <form {...props} className={`space-y-3 ${props.className ?? ''}`}>{children}</form>;
}
