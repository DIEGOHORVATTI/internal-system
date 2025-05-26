import { Link, useLocation } from 'react-router-dom'

import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import Iconify from '@/components/iconify'
import CustomPopover, { usePopover } from '@/components/custom-popover'

import type { Navigation } from '@/routes/nav-config'

type Props = {
  navConfig: Navigation[]
  depth?: number
}

export default function RecursiveNavItems({ navConfig = [], depth = 0 }: Props) {
  return (
    <List sx={{ p: 0 }}>
      {navConfig.map((item, index) => {
        if (item.kind === 'hidden' || item.kind === 'divider') return null

        if (item.kind === 'header' && item.children)
          return <RecursiveNavItems key={index} navConfig={item.children} depth={depth} />

        return <RecursiveNavItem key={item.path || index} item={item} depth={depth} />
      })}
    </List>
  )
}

function RecursiveNavItem({ item, depth }: { item?: Navigation; depth: number }) {
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
        <CustomPopover open={popover.open} onClose={popover.onClose} arrow="left-top">
          <RecursiveNavItems navConfig={item.children!} depth={depth + 1} />
        </CustomPopover>
      )}
    </>
  )
}
