import { Router } from "express";
import { errorHandler } from "../../../utils/errorHandling.js";
import validation from "../../middleware/validation.js";
import { loginSchema, signUpSchema } from "./auth.validation.js";
import * as authController from './controller/auth.js'
const router=Router();


router.post('/signup',validation(signUpSchema),errorHandler(authController.signUp));
router.post('/login',validation(loginSchema),errorHandler(authController.logIn));
router.get('/logout',errorHandler(authController.logOut));

export default router;