'use server';


import mongoose, {Schema} from "mongoose";

const PotsSchema = new Schema({
    user:{
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    name:{
        type:String,
        required:true,
    },
    total:{
        type:String,
        required:true,
    },
    target:{
        type:String,
        required:true,
    },
    theme:{
        type:String,
        required:true,
    },

});

const Pot = mongoose.models.Pot || mongoose.model('Pot', PotsSchema);

export default Pot;