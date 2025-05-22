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
      {items.map((item, index) => {
        if (item.kind === 'header') {
          return (
            <Typography
              key={index}
              variant="subtitle2"
              sx={{ pl: 2, pt: 2, pb: 0.5, opacity: 0.72 }}
            >
              {isCollapse ? null : item.title}
            </Typography>
          )
        }

        if (item.kind === 'divider') {
          return <Divider key={index} sx={{ my: 1 }} />
        }

        const hasChildren = item.children && item.children.length > 0
        const isOpen = item.segment && openMenus[item.segment]

        const listItem = (
          <ListItemButton
            onClick={() => (hasChildren ? handleToggle(item.segment) : null)}
            sx={{ pl: 2 + level * 2 }}
          >
            {item.icon && (
              <ListItemIcon>
                <Iconify icon={item.icon} />
              </ListItemIcon>
            )}

            {!isCollapse && <ListItemText primary={item.title} />}

            {hasChildren &&
              !isCollapse &&
              (isOpen ? (
                <Iconify icon="eva:chevron-up-fill" />
              ) : (
                <Iconify icon="eva:chevron-down-fill" />
              ))}
          </ListItemButton>
        )

        return (
          <Fragment key={index}>
            {isCollapse && item.title ? (
              <Tooltip title={item.title} placement="right">
                {listItem}
              </Tooltip>
            ) : (
              listItem
            )}

            {hasChildren && (
              <Collapse in={!!isOpen} timeout="auto" unmountOnExit>
                {renderNavItems(item.children!, level + 1)}
              </Collapse>
            )}
          </Fragment>
        )
      })}
    </List>
  )

  return <Box sx={{ width: '100%' }}>{renderNavItems(navConfig)}</Box>
}
