export function IngredientItem({ name, amount, unit }: { name: string; amount: number; unit: string }) {
  return <li className="text-sm">{name}: <strong>{amount} {unit}</strong></li>;
}
