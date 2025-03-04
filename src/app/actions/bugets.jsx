"use server";
import { revalidatePath } from "next/cache";
import { BudgetValidationSchema } from "../lib/definitions";
import { connectDB } from "../lib/mongo";
import { getSession } from "../lib/session";
import Budget from "../models/Budget.js";

const initialState = {
  budgetCategory: '',
  maxSpend: '',
  colorPref: '',
  
}
export const createBudget = async (state, formData) => {
  const { userId } = await getSession();
  
  const validatedFields = BudgetValidationSchema.safeParse({
    budgetCategory: formData.get("budgetCategory"),
    maxSpend: formData.get("maxSpend"),
    colorPref: formData.get("colorPref"),
  });
  const parsedData = {
    budgetCategory: formData.get("budgetCategory"),
    maxSpend: formData.get("maxSpend"),
    colorPref: formData.get("colorPref"),
  }

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    
   // Throw an error that returns the messages from zod
    
   return{
    ...state,
    ...parsedData,
    success: false,
    message: validatedFields.error.flatten().fieldErrors,
   }
  }
  const { budgetCategory, maxSpend, colorPref } = validatedFields.data;
  await connectDB();

  const budgetExists = await Budget.findOne({user:userId, budgetCategory});
  if (budgetExists) {
    return res.status(400).json({
      success: false,
      message: result.error.flatten().fieldErrors,
    });
  }
  const budget = await Budget.create({
    id: crypto.randomUUID(),
    user: userId,
    budgetCategory,
    maxSpend,
    colorPref,
  });
  await budget.save();
  revalidatePath('/budgets');
  return {
    ...initialState,
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
  
   await budget.save();
    revalidatePath('/budgets');
  return {
    success: true,
    budgetCategory,
    maxSpend,
    colorPref,
    message: "Budget has been updated successfully",
  };
};

export const getBugets = async () => {
  const {userId} = await getSession();
  
  await connectDB();
  const userBudgets = await Budget.find({user:userId});
  
  
  return JSON.parse(JSON.stringify(userBudgets));
};

export const deleteBudget = async (id) => {
  await connectDB();
  await Budget.deleteOne({ id });
  revalidatePath('/budgets');
  return {
    isSuccess: true,
    message: "Budget deleted successfully",
  }
}
