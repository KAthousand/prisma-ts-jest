"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const users_1 = require("../controllers/users");
const auth_1 = require("../utils/auth");
const validation_1 = require("../utils/validation");
const router = express_1.Router();
exports.router = router;
router.get('/users', users_1.getAllUsers);
router.get('/users/:id', users_1.getUserById);
router.post('/users/', validation_1.userValidationRules, validation_1.checkErrors, users_1.registerUser);
router.put('/users/:id', validation_1.userValidationRules, validation_1.checkErrors, auth_1.authenticateToken, users_1.updateUser);
router.delete('/users/:id', auth_1.authenticateToken, users_1.deleteUser);
router.post('/users/login', validation_1.loginValidationRules, validation_1.checkErrors, users_1.loginUser);
//# sourceMappingURL=users.js.map