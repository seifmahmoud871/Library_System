import joi from 'joi'


export const signUpSchema = joi.object({

    fullName:joi.string().alphanum().required(),
    email:joi.string().email({maxDomainSegments:2,maxDomainSegments:3,tlds:{allow:['com','net','edu']}}).required(),
    password:joi.string().pattern(RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)).required(),
    cPassword:joi.string().valid(joi.ref("password")).required(),
 

}).required();


export const loginSchema = joi.object({

    email:joi.string().email({maxDomainSegments:2,maxDomainSegments:3,tlds:{allow:['com','net','edu']}}).required(),
    password:joi.string().pattern(RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)).required(),
 

}).required();