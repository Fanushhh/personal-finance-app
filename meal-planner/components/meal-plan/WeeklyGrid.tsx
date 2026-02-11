import { weekDays } from '@/lib/utils/dateHelpers';
import type { MealSlotView } from '@/types';

import { MealSlot } from '@/components/meal-plan/MealSlot';

export function WeeklyGrid({ slots }: { slots: MealSlotView[] }) {
  return (
    <div className="grid gap-3 lg:grid-cols-7">
      {weekDays.map((day, dayIndex) => (
        <div key={day} className="space-y-2">
          <h3 className="sticky top-16 rounded bg-gray-100 px-2 py-1 text-center text-sm font-semibold">{day}</h3>
          {['BREAKFAST', 'LUNCH', 'DINNER'].map((mealType) => {
            const slot = slots.find((item) => item.dayOfWeek === dayIndex && item.mealType === mealType);
            return slot ? <MealSlot key={slot.id} slot={slot} /> : <div key={mealType} className="rounded border border-dashed p-4 text-xs text-gray-400">Nedefinit</div>;
          })}
        </div>
      ))}
    </div>
  );
}
