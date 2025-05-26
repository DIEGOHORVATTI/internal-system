import { Link as LinkReact } from 'react-router-dom'
import Link from '@mui/material/Link'
import Box, { type BoxProps } from '@mui/material/Box'
import SvgIcon from '@mui/material/SvgIcon'

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
          transform: 'scale(3)',
        }}
      >
        <Triangle x={200} y={180} />

        <Triangle x={200} y={320} />

        <Triangle x={330} y={250} />
      </SvgIcon>
    </Box>
  )

  if (disabledLink) {
    return logo
  }

  return (
    <Link component={LinkReact} to="/">
      {logo}
    </Link>
  )
}

interface TriangleProps {
  x: number
  y: number
  size?: number
  color?: string
}

function Triangle({ x, y, size = 48, color = 'currentColor' }: TriangleProps) {
  const points = `${x - size},${y - size} ${x + size},${y} ${x - size},${y + size}`

  return <polygon points={points} fill={color} />
}
