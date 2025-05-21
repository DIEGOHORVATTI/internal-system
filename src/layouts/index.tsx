import { useState } from 'react'

import { AppBar, Container, Grid } from '@mui/material'

import useCollapseDrawer from '@/hooks/use-collapse-drawer'
import useResponsive from '@/hooks/use-responsive'

import { HEADER } from '@/config'

import DashboardHeader from './components/header'

import NavbarVertical from './components/navbar/NavbarVertical'

import CustomBreadcrumbs from '@/components/custom-breadcrumbs'
import { CustomBreadcrumbsProps } from '@/components/custom-breadcrumbs/types'

export default function DashboardLayout({
  children,
  title,
  links,
  heading,
  action,
}: CustomBreadcrumbsProps) {
  const { isCollapse } = useCollapseDrawer()

  const isMobile = useResponsive('down', 'lg')

  const [open, setOpen] = useState(false)

  return (
    <Container maxWidth="xl">
      <Grid display="flex" py={4}>
        {isMobile && (
          <AppBar
            sx={{
              backgroundColor: 'background.paper',
              height: HEADER.MOBILE_HEIGHT,
            }}
          >
            <DashboardHeader isCollapse={isCollapse} onOpenSidebar={() => setOpen(true)} />
          </AppBar>
        )}

        <NavbarVertical isOpenSidebar={open} onCloseSidebar={() => setOpen(false)} />

        <CustomBreadcrumbs title={title} heading={heading} links={links} action={action} />

        {children}
      </Grid>
    </Container>
  )
}
