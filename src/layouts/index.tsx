import { ReactNode } from 'react'

import DashboardLayout from './dashboard'
import LogoOnlyLayout from './LogoOnlyLayout'

type TLink = {
  href?: string
  name: string
  icon?: React.ReactElement
}

export type LayoutProps = {
  children: ReactNode
  heading?: string
  title?: string
  markdown?: string
  action?: ReactNode
  links?: Array<TLink>
  variant?: 'dashboard' | 'logoOnly'
}

export const Layout = ({ variant = 'dashboard', children, ...rest }: LayoutProps) => {
  if (variant === 'logoOnly') {
    return <LogoOnlyLayout> {children} </LogoOnlyLayout>
  }

  return (
    <DashboardLayout variant={variant} {...rest}>
      {children}
    </DashboardLayout>
  )
}
