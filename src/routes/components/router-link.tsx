import type { LinkProps } from 'react-router-dom'

import { Link } from 'react-router-dom'

interface RouterLinkProps extends Omit<LinkProps, 'to'> {
  href: string
}

export default function RouterLink({ href, ...props }: RouterLinkProps) {
  return <Link to={href} {...props} />
}
