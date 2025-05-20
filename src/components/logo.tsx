import { Box, BoxProps, Link } from '@mui/material'

import Image from './image'

interface Props extends BoxProps {
  disabledLink?: boolean
  width?: number
  height?: number
}

export default function Logo({ disabledLink = false, width = 80, height = 50, sx }: Props) {
  const logo = (
    <Box sx={{ width, height, cursor: 'pointer', ...sx }}>
      <Image
        src="/logo/logo_sirius_track.png"
        width={width}
        height={height}
        alt="Logo Sirius Track"
      />
    </Box>
  )

  if (disabledLink) {
    return <>{logo}</>
  }

  return <Link href="/">{logo}</Link>
}
