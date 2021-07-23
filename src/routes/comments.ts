import { Router } from  'express';
import { getAllComments, getCommentById, createComment, updateComment, deleteComment} from  '../controllers/comments';
import {authenticateToken} from '../utils/auth';
import { commentValidationRules, checkErrors } from '../utils/validation';

const router = Router();

router.get('/comments', getAllComments);
router.get('/comments/:id', getCommentById);
router.post('/comments/', commentValidationRules, checkErrors, authenticateToken, createComment);
router.put('/comments/:id', commentValidationRules, checkErrors, authenticateToken, updateComment);
router.delete('/comments/:id', authenticateToken, deleteComment);

export { router };