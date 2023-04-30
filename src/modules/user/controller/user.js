import userModel from "../../../../DB/model/user.model.js";


export const profile=async (req,res,next)=>{
    
    const {id}=req.user;
    console.log({id});
    const user =await userModel.findById(id);
    return res.json({message:"Done",user});

}


export const updateUser = async (req,res,next)=>{

    const {id}=req.user;
    console.log({id});
    const updatedUser =await userModel.findByIdAndUpdate(id,req.body,{new:true});
    return res.json({message:"Done",updatedUser});

}


export const deleteUser = async (req,res,next)=>{

    const {id}=req.user;
    console.log({id});
    const deletedUser =await userModel.findByIdAndDelete(id);
    return res.json({message:"Done",deletedUser});

}


export const getAllUsers = async (req,res,next)=>{
    
    const users =await userModel.find();
    return res.json({message:"Done",users});

}


export const softDelete= async(req,res,next)=>{
    const {id}=req.user;
    console.log({id});
    const user =await userModel.findById(id);
    user.status="blocked";
    await user.save();
    return res.json({message:"Done",user});
}