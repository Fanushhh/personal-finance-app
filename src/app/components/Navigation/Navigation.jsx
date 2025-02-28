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
      min-[999px]:min-h-screen 
      max-[999px]:fixed z-10 max-[999px]:bottom-0 max-[999px]:right-0 max-[999px]:w-full min-[999px]:hidden`}
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
                href="/transactions"
                selected={selected("/transactions")}
                icon="iconTransactions"
              ></NavButton>
            </li>
            <li>
              <NavButton
                href="/budgets"
                selected={selected("/budgets")}
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
            <li>
              <button
                className="text-white bg-red"
                onClick={() => deleteSession()}
              >
                Logout
              </button>
            </li>
          </ul>
        </nav>
      </header>
      <header
        className={`bg-black py-10 pr-8 rounded-tr-2xl ease-in-out transition-all rounded-br-2xl 
  ${minimized ? "w-[100px]" : "w-[300px]"} 
  min-[1000px]:min-h-screen flex flex-col justify-between
  max-[1000px]:fixed max-[1000px]:bottom-0 max-[1000px]:right-0 max-[768px]:w-full max-[1000px]:hidden`}
      >
        <nav>
          <div className="mb-10 pl-5">
            <SVGIcon iconName={`${minimized ? "logoSmall" : "logoLarge"}`} />
          </div>
          <ul className="space-y-4">
            <li>
              <NavButton
                href="/"
                selected={selected("/")}
                icon="iconNavOverview"
              >
                {minimized ? "" : "Overview"}
              </NavButton>
            </li>
            <li>
              <NavButton
                href="/transactions"
                selected={selected("/transactions")}
                icon="iconTransactions"
              >
                {minimized ? "" : "Transactions"}
              </NavButton>
            </li>
            <li>
              <NavButton
                href="/budgets"
                selected={selected("/budgets")}
                icon="iconNavBugets"
              >
                {minimized ? "" : "Budgets"}
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
            <li>
              <button
                className="text-white bg-red"
                onClick={() => deleteSession()}
              >
                Logout
              </button>
            </li>
          </ul>
        </nav>
        <button onClick={() => deleteSession()}>Logout</button>
        <MinimizeButton minimizeButton={setMinimized} minimized={minimized} />
      </header>
    </>
  );
}
