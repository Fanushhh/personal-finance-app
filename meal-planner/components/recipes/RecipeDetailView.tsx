export function RecipeDetailView({ recipe }: { recipe: any }) {
  return (
    <div className="space-y-3">
      <img src={recipe.imageUrl} alt={recipe.name} className="h-64 w-full rounded-xl object-cover" />
      <h1 className="text-2xl font-bold">{recipe.name}</h1>
      <p>{recipe.description}</p>
      <h2 className="font-semibold">Ingrediente</h2>
      <ul className="list-inside list-disc text-sm">
        {recipe.ingredients.map((item: any) => (
          <li key={item.id}>{item.name} - {item.amount} {item.unit}</li>
        ))}
      </ul>
    </div>
  );
}
