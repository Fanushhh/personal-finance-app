"use client";
import React from "react";
import NavButton from "../NavButton/NavButton";
import SVGIcon from "../SVGIcon/SVGIcon";
import { usePathname } from "next/navigation";
import { MinimizeButton } from "../MinimizeButton/Minimize";
import { deleteSession } from "@/app/lib/session";

export default function Navigation() {
  const pathName = usePathname();
  const selected = (href) => pathName === href;
  const [minimized, setMinimized] = React.useState(false);
  
    return (
      <>
      <header
        className={`bg-black pt-3  ease-in-out transition-all
      ${minimized ? "w-[100px]" : "w-[300px]"} 
      min-[769px]:min-h-screen 
      max-[768px]:fixed max-[768px]:bottom-0 max-[768px]:right-0 max-[768px]:w-full min-[769px]:hidden`}
      >
        <nav>
          <ul className=" flex justify-evenly px-4 items-center">
            <li>
              <NavButton
                href="/"
                selected={selected("/")}
                icon="iconNavOverview"
              ></NavButton>
            </li>
            <li>
              <NavButton
                href="/transations"
                selected={selected("/transations")}
                icon="iconTransactions"
              ></NavButton>
            </li>
            <li>
              <NavButton
                href="/bugets"
                selected={selected("/bugets")}
                icon="iconNavBugets"
              ></NavButton>
            </li>
            <li>
              <NavButton
                href="/pots"
                selected={selected("/pots")}
                icon="iconNavPots"
              ></NavButton>
            </li>
            <li>
              <NavButton
                href="/recurring-bills"
                selected={selected("/recurring-bills")}
                icon="iconNavRecurring"
              ></NavButton>
            </li>
          </ul>
        </nav>
      </header>
      <header
      className={`bg-black py-10 pr-8 rounded-tr-2xl ease-in-out transition-all rounded-br-2xl 
  ${minimized ? "w-[100px]" : "w-[300px]"} 
  min-[769px]:min-h-screen flex flex-col justify-between
  max-[768px]:fixed max-[768px]:bottom-0 max-[768px]:right-0 max-[768px]:w-full max-[768px]:hidden`}
    >
      <nav>
        <div className="mb-10 pl-5">
          <SVGIcon iconName={`${minimized ? "logoSmall" : "logoLarge"}`} />
        </div>
        <ul className="space-y-4">
          <li>
            <NavButton href="/" selected={selected("/")} icon="iconNavOverview">
              {minimized ? "" : "Overview"}
            </NavButton>
          </li>
          <li>
            <NavButton
              href="/transations"
              selected={selected("/transations")}
              icon="iconTransactions"
            >
              {minimized ? "" : "Transactions"}
            </NavButton>
          </li>
          <li>
            <NavButton
              href="/bugets"
              selected={selected("/bugets")}
              icon="iconNavBugets"
            >
              {minimized ? "" : "Bugets"}
            </NavButton>
          </li>
          <li>
            <NavButton
              href="/pots"
              selected={selected("/pots")}
              icon="iconNavPots"
            >
              {minimized ? "" : "Pots"}
            </NavButton>
          </li>
          <li>
            <NavButton
              href="/recurring-bills"
              selected={selected("/recurring-bills")}
              icon="iconNavRecurring"
            >
              {minimized ? "" : "Recurring Bills"}
            </NavButton>
          </li>
        </ul>
      </nav>
      <button onClick={() => deleteSession()}>Logout</button>
      <MinimizeButton minimizeButton={setMinimized} minimized={minimized}/>
    </header>
    </>
    );
  
  
}
