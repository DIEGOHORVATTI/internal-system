import { useState, Fragment } from 'react'

import { List, ListItemButton, Stack, Collapse, Divider, Typography } from '@mui/material'
import { Link } from 'react-router-dom'

import Iconify from '@/components/iconify'
import Header from './components/header'

import type { Navigation } from '@/routes/nav-config'

import type { NavSectionVerticalProps } from '../nav-section-vertical'

export default function renderNavItems({ navConfig }: Pick<NavSectionVerticalProps, 'navConfig'>) {
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>(
    navConfig.reduce((acc, item) => {
      if (item.kind === 'header' && item.segment) {
        acc[item.segment] = true
      }

      return acc
    }, {} as Record<string, boolean>)
  )

  const handleToggle = (segment: string) => {
    setOpenMenus((prev) => ({ ...prev, [segment]: !prev?.[segment] }))
  }

  const renderItems = (items: Array<Navigation>, level = 0) => (
    <List sx={{ color: 'text.secondary' }}>
      {items.map(({ kind, title, segment, icon, children }, index) => {
        const hasChildren = children && children.length > 0
        const isOpen = Boolean(segment && openMenus?.[segment])

        if (kind === 'header') {
          return (
            <Fragment key={index}>
              <Header
                title={title}
                isOpen={isOpen}
                onToggle={() => handleToggle(segment || `header-${index}`)}
              />

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
              {...(segment && !hasChildren && { component: Link, to: segment })}
              onClick={() => handleToggle(segment || `item-${index}`)}
              sx={{ width: 1, borderRadius: 1, pl: 2 + level * 2 }}
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
