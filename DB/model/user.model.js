import mongoose, { model, Schema } from "mongoose"

const userSchema = new Schema({
    fullName: {
        type: String,
        required: true,
    },
    mobileNumber: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    status:{
        type:String,
        default:'offline',
        enum:['offline','online','blocked'],
    },
}, {
    timestamps: true,
})


const userModel = mongoose.models.User || model('User', userSchema);

export default userModel;
