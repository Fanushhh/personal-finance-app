'use server';
import mongoose, {Schema} from "mongoose";


const BudgetSchema = new Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref:'User',
    },
    id: {
        type:String,
        unique:true,
        required:true,

    },
    budgetCategory: {
        type:String,
        required:true,

    },
    maxSpend:{
        type:String,
        required:true,

    },
    colorPref:{
        type:String,
        required:true,
        
    },
    
}, {timestamps:true});

const Budget = mongoose.models.Budget || mongoose.model('Budget', BudgetSchema);
export default Budget;