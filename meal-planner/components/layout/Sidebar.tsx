'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const links = [
  { href: '/plan', label: 'Plan săptămânal' },
  { href: '/recipes', label: 'Rețete' },
  { href: '/shopping-list', label: 'Lista cumpărături' },
  { href: '/settings', label: 'Setări' }
];

export function Sidebar() {
  return (
    <motion.aside initial={{ x: -30, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="w-full rounded-xl border bg-white p-4 lg:w-64">
      <nav className="space-y-2">
        {links.map((link) => (
          <Link key={link.href} href={link.href} className="block rounded-md px-3 py-2 text-sm hover:bg-gray-100">
            {link.label}
          </Link>
        ))}
      </nav>
    </motion.aside>
  );
}
