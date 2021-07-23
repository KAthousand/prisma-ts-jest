//imports
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'
import prisma from '../client';

//import types
import { Request, Response } from 'express';

//load env
dotenv.config()

//verify token user
export const verifyTokenUser = async (req: Request, res: Response) => {
    if (req.headers) {
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]
        if (token == null) return res.status(401).send('Invalid Token')
        try {
            const decoded = <any>jwt.verify(token, process.env.ACCESS_TOKEN_KEY as jwt.Secret);
            const user = await prisma.user.findUnique({
                where: {
                    id: Number(decoded.id)
                },
                select: {
                    id: true,
                    email: true,
                    username: true,
                }
            });
            if (user) {
                return res.status(200).json({ user });
            }
        } catch (e) {
            return res.status(401).send('Unauthorized');
        }
            return res.status(404).send('User with the specified ID does not exist');
    }
    return res.send(500);
}
