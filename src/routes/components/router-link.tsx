import type { LinkProps } from 'react-router-dom'

import { forwardRef } from 'react'
import { Link } from 'react-router-dom'

interface RouterLinkProps extends Omit<LinkProps, 'to'> {
  href: string
}

export default function RouterLink(
  { href, ...props }: RouterLinkProps,
  ref: React.ForwardedRef<HTMLAnchorElement>
) {
  return <Link ref={ref} to={href} {...props} />
}

const ForwardedRouterLink = forwardRef(RouterLink)

ForwardedRouterLink.displayName = 'RouterLink'
