import { useState, useEffect } from 'react'
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer
} from 'recharts'
import AppleIcon from '@mui/icons-material/Apple'
import OutdoorGrillIcon from '@mui/icons-material/OutdoorGrill'
import {
  Fish,
  Carrot,
  BreadSlice,
  Seed,
  IceCream,
  GlassCocktail,
  BottleWineOutline
} from 'mdi-material-ui'
import { useTheme, useMediaQuery, Tooltip } from '@mui/material'
import getPointsHit from '../lib/getPointsHit'
import { Box } from '@mui/system'

const fakeData = [
  { name: 'legumes', value: 1 },
  { name: 'fruitsNuts', value: 1 },
  { name: 'healthyFats', value: 1 },
  { name: 'dairy', value: 1 },
  { name: 'meat', value: 1 },
  { name: 'wholeGrains', value: 1 },
  { name: 'vegetables', value: 1 },
  { name: 'alcohol', value: 1 },
  { name: 'fishSeafood', value: 1 }
]

const COLORS = [
  '#0088FE',
  '#00C49F',
  '#FFBB28',
  '#0088FE',
  '#00C49F',
  '#FFBB28',
  '#0088FE',
  '#00C49F',
  '#FFBB28'
]

const pointCategories = [
  { name: 'Legumes', dataKey: 'legumes' },
  { name: 'Fruits & Nuts', dataKey: 'fruitsNuts' },
  { name: 'Vegetables', dataKey: 'vegetables' },
  { name: 'Alcohol', dataKey: 'alcohol' },
  { name: 'Meat less than 4oz', dataKey: 'meat' },
  { name: 'Dairy Less than 7oz', dataKey: 'dairy' },
  { name: 'Fish/Seafood', dataKey: 'fishSeafood' },
  { name: 'Healthy Fats', dataKey: 'healthyFats' },
  { name: 'Whole Grains', dataKey: 'wholeGrains' }
]
const RADIAN = Math.PI / 180
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5
  const x = cx - 14.8 + radius * Math.cos(-midAngle * RADIAN)
  const y = cy - 14.8 + radius * Math.sin(-midAngle * RADIAN)

  switch (pointCategories[index].name) {
    case 'Fruits & Nuts':
      return (
        <foreignObject x={x} y={y} width={35} height={35}>
          <Tooltip title='Fruits & Nuts'>
            <div xmlns='http://www.w3.org/1999/xhtml'>
              <AppleIcon fontSize='large' />
            </div>
          </Tooltip>
        </foreignObject>
      )
    case 'Legumes':
      return (
        <foreignObject x={x} y={y} width={35} height={35}>
          <Tooltip title='Legumes'>
            <div xmlns='http://www.w3.org/1999/xhtml'>
              <Seed fontSize='large' />
            </div>
          </Tooltip>
        </foreignObject>
      )
    case 'Whole Grains':
      return (
        <foreignObject x={x} y={y} width={35} height={35}>
          <Tooltip title='Whole Grains'>
            <div xmlns='http://www.w3.org/1999/xhtml'>
              <BreadSlice fontSize='large' />
            </div>
          </Tooltip>
        </foreignObject>
      )
    case 'Vegetables':
      return (
        <foreignObject x={x} y={y} width={35} height={35}>
          <Tooltip title='Vegetables'>
            <div xmlns='http://www.w3.org/1999/xhtml'>
              <Carrot fontSize='large' />
            </div>
          </Tooltip>
        </foreignObject>
      )
    case 'Alcohol':
      return (
        <foreignObject x={x} y={y} width={35} height={35}>
          <Tooltip title='Alcoholic Beverage'>
            <div xmlns='http://www.w3.org/1999/xhtml'>
              <GlassCocktail fontSize='large' />
            </div>
          </Tooltip>
        </foreignObject>
      )
    case 'Healthy Fats':
      return (
        <foreignObject x={x} y={y} width={35} height={35}>
          <Tooltip title='Healthy Fats'>
            <div xmlns='http://www.w3.org/1999/xhtml'>
              <BottleWineOutline fontSize='large' />
            </div>
          </Tooltip>
        </foreignObject>
      )
    case 'Dairy Less than 7oz':
      return (
        <foreignObject x={x} y={y} width={35} height={35}>
          <Tooltip title='Less than 7oz of Dairy'>
            <div xmlns='http://www.w3.org/1999/xhtml'>
              <IceCream fontSize='large' />
            </div>
          </Tooltip>
        </foreignObject>
      )
    case 'Meat less than 4oz':
      return (
        <foreignObject x={x} y={y} width={35} height={35}>
          <Tooltip title='Less than 4oz of Red Meat'>
            <div xmlns='http://www.w3.org/1999/xhtml'>
              <OutdoorGrillIcon fontSize='large' />
            </div>
          </Tooltip>
        </foreignObject>
      )
    case 'Fish/Seafood':
      return (
        <foreignObject x={x} y={y} width={35} height={35}>
          <Tooltip title='Fish & Seafood'>
            <div xmlns='http://www.w3.org/1999/xhtml'>
              <Fish fontSize='large' />
            </div>
          </Tooltip>
        </foreignObject>
      )
    default:
      return (
        <foreignObject x={x} y={y} width={35} height={35}>
          <div xmlns='http://www.w3.org/1999/xhtml'>
            <Fish />
          </div>
        </foreignObject>
      )
  }
}

const sum = (accumulator, currentValue) => {
  if (typeof accumulator === 'object') {
    return accumulator.sugar + currentValue.sugar
  } else {
    return accumulator + currentValue.sugar
  }
}

export default function MealsPieChart ({ meals }) {
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'))
  const [todaysPointsHit, setTodaysPointsHit] = useState({
    legumes: true,
    fruitsNuts: false,
    healthyFats: false,
    dairy: true,
    meat: false,
    wholeGrains: true,
    vegetables: false,
    alcohol: false,
    fishSeafood: false
  })
  useEffect(() => {
    setTodaysPointsHit(getPointsHit(meals))
  }, [meals])
  const measurements = fullScreen
    ? {
        container: 320,
        viewBox: 160,
        innerRadius: 80,
        outerRadius: 140,
        circleRadius: 30
      }
    : {
        container: 400,
        viewBox: 200,
        innerRadius: 100,
        outerRadius: 175,
        circleRadius: 40
      }
  return (
    <>
      <ResponsiveContainer width='100%' height={measurements.container}>
        <PieChart>
          <foreignObject width='100%' height='100%'>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                height: '100%'
              }}
            >
              <svg
                viewBox={`0 0 ${measurements.viewBox} ${measurements.viewBox}`}
                width='100%'
                height='100%'
                xmlns='http://www.w3.org/2000/svg'
              >
                <circle cx={measurements.innerRadius} cy={measurements.innerRadius} r={measurements.circleRadius} fill='white' />
                <text
                  x='50%'
                  y='45%'
                  color='white'
                  fontSize='0.75rem'
                  dominantBaseline='middle'
                  textAnchor='middle'
                  style={{
                    whiteSpace: 'pre-line'
                  }}
                >
                  {`${meals.reduce(sum, 0)}g\n`}
                  Sugar
                </text>
              </svg>
            </Box>
          </foreignObject>

          <Pie
            isAnimationActive={false}
            data={fakeData}
            labelLine={false}
            paddingAngle={3}
            label={renderCustomizedLabel}
            outerRadius={measurements.outerRadius}
            innerRadius={measurements.innerRadius}
            fill='#8884d8'
            dataKey='value'
          >
            {pointCategories.map((category, index) => {
              const filled = todaysPointsHit[category.dataKey]
              return (
                <Cell
                  key={`cell-${index}`}
                  fill={filled ? COLORS[index % COLORS.length] : '#666666'}
                />
              )
            })}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </>
  )
}
