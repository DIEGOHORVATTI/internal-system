import type { Navigation } from '@/routes/nav-config'

import { useCallback } from 'react'
import Iconify from '@/components/iconify'
import { Link, useLocation } from 'react-router-dom'
import usePopoverHover from '@/hooks/use-popover-hover'

import List from '@mui/material/List'
import Stack from '@mui/material/Stack'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import ListItemButton from '@mui/material/ListItemButton'

import * as S from './nav-dropdown'

type Props = {
  navConfig: Navigation[]
  level?: number
}

export default function RecursiveNavItems({ navConfig = [], level = 0 }: Props) {
  return (
    <List component={Stack} spacing={0.5} sx={{ color: 'text.secondary' }}>
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

  const { open, onOpen, onClose, anchorEl } = usePopoverHover<HTMLButtonElement>()

  const handleOpenMenu = useCallback(() => {
    if (item?.children) {
      onOpen()
    }
  }, [item?.children, onOpen])

  const isActive = location.pathname === item?.path
  const hasChildren = !!item?.children?.length

  return (
    <>
      <ListItemButton
        onMouseEnter={handleOpenMenu}
        onMouseLeave={onClose}
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
        <S.NavDropdown
          disableScrollLock
          open={open}
          anchorEl={anchorEl}
          slotProps={{
            paper: {
              onMouseEnter: handleOpenMenu,
              onMouseLeave: onClose,
            },
          }}
        >
          <RecursiveNavItems navConfig={item.children!} level={level + 1} />
        </S.NavDropdown>
      )}
    </>
  )
}
