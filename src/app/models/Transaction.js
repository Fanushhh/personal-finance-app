'use server'

import mongoose, {Schema} from "mongoose";
import { date } from "zod";


const TransactionSchema = new Schema({
    user:{
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    avatar: {
        type:String,
        required:false,

    },
    name: {
        type:String,
        required:true,

    },
    date:{
        type:Date,
        required:true,

    },
    category:{
        type:String,
        required:true,

    },
    amount:{
        type:Number,
        required:true,

    },
    recurring:{
        type:String,
        required:true,

    },
});

const Transaction = mongoose.models.Transaction || mongoose.model('Transaction', TransactionSchema);

export default Transaction;