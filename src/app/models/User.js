import mongoose, {Schema, Model} from "mongoose";



const UserSchema = new Schema({
    id: {
        type:String,
        unique:true,
        required:true,

    },
    name:{
        type:String,
        required:true,

    },
    email:{
        type:String,
        required: [true, "Email is required"],
        match: [

            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
    
            "Email is invalid",
    
          ],
    },
    password:{
        type:String,
        required:true,
    },
    
}, {timestamps:true});

const User = mongoose.model('User', UserSchema);
export default User;