import { Box, BoxProps, Link } from '@mui/material'

import Image from './image'

interface Props extends BoxProps {
  disabledLink?: boolean
  width?: number
  height?: number
}

export default function Logo({ disabledLink = false, width = 50, height = 50, sx }: Props) {
  const logo = (
    <Box sx={{ width, height, cursor: 'pointer', ...sx }}>
      <Image
        src="https://www.azeplast.com.br/wp-content/uploads/2021/04/30706215_1240795642720308_9001542129977131008_n.png"
        sx={{ borderRadius: '50%' }}
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
