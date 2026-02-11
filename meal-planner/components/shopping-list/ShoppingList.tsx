import type { ShoppingListResponse } from '@/types';

import { IngredientItem } from '@/components/shopping-list/IngredientItem';
import { Card } from '@/components/ui/Card';

export function ShoppingList({ data }: { data: ShoppingListResponse }) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {data.categories.map((category) => (
        <Card key={category.name}>
          <h3 className="mb-2 font-semibold">{category.name}</h3>
          <ul className="space-y-1">
            {category.items.map((item) => (
              <IngredientItem key={`${item.name}-${item.unit}`} {...item} />
            ))}
          </ul>
        </Card>
      ))}
    </div>
  );
}
