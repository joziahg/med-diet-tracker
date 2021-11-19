import { Typography, Box, useTheme, useMediaQuery } from '@mui/material'
import { endOfDay, startOfDay, format } from 'date-fns'
import { getSession } from 'next-auth/react'
import PieChart from '../components/PieChart'
import prisma from '../lib/prisma'
import { useQuery, dehydrate, QueryClient } from 'react-query'
import axios from 'axios'

const PatientHome = ({ session }) => {
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'))
  const { data: meals } = useQuery('meals', () => axios.get('/api/meals', {
    params: {
      periodStart: startOfDay(new Date()).getTime(),
      periodEnd: endOfDay(new Date()).getTime()
    }
  }).then(result => result.data))
  return (
    <Box
      sx={{
        display: 'flex',
        placeContent: 'center',
        height: '100%',
        flexDirection: 'column'
      }}
    >
      <Box mt={fullScreen ? 2 : 5}>
        <Typography variant='h4' align='center'>Welcome {session?.user?.name}!</Typography>
        <Typography variant='h4' align='center'>
          {format(new Date(), 'eeee, LLLL do')}
        </Typography>
      </Box>
      <PieChart meals={meals} />
    </Box>
  )
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
              gte: startOfDay(new Date())
            }
          },
          {
            createdAt: {
              lte: endOfDay(new Date())
            }
          },
          { userId: session.user.id }
        ]
      }
    })
  })
  return { props: { dehydratedState: dehydrate(queryClient), session } }
}

export default PatientHome
