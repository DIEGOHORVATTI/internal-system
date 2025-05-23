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

  const renderNavItems = (items: Array<Navigation>, level = 0) => (
    <List sx={{ color: 'text.secondary', px: 1 }}>
      {items.map(({ kind, title, segment, icon, children }, index) => {
        const hasChildren = children && children.length > 0
        const isOpen = Boolean(segment && openMenus?.[segment])

        if (kind === 'header') {
          if (isCollapse) return null

          return (
            <Fragment key={index}>
              <Header
                title={title}
                isOpen={isOpen}
                onToggle={() => handleToggle(segment || `header-${index}`)}
              />

              {hasChildren && (
                <Collapse in={isOpen} timeout="auto" unmountOnExit>
                  {renderNavItems(children, level)}
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
              onClick={() => (hasChildren ? handleToggle(segment || `item-${index}`) : null)}
              sx={{ width: 1, borderRadius: 1, ...(!isCollapse && { pl: 2 + level * 2 }) }}
            >
              <Stack
                width={1}
                direction="row"
                alignItems="center"
                justifyContent={!isCollapse ? 'space-between' : 'center'}
              >
                <Stack direction={!isCollapse ? 'row' : 'column'} spacing={1} alignItems="center">
                  {icon && <Iconify icon={icon} />}

                  {!isCollapse && <Typography variant="body2">{title}</Typography>}
                </Stack>

                {hasChildren && !isCollapse && (
                  <Iconify icon={isOpen ? 'eva:chevron-up-fill' : 'eva:chevron-down-fill'} />
                )}
              </Stack>
            </ListItemButton>

            {hasChildren && (
              <Collapse in={isOpen} timeout="auto" unmountOnExit>
                {renderNavItems(children, level + 1)}
              </Collapse>
            )}
          </Fragment>
        )
      })}
    </List>
  )

  return <Box width={1}>{renderNavItems(navConfig)}</Box>
}

import { m } from 'framer-motion'
import { MotionContainer } from '@/components/animate'

type HeaderProps = Pick<Navigation, 'title'> & {
  isOpen: boolean
  onToggle: VoidFunction
}

const Header = ({ title, isOpen, onToggle }: HeaderProps) => {
  return (
    <ContainerDivider pt={2}>
      <Stack
        component={MotionContainer}
        direction="row"
        whileTap="tap"
        whileHover="hover"
        sx={{ cursor: 'pointer' }}
        onClick={onToggle}
      >
        <m.div
          variants={{
            initial: { x: -5, opacity: 0 },
            hover: { opacity: 1 },
          }}
        >
          <Iconify
            icon={isOpen ? 'eva:chevron-down-fill' : 'eva:chevron-right-fill'}
            color="text.primary"
          />
        </m.div>

        <m.div
          variants={{
            initial: { x: -10 },
            hover: { x: -5 },
            tap: { x: 0 },
          }}
        >
          <Typography variant="overline" fontWeight={600} color="text.primary">
            {title}
          </Typography>
        </m.div>
      </Stack>
    </ContainerDivider>
  )
}
