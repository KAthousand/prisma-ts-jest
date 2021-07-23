"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const comments_1 = require("../controllers/comments");
const auth_1 = require("../utils/auth");
const validation_1 = require("../utils/validation");
const router = express_1.Router();
exports.router = router;
router.get('/comments', comments_1.getAllComments);
router.get('/comments/:id', comments_1.getCommentById);
router.post('/comments/', validation_1.commentValidationRules, validation_1.checkErrors, auth_1.authenticateToken, comments_1.createComment);
router.put('/comments/:id', validation_1.commentValidationRules, validation_1.checkErrors, auth_1.authenticateToken, comments_1.updateComment);
router.delete('/comments/:id', auth_1.authenticateToken, comments_1.deleteComment);
//# sourceMappingURL=comments.js.map