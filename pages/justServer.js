import { startOfMonth, endOfMonth } from 'date-fns'
import { QueryClient, dehydrate } from 'react-query'
import prisma from '../lib/prisma'
import { getSession } from 'next-auth/react'

const Toolbar = () => {
  return 'hi'
}

export const getServerSideProps = async (ctx) => {
  const session = await getSession(ctx)
  if (!session?.user) {
    return {
      redirect: {
        destination: '/login',
        permanent: false
      }
    }
  }
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery('meals', async () => {
    return prisma.meal.findMany({
      where: {
        AND: [
          {
            createdAt: {
              gte: startOfMonth(new Date())
            }
          },
          {
            createdAt: {
              lte: endOfMonth(new Date())
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
  })
  return { props: { dehydratedState: dehydrate(queryClient), session } }
}

export default Toolbar
