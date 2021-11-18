import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import { useState, cloneElement, useEffect } from 'react'
import { LoadingButton } from '@mui/lab'

export default function ConfirmDialog ({ onConfirm, onCancel, disabled, title, message, children, confirmText, cancelText }) {
  const [open, setOpen] = useState(false)
  const [timeLeft, setTimeLeft] = useState(null)
  useEffect(() => {
    if (open) {
      if (timeLeft === null) {
        setTimeLeft(3)
      } if (timeLeft > 0) {
        setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      }
    }
  }, [open, timeLeft])

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleCancel = () => {
    setOpen(false)
    setTimeLeft(null)
  }

  const handleConfirm = () => {
    onConfirm()
    setOpen(false)
  }

  return (
    <>
      {cloneElement(children, {
        onClick: handleClickOpen
      })}
      <Dialog
        open={open}
        onClose={handleCancel}
        aria-labelledby='confirm-dialog-title'
        aria-describedby='confirm-dialog-description'
      >
        <DialogTitle id='confirm-dialog-title'>
          {title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id='confirm-dialog-description' sx={{ whiteSpace: 'pre-line' }}>
            {message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} variant='outlined'>{cancelText}</Button>
          <LoadingButton loading={timeLeft !== 0} disabled={disabled} variant='contained' color='error' loadingIndicator={timeLeft} onClick={handleConfirm}>
            {confirmText}
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  )
}
