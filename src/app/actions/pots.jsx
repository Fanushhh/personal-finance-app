"use server";
import { PotValidationSchema, AddMoneyValidationSchema, WithdrawMoneyValidationSchema } from "../lib/definitions";
import { connectDB } from "../lib/mongo";
import { getSession } from "../lib/session";
import Pot from "../models/Pots";

export const createPot = async (state, formData) => {
  const { userId } = await getSession();
  
  const validatedFields = PotValidationSchema.safeParse({
    potName: formData.get("potName"),
    target: formData.get("target"),
    colorPref: formData.get("colorPref"),
  });

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    
   // Throw an error that returns the messages from zod
    
   return{
    ...state,
    success: false,
    message: validatedFields.error.flatten().fieldErrors,
   }
  }
  const { potName, target, colorPref } = validatedFields.data;
  await connectDB();

  const potExists = await Pot.findOne({user:userId, potName});
  if (potExists) {
    return res.status(400).json({
      success: false,
      message: result.error.flatten().fieldErrors,
    });
  }
  const pot = await Pot.create({
    user: userId,
    potName,
    target,
    currentAmount:0, 
    colorPref,
  });
  await pot.save();
  return {
    success: true,
    message: "Pot added successfully",
  };
};

export const editPot = async ( state, formData) => {
    const validatedFields = PotValidationSchema.safeParse({
        potName: formData.get("potName"),
        target: formData.get("target"),
        colorPref: formData.get("colorPref"),
      });
  const id = formData.get("potId");

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    
   // Throw an error that returns the messages from zod
    
   return{
    success: false,
    message: validatedFields.error.flatten().fieldErrors,
   }
  }
  const { potName, target, colorPref } = validatedFields.data;
  await connectDB();

  const pot = await Pot.findById(id);
  if (pot) {
    // if the budget exists, update it
    pot.potName = potName;
    pot.target = target;
    pot.colorPref = colorPref;
  }
  
  await pot.save();
  return {
    success: true,
    message: "Budget has been updated successfully",
  };
};

export const getPots = async () => {
  const {userId} = await getSession();
  
  await connectDB();
  const userPots = await Pot.find({user:userId});
  
  return JSON.parse(JSON.stringify(userPots));
};

export const deletePot = async (id) => {
  await connectDB();
  await Pot.findByIdAndDelete(id);
  return {
    isSuccess: true,
    message: "Pot deleted successfully",
  }
}

export const addMoneyToPot = async (state, formData) => {
  const validatedFields = AddMoneyValidationSchema.safeParse({
    addedAmount: Number(formData.get("addedAmount")),
  });
  if(!validatedFields.success){
    return{
      success: false,
      message: validatedFields.error.flatten().fieldErrors,
    }
  }
  const { addedAmount } = validatedFields.data;
  
  const potId = formData.get("potId");
  
  await connectDB();
  const pot = await Pot.findById(potId);
  pot.currentAmount += Number(addedAmount);
  
  await pot.save();
  return {
    success: true,
    message: "Money added successfully",
  }
}

export const withdrawPotMoney = async (state, formData) => {
  const validatedFields = WithdrawMoneyValidationSchema.safeParse({
    withdrawnAmount: Number(formData.get("deductedAmount")),
  });
  if(!validatedFields.success){
    return{
      success: false,
      message: validatedFields.error.flatten().fieldErrors,
    }
  }
  const { withdrawnAmount } = validatedFields.data;
  
  
  const potId = formData.get("potId");
  
  await connectDB();
  const pot = await Pot.findById(potId);
  pot.currentAmount -= withdrawnAmount;
  
  await pot.save();
  return {
    success: true,
    message: "Money added successfully",
  }
}