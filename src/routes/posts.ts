import { Router } from  'express';
import { getAllPosts, getPostById, createPost, updatePost, deletePost} from  '../controllers/posts';
import {authenticateToken} from '../utils/auth';
import { postValidationRules, checkErrors } from '../utils/validation';

const router = Router();

router.get('/posts', getAllPosts);
router.get('/posts/:id', getPostById);
router.post('/posts/', postValidationRules, checkErrors, authenticateToken, createPost);
router.put('/posts/:id', postValidationRules, checkErrors, authenticateToken, updatePost);
router.delete('/posts/:id', authenticateToken, deletePost);

export { router };