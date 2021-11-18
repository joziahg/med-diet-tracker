import { forwardRef } from 'react'
import { format } from 'date-fns'
import {
  Dialog, DialogActions, DialogContent, DialogTitle,
  Button, Slide, useMediaQuery, useTheme, FormGroup, Box, Typography
} from '@mui/material'
import { useForm } from 'react-hook-form'
import TextField from '../components/formInputs/TextField'
import Checkbox from '../components/formInputs/Checkbox'
import { useQueryClient, useMutation } from 'react-query'
import { LoadingButton } from '@mui/lab'
import axios from 'axios'

const Transition = forwardRef(function Transition (props, ref) {
  return <Slide direction='up' ref={ref} {...props} />
})

export default function NewMealDialog ({ open, setOpen }) {
  const queryClient = useQueryClient()
  const { control, handleSubmit } = useForm()
  const handleClose = () => {
    setOpen(false)
  }
  const createMeal = useMutation(newMeal => {
    return axios.post('/api/meals', newMeal)
  }, {
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries('meals')
      handleClose()
    }
  })
  const onSubmit = async data => {
    createMeal.mutate(data)
  }
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'))

  return (
    <Dialog
      open={open}
      fullScreen={fullScreen}
      onClose={handleClose}
      TransitionComponent={Transition}
    >
      <DialogTitle>New Meal for {format(new Date(), 'eeee, LLLL do')}</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <TextField name='food' label='Food' control={control} required fullWidth placeholder='What did you eat?' />
          <TextField name='sugar' label='Sugar Content (g)' control={control} required fullWidth placeholder='How much sugar was in it?' type='number' />
          <Typography align='center'>Mark all the points your food contained</Typography>
          <Box sx={{ display: 'flex', placeContent: 'center' }}>
            <FormGroup>
              <Checkbox name='vegetables' label='Vegetables' control={control} />
              <Checkbox name='healthyFats' label='Healthy Fats' control={control} />
              <Checkbox name='fruitsNuts' label='Fruits & Nuts' control={control} />
              <Checkbox name='fishSeafood' label='Fish & Seafood' control={control} />
            </FormGroup>
            <FormGroup>
              <Checkbox name='legumes' label='Legumes' control={control} />
              <Checkbox name='dairy' label='Less than 7oz of Dairy' control={control} />
              <Checkbox name='wholeGrains' label='Whole Grains' control={control} />
              <Checkbox name='meat' label='Meat' control={control} />
              <Checkbox name='alcohol' label='Alcohol' control={control} />
            </FormGroup>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button disabled={createMeal.isLoading} fullWidth onClick={handleClose} variant='outlined'>Cancel</Button>
          <LoadingButton loading={createMeal.isLoading} fullWidth type='submit' variant='contained'>Log Meal</LoadingButton>
        </DialogActions>
      </form>
    </Dialog>
  )
}
