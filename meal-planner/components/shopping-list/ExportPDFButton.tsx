'use client';

import { Button } from '@/components/ui/Button';

export function ExportPDFButton() {
  return <Button onClick={() => window.print()}>Exportă PDF</Button>;
}
