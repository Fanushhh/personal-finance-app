import Link from "next/link";


import React from 'react'

export default function NavButton({href, children, selected}) {
  return (
    <Link href={href} className={` text-[16px] rounded-tr-3xl rounded-br-3xl border-l-2 border- font-bold leading-5 flex items-center gap-4 p-5 ${selected === 'home' ? 'text-black bg-white' : ''}`}>
      {children}
    </Link>
  )
}
