'use server'

import mongoose, {Schema} from "mongoose";


const TransactionSchema = new Schema({
    author:{
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
        type:String,
        required:true,

    },
    category:{
        type:String,
        required:true,

    },
    amount:{
        type:String,
        required:true,

    },
    recurring:{
        type:String,
        required:true,

    },
});

const Transaction = mongoose.models.Transaction || mongoose.model('Transaction', TransactionSchema);

export default Transaction;