import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/database';

type ResponseType = {
  message: string;
};

export default async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) => {
  if (req.method !== 'PATCH') {
    return res.status(400).json({ message: 'Method not supported' });
  }
  const { id } = req.query;

  try {
    const { done }: { done: boolean } = JSON.parse(req.body);
    await prisma.todo.update({
      where: {
        id: id as string
      },
      data: {
        done
      }
    });

    return res.status(200).json({
      message: 'Todo updated!'
    });
  } catch (err) {
    return res.status(400).json({ message: 'Something went wrong' });
  }
};
