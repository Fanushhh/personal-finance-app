import { Difficulty, MealType, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const tags = ['vegan', 'vegetarian', 'fără lactoză', 'rapid', 'ieftin'];
const categories = ['Lactate', 'Legume', 'Carne', 'Băcănie', 'Fructe'];
const units = ['g', 'ml', 'buc', 'lingură'];

const mealTemplates = {
  BREAKFAST: ['Omletă', 'Terci', 'Clătite', 'Smoothie bowl', 'Iaurt cu granola', 'Orez cu lapte'],
  LUNCH: ['Paste', 'Salată', 'Supă', 'Sandwich', 'Bowl', 'Pilaf'],
  DINNER: ['Friptură', 'Curry', 'Pizza', 'Risotto', 'Tocăniță', 'Pește la cuptor']
};

function createRecipe(index: number, mealType: MealType) {
  const base = mealTemplates[mealType][index % mealTemplates[mealType].length];
  const ingredientsCount = 3 + (index % 6);

  return {
    name: `${base} ${index + 1}`,
    description: `Rețetă ${mealType.toLowerCase()} gustoasă și echilibrată pentru meal prep.`,
    imageUrl: `https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80&sig=${mealType}-${index}`,
    prepTime: 5 + (index % 26),
    cookTime: 10 + (index % 51),
    servings: 2 + (index % 3),
    mealType,
    instructions: ['Pregătește ingredientele.', 'Gătește conform pașilor.', 'Asezonează după gust.', 'Servește preparatul.'].slice(0, 3 + (index % 4)),
    tags: [tags[index % tags.length], tags[(index + 1) % tags.length]],
    difficulty: (['EASY', 'MEDIUM', 'HARD'] as Difficulty[])[index % 3],
    calories: 250 + (index % 450),
    protein: 10 + (index % 30),
    carbs: 15 + (index % 40),
    fat: 5 + (index % 20),
    ingredients: {
      create: Array.from({ length: ingredientsCount }).map((_, i) => ({
        name: `Ingredient ${i + 1} ${base}`,
        amount: Number((0.5 + i * 0.5).toFixed(2)),
        unit: units[(index + i) % units.length],
        category: categories[(index + i) % categories.length]
      }))
    }
  };
}

async function main() {
  await prisma.ingredient.deleteMany();
  await prisma.mealSlot.deleteMany();
  await prisma.mealPlan.deleteMany();
  await prisma.recipe.deleteMany();

  const recipes = [
    ...Array.from({ length: 30 }).map((_, idx) => createRecipe(idx, MealType.BREAKFAST)),
    ...Array.from({ length: 40 }).map((_, idx) => createRecipe(idx, MealType.LUNCH)),
    ...Array.from({ length: 30 }).map((_, idx) => createRecipe(idx, MealType.DINNER))
  ];

  for (const recipe of recipes) {
    await prisma.recipe.create({ data: recipe });
  }

  console.log(`Seed complete: ${recipes.length} rețete create.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
