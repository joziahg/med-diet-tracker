import { getSession } from 'next-auth/react'
import prisma from '../../../lib/prisma'

export default async function handler (req, res) {
  const session = await getSession({ req })
  if (!session?.user) {
    return res.status(401)
  }
  switch (req.method) {
    case 'POST': {
      const {
        food, sugar, vegetables, healthyFats, fruitsNuts,
        fishSeafood, legumes, dairy, wholeGrains, meat, alcohol
      } = req.body
      let result
      try {
        result = await prisma.meal.create({
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
      } catch (err) {
        return res.status(400).json(err)
      }
      res.json(result)
      return
    }
    case 'GET': {
      const { periodStart, periodEnd } = req.query
      const meals = await prisma.meal.findMany({
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
      return res.json(meals)
    }
    case 'DELETE': {
      const { mealId } = req.body
      const mealInQuestion = await prisma.meal.findUnique({
        where: {
          id: mealId
        }
      })
      if (mealInQuestion.userId !== session.user.id) {
        res.send(401).json({ err: 'Not your meal to delete' })
        return
      }
      const meals = await prisma.meal.delete({
        where: {
          id: mealId
        }
      })
      return res.json(meals)
    }
  }
}
