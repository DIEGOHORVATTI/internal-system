import type { Navigation } from '@/routes/nav-config'

import Iconify from '@/components/iconify'
import { Link, useLocation } from 'react-router-dom'

import { alpha } from '@mui/system'
import List from '@mui/material/List'
import Stack from '@mui/material/Stack'
import Divider from '@mui/material/Divider'
import Collapse from '@mui/material/Collapse'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import ListItemButton from '@mui/material/ListItemButton'

import useOpenMenus from '../hooks/use-open-menus'
import buildPathMap from '../shared/build-path-map'

type Props = {
  navConfig: Navigation[]
  level?: number
}

export default function RecursiveMobileNavItems({ navConfig = [] }: Props) {
  const location = useLocation()

  const pathToParents = buildPathMap(navConfig)

  const { openMenus, handleToggle, extractKey } = useOpenMenus({
    navConfig,
    pathToParents,
    currentPath: location.pathname,
  })

  const renderItems = (items: Navigation[], level = 0) => (
    <List component={Stack} spacing={0.5}>
      {items.map((item, index) => {
        if (item.kind === 'hidden') return null
        if (item.kind === 'divider') return <Divider key={index} sx={{ my: 1 }} />

        const hasChildren = item.children && item.children.length > 0
        const { key } = extractKey(item.path, index)
        const isOpen = Boolean(openMenus?.[key])
        const isActive = location.pathname === item.path

        return (
          <Stack key={index} spacing={0.5}>
            <ListItemButton
              {...(item.path && !hasChildren && { component: Link, to: item.path })}
              onClick={() => handleToggle(key)}
              sx={{
                minHeight: 44,
                borderRadius: 1,
                typography: 'body2',
                textTransform: 'capitalize',
                px: 2.5,
                pl: level * 3 + 2.5,
                ...(isActive && {
                  color: 'primary.main',
                  fontWeight: 'bold',
                  bgcolor: (theme) => alpha(theme.palette.primary.main, 0.08),
                  '&:hover': {
                    bgcolor: (theme) => alpha(theme.palette.primary.main, 0.16),
                  },
                }),
              }}
            >
              <ListItemIcon
                sx={{
                  width: 24,
                  height: 24,
                  mr: 2,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {item.icon && <Iconify icon={item.icon} />}
              </ListItemIcon>

              <ListItemText primary={item.title} primaryTypographyProps={{ noWrap: true }} />

              {hasChildren && (
                <Iconify
                  icon={isOpen ? 'eva:arrow-ios-downward-fill' : 'eva:arrow-ios-forward-fill'}
                  sx={{ ml: 1, flexShrink: 0 }}
                />
              )}
            </ListItemButton>

            {hasChildren && item.children && (
              <Collapse in={isOpen} unmountOnExit>
                {renderItems(item.children, level + 1)}
              </Collapse>
            )}
          </Stack>
        )
      })}
    </List>
  )

  return renderItems(navConfig)
}
