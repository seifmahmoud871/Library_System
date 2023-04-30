import userModel from "../../DB/model/user.model.js";
import { verifyToken } from "../../utils/generateAndVerifyToken.js";

export const auth = async (req, res, next) => {

    // try {
        const { authorization } = req.headers;
        console.log({ authorization });


        if (!authorization?.startsWith(process.env.BEARER_KEY)) {
            return res.json({ message: "In-valid bearer key" });
        }

        const token = authorization.split(process.env.BEARER_KEY)[1];
        console.log({ token });
        const decoded = verifyToken({ token });
        if (!decoded?.id) {
            return res.json({ message: "In-valid token payload" });
        }

        console.log(decoded);

        const authUser = await userModel.findById(decoded.id).select("fullName email status ");

        if(!authUser){
            return res.json({message:"user no longer available "})
        }
        req.user = authUser;
        console.log({authUser});
        next();

    // } catch (error) {
    //     return res.json({ message: "ERROR", error, stack: error.stack });

    // }


}

