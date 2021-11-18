import useGoogleOneTap from '../components/hooks/useGoogleOneTap'
import { signIn } from 'next-auth/react'
import { useTheme, Button, Box, Typography, Container, Avatar } from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Head from 'next/head'

export default function Login () {
  const {
    isLoading, showFallback
  } = useGoogleOneTap()
  const theme = useTheme()

  return (
    <>
      <Head>
        <script src='https://accounts.google.com/gsi/client' async defer />
      </Head>
      <Container maxWidth='sm'>
        <Box sx={{
          marginTop: theme => theme.spacing(8),
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center'
        }}
        >
          <Avatar
            sx={{
              backgroundColor: theme.palette.secondary.main
            }}
          >
            <LockOutlinedIcon />
          </Avatar>
          <Typography mt={1} component='h5' variant='h5' align='center'>
            Welcome to Rudimentary Health!
          </Typography>
          <Typography component='h5' variant='h5' align='center'>
            Sign in or sign up below
          </Typography>
          <Box my={2} />
          <Box
            sx={{
              position: 'relative',
              top: 0,
              left: 0,
              marginTop: theme => theme.spacing(1)
            }}
            id='googleonetap'
          />
          {showFallback && !isLoading && (
            <Button
              variant='outlined'
              onClick={() => signIn('google', {
                callbackUrl: '/'
              })}
              sx={{
                marginTop: theme => theme.spacing(3),
                backgroundColor: theme => theme.palette.backgroundColor
              }}
            >
              <img src='https://www.google.com/images/branding/googleg/1x/googleg_standard_color_128dp.png' style={{ margin: 5, width: 20, height: 20 }} alt='googleLogo' />
              Sign in with Google
            </Button>
          )}
          {isLoading && <h5>loading..</h5>}
        </Box>
      </Container>
    </>
  )
}
