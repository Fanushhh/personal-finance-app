'use client';

import { useState } from 'react';

import { Button } from '@/components/ui/Button';

export function Tabs({ tabs }: { tabs: { label: string; content: React.ReactNode }[] }) {
  const [active, setActive] = useState(0);
  return (
    <div>
      <div className="mb-4 flex gap-2">
        {tabs.map((tab, idx) => (
          <Button key={tab.label} onClick={() => setActive(idx)} className={idx === active ? '' : 'bg-gray-200 text-gray-700'}>
            {tab.label}
          </Button>
        ))}
      </div>
      <div>{tabs[active]?.content}</div>
    </div>
  );
}
