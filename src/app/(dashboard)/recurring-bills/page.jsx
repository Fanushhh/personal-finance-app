
import { RecurringList } from "@/app/components/RecurringList/RecurringList";
import { Suspense } from "react";

export default function Page() {
  return (
    <div className="text-4xl p-6 w-full bg-(--beige-100)">
      <h1 className="preset-1">Recurring Bills</h1>

      <div >
        <Suspense fallback={<p>Loading...</p>}>
        <RecurringList />
        </Suspense>
      </div>
    </div>
  );
}


