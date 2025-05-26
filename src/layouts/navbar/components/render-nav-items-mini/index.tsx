import { Link, useLocation } from 'react-router-dom'

import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import Iconify from '@/components/iconify'
import CustomPopover, { usePopover } from '@/components/custom-popover'

import type { Navigation } from '@/routes/nav-config'
import { Divider } from '@mui/material'

type Props = {
  navConfig: Navigation[]
  level?: number
}

export default function RecursiveNavItems({ navConfig = [], level = 0 }: Props) {
  return (
    <List>
      {navConfig.map((item, index) => {
        if (item.kind === 'hidden') return null

        if (item.kind === 'divider') return <Divider key={index} sx={{ my: 1 }} />

        if (item.kind === 'header' && item.children)
          return <RecursiveNavItems key={index} navConfig={item.children} level={level} />

        return <RecursiveNavItem key={item.path || index} item={item} level={level} />
      })}
    </List>
  )
}

function RecursiveNavItem({ item, level }: { item?: Navigation; level: number }) {
  const location = useLocation()

  const popover = usePopover()

  const isActive = location.pathname === item?.path
  const hasChildren = !!item?.children?.length

  return (
    <>
      <ListItemButton
        onMouseEnter={popover.onOpen}
        {...(item?.path && !hasChildren && { component: Link, to: item.path })}
        sx={{
          width: 1,
          borderRadius: 1,
          position: 'relative',
          ...(isActive && {
            bgcolor: 'action.selected',
            color: 'primary.main',
            fontWeight: 'bold',
          }),
        }}
      >
        <Stack direction="column" spacing={0.5} alignItems="center" width={1}>
          {item?.icon && <Iconify icon={item?.icon} />}

          <Typography component="b" variant="button" fontSize={9}>
            {item?.title}
          </Typography>
        </Stack>

        {hasChildren && (
          <Iconify icon="eva:chevron-right-fill" sx={{ position: 'absolute', right: 0, top: 10 }} />
        )}
      </ListItemButton>

      {hasChildren && (
        <CustomPopover open={popover.open} onClose={popover.onClose} arrow="left-top" hiddenArrow>
          <RecursiveNavItems navConfig={item.children!} level={level + 1} />
        </CustomPopover>
      )}
    </>
  )
}
