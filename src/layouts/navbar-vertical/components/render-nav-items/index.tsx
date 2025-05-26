import { useState, useMemo, Fragment } from 'react'
import { useLocation, Link } from 'react-router-dom'

import { List, ListItemButton, Stack, Collapse, Divider, Typography } from '@mui/material'

import Iconify from '@/components/iconify'
import Header from './components/header'

import type { Navigation } from '@/routes/nav-config'
import type { NavbarVerticalProps } from '../..'

export default function renderNavItems({ navConfig }: NavbarVerticalProps) {
  const location = useLocation()

  const buildPathMap = (
    items: Array<Navigation>,
    parents: string[] = []
  ): Record<string, string[]> => {
    return items.reduce((acc, item) => {
      if (item.path) {
        acc[item.path] = [...parents]
      }

      if (item.children) {
        Object.assign(acc, buildPathMap(item.children, [...parents, item.path!]))
      }

      return acc
    }, {} as Record<string, string[]>)
  }

  const pathToParents = useMemo(() => buildPathMap(navConfig), [navConfig])

  function updateOpenMenus() {
    const currentPath = location.pathname
    const parents = pathToParents[currentPath] || []

    const newState: Record<string, boolean> = {}
    parents.forEach((path) => {
      newState[path] = true
    })

    const navItems = Object.keys(newState).length > 0 ? newState : {}

    return navItems
  }

  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>(() => {
    const initialState = updateOpenMenus()

    return initialState
  })

  const handleToggle = (patch: string) =>
    setOpenMenus((prev) => ({ ...prev, [patch]: !prev?.[patch] }))

  const renderItems = (items: Array<Navigation>, level = 0) => (
    <List sx={{ color: 'text.secondary' }}>
      {items.map(({ kind, title, path, icon, children }, index) => {
        const hasChildren = children && children.length > 0
        const isOpen = Boolean(path && openMenus?.[path])
        const isActive = location.pathname === path

        if (kind === 'header') {
          return (
            <Fragment key={index}>
              <Header
                title={title}
                isOpen={isOpen}
                onToggle={() => handleToggle(path || `header-${index}`)}
              />

              {hasChildren && (
                <Collapse in={isOpen} timeout="auto" unmountOnExit>
                  {renderItems(children, level)}
                </Collapse>
              )}

              {hasChildren && renderItems(children, level)}
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
