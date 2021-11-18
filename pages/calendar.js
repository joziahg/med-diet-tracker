import { Calendar, dateFnsLocalizer } from 'react-big-calendar'
import { format, parse, startOfWeek, getDay, startOfMonth, endOfMonth } from 'date-fns'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { ButtonGroup, Button, Box, useTheme, Fade, CircularProgress } from '@mui/material'
import { useState } from 'react'
import USLocale from 'date-fns/locale/en-US'
import axios from 'axios'
import { useQuery, QueryClient, dehydrate } from 'react-query'
import prisma from '../lib/prisma'
import { getSession } from 'next-auth/react'
import FoodLog from '../components/FoodLog'

const navigate = {
  PREVIOUS: 'PREV',
  NEXT: 'NEXT',
  DATE: 'DATE'
}

const locales = {
  'en-US': USLocale
}

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales
})

const Toolbar = ({ localizer: { messages }, label, classes, views, onView, onNavigate }) => {
  const viewNamesGroup = (messages) => {
    if (views.length > 1) {
      return views.map((name) => (
        <Button type='button' key={name} onClick={() => onView(name)}>
          {messages[name]}
        </Button>
      ))
    }
  }
  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        marginBottom: '10px',
        fontSize: '16px'
      }}
    >
      <ButtonGroup>
        <Button
          type='button'
          onClick={() => onNavigate(navigate.PREVIOUS)}
        >
          {messages.previous}
        </Button>
        <Button
          type='button'
          onClick={() => onNavigate(navigate.NEXT)}
        >
          {messages.next}
        </Button>
      </ButtonGroup>
      <span className='rbc-toolbar-label'>{label}</span>
      <ButtonGroup>{viewNamesGroup(messages)}</ButtonGroup>
    </Box>
  )
}

function Event ({ event }) {
  return (

    <FoodLog meal={event}>
      <div>
        <strong style={{ color: 'white' }}>{event.food}</strong>
        {event.details && ':  ' + event.details}
      </div>
    </FoodLog>
  )
}

const MyCalendar = () => {
  const [dateRange, setDateRange] = useState({ start: startOfMonth(new Date()), end: endOfMonth(new Date()) })
  const { data: meals, isError, isLoading } = useQuery(['meals', dateRange], () => axios.get('/api/meals', {
    params: {
      periodStart: dateRange.start.getTime(),
      periodEnd: dateRange.end.getTime()
    }
  }).then(result => result.data))
  const theme = useTheme()
  if (isError) return 'oops something broke'
  return (
    <Box sx={{ height: '100%' }}>
      <Fade
        in={isLoading}
        style={{
          transitionDelay: isLoading ? '800ms' : '0ms'
        }}
        unmountOnExit
      >
        <Box sx={{ position: 'absolute', left: '50%', top: '50%', zIndex: 20 }}>
          <CircularProgress color='secondary' />
        </Box>
      </Fade>

      <Calendar
        localizer={localizer}
        onRangeChange={range => {
          if (Array.isArray(range)) {
            setDateRange({
              start: range[0],
              end: range[range.length - 1]
            })
          } else {
            setDateRange(range)
          }
        }}
        views={{ month: true, week: true, day: true, agenda: true }}
        events={meals || []}
        startAccessor={event => new Date(event.createdAt)}
        endAccessor={event => new Date(event.createdAt)}
        style={{ height: '100%' }}
        titleAccessor={meal => meal.food}
        components={{
          event: Event,
          toolbar: Toolbar
        }}
        eventPropGetter={() => ({
          style: {
            backgroundColor: `${theme.palette.secondary.main} !important`
          }
        })}
        slotPropGetter={() => ({
          style: {
            backgroundColor: `${theme.palette.secondary.main} !important`
          }
        })}
        dayPropGetter={() => ({
          style: {
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.primary.contrastText
          }
        })}
      />
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

export default MyCalendar
