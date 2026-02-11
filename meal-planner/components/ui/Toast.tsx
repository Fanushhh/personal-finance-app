'use client';

export function Toast({ message }: { message: string }) {
  return <div className="fixed bottom-4 right-4 rounded-md bg-text px-3 py-2 text-sm text-white">{message}</div>;
}
