import { Router } from  'express';
import { getAllUsers, getUserById, registerUser, loginUser, updateUser, deleteUser} from  '../controllers/users';
import {authenticateToken} from '../utils/auth';
import { userValidationRules, loginValidationRules, checkErrors } from '../utils/validation';

const router = Router();

router.get('/users', getAllUsers);
router.get('/users/:id', getUserById);
router.post('/users/', userValidationRules, checkErrors, registerUser);
router.put('/users/:id', userValidationRules, checkErrors, authenticateToken, updateUser);
router.delete('/users/:id', authenticateToken, deleteUser);
router.post('/users/login',  loginValidationRules, checkErrors, loginUser);

export { router };