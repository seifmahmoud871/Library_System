import userModel from "../../../../DB/model/user.model.js";
import { generateToken, verifyToken } from "../../../../utils/generateAndVerifyToken.js";
import { compare, hash } from "../../../../utils/hashAndCompare.js";
import validation from "../../../middleware/validation.js";
import { loginSchema, signUpSchema } from "../auth.validation.js";



export const signUp=async (req,res,next)=>{

    const {fullName,email,password,cPassword}=req.body;
    console.log({fullName,email,password,cPassword});
    const user =await userModel.findOne({email});

    if (user) {
        return res.json({ message: "Email already existed" });
    }

    const hashPassword = hash({plainText:password});
    const newUser =await userModel.create({fullName,email,password:hashPassword});

    return res.json({message:"Done",newUser});

}



export const logIn= async (req,res,next)=>{

    const {email,password}=req.body;
    console.log({email,password});
    const user = await userModel.findOne({ email });

    if (!user) {
        return next(new Error("Email not exist"));
    }

    const comparePassword = compare({plainText:password,hashText:user.password});

    if(!comparePassword){
        return next(new Error("In-valid password" ));
    }

    const token = generateToken({payload:{id:user.id,isLoggedIn:true}})

    user.status="online",
    await user.save();
    return res.json({ message: "Done", token });
    
}

// log Out --------------------------------

export const logOut = async (req,res,next)=>{

    const {authorization}=req.headers;
    const token = authorization.split(process.env.BEARER_KEY)[1];
    console.log({ token });
    const decoded = verifyToken({ token });
    decoded.isLoggedIn=false;
    
    const user=await userModel.findById(decoded.id);

    user.status="offline";
    await user.save();
    return res.json({message:"Done"});

}