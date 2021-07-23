//imports
import prisma from '../client';
// import types
import { Request, Response } from 'express';

//GET ALL
export const getAllPosts = async (req: Request, res: Response) => {
  try {
    const posts = await prisma.post.findMany({
      orderBy: [
        {
          createdAt: 'desc'
        },
      ],
      select: {
        id: true,
        title: true,
        content: true,
        createdAt: true,
        user: {
          select: {
            username: true,
            id: true
          }
        },
        _count: {
          select: {comments: true}
        },
        comments: {
          orderBy: [
            {
              createdAt: 'desc'
            },
          ],
          select: {
            id: true,
            content: true,
            createdAt: true,
            user: true,
          },
        },
      },
    })
    res.status(200).json(posts)
  } catch (error) {
    return res.status(500).send(error.message)
  }
}

//GET ONE POST
export const getPostById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const posts = await prisma.post.findUnique({
      where: {
        id: Number(id),
      },
      select: {
        id: true,
        title: true,
        content: true,
        createdAt: true,
        comments: {
          orderBy: [
            {
              createdAt: 'desc'
            },
          ],
          select: {
            id: true,
            content: true,
            createdAt: true,
            user: true,
          }
        },
        user: {
          select: {
            username: true,
            id: true
          }
        },
        _count: {
          select: {
            comments: true
          },
        }
      }
    })
    res.status(200).json(posts)
  } catch (error) {
    return res.status(500).send(error.message)
  }
}

//CREATE POST
export const createPost = async (req: Request, res: Response) => {
  try {
    const post = await prisma.post.create({
      data: {
        ...req.body,
        // user: {connect: {userId: user}}
      }
    })
    res.status(200).json(post)
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

//UPDATE POST
export const updatePost = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const post = await prisma.post.update({

      where: { id: Number(id) },
      data: {
        title: req.body.title,
        content: req.body.content

      }
    });
    if (post) {
      const updatedPost = await prisma.post.findUnique({
        where: {
          id: Number(id)
        }
      });
      return res.status(200).json(updatedPost)
    } throw new Error('Post not found');
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
};


//DELETE POST
export const deletePost = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deleted = await prisma.post.delete({
      where: { id: Number(id) }
    });
    if (deleted) {
      return res.status(204).send('Post deleted');
    }
    throw new Error('Post not found');
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}