//imports
import prisma from '../client';
// import types
import { Request, Response } from 'express';


// GET ALL
export const getAllComments = async (req: Request, res: Response) => {
  try {
    const comments = await prisma.comment.findMany({
      select: {
        content: true,
        user: {
          select: {
            username: true,
          }
        },
        post: true
      }
    })
    res.status(200).json(comments)
  } catch (error) {
    return res.status(500).send(error.message)
  }
}

//GET ONE
export const getCommentById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const comments = await prisma.comment.findUnique({
      where: {
        id: Number(id),
      },
      select: {
        content: true,
      }
    })
    res.status(200).json(comments)
  } catch (error) {
    return res.status(500).send(error.message)
  }
}

//CREATE COMMENT
export const createComment = async (req: Request, res: Response) => { 
  try {
    const comment = await prisma.comment.create({
      data: {
        ...req.body,
      }
    })
    res.status(200).json(comment)
  } catch (error) {
    return res.status(500).json({error: error.message})
  }
}

//UPDATE COMMENT
export const updateComment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const comment = await prisma.comment.update({
      where: { id: Number(id) },
      data: req.body
    });
    if (comment) {
      const updatedComment = await prisma.comment.findUnique({
        where: {
          id: Number(id)
        }
      });
      return res.status(200).json(updatedComment)
    } throw new Error('Comment not found');
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
};

//DELETE COMMENT
export const deleteComment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deleted = await prisma.comment.delete({
      where: { id: Number(id) }
    });
    if (deleted) {
      return res.status(204).send('Comment deleted');
    }
    throw new Error('Comment not found');
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}