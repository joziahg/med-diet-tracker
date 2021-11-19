import { getSession } from 'next-auth/react'
import prisma from '../../../lib/prisma'

const handler = async (req, res) => {
  const session = await getSession({ req })
  if (!session) {
    res.status(401)
  } else if (req.method === 'GET') {
    const { periodStart, periodEnd } = req.query
    try {
      const users = await prisma.meal.findMany({
        where: {
          AND: [
            {
              createdAt: {
                gte: periodStart ? new Date(parseInt(periodStart)) : new Date()
              }
            },
            {
              createdAt: {
                lte: periodEnd ? new Date(parseInt(periodEnd)) : new Date()
              }
            },
            { userId: session.user.id }
          ]
        },
        include: {
          comments: {
            include: {
              user: true
            }
          }
        }
      })
      res.status(200).json(users)
    } catch (error) {
      console.error(error)
      res.status(500).json(error)
    }
  } else if (req.method === 'POST') {
    const {
      food, sugar, vegetables, healthyFats, fruitsNuts,
      fishSeafood, legumes, dairy, wholeGrains, meat, alcohol
    } = req.body
    try {
      const createdPost = await prisma.post.create({
        data: {
          food,
          sugar: parseInt(sugar),
          vegetables,
          healthyFats,
          fruitsNuts,
          fishSeafood,
          legumes,
          dairy,
          wholeGrains,
          meat,
          alcohol,
          user: {
            connect: { id: session.user.id }
          }
        }
      })
      res.status(200).json(createdPost)
    } catch (e) {
      console.error(e)
      return res.status(500)
    }
  } else if (req.method === 'DELETE') {
    try {
      const { mealId } = req.body
      const mealInQuestion = await prisma.meal.findUnique({
        where: {
          id: mealId
        }
      })
      if (mealInQuestion.userId !== session.user.id) {
        return res.status(401).json({ err: 'Not your meal to delete' })
      }
      await prisma.meal.delete({
        where: {
          id: mealId
        }
      })
    } catch (e) {
      return res.status(500)
    }
  } else {
    res.status(404)
  }
}

export default handler
