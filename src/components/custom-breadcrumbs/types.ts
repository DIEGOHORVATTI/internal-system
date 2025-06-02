import type { BreadcrumbsProps } from '@mui/material/Breadcrumbs'

export type BreadcrumbsLinkProps = {
  name?: string
  href?: string
  icon?: React.ReactElement
}

export type CustomBreadcrumbsProps = BreadcrumbsProps &
  Partial<{
    heading: string
    moreLink: string[]
    activeLast: boolean
    action: React.ReactNode
    links: Array<BreadcrumbsLinkProps>
  }>
