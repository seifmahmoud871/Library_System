import mongoose, { model, Schema, Types } from "mongoose";


const bookSchema = new Schema({
    bookName:{
        type:String,
        unique:true,
        required:true,
    },
    bookType:{
        type:String,
        required:true,
    },
    author:{
        type:String,
        required:true,
    },
    issued:{
       type:Boolean,
       default:false,
    },
    issuedDate:{
        type:Date,
    },
    returnDate:{
        type:Date,
    },
    late:{
        type:Number,
    },
    issueruser:{
        type:Types.ObjectId,
        ref:"User"
    }

},{
    timestamps:true,
}) ;

const bookModel = mongoose.models.book || model('Book',bookSchema);

export default bookModel;