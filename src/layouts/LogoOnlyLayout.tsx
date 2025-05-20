import Logo from '@/components/logo'

import { styled } from '@mui/material/styles'

import type { PropsWithChildren } from 'react'

export default function LogoOnlyLayout({ children }: PropsWithChildren) {
  return (
    <>
      <HeaderStyle>
        <Logo />
      </HeaderStyle>

      {children}
    </>
  )
}

const HeaderStyle = styled('header')(({ theme }) => ({
  top: 0,
  left: 0,
  lineHeight: 0,
  width: '100%',
  position: 'absolute',
  padding: theme.spacing(3, 3, 0),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(5, 5, 0),
  },
}))
