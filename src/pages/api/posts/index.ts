import { prisma } from '@/libs/db';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    try {
      const createRes = await prisma.post.create({
        data: req.body,
      });
      res.status(200).json(createRes);
    } catch (error: any) {
      console.log(error);
      res.status(500).send({ message: 'failed to create' });
    }
  }
}
