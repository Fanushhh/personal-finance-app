import type { Metadata } from 'next';
import { SessionProvider } from 'next-auth/react';

import { QueryProvider } from '@/components/providers/QueryProvider';

import './globals.css';

export const metadata: Metadata = {
  title: 'Meal Planner',
  description: 'Planificare meal prep săptămânală'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ro">
      <body>
        <SessionProvider>
          <QueryProvider>{children}</QueryProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
