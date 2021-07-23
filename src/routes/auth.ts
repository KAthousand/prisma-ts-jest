import { Router } from  'express';
import { verifyTokenUser } from '../controllers/auth';

const router = Router();

router.get('/auth/verify', verifyTokenUser);

export {router};

