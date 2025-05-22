import { useState, Fragment } from 'react'
import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  Divider,
  Typography,
  Tooltip,
} from '@mui/material'

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
              {isCollapse ? null : title}
            </Typography>
          )
        }

        if (kind === 'divider') {
          return <Divider key={index} sx={{ my: 1 }} />
        }

        const hasChildren = children && children.length > 0
        const isOpen = segment && openMenus[segment]

        const listItem = (
          <ListItemButton
            onClick={() => (hasChildren ? handleToggle(segment) : null)}
            sx={{ pl: 2 + level * 2 }}
          >
            {icon && (
              <ListItemIcon>
                <Iconify icon={icon} />
              </ListItemIcon>
            )}

            {!isCollapse && <ListItemText primary={title} />}

            {hasChildren && !isCollapse && (
              <Iconify icon={isOpen ? 'eva:chevron-up-fill' : 'eva:chevron-down-fill'} />
            )}
          </ListItemButton>
        )

        return (
          <Fragment key={index}>
            {isCollapse && title ? (
              <Tooltip title={title} placement="right">
                {listItem}
              </Tooltip>
            ) : (
              listItem
            )}

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
