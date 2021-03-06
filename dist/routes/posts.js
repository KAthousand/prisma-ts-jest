"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const posts_1 = require("../controllers/posts");
const auth_1 = require("../utils/auth");
const validation_1 = require("../utils/validation");
const router = express_1.Router();
exports.router = router;
router.get('/posts', posts_1.getAllPosts);
router.get('/posts/:id', posts_1.getPostById);
router.post('/posts/', validation_1.postValidationRules, validation_1.checkErrors, auth_1.authenticateToken, posts_1.createPost);
router.put('/posts/:id', validation_1.postValidationRules, validation_1.checkErrors, auth_1.authenticateToken, posts_1.updatePost);
router.delete('/posts/:id', auth_1.authenticateToken, posts_1.deletePost);
