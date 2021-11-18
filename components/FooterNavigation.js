import {
  AppBar, Toolbar, IconButton,
  Fab, Box, Tooltip, Drawer,
  List, ListItem, ListItemIcon, ListItemText
} from '@mui/material'
import {
  Home as HomeIcon,
  ViewWeek as WeekIcon,
  Menu as MenuIcon,
  Add as AddIcon,
  CalendarToday as CalendarIcon
} from '@mui/icons-material'
import { NextLinkComposed } from '../components/NextMUILink'
import { useState } from 'react'
import { useRouter } from 'next/router'
import NewMealDialog from '../components/NewMealDialog'

const FooterNav = () => {
  const router = useRouter()
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [newMealOpen, setNewMealOpen] = useState(false)
  return (
    <>
      <NewMealDialog open={newMealOpen} setOpen={setNewMealOpen} />
      <Drawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <Box
          sx={{ width: 250 }}
          role='presentation'
          onClick={() => setDrawerOpen(false)}
          onKeyDown={() => setDrawerOpen(false)}
        >
          <List>
            <ListItem button component={NextLinkComposed} to='/home' selected={router.pathname === '/home'}>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary='Home' />
            </ListItem>
            <ListItem button component={NextLinkComposed} to='/week' selected={router.pathname === '/week'}>
              <ListItemIcon>
                <WeekIcon />
              </ListItemIcon>
              <ListItemText primary='Weekly Overview' />
            </ListItem>
          </List>
        </Box>
      </Drawer>
      <AppBar position='fixed' color='primary' sx={{ top: 'auto', bottom: 0 }} size='small'>
        <Toolbar variant='dense'>
          <IconButton onClick={() => setDrawerOpen(true)} color='inherit' aria-label='open drawer'>
            <MenuIcon />
          </IconButton>
          <Tooltip title='Log New Meal'>
            <Fab
              color='primary'
              aria-label='new meal'
              sx={{
                position: 'absolute',
                zIndex: 1,
                top: -30,
                left: 0,
                right: 0,
                margin: '0 auto'
              }}
              onClick={() => {
                setNewMealOpen(true)
              }}
            >
              <AddIcon />
            </Fab>

          </Tooltip>
          <Box sx={{ flexGrow: 1 }} />
          <IconButton color='inherit' component={NextLinkComposed} to='/calendar'>
            <CalendarIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </>
  )
}

export default FooterNav
