"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const auth_1 = require("../controllers/auth");
const router = express_1.Router();
exports.router = router;
router.get('/auth/verify', auth_1.verifyTokenUser);
