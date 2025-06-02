import Box from '@mui/material/Box'
import Link from '@mui/material/Link'

import type { BreadcrumbsLinkProps } from './types'

type Props = {
  link: BreadcrumbsLinkProps
  activeLast?: boolean
  disabled: boolean
}

export default function BreadcrumbsLink({
  link: { name, href, icon },
  activeLast,
  disabled,
}: Props) {
  const styles = {
    typography: 'body2',
    alignItems: 'center',
    color: 'text.primary',
    display: 'inline-flex',
    ...(disabled &&
      !activeLast && {
        cursor: 'default',
        pointerEvents: 'none',
        color: 'text.disabled',
      }),
  }

  const renderContent = (
    <>
      {icon && (
        <Box
          component="span"
          sx={{
            mr: 1,
            display: 'inherit',
            '& svg': { width: 20, height: 20 },
          }}
        >
          {icon}
        </Box>
      )}

      {name}
    </>
  )

  if (href) {
    return (
      <Link href={href} sx={styles}>
        {renderContent}
      </Link>
    )
  }

  return <Box sx={styles}>{renderContent}</Box>
}
