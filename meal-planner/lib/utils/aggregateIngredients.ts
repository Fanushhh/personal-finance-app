import type { ShoppingListCategory } from '@/types';

export function aggregateIngredients(items: { name: string; amount: number; unit: string; category: string | null }[]) {
  const map = new Map<string, { amount: number; unit: string; category: string }>();

  for (const ingredient of items) {
    const key = `${ingredient.name}-${ingredient.unit}`.toLowerCase();
    const current = map.get(key);
    map.set(key, {
      amount: Number((ingredient.amount + (current?.amount ?? 0)).toFixed(2)),
      unit: ingredient.unit,
      category: ingredient.category ?? 'Altele'
    });
  }

  const categories = new Map<string, ShoppingListCategory>();

  for (const [key, value] of map.entries()) {
    const name = key.split('-')[0];
    if (!categories.has(value.category)) {
      categories.set(value.category, { name: value.category, items: [] });
    }
    categories.get(value.category)?.items.push({ name, amount: value.amount, unit: value.unit });
  }

  return { categories: [...categories.values()] };
}
