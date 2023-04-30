import { Router } from "express";
import { errorHandler } from "../../../utils/errorHandling.js";
import { auth } from "../../middleware/auth.middleware.js";
import validation from "../../middleware/validation.js";
import * as validators from "./book.validation.js";
import * as bookController from './controller/book.js'
const router =  Router();


router.post('/addBook',validation(validators.bookValidationScheema),errorHandler(bookController.addBook));
router.get('/getAllBooks',errorHandler(bookController.getAllBooks));

// for authonticated user
router.post('/issueBook',validation(validators.issueBookValidationScheema),auth,errorHandler(bookController.issueBook));
router.get('/issued/getMyBooks',auth,errorHandler(bookController.getMyBooks));
router.get('/issued/search',validation(validators.searchValidationScheema),auth,errorHandler(bookController.searchForIssuedBook));
router.post('/returnBook',validation(validators.returnBookValidationScheema),auth,errorHandler(bookController.returnBook));



router.get('/notReturned',errorHandler(bookController.notReturnedBooks));
router.get('/notReturned/search',validation(validators.searchValidationScheema),errorHandler(bookController.searchFornotReturnedBooks));


export default router;