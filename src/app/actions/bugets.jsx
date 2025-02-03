"use server";
import { BudgetValidationSchema } from "../lib/definitions";
import { connectDB } from "../lib/mongo";
import Budget from "../models/Budget.js";

export const createBudget = async (state, formData) => {
  const validatedFields = BudgetValidationSchema.safeParse({
    budgetCategory: formData.get("budgetCategory"),
    maxSpend: formData.get("maxSpend"),
    colorPref: formData.get("colorPref"),
  });

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    
   // Throw an error that returns the messages from zod
    
   return{
    success: false,
    message: validatedFields.error.flatten().fieldErrors,
   }
  }
  const { budgetCategory, maxSpend, colorPref } = validatedFields.data;
  await connectDB();

  const budgetExists = await Budget.findOne({ budgetCategory });
  if (budgetExists) {
    return res.status(400).json({
      success: false,
      message: result.error.flatten().fieldErrors,
    });
  }
  const budget = await Budget.create({
    id: crypto.randomUUID(),
    budgetCategory,
    maxSpend,
    colorPref,
  });
  const savedBudget = await budget.save();
  return {
    success: true,
    message: "Budget added successfully",
  };
};

export const editBudget = async ( state, formData) => {
  const validatedFields = BudgetValidationSchema.safeParse({
    budgetCategory: formData.get("budgetCategory"),
    maxSpend: formData.get("maxSpend"),
    colorPref: formData.get("colorPref"),
  });
  const id = formData.get("budgetId");

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    
   // Throw an error that returns the messages from zod
    
   return{
    success: false,
    message: validatedFields.error.flatten().fieldErrors,
   }
  }
  const { budgetCategory, maxSpend, colorPref } = validatedFields.data;
  await connectDB();

  const budget = await Budget.findOne({id});
  if (budget) {
    // if the budget exists, update it
    budget.budgetCategory = budgetCategory;
    budget.maxSpend = maxSpend;
    budget.colorPref = colorPref;
  }
  
  const savedBudget = await budget.save();
  return {
    success: true,
    message: "Budget has been updated successfully",
  };
};

export const getBugets = async () => {
  await connectDB();
  const budgets = await Budget.find({});
  return JSON.parse(JSON.stringify(budgets));
};

export const deleteBudget = async (id) => {
  await connectDB();
  await Budget.deleteOne({ id });
  return {
    isSuccess: true,
    message: "Budget deleted successfully",
  }
}
