import { ExportPDFButton } from '@/components/shopping-list/ExportPDFButton';
import { ShoppingList } from '@/components/shopping-list/ShoppingList';
import { aggregateIngredients } from '@/lib/utils/aggregateIngredients';
import { prisma } from '@/lib/db';

export default async function ShoppingListPage() {
  const mealPlan = await prisma.mealPlan.findFirst({
    where: { isActive: true },
    include: { mealSlots: { include: { recipe: { include: { ingredients: true } } } } }
  });

  const ingredients = mealPlan?.mealSlots.flatMap((slot) => slot.recipe.ingredients) ?? [];
  const data = aggregateIngredients(ingredients);

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Lista de cumpărături</h1>
        <ExportPDFButton />
      </div>
      <ShoppingList data={data} />
    </section>
  );
}
