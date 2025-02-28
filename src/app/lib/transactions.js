
// Debugging log to check if it's loaded correctly
import { connectDB } from "./mongo";
import Transaction from "../models/Transaction";
import {data} from "../../data"
export const populateTransactionsOnce = async () => {
  await connectDB();
  
  const transactions = data.transactions;
  const batchSize = 100;  // Example batch size
  
  // Check if transactions already exist
  const existingTransactions = await Transaction.find();
  if (existingTransactions.length > 0) {
    console.log("✅ Transactions already exist. Skipping population.");
    return;
  }

  for (let i = 0; i < transactions.length; i += batchSize) {
    const batch = transactions.slice(i, i + batchSize);
    try {
      await Transaction.insertMany(batch);
      console.log(`Inserted batch ${Math.floor(i / batchSize) + 1}`);
    } catch (error) {
      console.error("❌ Error inserting batch:", error);
      break;
    }
  }

  console.log("✅ Finished inserting all transactions!");
};

export const deleteTransactions = async () => {
  await connectDB();
  await Transaction.deleteMany({})
}


