"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkErrors = exports.simpleValidation = exports.commentValidationRules = exports.postValidationRules = exports.loginValidationRules = exports.userValidationRules = void 0;
const express_validator_1 = require("express-validator");
exports.userValidationRules = [
    express_validator_1.body('email')
        .isLength({ min: 1 })
        .isEmail()
        .withMessage('Must be a valid email address'),
    express_validator_1.body('username')
        .isLength({ min: 1 })
        .withMessage('Username cannot be blank'),
    express_validator_1.body('password')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters.')
];
exports.loginValidationRules = [
    express_validator_1.body('email')
        .isLength({ min: 1 })
        .withMessage('Email cannot be blank'),
    express_validator_1.body('email')
        .isEmail()
        .withMessage('Must be a valid email address'),
    express_validator_1.body('password')
        .isLength({ min: 1 })
        .withMessage('Password cannot be blank')
];
exports.postValidationRules = [
    express_validator_1.body('title')
        .isLength({ min: 1 })
        .withMessage('Title cannot be blank'),
    express_validator_1.body('content')
        .isLength({ min: 1 })
        .withMessage('Content cannot be blank'),
];
exports.commentValidationRules = [
    express_validator_1.body('content')
        .isLength({ min: 1 })
        .withMessage('Comment cannot be blank'),
];
exports.simpleValidation = express_validator_1.validationResult.withDefaults({
    formatter: err => err.msg
});
const checkErrors = (req, res, next) => {
    const errors = exports.simpleValidation(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(errors.mapped());
    }
    next();
};
exports.checkErrors = checkErrors;
