
import { RecurringList } from "@/app/components/RecurringList/RecurringList";


export default async function Page() {
  return (
    <div className="text-4xl p-6 w-full bg-(--beige-100)">
      <h1 className="preset-1">Recurring Bills</h1>

      <div>
        <RecurringList />
        
      </div>
    </div>
  );
}


