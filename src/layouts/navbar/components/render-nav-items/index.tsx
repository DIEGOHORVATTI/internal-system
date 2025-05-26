import { useMemo, Fragment } from 'react'
import { useLocation, Link } from 'react-router-dom'
import useOpenMenus from './hooks/use-open-menus'

import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import Stack from '@mui/material/Stack'
import Collapse from '@mui/material/Collapse'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'

import Iconify from '@/components/iconify'
import Header from './components/header'

import buildPathMap from './shared/build-path-map'

import type { Navigation } from '@/routes/nav-config'
import type { NavbarVerticalProps } from '../..'

export default function renderNavItems({ navConfig }: NavbarVerticalProps) {
  const location = useLocation()

  const pathToParents = useMemo(() => buildPathMap(navConfig), [navConfig])

  const { openMenus, handleToggle, extractKey } = useOpenMenus({
    navConfig,
    pathToParents,
    currentPath: location.pathname,
  })

  const renderItems = (items: Array<Navigation>, level = 0) => (
    <List sx={{ color: 'text.secondary' }}>
      {items.map(({ kind, title, path, icon, children }, index) => {
        const hasChildren = children && children.length > 0

        const { key } = extractKey(path, index)

        const isOpen = Boolean(openMenus?.[key])
        const isActive = location.pathname === key

        if (kind === 'header') {
          return (
            <Fragment key={index}>
              <Header title={title} isOpen={isOpen} onToggle={() => handleToggle(key)} />

              {hasChildren && (
                <Collapse in={isOpen} timeout="auto" unmountOnExit>
                  {renderItems(children, level)}
                </Collapse>
              )}
            </Fragment>
          )
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
                pl: 2 + level * 2,
                ...(isActive && {
                  bgcolor: 'action.selected',
                  color: 'primary.main',
                  fontWeight: 'bold',
                }),
              }}
            >
              <Stack width={1} direction="row" alignItems="center" justifyContent="space-between">
                <Stack direction="row" spacing={1} alignItems="center">
                  {icon && <Iconify icon={icon} />}

                  <Typography component="b" variant="button">
                    {title}
                  </Typography>
                </Stack>

                {hasChildren && (
                  <Iconify icon={isOpen ? 'eva:chevron-up-fill' : 'eva:chevron-down-fill'} />
                )}
              </Stack>
            </ListItemButton>

            {hasChildren && (
              <Collapse in={isOpen} timeout="auto" unmountOnExit>
                {renderItems(children, level + 1)}
              </Collapse>
            )}
          </Fragment>
        )
      })}
    </List>
  )

  return renderItems(navConfig)
}
