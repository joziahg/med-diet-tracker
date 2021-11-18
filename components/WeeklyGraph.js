import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
  Label,
  ResponsiveContainer
} from 'recharts'
import { useTheme, Box } from '@mui/material'
import {
  isSameWeek,
  isSunday,
  isMonday,
  isTuesday,
  isWednesday,
  isThursday,
  isFriday,
  isSaturday
} from 'date-fns'
import getPointsHit from '../lib/getPointsHit'
const daysOfWeek = ['Sun', 'Mon', 'Tues', 'Weds', 'Thurs', 'Fri', 'Sat']

const sumSugar = (accumulator, currentValue) => {
  if (typeof accumulator === 'object') {
    return accumulator.sugar + currentValue.sugar
  } else {
    return accumulator + currentValue.sugar
  }
}

const WeeklyGraph = ({ meals }) => {
  const theme = useTheme()

  const thisWeeksMeals = meals.filter((meal) => isSameWeek(new Date(meal.createdAt), new Date()))
  // eslint-disable-next-line
  const data = daysOfWeek.map((dayOfWeek) => {
    // eslint-disable-next-line
    switch (dayOfWeek) {
      case 'Sun': {
        const sundayMeals = thisWeeksMeals.filter((meal) =>
          isSunday(new Date(meal.createdAt))
        )
        const sundayPoints = getPointsHit(sundayMeals)
        return {
          name: 'Sun',
          sugar: sundayMeals.reduce(sumSugar, 0),
          medPts: Object.values(sundayPoints).filter(
            (pointHit) => pointHit === true
          ).length
        }
      }
      case 'Mon': {
        const mondayMeals = thisWeeksMeals.filter((meal) =>
          isMonday(new Date(meal.createdAt))
        )
        const mondayPoints = getPointsHit(mondayMeals)
        return {
          name: 'Mon',
          sugar: mondayMeals.reduce(sumSugar, 0),
          medPts: Object.values(mondayPoints).filter(
            (pointHit) => pointHit === true
          ).length
        }
      }
      case 'Tues': {
        const tuesdayMeals = thisWeeksMeals.filter((meal) =>
          isTuesday(new Date(meal.createdAt))
        )
        const tuesdayPoints = getPointsHit(tuesdayMeals)
        return {
          name: 'Tues',
          sugar: tuesdayMeals.reduce(sumSugar, 0),
          medPts: Object.values(tuesdayPoints).filter(
            (pointHit) => pointHit
          ).length
        }
      }
      case 'Weds': {
        const wednesdayMeals = thisWeeksMeals.filter((meal) =>
          isWednesday(new Date(meal.createdAt))
        )
        const wednesdayPoints = getPointsHit(wednesdayMeals)
        return {
          name: 'Weds',
          sugar: wednesdayMeals.reduce(sumSugar, 0),
          medPts: Object.values(wednesdayPoints).filter(
            (pointHit) => pointHit
          ).length
        }
      }
      case 'Thurs': {
        const thursdayMeals = thisWeeksMeals.filter((meal) =>
          isThursday(new Date(meal.createdAt))
        )
        const thursdayPoints = getPointsHit(thursdayMeals)
        return {
          name: 'Thurs',
          sugar: thursdayMeals.reduce(sumSugar, 0),
          medPts: Object.values(thursdayPoints).filter(
            (pointHit) => pointHit === true
          ).length
        }
      }
      case 'Fri': {
        const fridayMeals = thisWeeksMeals.filter((meal) =>
          isFriday(new Date(meal.createdAt))
        )
        const fridayPoints = getPointsHit(fridayMeals)
        return {
          name: 'Fri',
          sugar: fridayMeals.reduce(sumSugar, 0),
          medPts: Object.values(fridayPoints).filter(
            (pointHit) => pointHit === true
          ).length
        }
      }
      case 'Sat': {
        const saturdayMeals = thisWeeksMeals.filter((meal) =>
          isSaturday(new Date(meal.createdAt))
        )
        const saturdayPoints = getPointsHit(saturdayMeals)
        return {
          name: 'Sat',
          sugar: saturdayMeals.reduce(sumSugar, 0),
          medPts: Object.values(saturdayPoints).filter(
            (pointHit) => pointHit === true
          ).length
        }
      }
    }
  })
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%'
      }}
    >
      <ResponsiveContainer width='100%' height={500}>
        <LineChart
          width='100%'
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5
          }}
        >
          <CartesianGrid width='100%' strokeDasharray='3 3' />
          <XAxis dataKey='name' />
          <YAxis yAxisId='left' />
          <YAxis yAxisId='right' orientation='right' />
          <Tooltip />
          <Legend />
          <Line yAxisId='left' type='monotone' dataKey='sugar' stroke='#8884d8' />
          <Line
            yAxisId='right'
            type='monotone'
            dataKey='medPts'
            stroke='#82ca9d'
          />
          <ReferenceLine
            y={30}
            yAxisId='left'
            stroke='#00f8c8'
            ifOverflow='extendDomain'
            strokeWidth={2}
            strokeDasharray='6 6'
          >
            <Label style={{ fill: theme.palette.primary.contrastText }} position='top'>
              Avg Sugar Goal (30 grams)
            </Label>
          </ReferenceLine>
          <ReferenceLine
            y={7}
            yAxisId='right'
            stroke='#ffbb28'
            ifOverflow='extendDomain'
            strokeWidth={2}
            strokeDasharray='6 6'
          >
            <Label style={{ fill: theme.palette.primary.contrastText }} position='top'>
              Med Points Goal
            </Label>
          </ReferenceLine>
        </LineChart>
      </ResponsiveContainer>
    </Box>
  )
}
export default WeeklyGraph
