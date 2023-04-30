import Router from 'express';
import { errorHandler } from '../../../utils/errorHandling.js';
import { auth } from '../../middleware/auth.middleware.js';
import validation from '../../middleware/validation.js';
import * as userController from './controller/user.js'
import { updateSchema } from './user.validation.js';
const router=Router();

router.get('/profile',errorHandler(auth),errorHandler(userController.profile));
router.get('/users',errorHandler(userController.getAllUsers));
router.get('/softDelete',errorHandler(auth),errorHandler(userController.softDelete));
router.put('/update',validation(updateSchema),errorHandler(auth),errorHandler(userController.updateUser));
router.delete('/delete',errorHandler(auth),errorHandler(userController.deleteUser));


export default router;