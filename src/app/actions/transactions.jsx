'use server'


import { connectDB } from "../lib/mongo";
import { getSession } from "../lib/session";
import Transaction from "../models/Transaction";
export const getTransactionsPaginated = async (page,query, category, sort,limit= 10) => {
  console.log(query)
  
    const skip = page * limit;
    const session = await getSession();
    if(!session) return null;
    const filter = {};
    if(query){
      filter.name = {$regex:query, $options:"i"}
    }
    if(category){
      filter.category = category;
    }
    const sortObject = {}
    switch(sort){
      case "latest":
        sortObject.date = -1;
        break;
      case "oldest":
        sortObject.date = 1;
        break;
      case "a to z":
        sortObject.name = 1;
        break;
      case "z to a":
        sortObject.name = -1;
        break;
      case "highest":
        sortObject.amount = -1;
        break;
      case "lowest":
        sortObject.amount = 1
        break;
      default:
        sortObject.date = -1;
        break;
    }
    await connectDB();
    const transactions = await Transaction.find(filter).limit(10).skip(skip).sort(sortObject);
    
    const totalTransactions = await Transaction.countDocuments(filter);
    console.log(totalTransactions)
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

export const getAllTransactions = async () => {
  const session = await getSession();
    if(!session) return null;
  await connectDB();
  const transactions = await Transaction.find();
  console.log(transactions)
  const transactionPayload = JSON.parse(JSON.stringify(transactions));
  return transactionPayload;
}


