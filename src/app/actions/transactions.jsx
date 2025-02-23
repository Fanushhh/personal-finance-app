'use server'


import { connectDB } from "../lib/mongo";
import { getSession } from "../lib/session";
import Transaction from "../models/Transaction";
export const getTransactions = async (page, limit= 10) => {
    const skip = page * limit;
    const session = await getSession();
    if(!session) return null;
    await connectDB();
    const transactions = await Transaction.find().limit(10).skip(page * 10);
    const totalTransactions = await Transaction.countDocuments();

  // Determine if there's another page
  const hasMore = skip + limit < totalTransactions;
  const transactionsData = JSON.parse(JSON.stringify(transactions));
  const totalPages = Math.ceil(totalTransactions / limit);
    return {
        transactions: transactionsData,
        hasMore,
        totalPages,
    };
   
}