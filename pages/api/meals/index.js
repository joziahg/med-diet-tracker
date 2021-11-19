import { getSession } from 'next-auth/react'
import prisma from '../../../lib/prisma'
import { withSentry } from '@sentry/nextjs'

async function handler (req, res) {
  const session = await getSession({ req })
  if (!session?.user) {
    res.status(401)
  } else {
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
          res.status(400).json(err)
          break
        }
        res.json(result)
        break
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
        res.json(meals)
        break
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
          break
        }
        const meals = await prisma.meal.delete({
          where: {
            id: mealId
          }
        })
        res.json(meals)
        break
      }
    }
  }
}

export default withSentry(handler)
