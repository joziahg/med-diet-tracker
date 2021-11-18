import { useState, useEffect, cloneElement, forwardRef } from 'react'
import {
  Button, Dialog, DialogActions, DialogContent, Typography, DialogContentText,
  DialogTitle, useTheme, Grid, IconButton, ListItemAvatar, Avatar,
  List, ListItem, ListItemText, useMediaQuery, Slide
} from '@mui/material'
import TextField from '../components/formInputs/TextField'
import DeleteIcon from '@mui/icons-material/Delete'
import { format, formatDistance, parseISO } from 'date-fns'
import getTodaysPointsHit from '../lib/getPointsHit'
import { LoadingButton } from '@mui/lab'
import { useMutation, useQueryClient } from 'react-query'
import ConfirmDialog from '../components/ConfirmDialog'
import { useForm } from 'react-hook-form'
import axios from 'axios'

const Transition = forwardRef(function Transition (props, ref) {
  return <Slide direction='up' ref={ref} {...props} />
})

export default function FoodLog ({ children, meal }) {
  const { control, handleSubmit } = useForm()
  const [open, setOpen] = useState(false)
  const theme = useTheme()
  const queryClient = useQueryClient()
  const [totalPtsHit, setTotalPtsHit] = useState(0)
  const [todaysPointsHit, setTodaysPointsHit] = useState({
    legumes: false,
    fruitsNuts: false,
    healthyFats: false,
    dairy: false,
    meat: false,
    wholeGrains: false,
    vegtables: false,
    alcohol: false,
    fishSeafood: false
  })
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'))
  useEffect(() => {
    setTodaysPointsHit(getTodaysPointsHit([meal]))
  }, [meal, setTodaysPointsHit])
  useEffect(() => {
    let totalPts = 0
    Object.entries(todaysPointsHit).forEach(
      (point) => point[1] === true && totalPts++
    )
    setTotalPtsHit(totalPts)
  }, [todaysPointsHit, setTotalPtsHit])
  const handleClickOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }
  const onSubmit = async ({ content }) => {
    mutation.mutate({ content, mealId: meal.id })
  }
  const mutation = useMutation(newComment => {
    return axios.post('/api/comments', newComment)
  }, {
    onSuccess: () => {
      queryClient.invalidateQueries(['meals'])
    }
  })

  const deleteMeal = useMutation(meal => {
    return axios.delete('/api/meals', meal)
  }, {
    onSuccess: () => {
      queryClient.invalidateQueries(['meals'])
    }
  })

  return (
    <>
      <Dialog
        maxWidth='sm'
        fullWidth
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
        aria-labelledby='responsive-dialog-title'
      >
        <DialogTitle id='responsive-dialog-title'>
          <ConfirmDialog
            onConfirm={() => {
              deleteMeal.mutate({
                mealId: meal.id
              })
            }}
            confirmText='Delete Meal'
            cancelText='On second thought...'
            title='Are you sure you want to delete this meal?'
            message='Clicking "Delete Meal" will, believe it or not, delete the meal.'
          >
            <IconButton>
              <DeleteIcon />
            </IconButton>
          </ConfirmDialog>
          {format(new Date(meal.createdAt), 'PP p')}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <DialogContentText>
                <Typography>
                  Meal: {meal.food}
                </Typography>
                <Typography>
                  Sugar: {meal.sugar} grams
                </Typography>
                <Typography>
                  Med Points: {totalPtsHit}/9{' '}
                </Typography>
              </DialogContentText>
            </Grid>
            <Grid item xs={12} sm={6}>
              Comments:
              <List>
                {
            meal?.comments?.length > 0
              ? (
                <>
                  {meal.comments.map(comment => (
                    <ListItem key={comment.id}>
                      <ListItemAvatar>
                        <Avatar
                          alt={comment.user.name}
                          src={comment.user.image}
                          sx={{ width: 45, height: 45 }}
                        />
                      </ListItemAvatar>
                      <ListItemText
                        primary={comment.content}
                        secondary={`${comment.user.name} • ${formatDistance(parseISO(comment.createdAt), new Date())}`}
                      />
                    </ListItem>
                  ))}
                </>
                )
              : (
                <ListItem>
                  <ListItemText primary='No comments yet' />
                </ListItem>
                )
          }
              </List>

              <form onSubmit={handleSubmit(onSubmit)}>
                <TextField
                  label='New Comment'
                  placeholder='Excellent!'
                  fullWidth
                  name='content'
                  variant='outlined'
                  control={control}
                />
                <LoadingButton
                  loading={mutation.isLoading}
                  variant='contained'
                  type='submit'
                >
                  Send
                </LoadingButton>
              </form>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button fullWidth variant='contained' onClick={handleClose} color='primary'>
            Ok
          </Button>

        </DialogActions>
      </Dialog>
      {cloneElement(children, { onClick: handleClickOpen })}
    </>
  )
}
