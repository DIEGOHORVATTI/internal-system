import { Box, BoxProps, Link, SvgIcon } from '@mui/material'

interface Props extends BoxProps {
  disabledLink?: boolean
  size?: number
}

export default function Logo({ disabledLink = false, size = 25, sx }: Props) {
  const logo = (
    <Box sx={{ cursor: 'pointer', ...sx }}>
      <SvgIcon
        viewBox="0 0 500 500"
        style={{
          width: size,
          height: size,
          transform: 'scale(2.5)',
        }}
        fontSize="inherit"
        color="inherit"
      >
        <polygon points="100,100 200,150 100,200" fill="currentColor" />
        <polygon points="100,300 200,350 100,400" fill="currentColor" />
        <polygon points="300,200 400,250 300,300" fill="currentColor" />
      </SvgIcon>
    </Box>
  )

  if (disabledLink) {
    return logo
  }

  return <Link href="/">{logo}</Link>
}
