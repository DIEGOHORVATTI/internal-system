import { useState, Fragment } from 'react'

import { Box, List, ListItemButton, Stack, Collapse, Divider, Typography } from '@mui/material'
import Iconify from '@/components/iconify'

import ContainerDivider from './container-divider'

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
    <List sx={{ color: 'text.secondary' }}>
      {items.map(({ kind, title, segment, icon, children }, index) => {
        if (kind === 'header') {
          if (isCollapse) return null

          return (
            <ContainerDivider key={index}>
              <Typography variant="overline" fontWeight={600}>
                {title}
              </Typography>
            </ContainerDivider>
          )
        }

        if (kind === 'divider') {
          return <Divider key={index} sx={{ my: 1 }} />
        }

        const hasChildren = children && children.length > 0
        const isOpen = segment && openMenus[segment]

        const listItem = (
          <Stack
            component={ListItemButton}
            mx={1}
            spacing={1}
            direction={!isCollapse ? 'row' : 'column'}
            alignItems="center"
            onClick={() => (hasChildren ? handleToggle(segment) : null)}
            sx={{
              borderRadius: 1,
              ...(!isCollapse && {
                pl: 2 + level * 2,
              }),
            }}
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

  return <Box width={1}>{renderNavItems(navConfig)}</Box>
}
