'use client';
import React from "react";
import NavButton from "../NavButton/NavButton";
import SVGIcon from "../SVGIcon/SVGIcon";
import { usePathname } from "next/navigation";

export default function Navigation() {
  const pathName = usePathname();
  const selected = (href) => pathName === href;
  const [minimized, setMinimized] = React.useState(false);

  return (
    <header className={`bg-black h-screen py-10 pr-8 rounded-tr-2xl ease-in-out transition-all rounded-br-2xl ${minimized ? 'w-[100px]' : 'w-[300px]'}`}>
      <nav>
        <div className="mb-10 pl-5">
          <SVGIcon iconName={`${minimized ? 'logoSmall': 'logoLarge'}`} />
        </div>
        <ul className="space-y-4">
          <li>
            <NavButton href="/" selected={selected('/')} icon="iconNavOverview">
            
             {minimized ? '' : 'Overview'}
            </NavButton>
          </li>
          <li>
            <NavButton href="/transations" selected={selected('/transations')} icon="iconTransactions">
            
            {minimized ? '' : 'Transactions'}
            </NavButton>
          </li>
          <li>
            <NavButton href="/bugets" selected={selected('/bugets')} icon="iconNavBugets">
            
            {minimized ? '' : 'Bugets'}
            </NavButton>
          </li>
          <li>
            <NavButton href="/pots" selected={selected('/pots')} icon="iconNavPots">
            
            {minimized ? '' : 'Pots'}
            </NavButton>
          </li>
          <li>
            <NavButton href="/recurring-bills" selected={selected('/recurring-bills')} icon="iconNavRecurring">
            
             {minimized ? '' : 'Recurring Bills'}
            </NavButton>
          </li>
         
        </ul>
      </nav>
      <button onClick={() => setMinimized(!minimized)} className={`text-[var(--gray-500)] font-bold flex gap-4 items-center ${minimized ? 'rotate-180' : ''} fixed bottom-10 left-10`}>
        <SVGIcon  iconName={minimized ? 'iconMinMenu' : 'iconMinMenu'} />
        {minimized ? '' : 'Minimize Menu'}</button>
    </header>
  );
}
