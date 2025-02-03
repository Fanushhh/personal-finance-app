
import Link from "next/link";
import SVGIcon from "@/app/components/SVGIcon/SVGIcon";
import SignInForm from "@/app/components/SignInForm/SignInForm";



export default function Page() {
  
  return (
    <section className="p-6 flex w-full h-screen">
      <div className="max-[1200px]:hidden bg-[url('/assets/images/illustration-authentication.svg')] bg-cover bg-center bg-no-repeat w-1/3 text-white p-10 flex flex-col justify-between">
        <SVGIcon iconName="logoLarge" />
        <div className="">
          <h1 className="preset-1 mb-6">
            Keep track of your money and save for your future
          </h1>
          <p>
            Personal finance app puts you in control of your spending. Track
            transactions, set budgets, and add to savings pots easily.
          </p>
        </div>
      </div>
      <SignInForm />
    </section>
  );
}
