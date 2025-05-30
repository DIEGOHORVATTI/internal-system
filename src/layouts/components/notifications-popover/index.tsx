import { useState } from 'react'
import { _notifications } from '@/_mock'
import Iconify from '@/components/iconify'
import { useBoolean } from '@/hooks/use-boolean'

import Badge from '@mui/material/Badge'

import ButtonCollapse from '../button-collapse'
import NotificationsDrawer from './components/notifications-drawer'

type Props = {
  open: boolean
}
export default function NotificationsPopover({ open }: Props) {
  const drawer = useBoolean()

  const [notifications, setNotifications] = useState(_notifications)

  const totalUnRead = notifications.filter((item) => item.isUnRead === true).length

  const handleMarkAllAsRead = () => {
    setNotifications(
      notifications.map((notification) => ({
        ...notification,
        isUnRead: false,
      }))
    )
  }

  return (
    <>
      <ButtonCollapse
        open={open}
        active={drawer.value}
        onClick={drawer.onTrue}
        slotProps={{
          listItemText: {
            secondary: 'Notificações',
          },
        }}
      >
        <Badge badgeContent={totalUnRead} color="error">
          <Iconify icon="solar:bell-bing-bold-duotone" />
        </Badge>
      </ButtonCollapse>

      <NotificationsDrawer
        notifications={notifications}
        totalUnRead={totalUnRead}
        handleMarkAllAsRead={handleMarkAllAsRead}
      />
    </>
  )
}
