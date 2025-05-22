import { useState, Fragment } from 'react'

import { Box, List, ListItemButton, Stack, Collapse, Divider, Typography } from '@mui/material'

import Iconify from '@/components/iconify'

import type { NavbarVerticalProps } from '..'
import type { Navigation } from '@/routes/nav-config'

type Props = NavbarVerticalProps & {
  isCollapse: boolean
}

export default function NavSectionVertical({ navConfig, isCollapse }: Props) {
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({})

  const handleToggle = (segment?: string) => {
    if (!segment) return
    setOpenMenus((prev) => ({ ...prev, [segment]: !prev[segment] }))
  }

  const renderNavItems = (items: Array<Navigation>, level = 0) => (
    <List disablePadding>
      {items.map(({ kind, title, segment, icon, children }, index) => {
        if (kind === 'header') {
          return (
            <Typography
              key={index}
              variant="subtitle2"
              sx={{ pl: 2, pt: 2, pb: 0.5, opacity: 0.72 }}
            >
              {isCollapse ? '' : title}
            </Typography>
          )
        }

        if (kind === 'divider') {
          return <Divider key={index} sx={{ my: 1 }} />
        }

        const hasChildren = children && children.length > 0
        const isOpen = segment && openMenus[segment]

        const dynamicPadding = 2 + level * 2

        const listItem = (
          <Stack
            component={ListItemButton}
            spacing={1}
            direction={!isCollapse ? 'row' : 'column'}
            alignItems="center"
            onClick={() => (hasChildren ? handleToggle(segment) : null)}
            sx={{ pl: !isCollapse ? dynamicPadding : 0 }}
          >
            <Iconify icon={icon} />

            <Typography variant="body2" sx={{ fontSize: !isCollapse ? 'inherit' : 10 }}>
              {title}
            </Typography>

            {hasChildren && !isCollapse && (
              <Iconify icon={isOpen ? 'eva:chevron-up-fill' : 'eva:chevron-down-fill'} />
            )}
          </Stack>
        )

        return (
          <Fragment key={index}>
            {listItem}

            {hasChildren && (
              <Collapse in={!!isOpen} timeout="auto" unmountOnExit>
                {renderNavItems(children!, level + 1)}
              </Collapse>
            )}
          </Fragment>
        )
      })}
    </List>
  )

  return <Box sx={{ width: '100%' }}>{renderNavItems(navConfig)}</Box>
}
