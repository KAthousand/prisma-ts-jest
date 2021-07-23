//imports
import prisma from '../client';
// import types
import { Request, Response } from 'express';
//import functions
import { comparePass, generateToken, hashPassword } from '../utils/auth';

//GET ALL
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        username: true,
        email: true
      }
    })
    res.status(200).json(users)
  } catch (error) {
    return res.status(500).send(error.message)
  }
}

//GET ONE 
export const getUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const users = await prisma.user.findUnique({
      where: {
        id: Number(id)
      },
      select: {
        username: true,
        email: true
      } 
    })
    res.status(200).json(users)
  } catch (error) {
    return res.status(500).send(error.message)
  }
}

//REGISTER USER, REQUIRES AUTH
export const registerUser = async (req: Request, res: Response) => {
  try {
    const hashedPassword = await hashPassword(req.body.password)
    const user = await prisma.user.create({
      data: {
        ...req.body,
        password: hashedPassword
      },
      select: {
        // id: true,
        // uuid: true,
        email: true,
        username: true
      }
    })
    const accessToken =  generateToken(user)
    res.status(200).json({accessToken: accessToken, user: user})
  } catch (error) {
    console.log(error.message)
    return res.status(500).json(error.message)
  }
}

//LOGIN USER, REQUIRES AUTH
export const loginUser = async (req: Request, res: Response) => {
  const user = await prisma.user.findUnique({
    where: { email: req.body.email },
  })
  if (user == null) {
    return res.status(400).json({error: "Cannot find user"})
  }
  try {
    const passwordMatch = await comparePass(req.body.password, user.password)
    if (passwordMatch) {
      const accessToken = generateToken(user)
      res.status(200)
      res.json({accessToken: accessToken})
    } else {
      res.status(401).send("Incorrect Email or Password")
    }
  } catch (error) {
    return res.status(500).send(error.message)
  }
}

//UPDATE USER
export const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await prisma.user.update({
      where: { id: Number(id) },
      data: req.body
    });
    if (user) {
      const updatedUser = await prisma.user.findUnique({
        where: { id: Number(id) },
        select: {
          username: true,
          email: true
        }
      });
      return res.status(200).json(updatedUser)
    } throw new Error('User not found');
  } catch (error) {
    return res.status(500).send(error.message)
  }
}


//DELETE USER
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deleted = await prisma.user.delete({
      where: { id: Number(id) }
    });
    if (deleted) {
      return res.status(204).send('User deleted');
    }
    throw new Error('User not found');
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}