import { styled } from '@mui/material/styles'

import { AppBar, Toolbar } from '@mui/material'

import IconButtonAnimate from '@/components/icon-button-animate'
import Iconify from '@/components/iconify'

import cssStyles from '@/utils/cssStyles'

import { HEADER, NAVBAR } from '@/config'

type RootStyleProps = {
  isCollapse: boolean
  isOffset: boolean
  verticalLayout: boolean
}

const RootStyle = styled(AppBar, {
  shouldForwardProp: (prop) =>
    prop !== 'isCollapse' && prop !== 'isOffset' && prop !== 'verticalLayout',
})<RootStyleProps>(({ isCollapse, isOffset, verticalLayout, theme }) => ({
  ...cssStyles(theme).bgBlur(),
  boxShadow: 'none',
  height: HEADER.MOBILE_HEIGHT,
  zIndex: theme.zIndex.appBar + 1,
  transition: theme.transitions.create(['width', 'height'], {
    duration: theme.transitions.duration.shorter,
  }),
  [theme.breakpoints.up('lg')]: {
    height: HEADER.DASHBOARD_DESKTOP_HEIGHT,
    width: `calc(100% - ${NAVBAR.DASHBOARD_WIDTH + 1}px)`,
    ...(isCollapse && {
      width: `calc(100% - ${NAVBAR.DASHBOARD_COLLAPSE_WIDTH}px)`,
    }),
    ...(isOffset && {
      height: HEADER.DASHBOARD_DESKTOP_OFFSET_HEIGHT,
    }),
    ...(verticalLayout && {
      width: '100%',
      height: 'fit-content',
      backgroundColor: theme.palette.background.default,
    }),
  },
}))

type Props = {
  onOpenSidebar: VoidFunction
  isCollapse?: boolean
  verticalLayout?: boolean
}

export default function DashboardHeader({
  onOpenSidebar,
  isCollapse = false,
  verticalLayout = false,
}: Props) {
  return (
    <RootStyle isCollapse={isCollapse} isOffset verticalLayout={verticalLayout}>
      <Toolbar
        sx={{
          minHeight: '100% !important',
          px: { lg: 5 },
        }}
      >
        <IconButtonAnimate onClick={onOpenSidebar} sx={{ mr: 1, color: 'text.primary' }}>
          <Iconify icon="eva:menu-2-fill" />
        </IconButtonAnimate>
      </Toolbar>
    </RootStyle>
  )
}
