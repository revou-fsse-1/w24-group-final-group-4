import { prisma } from '@/libs/db';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    res.status(403).send({ message: 'Unauthorized Operation' });
    return;
  }

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
