import { getSession } from 'next-auth/react'
import prisma from '../../../lib/prisma'

export default async function handler (req, res) {
  const session = await getSession({ req })
  if (!session?.user) {
    res.status(401)
  }
  switch (req.method) {
    case 'POST': {
      const {
        content, mealId
      } = req.body
      let result
      try {
        result = await prisma.comment.create({
          data: {
            content,
            meal: { connect: { id: mealId } },
            user: { connect: { id: session.user.id } }
          }
        })
      } catch (err) {
        res.status(400).json(err)
      }
      res.json(result)
    }
  }
}
