'use server';


import mongoose, {Schema} from "mongoose";

const PotSchema = new Schema({
    user:{
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    potName:{
        type:String,
        required:true,
    },
    target:{
        type:String,
        required:true,
    },
    currentAmount:{
        type:Number,
        required:true,
    },
    colorPref:{
        type:String,
        required:true,
    },

});

const Pot = mongoose.models.Pot || mongoose.model('Pot', PotSchema);

export default Pot;