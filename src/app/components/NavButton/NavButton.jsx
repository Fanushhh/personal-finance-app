import Link from "next/link";
import SVGIcon from "../SVGIcon/SVGIcon";
import React from 'react'



export default function NavButton({href, children, selected, icon}) {


  return (
    <Link href={href} className={` text-[16px] rounded-tr-3xl rounded-br-3xl border-l-2 border font-bold leading-5 flex items-center gap-4 p-5 ${selected ? 'text-black bg-white active' : 'text-[var(--gray-500)] border-transparent'}`}>
      <SVGIcon iconName={icon}/>
      {children}
    </Link>
  )
}
