import joi from "joi";


export const updateSchema = joi.object({

    fullName:joi.string().alphanum(),
    mobileNumber:joi.string().pattern(RegExp(/^01[0125][0-9]{8}$/))
 

}).required();