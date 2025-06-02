import type { INotification } from '@/types/INotification'
// hooks
import type { UseBooleanProps } from '@/hooks/use-boolean'

// components
import Label from '@/components/label'
// _mock
import Iconify from '@/components/Iconify'
import { useState, useCallback } from 'react'
import useResponsive from '@/hooks/use-responsive'

import Tab from '@mui/material/Tab'
import Box from '@mui/material/Box'
import Tabs from '@mui/material/Tabs'
import List from '@mui/material/List'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import Drawer from '@mui/material/Drawer'
import Divider from '@mui/material/Divider'
import Tooltip from '@mui/material/Tooltip'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'

import NotificationItem from './notifications-item'

const TABS = [
  {
    value: 'all',
    label: 'All',
    count: 22,
  },
  {
    value: 'unread',
    label: 'Unread',
    count: 12,
  },
  {
    value: 'archived',
    label: 'Archived',
    count: 10,
  },
]

type Props = {
  drawer: UseBooleanProps
  notifications: INotification
  handleMarkAllAsRead: VoidFunction
  totalUnRead: number
}

export default function NotificationsDrawer({
  drawer,
  notifications,
  totalUnRead,
  handleMarkAllAsRead,
}: Props) {
  const smUp = useResponsive('up', 'sm')

  const [currentTab, setCurrentTab] = useState('all')

  const handleChangeTab = useCallback((_event: React.SyntheticEvent, newValue: string) => {
    setCurrentTab(newValue)
  }, [])

  const renderHead = (
    <Stack direction="row" alignItems="center" sx={{ py: 2, pl: 2.5, pr: 1, minHeight: 68 }}>
      <Typography variant="h6" sx={{ flexGrow: 1 }}>
        Notifications
      </Typography>

      {!!totalUnRead && (
        <Tooltip title="Mark all as read">
          <IconButton color="primary" onClick={handleMarkAllAsRead}>
            <Iconify icon="eva:done-all-fill" />
          </IconButton>
        </Tooltip>
      )}

      {!smUp && (
        <IconButton onClick={drawer.onFalse}>
          <Iconify icon="mingcute:close-line" />
        </IconButton>
      )}
    </Stack>
  )

  const renderTabs = (
    <Tabs value={currentTab} onChange={handleChangeTab}>
      {TABS.map((tab) => (
        <Tab
          key={tab.value}
          iconPosition="end"
          value={tab.value}
          label={tab.label}
          icon={
            <Label
              variant={((tab.value === 'all' || tab.value === currentTab) && 'filled') || 'soft'}
              color={
                (tab.value === 'unread' && 'info') ||
                (tab.value === 'archived' && 'success') ||
                'default'
              }
            >
              {tab.count}
            </Label>
          }
          sx={{
            '&:not(:last-of-type)': {
              mr: 3,
            },
          }}
        />
      ))}
    </Tabs>
  )

  const renderList = (
    <List disablePadding sx={{ overflow: 'auto' }}>
      {notifications.map((notification) => (
        <NotificationItem key={notification.id} notification={notification} />
      ))}
    </List>
  )

  return (
    <Drawer
      anchor="right"
      open={drawer.value}
      onClose={drawer.onFalse}
      slotProps={{
        backdrop: { invisible: true },
        paper: {
          sx: {
            width: smUp ? 400 : '100%',
            maxWidth: 400,
          },
        },
      }}
    >
      {renderHead}

      <Divider />

      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ pl: 2.5, pr: 1 }}
      >
        {renderTabs}
        <IconButton onClick={handleMarkAllAsRead}>
          <Iconify icon="solar:settings-bold-duotone" />
        </IconButton>
      </Stack>

      <Divider />

      {renderList}

      <Box sx={{ p: 1 }}>
        <Button fullWidth size="large">
          View All
        </Button>
      </Box>
    </Drawer>
  )
}
