import { useState, Fragment, useMemo } from 'react'

import { Link, useLocation } from 'react-router-dom'

import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import Stack from '@mui/material/Stack'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'

import Iconify from '@/components/iconify'
import buildPathMap from '../shared/build-path-map'
import useOpenMenus from '../hooks/use-open-menus'

import type { Navigation } from '@/routes/nav-config'
import type { NavbarVerticalProps } from '../..'

export default function renderNavItemsMini({ navConfig }: NavbarVerticalProps) {
  const location = useLocation()

  const [openMenu, setOpenMenu] = useState<string | null>(null)

  const pathToParents = useMemo(() => buildPathMap(navConfig), [navConfig])

  const { openMenus, handleToggle, extractKey } = useOpenMenus({
    navConfig,
    pathToParents,
    currentPath: location.pathname,
  })

  const handleMouseEnter = (path?: string) => setOpenMenu(path)

  const handleMouseLeave = () => setOpenMenu(null)

  const renderItems = (items: Array<Navigation>, level = 0) => (
    <List sx={{ color: 'text.secondary' }}>
      {items.map(({ kind, title, path, icon, children }, index) => {
        const hasChildren = children && children.length > 0
        const { key } = extractKey(path, index)

        const isOpen = Boolean(openMenus?.[key])
        const isActive = location.pathname === key

        if (kind === 'hidden') {
          return
        }

        if (kind === 'header') {
          return hasChildren && <Fragment key={index}>{renderItems(children, level)}</Fragment>
        }

        if (kind === 'divider') {
          return <Divider key={index} sx={{ my: 1 }} />
        }

        return (
          <Fragment key={index}>
            <ListItemButton
              {...(path && !hasChildren && { component: Link, to: path })}
              onClick={() => handleToggle(path || `item-${index}`)}
              sx={{
                width: 1,
                borderRadius: 1,
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
          </Fragment>
        )
      })}
    </List>
  )

  return renderItems(navConfig)
}
