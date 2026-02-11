'use client';

import { useState } from 'react';

export function DropdownMenu({ label, items }: { label: string; items: { text: string; onClick: () => void }[] }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative inline-block">
      <button className="rounded-md border px-3 py-2 text-sm" onClick={() => setOpen((value) => !value)}>
        {label}
      </button>
      {open ? (
        <div className="absolute right-0 mt-2 w-40 rounded-md border bg-white p-1 shadow">
          {items.map((item) => (
            <button key={item.text} className="block w-full rounded px-2 py-1 text-left text-sm hover:bg-gray-100" onClick={item.onClick}>
              {item.text}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
