'use client';

import { useState } from 'react';

import { Button } from '@/components/ui/Button';

export function GeneratePlanButton() {
  const [loading, setLoading] = useState(false);

  return (
    <Button
      onClick={async () => {
        setLoading(true);
        await fetch('/api/meal-plans/generate', { method: 'POST' });
        setLoading(false);
        window.location.reload();
      }}
      disabled={loading}
      className="bg-accent"
    >
      {loading ? 'Generez...' : 'Generează Plan Nou'}
    </Button>
  );
}
