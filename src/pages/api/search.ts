import { prisma } from '@/libs/db';
import { Post, User } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'GET') {
    try {
      const { q: query } = req.query;

      if (typeof query !== 'string') {
        throw new Error('Invalid request');
      }

      const posts: Array<Post> = await prisma.post.findMany({
        where: {
          OR: [
            {
              title: {
                contains: query,
                mode: 'insensitive',
              },
            },
            {
              description: {
                contains: query,
                mode: 'insensitive',
              },
            },
          ],
        },
        include: {
          user: true,
          comments: true,
        },
      });

      res.status(200).json({ posts });
    } catch (error: any) {
      console.log(error);
      res.status(500).end();
    }
  }
}
