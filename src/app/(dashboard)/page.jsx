import { IncomeDetails } from "../components/IncomeDetails/IncomeDetails";
import { OverviewLeft } from "../components/OverviewLeftComponents/OverviewLeft";
import { OverviewRight } from "../components/OverviewRight/OverviewRight";

export default async function Home() {
  return (
    <main className="flex w-full flex-col px-4 py-6 md:p-10 max-[600px]:mb-10 bg-(--beige-100) ">
      <h1 className="preset-1 mb-8">Overview</h1>
      <IncomeDetails />
      <div className="grid xl:grid-cols-12 grid-cols-1 gap-6 max-w-[1000px] mt-6">
        <OverviewLeft />
        <OverviewRight />
      </div>
    </main>
  );
}
