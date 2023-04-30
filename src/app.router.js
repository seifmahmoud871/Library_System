import connectDB from "../DB/connection.js";
import { globalErrorHandling } from "../utils/errorHandling.js";
import authRouter from "./modules/auth/auth.router.js"
import userRouter from "./modules/user/user.router.js";
import bookRouter from "./modules/book/book.router.js";

export const initApp=(app,express)=>{

    app.use(express.json({}));

    app.use('/auth',authRouter);
    app.use('/user',userRouter);
    app.use('/book',bookRouter);

    app.all('*',(req,res,next)=>{
        return res.json({message:"In-valid Routing"});
    })
    app.use(globalErrorHandling);
    connectDB();


}

