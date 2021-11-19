import { Typography, Box, useTheme, useMediaQuery } from '@mui/material'
import { endOfWeek, startOfWeek, format } from 'date-fns'
import { getSession } from 'next-auth/react'
import WeeklyGraph from '../components/WeeklyGraph'
import prisma from '../lib/prisma'
import { useQuery, QueryClient, dehydrate } from 'react-query'
import axios from 'axios'

const WeekView = ({ session }) => {
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'))
  const { data: meals } = useQuery('meals', () => axios.get('/api/meals', {
    params: {
      periodStart: startOfWeek(new Date()).getTime(),
      periodEnd: endOfWeek(new Date()).getTime()
    }
  }).then(result => result.data))
  if (!session) return null
  return (
    <Box
      sx={{
        display: 'flex',
        placeContent: 'center',
        height: '100%',
        flexDirection: 'column'
      }}
    >
      <Box my={fullScreen ? 2 : 5}>
        <Typography variant='h4' align='center'>
          Week of {format(new Date(), 'eeee, LLLL do')}
        </Typography>
      </Box>
      <WeeklyGraph meals={meals} />
    </Box>
  )
}

export const getServerSideProps = async (ctx) => {
  const session = await getSession(ctx)
  if (!session) {
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
              gte: startOfWeek(new Date())
            }
          },
          {
            createdAt: {
              lte: endOfWeek(new Date())
            }
          },
          { userId: session.user.id }
        ]
      }
    })
  })
  return { props: { dehydratedState: dehydrate(queryClient), session } }
}

WeekView.auth = true

export default WeekView
