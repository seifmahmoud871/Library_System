import joi from "joi";
import { startOfDay } from 'date-fns';

export const bookValidationScheema = {

    body:joi.object({
        bookName:joi.string().required(),
        bookType:joi.string().required(),
        author:joi.string().required(),
    }).required(),

}

export const issueBookValidationScheema = {

    body:joi.object().keys({
        bookName:joi.string().required(),
        returnDate:joi.date().required().greater(Date.now() + 12*60 * 60 * 1000),
    }).required(),
    
}

export const searchValidationScheema = {

    body:joi.object({
        bookName:joi.string().required(),
    }).required(),
    
}

export const returnBookValidationScheema = {

    body:joi.object({
        bookName:joi.string().required(),
    }).required(),
    
}

