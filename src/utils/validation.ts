import { body, validationResult } from 'express-validator';
import {Request, Response, NextFunction} from 'express'

export const userValidationRules = [
  body('email')
    .isLength({ min: 1 })
    .isEmail()
    .withMessage('Must be a valid email address'),
  body('username')
    .isLength({ min: 1 })
    .withMessage('Username cannot be blank'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters.')
]

export const loginValidationRules = [
  body('email')
    .isLength({ min: 1 })
    .withMessage('Email cannot be blank'),
  body('email')
    .isEmail()
    .withMessage('Must be a valid email address'),
  body('password')
    .isLength({ min: 1 })
    .withMessage('Password cannot be blank')
]

export const postValidationRules = [
  body('title')
    .isLength({ min: 1 })
    .withMessage('Title cannot be blank'),
  body('content')
    .isLength({ min: 1 })
    .withMessage('Content cannot be blank'),
]

export const commentValidationRules = [
  body('content')
    .isLength({ min: 1 })
    .withMessage('Comment cannot be blank'),
]

export const simpleValidation = validationResult.withDefaults({
  formatter: err => err.msg
})

export const checkErrors = (req: Request, res: Response, next: NextFunction) => {
  const errors = simpleValidation(req)
  if (!errors.isEmpty()) {
    return res.status(400).json(errors.mapped())
  }
  next()
}
