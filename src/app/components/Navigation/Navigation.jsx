"use client";
import React from "react";
import NavButton from "../NavButton/NavButton";
import SVGIcon from "../SVGIcon/SVGIcon";
import { usePathname } from "next/navigation";
import { MinimizeButton } from "../MinimizeButton/Minimize";
import { deleteSession } from "@/app/lib/session";
import Image from "next/image";
export default function Navigation() {
  const pathName = usePathname();
  const selected = (href) => pathName === href;
  const [minimized, setMinimized] = React.useState(false);

  return (
    <>
      <header
        role="navigation"
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
                className="text-(--gray-500) bg-(--black) font-bold  py-2 rounded-xl ml-6 flex items-center gap-4"
                onClick={() => deleteSession()}
              >
                <svg
                  fill="#b3b3b3"
                  height="88px"
                  width="88px"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="-38.5 -38.5 461.97 461.97"
                  stroke="#b3b3b3"
                  strokeWidth="24.253173"
                >
                  <path d="M180.455,360.91H24.061V24.061h156.394c6.641,0,12.03-5.39,12.03-12.03s-5.39-12.03-12.03-12.03H12.03 C5.39,0.001,0,5.39,0,12.031V372.94c0,6.641,5.39,12.03,12.03,12.03h168.424c6.641,0,12.03-5.39,12.03-12.03 C192.485,366.299,187.095,360.91,180.455,360.91z"></path>
                  <path d="M381.481,184.088l-83.009-84.2c-4.704-4.752-12.319-4.74-17.011,0c-4.704,4.74-4.704,12.439,0,17.179l62.558,63.46H96.279 c-6.641,0-12.03,5.438-12.03,12.151c0,6.713,5.39,12.151,12.03,12.151h247.74l-62.558,63.46c-4.704,4.752-4.704,12.439,0,17.179 c4.704,4.752,12.319,4.752,17.011,0l82.997-84.2C386.113,196.588,386.161,188.756,381.481,184.088z"></path>
                </svg>
               
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
                className="text-(--gray-500) bg-(--black) font-bold  py-2 rounded-xl ml-6 flex items-center gap-4"
                onClick={() => deleteSession()}
              >
                <svg
                  fill="#b3b3b3"
                  height="88px"
                  width="88px"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="-38.5 -38.5 461.97 461.97"
                  stroke="#b3b3b3"
                  strokeWidth="24.253173"
                >
                  <path d="M180.455,360.91H24.061V24.061h156.394c6.641,0,12.03-5.39,12.03-12.03s-5.39-12.03-12.03-12.03H12.03 C5.39,0.001,0,5.39,0,12.031V372.94c0,6.641,5.39,12.03,12.03,12.03h168.424c6.641,0,12.03-5.39,12.03-12.03 C192.485,366.299,187.095,360.91,180.455,360.91z"></path>
                  <path d="M381.481,184.088l-83.009-84.2c-4.704-4.752-12.319-4.74-17.011,0c-4.704,4.74-4.704,12.439,0,17.179l62.558,63.46H96.279 c-6.641,0-12.03,5.438-12.03,12.151c0,6.713,5.39,12.151,12.03,12.151h247.74l-62.558,63.46c-4.704,4.752-4.704,12.439,0,17.179 c4.704,4.752,12.319,4.752,17.011,0l82.997-84.2C386.113,196.588,386.161,188.756,381.481,184.088z"></path>
                </svg>
                {minimized ? "" : "Logout"}
              </button>
            </li>
          </ul>
        </nav>

        <MinimizeButton minimizeButton={setMinimized} minimized={minimized} />
      </header>
    </>
  );
}
