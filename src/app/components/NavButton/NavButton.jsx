import Link from "next/link";
import SVGIcon from "../SVGIcon/SVGIcon";
import React from 'react'



export default function NavButton({href, children, selected, icon}) {


  return (
    <Link href={href} className={`max-[768px]:py-2 max-[768px]:px-6 text-[16px] max-[768px]:rounded-tl-xl rounded-tr-xl  min-[769px]:rounded-tr-3xl min-[769px]:rounded-br-3xl min-[769px]:border-l-2 border font-bold leading-5 flex items-center gap-4 p-5 ${selected ? 'text-black bg-white active' : 'text-[var(--gray-500)] border-transparent'}`}>
      <SVGIcon iconName={icon}/>
      {children}
    </Link>
  )
}
