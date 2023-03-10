import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/database';

type ResponseType = {
  message: string;
};

export default async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) => {
  if (!['PATCH', 'DELETE'].includes(req.method as string)) {
    return res.status(400).json({ message: 'Method not supported' });
  }
  const { id } = req.query;

  if (req.method === 'DELETE') {
    try {
      await prisma.todo.delete({
        where: {
          id: id as string
        }
      });
      return res.status(200).json({ message: 'Todo deleted!' });
    } catch (err) {
      return res.status(400).json({ message: 'Something went wrong' });
    }
  }
};
