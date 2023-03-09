import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/database';
import { TodoInput, TodosData } from '@/utils/types';

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
      return res.status(400).json({ message: 'Something went wrong' });
    }
  } else if (req.method === 'POST') {
    const { title, description }: TodoInput = JSON.parse(req.body);
    try {
      await prisma.todo.create({
        data: {
          title,
          description
        }
      });
      return res.status(200).json({ message: 'Todo added!' });
    } catch (error) {
      return res.status(400).json({ message: 'Something went wrong' });
    }
  } else {
    res.status(400).json({ message: 'Method not supported' });
  }
}
