import { useMemo, Fragment } from 'react'
import { Link, useLocation } from 'react-router-dom'

import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import Stack from '@mui/material/Stack'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'

import { usePopover } from '@/components/custom-popover'
import Iconify from '@/components/iconify'

import buildPathMap from '../shared/build-path-map'
import useOpenMenus from '../hooks/use-open-menus'

import type { Navigation } from '@/routes/nav-config'
import type { NavbarVerticalProps } from '../..'
import { Paper } from '@mui/material'
import { Box } from '@mui/system'

export default function RenderNavItemsMini({ navConfig }: NavbarVerticalProps) {
  const location = useLocation()

  const pathToParents = useMemo(() => buildPathMap(navConfig), [navConfig])

  const { extractKey } = useOpenMenus({
    navConfig,
    pathToParents,
    currentPath: location.pathname,
  })

  const popover = usePopover()

  const renderItems = (items: Navigation[], level = 0) => (
    <List component={Stack} spacing={0.5} sx={{ color: 'text.secondary' }}>
      {items.map(({ kind, title, path, icon, children }, index) => {
        const hasChildren = children && children.length > 0

        const { key } = extractKey(path, index)
        const isActive = location.pathname === key

        if (kind === 'hidden') return null

        if (kind === 'header') {
          return (
            hasChildren && (
              <Box key={index} onMouseEnter={popover.onOpen} onMouseLeave={popover.onClose}>
                {renderItems(children, level)}
              </Box>
            )
          )
        }

        if (kind === 'divider') return <Divider key={index} sx={{ my: 1 }} />

        return (
          <Fragment key={index}>
            <div onMouseEnter={popover.onOpen} /* onMouseLeave={popover.onClose} */>
              <ListItemButton
                {...(path && !hasChildren && { component: Link, to: path })}
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
                  {icon && <Iconify icon={icon} />}
                  <Typography component="b" variant="button" fontSize={9}>
                    {title}
                  </Typography>
                </Stack>

                {hasChildren && (
                  <Iconify
                    icon="eva:chevron-right-fill"
                    sx={{ position: 'absolute', right: 0, top: 10 }}
                  />
                )}
              </ListItemButton>
            </div>
          </Fragment>
        )
      })}
    </List>
  )

  return (
    <>
      {renderItems(navConfig)}

      <Paper
        //onMouseEnter={popover.onOpen}
        onMouseLeave={popover.onClose}
        sx={{
          p: 3,
          top: -62,
          borderRadius: 2,
          position: 'absolute',
          left: 260,
          width: 350,
          boxShadow: (theme) => theme.customShadows.z20,
        }}
      >
        <List component={Stack} spacing={0.5} sx={{ color: 'text.secondary' }}>
          <h1>teste</h1>
        </List>
      </Paper>
    </>
  )
}
