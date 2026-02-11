'use client';

import { useState } from 'react';

import { Button } from '@/components/ui/Button';

export function Dialog({ triggerText, title, children }: { triggerText: string; title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>{triggerText}</Button>
      {open ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-lg rounded-xl bg-white p-4">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="font-semibold">{title}</h3>
              <button onClick={() => setOpen(false)}>✕</button>
            </div>
            {children}
          </div>
        </div>
      ) : null}
    </>
  );
}
