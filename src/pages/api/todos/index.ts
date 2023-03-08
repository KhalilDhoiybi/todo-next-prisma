import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/database';
import { TodosData } from '@/utils/types';

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<TodosData[] | unknown>
) {
  if (req.method === 'GET') {
    try {
      const todos = await prisma.todo.findMany({
        select: {
          id: true,
          title: true,
          description: true,
          done: true
        }
      });
      return res.status(200).json(todos);
    } catch (error) {
      return res.status(200).json({ error });
    }
  }
}
