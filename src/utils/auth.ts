//imports
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv'

//import types
import { Request, Response, NextFunction } from 'express';

//load env
dotenv.config()

//hash user's passwords (when creating user)
export const hashPassword = (pass: string) => {
  const hashedPassword = bcrypt.hash(pass, 10);
  return hashedPassword;
}

//generate a json web token (when creating user)
export const generateToken = (user: object) => {
  const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_KEY as jwt.Secret,
  { expiresIn: '24h' })
  return accessToken
}

//compare bcrypted pass with entered pass
export const comparePass = (pass: string, userPass: string) => {
  return bcrypt.compare(pass, userPass)
}

//authenticate token in header
export const authenticateToken = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if (token == null) return res.status(401).send('Invalid Token')

  jwt.verify(token, process.env.ACCESS_TOKEN_KEY as string, (err, user) => {
    if (err) return res.status(403).send(err.message)
    req.body.user = user
    next()
  })
}
