'use client';

import { signIn } from 'next-auth/react';
import { useState } from 'react';

import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Form } from '@/components/ui/Form';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';

export function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <Card className="mx-auto max-w-md">
      <Form
        onSubmit={async (e) => {
          e.preventDefault();
          await signIn('credentials', { email, password, callbackUrl: '/plan' });
        }}
      >
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <Label htmlFor="password">Parolă</Label>
          <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <Button type="submit" className="w-full">Intră în cont</Button>
        <Button type="button" className="w-full bg-secondary" onClick={() => signIn('google', { callbackUrl: '/plan' })}>
          Continuă cu Google
        </Button>
      </Form>
    </Card>
  );
}
